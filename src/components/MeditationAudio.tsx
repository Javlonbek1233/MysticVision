import { useState, useEffect } from 'react';
import { Volume2, Play, Pause, Disc, Waves, HelpCircle } from 'lucide-react';
import { ambientGenerator, MEDITATION_PRESETS, AudioPresetId } from '../utils/audio';

export default function MeditationAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePreset, setActivePreset] = useState<AudioPresetId>('528Hz');
  const [volume, setVolume] = useState(0.4);
  const [showHelper, setShowHelper] = useState(false);

  useEffect(() => {
    // Sync starting volume
    ambientGenerator.setVolume(volume);
    
    // Safely stop audio if component unmounts
    return () => {
      ambientGenerator.stop();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      ambientGenerator.stop();
      setIsPlaying(false);
    } else {
      ambientGenerator.play(activePreset, volume);
      setIsPlaying(true);
    }
  };

  const handlePresetChange = (presetId: AudioPresetId) => {
    setActivePreset(presetId);
    if (isPlaying) {
      ambientGenerator.play(presetId, volume);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    ambientGenerator.setVolume(newVol);
  };

  const selectedPreset = MEDITATION_PRESETS.find(p => p.id === activePreset);

  return (
    <div className="cosmic-card p-6 box-glow-purple relative overflow-hidden shimmer-active" id="meditation-player-card">
      <div className="flex items-center justify-between mb-4 border-b border-violet-500/15 pb-3">
        <div className="flex items-center gap-2">
          <Waves className="w-5 h-5 text-violet-400 animate-pulse" />
          <h2 className="font-display text-lg font-medium tracking-wider text-violet-100 uppercase">
            Meditation Soundwaves
          </h2>
        </div>
        <button
          onClick={() => setShowHelper(!showHelper)}
          className="text-violet-400 hover:text-violet-200 transition-colors"
          title="About Healing Frequencies"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {showHelper && (
        <div className="text-xs bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-3 mb-4 text-violet-200 leading-relaxed font-sans animate-fade-in">
          Procedurally synthesized ambient soundwaves calculated right inside your browser. Frequencies such as <strong className="text-amber-400">528Hz</strong> represent spiritual transformation, and <strong className="text-amber-400">432Hz</strong> represents the tuning of cosmic spheres. No static downloads, purely algorithmic resonance.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Large Play Indicator Panel */}
        <div className="md:col-span-5 flex flex-col items-center justify-center border-r border-white/10 pr-0 md:pr-4">
          <button
            onClick={handleTogglePlay}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
              isPlaying
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border border-purple-400/50 shadow-[0_0_30px_rgba(147,51,234,0.4)] animate-pulse'
                : 'bg-white/5 border border-white/15 hover:border-white/30 hover:bg-white/10'
            }`}
            id="play-synth-button"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white fill-white" />
            ) : (
              <Play className="w-8 h-8 text-purple-200 fill-purple-200 translate-x-0.5" />
            )}
          </button>
          
          <div className="mt-4 text-center">
            <span className="text-xs font-mono tracking-widest text-purple-300 uppercase">
              {isPlaying ? 'ACTIVE RESONANCE' : 'SYNTHESIZER STANDBY'}
            </span>
            <p className="font-sans text-sm text-white font-medium mt-1">
              {isPlaying ? selectedPreset?.name : 'Select a frequency below'}
            </p>
          </div>

          {/* Graphical Waves representation */}
          {isPlaying && (
            <div className="flex gap-1 items-center justify-center mt-3 h-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-purple-400 rounded-full animate-bounce"
                  style={{
                    height: '20%',
                    animationDuration: `${0.6 + i * 0.15}s`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Preset Selector and Tweaks */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {MEDITATION_PRESETS.map((p) => {
              const active = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePresetChange(p.id)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    active
                      ? 'bg-white/10 border border-white/20 shadow-inner'
                      : 'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8'
                  }`}
                >
                  <div className="flex items-center gap-1.5 justify-between">
                    <span className="font-display text-xs tracking-wider text-purple-200 font-semibold uppercase">
                      {p.id}
                    </span>
                    <Disc className={`w-3.5 h-3.5 ${active ? 'text-white animate-spin' : 'text-purple-600'}`} style={{ animationDuration: '6s' }} />
                  </div>
                  <p className="text-[10px] font-sans text-purple-300 mt-1 line-clamp-1 leading-tight">
                    {p.name}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected details */}
          <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
            <span className="text-[10px] font-mono text-amber-300 tracking-wider uppercase block">
              COSMIC DESCRIPTION:
            </span>
            <p className="text-[11px] font-sans text-purple-100 leading-normal mt-0.5">
              {selectedPreset?.description}
            </p>
          </div>

          {/* Volume control */}
          <div className="space-y-1 mr-2">
            <div className="flex justify-between text-xs font-mono text-purple-300">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" /> AMBIENT INTENSITY
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
