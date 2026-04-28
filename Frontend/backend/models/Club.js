import mongoose from 'mongoose';

const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  id: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Club || mongoose.model('Club', ClubSchema);
