import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClubDashboard = () => {
  const [events, setEvents] = React.useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    fetch("/api/auth/me").then(res => res.json()).then(data => { if (data.success) setCurrentUser(data.user); }).catch(e => console.error(e));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'omit' });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  React.useEffect(() => {
    fetch('/api/events') // fetching all events
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  // Compute metrics
  const totalConducted = events.length;
  const totalRegistrations = events.reduce((sum, e) => sum + ((e.total_seats || 0) - (e.available_seats || 0)), 0);
  const totalSeatsLeft = events.reduce((sum, e) => sum + (e.available_seats || 0), 0);

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
          <div className="hidden lg:flex items-center bg-surface-container/50 border border-outline-variant/30 rounded-lg px-3 py-1.5 gap-2 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => window.location.href='/events'}>
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-on-surface-variant/50 w-48 pointer-events-none text-on-surface cursor-pointer" placeholder="Search events..." type="text" readOnly/>
          </div>
          <button onClick={() => alert('You have 0 new notifications')} className="material-symbols-outlined p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors">notifications</button>
          <button onClick={() => alert('Settings configuration open')} className="material-symbols-outlined p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded-full transition-colors">settings</button>
          <Link to="/login" className="h-10 w-10 rounded-full bg-surface-container overflow-hidden hover:opacity-80 transition-opacity border-2 border-surface-container-highest">
            <img alt="User profile avatar" data-alt="Close up portrait of a professional male event coordinator with a friendly expression in a modern office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0rIZe6gpgKaw-V0r5E_Gwm97GDR0sdOCLN6d9bFAQmC8-uOMAk_AO-pHz2QmXvJ1MIjTxwi3mBd_PcwhTTOrZTSySJ10kQ8bCKLjUv3XddG7TrSPfCruVQfg-hWLpEb9wY5FnxaX8iSmefpEnCWC51TPJTAXzd4vfB47rUFu3AJpDOO_3lgHZ0y78fnqZVH9B_srcxXyEgQDZo-vz6TvZ3cJ9cwRqssK5ROwJMMa2qXwd1eJvRAnm0n0EVQy3-Xj-XCybdnch89fU"/>
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
          <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl shadow-inner border border-primary/20 translate-x-1 transition-transform" to="/dashboard">
            <span className="material-symbols-outlined">groups</span> Clubs
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/events">
            <span className="material-symbols-outlined">event</span> Events
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
        <div className="mt-auto flex flex-col gap-1 border-t border-white/5 pt-4">
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="#">
            <span className="material-symbols-outlined">help</span> Support
          </Link>
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-error/80 hover:text-error hover:bg-error/10 rounded-xl transition-all text-left">
            <span className="material-symbols-outlined">logout</span> Logout
          </button>
        </div>
      </aside>

      <main className="lg:ml-64 min-h-screen p-8 lg:p-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2 font-headline">Club Performance Dashboard</h1>
            <p className="text-on-surface-variant font-medium max-w-lg text-lg">Real-time analytical overview of member engagement, event success metrics, and community growth.</p>
          </div>
          <div className="flex items-center gap-3 glass-panel p-2 rounded-2xl border border-white/5">
            <span className="material-symbols-outlined text-primary p-2 bg-surface-container-high rounded-xl shadow-inner border border-white/5" data-icon="calendar_today">calendar_today</span>
            <div className="pr-4">
              <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/70">Reporting Period</div>
              <div className="text-sm font-bold text-on-surface">Oct 1 — Oct 31, 2023</div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-3xl hover:bg-surface-container-low hover:-translate-y-1 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl border border-primary/20 shadow-inner text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined block" data-icon="event_available">event_available</span>
              </div>
              <span className="text-xs font-bold text-secondary flex items-center gap-1 bg-secondary/10 border border-secondary/20 px-2.5 py-1 rounded-md">
                <span className="material-symbols-outlined text-[10px]" data-icon="trending_up">trending_up</span> +12%
              </span>
            </div>
            <div className="text-4xl font-headline font-extrabold text-on-surface mb-1">{totalConducted || 0}</div>
            <div className="text-sm font-medium text-on-surface-variant">Events Conducted</div>
          </div>

          <div className="glass-panel p-6 rounded-3xl hover:bg-surface-container-low hover:-translate-y-1 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl border border-secondary/20 shadow-inner text-secondary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined block" data-icon="person_add">person_add</span>
              </div>
              <span className="text-xs font-bold text-secondary flex items-center gap-1 bg-secondary/10 border border-secondary/20 px-2.5 py-1 rounded-md">
                <span className="material-symbols-outlined text-[10px]" data-icon="trending_up">trending_up</span> +8.4%
              </span>
            </div>
            <div className="text-4xl font-headline font-extrabold text-on-surface mb-1">{totalRegistrations || 0}</div>
            <div className="text-sm font-medium text-on-surface-variant">Total Registrations</div>
          </div>

          <div className="glass-panel p-6 rounded-3xl hover:bg-surface-container-low hover:-translate-y-1 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gradient-to-br from-tertiary/20 to-transparent rounded-2xl border border-tertiary/20 shadow-inner text-tertiary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined block" data-icon="star">star</span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high border border-outline-variant/30 px-2.5 py-1 rounded-md">Avg Rating</span>
            </div>
            <div className="text-4xl font-headline font-extrabold text-on-surface mb-1">4.8</div>
            <div className="flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill">star</span>
              <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill">star</span>
              <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill">star</span>
              <span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill">star</span>
              <span className="material-symbols-outlined text-sm" data-icon="star_half">star_half</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl hover:bg-surface-container-low hover:-translate-y-1 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gradient-to-br from-error/20 to-transparent rounded-2xl border border-error/20 shadow-inner text-error group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined block" data-icon="confirmation_number">confirmation_number</span>
              </div>
              <span className="text-xs font-bold text-error flex items-center gap-1 bg-error/10 border border-error/20 px-2.5 py-1 rounded-md">
                <span className="material-symbols-outlined text-[10px]" data-icon="warning">warning</span> {totalSeatsLeft < 50 ? 'Low' : 'OK'}
              </span>
            </div>
            <div className="text-4xl font-headline font-extrabold text-on-surface mb-1">{totalSeatsLeft || 0}</div>
            <div className="text-sm font-medium text-on-surface-variant">Seats Left (Upcoming)</div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-headline font-bold text-on-surface">Attendance Over Time</h3>
                <p className="text-xs text-on-surface-variant/70 mt-1 font-medium">Daily member participation across all events</p>
              </div>
              <select className="bg-surface-container-high border-none text-xs font-bold text-on-surface rounded-lg shadow-sm focus:ring-primary outline-none px-3 py-2 cursor-pointer border border-outline-variant/20">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            
            <div className="flex-1 flex items-end justify-between gap-2 px-2 relative mt-4">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-outline w-full"></div>
                <div className="border-b border-outline w-full"></div>
                <div className="border-b border-outline w-full"></div>
                <div className="border-b border-outline w-full"></div>
              </div>
              
              {[40,65,55,85,95,45,75,60,40,70].map((val, i) => (
                <div key={i} className={`flex-1 ${val > 80 ? 'bg-gradient-to-t from-primary/30 to-primary/80' : 'bg-gradient-to-t from-primary/10 to-primary/40'} rounded-t-lg relative group transition-colors hover:from-primary/50 hover:to-primary`} style={{height: `${val}%`}}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-highest text-on-surface font-bold text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-outline-variant/30 shadow-lg">{val * 10}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest border-t border-outline-variant/20 pt-4">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/30 transition-all"></div>
            
            <div className="w-32 h-32 rounded-full border-[10px] border-surface-container-highest flex items-center justify-center mb-6 relative shadow-[0_0_40px_rgba(139,92,246,0.1)]">
              <div className="absolute inset-[-10px] border-[10px] border-primary rounded-full border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
              <span className="text-3xl font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">82%</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-2">Goal Completion</h3>
            <p className="text-sm text-on-surface-variant max-w-[200px] leading-relaxed">You're on track to hit your Q4 engagement targets. Keep up the momentum!</p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel rounded-3xl p-8 flex flex-col">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-6">Upcoming Capacity</h3>
            <div className="space-y-6 flex-grow">
              {events.length === 0 ? <p className="text-sm text-on-surface-variant italic">No upcoming events scheduled.</p> : events.slice(0, 3).map(event => {
                const seatsLeft = event.available_seats || 0;
                const capacity = event.total_seats || 1;
                const fillPercent = Math.max(0, Math.min(100, ((capacity - seatsLeft) / capacity) * 100));
                const isLow = seatsLeft <= 20;

                return (
                  <div key={event.id} className="bg-surface-container/30 p-4 rounded-2xl border border-outline-variant/10">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-sm font-bold text-on-surface">{event.title}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${isLow ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>{seatsLeft} seats left</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full ${isLow ? 'bg-gradient-to-r from-error to-error/70' : 'primary-gradient'} rounded-full`} style={{ width: `${fillPercent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/events" className="mt-6 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all p-3 rounded-xl hover:bg-primary/5">
              View All Schedules <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
            </Link>
          </div>

          <div className="relative rounded-3xl overflow-hidden group h-full min-h-[400px]">
            <img alt="Event Venue" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" data-alt="wide angle shot of a modern brightly lit auditorium filled with people attending a professional conference" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"/>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
            
            {events.length > 0 ? (
              <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold rounded-full mb-4 tracking-widest uppercase backdrop-blur-sm shadow-[0_0_10px_rgba(139,92,246,0.2)]">Featured Event</span>
                <h3 className="text-3xl font-headline font-extrabold text-white mb-3 leading-tight drop-shadow-md">{events[0].title}</h3>
                <div className="flex items-center gap-6 text-white/90 text-sm font-medium">
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="material-symbols-outlined text-sm text-primary" data-icon="location_on">location_on</span>
                    <span>{events[0].venue || 'TBA'}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="material-symbols-outlined text-sm text-secondary" data-icon="group">group</span>
                    <span>{events[0].total_seats - events[0].available_seats} Attending</span>
                  </div>
                </div>
                <button onClick={() => alert('Starting Live Stream Experience...')} className="mt-6 w-full glass-panel border border-white/10 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors backdrop-blur-xl shadow-lg">
                  Go to Event Stream
                  <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
                </button>
              </div>
            ) : (
              <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                <h3 className="text-3xl font-headline font-extrabold text-white mb-2 leading-tight">No Events Yet</h3>
              </div>
            )}
          </div>
        </section>
      </main>
<div className="fixed bottom-8 right-8 z-50">
<button onClick={() => alert('Support chat initializing...')} className="w-14 h-14 bg-secondary-fixed text-on-secondary-fixed rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
<span className="material-symbols-outlined text-3xl" data-icon="chat_bubble">chat_bubble</span>
</button>
</div>

    </div>
  );
};

export default ClubDashboard;
