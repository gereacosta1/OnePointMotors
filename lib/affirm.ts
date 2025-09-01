interface AffirmConfig {
  publicKey: string;
  environment: 'sandbox' | 'production';
}

export class AffirmService {
  private config: AffirmConfig;

  constructor(config: AffirmConfig) {
    this.config = config;
  }

  async createCheckout(checkoutData: any) {
    try {
      const response = await fetch('/api/affirm-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Affirm checkout error:', error);
      throw error;
    }
  }

  async authorizeCharge(checkoutToken: string) {
    try {
      const response = await fetch('/api/affirm-authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkout_token: checkoutToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Affirm authorize error:', error);
      throw error;
    }
  }

  async captureCharge(chargeId: string) {
    try {
      const response = await fetch('/api/affirm-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ charge_id: chargeId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Affirm capture error:', error);
      throw error;
    }
  }

  redirectToAffirm(checkoutToken: string) {
    const baseUrl = this.config.environment === 'sandbox' 
      ? 'https://sandbox.affirm.com/api/v2/checkout'
      : 'https://api.affirm.com/api/v2/checkout';
    
    window.location.href = `${baseUrl}/${checkoutToken}`;
  }
}

// Export a configured instance
export const affirmService = new AffirmService({
  publicKey: process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY || 'sandbox_public_key',
  environment: (process.env.NEXT_PUBLIC_AFFIRM_ENV as 'sandbox' | 'production') || 'sandbox',
});