import * as help from './help.js'
import * as invariant from './invariant-check.js'
import * as thankbot from './thankbot.js';

import {bot_user_token} from '../constants.js'

// Here is where we route the requests in the bot itself, 
// help
// thanks-for etc
export function process_request(req, res) {
  var body = req.body;
  console.log(body)

  // Request params
  const channel = body && body.event && body.event.channel
  if (body.challenge && !channel) { // handle challenge
    res.send(req.body);
    return
  }
  const thread_ts = body && body.event.thread_ts
  const sender = body && body.event.user
  const raw_text = body && body.event.text
  const stripped_text = raw_text.replace(`<@${bot_user_token}>`,'')
  const tagged = stripped_text.match(/(?<=(<@)).*(?=>)/g);
  var handled = false

  var ctx = { sender, stripped_text, tagged, channel, thread_ts, res, req }
  
  handled = help.sendHelpMessage(ctx);
  if (handled) return;

  handled = invariant.checkInvariants(ctx);
  if (handled) return;

  // add some invariant fields to ctx
  ctx.tagged_only = tagged[0]
  ctx.reason = stripped_text.substring(stripped_text.indexOf('for')+3)

  // thankbot actual
  handled = thankbot.sendThanksIfPossible(ctx);

  res.send(req.body);
}