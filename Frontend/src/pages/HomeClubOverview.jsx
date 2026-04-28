import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomeClubOverview = () => {
  const [clubs, setClubs] = React.useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the backend to destroy the session cookie
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'omit' });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.success) setCurrentUser(data.user);
      })
      .catch(err => console.error('Failed to fetch user', err));

    fetch('/api/clubs')
      .then(res => res.json())
      .then(data => setClubs(data))
      .catch(err => console.error('Failed to fetch clubs', err));
  }, []);

  const deleteClub = async (id) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;
    try {
      const res = await fetch(`/api/clubs/${id}`, { method: 'DELETE' });
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
    <div className="bg-background font-body text-on-background min-h-screen relative selection:bg-primary/30">
      {/* Global Background Elements */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-8 h-20 max-w-[1920px] mx-auto font-['Manrope'] tracking-tight leading-tight transition-all">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Kinetic Curator</span>
          <div className="hidden md:flex gap-6 items-center">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-secondary transition-colors duration-300" to="/dashboard">Dashboard</Link>
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

      {/* Side Navigation Shell (Hidden on small screens) */}
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
          <Link className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl shadow-inner border border-primary/20 translate-x-1 transition-transform" to="/home">
            <span className="material-symbols-outlined">grid_view</span> Home
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/dashboard">
            <span className="material-symbols-outlined">groups</span> Clubs
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 rounded-xl transition-all" to="/events">
            <span className="material-symbols-outlined">event</span> Events
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
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-error/80 hover:text-error hover:bg-error/10 rounded-xl transition-all text-left">
            <span className="material-symbols-outlined">logout</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-8 py-12">
          
          {/* Hero Section / Welcome */}
          <section className="mb-16">
            <div className="glass-panel relative overflow-hidden rounded-[32px] p-12 border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent -z-10"></div>
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold tracking-widest mb-6 uppercase shadow-inner">Organizer Portal</span>
                <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tighter mb-6 leading-[1.1]">
                  Welcome back, <br/>Curator.
                </h1>
                <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8 max-w-lg">
                  Manage your creative ecosystems and track live event performance from your central command center. Your next sell-out starts here.
                </p>
                <div className="flex flex-wrap gap-4">
                  {(!currentUser || currentUser.role === 'core') && (
                    <Link to="/add" className="primary-gradient text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:-translate-y-1 active:translate-y-0">
                      <span className="material-symbols-outlined">add_circle</span> Create New Event
                    </Link>
                  )}
                  <Link to="/dashboard" className="bg-surface-container/50 text-on-surface px-8 py-4 rounded-xl font-bold border border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container-high transition-all">
                    View Analytics
                  </Link>
                </div>
              </div>
              {/* Decorative background element */}
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="absolute right-20 bottom-0 w-64 h-64 bg-secondary/20 rounded-full blur-[60px] pointer-events-none"></div>
            </div>
          </section>

          {/* Clubs Section */}
          <section>
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">Active Clubs</h2>
                <p className="text-on-surface-variant mt-2 font-medium">Manage your core organization sub-groups</p>
              </div>
              <Link to="/dashboard" className="flex items-center gap-2 text-primary font-bold hover:text-secondary hover:gap-3 transition-all">
                View All Clubs <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            
            {/* Bento-style Grid for Clubs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {clubs.length === 0 ? (
                <div className="glass-panel col-span-1 md:col-span-2 p-12 text-center border border-white/5 rounded-3xl">
                  <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 animate-pulse">hourglass_empty</span>
                  <p className="text-on-surface-variant font-medium text-lg">Loading clubs or no clubs available...</p>
                </div>
              ) : clubs.map((club, index) => (
                <div key={club.id} className="group glass-panel rounded-3xl overflow-hidden border border-white/5 transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:-translate-y-2 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <img alt="Club cover image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={getClubImage(index)}/>
                    <div className="absolute top-6 left-6 w-16 h-16 bg-surface-container-highest/80 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-xl flex items-center justify-center z-20 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: 'FILL 1' }}>{index % 2 === 0 ? 'music_note' : 'graphic_eq'}</span>
                    </div>
                    <div className="absolute top-6 right-6 z-20">
                      <span className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 backdrop-blur-md rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">{index % 2 === 0 ? 'Live' : 'Upcoming'}</span>
                    </div>
                  </div>
                  <div className="p-8 relative z-10">
                    <h3 className="font-headline text-2xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">{club.name}</h3>
                    <p className="text-on-surface-variant leading-relaxed mb-6 line-clamp-2">
                      {club.description}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex -space-x-3">
                        <img className="w-10 h-10 rounded-full border-2 border-surface-container-highest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyNce_0LOU42rkscXGl4JrHCsxJAvXAsm8IF6CtdOKWtBMXT_nJeSLfvUPvTljfPNtyoz-vELqfVRp1G5mCMnui7KguXwXPuAMjJS8WxRc6WbCYLfBRi9RT-P2AguLIQ3YtJhpuNUDvI581jwL_SZAiTNlXlFaOjt1QqxLW4yS02KRMbmayZxiZ5wecje78NhBXiaIhcxwmpwRJq3BiYGYK8ih71UyyVU39XKtpAhL_qfKFSKm5PNn_Kp7FhB9VHd0X-uwZPVjSZt1"/>
                        <img className="w-10 h-10 rounded-full border-2 border-surface-container-highest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtpBU96oUKeNh6M5J0hn8692Zjz6NWPRjIiLW-9NXoWJh2eQ2xmB_HrfTHwbPdDr52XCERE2m3-QEZSfSLnrL4-l4BHt5w7_U8E_f_rrMQV5H-Cbf5393YGOyYKWRD5xNGOkvr3bC47iIhsY4aD4Edrdi88fWcdJJozRKkPmrdHN343H3pHcLTuZ-lSCboZPqXmeuBlOYHZbx4dRMUbHSW_2lyr0CHkAouJ18sjz_ecvYBJLZLUeqJXKNhIRRKScRlTSBtJNKe3W1b"/>
                        <div className="w-10 h-10 rounded-full border-2 border-surface-container-highest bg-surface-container-low flex items-center justify-center text-[10px] font-bold text-primary">+{(1.2 * (index+1)).toFixed(1)}k</div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => deleteClub(club.id)} className="w-12 h-12 bg-surface-container hover:bg-error/20 text-on-surface-variant hover:text-error rounded-xl transition-colors flex items-center justify-center border border-white/5 hover:border-error/30">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                        <Link to="/dashboard" className="w-12 h-12 bg-surface-container text-primary hover:bg-primary hover:text-white rounded-xl transition-colors flex items-center justify-center border border-white/5 shadow-inner">
                          <span className="material-symbols-outlined text-xl">arrow_outward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Club Placeholder */}
            <div className="mt-12">
              <Link to="/add" className="w-full py-12 border-2 border-dashed border-outline-variant/30 rounded-[32px] group hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-4 bg-surface-container-lowest/30 hover:bg-primary/5 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-container-lowest/50"></div>
                <div className="w-20 h-20 rounded-2xl bg-surface-container/80 flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-all shadow-lg group-hover:shadow-primary/30 relative z-10 border border-white/5 group-hover:scale-110">
                  <span className="material-symbols-outlined text-4xl">add</span>
                </div>
                <div className="text-center relative z-10">
                  <p className="font-headline font-bold text-xl text-on-surface mb-1 group-hover:text-primary transition-colors">Launch a new club</p>
                  <p className="text-sm text-on-surface-variant/80 font-medium tracking-wide">Scale your organizer footprint with a new entity</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Secondary Content Section */}
          <section className="mt-24 mb-10">
            <div className="relative overflow-hidden rounded-[32px] p-10 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between">
              <div className="absolute inset-0 primary-gradient opacity-20 mix-blend-screen"></div>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
              
              <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
                <h3 className="font-headline text-2xl font-bold text-white mb-2">Current Reach</h3>
                <p className="text-white/70 font-medium">Total registered network across all instances</p>
              </div>
              <div className="relative z-10 text-center md:text-right">
                <p className="text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2 drop-shadow-lg">{clubs.length * 124}</p>
                <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] bg-primary/10 py-1.5 px-4 rounded-full border border-primary/20 inline-block">Estimated Network</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Bottom Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-surface-container-lowest/80 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-50 pb-safe">
        <Link to="/home" className="flex flex-col items-center gap-1.5 text-primary p-2">
          <div className="bg-primary/20 p-1.5 rounded-xl">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: 'FILL 1' }}>grid_view</span>
          </div>
          <span className="text-[10px] font-bold tracking-wide">Home</span>
        </Link>
        <Link to="/dashboard" className="flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-on-surface p-2 transition-colors">
          <span className="material-symbols-outlined text-xl">groups</span>
          <span className="text-[10px] font-medium tracking-wide">Clubs</span>
        </Link>
        <Link to="/events" className="flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-on-surface p-2 transition-colors">
          <span className="material-symbols-outlined text-xl">event</span>
          <span className="text-[10px] font-medium tracking-wide">Events</span>
        </Link>
        <Link to="/reports" className="flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-on-surface p-2 transition-colors">
          <span className="material-symbols-outlined text-xl">analytics</span>
          <span className="text-[10px] font-medium tracking-wide">Reports</span>
        </Link>
      </nav>

    </div>
  );
};

export default HomeClubOverview;
