import mongoose from 'mongoose';
import { thankSchema } from './thank.js';

export const employeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  slack_display_name: String,
  slack_token: { type: String, unique: true, required: true },
  xfers_token: String,
  thanks_given: [thankSchema],
  thanks_received: [thankSchema],
});

export const Employee = mongoose.model('Employee', employeeSchema);
