import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  clubId: { type: String, required: true },
  id: { type: String, required: true },
  total_seats: { type: Number, default: 0 },
  available_seats: { type: Number, default: 0 },
  description: { type: String },
  date: { type: Date },
  venue: { type: String },
  participants: [{
    name: String,
    email: String,
    registeredAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Event', EventSchema);
