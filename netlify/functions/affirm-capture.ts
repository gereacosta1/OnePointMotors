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
    const { charge_id } = JSON.parse(event.body);

    if (!charge_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Charge ID is required' }),
      };
    }

    // In sandbox mode, return mock response
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

    // Real Affirm API call
    const affirmResponse = await fetch(`https://sandbox.affirm.com/api/v2/charges/${charge_id}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.AFFIRM_PUBLIC_KEY}:${process.env.AFFIRM_PRIVATE_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!affirmResponse.ok) {
      throw new Error(`Affirm API error: ${affirmResponse.status}`);
    }

    const captureData = await affirmResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(captureData),
    };

  } catch (error) {
    console.error('Affirm capture error:', error);
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