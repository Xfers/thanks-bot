import * as slackClient from '../client/slack-client.js';
import { help_msg, winner_help_msg } from '../constants.js';

export function sendHelpMessage(ctx) {
  // Display help if needed
  if (ctx.stripped_text.trim().toLowerCase() == 'help' || ctx.stripped_text.trim().toLowerCase() == 'how') {
    slackClient.sendMessage(`${help_msg}`, ctx);
    return true;
  }
  if (ctx.stripped_text.trim().toLowerCase() == 'winner help' || ctx.stripped_text.trim().toLowerCase() == 'winner how') {
    slackClient.sendMessage(`${winner_help_msg}`, ctx);
    return true;
  }
}
