import mongoose from 'mongoose';
import dotenv from 'dotenv';


// Import Models
import Club from './models/Club.js';
import Event from './models/Event.js';
import User from './models/User.js';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

// IMPORTANT: We strongly suggest changing your MONGODB_URI in the .env file to have a database name,
// Example: mongodb+srv://Username:Password@cluster1.../event-organiser?appName=Cluster1
const MONGODB_URI = process.env.MONGODB_URI;

const clubsData = [
  {
    name: "Coding Club",
    description: "A community for coding enthusiasts and software developers. We host hackathons, coding workshops, and open-source contribution sessions.",
    id: "club_coding_001"
  },
  {
    name: "Robotics Society",
    description: "Building the future, one robot at a time. Join us for hardware projects, AI competitions, and robotics summits.",
    id: "club_robotics_002"
  },
  {
    name: "Art & Design Collective",
    description: "For digital artists, UI/UX designers, and creative minds. We organize exhibitions and design sprints.",
    id: "club_art_003"
  }
];

const eventsData = [
  {
    title: "Annual Hackathon 2026",
    clubId: "club_coding_001",
    id: "event_hack_01",
    total_seats: 100,
    available_seats: 45
  },
  {
    title: "Intro to Web Development",
    clubId: "club_coding_001",
    id: "event_web_02",
    total_seats: 50,
    available_seats: 10
  },
  {
    title: "Robo-Wars Championship",
    clubId: "club_robotics_002",
    id: "event_robo_01",
    total_seats: 200,
    available_seats: 150
  },
  {
    title: "UI/UX Masterclass",
    clubId: "club_art_003",
    id: "event_design_01",
    total_seats: 40,
    available_seats: 0
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected!');

    console.log('Clearing existing data...');
    await Club.deleteMany({});
    await Event.deleteMany({});
    await User.deleteMany({});

    console.log('Inserting Clubs...');
    await Club.insertMany(clubsData);

    console.log('Inserting Events...');
    await Event.insertMany(eventsData);

    console.log('Inserting a Demo User...');
    // Only creating user logic if bcrypt is not required or if you want plain text. 
    // Assuming your User.js handles passwords, let's just insert one basic user. 
    // Wait, let's just insert a raw password to show how it should be shaped.
    await User.create({
      name: "Demo User",
      email: "demo@example.com",
      password: "password123" // Note: Normally you would hash this before saving!
    });

    console.log('✅ Database successfully seeded!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedDatabase();
