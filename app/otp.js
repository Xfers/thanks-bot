import * as slackClient from '../client/slack-client.js';
import { Employee } from '../models/employee.js';
import { Winner } from '../models/winner.js';

// This is invoked with "@thankbot OTP=<phone number>" command
export async function sendOTP(ctx) {
  let cmd = ctx.stripped_text.trim().toLowerCase();
  if (cmd.indexOf('OTP=') != -1) {
    let employee = await checkSenderIsWinner(ctx.sender);
    if (employee) {
      let phone_number_string = cmd.replace('OTP=').trim();
      // TODO: if those are good, send OTP via xfers api
      // TODO: announce instructions to sender -- "Please reply OTP with `@thankbot OTP=<your otp>`"
    } else {
      // if not winner, reply with "you dont have any remaining disbursements"
    }
    return true;
  }
}

// This is invoked with "@thankbot OTP-CODE=<recievedOTP>" command
export async function recieveOTP(ctx) {
  let cmd = ctx.stripped_text.trim().toLowerCase();
  if (cmd.indexOf('OTP-CODE=') != -1) {
    let employee = await checkSenderIsWinner(ctx.sender);
    if (employee) {
      let code = cmd.replace('OTP-CODE=').trim();
      // if checks are good, disburse money using xfers client
      // announce success -- "successfully disbursed ${reward_amt} to you"
    } else {
      // if not winner, reply with "you dont have any remaining disbursements"
    }
  }
}

async function checkSenderIsWinner(slack_token) {
  let candidate = await Employee.findOne({ slack_token });
  var winner = await Winner.findOne({
    winner_id: candidate.id,
    disbursed_at: null,
  });
  return winner ? candidate : null;
}
