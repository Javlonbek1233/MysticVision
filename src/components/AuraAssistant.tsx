import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, HelpCircle, Flame, Moon, Compass, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '../types';

interface AuraAssistantProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  activeTarotContext: any | null;
  clearTarotContext: () => void;
}

export default function AuraAssistant({ 
  messages, 
  setMessages, 
  activeTarotContext, 
  clearTarotContext 
}: AuraAssistantProps) {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Suggested prompt templates
  const presets = [
    { label: "Understand heavy energy", text: "Lately my energy feels heavy and blocked. Can you help me trace the roots of this blockage and suggest a cleansing ritual?" },
    { label: "Decode a dream", text: "I keep dreaming about flying over turbulent oceans. What spiritual and subconscious codes might this dream contain?" },
    { label: "Align with my purpose", text: "How can I align my daily career actions with my higher soul contract and authentic purpose?" },
    { label: "Request an affirmation", text: "Could you channel a powerful daily cosmic affirmation for my emotional protection?" }
  ];

  // Auto Scroll Chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle auto-tarot triggers on component mount
  useEffect(() => {
    if (activeTarotContext) {
      const { cards, query } = activeTarotContext;
      const formattedSpread = cards.map((c: any) => 
        `- "${c.card.name}" (${c.isReversed ? 'REVERSED: indicating internal, silent blockage or inward energy' : 'UPRIGHT: indicating public or direct flow'}) in position "${c.position}"`
      ).join('\n');

      const customPrompt = `Greetings Aura. I have drawn a sacred Tarot spread for my question: "${query}".\n\nHere are my cards:\n${formattedSpread}\n\nPlease analyze this spread's karmic energy, obstacles, and guide me on my question.`;
      
      // Inject dummy user message first and run
      handleTarotInquiry(customPrompt);
      clearTarotContext(); // Consumed
    }
  }, [activeTarotContext]);

  const handleTarotInquiry = async (prompt: string) => {
    const userMsg: ChatMessage = {
      id: `tarot-user-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setIsLoading(true);

    try {
      const response = await fetch('/api/spiritual-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated,
          tarotContext: activeTarotContext?.cards || null
        })
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      const auraMsg: ChatMessage = {
        id: `tarot-aura-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, auraMsg]);
    } catch (e) {
      injectError();
    } finally {
      setIsLoading(false);
    }
  };

  const injectError = () => {
    const errorMsg: ChatMessage = {
      id: `error-${Date.now()}`,
      sender: 'assistant',
      text: "The cosmic ether is clouded of space magnetic storms. I've temporarily lost connection to the higher spheres. Please repeat your query, seeker.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, errorMsg]);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userInput = inputText;
    setInputText('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const response = await fetch('/api/spiritual-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory })
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      const auraMsg: ChatMessage = {
        id: `aura-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, auraMsg]);
    } catch (err) {
      injectError();
    } finally {
      setIsLoading(false);
    }
  };

  // Select quick question template
  const handlePresetClick = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="aura-assistant-root">
      
      {/* Interactive Floating Orb / Aura Guide Column */}
      <div className="lg:col-span-4 flex flex-col justify-center items-center text-center p-6 cosmic-card bg-purple-900/10">
        
        {/* Pulsing Visual Orb */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Ethereal glowing circles */}
          <div className="absolute inset-0 bg-purple-600/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute inset-4 bg-indigo-500/25 rounded-full blur-xl animate-bounce" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-8 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full box-glow-purple border border-white/20 animate-spin" style={{ animationDuration: '10s' }} />
          
          <div className="absolute inset-10 bg-slate-950 rounded-full flex flex-col justify-center items-center font-serif text-sm tracking-widest text-[#f3e8ff] font-bold">
            AURA
            <span className="text-[7px] text-amber-300 font-mono tracking-wider block mt-0.5 animate-pulse">
              {isLoading ? 'CHANNELING' : 'LISTENING'}
            </span>
          </div>
        </div>

        <div className="mt-6 font-sans">
          <h3 className="font-serif text-lg font-bold text-violet-100 tracking-widest uppercase">
            Aura, Spiritual Guide
          </h3>
          <p className="text-xs text-purple-200 mt-2 leading-relaxed max-w-sm">
            "Welcome, seeker. I stand between the physical and starlight matrices, ready to unpack Tarot outcomes, reading cosmic charts, or translating dream symbols. Speak freely."
          </p>
        </div>

        {/* Dynamic oracle helpers */}
        <div className="mt-6 text-left w-full space-y-2 border-t border-white/10 pt-4 font-sans">
          <p className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">
            Suggested Spiritual Inquiry:
          </p>
          <div className="flex flex-col gap-1.5 pt-1">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(p.text)}
                className="text-[11px] text-purple-200 text-left px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Structured scrolling chat portal Column */}
      <div className="lg:col-span-8 flex flex-col cosmic-card p-4 min-h-[500px]">
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 p-2 max-h-[440px] border-b border-white/10 mb-4 font-sans">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${isUser ? 'ml-auto items-end' : 'mr-auto items-start'}`}
              >
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-purple-600/20 text-white border border-white/10 rounded-tr-none'
                      : 'bg-white/5 text-purple-100 border border-white/10 rounded-tl-none font-light'
                  }`}
                >
                  {/* Clean formatting of paragraphs for markdown results */}
                  {msg.text.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className={pIdx > 0 ? 'mt-2' : ''}>
                      {paragraph.split('\n').map((line, lIdx) => (
                        <span key={lIdx} className="block">
                          {line.startsWith('- ') || line.startsWith('* ') ? (
                            <span className="pl-3 block relative">
                              <span className="absolute left-0 text-amber-400">•</span>
                              {line.substring(2)}
                            </span>
                          ) : (
                            line
                          )}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
                <span className="text-[9px] font-mono text-purple-400 mt-1 uppercase">
                  {isUser ? 'Seeker' : 'Aura Oracle'} • {msg.timestamp}
                </span>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex flex-col mr-auto items-start max-w-[85%] animate-pulse">
              <div className="bg-white/5 text-purple-200 border border-white/10 p-4 rounded-2xl rounded-tl-none text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                  Aura is channeling wisdom from the stars...
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input area Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2 font-sans items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "Oral transmissions in progress..." : "Ask the stars..."}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-xs text-white placeholder-purple-300/40 focus:outline-none focus:bg-white/10 focus:border-purple-400 disabled:opacity-50 transition-all font-sans"
            id="aura-chat-input"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white cursor-pointer transition-all flex items-center justify-center border border-white/10 shrink-0"
            id="aura-chat-send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
