import numpy as np
import wave

def gen_sfx_54s(total_dur=54.5, sr=44100):
    t = np.linspace(0, total_dur, int(sr * total_dur), False)
    mix = np.zeros_like(t)

    # 1. Subtle warm lo-fi chords / rhythm (soft rhodes-like sine tones)
    # Chord progression: Dm9 -> G13 -> Cmaj9 -> Am7
    chords = [
        (293.66, 349.23, 440.0, 523.25), # Dm
        (196.00, 246.94, 293.66, 392.00), # G
        (261.63, 329.63, 392.00, 493.88), # C
        (220.00, 261.63, 329.63, 440.00), # Am
    ]
    chord_len = 3.5
    for i, c in enumerate(chords * 4):
        c_start = i * chord_len
        if c_start >= total_dur:
            break
        c_mask = (t >= c_start) & (t < c_start + chord_len)
        tc = t[c_mask] - c_start
        env = np.sin(np.pi * tc / chord_len) ** 0.5
        for freq in c:
            mix[c_mask] += 0.009 * np.sin(2 * np.pi * freq * tc) * env

    # Soft vinyl warmth / crackle
    noise = np.random.uniform(-0.004, 0.004, len(t))
    mix += noise

    # 2. Tactile Mouse Clicks / Keyboard Pops (at scene key moments)
    click_times = [0.2, 0.9, 12.9, 19.3, 24.2, 27.0, 35.1, 39.7, 44.4, 48.1]
    for ct in click_times:
        ck_mask = (t >= ct) & (t < ct + 0.03)
        tck = t[ck_mask] - ct
        # Crisp high-frequency snap
        mix[ck_mask] += 0.12 * np.sin(2 * np.pi * 3200 * tck) * np.exp(-tck * 300)

    # 3. Cash Register / Coin Chime at 1.0s and 20.0s
    for coin_t in [1.0, 20.0]:
        for f in [1318.5, 1661.2, 1975.5, 2637.0]:
            cm_mask = (t >= coin_t) & (t < coin_t + 1.2)
            tcm = t[cm_mask] - coin_t
            mix[cm_mask] += 0.06 * np.sin(2 * np.pi * f * tcm) * np.exp(-tcm * 4.0)

    # 4. Success Level-Up Chime at 35.2s ("Mentorship ke sath FREE")
    for f in [523.25, 659.25, 783.99, 1046.5]:
        ch_mask = (t >= 35.2) & (t < 36.8)
        tch = t[ch_mask] - 35.2
        mix[ch_mask] += 0.07 * np.sin(2 * np.pi * f * tch) * np.exp(-tch * 3.0)

    # Normalize
    mix = np.clip(mix, -0.95, 0.95)
    audio_int16 = (mix * 32767).astype(np.int16)

    with wave.open("scripts/sfx_54s.wav", "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(audio_int16.tobytes())
    print("Generated scripts/sfx_54s.wav")

if __name__ == "__main__":
    gen_sfx_54s()
