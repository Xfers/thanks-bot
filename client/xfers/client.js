import * as xfersRequest from './requests/index.js';

export async function payouts(phone_no) {
  // we can know the account is verified or not here
  let xf_req = new xfersRequest.payouts(phone_no);
  return await xf_req.send();
}
