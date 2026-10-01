/**
 * 32-bit Chiptune & Synthesizer Audio Engine using Web Audio API
 */
class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private isBgmPlaying = false;
  private bgmInterval: number | null = null;
  private step = 0;

  // Minor nostalgic JRPG chord progression notes (Am -> G -> F -> E)
  private readonly bgmNotes = [
    220.00, 261.63, 329.63, 440.00, // Am
    196.00, 246.94, 293.66, 392.00, // G
    174.61, 220.00, 261.63, 349.23, // F
    164.81, 207.65, 246.94, 329.63  // E
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playTone(freq: number, type: OscillatorType = 'square', duration = 0.08, volume = 0.04): void {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playCursor(): void {
    this.playTone(520, 'square', 0.05, 0.03);
  }

  public playConfirm(): void {
    this.playTone(660, 'triangle', 0.08, 0.05);
    setTimeout(() => this.playTone(880, 'triangle', 0.12, 0.05), 60);
  }

  public playSpell(): void {
    const freqs = [350, 480, 600, 750, 920];
    freqs.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 'sine', 0.12, 0.04), i * 35);
    });
  }

  public playHit(): void {
    this.playTone(180, 'sawtooth', 0.15, 0.06);
    this.playTone(90, 'triangle', 0.2, 0.08);
  }

  public playPurify(): void {
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 'triangle', 0.18, 0.04), idx * 70);
    });
  }

  public playWarning(): void {
    this.playTone(300, 'sawtooth', 0.1, 0.05);
    setTimeout(() => this.playTone(280, 'sawtooth', 0.15, 0.05), 100);
  }

  public toggleBgm(): boolean {
    this.getContext();
    this.isBgmPlaying = !this.isBgmPlaying;

    if (this.isBgmPlaying) {
      this.startBgmLoop();
    } else {
      this.stopBgmLoop();
    }

    return this.isBgmPlaying;
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  private startBgmLoop(): void {
    if (this.bgmInterval !== null) {
      window.clearInterval(this.bgmInterval);
    }

    this.bgmInterval = window.setInterval(() => {
      if (!this.isBgmPlaying) return;
      const note = this.bgmNotes[this.step % this.bgmNotes.length];
      this.playTone(note, 'triangle', 0.25, 0.025);

      // Bass note every 4 beats
      if (this.step % 4 === 0) {
        this.playTone(note * 0.5, 'sine', 0.35, 0.04);
      }
      this.step++;
    }, 250);
  }

  private stopBgmLoop(): void {
    if (this.bgmInterval !== null) {
      window.clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const retroAudio = new RetroAudioEngine();
