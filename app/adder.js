import { Employee } from "../models/employee"

export async function addUser(ctx) {
  let cmd = ctx.stripped_text.trim();
  if (cmd.indexOf('add') != -1 && cmd.indexOf('[') != -1 && cmd.indexOf(']') != -1) {
    let email = ctx.stripped_text.match(/(?!\[).*(?=])/g)
    var employee = new Employee({slack_token: ctx.tagged_only, email: email})
    let res = await employee.save();
    if (res) {
      slackClient.sendMessage(`Added <@${ctx.tagged_only}> to thankbot, email: ${email}`, ctx);
    } else {
      slackClient.sendMessage(`Error adding <@${ctx.tagged_only}> to thankbot, email: ${email}`, ctx);
    }
    return true;
  }
}