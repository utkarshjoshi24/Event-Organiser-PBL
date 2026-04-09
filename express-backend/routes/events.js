import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    console.error("DEBUG ERROR:", err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Assuming there's a file at api/events/create/route.js or [id]/route.js in Next.js
// We can add placeholders or implement them based on typical usage

export default router;
