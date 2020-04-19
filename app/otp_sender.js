import * as slackClient from '../client/slack-client.js';

// This is invoked with "@thankbot OTP" command
export function sendOTP(ctx) {
  // check sender is a winner and is awarded and not yet disbursed
  // if those are good, send OTP via xfers api
  // announce instructions to sender -- "Please reply OTP with `@thankbot OTP=<your otp>`"
}
