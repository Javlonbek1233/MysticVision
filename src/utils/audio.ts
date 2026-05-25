export type AudioPresetId = '528Hz' | '432Hz' | 'temple' | 'starlight';

export interface MeditationPreset {
  id: AudioPresetId;
  name: string;
  description: string;
  frequency: number;
  type: 'sine' | 'triangle' | 'custom';
}

export const MEDITATION_PRESETS: MeditationPreset[] = [
  {
    id: '528Hz',
    name: '528Hz Solfeggio Tone',
    description: 'The ancient frequency of transformation, mental clarity, and cellular restoration.',
    frequency: 528,
    type: 'sine'
  },
  {
    id: '432Hz',
    name: '432Hz Cosmic Hum',
    description: 'Tuned to the natural vibratory beat of the universe, perfect for deep grounding and sleep.',
    frequency: 432,
    type: 'triangle'
  },
  {
    id: 'temple',
    name: 'Zen Tibetan Bowl',
    description: 'Algorithmic bronze singing bowls bowl bowing with periodic warm resonant metallic chimes.',
    frequency: 220,
    type: 'custom'
  },
  {
    id: 'starlight',
    name: 'Starlight Ambient Pad',
    description: 'Choral waves that ebb and flow like distant nebulae, ideal for aura cleansing.',
    frequency: 165,
    type: 'custom'
  }
];

class CosmicSynth {
  private ctx: AudioContext | null = null;
  private mainGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private currentPreset: AudioPresetId | null = null;
  private chimeTimer: NodeJS.Timeout | null = null;
  private isSynthesizing: boolean = false;

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.mainGain && this.ctx) {
      this.mainGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isSynthesizing;
  }

  public stop() {
    this.isSynthesizing = false;
    if (this.chimeTimer) {
      clearInterval(this.chimeTimer);
      this.chimeTimer = null;
    }
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {}
    });
    this.oscillators = [];

    if (this.lfo) {
      try {
        this.lfo.stop();
      } catch (e) {}
      this.lfo = null;
    }

    if (this.mainGain) {
      this.mainGain.disconnect();
      this.mainGain = null;
    }

    if (this.filter) {
      this.filter.disconnect();
      this.filter = null;
    }
  }

  public play(presetId: AudioPresetId, volumeValue: number = 0.5) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.isSynthesizing = true;
    this.currentPreset = presetId;

    // Create Main gain & Resonant Low-pass filter
    this.mainGain = this.ctx.createGain();
    this.mainGain.gain.setValueAtTime(0, this.ctx.currentTime);
    
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // Audio Route: Oscs -> Filter -> MainGain -> Destination
    this.filter.connect(this.mainGain);
    this.mainGain.connect(this.ctx.destination);

    const preset = MEDITATION_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    const baseFreq = preset.frequency;

    if (presetId === '528Hz' || presetId === '432Hz') {
      // Create rich drone by combining fundamental with slightly detuned harmonics
      const type = preset.type;
      
      const osc1 = this.ctx.createOscillator();
      osc1.type = type;
      osc1.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc1.connect(this.filter);
      
      const osc2 = this.ctx.createOscillator();
      osc2.type = type;
      osc2.frequency.setValueAtTime(baseFreq * 0.5, this.ctx.currentTime); // Sub-octave
      osc2.connect(this.filter);

      const osc3 = this.ctx.createOscillator();
      osc3.type = type;
      osc3.frequency.setValueAtTime(baseFreq * 1.5, this.ctx.currentTime); // Perfect fifth fifth
      osc3.connect(this.filter);

      osc1.start();
      osc2.start();
      osc3.start();

      this.oscillators.push(osc1, osc2, osc3);

      // Add low frequency oscillator (LFO) to filter frequency for breathing effect
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow 12 second wave
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(150, this.ctx.currentTime); // Sweep index

      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);
      
      this.lfo.start();
    } 
    else if (presetId === 'temple') {
      // Singing bowl bowel: deep metal pad with random metallic chimes
      const oscSub = this.ctx.createOscillator();
      oscSub.type = 'sine';
      oscSub.frequency.setValueAtTime(110, this.ctx.currentTime);
      oscSub.connect(this.filter);

      const oscFund = this.ctx.createOscillator();
      oscFund.type = 'triangle';
      oscFund.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      oscFund.connect(this.filter);

      const oscOvertone1 = this.ctx.createOscillator();
      oscOvertone1.type = 'sine';
      oscOvertone1.frequency.setValueAtTime(baseFreq * 2.82, this.ctx.currentTime); // Non-harmonic metal partial
      oscOvertone1.connect(this.filter);

      const oscOvertone2 = this.ctx.createOscillator();
      oscOvertone2.type = 'sine';
      oscOvertone2.frequency.setValueAtTime(baseFreq * 4.67, this.ctx.currentTime); // Secondary metal partial
      oscOvertone2.connect(this.filter);

      oscSub.start();
      oscFund.start();
      oscOvertone1.start();
      oscOvertone2.start();

      this.oscillators.push(oscSub, oscFund, oscOvertone1, oscOvertone2);

      // Schedule periodic bowl chimes
      this.triggerBowlChime();
      this.chimeTimer = setInterval(() => {
        if (this.isSynthesizing) {
          this.triggerBowlChime();
        }
      }, 8000); // strike bowl every 8 seconds
    }
    else if (presetId === 'starlight') {
      // Cosmic chorus choir: ethereal layered sound
      const oscs = [1, 1.25, 1.5, 1.875, 2];
      oscs.forEach((ratio, index) => {
        if (!this.ctx || !this.filter) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(baseFreq * ratio, this.ctx.currentTime);
        
        // Slightly detune detune
        const detuneNode = this.ctx.createOscillator();
        detuneNode.frequency.setValueAtTime(0.1 + (index * 0.05), this.ctx.currentTime);
        const detuneGain = this.ctx.createGain();
        detuneGain.gain.setValueAtTime(4, this.ctx.currentTime);
        
        detuneNode.connect(detuneGain);
        detuneGain.connect(osc.frequency);
        
        osc.connect(this.filter);
        osc.start();
        detuneNode.start();
        
        this.oscillators.push(osc, detuneNode);
      });

      // Shifting filter
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.05, this.ctx.currentTime);
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(200, this.ctx.currentTime);
      
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filter.frequency);
      this.lfo.start();
    }

    // Fade in
    this.mainGain.gain.linearRampToValueAtTime(volumeValue, this.ctx.currentTime + 3.0);
  }

  private triggerBowlChime() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Create a temporary group of bell sine wave generators
    const chimeGain = this.ctx.createGain();
    chimeGain.gain.setValueAtTime(0, now);
    chimeGain.gain.linearRampToValueAtTime(0.15, now + 0.05); // sharp strike
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 6.0); // slow bell decay

    // High frequency beautiful metallic partials of bronze
    const freqPartials = [329.63, 440.00, 523.25, 659.25, 880.00, 1174.66];
    freqPartials.forEach(f => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      osc.connect(chimeGain);
      osc.start(now);
      // Stop/discard after decay
      osc.stop(now + 6.5);
    });

    const reverbGain = this.ctx.createGain();
    reverbGain.gain.setValueAtTime(0.4, now);
    
    chimeGain.connect(this.ctx.destination);
  }
}

export const ambientGenerator = new CosmicSynth();
