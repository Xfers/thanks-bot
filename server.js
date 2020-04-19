import { port, dburl } from './constants.js';
import { updateDataIfNeeded } from './seed/seed.js';
import { startScheduler } from './scheduler/cron.js';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import * as botRouter from './app/bot-router.js';
import mongoose from 'mongoose';
import * as help from './app/help.js';
import * as invariant from './app/invariant-check.js';
import * as thankbot from './app/thankbot.js';

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

// update db from csv
updateDataIfNeeded();

// start scheduler
startScheduler();

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.post('/thanksbot', (req, res, next) => {
  botRouter.processRequest(req, res, [
    help.sendHelpMessage,
    invariant.checkInvariants,
    thankbot.addInvariants,
    thankbot.sendThanks,
  ]);
});

console.log('Server Started and listening at port:', port);
http.createServer(app).listen(port);
