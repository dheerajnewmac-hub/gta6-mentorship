import asyncio
import edge_tts

TEXT = """GTA 6 clipping se maine sirf 2 se 3 din ke andar, 573 dollar yaani lagbhag 48,000 rupaye kamaye hain! Aur ye raha screen par mera actual live bank proof.

Ab agar aapko nahi pata ki clipping hoti kya hai: Toh simple hai — GTA 6 streamers ki lambi streams se sabse interesting moments nikaal kar short videos banani hoti hain, bina apna face dikhaye! Aur unhe Instagram Reels, Shorts aur TikTok par upload karna hota hai.

Jab aapki uploaded clips par views aate hain, toh aap paid clipping campaigns ke through direct dollar me payout lete ho. Jitne zyada eligible views, utni moti payment direct aapke bank account me!

Ab aap soch rahe honge ki itni saari videos edit aur upload kaise karenge? Iska solution maine khud ready kiya hai! Mera banaya hua AI AutoClipper Tool, jo automatically lambi video se viral clips cut karega, unki editing karega aur sabhi platforms par auto-upload bhi kar dega. Aur ye tool main aapko Mentorship ke sath bilkul FREE de raha hoon!

Dhyan rakhna, GTA 6 is waqt internet par sabse peak trend par chal raha hai aur views ki baarish ho rahi hai. Real paisa wahi banayega jo is wave ko abhi capitalize karega! Complete roadmap aur mera AutoClipper claim karne ke liye, abhi neeche diye link par click karke website par aao!"""

async def main():
    communicate = edge_tts.Communicate(TEXT, "hi-IN-MadhurNeural", rate="+10%")
    await communicate.save("scripts/voice.mp3")
    print("Voice generated successfully: scripts/voice.mp3")

if __name__ == "__main__":
    asyncio.run(main())
