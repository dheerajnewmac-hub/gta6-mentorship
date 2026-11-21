import sys
import os
import math
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH, HEIGHT = 1080, 1920
FPS = 24
TOTAL_DURATION = 54.14
TOTAL_FRAMES = int(FPS * TOTAL_DURATION)

def get_font(size, bold=True, serif=False):
    try:
        if serif:
            font_path = "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf"
        else:
            font_path = "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

# Preloaded Fonts
FONT_TITLE_SANS = get_font(42, bold=True)
FONT_TITLE_SERIF = get_font(50, bold=True, serif=True)
FONT_URL = get_font(22, bold=False)
FONT_CARD_TITLE = get_font(26, bold=True)
FONT_CARD_HL = get_font(46, bold=True)
FONT_CARD_BODY = get_font(30, bold=True)
FONT_CARD_SUB = get_font(24, bold=True)
FONT_CAPTION = get_font(38, bold=True)
FONT_CTA = get_font(36, bold=True)
FONT_COIN = get_font(28, bold=True)

# Images
IMG_SBI = Image.open("public/proofs/sbi_transfer_42k.png").convert("RGBA")
IMG_R61 = Image.open("public/proofs/content_rewards_61.jpg").convert("RGBA")
IMG_R45 = Image.open("public/proofs/content_rewards_45.jpg").convert("RGBA")

def draw_figma_box(draw, x1, y1, x2, y2, color=(224, 86, 45), handle_size=10):
    draw.rectangle([x1, y1, x2, y2], outline=color, width=3)
    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2
    pts = [
        (x1, y1), (cx, y1), (x2, y1),
        (x1, cy),           (x2, cy),
        (x1, y2), (cx, y2), (x2, y2)
    ]
    hs = handle_size // 2
    for px, py in pts:
        draw.rectangle([px - hs, py - hs, px + hs, py + hs], fill=(255, 255, 255), outline=color, width=2)

def draw_top_headline(draw, t1, t_box, t3, base_y=160):
    b1 = FONT_TITLE_SANS.getbbox(t1) if t1 else [0, 0, 0, 0]
    b2 = FONT_TITLE_SERIF.getbbox(t_box)
    b3 = FONT_TITLE_SANS.getbbox(t3) if t3 else [0, 0, 0, 0]

    w1 = b1[2] - b1[0] if t1 else 0
    w2 = b2[2] - b2[0] + 36
    w3 = b3[2] - b3[0] if t3 else 0

    total_w = w1 + w2 + w3 + (15 if t1 else 0) + (15 if t3 else 0)
    start_x = (WIDTH - total_w) // 2

    cur_x = start_x
    if t1:
        draw.text((cur_x, base_y + 8), t1, fill=(28, 25, 23), font=FONT_TITLE_SANS)
        cur_x += w1 + 15

    bx1 = cur_x
    by1 = base_y - 6
    bx2 = bx1 + w2
    by2 = by1 + 68
    draw_figma_box(draw, bx1, by1, bx2, by2)
    draw.text((bx1 + 18, base_y), t_box, fill=(224, 86, 45), font=FONT_TITLE_SERIF)
    cur_x = bx2 + 15

    if t3:
        draw.text((cur_x, base_y + 8), t3, fill=(28, 25, 23), font=FONT_TITLE_SANS)

def draw_corner_decorations(draw):
    col = (235, 140, 115, 120)
    draw.ellipse([WIDTH - 120, -50, WIDTH + 90, 160], fill=col)
    draw.ellipse([WIDTH - 70, -90, WIDTH + 140, 120], fill=(245, 165, 140, 100))
    draw.ellipse([-80, HEIGHT - 180, 120, HEIGHT + 20], fill=col)
    draw.ellipse([-50, HEIGHT - 140, 150, HEIGHT + 60], fill=(245, 165, 140, 100))

def draw_floating_coin(draw, cx, cy, r=32):
    # 3D Gold Coin with rim and dollar sign
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(217, 119, 6), outline=(180, 83, 9), width=2)
    draw.ellipse([cx - r + 4, cy - r + 4, cx + r - 4, cy + r - 4], fill=(245, 158, 11), outline=(251, 191, 36), width=2)
    # $ text
    cb = FONT_COIN.getbbox("$")
    cw = cb[2] - cb[0]
    ch = cb[3] - cb[1]
    draw.text((cx - cw // 2, cy - ch // 2 - 2), "$", fill=(255, 255, 255), font=FONT_COIN)

def draw_kinetic_subtitle(draw, text, highlight_word, y=1560):
    if not text:
        return
    words = text.split()
    total_w = 0
    word_boxes = []
    for w in words:
        wb = FONT_CAPTION.getbbox(w)
        ww = wb[2] - wb[0]
        word_boxes.append((w, ww))
        total_w += ww + 16
    total_w -= 16

    if total_w > WIDTH - 120:
        half = len(words) // 2
        line1 = " ".join(words[:half])
        line2 = " ".join(words[half:])
        draw_kinetic_subtitle(draw, line1, highlight_word, y=y - 30)
        draw_kinetic_subtitle(draw, line2, highlight_word, y=y + 35)
        return

    start_x = (WIDTH - total_w) // 2
    cur_x = start_x
    for w, ww in word_boxes:
        is_hl = (highlight_word and highlight_word.lower() in w.lower())
        if is_hl:
            draw.rounded_rectangle([cur_x - 8, y - 6, cur_x + ww + 8, y + 46], radius=10, fill=(190, 242, 100))
            draw.text((cur_x, y), w, fill=(15, 23, 42), font=FONT_CAPTION)
        else:
            draw.text((cur_x, y), w, fill=(28, 25, 23), font=FONT_CAPTION)
        cur_x += ww + 16

def draw_mac_window_shell(img, card_w=920, card_h=1060, card_x=80, card_y=300, url_text="gta6-clipping - verify"):
    draw = ImageDraw.Draw(img)
    shadow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.rounded_rectangle([card_x, card_y + 24, card_x + card_w, card_y + card_h + 24], radius=36, fill=(0, 0, 0, 28))
    shadow = shadow.filter(ImageFilter.GaussianBlur(28))
    img = Image.alpha_composite(img, shadow)
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=36, fill=(255, 255, 255), outline=(230, 228, 224), width=2)

    dot_y = card_y + 36
    draw.ellipse([card_x + 40, dot_y - 8, card_x + 56, dot_y + 8], fill=(255, 95, 86))
    draw.ellipse([card_x + 68, dot_y - 8, card_x + 84, dot_y + 8], fill=(255, 189, 46))
    draw.ellipse([card_x + 96, dot_y - 8, card_x + 112, dot_y + 8], fill=(39, 201, 63))

    ub = FONT_URL.getbbox(url_text)
    uw = ub[2] - ub[0] + 40
    ux = card_x + (card_w - uw) // 2
    draw.rounded_rectangle([ux, dot_y - 14, ux + uw, dot_y + 14], radius=14, fill=(243, 244, 246))
    draw.text((ux + 20, dot_y - 12), url_text, fill=(107, 114, 128), font=FONT_URL)

    draw.rounded_rectangle([card_x + card_w - 180, dot_y - 16, card_x + card_w - 40, dot_y + 16], radius=12, fill=(254, 243, 199), outline=(245, 158, 11), width=1)
    draw.text((card_x + card_w - 165, dot_y - 11), "100% VERIFIED", fill=(180, 83, 9), font=get_font(18, bold=True))

    return img, draw

def render_frame(frame_idx):
    t = frame_idx / FPS
    img = Image.new("RGBA", (WIDTH, HEIGHT), (249, 248, 246, 255))
    draw = ImageDraw.Draw(img)

    grid_col = (235, 232, 226)
    for x in range(0, WIDTH, 60):
        draw.line([(x, 0), (x, HEIGHT)], fill=grid_col, width=1)
    for y in range(0, HEIGHT, 60):
        draw.line([(0, y), (WIDTH, y)], fill=grid_col, width=1)

    draw_corner_decorations(draw)

    # Floating 3D Gold Coins (Subtle animation)
    coin_bob1 = int(12 * math.sin(t * 3.0))
    coin_bob2 = int(10 * math.cos(t * 2.5))
    draw_floating_coin(draw, 70, 270 + coin_bob1, r=28)
    draw_floating_coin(draw, WIDTH - 75, 310 + coin_bob2, r=32)
    draw_floating_coin(draw, 65, 1420 + coin_bob2, r=26)
    draw_floating_coin(draw, WIDTH - 80, 1380 + coin_bob1, r=30)

    card_w, card_h = 920, 1080
    card_x, card_y = (WIDTH - card_w) // 2, 290

    # SCENE 1: 0.0s - 12.97s (Hook & SBI Real Transfer)
    if t < 12.97:
        draw_top_headline(draw, "GTA 6 clipping se", "$573", "kamaye")
        img, draw = draw_mac_window_shell(img, card_w, card_h, card_x, card_y, url_text="sbi - transfer - proof")

        sbi = IMG_SBI
        sw, sh = sbi.size
        tw = 840
        th = int(sh * (tw / sw))
        sbi_scaled = sbi.resize((tw, th), Image.Resampling.LANCZOS)
        img.paste(sbi_scaled, (card_x + 40, card_y + 90), sbi_scaled)

        m_y = card_y + 90 + th + 30
        draw.rounded_rectangle([card_x + 40, m_y, card_x + card_w - 40, m_y + 170], radius=24, fill=(240, 253, 244), outline=(187, 247, 208), width=2)
        draw.text((card_x + 70, m_y + 25), "VERIFIED STATE BANK OF INDIA DEPOSIT", fill=(21, 128, 61), font=FONT_CARD_TITLE)
        draw.text((card_x + 70, m_y + 70), "₹42,282.27 INR", fill=(22, 163, 74), font=FONT_CARD_HL)
        draw.text((card_x + 70, m_y + 130), "+$467.21 Invoice Payment Received", fill=(71, 85, 105), font=FONT_CARD_SUB)

        f_y = m_y + 200
        features = [
            ("• 2-3 Din Me Bank Received", (224, 86, 45)),
            ("• Zero Face Required", (16, 185, 129)),
            ("• Mobile Phone Ready", (37, 99, 235))
        ]
        for idx, (ftext, fcol) in enumerate(features):
            fy_box = f_y + idx * 75
            draw.rounded_rectangle([card_x + 40, fy_box, card_x + card_w - 40, fy_box + 60], radius=16, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
            draw.text((card_x + 70, fy_box + 15), ftext, fill=fcol, font=FONT_CARD_BODY)

        if t < 9.14:
            draw_kinetic_subtitle(draw, "GTA 6 clipping se sirf 2-3 din mein $573 kamaye!", "$573")
        else:
            draw_kinetic_subtitle(draw, "Aur ye raha screen par mera actual live bank proof.", "live")

    # SCENE 2: 12.97s - 19.32s (What is Clipping?)
    elif t < 19.32:
        draw_top_headline(draw, "Long streams se", "VIRAL", "clips banao")
        img, draw = draw_mac_window_shell(img, card_w, card_h, card_x, card_y, url_text="clipping - blueprint")

        c1_y = card_y + 90
        draw.rounded_rectangle([card_x + 40, c1_y, card_x + card_w - 40, c1_y + 240], radius=24, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
        draw.text((card_x + 70, c1_y + 30), "STEP 01: LONG GAMING STREAMS", fill=(100, 116, 139), font=FONT_CARD_TITLE)
        draw.text((card_x + 70, c1_y + 80), "3-4 Hours GTA 6 Stream", fill=(15, 23, 42), font=FONT_CARD_HL)
        draw.text((card_x + 70, c1_y + 160), "Streamer ke funny aur crazy moments detect hote hain.", fill=(71, 85, 105), font=FONT_CARD_BODY)

        # Vector Down Arrow
        ax = WIDTH // 2
        ay = c1_y + 270
        draw.polygon([(ax - 20, ay), (ax + 20, ay), (ax, ay + 26)], fill=(224, 86, 45))

        c2_y = c1_y + 330
        draw.rounded_rectangle([card_x + 40, c2_y, card_x + card_w - 40, c2_y + 280], radius=24, fill=(254, 242, 242), outline=(254, 202, 202), width=2)
        draw.text((card_x + 70, c2_y + 30), "STEP 02: 30-SEC VIRAL CLIPS", fill=(225, 29, 72), font=FONT_CARD_TITLE)
        draw.text((card_x + 70, c2_y + 80), "2.4 Million Views (Trending)", fill=(225, 29, 72), font=FONT_CARD_HL)
        draw.text((card_x + 70, c2_y + 160), "Instagram Reels • YouTube Shorts • TikTok", fill=(15, 23, 42), font=FONT_CARD_BODY)
        draw.text((card_x + 70, c2_y + 215), "• Bina Face Dikhaye • Instant Viral Reach", fill=(22, 163, 74), font=FONT_CARD_BODY)

        draw_kinetic_subtitle(draw, "Long video se crazy moments nikaal kar shorts banani hain!", "shorts")

    # SCENE 3: 19.32s - 24.22s (Paid Campaigns & Content Rewards Proofs)
    elif t < 24.22:
        draw_top_headline(draw, "Views aate hi", "DIRECT $", "milte hain")
        img, draw = draw_mac_window_shell(img, card_w, card_h, card_x, card_y, url_text="content - rewards - portal")

        rw1, rh1 = IMG_R61.size
        th = 650
        tw1 = int(rw1 * (th / rh1))
        r61_scaled = IMG_R61.resize((tw1, th), Image.Resampling.LANCZOS)

        rw2, rh2 = IMG_R45.size
        tw2 = int(rw2 * (th / rh2))
        r45_scaled = IMG_R45.resize((tw2, th), Image.Resampling.LANCZOS)

        total_tw = tw1 + tw2 + 30
        sx = card_x + (card_w - total_tw) // 2
        sy = card_y + 90

        img.paste(r61_scaled, (sx, sy), r61_scaled)
        img.paste(r45_scaled, (sx + tw1 + 30, sy), r45_scaled)

        hb_y = sy + th + 30
        draw.rounded_rectangle([card_x + 40, hb_y, card_x + card_w - 40, hb_y + 180], radius=24, fill=(240, 253, 244), outline=(187, 247, 208), width=2)
        draw.text((card_x + 70, hb_y + 30), "PAID CLIPPING CAMPAIGNS PAYOUT", fill=(21, 128, 61), font=FONT_CARD_TITLE)
        draw.text((card_x + 70, hb_y + 75), "$573.90 Total Accumulated", fill=(22, 163, 74), font=FONT_CARD_HL)
        draw.text((card_x + 70, hb_y + 135), "Eligible Views = Direct Cash Payouts", fill=(71, 85, 105), font=FONT_CARD_SUB)

        draw_kinetic_subtitle(draw, "Views aate hi paid campaigns se direct dollars milte hain!", "dollars")

    # SCENE 4: 24.22s - 39.73s (AutoClipper & Auto-Uploader Mentorship Tool)
    elif t < 39.73:
        draw_top_headline(draw, "Mera", "AI AUTOCLIPPER", "tool use karo")
        img, draw = draw_mac_window_shell(img, card_w, card_h, card_x, card_y, url_text="autoclipper - software")

        fl_y = card_y + 90
        draw.rounded_rectangle([card_x + 40, fl_y, card_x + card_w - 40, fl_y + 520], radius=24, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
        draw.text((card_x + 70, fl_y + 35), ">> 1-CLICK AUTOCLIPPER ENGINE", fill=(100, 116, 139), font=FONT_CARD_TITLE)
        
        steps = [
            ("01. Paste Long Video URL", "Kisi bhi lambi video ka link paste karo."),
            ("02. AI Cuts Best 10 Viral Shorts", "Subtitles + vertical 9:16 crop automatic."),
            ("03. Multi-Platform Auto-Upload", "Instagram, YouTube aur TikTok par auto-schedule."),
            ("• 90% Manual Work Automated", "Editing ka zero experience chahiye!")
        ]
        for idx, (stitle, sdesc) in enumerate(steps):
            sy_box = fl_y + 95 + idx * 105
            draw.text((card_x + 70, sy_box), stitle, fill=(15, 23, 42), font=FONT_CARD_BODY)
            draw.text((card_x + 70, sy_box + 40), sdesc, fill=(100, 116, 139), font=FONT_CARD_SUB)

        btn_y = fl_y + 560
        draw.rounded_rectangle([card_x + 40, btn_y, card_x + card_w - 40, btn_y + 160], radius=28, fill=(34, 197, 94), outline=(22, 163, 74), width=4)
        draw.text((card_x + 180, btn_y + 40), "₹0 FREE IN MENTORSHIP", fill=(255, 255, 255), font=FONT_CTA)
        draw.text((card_x + 220, btn_y + 105), "AutoClipper + Auto-Upload Bot Included!", fill=(240, 253, 244), font=FONT_CARD_SUB)

        if t < 26.77:
            draw_kinetic_subtitle(draw, "Aur editing ki tension bilkul mat lo!", "editing")
        elif t < 35.13:
            draw_kinetic_subtitle(draw, "Mera AI AutoClipper Tool videos cut aur auto-upload karega.", "AutoClipper")
        else:
            draw_kinetic_subtitle(draw, "Aur ye tool main aapko Mentorship ke sath bilkul FREE dunga!", "FREE")

    # SCENE 5: 39.73s - 54.14s (Peak Trend Urgency & Forced CTA)
    else:
        draw_top_headline(draw, "GTA 6 wave se", "ABHI", "judo")
        img, draw = draw_mac_window_shell(img, card_w, card_h, card_x, card_y, url_text="mentorship - enroll")

        b_y = card_y + 90
        draw.rounded_rectangle([card_x + 40, b_y, card_x + card_w - 40, b_y + 500], radius=24, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
        draw.text((card_x + 70, b_y + 35), ">> COMPLETE MENTORSHIP BUNDLE", fill=(225, 29, 72), font=FONT_CARD_TITLE)

        perks = [
            "• 5-Module Step-by-Step Training",
            "• Free AI AutoClipper Software Access",
            "• Multi-Platform Auto-Upload Automation",
            "• Secret High-Paying Brand Campaigns",
            "• 30-Day 100% Action-Backed Guarantee"
        ]
        for idx, p in enumerate(perks):
            py_box = b_y + 95 + idx * 75
            draw.text((card_x + 70, py_box), p, fill=(15, 23, 42), font=FONT_CARD_BODY)

        pulse = 0.5 + 0.5 * math.sin(t * 8.0)
        flash_col = (int(220 + 35 * pulse), 38, 38)
        db_y = b_y + 530
        draw.rounded_rectangle([card_x + 40, db_y, card_x + card_w - 40, db_y + 110], radius=20, fill=(254, 242, 242), outline=flash_col, width=3)
        draw.text((card_x + 70, db_y + 25), "TIME SENSITIVE: ONLY 9 SLOTS LEFT", fill=flash_col, font=FONT_CARD_TITLE)
        draw.text((card_x + 70, db_y + 65), "Flat 65% OFF Discount Live Today Only!", fill=(71, 85, 105), font=FONT_CARD_SUB)

        btn_y = db_y + 130
        draw.rounded_rectangle([card_x + 40, btn_y, card_x + card_w - 40, btn_y + 140], radius=28, fill=(224, 86, 45), outline=(194, 65, 12), width=4)
        cta_txt = "CLICK LINK BELOW TO JOIN WEBSITE"
        cb = FONT_CTA.getbbox(cta_txt)
        cw = cb[2] - cb[0]
        draw.text((card_x + (card_w - cw) // 2, btn_y + 48), cta_txt, fill=(255, 255, 255), font=FONT_CTA)

        # Vector Animated Downward Arrow
        arrow_y = 1710 + int(14 * math.sin(t * 10.0))
        for offset_x in [-80, 0, 80]:
            ax = WIDTH // 2 + offset_x
            draw.polygon([(ax - 18, arrow_y), (ax + 18, arrow_y), (ax, arrow_y + 24)], fill=(224, 86, 45))

        if t < 44.39:
            draw_kinetic_subtitle(draw, "GTA 6 trend is waqt internet par peak par chal raha hai.", "peak")
        elif t < 48.14:
            draw_kinetic_subtitle(draw, "Agar ye wave abhi chhod di toh bahut bada loss hoga!", "loss")
        else:
            draw_kinetic_subtitle(draw, "Roadmap aur AutoClipper lene ke liye abhi link par click karo!", "link")

    draw.text(((WIDTH - 200) // 2, 1840), "@gta6clipping", fill=(156, 163, 175), font=get_font(24))

    return img.convert("RGB").tobytes()

def main():
    out_video = "public/gta6_ad_circuitly_style.mp4"
    audio_path = "scripts/final_audio_54s.aac"

    cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-pix_fmt", "rgb24",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-r", str(FPS),
        "-i", "-",
        "-i", audio_path,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "20",
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
        if i % 100 == 0:
            print(f"Progress: {i}/{TOTAL_FRAMES} frames ({(i/TOTAL_FRAMES)*100:.1f}%)")

    proc.stdin.close()
    stderr = proc.stderr.read().decode("utf-8", errors="ignore")
    proc.wait()

    if proc.returncode == 0:
        print(f"SUCCESS! Rendered video at: {out_video}")
    else:
        print(f"FFmpeg error: {stderr}")

if __name__ == "__main__":
    main()
