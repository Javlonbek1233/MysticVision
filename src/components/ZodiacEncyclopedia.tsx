import { useState } from 'react';
import { Search, Sparkles, AlertCircle, Compass, Zap } from 'lucide-react';
import { ZODIAC_SIGNS } from '../data';
import { ZodiacSign } from '../types';

export default function ZodiacEncyclopedia() {
  const [selectedElement, setSelectedElement] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSignId, setActiveSignId] = useState<string>('aries');

  // Filter signs
  const filteredSigns = ZODIAC_SIGNS.filter((sign) => {
    const matchesElement = selectedElement === 'All' || sign.element === selectedElement;
    const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sign.rulingPlanet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesElement && matchesSearch;
  });

  const activeSign = ZODIAC_SIGNS.find((s) => s.id === activeSignId) || ZODIAC_SIGNS[0];

  const getElementColorKits = (el: string) => {
    switch (el) {
      case 'Fire':
        return { bg: 'bg-red-500/10 border-red-500/30 text-red-300', badge: 'bg-red-500/20 text-red-200' };
      case 'Earth':
        return { bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300', badge: 'bg-emerald-500/20 text-emerald-200' };
      case 'Air':
        return { bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300', badge: 'bg-cyan-500/20 text-cyan-200' };
      case 'Water':
        return { bg: 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-300', badge: 'bg-fuchsia-500/20 text-fuchsia-200' };
      default:
        return { bg: 'bg-purple-500/10 border-purple-500/30 text-purple-300', badge: 'bg-purple-500/20 text-purple-200' };
    }
  };

  const activeColorKits = getElementColorKits(activeSign.element);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="zodiac-encyclopedia-root">
      
      {/* Search and Sign list */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        
        {/* Search header & Filter tags */}
        <div className="cosmic-card p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-purple-400" />
            <input
              type="text"
              placeholder="Search star sign or planet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2.5 text-xs text-white placeholder-purple-300/40 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all font-sans"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {['All', 'Fire', 'Earth', 'Air', 'Water'].map((el) => (
              <button
                key={el}
                onClick={() => setSelectedElement(el)}
                className={`px-3 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                  selectedElement === el
                    ? 'bg-purple-600/20 text-white border-purple-400/60'
                    : 'bg-white/5 text-purple-200 border-white/10 hover:border-white/20'
                }`}
              >
                {el}
              </button>
            ))}
          </div>
        </div>

        {/* List of Signs fitting filter */}
        <div className="cosmic-card p-4 flex-1 max-h-[380px] overflow-y-auto space-y-2">
          {filteredSigns.length === 0 ? (
            <div className="text-center py-8 text-xs text-purple-400/70 font-sans">
              No celestial records match your search parameters.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 animate-fade-in">
              {filteredSigns.map((sign) => {
                const isActive = sign.id === activeSignId;
                const signKit = getElementColorKits(sign.element);
                return (
                  <button
                    key={sign.id}
                    onClick={() => setActiveSignId(sign.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white/10 border-purple-400 text-white shadow-[0_0_15px_rgba(147,51,234,0.25)]'
                        : 'bg-white/5 border-white/10 text-purple-200 hover:border-white/20 hover:bg-white/8'
                    }`}
                  >
                    <span 
                      className="text-2xl font-sans"
                      style={{ color: sign.colorHex }}
                    >
                      {sign.symbol}
                    </span>
                    <div className="truncate">
                      <p className="font-serif text-xs font-semibold tracking-wider uppercase block">
                        {sign.name}
                      </p>
                      <p className="text-[9px] text-purple-400 mt-0.5 font-mono">
                        {sign.dateRange}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Sign Detailed Presentation Card */}
      <div className="lg:col-span-7">
        <div className="cosmic-card p-6 min-h-[440px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle cosmic element glyph floating in corner */}
          <div className="absolute right-6 top-6 opacity-5 pointer-events-none">
            <span className="text-9xl">{activeSign.symbol}</span>
          </div>

          <div>
            {/* Top overview header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-500/15 pb-4">
              <div className="flex items-center gap-3">
                <span 
                  className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
                  style={{ color: activeSign.colorHex }}
                >
                  {activeSign.symbol}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-widest text-violet-100">
                    {activeSign.name}
                  </h3>
                  <p className="text-xs text-amber-300 tracking-wider font-mono">
                    {activeSign.dateRange}
                  </p>
                </div>
              </div>

              {/* Element & Modality Badges */}
              <div className="flex gap-2">
                <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-mono rounded border ${activeColorKits.bg}`}>
                  {activeSign.element}
                </span>
                <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono rounded-lg border border-white/10 bg-white/5 text-purple-200">
                  {activeSign.modality}
                </span>
              </div>
            </div>

            {/* Core facts grid */}
            <div className="grid grid-cols-3 gap-4 my-5 text-center bg-white/5 rounded-2xl p-4 border border-white/10">
              <div>
                <span className="text-[9px] text-purple-300 font-mono tracking-widest uppercase block">
                  RULING PLANET
                </span>
                <span className="text-xs font-sans text-purple-100 mt-1.5 font-medium block">
                  {activeSign.rulingPlanet}
                </span>
              </div>
              <div className="border-x border-white/10">
                <span className="text-[9px] text-purple-300 font-mono tracking-widest uppercase block">
                  LUCKY GEMSTONE
                </span>
                <span className="text-xs font-sans text-amber-300 mt-1.5 font-medium block">
                  {activeSign.luckyStone}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-purple-300 font-mono tracking-widest uppercase block">
                  BEST COMPATIBILITY
                </span>
                <span className="text-xs font-sans text-purple-100 mt-1.5 font-medium block truncate px-1">
                  {activeSign.compatibility.join(', ')}
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-4">
              <p className="text-sm font-sans text-violet-200 leading-relaxed">
                {activeSign.description}
              </p>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-500/[0.03] border border-emerald-500/15 rounded-2xl p-4">
                  <span className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                    <Sparkles className="w-3.5 h-3.5" /> Strengths
                  </span>
                  <ul className="text-xs text-purple-200 mt-2 space-y-1 font-sans">
                    {activeSign.strengths.slice(0, 4).map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-emerald-400/70">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-500/[0.03] border border-red-500/15 rounded-2xl p-4 font-sans">
                  <span className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-red-400 uppercase font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" /> Shadow Side
                  </span>
                  <ul className="text-xs text-purple-200 mt-2 space-y-1">
                    {activeSign.weaknesses.slice(0, 4).map((w, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="text-red-400/70">•</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Spiritual Lesson Footnote */}
          <div className="border-t border-white/10 pt-4 mt-6 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10 animate-fade-in">
            <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-purple-300 uppercase font-semibold">
              <Compass className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} /> Sacred Spiritual Lesson
            </span>
            <p className="text-xs italic text-purple-100 mt-1 font-sans font-light leading-normal">
              "{activeSign.spiritualLesson}"
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
