import express from 'express';
import Club from '../models/Club.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let clubs = await Club.find({});
    // If no clubs, seed some
    if (clubs.length === 0) {
      const seedClubs = [
        { id: '1', name: 'Swaragini: Monsoon Ragas', description: 'Experience the magic of traditional ragas performed live.' },
        { id: '2', name: 'Synthoria: Digital Pulse', description: 'Join us for a mesmerizing night of digital synths and futuristic beats.' }
      ];
      await Club.insertMany(seedClubs);
      clubs = await Club.find({});
    }
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newClub = await Club.create(req.body);
    res.status(201).json(newClub);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedClub = await Club.findOneAndDelete({ id: req.params.id });
    if (!deletedClub) {
      const deletedByMongoId = await Club.findByIdAndDelete(req.params.id);
      if (!deletedByMongoId) return res.status(404).json({ error: 'Club not found' });
    }
    res.json({ message: 'Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
