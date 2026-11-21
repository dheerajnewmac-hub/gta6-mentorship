import numpy as np
import wave
import subprocess

def create_sfx_and_bgm(total_duration_sec=84.0, sample_rate=44100):
    t = np.linspace(0, total_duration_sec, int(sample_rate * total_duration_sec), False)
    mix = np.zeros_like(t)

    # 1. Bass Drop at 0.0s - 1.5s
    sub_mask = (t >= 0.0) & (t < 1.5)
    t_sub = t[sub_mask]
    freq = np.linspace(150, 40, len(t_sub))
    sub_wave = 0.35 * np.sin(2 * np.pi * freq * t_sub) * np.exp(-t_sub * 2.0)
    mix[sub_mask] += sub_wave

    # 2. Cash Chime at 0.8s (E6 + G#6 + B6 chord chime)
    for f in [1318.5, 1661.2, 1975.5, 2637.0]:
        chime_mask = (t >= 0.8) & (t < 2.5)
        tc = t[chime_mask] - 0.8
        mix[chime_mask] += 0.08 * np.sin(2 * np.pi * f * tc) * np.exp(-tc * 3.5)

    # 3. Transitions (Whooshes at 12.6s, 29.9s, 41.7s, 65.1s)
    transitions = [12.6, 29.9, 41.7, 65.1]
    for tr in transitions:
        tr_mask = (t >= tr) & (t < tr + 0.6)
        t_tr = t[tr_mask] - tr
        noise = np.random.uniform(-0.1, 0.1, len(t_tr))
        env = np.sin(np.pi * t_tr / 0.6) ** 2
        mix[tr_mask] += noise * env * 0.15

    # 4. Success Level-Up Chime at 60.7s ("Mentorship ke sath FREE")
    for f in [523.25, 659.25, 783.99, 1046.5]: # C5, E5, G5, C6
        ch_mask = (t >= 60.7) & (t < 62.5)
        tch = t[ch_mask] - 60.7
        mix[ch_mask] += 0.07 * np.sin(2 * np.pi * f * tch) * np.exp(-tch * 2.8)

    # 5. Urgent Ticking in Final Scene (66s to 83.5s)
    for tick_time in np.arange(66.0, 83.0, 0.5):
        tk_mask = (t >= tick_time) & (t < tick_time + 0.05)
        ttk = t[tk_mask] - tick_time
        mix[tk_mask] += 0.06 * np.sin(2 * np.pi * 1200 * ttk) * np.exp(-ttk * 60)

    # 6. Subtle Cyberpunk / Phonk Ambient Drone & Pulse (-26dB)
    # Slow pulsing 60Hz and 120Hz sub bass
    drone = 0.03 * np.sin(2 * np.pi * 55 * t) + 0.02 * np.sin(2 * np.pi * 110 * t)
    # 120 BPM subtle beat pulse (every 0.5s)
    beat_pulse = 0.025 * np.sin(2 * np.pi * 90 * (t % 0.5)) * np.exp(-(t % 0.5) * 12.0)
    mix += drone + beat_pulse

    # Normalize audio
    mix = np.clip(mix, -0.95, 0.95)
    audio_int16 = (mix * 32767).astype(np.int16)

    # Write WAV
    with wave.open("scripts/sfx_bgm.wav", "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(audio_int16.tobytes())
    print("SFX & BGM generated: scripts/sfx_bgm.wav")

if __name__ == "__main__":
    create_sfx_and_bgm()
