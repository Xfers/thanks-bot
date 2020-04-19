import sha1Hex from 'sha1-hex';
import BaseRequest from './base_request.js';
import { xfers_app_api_key } from '../../../constants.js';

class PayoutsRequest extends BaseRequest {
  constructor(recipient_api_token) {
    super();
    this.recipient_api_token = recipient_api_token;
    this.method = 'post';
    this.relative_url = '/v3/payouts';
  }

  headers() {
    return {
      'Content-Type': 'application/json',
      'X-XFERS-APP-API-KEY': xfers_app_api_key,
    };
  }

  body() {
    const today = new Date();
    return {
      amount: 50,
      invoice_id: `thankbot_${today.getMonth() + 1}_${today.getFullYear()}_${Math.floor(Math.random() * 100)}`,
      user_api_token: this.recipient_api_token,
      description: 'Most thanks receiver for this month',
    };
  }

  setup() {
    return {
      method: this.method,
      headers: this.headers(),
      body: JSON.stringify(this.body()),
    };
  }
}

export default PayoutsRequest;
