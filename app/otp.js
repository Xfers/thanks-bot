import * as slackClient from '../client/slack-client.js';
import { Employee } from '../models/employee.js';
import { Winner } from '../models/winner.js';

// This is invoked with "@thankbot OTP" command
export async function sendOTP(ctx) {
  if (ctx.stripped_text.trim().toLowerCase() == 'OTP' || 
    ctx.stripped_text.trim().toLowerCase() == 'OTP') { 
      let winner = await checkSenderIsWinner(ctx.sender)
      if (winner) {
        // TODO: if those are good, send OTP via xfers api      
        // TODO: announce instructions to sender -- "Please reply OTP with `@thankbot OTP=<your otp>`"
      }
      return true
  }
}

// This is invoked with "@thankbot OTP=<recievedOTP>" command
export function recieveOTP(ctx) {
  // TODO: recieve OTP from context, check whether this person is a winner and is not yet disbursed
  // if not winner, reply with "you dont have any remaining disbursements"  
  // if checks are good, disburse money using xfers client
  // announce success -- "successfully disbursed ${reward_amt} to you"
}

async function checkSenderIsWinner(slack_token) {
  let candidate = await Employee.findOne({slack_token});
  var winner = await Winner.findOne({winner_id: candidate.id, disbursed_at: null})
  return winner
}