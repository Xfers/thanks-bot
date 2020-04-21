import { Employee } from "../models/employee.js"

export async function addUser(ctx) {
  let sender = await Employee.findOne({ slack_token: ctx.sender });
  if (!sender) {
    var employee = new Employee({slack_token: ctx.sender})
    await employee.save();
    console.log(`added new employee ${employee}`)
  }
  ctx.tagged.forEach(async (user_token) => {
    var candidate = await Employee.findOne({ slack_token: user_token });
    if (!candidate) {
      var employee = new Employee({slack_token: user_token})
      await employee.save();
      console.log(`added new employee ${employee}`)
    }
  });
  return false
}