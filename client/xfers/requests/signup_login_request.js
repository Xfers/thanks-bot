import sha1Hex from 'sha1-hex';
import BaseRequest from './base_request.js';
import {
  xfers_app_api_key,
  xfers_app_api_secret_key,
} from '../../../constants.js';

class SignupLoginRequest extends BaseRequest {
  constructor(phone_no) {
    super();
    this.phone_no = phone_no;
    this.method = 'post';
    this.relative_url = '/v3/authorize/signup_login';
  }

  headers() {
    return {
      'Content-Type': 'application/json',
      'X-XFERS-APP-API-KEY': xfers_app_api_key,
    };
  }

  body() {
    return {
      phone_no: this.phone_no,
      signature: sha1Hex(`${this.phone_no}${xfers_app_api_secret_key}`),
    };
  }

  setup() {
    return {
      method: this.method,
      headers: this.headers(),
      body: this.body(),
    };
  }
}

export default SignupLoginRequest;
