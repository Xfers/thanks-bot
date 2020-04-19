import * as xfersClient from './client/xfers/client.js';

console.log('executing test');
const res = xfersClient.get_bot_status();

console.log(res.json());
