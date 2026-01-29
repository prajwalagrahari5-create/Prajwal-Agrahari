
import React, { useState, useRef, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { encodeBase64, decodeBase64, decodeAudioData } from '../services/geminiService';

const LiveCoach: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Standby');
  const [transcript, setTranscript] = useState<string[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);

  const startSession = async () => {
    try {
      setStatus('Connecting...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('Active');
            setIsActive(true);
            
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encodeBase64(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: any) => {
            if (message.serverContent?.outputTranscription) {
              setTranscript(prev => [...prev.slice(-4), `Coach: ${message.serverContent.outputTranscription.text}`]);
            }
            
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const buffer = await decodeAudioData(decodeBase64(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Session error:', e);
            setStatus('Error');
          },
          onclose: () => {
            setStatus('Closed');
            setIsActive(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          systemInstruction: "You are Aura, a motivating and elite athletic coach. Keep responses punchy, encouraging, and focused on form and discipline. You can't see the user unless they send frames, so ask them what they are doing if you are unsure.",
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          }
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('Failed to Start');
    }
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
    }
    setIsActive(false);
    setStatus('Standby');
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="relative">
          <div className={`absolute -inset-8 rounded-full blur-3xl transition-all duration-1000 ${isActive ? 'bg-sky-500/40 animate-pulse' : 'bg-slate-800/20'}`}></div>
          <div className={`w-48 h-48 rounded-full glass flex items-center justify-center relative z-10 border-4 transition-colors duration-500 ${isActive ? 'border-sky-500' : 'border-slate-700'}`}>
            <i className={`fas fa-microphone text-6xl ${isActive ? 'text-sky-500' : 'text-slate-600'}`}></i>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Live AI Coach</h2>
          <p className={`font-medium ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>{status}</p>
        </div>

        <div className="w-full glass p-6 rounded-3xl h-48 overflow-y-auto space-y-2">
          {transcript.length === 0 ? (
            <p className="text-slate-500 text-center italic mt-12">Waiting for interaction...</p>
          ) : (
            transcript.map((line, i) => (
              <p key={i} className="text-slate-300 text-sm">{line}</p>
            ))
          )}
        </div>

        <button
          onClick={isActive ? stopSession : startSession}
          className={`px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95 ${
            isActive 
              ? 'bg-rose-500 text-white shadow-rose-500/20' 
              : 'bg-sky-500 text-white shadow-sky-500/20'
          }`}
        >
          {isActive ? 'End Session' : 'Start Live Training'}
        </button>
      </div>
    </div>
  );
};

export default LiveCoach;
