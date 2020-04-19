import * as xfersClient from './client/xfers/client.js';

console.log('executing test');
xfersClient.send_otp_to_user('+6581566898').then((res) => {
  console.log(res);
  res.json().then((json_res) => {
    console.log(json_res);
  });
});
