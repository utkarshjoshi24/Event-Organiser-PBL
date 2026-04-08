import React from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5002/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`http://localhost:5002/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents(prev => prev.filter(e => e.id !== id));
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      console.error('Failed to delete event', err);
    }
  };

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
          <Link className="flex items-center gap-3 px-4 py-3 bg-[#ffffff] text-[#24389c] rounded-xl shadow-sm translate-x-1 transition-transform" to="/events">
            <span className="material-symbols-outlined">event</span> Events
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all" to="/add">
            <span className="material-symbols-outlined">edit_note</span> Forms
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all" to="/reports">
            <span className="material-symbols-outlined">analytics</span> Reports
          </Link>
        </div>
      </aside>

      <main className="lg:ml-64 pt-20 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 mt-12">
            <div>
              <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">Events Planner</h1>
              <p className="text-on-surface-variant mt-2">Manage, track, and execute your live events with precision.</p>
            </div>
            <Link to="/add" className="primary-gradient text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md hover:opacity-90">
              <span className="material-symbols-outlined">add</span> Create Event
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length === 0 ? (
              <p className="text-on-surface-variant p-4 col-span-3">Loading events or no events scheduled...</p>
            ) : (
              events.map((event, i) => {
                const perc = event.total_seats ? Math.round(((event.total_seats - event.available_seats) / event.total_seats) * 100) : 0;
                return (
                  <div key={event.id} className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/10 shadow-sm hover:shadow-lg transition-all group hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">{i % 2 === 0 ? 'festival' : 'stadium'}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => deleteEvent(event.id)} className="bg-error-container text-on-error-container hover:bg-error hover:text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider transition-colors">
                          Delete
                        </button>
                        <span className="bg-secondary-container text-on-secondary-container text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
                          {event.available_seats > 50 ? 'Upcoming' : 'Selling Fast'}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-headline text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-on-surface-variant mb-6 flex items-center gap-2">
                       <span className="material-symbols-outlined text-[16px]">location_on</span> Main Hall, Auditorium
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-outline-variant/10">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-semibold">Registrations</span>
                        <span className="text-sm font-bold text-primary">{perc}% Filled</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${perc}%` }}></div>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-3 text-right">
                        {event.available_seats} seats left of {event.total_seats}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
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
        <Link to="/events" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>event</span>
          <span className="text-[10px] font-medium">Events</span>
        </Link>
        <Link to="/add" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">edit_note</span>
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

export default Events;
