import * as slackClient from '../client/slack-client.js';

export function checkInvariants(ctx) {
  // [Invariant] Check if the user used "for"
  if (ctx.stripped_text.toLowerCase().indexOf('for') == -1) {
    slackClient.sendMessage(`<@${ctx.sender}> Whats this thanks for?`, ctx);
    return true;
  }
  // [Invariant] Check the number of people tagged should exactly 1
  if (ctx.tagged == null) {
    slackClient.sendMessage(`<@${ctx.sender}> You need at least one person to thank!`, ctx);
    return true;
  }
  // if too many people tagged
  if (ctx.stripped_text.match(/<@/g).length > 1) {
    slackClient.sendMessage(`<@${ctx.sender}> Only one person at a time please!`, ctx);
    return true;
  }
}
