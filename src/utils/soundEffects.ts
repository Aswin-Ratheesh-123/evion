// Web Audio API Synthesizer for futuristic EV sound effects
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private motorOsc: OscillatorNode | null = null;
  private motorGain: GainNode | null = null;
  private isMotorRunning: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.motorGain) {
      this.motorGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.isMuted && this.motorGain) {
      this.motorGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
  }

  // Soft futuristic UI click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore if blocked
    }
  }

  // Futuristic two-tone charging station activation chime
  public playStationChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Tone 1: 587.33 Hz (D5) -> Tone 2: 880 Hz (A5) -> Tone 3: 1174.66 Hz (D6)
      const freqs = [587.33, 880, 1174.66];
      freqs.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.36);
      });
    } catch {
      // Ignore audio errors
    }
  }

  // Grand Destination reached celebration chime
  public playCelebrationChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major chord arpeggio
      chords.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.15, now + i * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.85);
      });
    } catch {
      // Ignore
    }
  }

  // Continuous subtle EV electric motor pitch based on scroll velocity
  public updateMotorSpeed(speedRatio: number) {
    if (this.isMuted || speedRatio < 0.02) {
      if (this.motorGain && this.ctx) {
        this.motorGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
      }
      return;
    }

    try {
      this.initCtx();
      if (!this.ctx) return;

      if (!this.isMotorRunning) {
        this.motorOsc = this.ctx.createOscillator();
        this.motorGain = this.ctx.createGain();

        this.motorOsc.type = 'sine';
        this.motorOsc.frequency.setValueAtTime(120, this.ctx.currentTime);
        this.motorGain.gain.setValueAtTime(0, this.ctx.currentTime);

        this.motorOsc.connect(this.motorGain);
        this.motorGain.connect(this.ctx.destination);

        this.motorOsc.start();
        this.isMotorRunning = true;
      }

      if (this.motorOsc && this.motorGain) {
        const clamped = Math.min(1, Math.max(0, speedRatio));
        const targetFreq = 120 + clamped * 380; // 120Hz to 500Hz electric hum
        const targetVolume = clamped * 0.035; // Gentle ambient level

        this.motorOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);
        this.motorGain.gain.setTargetAtTime(targetVolume, this.ctx.currentTime, 0.08);
      }
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new SoundEngine();
