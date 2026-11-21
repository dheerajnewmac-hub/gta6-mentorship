import subprocess

cmd = [
    "ffmpeg", "-y", "-i", "example video/AQPTbfC7AsXztjjWZwLpL7Klcu2jai5N-NC9TYeS7Mc14W31qLulu1D0ij1PqOB91qg51Mp4M1Yl-eyEFtFhHvrKXjjdqli2f4-tGVo.mp4",
    "-t", "10", "-vn", "-c:a", "libmp3lame", "scripts/analysis_frames/ref_audio_10s.mp3"
]
subprocess.run(cmd)
print("Extracted 10s audio")
