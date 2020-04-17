import * as slackClient from '../client/slack_client.js';
import * as thankbot from './thankbot.js';

var bot_user_token = "U012QC15PAL";
var help_msg = "\nWelcome to Xfers-Thankbot! \n The format to use is: `@thankbot <@person> for <reason>` without the `<>`"

export function process_request(req, res) {
  var body = req.body;
  console.log(body)
  // Request params
  const channel = body && body.event && body.event.channel
  if (body.challenge && !channel) {
    res.send(req.body);
    return
  }
  const thread_ts = body && body.event.thread_ts
  const sender = body && body.event.user
  const raw_text = body && body.event.text
  const stripped_text = raw_text.replace(`<@${bot_user_token}>`,'')

  // Display help if needed
  if (
    stripped_text.trim().toLowerCase() == 'help' || 
    stripped_text.trim().toLowerCase() == 'how'
    ) { slackClient.sendMessage(`${help_msg}`, channel, thread_ts); res.send({sucess: true}); return }

  // [Invariant] Check if the user used "for"
  if (stripped_text.toLowerCase().indexOf('for') == -1) { slackClient.sendMessage(`<@${sender}> Whats this thanks for?`, channel, thread_ts); res.send({sucess: true}); return }
  
  // [Invariant] Check the number of people tagged should exactly 1
  const tagged = stripped_text.match(/(?<=(<@)).*(?=>)/g);
  if (req.body && tagged == null) { slackClient.sendMessage(`<@${sender}> You need at least one person to thank!`, channel, thread_ts); res.send({sucess: true}); return } // if noone is tagged
  if (stripped_text.match(/<@/g).length > 1) { slackClient.sendMessage(`<@${sender}> Only one person at a time please!`, channel, thread_ts); res.send({sucess: true}); return} // if too many people tagged

  // [Invariant] Make sure not thanking yourself
  if (tagged[0].trim() == sender.trim()) { slackClient.sendMessage(`<@${sender}>, you can't thank yourself!`, channel, thread_ts); res.send({sucess: true}); return} // if too many people tagged

  // Passes all the invariants, send to thankbot for bookingkeeping and sending
  const reason = stripped_text.substring(stripped_text.indexOf('for')+3)
  thankbot.sendThanksIfPossible(sender, tagged[0], channel, thread_ts, reason);
  res.send(req.body);
}