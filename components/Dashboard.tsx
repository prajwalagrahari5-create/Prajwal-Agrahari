
import React from 'react';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Today\'s Steps', value: '8,432', trend: '+12%', icon: 'fa-shoe-prints', color: 'text-orange-500' },
    { label: 'Burned Calories', value: '450', trend: '+5%', icon: 'fa-fire', color: 'text-rose-500' },
    { label: 'Water Intake', value: '2.4L', trend: '+8%', icon: 'fa-tint', color: 'text-sky-500' },
    { label: 'Daily Goal', value: '84%', trend: '+3%', icon: 'fa-bullseye', color: 'text-emerald-500' },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Shabash, Alex!</h2>
          <p className="text-slate-400">Your "Fit Hai Indian" journey is looking great today.</p>
        </div>
        <div className="flex -space-x-3 overflow-hidden">
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1548690312-e3b507d17a4d?w=100&h=100&fit=crop" alt="User" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900" src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop" alt="User" />
          <div className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold">+12</div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-3xl group hover:border-orange-500/50 transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-800/50 ${stat.color}`}>
                <i className={`fas ${stat.icon} text-xl`}></i>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-3xl p-8 overflow-hidden relative min-h-[300px]">
          <div className="absolute top-0 right-0 h-full w-1/3 opacity-40 pointer-events-none hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80" 
              className="h-full w-full object-cover grayscale brightness-50 contrast-125" 
              alt="Athlete" 
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-6">Today's Desi Power Routine</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop" className="rounded-2xl w-full md:w-64 object-cover h-40 shadow-2xl transition-transform group-hover:scale-105" alt="Yoga" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl flex items-end p-4">
                  <span className="text-white font-bold text-sm">Surya Namaskar Series</span>
                </div>
              </div>
              <div className="flex-1">
                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider">Morning Ritual</span>
                <h4 className="text-2xl font-bold mt-2">Pranayama & Flow</h4>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-md">Start your day with spiritual energy and physical strength. A mix of ancient yoga and modern functional movement.</p>
                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center gap-2 text-sm">
                    <i className="far fa-clock text-orange-500"></i>
                    <span>30 Mins</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <i className="fas fa-burn text-rose-500"></i>
                    <span>280 kcal</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-8 w-full md:w-auto px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-orange-50 transition-colors shadow-lg">
              Chalo Shuru Karein
            </button>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 flex flex-col justify-between border-t-4 border-emerald-500">
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Desi Diet Tracker</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
                  <i className="fas fa-bowl-rice"></i>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Lunch (Dal Tadka + Roti)</p>
                  <p className="text-slate-400 text-xs">Logged 1 PM • 420 kcal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500">
                  <i className="fas fa-apple-whole"></i>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Snack (Mixed Nuts)</p>
                  <p className="text-slate-400 text-xs">Logged 4 PM • 150 kcal</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 p-4 bg-slate-800/40 rounded-2xl border border-white/5">
             <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Guru Tip</p>
             <p className="text-sm text-slate-200 italic">"Drink warm water with lemon first thing in the morning for better digestion, beta."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
