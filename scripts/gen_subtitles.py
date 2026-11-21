import asyncio
import edge_tts

TEXT = """GTA 6 clipping se maine sirf do se teen din mein, 573 dollar yaani lagbhag 48,000 rupaye kamaye hain! Aur ye raha screen par mera actual live bank proof.

Ab agar aapko nahi pata ki clipping hoti kya hai: Toh simple hai — GTA 6 streamers ki lambi streams se sabse interesting moments nikaal kar short videos banani hoti hain, bina apna face dikhaye! Aur unhe Instagram Reels, Shorts aur TikTok par upload karna hota hai.

Jab aapki clips par views aate hain, toh aap paid clipping campaigns ke through direct dollar me payout lete ho. Jitne zyada eligible views, utni moti payment direct aapke account me!

Ab aap soch rahe honge ki itni saari videos edit aur upload kaise karenge? Iska solution maine khud develop kiya hai! Mera banaya hua AI AutoClipper Tool, jo automatically long video se viral clips cut karega, unki pro editing karega aur sabhi platforms par auto-upload bhi kar dega. Aur ye tool main aapko Mentorship ke sath bilkul FREE de raha hoon!

Dhyan rakhna, GTA 6 is waqt internet par sabse peak trend par hai aur views ki baarish ho rahi hai. Real paisa wahi banayega jo is wave ko abhi capitalize karega! Complete roadmap aur mera AutoClipper claim karne ke liye, abhi neeche diye link par click karke website par aao!"""

async def main():
    submaker = edge_tts.SubMaker()
    communicate = edge_tts.Communicate(TEXT, "hi-IN-MadhurNeural", rate="+22%")
    with open("scripts/voice_fast.mp3", "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
    
    with open("scripts/voice_fast.vtt", "w", encoding="utf-8") as file:
        file.write(submaker.get_srt())
    print("VTT/SRT subtitles written to scripts/voice_fast.vtt")

if __name__ == "__main__":
    asyncio.run(main())
