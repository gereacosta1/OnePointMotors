// netlify/functions/affirm-authorize.ts

type AffirmAuthorizeBody = { checkout_token?: string };

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
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { checkout_token } = JSON.parse(event.body ?? '{}') as AffirmAuthorizeBody;

    if (!checkout_token) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Checkout token is required' }) };
    }

    // Sandbox / sin llaves privadas → mock
    if (process.env.AFFIRM_ENV === 'sandbox' || !process.env.AFFIRM_PRIVATE_KEY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: `mock_charge_${Date.now()}`,
          status: 'authorized',
          amount: 99900,
          currency: 'USD',
          created: new Date().toISOString(),
          order_id: `ECO-${Date.now()}`,
        }),
      };
    }

    // Llamado real
    const res = await fetch('https://sandbox.affirm.com/api/v2/charges/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checkout_token }),
    });

    if (!res.ok) {
      throw new Error(`Affirm API error: ${res.status} ${await res.text()}`);
    }

    const chargeData = await res.json();
    return { statusCode: 200, headers, body: JSON.stringify(chargeData) };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Affirm authorize error:', message);
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
