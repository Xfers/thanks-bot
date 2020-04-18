import * as xfersClient from '../client/xfers/client.js';

export function getBotStatus(ctx) {
  // Display status of thanksbot account
  if (
    ctx.stripped_text.trim().toLowerCase() == 'status'
    ) {
      xfersClient.get_bot_status(); return true
  }

}
