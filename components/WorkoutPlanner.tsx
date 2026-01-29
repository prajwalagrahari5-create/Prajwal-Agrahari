
import React, { useState } from 'react';
import { generateWorkoutPlan } from '../services/geminiService';
import { WorkoutPlan } from '../types';

const WorkoutPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [formData, setFormData] = useState({
    goal: 'Muscle Gain',
    level: 'Beginner',
    focus: 'Full Body'
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateWorkoutPlan(formData.goal, formData.level, formData.focus);
      setPlan(result);
    } catch (error) {
      console.error(error);
      alert('Failed to generate plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="text-center">
        <h2 className="text-4xl font-extrabold text-white">AI Workout Architect</h2>
        <p className="text-slate-400 mt-2">Precision routines engineered specifically for your genetics and goals.</p>
      </header>

      <form onSubmit={handleGenerate} className="glass p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">Fitness Goal</label>
          <select 
            className="w-full bg-slate-800 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            value={formData.goal}
            onChange={(e) => setFormData({...formData, goal: e.target.value})}
          >
            <option>Weight Loss</option>
            <option>Muscle Gain</option>
            <option>Endurance</option>
            <option>Flexibility</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">Current Level</label>
          <select 
            className="w-full bg-slate-800 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            value={formData.level}
            onChange={(e) => setFormData({...formData, level: e.target.value})}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-300 mb-2">Primary Focus</label>
          <select 
            className="w-full bg-slate-800 border-none rounded-xl p-3 text-white focus:ring-2 focus:ring-sky-500 outline-none"
            value={formData.focus}
            onChange={(e) => setFormData({...formData, focus: e.target.value})}
          >
            <option>Full Body</option>
            <option>Upper Body</option>
            <option>Lower Body</option>
            <option>Core</option>
          </select>
        </div>
        <div className="md:col-span-3">
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-xl shadow-sky-500/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-circle-notch fa-spin"></i> Analyzing biomechanics...
              </span>
            ) : 'Construct My Blueprint'}
          </button>
        </div>
      </form>

      {plan && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          <div className="glass p-8 rounded-3xl border-l-4 border-sky-500">
            <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
            <div className="flex gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1"><i className="fas fa-layer-group text-sky-500"></i> {plan.difficulty}</span>
              <span className="flex items-center gap-1"><i className="fas fa-calendar text-sky-500"></i> {plan.duration}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plan.exercises.map((ex, i) => (
              <div key={i} className="glass p-6 rounded-3xl hover:bg-slate-800/40 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-bold text-lg text-white">{ex.name}</h4>
                  <div className="px-3 py-1 bg-sky-500/10 text-sky-400 text-xs font-bold rounded-lg">
                    {ex.sets} × {ex.reps}
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{ex.instruction}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
