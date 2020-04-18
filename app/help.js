import * as slackClient from '../client/slack-client.js';
import {help_msg} from '../constants.js'

export function sendHelpMessage(ctx) {
  // Display help if needed
  if (
    ctx.stripped_text.trim().toLowerCase() == 'help' || 
    ctx.stripped_text.trim().toLowerCase() == 'how'
    ) { 
      slackClient.sendMessage(`${help_msg}`, ctx); 
      ctx.res.send({sucess: true}); 
      return true 
  }

}