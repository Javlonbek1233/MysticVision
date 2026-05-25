import { useState } from 'react';
import { HelpCircle, Sparkles, Flame, Eye, Heart, Compass, Shield, ArrowRight } from 'lucide-react';
import { ZODIAC_SIGNS } from '../data';
import { DailyHoroscope } from '../types';

export default function HoroscopeSystem() {
  const [seekerName, setSeekerName] = useState<string>('');
  const [selectedSign, setSelectedSign] = useState<string>('aries');
  const [focusTopic, setFocusTopic] = useState<string>('General Wellness');
  const [horoscope, setHoroscope] = useState<DailyHoroscope | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const topics = [
    'General Destiny',
    'Love & Connection',
    'Career & Abundance',
    'Spiritual Alignment',
    'Dream Interpretation'
  ];

  const triggerSearch = async () => {
    setIsLoading(true);
    setErrorStatus(null);
    
    const signObj = ZODIAC_SIGNS.find(s => s.id === selectedSign);
    
    // Cycle beautiful loader phrases for maximum immersion
    const loaderPhrases = [
      'Attuning transits to your birth coordinate...',
      'Mapping Mercury and Venus alignments...',
      'Receiving celestial telemetry strings...',
      'Synthesizing your spiritual current...',
      'Opening the Mystic Oracle portal...'
    ];
    
    let phraseIndex = 0;
    setLoadingState(loaderPhrases[0]);
    const phraseTimer = setInterval(() => {
      phraseIndex = (phraseIndex + 1) % loaderPhrases.length;
      setLoadingState(loaderPhrases[phraseIndex]);
    }, 1800);

    try {
      const response = await fetch('/api/horoscope', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sign: signObj?.name,
          name: seekerName || 'Seeker',
          element: signObj?.element,
          topic: focusTopic
        })
      });

      if (!response.ok) {
        throw new Error('Celestial connection disrupted.');
      }

      const data = await response.json();
      setHoroscope(data);
    } catch (err: any) {
      console.error(err);
      setErrorStatus('The stars are temporarily out of range, obscured by space debris. Please retry shortly.');
    } finally {
      clearInterval(phraseTimer);
      setIsLoading(false);
    }
  };

  const currentSignObject = ZODIAC_SIGNS.find(s => s.id === selectedSign) || ZODIAC_SIGNS[0];

  return (
    <div className="space-y-6" id="horoscope-system-root">
      
      {/* Search selection block */}
      <div className="cosmic-card p-6 box-glow-purple">
        <h2 className="font-display text-xl tracking-wider text-violet-100 uppercase flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" /> Draw Your Daily Oracle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Seeker Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-widest text-violet-400 uppercase block">
              YOUR EARTH NAME
            </label>
            <input
              type="text"
              placeholder="Enter name (optional)"
              value={seekerName}
              onChange={(e) => setSeekerName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all placeholder-purple-300/35"
            />
          </div>

          {/* Sign Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-widest text-violet-400 uppercase block">
              ZODIAC SIGN
            </label>
            <select
              value={selectedSign}
              onChange={(e) => setSelectedSign(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all cursor-pointer"
            >
              {ZODIAC_SIGNS.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0a051a] text-purple-200">
                  {s.symbol} {s.name} ({s.dateRange})
                </option>
              ))}
            </select>
          </div>

          {/* Topic Selector */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono tracking-widest text-violet-400 uppercase block">
              FOCUS TRANSIT
            </label>
            <select
              value={focusTopic}
              onChange={(e) => setFocusTopic(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all cursor-pointer"
            >
              {topics.map((t) => (
                <option key={t} value={t} className="bg-[#0a051a] text-purple-200">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-5">
          <p className="text-[10px] font-sans text-purple-300 max-w-md italic">
            "Your destiny is a starry sky. We attune Mercury, Mars, and Jupiter to pinpoint specific, personalized flow codes for today."
          </p>
          <button
            onClick={triggerSearch}
            disabled={isLoading}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs tracking-widest uppercase font-bold px-6 py-3 rounded-full border border-purple-400/40 shadow-[0_0_20px_rgba(147,51,234,0.35)] cursor-pointer transition-all"
            id="align-transits-btn"
          >
            {isLoading ? 'Attuning...' : 'Align Transits'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Loading state indicator */}
      {isLoading && (
        <div className="cosmic-card p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-14 h-14 rounded-full border-2 border-violet-400/30 border-t-amber-400 animate-spin" />
          <p className="font-display font-medium tracking-widest text-sm text-violet-200 uppercase animate-pulse">
            {loadingState}
          </p>
          <p className="text-xs text-violet-400 font-sans italic">
            Connecting to Gemini Flash galactic servers...
          </p>
        </div>
      )}

      {/* Error Output */}
      {errorStatus && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg p-4 text-xs font-sans text-center">
          {errorStatus}
        </div>
      )}

      {/* Horoscope Results Display */}
      {horoscope && !isLoading && (
        <div className="space-y-6 animate-fade-in">
          {/* Overall prediction card */}
          <div className="cosmic-card p-6 border border-amber-500/20 bg-gradient-to-br from-violet-950/20 via-slate-950/40 to-amber-950/[0.04]">
            
            {/* Header branding */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-violet-500/12 pb-4 mb-4">
              <div>
                <p className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                  DAILY ORACLE • {horoscope.date}
                </p>
                <h3 className="font-display text-xl font-bold tracking-wider text-violet-100 mt-1">
                  Planetary Transit Alignment for {seekerName || 'Seeker'}
                </h3>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-2xl" style={{ color: currentSignObject.colorHex }}>
                  {currentSignObject.symbol}
                </span>
                <span className="text-xs font-display text-violet-300 tracking-widest font-semibold uppercase">
                  {horoscope.sign}
                </span>
              </div>
            </div>

            {/* Core overview */}
            <p className="text-sm font-sans text-violet-100 leading-relaxed font-light">
              {horoscope.overall}
            </p>

            {/* Scoreboard and general cosmic coefficients */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-5 mt-5 border-t border-white/10">
              
              {/* Energy meter */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
                <span className="text-[9px] font-mono text-purple-300 tracking-wider block uppercase">
                  COSMIC ENERGY LEVEL
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="text-2xl font-mono text-amber-300 font-bold">
                    {horoscope.energyLevel}%
                  </span>
                </div>
                {/* Visual gauge */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 animate-pulse"
                    style={{ width: `${horoscope.energyLevel}%` }}
                  />
                </div>
              </div>

              {/* Lucky values */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="text-[9px] font-mono text-purple-300 tracking-wider block uppercase">
                  COSMIC NUMBER
                </span>
                <p className="text-2xl font-mono text-white font-bold mt-1">
                  {horoscope.luckyNumber}
                </p>
                <p className="text-[10px] text-purple-300/80 font-sans mt-1">
                  Primary focus coefficient
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="text-[9px] font-mono text-purple-300 tracking-wider block uppercase">
                  AURA WAVELENGTH
                </span>
                <p className="text-md font-serif text-purple-200 mt-2 font-semibold tracking-wider uppercase truncate">
                  {horoscope.luckyColor}
                </p>
                <div className="h-2 w-full rounded-full border border-white/10 mt-2 bg-white/5 flex overflow-hidden">
                  <div className="h-full w-1/3 bg-indigo-500" />
                  <div className="h-full w-1/3 bg-purple-400" />
                  <div className="h-full w-1/3 bg-fuchsia-400" />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <span className="text-[9px] font-mono text-purple-300 tracking-wider block uppercase">
                  HEAVENLY FOCUS
                </span>
                <p className="text-xs font-sans text-amber-300 font-medium leading-normal mt-1 italic">
                  "{horoscope.cosmicAdvice}"
                </p>
              </div>

            </div>
          </div>

          {/* Secondary Life categories columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Love section */}
            <div className="cosmic-card p-5 border border-violet-500/10">
              <span className="flex items-center gap-1 text-[10px] font-mono tracking-widest text-violet-400 uppercase font-semibold">
                <Heart className="w-3.5 h-3.5 text-pink-400" /> Love & Relationship
              </span>
              <p className="text-xs text-violet-200 font-sans leading-relaxed mt-2.5">
                {horoscope.love || 'Connection energies show warm, grounding tides, supporting high-vibe relationships.'}
              </p>
            </div>

            {/* Career/Cash section */}
            <div className="cosmic-card p-5 border border-violet-500/10">
              <span className="flex items-center gap-1 text-[10px] font-mono tracking-widest text-violet-400 uppercase font-semibold">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Career & Abundance
              </span>
              <p className="text-xs text-violet-200 font-sans leading-relaxed mt-2.5">
                {horoscope.career || 'Abundance portals are widening. Channel Uranus revolutionary ideas to optimize creative project foundations.'}
              </p>
            </div>

            {/* Wellness section */}
            <div className="cosmic-card p-5 border border-violet-500/10">
              <span className="flex items-center gap-1 text-[10px] font-mono tracking-widest text-violet-400 uppercase font-semibold">
                <Compass className="w-3.5 h-3.5 text-cyan-400" /> Spiritual Grounding
              </span>
              <p className="text-xs text-violet-200 font-sans leading-relaxed mt-2.5">
                {horoscope.wellness || 'Aura frequencies are balanced. Guard energy and anchor boundaries of deep meditation breathing.'}
              </p>
            </div>

          </div>

          {/* Custom daily ritual block */}
          <div className="cosmic-card p-5 border border-violet-500/30 bg-violet-950/20">
            <span className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase font-semibold">
              <Eye className="w-4 h-4 text-amber-400 animate-pulse" /> Your Daily Spiritual Ritual
            </span>
            <p className="text-xs text-violet-100 font-sans leading-relaxed mt-2.5 font-light">
              {horoscope.spiritualRitual}
            </p>
          </div>
        </div>
      )}

      {/* Default placeholder state */}
      {!horoscope && !isLoading && (
        <div className="text-center py-12 border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl animate-fade-in">
          <div className="text-4xl text-purple-400/40">✨</div>
          <p className="text-xs text-purple-200 font-medium mt-3 font-sans">
            Declare your terrestrial name and align your transits to draw today's personalized horoscope!
          </p>
        </div>
      )}
    </div>
  );
}
