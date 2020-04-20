// ** Dont need to modify this unless you need more params in ctx **
import { bot_user_token } from '../constants.js';
import moment from 'moment';

// Here is where we route the requests in the bot itself,
export async function processRequest(req, res, response_chain) {
  
  console.log(req.body);
  var body = req.body;
  if (body.challenge) {
    // handle challenge
    res.send(req.body);
    return;
  }

  // discard if not in the last 2 seconds
  const channel = body && body.event && body.event.event_ts;
  const event_ts = moment(Number(body.event.event_ts.substring(0, body.event.event_ts.indexOf('.'))));
  const current = moment();
  if (current.diff(event_ts, 'seconds') > 2) {
    console.log(`Ignoring old request`);
    res.send({ ignored: true });
    return
  }

  // Request params
  const channel = body && body.event && body.event.channel;
  const thread_ts = body && body.event.thread_ts;
  const sender = body && body.event.user;
  const raw_text = body && body.event.text;
  const stripped_text = raw_text.replace(`<@${bot_user_token}>`, '');
  const tagged = stripped_text.match(/(?<=(<@)).*(?=>)/g);

  var ctx = { sender, stripped_text, tagged, channel, thread_ts, res, req };

  var handled = false;
  for (let i = 0; i < response_chain.length; i++) {
    handled = await response_chain[i](ctx);
    if (handled) break;
  }

  res.send({ success: true });
}
