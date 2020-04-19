import * as xfersClient from './client/xfers/client.js';

console.log('executing test');
xfersClient.get_bot_status().then(res => {
  res.json().then(json_res => {
    console.log(json_res)
  })
});
