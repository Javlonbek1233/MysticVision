import { useState } from 'react';
import { HelpCircle, RefreshCw, Sparkles, BookOpen, ChevronRight, Eye, Undo2 } from 'lucide-react';
import { TAROT_DECK } from '../data';
import { TarotCard } from '../types';

interface DrawnCardInstance {
  card: TarotCard;
  isReversed: boolean;
  position: string;
}

interface TarotReadingsProps {
  onAskAura: (drawn: DrawnCardInstance[], query: string) => void;
}

export default function TarotReadings({ onAskAura }: TarotReadingsProps) {
  const [spreadType, setSpreadType] = useState<'single' | 'three' | 'five'>('three');
  const [inquiryText, setInquiryText] = useState<string>('');
  const [deck, setDeck] = useState<TarotCard[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCardInstance[]>([]);
  const [hasCasted, setHasCasted] = useState<boolean>(false);
  const [deckPositions, setDeckPositions] = useState<string[]>([]);
  const [showDeckHelper, setShowDeckHelper] = useState<boolean>(false);

  const spreadsConfig = {
    single: {
      name: 'Single Card Guidance',
      desc: 'Draw a single card to receive a clear daily oracle or answer to a quick question.',
      positions: ['Daily Guidance'],
    },
    three: {
      name: 'The Destiny Triad',
      desc: 'A three-card spread tracing the flow of time: Past Foundations, Current Forces, and Future Alignments.',
      positions: ['Past Foundations', 'Present Forces', 'Future Alignments'],
    },
    five: {
      name: 'The Spiritual Pentagram Cross',
      desc: 'The sacred cross pattern probing deep influences: Roots, Past, Present, Future, and Higher Aspirations.',
      positions: ['Root Foundations', 'Past Influences', 'Present Reality', 'Immediate Future', 'Higher Aspirations'],
    },
  };

  const currentPositions = spreadsConfig[spreadType].positions;

  // Initialize a randomized shuffling sequence
  const startCasting = () => {
    if (!inquiryText.trim()) {
      alert("Please state your query or topic of inquiry for the cards first, seeker.");
      return;
    }
    
    // Shuffle the major arcana cards
    const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setDrawnCards([]);
    setDeckPositions(currentPositions);
    setHasCasted(true);
  };

  const drawCardAt = (positionName: string, index: number) => {
    // Check if card is already drawn for this position
    if (drawnCards.some(d => d.position === positionName)) return;

    // Get the next card in shuffled deck
    const nextCardIdx = drawnCards.length;
    if (nextCardIdx >= deck.length) return;

    const drawnCard = deck[nextCardIdx];
    const isReversed = Math.random() > 0.5; // 50% chance of reversal

    const instance: DrawnCardInstance = {
      card: drawnCard,
      isReversed,
      position: positionName,
    };

    setDrawnCards(prev => [...prev, instance]);
  };

  const handleReset = () => {
    setHasCasted(false);
    setDrawnCards([]);
    setInquiryText('');
  };

  return (
    <div className="space-y-6" id="tarot-board-root">
      
      {/* Configuration Form */}
      {!hasCasted ? (
        <div className="cosmic-card p-6 box-glow-purple">
          <div className="flex items-center justify-between border-b border-violet-500/15 pb-3 mb-4">
            <h2 className="font-display text-xl tracking-wider text-violet-100 uppercase flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-400" /> Sacred Tarot Board
            </h2>
            <button
              onClick={() => setShowDeckHelper(!showDeckHelper)}
              className="text-violet-400 hover:text-violet-200 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {showDeckHelper && (
            <div className="text-xs bg-white/5 border border-white/10 rounded-xl p-3 mb-4 text-purple-200 leading-relaxed font-sans">
              The Tarot is a cosmic mirror reflecting the coordinates of your subconscious mind. Think deeply on your question, select a layout, and cast the cards. A drawn card may face <strong>Reversed</strong>, indicating blocked portals, inverted potential, or internal reflection.
            </div>
          )}

          <div className="space-y-4 font-sans">
            {/* Question Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono tracking-widest text-violet-400 uppercase block">
                WHAT DO YOU SEEK TO REVEAL?
              </label>
              <input
                type="text"
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="e.g., Will my current creative venture flourish? What energy shapes my relationships?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/30 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all"
                id="tarot-question-input"
              />
            </div>

            {/* Layout selector */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[10px] font-mono tracking-widest text-violet-400 uppercase block">
                CHOOSE CHANNELS LAYOUT
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(Object.keys(spreadsConfig) as Array<keyof typeof spreadsConfig>).map((type) => {
                  const conf = spreadsConfig[type];
                  const isActive = spreadType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setSpreadType(type)}
                      className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-tr from-purple-900/40 to-indigo-900/40 border-purple-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.25)]'
                          : 'bg-white/5 border-white/10 text-purple-200 hover:border-white/20 hover:bg-white/8'
                      }`}
                    >
                      <h4 className="text-xs font-serif font-bold uppercase tracking-wider block">
                        {conf.name}
                      </h4>
                      <p className="text-[10px] text-purple-300 mt-1 leading-normal font-sans">
                        {conf.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={startCasting}
                className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs tracking-widest uppercase font-bold px-6 py-3 rounded-full border border-purple-400/40 shadow-[0_0_20px_rgba(147,51,234,0.35)] cursor-pointer transition-all"
                id="tarot-shuffle-btn"
              >
                Inquire of the Cosmos <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Casting phase board */
        <div className="space-y-6">
          {/* Casting Board Header controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-violet-500/10 pb-3 font-sans">
            <div>
              <p className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">
                ACTIVE TAROT READING
              </p>
              <p className="text-xs text-violet-200 mt-0.5 max-w-xl italic">
                Inquiry: "{inquiryText}"
              </p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-mono tracking-wider border border-red-500/20 bg-red-950/10 hover:border-red-500/40 text-red-400 uppercase rounded transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" /> Gather Cards
            </button>
          </div>

          {/* Cards Table Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
            {deckPositions.map((position, idx) => {
              const matchedDraw = drawnCards.find(d => d.position === position);
              const cardDrawnIndex = drawnCards.indexOf(matchedDraw as DrawnCardInstance);
              const isFirstClickable = drawnCards.length === idx;
              
              return (
                <div 
                  key={position} 
                  className="flex flex-col items-center space-y-3"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {/* Position title badge */}
                  <div className="text-center">
                    <span className="text-[9px] font-mono text-violet-400 tracking-wider uppercase block">
                      POSITION {idx + 1}
                    </span>
                    <span className="text-xs font-display text-amber-300 font-semibold uppercase tracking-wider block mt-0.5">
                      {position}
                    </span>
                  </div>

                  {/* HTML Card Container with Flip Perspective */}
                  <div className="w-[150px] h-[230px] perspective-1000 relative">
                    {matchedDraw ? (
                      /* Drawn Reveal State */
                      <div className="w-full h-full duration-500 transform-style-preserve-3d relative">
                        <div className="absolute inset-0 cosmic-card p-3 flex flex-col justify-between items-center text-center border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.12)]">
                          
                          {/* Reversal Badge */}
                          <span className="text-[9px] font-mono uppercase bg-amber-500/10 px-1.5 py-0.5 text-amber-300 rounded border border-amber-500/20">
                            {matchedDraw.isReversed ? 'Reversed ↺' : 'Upright ☉'}
                          </span>

                          <div className={`my-2 flex flex-col items-center ${matchedDraw.isReversed ? 'rotate-180 duration-500' : ''}`}>
                            {/* Symbolic cosmic art piece */}
                            <div className="w-11 h-11 rounded-full border border-violet-500/20 bg-violet-950/40 flex items-center justify-center text-xl text-violet-300">
                              ⚛
                            </div>
                            <p className="font-display text-xs font-bold text-violet-200 tracking-wider uppercase mt-2">
                              {matchedDraw.card.name}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-[9px] font-mono text-violet-400 uppercase tracking-widest block">
                              Arcana {matchedDraw.card.number}
                            </p>
                            <span className="text-[10px] text-violet-300 leading-tight block line-clamp-2">
                              {matchedDraw.isReversed ? matchedDraw.card.reversedMeaning : matchedDraw.card.uprightMeaning}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Face-down draws card option */
                      <button
                        onClick={() => drawCardAt(position, idx)}
                        disabled={!isFirstClickable && drawnCards.length < idx}
                        className={`w-full h-full rounded-2xl border border-dashed text-center flex flex-col justify-center items-center p-4 transition-all duration-300 cursor-pointer ${
                          isFirstClickable
                            ? 'bg-white/10 border-purple-400/80 hover:border-white hover:bg-white/15 shadow-[0_0_20px_rgba(168,85,247,0.15)] animate-pulse'
                            : 'bg-white/[0.02] border-white/5 text-purple-900/40 cursor-not-allowed'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-purple-300 text-lg mb-2">
                          ✦
                        </div>
                        <p className="text-[10px] font-mono text-white tracking-widest uppercase">
                          {isFirstClickable ? 'TAP TO DRAW' : 'LOCKED'}
                        </p>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core analysis trigger details once spread matches */}
          {drawnCards.length === deckPositions.length && (
            <div className="cosmic-card p-6 border border-amber-500/30 bg-gradient-to-r from-purple-950/20 to-amber-950/10 text-center max-w-2xl mx-auto space-y-4 animate-fade-in">
              <div className="flex justify-center text-4xl">🔮</div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wider text-purple-100 uppercase">
                  Cast Completed, Seeker
                </h3>
                <p className="text-xs text-purple-200 font-sans mt-1">
                  Your cards have aligned to your question. You can now request the AI spiritual guide, Aura, to perform a deep, personalized psychological and karmic reading of this layout.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onAskAura(drawnCards, inquiryText)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white text-xs tracking-widest uppercase font-bold px-6 py-3.5 rounded-full border border-amber-400/40 shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all cursor-pointer"
                  id="seek-aura-tarot-interpretation-btn"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" /> Seek Aura's Interpretation
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
