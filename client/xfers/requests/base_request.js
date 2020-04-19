import fetch from 'node-fetch';
import { xfers_env } from '../../../constants.js';

class BaseRequest {
  constructor() {
    this.method;
    this.base_url =
      xfers_env == 'production'
        ? 'https://www.xfers.io/api/'
        : 'https://sandbox.xfers.io/api/';
    this.relative_url = '';
  }

  headers() {
    throw "sub class didn't define headers";
  }

  body() {}

  url() {
    return `${this.base_url}${this.relative_url}`;
  }

  setup() {
    return {
      method: this.method,
      headers: this.headers(),
      body: this.body(),
    };
  }

  async send() {
    console.log(this.url(), this.setup());
    return await fetch(this.url(), this.setup());
  }
}

export default BaseRequest;
