import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RegisterEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/events/${eventId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setEvent(data);
        }
      })
      .catch(err => {
        setError('Failed to fetch event details');
        console.error(err);
      });
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
      } else {
        setMessage('Successfully registered for the event!');
        setEvent(data.event);
        setName('');
        setEmail('');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    }
  };

  if (error && !event) {
    return (
      <div className="min-h-screen bg-background font-body flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
        <div className="glass-panel text-error p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border border-error/20">
          <span className="material-symbols-outlined text-5xl mb-4 text-error">error</span>
          <h2 className="text-2xl font-headline font-bold mb-2">Event Not Found</h2>
          <p className="text-error/80">{error}</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
        <div className="w-16 h-16 rounded-full border-4 border-surface-container-highest flex items-center justify-center relative">
            <div className="absolute inset-[-4px] border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body flex items-center justify-center p-4 relative overflow-hidden selection:bg-primary/30">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      
      <div className="glass-panel p-8 md:p-12 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-lg w-full border border-white/5 relative z-10 m-4">
        <div className="text-center mb-10">
          <div className="w-20 h-20 primary-gradient rounded-[24px] mx-auto flex items-center justify-center shadow-lg shadow-primary/20 mb-6 border border-white/10">
            <span className="material-symbols-outlined text-4xl text-white">how_to_reg</span>
          </div>
          <h1 className="text-4xl font-headline font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-3">{event.title}</h1>
          <p className="text-on-surface-variant font-medium flex items-center justify-center gap-2 bg-surface-container/50 py-1.5 px-4 rounded-full w-max mx-auto border border-outline-variant/10">
            <span className="material-symbols-outlined text-[16px] text-primary">event_seat</span>
            {event.available_seats} seats available
          </p>
        </div>

        {message && (
          <div className="bg-primary/10 text-primary p-4 rounded-xl mb-6 flex items-center gap-3 border border-primary/20 animate-in fade-in slide-in-from-top-2">
            <span className="material-symbols-outlined text-xl">check_circle</span>
            <p className="text-sm font-bold">{message}</p>
          </div>
        )}

        {error && !message && (
          <div className="bg-error/10 text-error p-4 rounded-xl mb-6 flex items-center gap-3 border border-error/20 animate-in fade-in slide-in-from-top-2">
            <span className="material-symbols-outlined text-xl">error</span>
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        {event.available_seats > 0 ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Full Name</label>
              <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                <span className="material-symbols-outlined text-on-surface-variant/70">person</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                <span className="material-symbols-outlined text-on-surface-variant/70">mail</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full primary-gradient text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02] active:scale-95 flex justify-center items-center gap-2"
            >
              <span>Register Now</span>
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        ) : (
          <div className="text-center p-8 bg-surface-container/50 rounded-2xl border border-outline-variant/10">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/50 mb-4">block</span>
            <p className="text-on-surface font-headline font-bold text-xl mb-2">Event is Full</p>
            <p className="text-sm text-on-surface-variant/80">Unfortunately, there are no more seats available for this event.</p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-white/5 text-center flex items-center justify-center gap-2 text-on-surface-variant/50">
          <span className="material-symbols-outlined text-sm">hub</span>
          <p className="text-xs font-bold tracking-wider uppercase">Powered by Kinetic Curator</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;
