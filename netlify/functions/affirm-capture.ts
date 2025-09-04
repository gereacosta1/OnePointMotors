// netlify/functions/affirm-capture.ts

type AffirmCaptureBody = { charge_id?: string };

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
    const { charge_id } = JSON.parse(event.body ?? '{}') as AffirmCaptureBody;

    if (!charge_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Charge ID is required' }),
      };
    }

    // Sandbox o sin llaves → respuesta mock
    if (process.env.AFFIRM_ENV === 'sandbox' || !process.env.AFFIRM_PRIVATE_KEY) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          id: charge_id,
          status: 'captured',
          amount: 99900,
          currency: 'USD',
          captured: new Date().toISOString(),
        }),
      };
    }

    // Llamado real
    const res = await fetch(`https://sandbox.affirm.com/api/v2/charges/${charge_id}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`
        ).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Affirm API error: ${res.status} ${await res.text()}`);
    }

    const captureData = await res.json();
    return { statusCode: 200, headers, body: JSON.stringify(captureData) };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Affirm capture error:', message);
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
