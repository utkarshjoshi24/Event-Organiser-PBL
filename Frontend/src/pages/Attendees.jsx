import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Attendees = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => { if (data.success) setCurrentUser(data.user); })
      .catch(e => console.error(e));
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  const allParticipants = events
    .flatMap(e => (e.participants || []).map(p => ({ ...p, eventTitle: e.title, eventId: e.id })))
    .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));

  const recentNotifications = allParticipants.slice(0, 5);

  const filteredParticipants = allParticipants.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-secondary transition-colors duration-300" to="/attendees">Attendees</Link>
            <Link className="text-on-surface-variant font-medium hover:text-on-surface transition-colors duration-300" to="/reports">Analytics</Link>
          </div>
        </div>
        <div className="flex items-center gap-4 relative">
          <div className="hidden lg:flex items-center bg-surface-container/50 border border-outline-variant/30 rounded-lg px-3 py-1.5 gap-2 hover:border-primary/50 focus-within:border-primary/50 transition-colors shadow-inner relative">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-on-surface-variant/50 w-48 text-on-surface outline-none" 
              placeholder="Search attendees or events..." 
              type="text"
            />
            {searchQuery && (
              <div className="absolute top-full left-0 mt-2 w-full glass-panel border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                {filteredParticipants.length > 0 ? (
                  <ul className="max-h-48 overflow-y-auto">
                    {Array.from(new Set(filteredParticipants.map(p => p.eventTitle))).slice(0, 3).map((eventName, i) => (
                      <li key={`event-${i}`} className="px-4 py-2 hover:bg-surface-container-high cursor-pointer transition-colors border-b border-white/5" onClick={() => setSearchQuery(eventName)}>
                        <p className="text-sm font-bold text-primary flex items-center gap-2"><span className="material-symbols-outlined text-[14px]">event</span> {eventName}</p>
                      </li>
                    ))}
                    {filteredParticipants.slice(0, 5).map((p, i) => (
                      <li key={`participant-${i}`} className="px-4 py-2 hover:bg-surface-container-high cursor-pointer transition-colors border-b border-white/5 last:border-0" onClick={() => setSearchQuery(p.name)}>
                        <p className="text-sm font-bold text-on-surface">{p.name}</p>
                        <p className="text-xs text-on-surface-variant">{p.email}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-3 text-sm text-on-surface-variant">No matches found.</p>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="material-symbols-outlined p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors relative">
              notifications
              {recentNotifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-background animate-pulse"></span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 glass-panel border border-white/10 shadow-2xl rounded-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <h3 className="text-sm font-bold text-on-surface mb-3 border-b border-white/10 pb-2">Recent Registrations</h3>
                {recentNotifications.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {recentNotifications.map((n, i) => (
                      <div key={i} className="flex gap-3 items-start p-2 rounded-xl hover:bg-surface-container-high transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-sm">person_add</span>
                        </div>
                        <div>
                          <p className="text-xs text-on-surface"><span className="font-bold">{n.name}</span> registered for</p>
                          <p className="text-xs text-primary font-bold truncate max-w-[200px]">{n.eventTitle}</p>
                          <p className="text-[10px] text-on-surface-variant mt-1">{new Date(n.registeredAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-on-surface-variant text-center py-4">No recent activity.</p>
                )}
              </div>
            )}
          </div>
          <button className="material-symbols-outlined p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors">settings</button>
          <Link to="/login" className="h-10 w-10 rounded-full bg-surface-container overflow-hidden hover:opacity-80 transition-opacity border-2 border-surface-container-highest">
            <img alt="User profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0rIZe6gpgKaw-V0r5E_Gwm97GDR0sdOCLN6d9bFAQmC8-uOMAk_AO-pHz2QmXvJ1MIjTxwi3mBd_PcwhTTOrZTSySJ10kQ8bCKLjUv3XddG7TrSPfCruVQfg-hWLpEb9wY5FnxaX8iSmefpEnCWC51TPJTAXzd4vfB47rUFu3AJpDOO_3lgHZ0y78fnqZVH9B_srcxXyEgQDZo-vz6TvZ3cJ9cwRqssK5ROwJMMa2qXwd1eJvRAnm0n0EVQy3-Xj-XCybdnch89fU"/>
          </Link>
        </div>
      </nav>

      {/* Side Navigation Shell */}
      <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 z-40 bg-surface-container-lowest/40 backdrop-blur-md border-r border-white/5 flex-col p-6 gap-8 font-['Manrope'] font-semibold text-sm pt-28">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl primary-gradient flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">hub</span>
          </div>
          <div>
            <p className="text-on-surface font-bold text-sm">Global Events</p>
            <p className="text-xs text-primary font-medium tracking-wide">Premium Tier</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/home">
            <span className="material-symbols-outlined">grid_view</span> Home
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/dashboard">
            <span className="material-symbols-outlined">groups</span> Clubs
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/events">
            <span className="material-symbols-outlined">event</span> Events
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl shadow-inner border border-primary/20 translate-x-1 transition-transform" to="/attendees">
            <span className="material-symbols-outlined">group</span> Attendees
          </Link>
          {(!currentUser || currentUser.role === "core") && (
            <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/add">
                        <span className="material-symbols-outlined">edit_note</span> Forms
                      </Link>
          )}
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/reports">
            <span className="material-symbols-outlined">analytics</span> Reports
          </Link>
        </div>
        {(!currentUser || currentUser.role === "core") && (
          <Link to="/add" className="mt-4 mx-2 py-3 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 text-on-surface rounded-xl flex items-center justify-center gap-2 transition-all group">
                    <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add</span> New Club
                  </Link>
        )}
      </aside>

      <main className="lg:ml-64 pt-28 min-h-screen p-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight leading-tight mb-2">Global Attendees</h1>
              <p className="text-lg text-on-surface-variant leading-relaxed">View and manage participants across all your registered events.</p>
            </div>
            <div className="flex gap-4">
              <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3 border border-white/10 shadow-lg">
                <span className="material-symbols-outlined text-primary text-3xl">group</span>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Headcount</p>
                  <p className="text-2xl font-extrabold text-on-surface leading-none">{allParticipants.length}</p>
                </div>
              </div>
            </div>
          </header>

          <div className="glass-panel rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl pointer-events-none"></div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-surface-container/30">
                    <th className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Participant</th>
                    <th className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Event Name</th>
                    <th className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Registration Date</th>
                    <th className="py-4 px-6 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-12 text-center text-on-surface-variant italic">
                        {searchQuery ? "No participants found matching your search." : "No participants registered yet."}
                      </td>
                    </tr>
                  ) : (
                    filteredParticipants.map((p, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-surface-container/50 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center text-primary font-bold border border-primary/20 shrink-0">
                              {p.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors">{p.name}</p>
                              <p className="text-xs text-on-surface-variant/80">{p.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-xs font-bold border border-secondary/20 shadow-sm">
                            <span className="material-symbols-outlined text-[12px]">event</span>
                            {p.eventTitle}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-on-surface-variant font-medium">
                          {new Date(p.registeredAt).toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="p-2 rounded-xl bg-surface-container hover:bg-primary hover:text-white text-on-surface-variant transition-colors border border-outline-variant/30">
                            <span className="material-symbols-outlined text-sm block">mail</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Attendees;
