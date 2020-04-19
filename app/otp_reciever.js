import * as slackClient from '../client/slack-client.js';

// This is invoked with "@thankbot OTP=<recievedOTP>" command
export function recieveOTP(ctx) {
  // recieve OTP from context, check whether this person is a winner and is not yet disbursed
  // if not winner, reply with "you dont have any remaining disbursements"
  // if checks are good, disburse money using xfers client
  // announce success -- "successfully disbursed ${reward_amt} to you"
}
