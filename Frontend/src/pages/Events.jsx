import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [qrModalEvent, setQrModalEvent] = useState(null);

  const [editModalEvent, setEditModalEvent] = useState(null);
  const [participantsModalEvent, setParticipantsModalEvent] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCurrentUser(data.user);
      })
      .catch(err => console.error('Failed to fetch user', err));

    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents(prev => prev.filter(e => e.id !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      console.error('Failed to delete event', err);
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/events/${editModalEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editModalEvent)
      });
      if (res.ok) {
        const updated = await res.json();
        setEvents(prev => prev.map(ev => ev.id === updated.id ? updated : ev));
        setEditModalEvent(null);
      } else {
        alert('Failed to update event');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating event');
    }
  };

  const allParticipants = events
    .flatMap(e => (e.participants || []).map(p => ({ ...p, eventTitle: e.title, eventId: e.id })))
    .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));

  const recentNotifications = allParticipants.slice(0, 5);

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (e.venue && e.venue.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-secondary transition-colors duration-300" to="/events">Schedules</Link>
            <Link className="text-on-surface-variant font-medium hover:text-on-surface transition-colors duration-300" to="/attendees">Attendees</Link>
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
              placeholder="Search events..." 
              type="text"
            />
            {searchQuery && (
              <div className="absolute top-full left-0 mt-2 w-full glass-panel border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                {filteredEvents.length > 0 ? (
                  <ul className="max-h-48 overflow-y-auto">
                    {filteredEvents.map(event => (
                      <li key={event.id} className="px-4 py-2 hover:bg-surface-container-high cursor-pointer transition-colors border-b border-white/5 last:border-0" onClick={() => { setSearchQuery(''); document.getElementById(event.id)?.scrollIntoView({ behavior: 'smooth' }); }}>
                        <p className="text-sm font-bold text-on-surface">{event.title}</p>
                        <p className="text-xs text-on-surface-variant">{event.venue || 'TBD'}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-3 text-sm text-on-surface-variant">No events found.</p>
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
          <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl shadow-inner border border-primary/20 translate-x-1 transition-transform" to="/events">
            <span className="material-symbols-outlined">event</span> Events
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/attendees">
            <span className="material-symbols-outlined">group</span> Attendees
          </Link>
          {(!currentUser || currentUser.role === 'core') && (
            <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/add">
              <span className="material-symbols-outlined">edit_note</span> Forms
            </Link>
          )}
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/reports">
            <span className="material-symbols-outlined">analytics</span> Reports
          </Link>
        </div>
        {(!currentUser || currentUser.role === 'core') && (
          <Link to="/add" className="mt-4 mx-2 py-3 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 text-on-surface rounded-xl flex items-center justify-center gap-2 transition-all group">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">add</span> New Club
          </Link>
        )}
        <div className="mt-auto flex flex-col gap-1 border-t border-white/5 pt-4">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="#">
            <span className="material-symbols-outlined">help</span> Support
          </Link>
          <button className="flex w-full items-center gap-3 px-4 py-3 text-error/80 hover:text-error hover:bg-error/10 rounded-xl transition-all text-left">
            <span className="material-symbols-outlined">logout</span> Logout
          </button>
        </div>
      </aside>

      <main className="lg:ml-64 pt-20 min-h-screen p-8 relative z-10">
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 blur-3xl rounded-full -z-10 pointer-events-none"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-secondary/5 blur-3xl rounded-full -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 mt-12">
            <div>
              <h1 className="font-headline text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight mb-2">Events Planner</h1>
              <p className="text-on-surface-variant text-lg">Manage, track, and execute your live events with precision.</p>
            </div>
            {(!currentUser || currentUser.role === 'core') && (
              <Link to="/add" className="primary-gradient text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95">
                <span className="material-symbols-outlined">add</span> Create Event
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <p className="text-on-surface-variant p-4 col-span-3 text-center py-20 glass-panel rounded-3xl">No events found...</p>
            ) : (
              filteredEvents.map((event, i) => {
                const perc = event.total_seats ? Math.round(((event.total_seats - event.available_seats) / event.total_seats) * 100) : 0;
                return (
                  <div id={event.id} key={event.id} className="glass-panel rounded-3xl p-6 transition-all duration-300 hover:bg-surface-container-low hover:border-outline/50 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                        <span className="material-symbols-outlined text-2xl">{i % 2 === 0 ? 'festival' : 'stadium'}</span>
                      </div>
                      <div className="flex gap-2">
                        {(!currentUser || currentUser.role === 'core') && (
                          <>
                            <button onClick={() => setParticipantsModalEvent(event)} className="bg-surface-container hover:bg-tertiary/20 hover:text-tertiary text-on-surface-variant text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1 border border-outline-variant/30">
                              <span className="material-symbols-outlined text-[14px]">groups</span>
                            </button>
                            <button onClick={() => setEditModalEvent(event)} className="bg-surface-container hover:bg-secondary/20 hover:text-secondary text-on-surface-variant text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1 border border-outline-variant/30">
                              <span className="material-symbols-outlined text-[14px]">edit</span>
                            </button>
                          </>
                        )}
                        <button onClick={() => setQrModalEvent(event)} className="bg-surface-container hover:bg-primary/20 hover:text-primary text-on-surface-variant text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1 border border-outline-variant/30">
                          <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                        </button>
                        {(!currentUser || currentUser.role === 'core') && (
                          <button onClick={() => deleteEvent(event.id)} className="bg-surface-container hover:bg-error/20 hover:text-error text-on-surface-variant text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider transition-all border border-outline-variant/30">
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="font-headline text-2xl font-bold mb-2 group-hover:text-primary transition-colors text-on-surface">{event.title}</h3>
                    <p className="text-sm text-on-surface-variant/80 mb-6 flex items-center gap-2 font-medium">
                       <span className="material-symbols-outlined text-[16px] text-primary/70">location_on</span> {event.venue || 'Main Hall, Auditorium'}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-outline-variant/20">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-sm font-semibold text-on-surface-variant">Registrations</span>
                        <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">{perc}% Filled</span>
                      </div>
                      <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden shadow-inner">
                        <div className="primary-gradient h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(139,92,246,0.5)]" style={{ width: `${perc}%` }}></div>
                      </div>
                      <p className="text-xs text-on-surface-variant/70 mt-3 text-right font-medium">
                        <span className="text-on-surface font-bold">{event.available_seats}</span> seats left of {event.total_seats}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl border-t border-outline-variant/30 flex justify-around items-center z-50">
        <Link to="/home" className="flex flex-col items-center gap-1 text-on-surface-variant/60 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center gap-1 text-on-surface-variant/60 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">groups</span>
          <span className="text-[10px] font-medium">Clubs</span>
        </Link>
        <Link to="/events" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>event</span>
          <span className="text-[10px] font-medium">Events</span>
        </Link>
        <Link to="/add" className="flex flex-col items-center gap-1 text-on-surface-variant/60 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="text-[10px] font-medium">Forms</span>
        </Link>
        <Link to="/reports" className="flex flex-col items-center gap-1 text-on-surface-variant/60 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-medium">Reports</span>
        </Link>
      </nav>

      {qrModalEvent && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="glass-panel rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in duration-300 border border-white/10">
            <button 
              onClick={() => setQrModalEvent(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high rounded-full transition-colors text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold font-headline mb-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{qrModalEvent.title}</h2>
              <p className="text-on-surface-variant text-sm mb-6">Scan to Register</p>
              
              <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(20,184,166,0.3)] inline-block mb-6 border border-outline-variant/20">
                <QRCodeSVG 
                  value={`${window.location.origin}/register/${qrModalEvent.id}`} 
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
              
              <p className="text-xs text-on-surface-variant px-4">
                Point your camera at the QR code to open the registration page for this event.
              </p>
            </div>
          </div>
        </div>
      )}

      {editModalEvent && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="glass-panel rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-300 border border-white/10">
            <button 
              onClick={() => setEditModalEvent(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high rounded-full transition-colors text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <h2 className="text-2xl font-bold font-headline mb-6 text-on-surface">Edit Event Details</h2>
            <form onSubmit={saveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Title</label>
                <input type="text" value={editModalEvent.title} onChange={e => setEditModalEvent({...editModalEvent, title: e.target.value})} className="w-full bg-surface-container/50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 text-on-surface transition-all" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Venue / Location</label>
                  <input type="text" value={editModalEvent.venue || ''} onChange={e => setEditModalEvent({...editModalEvent, venue: e.target.value})} className="w-full bg-surface-container/50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 text-on-surface transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Date</label>
                  <input type="date" value={editModalEvent.date ? new Date(editModalEvent.date).toISOString().split('T')[0] : ''} onChange={e => setEditModalEvent({...editModalEvent, date: e.target.value})} className="w-full bg-surface-container/50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 text-on-surface transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Total Seats</label>
                  <input type="number" value={editModalEvent.total_seats} onChange={e => setEditModalEvent({...editModalEvent, total_seats: parseInt(e.target.value) || 0})} className="w-full bg-surface-container/50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 text-on-surface transition-all" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Seats Available</label>
                  <input type="number" value={editModalEvent.available_seats} onChange={e => setEditModalEvent({...editModalEvent, available_seats: parseInt(e.target.value) || 0})} className="w-full bg-surface-container/50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 text-on-surface transition-all" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-1 tracking-wider">Description</label>
                <textarea rows="3" value={editModalEvent.description || ''} onChange={e => setEditModalEvent({...editModalEvent, description: e.target.value})} className="w-full bg-surface-container/50 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 text-on-surface transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full primary-gradient text-white font-bold py-3.5 rounded-xl mt-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95 transition-all">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {participantsModalEvent && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md">
          <div className="glass-panel rounded-3xl p-8 max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in duration-300 border border-white/10">
            <button 
              onClick={() => setParticipantsModalEvent(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high rounded-full transition-colors text-on-surface"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <h2 className="text-2xl font-bold font-headline mb-2 text-on-surface">Participants</h2>
            <p className="text-sm text-primary mb-6 font-medium">{participantsModalEvent.title}</p>
            
            <div className="overflow-y-auto flex-1 pr-2 custom-scrollbar">
              {participantsModalEvent.participants && participantsModalEvent.participants.length > 0 ? (
                <ul className="space-y-3">
                  {participantsModalEvent.participants.map((p, i) => (
                    <li key={i} className="bg-surface-container-low border border-outline-variant/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-surface-container transition-colors">
                      <div>
                        <p className="font-bold text-on-surface text-sm">{p.name}</p>
                        <p className="text-xs text-on-surface-variant/80">{p.email}</p>
                      </div>
                      <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-md uppercase tracking-wider font-bold whitespace-nowrap">
                        {new Date(p.registeredAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-10 bg-surface-container-low rounded-xl border border-outline-variant/10">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3">person_off</span>
                  <p className="text-on-surface-variant font-medium">No participants registered yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
