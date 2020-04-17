import mongoose from 'mongoose'

export const thankSchema = new mongoose.Schema({
  src_id: { type: String, required: true},
  dest_id: { type: String, required: true},
  reason: { type: String, required: true},
  created_at: {type:Date, default: Date.now},
});

export const Thank = mongoose.model('Thank', thankSchema);

