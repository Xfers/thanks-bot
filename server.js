import {port, dburl} from './constants.js'
import {updateDataIfNeeded} from './seed/seed.js'
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import * as requestProcessor from './app/bot-router.js'
import mongoose from 'mongoose'

mongoose.connect(dburl, {useNewUrlParser: true, useUnifiedTopology: true});

updateDataIfNeeded()

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

app.post('/thanksbot', requestProcessor.process_request);

console.log(
  "Server Started and listening at port:", port
)
http.createServer(app).listen(port);

