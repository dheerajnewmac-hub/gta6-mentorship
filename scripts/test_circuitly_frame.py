import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH, HEIGHT = 1080, 1920

def get_font(size, bold=True, serif=False):
    try:
        if serif:
            font_path = "C:/Windows/Fonts/georgiab.ttf" if bold else "C:/Windows/Fonts/georgia.ttf"
        else:
            font_path = "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

def draw_figma_box(draw, x1, y1, x2, y2, color=(224, 86, 45), handle_size=10):
    # Orange bounding rectangle
    draw.rectangle([x1, y1, x2, y2], outline=color, width=3)
    # 8 handles
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

def test_frame():
    img = Image.new("RGBA", (WIDTH, HEIGHT), (249, 248, 246, 255))
    draw = ImageDraw.Draw(img)

    # 1. Architectural fine grid
    grid_color = (234, 231, 225)
    for x in range(0, WIDTH, 60):
        draw.line([(x, 0), (x, HEIGHT)], fill=grid_color, width=1)
    for y in range(0, HEIGHT, 60):
        draw.line([(0, y), (WIDTH, y)], fill=grid_color, width=1)

    # 2. Draw Figma selection headline:
    # "GTA 6 clipping se [ $573 ] kamaye"
    font_main = get_font(44, bold=True)
    font_serif = get_font(52, bold=True, serif=True)

    t1 = "GTA 6 clipping se "
    t2 = "$573"
    t3 = " kamaye"

    b1 = font_main.getbbox(t1)
    b2 = font_serif.getbbox(t2)
    b3 = font_main.getbbox(t3)

    w1 = b1[2] - b1[0]
    w2 = b2[2] - b2[0] + 36 # with box padding
    w3 = b3[2] - b3[0]
    total_w = w1 + w2 + w3
    start_x = (WIDTH - total_w) // 2
    base_y = 170

    draw.text((start_x, base_y + 6), t1, fill=(28, 25, 23), font=font_main)
    
    # Orange bounding box around t2
    bx1 = start_x + w1
    by1 = base_y - 8
    bx2 = bx1 + w2
    by2 = by1 + 68
    draw_figma_box(draw, bx1, by1, bx2, by2)
    draw.text((bx1 + 18, base_y), t2, fill=(224, 86, 45), font=font_serif)

    draw.text((bx2 + 10, base_y + 6), t3, fill=(28, 25, 23), font=font_main)

    # 3. Claymorphism Mac Window Card
    card_w, card_h = 920, 1060
    card_x = (WIDTH - card_w) // 2
    card_y = 320

    # Layered clay soft shadow
    shadow_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.rounded_rectangle([card_x, card_y + 25, card_x + card_w, card_y + card_h + 25], radius=36, fill=(0, 0, 0, 32))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(32))
    img = Image.alpha_composite(img, shadow_img)
    draw = ImageDraw.Draw(img)

    # Pure white card surface
    draw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=36, fill=(255, 255, 255), outline=(230, 228, 224), width=2)

    # Mac Window Bar
    dot_y = card_y + 36
    draw.ellipse([card_x + 40, dot_y - 8, card_x + 56, dot_y + 8], fill=(255, 95, 86))
    draw.ellipse([card_x + 68, dot_y - 8, card_x + 84, dot_y + 8], fill=(255, 189, 46))
    draw.ellipse([card_x + 96, dot_y - 8, card_x + 112, dot_y + 8], fill=(39, 201, 63))

    # Center URL Pill
    url_text = "gta6-clipping - earnings"
    font_url = get_font(22, bold=False)
    ub = font_url.getbbox(url_text)
    uw = ub[2] - ub[0] + 40
    ux = card_x + (card_w - uw) // 2
    draw.rounded_rectangle([ux, dot_y - 14, ux + uw, dot_y + 14], radius=14, fill=(243, 244, 246))
    draw.text((ux + 20, dot_y - 12), url_text, fill=(107, 114, 128), font=font_url)

    # Inside Content: SBI Proof
    sbi = Image.open("public/proofs/sbi_transfer_42k.png").convert("RGBA")
    sw, sh = sbi.size
    target_w = 840
    target_h = int(sh * (target_w / sw))
    sbi_scaled = sbi.resize((target_w, target_h), Image.Resampling.LANCZOS)
    img.paste(sbi_scaled, (card_x + 40, card_y + 90), sbi_scaled)

    # Metric Cards Below
    m_y = card_y + 90 + target_h + 30
    draw.rounded_rectangle([card_x + 40, m_y, card_x + card_w - 40, m_y + 160], radius=24, fill=(248, 250, 252), outline=(226, 232, 240), width=2)
    font_m_title = get_font(24, bold=True)
    draw.text((card_x + 70, m_y + 25), "VERIFIED BANK DEPOSIT (21 NOV 2026)", fill=(100, 116, 139), font=font_m_title)
    font_m_amt = get_font(48, bold=True)
    draw.text((card_x + 70, m_y + 65), "₹42,282.27 INR", fill=(16, 185, 129), font=font_m_amt)

    # Kinetic Subtitles at Bottom
    sub_y = 1580
    cap_text = "GTA 6 clipping se maine 573 dollar kamaye"
    words = cap_text.split()
    font_cap = get_font(38, bold=True)
    
    # Calculate widths
    cur_x = 120
    for w in words:
        wb = font_cap.getbbox(w)
        ww = wb[2] - wb[0]
        if w == "573":
            # Highlight with Lime Green box
            draw.rounded_rectangle([cur_x - 10, sub_y - 6, cur_x + ww + 10, sub_y + 48], radius=10, fill=(190, 242, 100))
            draw.text((cur_x, sub_y), w, fill=(0, 0, 0), font=font_cap)
        else:
            draw.text((cur_x, sub_y), w, fill=(17, 24, 39), font=font_cap)
        cur_x += ww + 18

    # Watermark
    draw.text(((WIDTH - 200) // 2, 1840), "@gta6clipping", fill=(156, 163, 175), font=get_font(24))

    img.save("scripts/test_circuitly_frame.png")
    print("Saved test_circuitly_frame.png")

if __name__ == "__main__":
    test_frame()
