import { useState, useEffect } from 'react';
import { Compass, Sparkles, BookOpen, User, HelpCircle } from 'lucide-react';
import SpaceBackground from './components/SpaceBackground';
import MeditationAudio from './components/MeditationAudio';
import ZodiacEncyclopedia from './components/ZodiacEncyclopedia';
import HoroscopeSystem from './components/HoroscopeSystem';
import TarotReadings from './components/TarotReadings';
import AuraAssistant from './components/AuraAssistant';
import { ChatMessage } from './types';

type TabId = 'horoscope' | 'tarot' | 'assistant' | 'encyclopedia';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('horoscope');
  const [auraChatHistory, setAuraChatHistory] = useState<ChatMessage[]>([]);
  const [activeTarotContext, setActiveTarotContext] = useState<any | null>(null);

  // Initialize Aura chat with a warm mystical greeting
  useEffect(() => {
    setAuraChatHistory([
      {
        id: 'aura-greet',
        sender: 'assistant',
        text: "Greetings, seeker of light. I am Aura, your spiritual guide. What celestial currents can we trace today? Whether you wish to interpret a dream, analyze your energetic blockages, or align with your higher soul purpose, I am here to channel guidance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Intercept drawn tarot spreads to auto-populate chatbot
  const handleAskAuraTarotInterpretation = (cards: any[], query: string) => {
    setActiveTarotContext({ cards, query });
    setActiveTab('assistant');
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans pb-16 flex flex-col relative" id="applet-viewport">
      {/* Immersive space particle background */}
      <SpaceBackground />

      <header className="relative z-10 w-full border-b border-white/10 backdrop-blur-md bg-white/5" id="applet-header">
        <div className="max-w-7xl mx-auto px-6 h-24 flex flex-col md:flex-row items-center justify-between gap-4 py-4 md:py-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-400 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"/>
              </svg>
            </div>
            <div>
              <span className="text-2xl font-serif tracking-widest uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 block">
                MysticVision
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-amber-300 font-semibold uppercase block glow-gold -mt-0.5">
                SACRED GALACTIC PORTAL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block text-xs text-purple-300 font-sans font-light italic max-w-xs text-right">
              Meditative soundscapes, zodiac metrics, and AI spiritual oracle.
            </div>
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-full px-4 py-1.5 font-mono text-[10px] tracking-widest text-purple-200">
              <span className="text-amber-400 font-semibold mr-2">CELESTIAL TIME:</span>
              <span>MAY 25, 2026</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 flex-1 flex flex-col space-y-6 pt-6">
        {/* Meditation Music dock - always active on top for relaxation */}
        <MeditationAudio />

        {/* Channels Navigation Deck */}
        <div className="flex flex-wrap gap-2 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full" id="navigation-deck">
          {[
            { id: 'horoscope', label: 'Daily Horoscope', icon: Sparkles },
            { id: 'tarot', label: 'Sacred Tarot', icon: BookOpen },
            { id: 'assistant', label: 'Aura AI Assistant', icon: Compass },
            { id: 'encyclopedia', label: 'Zodiac Guide', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl md:rounded-full text-xs font-serif font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border border-purple-400/50 shadow-[0_0_20px_rgba(147,51,234,0.35)]'
                    : 'border-transparent text-purple-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active Content Zone with Transition Wraps */}
        <div className="flex-1 mt-2" id="channel-workspace-zone">
          {activeTab === 'horoscope' && <HoroscopeSystem />}
          {activeTab === 'tarot' && <TarotReadings onAskAura={handleAskAuraTarotInterpretation} />}
          {activeTab === 'assistant' && (
            <AuraAssistant 
              messages={auraChatHistory} 
              setMessages={setAuraChatHistory}
              activeTarotContext={activeTarotContext}
              clearTarotContext={() => setActiveTarotContext(null)}
            />
          )}
          {activeTab === 'encyclopedia' && <ZodiacEncyclopedia />}
        </div>
      </main>

      <footer className="text-center py-8 text-neutral-600 font-sans text-[10px] tracking-widest uppercase border-t border-violet-500/5 mt-16 max-w-7xl mx-auto w-full px-4">
        MysticVision • Crafted for the celestial soul explorer • Powered by Gemini Flash
      </footer>
    </div>
  );
}
