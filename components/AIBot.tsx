
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const AIBot: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: 'Namaste! I am your AI Guru. Ask me anything about fitness, Indian diets, or workouts.'}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "You are 'Guru Ji', an expert Indian fitness coach and nutritionist. You provide advice tailored to the Indian context, suggesting local foods like paneer, dal, and ragi, and understanding local habits. Keep your tone encouraging, professional, and slightly traditional yet modern. Speak in English but you can use common Hindi terms like 'Beta', 'Shabash', 'Koshish'.",
        },
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Sorry, I couldn't process that. Please try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "There was an error connecting to the Guru. Please check your connection." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto h-[calc(100vh-40px)] flex flex-col">
      <header className="mb-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl">
          <i className="fas fa-user-tie"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Ask Guru Ji</h2>
          <p className="text-slate-400 text-sm">Your Personal Indian Fitness Expert</p>
        </div>
      </header>

      <div className="flex-1 glass rounded-3xl p-6 overflow-hidden flex flex-col mb-4">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                m.role === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-white/5">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="mt-4 flex gap-2">
          <input 
            type="text"
            placeholder="Type your question (e.g., 'Best high protein Indian breakfast?')"
            className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit"
            className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/20"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {["Paneer vs Chicken?", "Belly fat tips?", "Surya Namaskar steps?", "Ragi benefits?"].map(tip => (
          <button 
            key={tip}
            onClick={() => setInput(tip)}
            className="whitespace-nowrap bg-slate-800/50 hover:bg-slate-800 border border-white/5 px-4 py-2 rounded-full text-xs text-slate-400 hover:text-white transition-all"
          >
            {tip}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIBot;
