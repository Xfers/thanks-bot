import schedule from 'node-schedule';
import {reward_amt, award_scheduler, nag_scheduler, thankbot_test_channel} from '../constants.js'
import * as slackClient from '../client/slack-client.js';

export function startScheduler() {
  // award job
  schedule.scheduleJob(award_scheduler, function(){ 
    // create new winner from current month
    
    // implementation
    // 1) get current time, go through all the thanks and find all of the current month ones
    // 2) add that to 2 hashmaps, one with count and one with the thanks array
    // 3) find the user with the hashmap with count
    // 4) create the winner object with the thanks array

    // initiate message them to initiate OTP flow
  });

  // nag job
  schedule.scheduleJob(nag_scheduler, function(){
    // everyday find unawarded winners
    // message them to initate OTP flow
    slackClient.sendMessage("nag_scheduler", {channel: thankbot_test_channel})
  });
}