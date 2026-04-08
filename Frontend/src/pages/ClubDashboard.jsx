import React from 'react';
import { Link } from 'react-router-dom';

const ClubDashboard = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5002/api/events') // fetching all events
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Failed to fetch events', err));
  }, []);

  // Compute metrics
  const totalConducted = events.length;
  const totalRegistrations = events.reduce((sum, e) => sum + (e.total_seats - e.available_seats), 0);

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">

<aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-[#f4f2fc] flex flex-col p-6 gap-8 font-['Manrope'] font-semibold text-sm">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
<span className="material-symbols-outlined">auto_graph</span>
</div>
<div>
<div className="text-xl font-extrabold text-[#24389c] leading-tight">Global Events</div>
<div className="text-xs text-on-surface-variant font-medium opacity-70">Premium Tier</div>
</div>
</div>
<nav className="flex flex-col gap-2 flex-grow">
<Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all rounded-xl" to="/">
<span className="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span>Home</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 bg-[#ffffff] text-[#24389c] rounded-xl shadow-sm translate-x-1 transition-transform" to="/dashboard">
<span className="material-symbols-outlined" data-icon="groups">groups</span>
<span>Clubs</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all rounded-xl" to="/events">
<span className="material-symbols-outlined" data-icon="event">event</span>
<span>Events</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all rounded-xl" to="/add">
<span className="material-symbols-outlined" data-icon="edit_note">edit_note</span>
<span>Forms</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all rounded-xl" to="/reports">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span>Reports</span>
</Link>
</nav>
<div className="pt-6 border-t border-outline-variant/20 flex flex-col gap-2">
<Link to="/add" className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 mb-4 shadow-md active:scale-95 transition-transform">
<span className="material-symbols-outlined text-sm" data-icon="add">add</span>
                New Club
            </Link>
<Link className="flex items-center gap-3 px-4 py-2 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all rounded-xl" to="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span>Support</span>
</Link>
<Link className="flex items-center gap-3 px-4 py-2 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all rounded-xl" to="/login">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span>Logout</span>
</Link>
</div>
</aside>
<main className="ml-64 min-h-screen p-8 lg:p-12">
<header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
<div className="space-y-1">
<h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-primary">Club Performance Dashboard</h1>
<p className="text-on-surface-variant font-medium max-w-lg">Real-time analytical overview of member engagement, event success metrics, and community growth.</p>
</div>
<div className="flex items-center gap-3 bg-surface-container-low p-2 rounded-xl">
<span className="material-symbols-outlined text-primary p-2 bg-white rounded-lg shadow-sm" data-icon="calendar_today">calendar_today</span>
<div className="pr-4">
<div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant opacity-60">Reporting Period</div>
<div className="text-sm font-bold text-primary">Oct 1 — Oct 31, 2023</div>
</div>
</div>
</header>
<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary/5 rounded-lg">
<span className="material-symbols-outlined text-primary" data-icon="event_available">event_available</span>
</div>
<span className="text-xs font-bold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="trending_up">trending_up</span> +12%
                    </span>
</div>
<div className="text-3xl font-extrabold text-primary mb-1">{totalConducted || 24}</div>
<div className="text-sm font-medium text-on-surface-variant">Events Conducted</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-secondary-container/20 rounded-lg">
<span className="material-symbols-outlined text-on-secondary-container" data-icon="person_add">person_add</span>
</div>
<span className="text-xs font-bold text-secondary flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="trending_up">trending_up</span> +8.4%
                    </span>
</div>
<div className="text-3xl font-extrabold text-primary mb-1">{totalRegistrations || "1,842"}</div>
<div className="text-sm font-medium text-on-surface-variant">Total Registrations</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-tertiary-fixed/40 rounded-lg">
<span className="material-symbols-outlined text-tertiary" data-icon="star">star</span>
</div>
<span className="text-xs font-bold text-on-surface-variant opacity-60">Avg Rating</span>
</div>
<div className="text-3xl font-extrabold text-primary mb-1">4.8</div>
<div className="flex items-center gap-1 text-secondary-fixed-dim">
<span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined text-sm" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined text-sm" data-icon="star_half">star_half</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary-container/10 rounded-lg">
<span className="material-symbols-outlined text-primary-container" data-icon="confirmation_number">confirmation_number</span>
</div>
<span className="text-xs font-bold text-error flex items-center gap-1">
<span className="material-symbols-outlined text-xs" data-icon="warning">warning</span> Low
                    </span>
</div>
<div className="text-3xl font-extrabold text-primary mb-1">156</div>
<div className="text-sm font-medium text-on-surface-variant">Seats Left (Upcoming)</div>
</div>
</section>
<section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
<div className="lg:col-span-2 bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
<div className="flex justify-between items-center mb-8">
<div>
<h3 className="text-xl font-bold text-primary">Attendance Over Time</h3>
<p className="text-xs text-on-surface-variant">Daily member participation across all events</p>
</div>
<select className="bg-white border-none text-xs font-bold text-primary rounded-lg shadow-sm focus:ring-primary">
<option>Last 30 Days</option>
<option>Last 90 Days</option>
</select>
</div>
<div className="h-64 flex items-end justify-between gap-2 px-2 relative">
<div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
<div className="border-b border-on-surface w-full"></div>
<div className="border-b border-on-surface w-full"></div>
<div className="border-b border-on-surface w-full"></div>
<div className="border-b border-on-surface w-full"></div>
</div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group h-[40%] hover:bg-primary/40 transition-colors">
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">420</div>
</div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group h-[65%] hover:bg-primary/40 transition-colors">
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">680</div>
</div>
<div className="flex-1 bg-primary/40 rounded-t-lg relative group h-[55%] hover:bg-primary/60 transition-colors"></div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group h-[85%] hover:bg-primary/40 transition-colors"></div>
<div className="flex-1 bg-primary/60 rounded-t-lg relative group h-[95%] hover:bg-primary/80 transition-colors"></div>
<div className="flex-1 bg-primary/30 rounded-t-lg relative group h-[45%] hover:bg-primary/50 transition-colors"></div>
<div className="flex-1 bg-primary/50 rounded-t-lg relative group h-[75%] hover:bg-primary/70 transition-colors"></div>
<div className="flex-1 bg-secondary-fixed-dim/40 rounded-t-lg relative group h-[60%] hover:bg-secondary-fixed-dim/60 transition-colors"></div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group h-[40%] hover:bg-primary/40 transition-colors"></div>
<div className="flex-1 bg-primary/40 rounded-t-lg relative group h-[70%] hover:bg-primary/60 transition-colors"></div>
</div>
<div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">
<span>Oct 01</span>
<span>Oct 15</span>
<span>Oct 31</span>
</div>
</div>
<div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col">
<h3 className="text-xl font-bold text-primary mb-6">Upcoming Capacity</h3>
<div className="space-y-8 flex-grow">
{events.length === 0 ? <p className="text-sm text-on-surface-variant italic">No upcoming events scheduled.</p> : events.slice(0, 3).map(event => {
  const seatsLeft = event.available_seats || 0;
  const capacity = event.total_seats || 1;
  const fillPercent = Math.max(0, Math.min(100, ((capacity - seatsLeft) / capacity) * 100));
  const isLow = seatsLeft <= 20;

  return (
    <div key={event.id}>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-primary">{event.title}</span>
        <span className={`text-xs font-medium ${isLow ? 'text-error' : 'text-on-surface-variant'}`}>{seatsLeft} seats left</span>
      </div>
      <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
        <div className={`h-full ${isLow ? 'bg-error' : 'bg-primary'} rounded-full`} style={{ width: `${fillPercent}%` }}></div>
      </div>
    </div>
  );
})}
</div>
<Link to="/events" className="mt-8 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all">
                    View All Schedules <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</Link>
</div>
</section>
<section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
<div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
<h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" data-icon="rate_review">rate_review</span>
                    Recent Feedback
                </h3>
<div className="space-y-6">
<div className="flex gap-4">
<img alt="Reviewer" className="w-12 h-12 rounded-full object-cover shadow-sm" data-alt="professional portrait of a woman in her 30s with friendly expression and modern business casual attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0uTeBvdSWvD6ZQ4cOB34nPCUxrhLbV0QmYJqTbImM7bnwNiIpXa8NS8BZ8330bkN3FyUQrDLi5HAcz9F-gS-C4TjVwPyZByU-0C3BHJcL3MdIUJSHc4_3LpwM61Q3NYg1lNT7Ft9_lVkdKrQGYt9jPfVCCCzJm-fc6LAYUz0It7uqtYwXbs601Nlf2Bb1qqFrvC4sDyNcATS1FBWJGqgueKud8PqPLpVN2FlsEushJpNLf3UDPTGhhepFThhwpCLrMn0L1p4l3DBp"/>
<div className="flex-1 border-b border-outline-variant/10 pb-6">
<div className="flex justify-between items-start mb-1">
<span className="font-bold text-primary">Sarah Jenkins</span>
<div className="flex text-secondary-fixed-dim scale-75 origin-right">
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
</div>
</div>
<p className="text-sm text-on-surface-variant leading-relaxed italic">"The speaker selection was exceptional. The venue layout allowed for perfect networking between sessions. Highly recommended."</p>
</div>
</div>
<div className="flex gap-4">
<img alt="Reviewer" className="w-12 h-12 rounded-full object-cover shadow-sm" data-alt="close-up portrait of a man with glasses and a thoughtful expression in a minimalist urban setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXaoV_k6eKp1HTkhnWalCFnOwOypww7531R6jmFdfvTkS7yR7XqFVSjwT1UBGqpglU-OgAGOY3oFQSVaacxMljd-RQrL700u82w76AE6eEIo8ws6Wpo_yTQUDobd5TuJPa-3HB0L1w6Z1q-B-KjRnctBJSjhB2l2HFdM95l4k-FDk2HOxMiWRJcV4jnwcLK4xhCQIjnTJ7Yopkqe5nuZQ9Tx3jxrkMcyCmsn8YWieUtB5K3LKbyej0Y0eeSs2Z58825KkuYJZ-TTsi"/>
<div className="flex-1 pb-2">
<div className="flex justify-between items-start mb-1">
<span className="font-bold text-primary">Michael Chen</span>
<div className="flex text-secondary-fixed-dim scale-75 origin-right">
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined" data-icon="star" data-weight="fill">star</span>
<span className="material-symbols-outlined" data-icon="star">star</span>
</div>
</div>
<p className="text-sm text-on-surface-variant leading-relaxed italic">"Great content, though the check-in process was a bit slow during the morning rush. Overall, a solid 4-star experience."</p>
</div>
</div>
</div>
</div>
<div className="relative rounded-2xl overflow-hidden group">
<img alt="Event Venue" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="wide angle shot of a modern brightly lit auditorium filled with people attending a professional conference" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoJfzYojnT6zalMq9wHVN2AnWx2v4zw6GbIZQTzGMA4BLMaJNXgL4bXOpavG5jNj6B2fj4DSQj_c-IG2bJd_0LtRDqBxKuR6LOT4vEaPMDloi9dFHnFBm1bDTbEcvGgAcVZ1sJfTi2XiAeJ0uZSsEl40CWHebCTbQ42eshfPHEK1I1P4Fo6ceB4_VQ8jGsemo2AkGeSzFa_mM415RW4JJ2VxFRScMkyqoyONHLV5NFGTtflVoYFVBeOBqZoIWunHpd8iRCKN11BPux"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>
<div className="absolute bottom-0 left-0 p-8 w-full">
<span className="inline-block px-3 py-1 bg-secondary text-white text-[10px] font-bold rounded-full mb-4 tracking-widest uppercase">Live Showcase</span>
<h3 className="text-3xl font-extrabold text-white mb-2 leading-tight">Member Engagement Night</h3>
<div className="flex items-center gap-6 text-white/80 text-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
<span>Main Hall, Zone B</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="group">group</span>
<span>420 Attending</span>
</div>
</div>
<button onClick={() => alert('Starting Live Stream Experience...')} className="mt-6 w-full bg-white text-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-secondary-container transition-colors">
                        Go to Event Stream
                        <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
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
