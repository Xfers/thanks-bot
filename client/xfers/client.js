import { xfers_api_key } from '../../constants.js';
import * as xfersRequest from './requests/index.js';

export function get_bot_status() {
  return new xfersRequest.get_user_info(xfers_api_key).send();
}

export async function get_user_status(xfers_user_key) {
  return new xfersRequest.get_user_info(xfers_user_key).send();
}
