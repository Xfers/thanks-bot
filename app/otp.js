import * as xfersClient from '../client/xfers/client.js';
import * as slackClient from '../client/slack-client.js';
import { Employee } from '../models/employee.js';
import { Winner } from '../models/winner.js';

// This is invoked with "@thankbot phone=<phone number>" command
export async function receivePhone(ctx) {
  let cmd = ctx.stripped_text.trim();
  if (cmd.indexOf('phone=') != -1) {
    let employee = await checkSenderIsWinner(ctx.sender);
    if (employee) {
      let phone_number_string = cmd.toLowerCase().replace('phone=', '').trim();
      // check code if valid
      // if checks are good, disburse money using xfers client
      // if code invalid or disbursement failure, send error message here
      res = await xfersClient.payouts(phone_number_string);
      // announce success -- "successfully disbursed ${reward_amt} to you"
      let winner = await winnerWithId(employee.id);
      slackClient.sendMessage(`Congratulations <@${ctx.sender}>! @Thankbot sent ${winner.amount}${winner.currency} to your xfers account!`, ctx);
    } else {
      slackClient.sendMessage(`<@${ctx.sender}>, You don't have any awards waiting to be disbursed`, ctx);
    }
    return true;
  }
}

async function checkSenderIsWinner(s_t) {
  console.log(s_t);
  let candidate = await Employee.findOne({ slack_token: s_t });
  console.log(candidate);
  console.log(candidate.id);
  var winner = await winnerWithId(candidate.id);
  console.log(winner);
  return winner ? candidate : null;
}

async function winnerWithId(id) {
  return await Winner.findOne({
    winner_id: id,
    disbursed_at: null,
  });
}
