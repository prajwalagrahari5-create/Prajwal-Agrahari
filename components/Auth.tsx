
import React, { useState } from 'react';

interface AuthProps {
  onLogin: (user: { name: string }) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    onLogin({ name: isLogin ? 'Alex' : name || 'Naya Sadasya' });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#020617]">
      {/* Background Decorative Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="glass w-full max-w-md rounded-[2.5rem] p-8 md:p-12 relative z-10 shadow-2xl border border-white/10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
            <i className="fas fa-heart-pulse text-white text-3xl"></i>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            FIT HAI <span className="text-orange-400">INDIAN</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            {isLogin ? 'Swagat Hai! Log in to continue' : 'Join the fitness revolution'}
          </p>
        </div>

        <div className="flex bg-slate-900/50 p-1.5 rounded-2xl mb-8 border border-white/5">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              isLogin ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              !isLogin ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Poora Naam</label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">Forgot Password?</a>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-extrabold rounded-2xl transition-all shadow-xl shadow-orange-500/20 active:scale-[0.98] mt-4"
          >
            {isLogin ? 'Chalo, Login Karein' : 'Create My Account'}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/5"></div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Or Continue With</p>
          <div className="flex-1 h-px bg-white/5"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <i className="fab fa-google text-rose-500"></i>
            <span className="text-sm font-bold text-white">Google</span>
          </button>
          <button className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 transition-colors">
            <i className="fab fa-apple text-white"></i>
            <span className="text-sm font-bold text-white">Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
