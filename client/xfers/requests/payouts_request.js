import sha1Hex from 'sha1-hex';
import BaseRequest from './base_request.js';
import { xfers_app_api_key, reward_amt } from '../../../constants.js';

class PayoutsRequest extends BaseRequest {
  constructor(recipient_phone_no) {
    super();
    this.recipient_phone_no = recipient_phone_no;
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
      amount: reward_amt,
      invoice_id: `thankbot_${today.getMonth() + 1}_${today.getFullYear()}_${Math.floor(Math.random() * 100)}`,
      recipient: this.recipient_phone_no,
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
