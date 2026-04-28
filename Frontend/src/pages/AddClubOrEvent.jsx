import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddClubOrEvent = () => {
  const [formType, setFormType] = useState('event'); // 'event' or 'club'
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (!data.success || data.user.role === 'participant') {
          navigate('/home');
        }
      })
      .catch(() => navigate('/home'));
  }, [navigate]);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/events/create', {
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
      const res = await fetch('/api/clubs', {
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
    <div className="bg-background font-body text-on-background min-h-screen relative selection:bg-primary/30">
      {/* Global Background Elements */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-8 h-20 max-w-[1920px] mx-auto font-['Manrope'] tracking-tight leading-tight transition-all">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Kinetic Curator</span>
          <div className="hidden md:flex gap-6 items-center">
            <Link className="text-on-surface-variant font-medium hover:text-on-surface transition-colors duration-300" to="/dashboard">Dashboard</Link>
            <Link className="text-on-surface-variant font-medium hover:text-on-surface transition-colors duration-300" to="/events">Schedules</Link>
            <Link className="text-on-surface-variant font-medium hover:text-on-surface transition-colors duration-300" to="/events">Attendees</Link>
            <Link className="text-on-surface-variant font-medium hover:text-on-surface transition-colors duration-300" to="/reports">Analytics</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors">notifications</button>
          <button className="material-symbols-outlined p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors">settings</button>
          <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <img alt="User profile avatar" className="rounded-full w-full h-full object-cover p-[2px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkGPnxYzPOjhqbxw0ZlAo52XDwQ_1svwaqGPW8C3UWf_94Jm_fc9RLNUZfnktzDJZfKeDtTPlk29_-TnG4uy0lP81Lf12-YyZ5JBYsKBt4RBwfT8v0DNVujWSU-sf_Z4O0yOs5PJ6evf_1YI-o3x8exfLzTZEq5ux5eP0JnBwz85lAjDlll_AgcPp6G10Zh6MKHcdltwTTPFvPnf2i8FPPfWGeYEExhWgFBNhc0fNsMNQbSdjYVXRhersaeL-xhhtSoRQgkDnwtCLo"/>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-1/3 flex flex-col gap-8">
          <div>
            <h1 className="font-headline text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tighter mb-4 leading-tight">Create New Momentum</h1>
            <p className="text-lg text-on-surface-variant leading-relaxed">Organize your next masterpiece. Choose between launching a community hub or a specific event experience.</p>
          </div>
          <div className="flex flex-col gap-6 p-6 glass-panel rounded-3xl border border-white/5">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl primary-gradient text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20 border border-white/10">1</div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-on-surface">Core Details</span>
                <span className="text-xs text-on-surface-variant/80 uppercase tracking-wider font-bold">Identity & Vision</span>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-surface-container/50 border border-outline-variant/30 text-on-surface-variant flex items-center justify-center font-bold">2</div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-on-surface-variant">Configuration</span>
                <span className="text-xs text-on-surface-variant/50 uppercase tracking-wider font-bold">Time & Logistics</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="lg:w-2/3">
          <div className="glass-panel rounded-[32px] p-8 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
            
            <div className="flex bg-surface-container/50 p-1.5 rounded-2xl mb-12 w-fit cursor-pointer border border-white/5 shadow-inner">
              <button onClick={() => setFormType('event')} className={`px-8 py-3 rounded-xl font-headline font-bold text-sm transition-all duration-300 ${formType === 'event' ? 'bg-surface-container-high text-on-surface shadow-md border border-white/10' : 'text-on-surface-variant hover:text-on-surface'}`}>New Event</button>
              <button onClick={() => setFormType('club')} className={`px-8 py-3 rounded-xl font-headline font-bold text-sm transition-all duration-300 ${formType === 'club' ? 'bg-surface-container-high text-on-surface shadow-md border border-white/10' : 'text-on-surface-variant hover:text-on-surface'}`}>New Club</button>
            </div>

            {formType === 'event' ? (
              <form className="space-y-10" onSubmit={handleEventSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Event Name</label>
                      <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                        <span className="material-symbols-outlined text-on-surface-variant/70">event</span>
                        <input name="title" required className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface" placeholder="e.g. Kinetic Design Summit" type="text"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Club ID</label>
                      <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                        <span className="material-symbols-outlined text-on-surface-variant/70">badge</span>
                        <input name="clubId" required className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface" placeholder="e.g. 1" type="text" defaultValue="1"/>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Vision & Description</label>
                    <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                      <textarea name="description" required className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface resize-y min-h-[100px]" placeholder="Describe the energy and impact of this event..." rows="4"></textarea>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-surface-container-lowest/80 backdrop-blur-sm rounded-2xl border border-white/5 shadow-inner space-y-8">
                  <h3 className="font-headline font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Logistics & Scale</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Date & Start Time</label>
                      <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                        <span className="material-symbols-outlined text-on-surface-variant/70">calendar_month</span>
                        <input name="date" required className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm text-on-surface [color-scheme:dark]" type="datetime-local"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Capacity Limit</label>
                      <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                        <span className="material-symbols-outlined text-on-surface-variant/70">groups</span>
                        <input name="capacity" required className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface" placeholder="500" type="number"/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex justify-end border-t border-white/10">
                  <button className="w-full sm:w-auto px-12 py-4 rounded-xl primary-gradient text-white font-headline font-extrabold text-lg shadow-lg shadow-primary/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3" type="submit">
                    Launch Event <span className="material-symbols-outlined">rocket_launch</span>
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-10" onSubmit={handleClubSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Club Name</label>
                    <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                      <span className="material-symbols-outlined text-on-surface-variant/70">diversity_3</span>
                      <input name="name" required className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface" placeholder="e.g. Design Innovators" type="text"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Mission & Description</label>
                    <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                      <textarea name="description" required className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface resize-y min-h-[100px]" placeholder="Describe the focus of this club..." rows="4"></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 flex justify-end border-t border-white/10">
                  <button className="w-full sm:w-auto px-12 py-4 rounded-xl primary-gradient text-white font-headline font-extrabold text-lg shadow-lg shadow-primary/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3" type="submit">
                    Establish Club <span className="material-symbols-outlined">domain</span>
                  </button>
                </div>
              </form>
            )}
            
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>
          </div>
        </section>
      </main>
      
      {/* Bottom Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-surface-container-lowest/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-50 pb-safe">
        <Link to="/home" className="flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-on-surface p-2 transition-colors">
          <span className="material-symbols-outlined text-xl">grid_view</span>
          <span className="text-[10px] font-medium tracking-wide">Home</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-on-surface p-2 transition-colors">
          <span className="material-symbols-outlined text-xl">groups</span>
          <span className="text-[10px] font-medium tracking-wide">Clubs</span>
        </Link>
        <Link to="/events" className="flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-on-surface p-2 transition-colors">
          <span className="material-symbols-outlined text-xl">event</span>
          <span className="text-[10px] font-medium tracking-wide">Events</span>
        </Link>
        <Link to="/add" className="flex flex-col items-center gap-1.5 text-primary p-2">
          <div className="bg-primary/20 p-1.5 rounded-xl">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: 'FILL 1' }}>edit_note</span>
          </div>
          <span className="text-[10px] font-bold tracking-wide">Forms</span>
        </Link>
        <Link to="/reports" className="flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-on-surface p-2 transition-colors">
          <span className="material-symbols-outlined text-xl">analytics</span>
          <span className="text-[10px] font-medium tracking-wide">Reports</span>
        </Link>
      </nav>
    </div>
  );
};

export default AddClubOrEvent;
