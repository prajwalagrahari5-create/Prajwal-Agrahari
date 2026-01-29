
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import WorkoutPlanner from './components/WorkoutPlanner';
import LiveCoach from './components/LiveCoach';
import ProgressTracker from './components/ProgressTracker';
import AIBot from './components/AIBot';
import Auth from './components/Auth';
import { AppView } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const handleLogin = (userData: { name: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.WORKOUT_PLANNER:
        return <WorkoutPlanner />;
      case AppView.LIVE_COACH:
        return <LiveCoach />;
      case AppView.PROGRESS:
        return <ProgressTracker />;
      case AppView.AI_BOT:
        return <AIBot />;
      case AppView.MEAL_PLANNER:
        return (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-utensils text-4xl text-emerald-500"></i>
            </div>
            <h2 className="text-3xl font-bold text-white">Indian Meal Planner</h2>
            <p className="text-slate-400 mt-4 max-w-lg mx-auto">
              Our nutritionists are busy mapping out the perfect calorie-balanced dal and paneer recipes for you.
            </p>
            <div className="mt-8 relative group max-w-2xl">
               <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" className="rounded-3xl shadow-2xl opacity-60 group-hover:opacity-80 transition-opacity" alt="Healthy Food" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-xl">Aane Wala Hai</span>
               </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setCurrentView} 
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 ml-20 md:ml-64 h-screen overflow-y-auto relative bg-[#020617]">
        {/* Background Decorative Elements */}
        <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="relative z-10 pb-20">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
