import { port, dburl } from './constants.js';
import { startScheduler } from './scheduler/cron.js';
import { heroku_url } from './constants.js';
import { wakeUpDyno } from './wake.js';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import * as botRouter from './app/bot-router.js';
import mongoose from 'mongoose';
import * as help from './app/help.js';
import * as invariant from './app/invariant-check.js';
import * as thankbot from './app/thankbot.js';
import * as otpFlow from './app/otp.js';
import * as adder from './app/adder.js';

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

// start scheduler
startScheduler();

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  console.log('Get / called');
  res.send({ success: true });
});

app.post('/thanksbot', (req, res, next) => {
  botRouter.processRequest(req, res, [adder.addUser, otpFlow.receivePhone, help.sendHelpMessage, invariant.checkInvariants, thankbot.addInvariants, thankbot.sendThanks]);
});

console.log('Server Started and listening at port:', port);
http.createServer(app).listen(port, () => {
  wakeUpDyno(heroku_url);
});
