import { Employee } from "../models/employee.js"

export async function addUser(ctx) {
  let candidate = await Employee.findOne({ slack_token: ctx.tagged_only });
  let sender = await Employee.findOne({ slack_token: ctx.sender });
  if (!candidate) {
    var employee = new Employee({slack_token: ctx.tagged_only})
    await employee.save();
    console.log(`added new employee ${employee}`)
  }
  if (!sender) {
    var employee = new Employee({slack_token: ctx.sender})
    await employee.save();
    console.log(`added new employee ${employee}`)
  }
  return false
}