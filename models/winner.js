import mongoose from 'mongoose';
import { thankSchema } from './thank.js';

export const winnerSchema = new mongoose.Schema({
  winner_id: { type: String, required: true },
  thanks_recv: [thankSchema],
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  disbursed_at: { type: Date },
  awarded_at: { type: Date, default: Date.now, required: true },
});

export const Winner = mongoose.model('Winner', winnerSchema);
