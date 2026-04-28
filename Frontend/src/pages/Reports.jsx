import React from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [events, setEvents] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => { if (data.success) setCurrentUser(data.user); })
      .catch(e => console.error(e));
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  const totalEvents = events.length;
  const totalCapacity = events.reduce((sum, e) => sum + (e.total_seats || 0), 0);
  const totalAvailable = events.reduce((sum, e) => sum + (e.available_seats || 0), 0);
  const totalBooked = totalCapacity - totalAvailable;
  const fillRate = totalCapacity ? Math.round((totalBooked / totalCapacity) * 100) : 0;

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
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-secondary transition-colors duration-300" to="/reports">Analytics</Link>
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
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/dashboard">
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
          <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl shadow-inner border border-primary/20 translate-x-1 transition-transform" to="/reports">
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
          <button className="flex w-full items-center gap-3 px-4 py-3 text-error/80 hover:text-error hover:bg-error/10 rounded-xl transition-all text-left">
            <span className="material-symbols-outlined">logout</span> Logout
          </button>
        </div>
      </aside>

      <main className="lg:ml-64 pt-20 min-h-screen p-8 relative z-10">
        <div className="absolute top-0 right-0 w-full h-[500px] bg-primary/5 blur-3xl rounded-full -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-3xl rounded-full -z-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 mt-12">
            <h1 className="font-headline text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight leading-tight">Analytics & Insights</h1>
            <p className="text-lg text-on-surface-variant leading-relaxed mt-2">Comprehensive performance reports for all hosted ecosystems.</p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="glass-panel p-8 rounded-3xl border border-white/5 shadow-lg hover:-translate-y-1 transition-all group">
              <span className="material-symbols-outlined text-4xl text-primary mb-4 p-3 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl shadow-inner border border-primary/20 inline-block group-hover:scale-110 transition-transform">event_available</span>
              <p className="font-headline text-5xl font-extrabold text-on-surface mb-1">{totalEvents}</p>
              <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">Total Events</p>
            </div>
            
            <div className="p-8 rounded-3xl shadow-[0_0_40px_rgba(139,92,246,0.3)] primary-gradient text-white hover:-translate-y-1 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <span className="material-symbols-outlined text-4xl text-white mb-4 p-3 bg-white/10 rounded-2xl shadow-inner border border-white/20 inline-block relative z-10 group-hover:scale-110 transition-transform">group</span>
              <p className="font-headline text-5xl font-extrabold text-white mb-1 relative z-10 drop-shadow-md">{totalBooked}</p>
              <p className="text-sm font-semibold text-white/80 uppercase tracking-widest relative z-10">Global Attendees</p>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/5 shadow-lg hover:-translate-y-1 transition-all group">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4 p-3 bg-gradient-to-br from-secondary/20 to-transparent rounded-2xl shadow-inner border border-secondary/20 inline-block group-hover:scale-110 transition-transform">pie_chart</span>
              <p className="font-headline text-5xl font-extrabold text-on-surface mb-1">{fillRate}%</p>
              <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">Overall Fill Rate</p>
            </div>
          </section>

          <section className="glass-panel rounded-3xl p-8 lg:p-10 border border-white/5 shadow-lg mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl pointer-events-none"></div>
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-8 border-b border-white/10 pb-4">Execution Logs</h3>
            <div className="space-y-4 relative z-10">
              {events.length === 0 ? <p className="text-sm text-on-surface-variant italic bg-surface-container-low p-6 rounded-2xl text-center border border-white/5">No data to calculate.</p> : events.map(event => {
                 const booked = (event.total_seats || 0) - (event.available_seats || 0);
                 const rate = event.total_seats ? Math.round((booked / event.total_seats) * 100) : 0;
                 return (
                   <div key={event.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-5 bg-surface-container/30 rounded-2xl border border-white/5 hover:bg-surface-container/80 hover:border-outline-variant/30 transition-all group">
                     <div className="flex items-center gap-5 mb-4 sm:mb-0">
                       <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner group-hover:scale-110 transition-transform">
                         <span className="material-symbols-outlined">donut_large</span>
                       </div>
                       <div>
                         <p className="font-headline text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{event.title}</p>
                         <p className="text-sm text-on-surface-variant/80 font-medium">{booked} of {event.total_seats} capacity reached</p>
                       </div>
                     </div>
                     <span className={`self-start sm:self-auto font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl border ${rate >= 80 ? 'bg-error/10 text-error border-error/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]'}`}>
                       {rate}% Booked
                     </span>
                   </div>
                 );
              })}
            </div>
          </section>

        </div>
      </main>

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
        <Link to="/add" className="flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-on-surface p-2 transition-colors">
          <span className="material-symbols-outlined text-xl">edit_note</span>
          <span className="text-[10px] font-medium tracking-wide">Forms</span>
        </Link>
        <Link to="/reports" className="flex flex-col items-center gap-1.5 text-primary p-2">
          <div className="bg-primary/20 p-1.5 rounded-xl">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: 'FILL 1' }}>analytics</span>
          </div>
          <span className="text-[10px] font-bold tracking-wide">Reports</span>
        </Link>
      </nav>

    </div>
  );
};

export default Reports;
