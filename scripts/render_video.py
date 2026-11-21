import sys
import os
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1080, 1920
FPS = 24
TOTAL_DURATION = 83.5
TOTAL_FRAMES = int(FPS * TOTAL_DURATION)

def get_font(size, bold=True):
    try:
        font_path = "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

# Pre-load fonts
FONT_PILL = get_font(28, bold=True)
FONT_HL_BIG = get_font(68, bold=True)
FONT_HL_MED = get_font(52, bold=True)
FONT_SUB = get_font(36, bold=True)
FONT_BODY = get_font(32, bold=True)
FONT_CAPTION = get_font(36, bold=True)
FONT_CTA = get_font(46, bold=True)

# Pre-load and prepare proof images
IMG_SBI = Image.open("public/proofs/sbi_transfer_42k.png").convert("RGBA")
IMG_R61 = Image.open("public/proofs/content_rewards_61.jpg").convert("RGBA")
IMG_R45 = Image.open("public/proofs/content_rewards_45.jpg").convert("RGBA")

def draw_pill(draw, text, y=130, color_border=(225, 29, 72), color_bg=(35, 12, 38), color_txt=(255, 60, 110)):
    bbox = FONT_PILL.getbbox(text)
    pw = bbox[2] - bbox[0] + 50
    ph = 58
    px = (WIDTH - pw) // 2
    draw.rounded_rectangle([px, y, px + pw, y + ph], radius=29, fill=color_bg, outline=color_border, width=3)
    draw.text((px + 25, y + 12), text, fill=color_txt, font=FONT_PILL)

def draw_subtitle_box(draw, text):
    if not text:
        return
    bbox = FONT_CAPTION.getbbox(text)
    bw = min(WIDTH - 80, bbox[2] - bbox[0] + 60)
    bh = 80
    bx = (WIDTH - bw) // 2
    by = HEIGHT - 180
    # Semi-transparent dark pill for subtitles
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=20, fill=(10, 5, 20), outline=(245, 158, 11), width=3)
    draw.text(((WIDTH - (bbox[2] - bbox[0])) // 2, by + 18), text, fill=(255, 255, 255), font=FONT_CAPTION)

def render_frame(frame_idx):
    t = frame_idx / FPS
    img = Image.new("RGBA", (WIDTH, HEIGHT), (12, 8, 22, 255))
    draw = ImageDraw.Draw(img)

    # 1. Background gradient with subtle animated neon blurs
    # Top magenta ambient glow
    gx1 = int(WIDTH * 0.5 + 80 * math.sin(t * 0.8))
    gy1 = int(400 + 40 * math.cos(t * 0.6))
    draw.ellipse([gx1 - 380, gy1 - 250, gx1 + 380, gy1 + 250], fill=(45, 10, 35, 120))
    # Bottom cyan ambient glow
    gx2 = int(WIDTH * 0.5 - 90 * math.cos(t * 0.7))
    gy2 = int(1400 + 50 * math.sin(t * 0.5))
    draw.ellipse([gx2 - 350, gy2 - 240, gx2 + 350, gy2 + 240], fill=(10, 30, 48, 110))

    # SCENE 1: 0.0s - 12.7s (Live Proof & Hook)
    if t < 12.7:
        draw_pill(draw, "⚡ 3-DAY EARNING PROOF • GTA 6 CLIPPING", y=130)
        
        # Big Headline
        hl = "₹42,282.27 INR"
        bbox = FONT_HL_BIG.getbbox(hl)
        draw.text(((WIDTH - (bbox[2] - bbox[0])) // 2, 220), hl, fill=(16, 235, 140), font=FONT_HL_BIG)

        sub = "($573 IN JUST 2-3 DAYS)"
        bbox_sub = FONT_SUB.getbbox(sub)
        draw.text(((WIDTH - (bbox_sub[2] - bbox_sub[0])) // 2, 315), sub, fill=(255, 255, 255), font=FONT_SUB)

        # SBI Screenshot card with slow subtle zoom (Ken burns)
        zoom = 1.0 + 0.04 * (t / 12.7)
        sw, sh = IMG_SBI.size
        tw = int(940 * zoom)
        th = int(sh * (tw / sw))
        sbi_scaled = IMG_SBI.resize((tw, th), Image.Resampling.LANCZOS)
        cx = (WIDTH - tw) // 2
        cy = 440
        # Card glow
        draw.rounded_rectangle([cx - 14, cy - 14, cx + tw + 14, cy + th + 14], radius=24, fill=(18, 12, 28), outline=(6, 182, 212), width=4)
        img.paste(sbi_scaled, (cx, cy), sbi_scaled)

        # Trust Badges Below
        badges = [
            ("✅ 100% Real Bank Deposit", (16, 235, 140)),
            ("⚡ GTA 6 Streams Clipping", (244, 63, 94)),
            ("🎭 Bina Face Dikhaye", (6, 182, 212))
        ]
        by_start = cy + th + 60
        for i, (btext, bcolor) in enumerate(badges):
            b_box = FONT_BODY.getbbox(btext)
            bw = b_box[2] - b_box[0] + 50
            bx = (WIDTH - bw) // 2
            by = by_start + i * 85
            draw.rounded_rectangle([bx, by, bx + bw, by + 65], radius=18, fill=(22, 16, 36), outline=bcolor, width=3)
            draw.text((bx + 25, by + 14), btext, fill=(255, 255, 255), font=FONT_BODY)

        # Subtitles
        if t < 9.0:
            draw_subtitle_box(draw, "GTA 6 clipping se maine 2-3 din mein $573 (₹48,000) kamaye!")
        else:
            draw_subtitle_box(draw, "Aur ye raha screen par mera actual live bank proof.")

    # SCENE 2: 12.7s - 30.0s (What is Clipping & How it works)
    elif t < 30.0:
        draw_pill(draw, "WHAT IS CLIPPING? • 4-STEP BLUEPRINT", y=130, color_border=(6, 182, 212), color_bg=(10, 25, 45), color_txt=(34, 211, 238))
        
        hl = "LONG STREAM ➡️ VIRAL SHORT"
        bbox = FONT_HL_MED.getbbox(hl)
        draw.text(((WIDTH - (bbox[2] - bbox[0])) // 2, 220), hl, fill=(255, 255, 255), font=FONT_HL_MED)

        # Diagram Card 1: Long Stream
        c1_w, c1_h = 920, 260
        c1_x, c1_y = (WIDTH - c1_w) // 2, 330
        draw.rounded_rectangle([c1_x, c1_y, c1_x + c1_w, c1_y + c1_h], radius=24, fill=(20, 15, 34), outline=(120, 110, 150), width=2)
        draw.text((c1_x + 40, c1_y + 35), "📹 STEP 1: LONG GAMING STREAMS", fill=(160, 175, 200), font=FONT_SUB)
        draw.text((c1_x + 40, c1_y + 100), "GTA 6 streamers ke 3-4 ghante ke streams", fill=(255, 255, 255), font=FONT_BODY)
        draw.text((c1_x + 40, c1_y + 160), "jisme best funny & crazy moments hote hain.", fill=(180, 180, 195), font=FONT_BODY)

        # Animated Down Arrow
        arrow_y = 630 + int(10 * math.sin(t * 6.0))
        draw.text(((WIDTH - 60) // 2, arrow_y), "⬇️", font=get_font(52))

        # Diagram Card 2: Short Viral Video
        c2_w, c2_h = 920, 320
        c2_x, c2_y = (WIDTH - c2_w) // 2, 730
        draw.rounded_rectangle([c2_x, c2_y, c2_x + c2_w, c2_y + c2_h], radius=24, fill=(28, 14, 40), outline=(225, 29, 72), width=3)
        draw.text((c2_x + 40, c2_y + 35), "🔥 STEP 2: 30-SEC VIRAL CLIPS", fill=(244, 63, 94), font=FONT_SUB)
        draw.text((c2_x + 40, c2_y + 105), "Instagram Reels • YouTube Shorts • TikTok", fill=(255, 255, 255), font=FONT_BODY)
        draw.text((c2_x + 40, c2_y + 175), "Millions me views aate hain = Big Payouts!", fill=(16, 235, 140), font=FONT_BODY)
        draw.text((c2_x + 40, c2_y + 240), "✔ No Face Required • Phone Se Possible", fill=(34, 211, 238), font=FONT_BODY)

        # Subtitles
        if t < 24.6:
            draw_subtitle_box(draw, "Long video se crazy moments nikaal kar short banani hoti hain!")
        else:
            draw_subtitle_box(draw, "Instagram Reels, Shorts aur TikTok par upload karke views aate hain.")

    # SCENE 3: 30.0s - 41.7s (Campaign Earnings & Content Rewards Proofs)
    elif t < 41.7:
        draw_pill(draw, "CAMPAIGN EARNINGS • DAILY DOLLARS", y=130, color_border=(16, 235, 140), color_bg=(10, 35, 25), color_txt=(52, 211, 153))
        
        hl = "ELIGIBLE VIEWS = DIRECT CASH"
        bbox = FONT_HL_MED.getbbox(hl)
        draw.text(((WIDTH - (bbox[2] - bbox[0])) // 2, 220), hl, fill=(255, 255, 255), font=FONT_HL_MED)

        # Show Both Content Rewards Screenshots Side-by-Side
        rw1, rh1 = IMG_R61.size
        target_h = 750
        target_w1 = int(rw1 * (target_h / rh1))
        r61_scaled = IMG_R61.resize((target_w1, target_h), Image.Resampling.LANCZOS)

        rw2, rh2 = IMG_R45.size
        target_w2 = int(rw2 * (target_h / rh2))
        r45_scaled = IMG_R45.resize((target_w2, target_h), Image.Resampling.LANCZOS)

        total_w = target_w1 + target_w2 + 30
        start_x = (WIDTH - total_w) // 2
        card_y = 330

        # Draw borders and paste
        draw.rounded_rectangle([start_x - 8, card_y - 8, start_x + target_w1 + 8, card_y + target_h + 8], radius=16, fill=(15, 20, 30), outline=(225, 29, 72), width=3)
        img.paste(r61_scaled, (start_x, card_y), r61_scaled)

        x2 = start_x + target_w1 + 30
        draw.rounded_rectangle([x2 - 8, card_y - 8, x2 + target_w2 + 8, card_y + target_h + 8], radius=16, fill=(15, 20, 30), outline=(6, 182, 212), width=3)
        img.paste(r45_scaled, (x2, card_y), r45_scaled)

        # Highlight Badges Below
        draw.rounded_rectangle([100, 1130, WIDTH - 100, 1260], radius=20, fill=(20, 35, 28), outline=(16, 235, 140), width=3)
        draw.text((140, 1150), "💰 $573.90 Total Accumulated Across Campaigns", fill=(16, 235, 140), font=FONT_SUB)
        draw.text((140, 1205), "Direct Payouts: $467 + $61.43 + $45.26 Live", fill=(255, 255, 255), font=FONT_BODY)

        # Subtitles
        if t < 36.8:
            draw_subtitle_box(draw, "Views aate hi paid clipping campaigns se direct dollar payout milta hai.")
        else:
            draw_subtitle_box(draw, "Jitne zyada eligible views, utni moti payment direct bank account me!")

    # SCENE 4: 41.7s - 65.1s (AutoClipper & Auto-Uploader Mentorship Tool)
    elif t < 65.1:
        draw_pill(draw, "THE SECRET WEAPON • 100% AUTOMATED", y=130, color_border=(234, 179, 8), color_bg=(35, 28, 10), color_txt=(250, 204, 21))
        
        hl = "AI AUTOCLIPPER & AUTO-UPLOADER"
        bbox = FONT_HL_MED.getbbox(hl)
        draw.text(((WIDTH - (bbox[2] - bbox[0])) // 2, 220), hl, fill=(255, 255, 255), font=FONT_HL_MED)

        # Feature Box
        fb_w, fb_h = 920, 520
        fb_x, fb_y = (WIDTH - fb_w) // 2, 320
        draw.rounded_rectangle([fb_x, fb_y, fb_x + fb_w, fb_y + fb_h], radius=24, fill=(18, 14, 30), outline=(147, 51, 234), width=3)
        
        draw.text((fb_x + 40, fb_y + 40), "⚡ 1-CLICK AUTOCLIPPER FEATURES", fill=(192, 132, 252), font=FONT_SUB)
        draw.text((fb_x + 40, fb_y + 115), "1. Long Video URL Paste Karo 🔗", fill=(255, 255, 255), font=FONT_BODY)
        draw.text((fb_x + 40, fb_y + 185), "2. AI Apne Aap Viral Clips Cut Karta Hai 🤖", fill=(255, 255, 255), font=FONT_BODY)
        draw.text((fb_x + 40, fb_y + 255), "3. Auto-Subtitles & Dynamic Cropping 🎬", fill=(255, 255, 255), font=FONT_BODY)
        draw.text((fb_x + 40, fb_y + 325), "4. Instagram, YT & TikTok Auto-Upload 🚀", fill=(255, 255, 255), font=FONT_BODY)
        draw.text((fb_x + 40, fb_y + 415), "✔ Manual Kaam 90% Khatam!", fill=(16, 235, 140), font=FONT_BODY)

        # Huge Golden Callout Card
        call_w, call_h = 920, 220
        call_x, call_y = (WIDTH - call_w) // 2, 880
        draw.rounded_rectangle([call_x, call_y, call_x + call_w, call_y + call_h], radius=24, fill=(38, 22, 12), outline=(245, 158, 11), width=4)
        draw.text((call_x + 50, call_y + 35), "🎁 100% FREE IN MENTORSHIP", fill=(250, 204, 21), font=FONT_HL_MED)
        draw.text((call_x + 50, call_y + 125), "AutoClipper + Auto-Uploader Included Free!", fill=(255, 255, 255), font=FONT_SUB)

        # Subtitles
        if t < 49.9:
            draw_subtitle_box(draw, "Itni videos edit aur upload kaise karenge? Iska solution ready hai!")
        elif t < 60.7:
            draw_subtitle_box(draw, "Mera AI AutoClipper Tool videos cut aur auto-upload karega.")
        else:
            draw_subtitle_box(draw, "Aur ye tool main aapko Mentorship ke sath bilkul FREE de raha hoon!")

    # SCENE 5: 65.1s - 83.5s (Peak Trend Urgency & Ruthless CTA)
    else:
        draw_pill(draw, "⚠️ GTA 6 TREND IS AT PEAK RIGHT NOW", y=130, color_border=(239, 68, 68), color_bg=(45, 12, 15), color_txt=(248, 113, 113))
        
        hl = "DON'T MISS THIS OPPORTUNITY"
        bbox = FONT_HL_MED.getbbox(hl)
        draw.text(((WIDTH - (bbox[2] - bbox[0])) // 2, 220), hl, fill=(255, 255, 255), font=FONT_HL_MED)

        # Mentorship Perks Summary Card
        mb_w, mb_h = 920, 480
        mb_x, mb_y = (WIDTH - mb_w) // 2, 320
        draw.rounded_rectangle([mb_x, mb_y, mb_x + mb_w, mb_y + mb_h], radius=24, fill=(20, 12, 28), outline=(225, 29, 72), width=3)
        draw.text((mb_x + 40, mb_y + 35), "🚀 COMPLETE MENTORSHIP BUNDLE", fill=(244, 63, 94), font=FONT_SUB)
        draw.text((mb_x + 40, mb_y + 110), "✔ 5-Module Step-by-Step Training", fill=(255, 255, 255), font=FONT_BODY)
        draw.text((mb_x + 40, mb_y + 175), "✔ Free AI AutoClipper Software Access", fill=(250, 204, 21), font=FONT_BODY)
        draw.text((mb_x + 40, mb_y + 240), "✔ Multi-Platform Auto-Upload Automation", fill=(250, 204, 21), font=FONT_BODY)
        draw.text((mb_x + 40, mb_y + 305), "✔ High-Paying Campaigns Discovery List", fill=(16, 235, 140), font=FONT_BODY)
        draw.text((mb_x + 40, mb_y + 370), "✔ 30-Day 100% Action-Backed Guarantee", fill=(34, 211, 238), font=FONT_BODY)

        # Urgent Flashing Countdown Box
        pulse = 0.5 + 0.5 * math.sin(t * 8.0)
        flash_color = (int(220 + 35 * pulse), 30, 60)
        cb_w, cb_h = 920, 140
        cb_x, cb_y = (WIDTH - cb_w) // 2, 840
        draw.rounded_rectangle([cb_x, cb_y, cb_x + cb_w, cb_y + cb_h], radius=20, fill=(35, 10, 18), outline=flash_color, width=4)
        draw.text((cb_x + 50, cb_y + 25), "⏰ BATCH CLOSING SOON • 9 SLOTS LEFT", fill=(255, 255, 255), font=FONT_SUB)
        draw.text((cb_x + 50, cb_y + 75), "Flat 65% OFF Discount Live Today Only!", fill=(250, 204, 21), font=FONT_BODY)

        # Giant Pulsing CTA Button
        cta_w, cta_h = 920, 150
        cta_x, cta_y = (WIDTH - cta_w) // 2, 1030
        draw.rounded_rectangle([cta_x, cta_y, cta_x + cta_w, cta_y + cta_h], radius=28, fill=(225, 29, 72), outline=(255, 255, 255), width=4)
        draw.text((cta_x + 110, cta_y + 45), "👉 CLICK LINK BELOW TO JOIN 🚀", fill=(255, 255, 255), font=FONT_CTA)

        # Downward Arrow indicators
        arrow_offset = int(15 * math.sin(t * 10.0))
        draw.text(((WIDTH - 200) // 2, 1220 + arrow_offset), "⬇️  ⬇️  ⬇️", font=get_font(60))

        # Subtitles
        if t < 72.4:
            draw_subtitle_box(draw, "GTA 6 is waqt internet par peak trend par hai aur views ki baarish ho rahi hai.")
        elif t < 76.8:
            draw_subtitle_box(draw, "Real paisa wahi banayega jo is wave ko abhi capitalize karega!")
        else:
            draw_subtitle_box(draw, "Roadmap aur AutoClipper lene ke liye abhi neeche diye link par click karo!")

    # Return raw RGB bytes
    return img.convert("RGB").tobytes()

def main():
    out_video = "public/gta6_clipping_ad_9_16.mp4"
    audio_path = "scripts/final_audio.aac"

    cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-r", str(FPS),
        "-i", "-",  # stdin
        "-i", audio_path,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "22",
        "-pix_fmt", "yuv420p",
        "-c:a", "copy",
        "-shortest",
        out_video
    ]

    print(f"Starting render of {TOTAL_FRAMES} frames ({TOTAL_DURATION}s @ {FPS}fps)...")
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)

    for i in range(TOTAL_FRAMES):
        frame_bytes = render_frame(i)
        proc.stdin.write(frame_bytes)
        if i % 120 == 0:
            print(f"Progress: {i}/{TOTAL_FRAMES} frames ({(i/TOTAL_FRAMES)*100:.1f}%)")

    proc.stdin.close()
    stderr = proc.stderr.read().decode("utf-8", errors="ignore")
    proc.wait()

    if proc.returncode == 0:
        print(f"SUCCESS! Video created at: {out_video}")
    else:
        print(f"FFmpeg error: {stderr}")

if __name__ == "__main__":
    main()
