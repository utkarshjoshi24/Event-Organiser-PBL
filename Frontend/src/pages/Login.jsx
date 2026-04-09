import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('core'); // 'core' or 'participant'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:5002/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'omit' // Replace 'omit' with 'include' when cross-origin session cookies are desired
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await response.json();
      
      // Removed localStorage item - backend tracks session via cookies.
      
      // Simulate dashboard rendering on role
      if (data.role === 'admin' || role === 'core') {
        navigate('/');
      } else {
        navigate('/');
      }
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
              Curate the extraordinary.
            </h1>
            <p className="text-on-primary/80 font-medium leading-relaxed max-w-sm">
              The Kinetic Curator platform organizes chaotic energy into masterful event experiences. Log in to scale your ecosystem.
            </p>
          </div>
          <div className="mt-12 bg-black/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="flex -space-x-3 mb-4">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyNce_0LOU42rkscXGl4JrHCsxJAvXAsm8IF6CtdOKWtBMXT_nJeSLfvUPvTljfPNtyoz-vELqfVRp1G5mCMnui7KguXwXPuAMjJS8WxRc6WbCYLfBRi9RT-P2AguLIQ3YtJhpuNUDvI581jwL_SZAiTNlXlFaOjt1QqxLW4yS02KRMbmayZxiZ5wecje78NhBXiaIhcxwmpwRJq3BiYGYK8ih71UyyVU39XKtpAhL_qfKFSKm5PNn_Kp7FhB9VHd0X-uwZPVjSZt1" alt="avatar" className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" />
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtpBU96oUKeNh6M5J0hn8692Zjz6NWPRjIiLW-9NXoWJh2eQ2xmB_HrfTHwbPdDr52XCERE2m3-QEZSfSLnrL4-l4BHt5w7_U8E_f_rrMQV5H-Cbf5393YGOyYKWRD5xNGOkvr3bC47iIhsY4aD4Edrdi88fWcdJJozRKkPmrdHN343H3pHcLTuZ-lSCboZPqXmeuBlOYHZbx4dRMUbHSW_2lyr0CHkAouJ18sjz_ecvYBJLZLUeqJXKNhIRRKScRlTSBtJNKe3W1b" alt="avatar" className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" />
              <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-white/20 flex items-center justify-center text-[10px] font-bold">+2.4k</div>
            </div>
            <p className="text-sm text-on-primary/90 font-medium">Join 2,400+ curators currently live on the platform</p>
          </div>
        </div>

        {/* Right side: Login Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
          <div className="md:hidden flex items-center justify-center mb-8">
            <span className="material-symbols-outlined text-4xl text-primary">hub</span>
          </div>

          <h2 className="font-headline text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-on-surface-variant mb-4">Access your kinetic dashboard.</p>
          {error && <p className="text-error font-medium mb-4">{error}</p>}

          {/* Role Toggle */}
          <div className="flex bg-surface-container-low p-1 rounded-2xl mb-8">
            <button 
              onClick={() => setRole('core')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${role === 'core' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Core Member
            </button>
            <button 
              onClick={() => setRole('participant')}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${role === 'participant' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Participant
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
                <a href="#" className="flex-1 py-3 text-sm font-bold text-primary hover:underline text-right">Forgot?</a>
              </div>
              <div className="bg-surface-container-low rounded-xl px-4 py-3 flex items-center gap-3 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-white transition-colors">
                <span className="material-symbols-outlined text-outline">lock</span>
                <input required type="password" placeholder="•••••••••" className="w-full bg-transparent border-none outline-none focus:ring-0 placeholder:text-outline/60 tracking-[0.2em] text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full primary-gradient text-on-primary py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:opacity-95 transition-opacity editorial-shadow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]">
                <span>{role === 'core' ? 'Access Dashboard' : 'View My Events'}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm font-medium text-on-surface-variant">
            Don't have an account? <Link to="/signup" className="flex-1 py-3 text-sm font-bold text-primary hover:underline">Apply for early access</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
