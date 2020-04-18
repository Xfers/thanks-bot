import * as help from './help.js'
import * as invariant from './invariant-check.js'
import * as thankbot from './thankbot.js';

import {bot_user_token} from '../constants.js'

// Here is where we route the requests in the bot itself, 
// help
// thanks-for etc
export function process_request(req, res) {
  console.log(req.body)
  var body = req.body;
  if (body.challenge) { // handle challenge
    res.send(req.body);
    return
  }

  // Request params
  const channel = body && body.event && body.event.channel
  const thread_ts = body && body.event.thread_ts
  const sender = body && body.event.user
  const raw_text = body && body.event.text
  const stripped_text = raw_text.replace(`<@${bot_user_token}>`,'')
  const tagged = stripped_text.match(/(?<=(<@)).*(?=>)/g);
  
  var ctx = { sender, stripped_text, tagged, channel, thread_ts, res, req }
  
  var setInvariants = (ctx) => {
    // add some invariant fields to ctx
    ctx.tagged_only = tagged[0]
    ctx.reason = stripped_text.substring(stripped_text.indexOf('for')+3)
  }

  // response_chain accepts functions like (ctx) => {}
  var response_chain = [
    help.sendHelpMessage, 
    invariant.checkInvariants, 
    setInvariants, 
    thankbot.sendThanksIfPossible
  ]

  var handled = false
  for (let i=0; i<response_chain.length; i++) {
    handled = response_chain[i](ctx);
    if (handled) break;
  };

  res.send({success: true});
}