import asyncio
import edge_tts

TEXT_45S = """GTA 6 clipping se maine sirf 2 se 3 din mein, 573 dollar yaani lagbhag 48,000 rupaye kamaye hain! Aur ye raha screen par mera actual live bank proof.

Lambi streams se crazy moments nikaal kar short clips banani hoti hain, bina apna face dikhaye! Aur views aate hi paid campaigns se direct dollars milte hain.

Aur editing ki tension mat lo! Mera developed AI AutoClipper Tool automatically long videos se shorts cut karta hai aur auto-upload bhi kar deta hai. Aur ye tool main aapko Mentorship ke sath bilkul FREE de raha hoon!

GTA 6 trend is waqt internet par peak par chal raha hai. Agar ye wave abhi chhod di toh bahut bada loss hoga! Roadmap aur AutoClipper lene ke liye, abhi neeche diye link par click karke website par aao!"""

async def main():
    communicate = edge_tts.Communicate(TEXT_45S, "hi-IN-MadhurNeural", rate="+16%")
    await communicate.save("scripts/voice_45s.mp3")
    print("Generated scripts/voice_45s.mp3")

if __name__ == "__main__":
    asyncio.run(main())
