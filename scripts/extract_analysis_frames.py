import os
import subprocess

videos = [f for f in os.listdir("example video") if f.endswith(".mp4")]

for idx, v in enumerate(videos):
    vpath = os.path.join("example video", v)
    for sec in [1, 5, 12, 22]:
        out_jpg = f"scripts/analysis_frames/v{idx+1}_sec{sec:02d}.jpg"
        cmd = [
            "ffmpeg", "-y", "-ss", str(sec), "-i", vpath,
            "-vframes", "1", "-q:v", "2", out_jpg
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
print("Frames extracted successfully!")
