// netlify/functions/affirm-checkout.ts

type CheckoutItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};
type AffirmCheckoutBody = {
  items?: CheckoutItem[];
  buyer?: {
    name: string;
    email: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    phone?: string;
  };
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event: any) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { items, buyer } = JSON.parse(event.body ?? '{}') as AffirmCheckoutBody;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Items are required' }) };
    }
    if (!buyer || !buyer.email || !buyer.name) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Buyer information is required' }) };
    }

    const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const baseUrl = process.env.URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

    const checkoutData = {
      merchant: {
        user_confirmation_url: `${baseUrl}/confirmation`,
        user_cancel_url: `${baseUrl}/catalogo`,
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
      items: items.map((it) => ({
        display_name: it.name,
        sku: it.id,
        unit_price: Math.round(it.price * 100),
        qty: it.quantity,
        item_image_url: it.image,
        item_url: `${baseUrl}/producto/${it.slug}`,
      })),
      discounts: {},
      metadata: { order_id: `ECO-${Date.now()}`, customer_id: buyer.email },
      order_id: `ECO-${Date.now()}`,
      shipping_amount: 0,
      tax_amount: Math.round(total * 0.08 * 100),
      total: Math.round(total * 1.08 * 100),
    };

    // Sandbox o sin llaves → respuesta mock
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

    // Llamado real
    const res = await fetch('https://sandbox.affirm.com/api/v2/checkout/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!res.ok) {
      throw new Error(`Affirm API error: ${res.status} ${await res.text()}`);
    }

    const data = await res.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        checkout_token: data.checkout_token,
        redirect_url: data.redirect_url,
      }),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Affirm checkout error:', message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? message : 'Something went wrong',
      }),
    };
  }
};
