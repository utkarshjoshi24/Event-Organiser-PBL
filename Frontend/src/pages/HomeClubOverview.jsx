import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomeClubOverview = () => {
  const [clubs, setClubs] = React.useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the backend to destroy the session cookie
      await fetch('http://localhost:5002/api/auth/logout', { method: 'POST', credentials: 'omit' });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  React.useEffect(() => {
    fetch('http://localhost:5002/api/clubs')
      .then(res => res.json())
      .then(data => setClubs(data))
      .catch(err => console.error('Failed to fetch clubs', err));
  }, []);

  const deleteClub = async (id) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;
    try {
      const res = await fetch(`http://localhost:5002/api/clubs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setClubs(prev => prev.filter(c => c.id !== id));
      } else {
        alert("Failed to delete club");
      }
    } catch (err) {
      console.error('Failed to delete club', err);
    }
  };

  const getClubImage = (index) => {
    return [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtRZs5sAQrdhKynZDEdP0n7KA3uwCUm4jlV-NVwpQSNGw_uGGyPRaVVKJBUJhuq1FkHxkz3lnykCmdB7Uyronth7-aIWcL61dYbj-n1YgxO50F9OF72u1A88T-lCyApA9ZHYCQ0KW2GiNqc38i_kX8DLH-bTIgyOwAisnX7jtRJ34uq0pZSQDfaufV4qoF7YyR_SOEByvBjkgTOLq2Dn3gcs7hxsWxWeNdHo_5-H6hjQP6k_TWr8qZ2rxyLlRhwo3kPu0bJUjZBuXS",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdKn1LPAzNQNytiLWqRpkc-4Zwb7yf85O8BoW577JRtva54HOPhWD0YNETsQCOM9u-KlR04zjb6diPjfH20UWmi71bpflkMjSnRd5if7Jfzc5-b8nEaIP9EvWGr3MDodQCp3pt1AeMQBI15L4GTjDB8BIJLqiKXFRUFZzQkghnPpW8GFanRKINaoaou1Li0b99UqrjqPPaP3gjrhw34PGgbEA8n6hagZGXBmimG_FiPYXVrsqUzEAP0V4wrt9KSu8cZqN4q15VHQf7"
    ][index % 2];
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">


{/* Top Navigation Shell */}
<nav className="fixed top-0 w-full z-50 bg-[#fbf8ff]/80 backdrop-blur-xl flex justify-between items-center px-8 h-20 w-full max-w-[1920px] mx-auto font-['Manrope'] tracking-tight leading-tight">
<div className="flex items-center gap-8">
<span className="text-2xl font-bold tracking-tighter text-[#24389c]">Kinetic Curator</span>
<div className="hidden md:flex gap-6 items-center">
<Link className="text-[#24389c] font-bold border-b-2 border-[#24389c] pb-1 hover:text-[#24389c] transition-colors duration-300" to="/dashboard">Dashboard</Link>
<Link className="text-[#1a1b22]/60 font-medium hover:text-[#24389c] transition-colors duration-300" to="/events">Schedules</Link>
<Link className="text-[#1a1b22]/60 font-medium hover:text-[#24389c] transition-colors duration-300" to="/events">Attendees</Link>
<Link className="text-[#1a1b22]/60 font-medium hover:text-[#24389c] transition-colors duration-300" to="/reports">Analytics</Link>
</div>
</div>
<div className="flex items-center gap-4">
<div className="hidden lg:flex items-center bg-surface-container-high rounded-lg px-3 py-1.5 gap-2 cursor-pointer" onClick={() => alert('Search feature scaling up')}>
<span className="material-symbols-outlined text-outline">search</span>
<input className="bg-transparent border-none focus:ring-0 text-sm placeholder:text-outline w-48 pointer-events-none" placeholder="Search events..." type="text"/>
</div>
<button onClick={() => alert('You have 0 new notifications')} className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">notifications</button>
<button onClick={() => alert('Settings configuration open')} className="material-symbols-outlined p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors">settings</button>
<Link to="/login" className="h-10 w-10 rounded-full bg-surface-container overflow-hidden hover:opacity-80 transition-opacity">
<img alt="User profile avatar" data-alt="Close up portrait of a professional male event coordinator with a friendly expression in a modern office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0rIZe6gpgKaw-V0r5E_Gwm97GDR0sdOCLN6d9bFAQmC8-uOMAk_AO-pHz2QmXvJ1MIjTxwi3mBd_PcwhTTOrZTSySJ10kQ8bCKLjUv3XddG7TrSPfCruVQfg-hWLpEb9wY5FnxaX8iSmefpEnCWC51TPJTAXzd4vfB47rUFu3AJpDOO_3lgHZ0y78fnqZVH9B_srcxXyEgQDZo-vz6TvZ3cJ9cwRqssK5ROwJMMa2qXwd1eJvRAnm0n0EVQy3-Xj-XCybdnch89fU"/>
</Link>
</div>
</nav>
{/* Side Navigation Shell (Hidden on small screens) */}
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
<Link className="flex items-center gap-3 px-4 py-3 bg-[#ffffff] text-[#24389c] rounded-xl shadow-sm translate-x-1 transition-transform" to="/">
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
<Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all" to="/reports">
<span className="material-symbols-outlined">analytics</span> Reports
            </Link>
</div>
<Link to="/add" className="mt-4 mx-2 py-3 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined">add</span> New Club
        </Link>
<div className="mt-auto flex flex-col gap-1 border-t border-outline-variant/10 pt-4">
<Link className="flex items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all" to="#">
<span className="material-symbols-outlined">help</span> Support
            </Link>
<button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-[#1a1b22]/70 hover:bg-[#efedf6] transition-all text-left">
<span className="material-symbols-outlined">logout</span> Logout
            </button>
</div>
</aside>
{/* Main Content Canvas */}
<main className="lg:ml-64 pt-20 min-h-screen">
<div className="max-w-7xl mx-auto px-8 py-12">
{/* Hero Section / Welcome */}
<section className="mb-16">
<div className="relative overflow-hidden rounded-3xl p-12 bg-surface-container-low">
<div className="relative z-10 max-w-2xl">
<span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest mb-6 uppercase">Organizer Portal</span>
<h1 className="font-headline text-5xl md:text-6xl font-extrabold text-on-surface tracking-tighter mb-6 leading-[1.1]">
                            Welcome back, <br/>Curator.
                        </h1>
<p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8 max-w-lg">
                            Manage your creative ecosystems and track live event performance from your central command center. Your next sell-out starts here.
                        </p>
<div className="flex flex-wrap gap-4">
<Link to="/add" className="primary-gradient text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-primary/20">
<span className="material-symbols-outlined">add_circle</span> Create New Event
                            </Link>
<Link to="/dashboard" className="bg-surface-container-lowest text-primary px-8 py-4 rounded-xl font-bold border-2 border-primary/5 hover:bg-white transition-all shadow-sm">
                                View Analytics
                            </Link>
</div>
</div>
{/* Decorative background element */}
<div className="absolute -right-20 -top-20 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl"></div>
<div className="absolute right-20 bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl"></div>
</div>
</section>
{/* Clubs Section */}
<section>
<div className="flex justify-between items-end mb-10">
<div>
<h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">Active Clubs</h2>
<p className="text-on-surface-variant mt-2">Manage your core organization sub-groups</p>
</div>
<Link to="/dashboard" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                        View All Clubs <span className="material-symbols-outlined">arrow_forward</span>
</Link>
</div>
{/* Bento-style Grid for Clubs */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
{clubs.length === 0 ? <p className="text-on-surface-variant p-4">Loading clubs or no clubs available...</p> : clubs.map((club, index) => (
  <div key={club.id} className="group bg-surface-container-lowest rounded-3xl overflow-hidden editorial-shadow transition-all hover:-translate-y-2">
    <div className="relative h-64 overflow-hidden">
      <img alt="Club cover image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={getClubImage(index)}/>
      <div className="absolute top-6 left-6 w-16 h-16 bg-white rounded-2xl p-2 shadow-xl flex items-center justify-center">
        <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: 'FILL 1' }}>{index % 2 === 0 ? 'music_note' : 'graphic_eq'}</span>
      </div>
      <div className="absolute top-6 right-6">
        <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold shadow-sm">{index % 2 === 0 ? 'Live' : 'Upcoming'}</span>
      </div>
    </div>
    <div className="p-8">
      <h3 className="font-headline text-2xl font-bold text-on-surface mb-3">{club.name}</h3>
      <p className="text-on-surface-variant leading-relaxed mb-6">
        {club.description}
      </p>
      <div className="flex items-center justify-between pt-6 border-t border-surface-container">
        <div className="flex -space-x-3">
          <img className="w-10 h-10 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyNce_0LOU42rkscXGl4JrHCsxJAvXAsm8IF6CtdOKWtBMXT_nJeSLfvUPvTljfPNtyoz-vELqfVRp1G5mCMnui7KguXwXPuAMjJS8WxRc6WbCYLfBRi9RT-P2AguLIQ3YtJhpuNUDvI581jwL_SZAiTNlXlFaOjt1QqxLW4yS02KRMbmayZxiZ5wecje78NhBXiaIhcxwmpwRJq3BiYGYK8ih71UyyVU39XKtpAhL_qfKFSKm5PNn_Kp7FhB9VHd0X-uwZPVjSZt1"/>
          <img className="w-10 h-10 rounded-full border-2 border-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtpBU96oUKeNh6M5J0hn8692Zjz6NWPRjIiLW-9NXoWJh2eQ2xmB_HrfTHwbPdDr52XCERE2m3-QEZSfSLnrL4-l4BHt5w7_U8E_f_rrMQV5H-Cbf5393YGOyYKWRD5xNGOkvr3bC47iIhsY4aD4Edrdi88fWcdJJozRKkPmrdHN343H3pHcLTuZ-lSCboZPqXmeuBlOYHZbx4dRMUbHSW_2lyr0CHkAouJ18sjz_ecvYBJLZLUeqJXKNhIRRKScRlTSBtJNKe3W1b"/>
          <div className="w-10 h-10 rounded-full border-2 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold text-on-surface-variant">+{(1.2 * (index+1)).toFixed(1)}k</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => deleteClub(club.id)} className="p-3 bg-error-container text-on-error-container rounded-xl hover:bg-error hover:text-white transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">delete</span>
          </button>
          <Link to="/dashboard" className="p-3 bg-surface-container-high rounded-xl text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_outward</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
))}
</div>
{/* Add New Club Placeholder */}
<div className="mt-12">
<Link to="/add" className="w-full py-10 border-2 border-dashed border-outline-variant/30 rounded-3xl group hover:border-primary/40 transition-all flex flex-col items-center justify-center gap-4 bg-surface-container-low/50 hover:bg-surface-container-low">
<div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline group-hover:bg-primary group-hover:text-on-primary transition-all">
<span className="material-symbols-outlined text-3xl">add_circle</span>
</div>
<div className="text-center">
<p className="font-headline font-bold text-lg text-on-surface-variant">Launch a new club</p>
<p className="text-sm text-outline">Scale your organizer footprint with a new entity</p>
</div>
</Link>
</div>
</section>
{/* Secondary Content Section */}
<section className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
<div className="lg:col-span-2 bg-surface-container rounded-3xl p-8">
<h3 className="font-headline text-xl font-bold mb-6">Recent Activity</h3>
<div className="space-y-6">
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined">confirmation_number</span>
</div>
<div>
<p className="text-sm font-semibold">New Ticket Sale</p>
<p className="text-xs text-on-surface-variant">Swaragini: Monsoon Ragas • 2 mins ago</p>
</div>
<span className="ml-auto text-sm font-bold text-primary">+$45.00</span>
</div>
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined">person_add</span>
</div>
<div>
<p className="text-sm font-semibold">Member Joined</p>
<p className="text-xs text-on-surface-variant">Synthoria: Digital Pulse • 15 mins ago</p>
</div>
</div>
<div className="flex items-start gap-4 opacity-60">
<div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined">check_circle</span>
</div>
<div>
<p className="text-sm font-semibold">Venue Confirmed</p>
<p className="text-xs text-on-surface-variant">Grand Arena • 1 hour ago</p>
</div>
</div>
</div>
</div>
<div className="bg-primary-container rounded-3xl p-8 text-on-primary-container">
<h3 className="font-headline text-xl font-bold mb-4">Current Reach</h3>
<div className="mt-8">
<p className="text-5xl font-extrabold tracking-tighter mb-2">12.4k</p>
<p className="text-sm font-medium opacity-80 uppercase tracking-widest">Total Attendees</p>
</div>
<div className="mt-8 pt-8 border-t border-on-primary-container/20">
<div className="flex justify-between items-end">
<div>
<p className="text-2xl font-bold">84%</p>
<p className="text-xs opacity-70">Engagement Rate</p>
</div>
<span className="material-symbols-outlined text-secondary-container text-4xl">trending_up</span>
</div>
</div>
</div>
</section>
</div>
</main>
{/* Bottom Mobile Nav */}
<nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface glass-header border-t border-outline-variant/10 flex items-center justify-around px-4 z-50">
<Link to="/" className="flex flex-col items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{ fontVariationSettings: 'FILL 1' }}>grid_view</span>
<span className="text-[10px] font-bold">Home</span>
</Link>
<Link to="/dashboard" className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">groups</span>
<span className="text-[10px] font-medium">Clubs</span>
</Link>
<Link to="/events" className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">event</span>
<span className="text-[10px] font-medium">Events</span>
</Link>
<Link to="/reports" className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">analytics</span>
<span className="text-[10px] font-medium">Reports</span>
</Link>
</nav>

    </div>
  );
};

export default HomeClubOverview;
