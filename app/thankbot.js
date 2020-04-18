import * as slackClient from '../client/slack_client.js';
import moment from 'moment'
import { Employee } from '../models/employee.js'
import { Thank } from '../models/thank.js'
import {rate_limit_in_minutes} from '../constants.js'

export async function sendThanksIfPossible(sender, tagged, channel, thread_ts, reason){
  var src = await Employee.findOne({ 'slack_token': sender });
  var dest = await Employee.findOne({ 'slack_token': tagged });

  // FIXME: the return false in catch seems not returning false?
  if(!is_valid({src, dest, sender, channel, thread_ts, reason})) return
  // pull the employee given the sender and tagged
  const msg = `<@${sender}> sent thanks to <@${tagged}> for${reason}!`
  const result = await slackClient.sendMessage(msg , channel, thread_ts)
  if (result) {
    let t = new Thank({src_id: src.id, dest_id: dest.id, reason: reason})
    src.thanks_given.push(t)
    dest.thanks_recieved.push(t)
    await t.save()
    await src.save()
    await dest.save()
  }
}

// validations

function is_valid({src, dest, sender, channel, thread_ts, reason}) {
  try {
    check_invalid_dest({dest, channel, thread_ts})
    same_as_previous_thanks({src, channel, thread_ts, reason})
    check_user_vote_today({src, sender})
  } catch (e) {
    console.error("Validation failed", e)
    return false
  }
  return true
}

async function check_invalid_dest({dest, channel, thread_ts}) {
  if (dest == undefined) {
    await slackClient.sendMessage("[Error] Undefined user! did we add them to thanksbot?" , channel, thread_ts)
    throw new Error('Invalid destination');
  }
}

async function same_as_previous_thanks({src, channel, thread_ts, reason}) {
  if (src.thanks_given == undefined) return false
  if (src.thanks_given.length == 0) return false
  const idx = src.thanks_given.length - 1
  if (src.thanks_given[idx].reason == reason) {
    await slackClient.sendMessage("[Error] Same reason as previous" , channel, thread_ts)
    throw new Error('Duplicate reason');
  }
}

async function check_user_vote_today({src, sender}){
  if (src.thanks_given == undefined) return false
  if (src.thanks_given.length == 0) return false
  const idx = src.thanks_given.length - 1
  var a = moment(src.thanks_given[idx].created_at)
  var b = moment()
  const msg = `<@${sender}>, you've already thanked someone in the last ${rate_limit_in_minutes} minutes! Try again in ${time_left_till_next_vote(src)} seconds!`
  if (b.diff(a, 'minutes') < rate_limit_in_minutes) {
    await slackClient.sendMessage(`[Error] ${msg}` , channel, thread_ts)
    throw new Error('Voted today');
  }
}

// utilities

function time_left_till_next_vote(src){
  if (src.thanks_given == undefined) return 0
  if (src.thanks_given.count == 0) return 0
  const idx = src.thanks_given.length - 1
  var a = moment(src.thanks_given[idx].created_at)
  var b = moment()
  return rate_limit_in_minutes*60 - b.diff(a, 'seconds')
}
