export const handler = async (event: any, context: any) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

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
    const { checkout_token } = JSON.parse(event.body);

    if (!checkout_token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Checkout token is required' }),
      };
    }

    // In sandbox mode, return mock response
    if (process.env.AFFIRM_ENV === 'sandbox' || !process.env.AFFIRM_PRIVATE_KEY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: `mock_charge_${Date.now()}`,
          status: 'authorized',
          amount: 99900, // Mock amount in cents
          currency: 'USD',
          created: new Date().toISOString(),
          order_id: `ECO-${Date.now()}`,
        }),
      };
    }

    // Real Affirm API call
    const affirmResponse = await fetch('https://sandbox.affirm.com/api/v2/charges/', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checkout_token }),
    });

    if (!affirmResponse.ok) {
      throw new Error(`Affirm API error: ${affirmResponse.status}`);
    }

    const chargeData = await affirmResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(chargeData),
    };

  } catch (error) {
    console.error('Affirm authorize error:', error);
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