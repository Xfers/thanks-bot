import schedule from 'node-schedule';
import {reward_amt, award_scheduler, nag_scheduler} from '../constants.js'

var j = schedule.scheduleJob(award_scheduler, function(){ 
  // create new winner from current month
  // initiate message them to initiate OTP flow
});

// everyday find unawarded winners
var j = schedule.scheduleJob(nag_scheduler, function(){ 
  // message them to initate OTP flow
});

