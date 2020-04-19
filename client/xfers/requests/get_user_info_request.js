import BaseRequest from './base_request.js';

class GetUserInfoRequest extends BaseRequest {
  constructor(xfers_api_key) {
    super();
    this.xfers_api_key = xfers_api_key;
    this.method = 'get';
    this.relative_url = 'v3/user';
  }

  headers() {
    return {
      'Content-Type': 'application/json',
      'X-XFERS-USER-API-KEY': this.xfers_api_key,
    };
  }

  setup() {
    return {
      method: this.method,
      headers: this.headers(),
    };
  }
}

export default GetUserInfoRequest;
