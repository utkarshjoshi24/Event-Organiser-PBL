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
         id:"event_"+Date.now()
      });

      res.status(201).json(newEvent);
   }catch(err){
      res.status(400).json({error:err.message});
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
