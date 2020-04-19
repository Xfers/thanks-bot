import schedule from 'node-schedule';
import moment from 'moment';
import { reward_currency, reward_amt, award_scheduler, nag_scheduler, thankbot_announce_channel } from '../constants.js';
import * as slackClient from '../client/slack-client.js';
import { Thank } from '../models/thank.js';
import { Winner } from '../models/winner.js';
import { Employee } from '../models/employee.js';

export async function startScheduler() {

  /* TEST CODE TO ADD A WINNER ON SERVER START
  let winner = await calculateWinner();
    let winner_employee = await Employee.findOne({ _id: winner.winner_id });
    slackClient.sendMessage(
      `Winner for the month of ${moment(winner.start).format('MMMM')} is <@${winner_employee.slack_token}>! <@${winner_employee.slack_token}> please reply with \`@thankbot OTP=<+6512345678>\` to redeem your award! (no \`<>\`)`,
      { channel: thankbot_announce_channel }
    );
  */

  // award job
  schedule.scheduleJob(award_scheduler, async () => {
    let winner = await calculateWinner();
    let winner_employee = await Employee.findOne({ _id: winner.winner_id });
    slackClient.sendMessage(
      `Winner for the month of ${moment(winner.start).format('MMMM')} is <@${winner_employee.slack_token}>! <@${winner_employee.slack_token}> please reply with \`@thankbot OTP=<+6512345678>\` to redeem your award! (no \`<>\`)`,
      { channel: thankbot_announce_channel }
    );
  });

  // nag job
  // everyday find unawarded winners
  schedule.scheduleJob(nag_scheduler, async () => {
    let uncollected_winners = await Winner.find({ disbursed_at: null });
    uncollected_winners.forEach(async winner => {
      let winner_employee = await Employee.findOne({ id: winner.id });
      if (winner_employee) {
        slackClient.sendMessage(
          `Winner for the month of ${moment(winner.start).format('MMMM')} is <@${winner_employee.slack_token}>! <@${winner_employee.slack_token}> please reply with \`@thankbot OTP=<+6512345678>\` to redeem your award! (no \`<>\`)`,
          { channel: thankbot_announce_channel }
        );
      }
    });
  });
}

async function calculateWinner() {
  // create new winner from current month
  var start = moment()
    .subtract(1, 'day')
    .startOf('month')
    .format();
  var end = moment()
    .subtract(1, 'day')
    .endOf('month')
    .format();
  var thanks_for_month = await Thank.find({
    created_at: { $gte: start, $lte: end },
  });
  var count_by_user = {};
  var user_by_thanks = {};
  thanks_for_month.forEach(t => {
    if (count_by_user[t.src_id] == undefined) {
      count_by_user[t.src_id] = 1;
    } else {
      count_by_user[t.src_id] += 1;
    }
    if (user_by_thanks[t.src_id] == undefined) {
      user_by_thanks[t.src_id] = [t];
    } else {
      user_by_thanks[t.src_id].push(t);
    }
  });

  var winner_id = '';
  var high_score = 0;

  // TODO: doesnt handle draws!!
  Object.keys(count_by_user).forEach(uid => {
    if (count_by_user[uid] > high_score) {
      winner_id = uid;
      high_score = count_by_user[uid];
    }
  });
  console.log(count_by_user);
  console.log(winner_id, high_score);
  console.log(user_by_thanks);

  // TODO: currency not handled!!
  let winner = new Winner({
    winner_id,
    start,
    end,
    thanks_recv: user_by_thanks[winner_id],
    amount: reward_amt,
    currency: reward_currency,
  });
  winner.save();
  return winner;
}
