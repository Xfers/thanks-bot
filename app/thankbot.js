import * as slackClient from '../client/slack_client.js';
import moment from 'moment'
import { Employee } from '../models/employee.js'
import { Thank } from '../models/thank.js'

var rate_limit_in_minutes = 5

export async function send_thanks_if_possible(sender, tagged, channel, thread_ts, reason){
  var src = await Employee.findOne({ 'slack_token': sender });
  var dest = await Employee.findOne({ 'slack_token': tagged });

  // pull the employee given the sender and tagged
  const msg = did_user_vote_today(src) ? `<@${sender}>, you've already thanked someone in the last ${rate_limit_in_minutes} minutes! Try again in ${time_left_till_next_vote(src)} seconds!` : `<@${sender}> sent thanks to <@${tagged}> for${reason}!`
  const result = await slackClient.sendMessage(msg , channel, thread_ts)
  if (!did_user_vote_today(src) && result) {
    let t = new Thank({src_id: src.id, dest_id: dest.id, reason: reason})
    src.thanks_given.push(t)
    dest.thanks_recieved.push(t)
    await t.save()
    await src.save()
    await dest.save()
  }
}

function did_user_vote_today(src){
  if (src.thanks_given == undefined) return false
  if (src.thanks_given.length == 0) return false
  const idx = src.thanks_given.length - 1
  var a = moment(src.thanks_given[idx].created_at)
  var b = moment()
  return b.diff(a, 'minutes') < rate_limit_in_minutes
}

function time_left_till_next_vote(src){
  if (src.thanks_given == undefined) return 0
  if (src.thanks_given.count == 0) return 0
  const idx = src.thanks_given.length - 1
  var a = moment(src.thanks_given[idx].created_at)
  var b = moment()
  return rate_limit_in_minutes*60 - b.diff(a, 'seconds')
}