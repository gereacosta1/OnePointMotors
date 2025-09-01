export const handler = async (event: any, context: any) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { items, buyer } = JSON.parse(event.body);

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Items are required' }),
      };
    }

    if (!buyer || !buyer.email || !buyer.name) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Buyer information is required' }),
      };
    }

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Prepare Affirm checkout data
    const checkoutData = {
      merchant: {
        user_confirmation_url: `${process.env.URL || 'https://ecoride.com'}/confirmation`,
        user_cancel_url: `${process.env.URL || 'https://ecoride.com'}/catalogo`,
        user_confirmation_url_action: 'POST',
        name: 'EcoRide',
      },
      shipping: {
        name: {
          first: buyer.name.split(' ')[0] || buyer.name,
          last: buyer.name.split(' ').slice(1).join(' ') || '',
        },
        address: {
          line1: buyer.address || '123 Main St',
          city: buyer.city || 'Miami',
          state: buyer.state || 'FL',
          zipcode: buyer.zipcode || '33132',
          country: 'USA',
        },
      },
      billing: {
        name: {
          first: buyer.name.split(' ')[0] || buyer.name,
          last: buyer.name.split(' ').slice(1).join(' ') || '',
        },
        address: {
          line1: buyer.address || '123 Main St',
          city: buyer.city || 'Miami',
          state: buyer.state || 'FL',
          zipcode: buyer.zipcode || '33132',
          country: 'USA',
        },
        phone_number: buyer.phone || '5551234567',
        email: buyer.email,
      },
      items: items.map((item: any) => ({
        display_name: item.name,
        sku: item.id,
        unit_price: Math.round(item.price * 100), // Convert to cents
        qty: item.quantity,
        item_image_url: item.image,
        item_url: `${process.env.URL || 'https://ecoride.com'}/producto/${item.slug}`,
      })),
      discounts: {},
      metadata: {
        order_id: `ECO-${Date.now()}`,
        customer_id: buyer.email,
      },
      order_id: `ECO-${Date.now()}`,
      shipping_amount: 0, // Free shipping
      tax_amount: Math.round(total * 0.08 * 100), // 8% tax in cents
      total: Math.round(total * 1.08 * 100), // Total with tax in cents
    };

    // In sandbox mode, return mock response
    if (process.env.AFFIRM_ENV === 'sandbox' || !process.env.AFFIRM_PRIVATE_KEY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          checkout_token: `mock_checkout_token_${Date.now()}`,
          redirect_url: `https://sandbox.affirm.com/api/v2/checkout/mock_checkout_token_${Date.now()}`,
        }),
      };
    }

    // Real Affirm API call
    const affirmResponse = await fetch('https://sandbox.affirm.com/api/v2/checkout/', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!affirmResponse.ok) {
      throw new Error(`Affirm API error: ${affirmResponse.status}`);
    }

    const affirmData = await affirmResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        checkout_token: affirmData.checkout_token,
        redirect_url: affirmData.redirect_url,
      }),
    };

  } catch (error) {
    console.error('Affirm checkout error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      }),
    };
  }
};