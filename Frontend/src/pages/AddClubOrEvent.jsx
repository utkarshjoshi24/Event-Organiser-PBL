import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddClubOrEvent = () => {
  const [formType, setFormType] = useState('event'); // 'event' or 'club'
  const navigate = useNavigate();

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch('http://localhost:5002/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clubId: formData.get('clubId') || '1',
          title: formData.get('title'),
          description: formData.get('description'),
          date: formData.get('date'),
          venue: formData.get('venue') || 'TBD',
          total_seats: parseInt(formData.get('capacity') || '0', 10),
        })
      });
      if (res.ok) navigate('/dashboard');
      else alert('Error creating event');
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend server');
    }
  };

  const handleClubSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch('http://localhost:5002/api/clubs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          description: formData.get('description'),
          id: 'c' + Date.now().toString().slice(-4),
        })
      });
      if (res.ok) navigate('/'); // Home has the clubs
      else alert('Error creating club');
    } catch (err) {
      console.error(err);
      alert('Failed to connect to backend server');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-[#fbf8ff]/80 dark:bg-[#1a1b22]/80 backdrop-blur-xl flex justify-between items-center px-8 h-20 w-full max-w-[1920px] mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold tracking-tighter text-[#24389c] dark:text-[#fbf8ff]">Kinetic Curator</span>
          <nav className="hidden md:flex gap-6 items-center">
            <Link className="text-[#1a1b22]/60 dark:text-[#fbf8ff]/60 font-medium hover:text-[#24389c] transition-colors duration-300" to="/dashboard">Dashboard</Link>
            <Link className="text-[#1a1b22]/60 dark:text-[#fbf8ff]/60 font-medium hover:text-[#24389c] transition-colors duration-300" to="/events">Schedules</Link>
            <Link className="text-[#1a1b22]/60 dark:text-[#fbf8ff]/60 font-medium hover:text-[#24389c] transition-colors duration-300" to="/events">Attendees</Link>
            <Link className="text-[#1a1b22]/60 dark:text-[#fbf8ff]/60 font-medium hover:text-[#24389c] transition-colors duration-300" to="/reports">Analytics</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">notifications</button>
          <button className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">settings</button>
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
            <img alt="User profile avatar" className="rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkGPnxYzPOjhqbxw0ZlAo52XDwQ_1svwaqGPW8C3UWf_94Jm_fc9RLNUZfnktzDJZfKeDtTPlk29_-TnG4uy0lP81Lf12-YyZ5JBYsKBt4RBwfT8v0DNVujWSU-sf_Z4O0yOs5PJ6evf_1YI-o3x8exfLzTZEq5ux5eP0JnBwz85lAjDlll_AgcPp6G10Zh6MKHcdltwTTPFvPnf2i8FPPfWGeYEExhWgFBNhc0fNsMNQbSdjYVXRhersaeL-xhhtSoRQgkDnwtCLo"/>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/3 flex flex-col gap-8">
          <div>
            <h1 className="text-display-lg text-5xl font-extrabold tracking-tight text-primary mb-4 leading-tight">Create New Momentum</h1>
            <p className="text-lg text-on-surface-variant leading-relaxed">Organize your next masterpiece. Choose between launching a community hub or a specific event experience.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">1</div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-primary">Core Details</span>
                <span className="text-xs text-on-surface-variant opacity-60">Identity & Vision</span>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">2</div>
              <div className="flex flex-col">
                <span className="font-headline font-semibold text-on-surface-variant opacity-40">Configuration</span>
                <span className="text-xs text-on-surface-variant opacity-40">Time & Logistics</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:w-2/3">
          <div className="bg-surface-container-lowest rounded-xl p-8 lg:p-12 shadow-[0_12px_40px_-4px_rgba(26,27,34,0.06)] relative overflow-hidden">
            <div className="flex bg-surface-container-low p-1.5 rounded-xl mb-12 w-fit cursor-pointer">
              <button onClick={() => setFormType('event')} className={`px-8 py-3 rounded-lg font-headline font-bold text-sm ${formType === 'event' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant/70 hover:bg-surface-container-high'} transition-all`}>New Event</button>
              <button onClick={() => setFormType('club')} className={`px-8 py-3 rounded-lg font-headline font-bold text-sm ${formType === 'club' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant/70 hover:bg-surface-container-high'} transition-all`}>New Club</button>
            </div>

            {formType === 'event' ? (
              <form className="space-y-10" onSubmit={handleEventSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary tracking-wide uppercase">Event Name</label>
                      <input name="title" required className="w-full bg-surface-container-high border-none rounded-sm px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Kinetic Design Summit" type="text"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary tracking-wide uppercase">Club ID</label>
                      <input name="clubId" required className="w-full bg-surface-container-high border-none rounded-sm px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 1" type="text" defaultValue="1"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary tracking-wide uppercase">Vision & Description</label>
                    <textarea name="description" required className="w-full bg-surface-container-high border-none rounded-sm px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Describe the energy and impact of this event..." rows="4"></textarea>
                  </div>
                </div>

                <div className="p-8 bg-surface-container-low rounded-xl space-y-8">
                  <h3 className="font-headline font-extrabold text-xl text-on-surface">Logistics & Scale</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant/80 tracking-wide uppercase">Date & Start Time</label>
                      <input name="date" required className="w-full bg-surface-container-lowest border-none rounded-sm px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all" type="datetime-local"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant/80 tracking-wide uppercase">Capacity Limit</label>
                      <div className="flex items-center gap-4 bg-surface-container-lowest rounded-sm px-4">
                        <span className="material-symbols-outlined text-primary">groups</span>
                        <input name="capacity" required className="w-full border-none bg-transparent py-4 focus:ring-0" placeholder="500" type="number"/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-end border-t border-outline-variant/10">
                  <button className="w-full sm:w-auto px-12 py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-extrabold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3" type="submit">
                    Launch Event <span className="material-symbols-outlined">rocket_launch</span>
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-10" onSubmit={handleClubSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary tracking-wide uppercase">Club Name</label>
                    <input name="name" required className="w-full bg-surface-container-high border-none rounded-sm px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Design Innovators" type="text"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary tracking-wide uppercase">Mission & Description</label>
                    <textarea name="description" required className="w-full bg-surface-container-high border-none rounded-sm px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Describe the focus of this club..." rows="4"></textarea>
                  </div>
                </div>
                
                <div className="pt-8 flex justify-end border-t border-outline-variant/10">
                  <button className="w-full sm:w-auto px-12 py-4 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-extrabold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3" type="submit">
                    Establish Club <span className="material-symbols-outlined">domain</span>
                  </button>
                </div>
              </form>
            )}
            
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </section>
      </main>
      
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#fbf8ff]/80 backdrop-blur-xl border-t border-outline-variant/10 flex justify-around items-center z-50">
        <Link to="/" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">groups</span>
          <span className="text-[10px] font-medium">Clubs</span>
        </Link>
        <Link to="/events" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">event</span>
          <span className="text-[10px] font-medium">Events</span>
        </Link>
        <Link to="/add" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>edit_note</span>
          <span className="text-[10px] font-medium">Forms</span>
        </Link>
        <Link to="/reports" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-medium">Reports</span>
        </Link>
      </nav>
    </div>
  );
};

export default AddClubOrEvent;
