var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var port = 7000;
var app = express();
var bot_access_token = "xoxb-2303764927-1092409193360-yhJIMjqhZnLoZ4EU16NDUDfg";
var bot_user_token = "U012QC15PAL";

app.use(bodyParser.text({
  type: function(req) {
    return 'text';
  }
}));

app.post('/', function (req, res) {
  console.log('got post')
  console.log(req.body);
  body = JSON.parse(req.body);
  console.log(body);
  var channel = body && body.event.channel
  var thread_ts = body && body.event.thread_ts
  var sender = body && body.event.user
  var raw_text = body && body.event.text
  var stripped_text = raw_text.replace(`<@${bot_user_token}>`,'')
  
  // Echo back 
  // reply to channel if thread_ts is missing
  // https://api.slack.com/methods/chat.postMessage#arg_thread_ts
  fetch('https://slack.com/api/chat.postMessage', {
      method: 'post',
      body:    JSON.stringify({
        "channel":channel, 
        "thread_ts": thread_ts, 
        "text": `<@${sender}>: ${stripped_text}`
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xoxb-2303764927-1092409193360-yhJIMjqhZnLoZ4EU16NDUDfg'
      },
  })

  res.send(req.body);
});

console.log(
  "Server Started and listening at port:", port
)
http.createServer(app).listen(port);

