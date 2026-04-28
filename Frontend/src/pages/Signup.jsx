import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [role, setRole] = useState('participant'); // 'core' or 'participant'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationKey, setVerificationKey] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    if (role === 'core' && verificationKey !== 'secret123') {
      setError('Invalid core verification key.');
      return;
    }
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-on-background flex items-center justify-center relative overflow-hidden selection:bg-primary/30">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row glass-panel rounded-[32px] overflow-hidden relative z-10 m-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
        
        {/* Left side: Branding & Visuals */}
        <div className="hidden md:flex md:w-1/2 bg-surface-container-lowest/50 p-12 flex-col justify-between text-on-surface border-r border-outline-variant/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent -z-10"></div>
          <div>
            <div className="w-12 h-12 primary-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-3xl text-white">hub</span>
            </div>
            <h1 className="font-headline text-4xl font-extrabold mb-4 tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              Join the movement.
            </h1>
            <p className="text-on-surface-variant font-medium leading-relaxed max-w-sm text-lg">
              Create an account to start curating world-class experiences and transforming chaotic energy into perfectly aligned events.
            </p>
          </div>
          <div className="mt-12 bg-surface-container/30 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-inner">
            <h3 className="font-bold mb-4 text-on-surface">Platform Features</h3>
            <ul className="text-sm text-on-surface-variant space-y-3">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> <span className="font-medium">Real-time analytics</span></li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> <span className="font-medium">Scalable member capacity</span></li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> <span className="font-medium">Premium support lines</span></li>
            </ul>
          </div>
        </div>

        {/* Right side: Signup Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center bg-surface-container-lowest/80 backdrop-blur-sm">
          <div className="md:hidden flex items-center justify-center mb-8">
            <div className="w-12 h-12 primary-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-3xl text-white">hub</span>
            </div>
          </div>

          <h2 className="font-headline text-3xl font-bold mb-2 text-on-surface">Create Account</h2>
          <p className="text-on-surface-variant mb-6 font-medium">Start your curator journey today.</p>
          {error && <p className="text-error font-medium mb-6 bg-error/10 p-3 rounded-xl border border-error/20 flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-lg">error</span> {error}</p>}

          {/* Role Toggle */}
          <div className="flex bg-surface-container/50 p-1.5 rounded-2xl mb-8 border border-white/5">
            <button 
              type="button"
              onClick={() => setRole('core')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${role === 'core' ? 'bg-surface-container-high text-on-surface shadow-md border border-white/10' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Core Member
            </button>
            <button 
              type="button"
              onClick={() => setRole('participant')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${role === 'participant' ? 'bg-surface-container-high text-on-surface shadow-md border border-white/10' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Participant
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-xs font-bold mb-2 ml-1 text-on-surface-variant uppercase tracking-wider">Full Name</label>
              <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                <span className="material-symbols-outlined text-on-surface-variant/70">person</span>
                <input required type="text" placeholder="Ariana Grande" className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-2 ml-1 text-on-surface-variant uppercase tracking-wider">Email Address</label>
              <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                <span className="material-symbols-outlined text-on-surface-variant/70">mail</span>
                <input required type="email" placeholder="curator@kinetic.com" className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">Password</label>
              </div>
              <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                <span className="material-symbols-outlined text-on-surface-variant/70">lock</span>
                <input required type="password" placeholder="•••••••••" className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 tracking-[0.2em] text-sm text-on-surface" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            {role === 'core' && (
              <div>
                <label className="block text-xs font-bold mb-2 ml-1 text-on-surface-variant uppercase tracking-wider">Verification Key</label>
                <div className="bg-surface-container/50 rounded-xl px-4 py-3.5 flex items-center gap-3 border border-outline-variant/30 focus-within:border-primary/50 focus-within:bg-surface-container-high transition-all shadow-inner">
                  <span className="material-symbols-outlined text-on-surface-variant/70">vpn_key</span>
                  <input required type="text" placeholder="Admin Secret Key" className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-on-surface-variant/40 text-sm text-on-surface" value={verificationKey} onChange={(e) => setVerificationKey(e.target.value)} />
                </div>
              </div>
            )}

            <div className="pt-4">
              <button type="submit" className="w-full primary-gradient text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20">
                <span>Launch My Account</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-on-surface-variant">
            Already have an account? <Link to="/login" className="text-primary hover:text-secondary font-bold transition-colors ml-1">Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
