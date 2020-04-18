import * as slackClient from '../client/slack-client.js';
import moment from 'moment'
import { Employee } from '../models/employee.js'
import { Thank } from '../models/thank.js'
import {rate_limit_in_minutes} from '../constants.js'

export function addInvariants(ctx){
  ctx.tagged_only = tagged[0]
  ctx.reason = stripped_text.substring(stripped_text.indexOf('for')+3)
}

export async function sendThanks(ctx){
  var src = await Employee.findOne({ 'slack_token': ctx.sender });
  var dest = await Employee.findOne({ 'slack_token': ctx.tagged_only });

  // FIXME: the return false in catch seems not returning false?
  if(!is_valid({src, dest, ctx})) return
  // pull the employee given the sender and tagged
  const msg = `<@${ctx.sender}> sent thanks to <@${ctx.tagged_only}> for${ctx.reason}!`
  const result = await slackClient.sendMessage(msg, ctx)
  if (result) {
    let t = new Thank({src_id: src.id, dest_id: dest.id, reason: ctx.reason})
    src.thanks_given.push(t)
    dest.thanks_recieved.push(t)
    await t.save()
    await src.save()
    await dest.save()
  }
}

// validations

function is_valid({src, dest, ctx}) {
  try {
    check_invalid_dest({dest, ctx})
    same_as_previous_thanks({src, ctx})
    check_user_vote_today({src, ctx})
  } catch (e) {
    console.error("Validation failed", e)
    return false
  }
  return true
}

async function check_invalid_dest({dest, ctx}) {
  if (dest == undefined) {
    await slackClient.sendMessage("[Error] Undefined user! did we add them to thanksbot?" , ctx)
    throw new Error('Invalid destination');
  }
}

async function same_as_previous_thanks({src, ctx}) {
  if (src.thanks_given == undefined) return false
  if (src.thanks_given.length == 0) return false
  const idx = src.thanks_given.length - 1
  if (src.thanks_given[idx].reason == ctx.reason) {
    await slackClient.sendMessage("[Error] Same reason as previous" , ctx)
    throw new Error('Duplicate reason');
  }
}

async function check_user_vote_today({src, ctx}){
  if (src.thanks_given == undefined) return false
  if (src.thanks_given.length == 0) return false
  const idx = src.thanks_given.length - 1
  var a = moment(src.thanks_given[idx].created_at)
  var b = moment()
  const msg = `<@${ctx.sender}>, you've already thanked someone in the last ${rate_limit_in_minutes} minutes! Try again in ${time_left_till_next_vote(src)} seconds!`
  if (b.diff(a, 'minutes') < rate_limit_in_minutes) {
    await slackClient.sendMessage(`[Error] ${msg}` , ctx)
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
