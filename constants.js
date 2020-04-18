export const port = process.env.PORT || 8080;
export const dburl = process.env.MONGODB_URI || "mongodb://localhost:27017/thanksbot"
export const bot_access_token = process.env.SLACK_BOT_ACCESS_TOKEN || "";
export const xfers_api_key = process.env.XFERS_CUSTOMER_API_KEY || "_B3pajsfwMuY-6793tqHgkHnHzUaa5_o4qzxR2bmZNY";
export const xfers_env = process.env.XFERS_ENV || "sandbox";
export const rate_limit_in_minutes = 5
export const help_msg = "\nWelcome to Xfers-Thankbot! \n The format to use is: `@thankbot <@person> for <reason>` without the `<>`"
export const bot_user_token = "U012QC15PAL";