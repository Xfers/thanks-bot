
import fetch from 'node-fetch'
import {bot_access_token} from '../constants.js'

export async function sendMessage(text, ctx) {
  console.log(`Sending text: ${text}`)
  let prefix = process.env.NODE_ENV == 'development'? '[DEV]' : ''
  // Echo back 
  // reply to channel if thread_ts is missing
  // https://api.slack.com/methods/chat.postMessage#arg_thread_ts
  const result = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'post',
      body:    JSON.stringify({
        "channel": ctx.channel, 
        "thread_ts": ctx.thread_ts, 
        "text":  prefix + text // CHANGE MESSAGE FORMAT HERE
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bot_access_token}`
      },
  })
  return result
}
