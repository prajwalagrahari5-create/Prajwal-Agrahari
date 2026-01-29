
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', weight: 82.5, kcal: 2100 },
  { name: 'Tue', weight: 82.1, kcal: 2450 },
  { name: 'Wed', weight: 81.9, kcal: 1900 },
  { name: 'Thu', weight: 82.0, kcal: 2300 },
  { name: 'Fri', weight: 81.6, kcal: 2800 },
  { name: 'Sat', weight: 81.4, kcal: 3100 },
  { name: 'Sun', weight: 81.2, kcal: 2200 },
];

const ProgressTracker: React.FC = () => {
  return (
    <div className="p-6 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Progress Analytics</h2>
        <p className="text-slate-400">Tracking your evolution over time.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6">Weight Trend (kg)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#38bdf8' }}
                />
                <Line type="monotone" dataKey="weight" stroke="#38bdf8" strokeWidth={3} dot={{ fill: '#38bdf8', r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-6">Calorie Burn</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorKcal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="kcal" stroke="#818cf8" fillOpacity={1} fill="url(#colorKcal)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass p-8 rounded-3xl">
        <h3 className="text-xl font-bold text-white mb-6">Milestones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-800/50 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-trophy text-2xl"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-white">7 Day Streak</p>
              <p className="text-xs text-slate-400">Completed yesterday</p>
            </div>
          </div>
          <div className="p-6 bg-slate-800/50 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-500/20 text-sky-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-medal text-2xl"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-white">100km Run</p>
              <p className="text-xs text-slate-400">Lifetime achievement</p>
            </div>
          </div>
          <div className="p-6 bg-slate-800/50 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center">
              <i className="fas fa-star text-2xl"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Ideal Weight</p>
              <p className="text-xs text-slate-400">Reached goal weight!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
