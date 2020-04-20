// server
export const port =                      process.env.PORT || 8080;
export const dburl =                     process.env.MONGODB_URI || 'mongodb://localhost:27017/thanksbot';

// slack bot
export const bot_user_token =            'U012QC15PAL';
export const bot_access_token =          process.env['SLACK_BOT_ACCESS_TOKEN'] || '';
export const rate_limit_in_minutes =     process.env.RATE_LIMIT_IN_MINUTES || 5;
export const help_msg =                  process.env.HELP_MSG || '\nWelcome to Xfers_Thankbot!\n The format to use is: `@ThankBot <@person> for <reason>` without the `<>`';
export const thankbot_announce_channel = process.env.THANKBOT_ANNOUNCE_CHANNEL || 'C011KRYDDAB';
export const nag_scheduler =             process.env.NAG_SCHEDULER || '0 0 12 * * ?'; // Every day at noon - 12pm
export const award_scheduler =           process.env.AWARD_SCHEDULER || '0 0 12 L * ?'; // Every month on the last day of the month, at noon
export const seasonality =               process.env.SEASONALITY || 'month'; // this must be changed with the schedules
export const reward_amt =                process.env.REWARD_AMT || 50;
export const reward_currency =           process.env.REWARD_CURRENCY || 'SGD';
export const generate_winner =           process.env.GENERATE_WINNER || "false";

// xfers
export const xfers_api_key =             process.env.X_XFERS_USER_API_KEY || '_B3pajsfwMuY_6793tqHgkHnHzUaa5_o4qzxR2bmZNY';
export const xfers_env =                 process.env.XFERS_ENV || 'sandbox';
export const xfers_app_api_key =         process.env.X_XFERS_APP_API_KEY || '';
export const xfers_app_api_secret_key =  process.env.X_XFERS_APP_API_SECRET || '';
