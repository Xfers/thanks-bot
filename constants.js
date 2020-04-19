// server
export const port = process.env.PORT || 8080;
export const dburl =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/thanksbot';

// slack bot
export const bot_access_token = process.env.SLACK_BOT_ACCESS_TOKEN || '';
export const rate_limit_in_minutes = 5;
export const help_msg =
  '\nWelcome to Xfers-Thankbot! \n The format to use is: `@thankbot <@person> for <reason>` without the `<>`';
export const bot_user_token = 'U012QC15PAL';
export const thankbot_announce_channel = 'C011KRYDDAB';
export const award_scheduler = '0 0 12 1 * ?'; // Every month on the 1st, at noon
export const nag_scheduler = '0 0 12 * * ?'; // Every day at noon - 12pm
export const reward_amt = 1;
export const reward_currency = 'SGD';

// xfers
export const xfers_api_key =
  process.env.XFERS_CUSTOMER_API_KEY ||
  '_B3pajsfwMuY-6793tqHgkHnHzUaa5_o4qzxR2bmZNY';
export const xfers_env = process.env.XFERS_ENV || 'sandbox';
export const xfers_app_api_key = process.env['X-XFERS-APP-API-KEY'] || '';
export const xfers_app_api_secret_key =
  process.env['X-XFERS-APP-API-SECRET'] || '';
