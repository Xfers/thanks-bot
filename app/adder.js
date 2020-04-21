import { Employee } from "../models/employee.js"

export async function addUser(ctx) {
  let candidate = await Employee.findOne({ slack_token: ctx.tagged_only });
  if (!candidate) {
    var employee = new Employee({slack_token: ctx.tagged_only})
    let res = await employee.save();
    if (res) {
      slackClient.sendMessage(`Added <@${ctx.tagged_only}> to thankbot, email: ${email}`, ctx);
    } else {
      slackClient.sendMessage(`Error adding <@${ctx.tagged_only}> to thankbot, email: ${email}`, ctx);
    }
  }
  return false
}