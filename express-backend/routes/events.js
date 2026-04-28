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

router.post(['/','/create'], async (req,res)=>{
   try{
      const newEvent = await Event.create({
         ...req.body,
         available_seats: req.body.total_seats || 0,
         id:"event_"+Date.now()
      });

      res.status(201).json(newEvent);
   }catch(err){
      res.status(400).json({error:err.message});
   }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ id: req.params.id });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/register', async (req, res) => {
  try {
    const { name, email } = req.body;
    const event = await Event.findOne({ id: req.params.id });
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.available_seats <= 0) {
      return res.status(400).json({ error: 'No seats available' });
    }

    // Check if user already registered by email
    const alreadyRegistered = event.participants.some(p => p.email === email);
    if (alreadyRegistered) {
      return res.status(400).json({ error: 'Email already registered for this event' });
    }

    event.participants.push({ name, email });
    event.available_seats -= 1;
    await event.save();

    res.json({ message: 'Registered successfully', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ id: req.params.id });
    if (!deletedEvent) {
      const deletedByMongoId = await Event.findByIdAndDelete(req.params.id);
      if (!deletedByMongoId) return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
