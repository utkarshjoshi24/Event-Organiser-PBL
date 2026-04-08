import React from 'react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5002/api/events')
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
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <aside className="hidden lg:flex h-screen w-64 fixed left-0 top-0 z-40 bg-[#f4f2fc] flex flex-col p-6 gap-8 font-['Manrope'] font-semibold text-sm pt-28">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">hub</span>
          </div>
          <div>
            <p className="text-on-surface font-bold">Global Events</p>
            <p className="text-xs text-on-surface-variant opacity-70">Premium Tier</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all" to="/">
            <span className="material-symbols-outlined">grid_view</span> Home
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all" to="/dashboard">
            <span className="material-symbols-outlined">groups</span> Clubs
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all" to="/events">
            <span className="material-symbols-outlined">event</span> Events
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all" to="/add">
            <span className="material-symbols-outlined">edit_note</span> Forms
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 bg-[#ffffff] text-[#24389c] rounded-xl shadow-sm translate-x-1 transition-transform" to="/reports">
            <span className="material-symbols-outlined">analytics</span> Reports
          </Link>
        </div>
      </aside>

      <main className="lg:ml-64 pt-20 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 mt-12">
            <h1 className="text-display-lg text-4xl lg:text-5xl font-extrabold tracking-tight text-primary leading-tight">Analytics & Insights</h1>
            <p className="text-lg text-on-surface-variant leading-relaxed mt-2">Comprehensive performance reports for all hosted ecosystems.</p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 shadow-sm hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">event_available</span>
              <p className="text-4xl font-extrabold text-on-surface">{totalEvents}</p>
              <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mt-2">Total Events</p>
            </div>
            
            <div className="bg-primary p-8 rounded-3xl shadow-lg hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-4xl text-on-primary mb-4">group</span>
              <p className="text-4xl font-extrabold text-on-primary">{totalBooked}</p>
              <p className="text-sm font-semibold text-primary-container-highest uppercase text-on-primary/80 tracking-widest mt-2">Global Attendees</p>
            </div>

            <div className="bg-secondary-container p-8 rounded-3xl shadow-sm hover:-translate-y-1 transition-transform">
              <span className="material-symbols-outlined text-4xl text-on-secondary-container mb-4">pie_chart</span>
              <p className="text-4xl font-extrabold text-on-secondary-container">{fillRate}%</p>
              <p className="text-sm font-semibold text-on-secondary-container/80 uppercase tracking-widest mt-2">Overall Fill Rate</p>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">Execution Logs</h3>
            <div className="space-y-4">
              {events.length === 0 ? <p className="text-sm text-on-surface-variant italic">No data to calculate.</p> : events.map(event => {
                 const booked = (event.total_seats || 0) - (event.available_seats || 0);
                 const rate = event.total_seats ? Math.round((booked / event.total_seats) * 100) : 0;
                 return (
                   <div key={event.id} className="flex justify-between items-center p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-colors">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                         <span className="material-symbols-outlined">donut_large</span>
                       </div>
                       <div>
                         <p className="font-bold text-on-surface">{event.title}</p>
                         <p className="text-xs text-on-surface-variant">{booked} of {event.total_seats} capacity reached</p>
                       </div>
                     </div>
                     <span className={`font-bold text-sm px-3 py-1 rounded-full ${rate >= 80 ? 'bg-error-container text-on-error-container' : 'bg-primary-container text-on-primary-container'}`}>
                       {rate}% Booked
                     </span>
                   </div>
                 );
              })}
            </div>
          </section>

        </div>
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
        <Link to="/add" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="text-[10px] font-medium">Forms</span>
        </Link>
        <Link to="/reports" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>analytics</span>
          <span className="text-[10px] font-medium">Reports</span>
        </Link>
      </nav>
    </div>
  );
};

export default Reports;
