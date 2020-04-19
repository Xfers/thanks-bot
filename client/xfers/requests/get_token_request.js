import sha1Hex from 'sha1-hex';
import qs from 'qs';
import BaseRequest from './base_request.js';
import {
  xfers_app_api_key,
  xfers_app_api_secret_key,
} from '../../../constants.js';

class GetToken extends BaseRequest {
  constructor(otp, phone_no) {
    super();
    // TODO: might need to escape the '+' in phone_no
    const signature = sha1Hex(
      `${encodeURIComponent(phone_no)}${otp}${xfers_app_api_secret_key}`
    );
    const query = { otp, phone_no, signature };
    this.method = 'get';
    this.relative_url = `/v3/authorize/get_token?${qs.stringify(query)}`;
  }

  headers() {
    return {
      'Content-Type': 'application/json',
      'X-XFERS-APP-API-KEY': xfers_app_api_key,
    };
  }

  setup() {
    return {
      method: this.method,
      headers: this.headers(),
    };
  }
}

export default GetToken;
