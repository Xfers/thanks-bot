import * as xfersClient from '../client/xfers/client.js';
import * as slackClient from '../client/slack-client.js';
import { Employee } from '../models/employee.js';
import { Winner } from '../models/winner.js';

// This is invoked with "@thankbot OTP=<phone number>" command
export async function sendOTP(ctx) {
  let cmd = ctx.stripped_text.trim();
  console.log(cmd.indexOf('OTP='));
  if (cmd.indexOf('OTP=') != -1) {
    console.log(ctx.sender)
    let uncollected_winners = await Winner.find({ disbursed_at: null });
    console.log(uncollected_winners)
    let employee = await checkSenderIsWinner(ctx.sender);
    console.log(employee)
    if (employee) {
      let phone_number_string = cmd.replace('OTP=','').trim();
      let res = await xfersClient.send_otp_to_user(phone_number_string);
      let json_result = await res.json();
      if (json_result['msg'] == 'success') {
        slackClient.sendMessage(`<@${ctx.sender}> @Thankbot has sent you an OTP, please reply with @thankbot OTP=<+6512345678> to proceed. (no \`<>\`)`, ctx);
      } else {
        slackClient.sendMessage(`<@${ctx.sender}> @Thankbot failed to sent you an OTP, please retry. error_code:${JSON.stringify(json_result)}`, ctx);
      }
    } else {
      slackClient.sendMessage(`<@${ctx.sender}>, You don't have any awards waiting to be disbursed`, ctx);
    }
    return true;
  }
}

// This is invoked with "@thankbot OTP-CODE=<recievedOTP>" command
export async function recieveOTP(ctx) {
  let cmd = ctx.stripped_text.trim();
  if (cmd.indexOf('OTP-CODE=') != -1) {
    let employee = await checkSenderIsWinner(ctx.sender);
    if (employee) {
      let code = cmd.replace('OTP-CODE=','').trim();
      // check code if valid
      // if checks are good, disburse money using xfers client
      // if code invalid or disbursement failure, send error message here

      // announce success -- "successfully disbursed ${reward_amt} to you"
      let winner = await winnerWithId(employee.id);
      slackClient.sendMessage(`Congratulations <@${ctx.sender}>! @Thankbot sent ${winner.amount}${winner.curreny} to your xfers account!`, ctx);
    } else {
      slackClient.sendMessage(`<@${ctx.sender}>, You don't have any awards waiting to be disbursed`, ctx);
    }
    return true;
  }
}

async function checkSenderIsWinner(s_t) {
  console.log(s_t)
  let candidate = await Employee.findOne({ slack_token: s_t });
  console.log(candidate)
  console.log(candidate.id)
  var winner = await winnerWithId(candidate.id);
  console.log(winner)
  return winner ? candidate : null;
}

async function winnerWithId(id) {
  return await Winner.findOne({
    winner_id: id,
    disbursed_at: null,
  });
}
