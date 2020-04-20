import * as xfersClient from './client/xfers/client.js';
import moment from 'moment'

console.log('executing test');
xfersClient.send_otp_to_user('+6581566898').then((res) => {
  console.log(res);
  res.json().then((json_res) => {
    console.log(json_res);
  });
});

const event_ts = moment.unix(Number("1587358371.123123"))
console.log(event_ts.format())
const current = moment();
if (current.diff(event_ts, 'seconds') > 5) {
  console.log(`Ignoring old request: ${current.diff(event_ts, 'seconds')} seconds ago`);
}