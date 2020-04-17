
import fetch from 'node-fetch'
var bot_access_token = "xoxb-2303764927-1092409193360-g266jWUEb9fOhYgqD5swm4Lc";

export async function sendMessage(text, channel, thread_ts) {
  console.log(`Sending text: ${text}`)
  // Echo back 
  // reply to channel if thread_ts is missing
  // https://api.slack.com/methods/chat.postMessage#arg_thread_ts
  const result = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'post',
      body:    JSON.stringify({
        "channel":channel, 
        "thread_ts": thread_ts, 
        "text":  text // CHANGE MESSAGE FORMAT HERE
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bot_access_token}`
      },
  })
  return result
}
