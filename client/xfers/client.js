import { xfers_api_key } from '../../constants.js';
import * as xfersRequest from './requests/index.js';

export async function get_bot_status() {
  let xf_req = new xfersRequest.get_user_info(xfers_api_key);
  return await xf_req.send();
}

export async function send_otp_to_user(phone_no) {
  let xf_req = new xfersRequest.signup_login(phone_no);
  return await xf_req.send();
}

export async function get_token(otp, phone_no) {
  // we can know the account is verified or not here
  let xf_req = new xfersRequest.get_token(otp, phone_no);
  return await xf_req.send();
}

export async function payouts(phone_no) {
  // we can know the account is verified or not here
  let xf_req = new xfersRequest.payouts(phone_no);
  return await xf_req.send();
}
