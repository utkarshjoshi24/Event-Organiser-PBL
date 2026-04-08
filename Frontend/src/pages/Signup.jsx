import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:5002/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }
      // Registration successful! We can just direct them to login
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary-container/30 rounded-full blur-[100px] mix-blend-multiply"></div>

      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-surface-container-lowest editorial-shadow rounded-[32px] overflow-hidden relative z-10">
        
        {/* Left side: Branding & Visuals */}
        <div className="hidden md:flex md:w-1/2 primary-gradient p-12 flex-col justify-between text-on-primary">
          <div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-xl">
              <span className="material-symbols-outlined text-3xl">hub</span>
            </div>
            <h1 className="font-headline text-4xl font-extrabold mb-4 tracking-tighter leading-tight">
              Join the movement.
            </h1>
            <p className="text-on-primary/80 font-medium leading-relaxed max-w-sm">
              Create an account to start curating world-class experiences and transforming chaotic energy into perfectly aligned events.
            </p>
          </div>
          <div className="mt-12 bg-black/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <h3 className="font-bold mb-2">Platform Features</h3>
            <ul className="text-sm text-on-primary/90 space-y-2">
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> Real-time analytics</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> Scalable member capacity</li>
              <li className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">check_circle</span> Premium support lines</li>
            </ul>
          </div>
        </div>

        {/* Right side: Signup Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
          <div className="md:hidden flex items-center justify-center mb-8">
            <span className="material-symbols-outlined text-4xl text-primary">hub</span>
          </div>

          <h2 className="font-headline text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-on-surface-variant mb-4">Start your curator journey today.</p>
          {error && <p className="text-error font-medium mb-4">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-bold mb-2 ml-1">Full Name</label>
              <div className="bg-surface-container-low rounded-xl px-4 py-3 flex items-center gap-3 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-white transition-colors">
                <span className="material-symbols-outlined text-outline">person</span>
                <input required type="text" placeholder="Ariana Grande" className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-outline/60 text-sm" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 ml-1">Email Address</label>
              <div className="bg-surface-container-low rounded-xl px-4 py-3 flex items-center gap-3 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-white transition-colors">
                <span className="material-symbols-outlined text-outline">mail</span>
                <input required type="email" placeholder="curator@kinetic.com" className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-outline/60 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-sm font-bold">Password</label>
              </div>
              <div className="bg-surface-container-low rounded-xl px-4 py-3 flex items-center gap-3 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-white transition-colors">
                <span className="material-symbols-outlined text-outline">lock</span>
                <input required type="password" placeholder="•••••••••" className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-outline/60 tracking-[0.2em] text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full primary-gradient text-on-primary py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:opacity-95 transition-opacity editorial-shadow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
                <span>Launch My Account</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-on-surface-variant">
            Already have an account? <Link to="/login" className="font-bold text-primary hover:underline">Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
