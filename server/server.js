
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import * as requestProcessor from './app/app.js'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/thanksbot', {useNewUrlParser: true, useUnifiedTopology: true});

var port = 7000;
var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

app.post('/', requestProcessor.process_request);

console.log(
  "Server Started and listening at port:", port
)
http.createServer(app).listen(port);

