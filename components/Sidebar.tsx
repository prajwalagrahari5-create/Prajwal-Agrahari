
import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  user: { name: string } | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, user, onLogout }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: AppView.WORKOUT_PLANNER, icon: 'fa-dumbbell', label: 'Workouts' },
    { id: AppView.MEAL_PLANNER, icon: 'fa-utensils', label: 'Desi Meals' },
    { id: AppView.AI_BOT, icon: 'fa-comment-dots', label: 'Ask Guru' },
    { id: AppView.LIVE_COACH, icon: 'fa-microphone', label: 'Live Coach' },
    { id: AppView.PROGRESS, icon: 'fa-line-chart', label: 'Progress' },
  ];

  return (
    <aside className="w-20 md:w-64 glass h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 z-50 border-r border-white/5">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
          <i className="fas fa-heart-pulse text-white text-xl"></i>
        </div>
        <h1 className="hidden md:block font-extrabold text-lg tracking-tight text-white leading-none">
          FIT HAI<br /><span className="text-orange-400">INDIAN</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group ${
              currentView === item.id 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} text-lg w-6`}></i>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-4">
        {user && (
          <div className="hidden md:flex items-center gap-3 p-3 bg-slate-900/50 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs text-slate-400 font-bold uppercase truncate">Member</p>
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
            </div>
          </div>
        )}

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
        >
          <i className="fas fa-sign-out-alt text-lg w-6"></i>
          <span className="hidden md:block font-medium">Logout</span>
        </button>

        <div className="hidden md:block glass p-4 rounded-2xl">
          <p className="text-xs text-slate-400 mb-2">Jai Hind! Upgrade</p>
          <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-emerald-500 rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform">
            Go Pro
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
