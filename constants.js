// server
export const port = process.env.PORT || 8080;
export const dburl = process.env.MONGODB_URI || 'mongodb://localhost:27017/thanksbot';
export const heroku_url = 'https://shielded-brook-61543.herokuapp.com';

// slack bot
export const bot_user_token = 'U012QC15PAL';
export const bot_access_token = process.env['SLACK_BOT_ACCESS_TOKEN'] || '';
export const rate_limit_in_minutes = process.env.RATE_LIMIT_IN_MINUTES || 5;
export const help_msg =
  '\nWelcome to Xfers Thankbot!\n \
Thankbot is here to encourage everyone to show their appreciation\n\
for others in the team! Send them a thanks with thankbot!\n\
\n\
At the end of every month, the system picks out the person\n\
who receives the most thanks and will DISBURSE them a set\n\
amount of money to their xfers account!\n\
So keep those messages of appreciations coming!\n\
\n\
The format to use is: `@ThankBot [@PERSON] for [REASON]` without the `[ ]`\n\
Also do follow winner announcements on #tf-xfers-thanksbot\n\
For help with award collection, use `@Thankbot Winner help`\n\
\n\
\n\
This bot was brought to you by the folks at #tf-xfers-thanksbot \n\
help contribute to thanksbot development here: https://www.notion.so/xfers/Developing-for-ThanksBot-eb573ed32b57472aaa5a2b629a17f5f8';

export const winner_help_msg =
  "In order for you to receive the payout from the bot, you'll need an xfers account \n\
in the environment thats being used by the bot. staging or sandbox or production. \n\
Creating an account should be quite straightforward. Verification is NOT required\n\
\n\
To collect your award, the format is `@thankbot phone=+6512345678`";

export const thankbot_announce_channel = process.env.THANKBOT_ANNOUNCE_CHANNEL || 'C011KRYDDAB'; // C028XNGTH general
export const nag_scheduler = process.env.NAG_SCHEDULER || '0 0 12 * * ?'; // Every day at noon - 12pm
export const award_scheduler = process.env.AWARD_SCHEDULER || '0 0 12 L * ?'; // Every month on the last day of the month, at noon
export const seasonality = process.env.SEASONALITY || 'month'; // this must be changed with the schedules
export const reward_amt = process.env.REWARD_AMT || 50;
export const reward_currency = process.env.REWARD_CURRENCY || 'SGD';
export const generate_winner = process.env.GENERATE_WINNER || 'false';

// xfers
export const xfers_env = process.env.XFERS_ENV || 'sandbox';
export const xfers_app_api_key = process.env.X_XFERS_APP_API_KEY || '';
export const xfers_app_api_secret_key = process.env.X_XFERS_APP_API_SECRET || '';

// day -- 00 00 21 * * ? *  // everyday at 9pm
