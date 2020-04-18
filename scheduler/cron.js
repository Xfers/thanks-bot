import schedule from 'node-schedule';

var rule = new schedule.RecurrenceRule();
rule.minute = 15;

var j = schedule.scheduleJob(rule, function(){
  // first day of each month, announce winner and disburse money
  // 
  console.log('The answer to life, the universe, and everything!');
});