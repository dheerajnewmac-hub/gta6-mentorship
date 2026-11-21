import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH, HEIGHT = 1080, 1920

def get_font(size, bold=True):
    try:
        font_path = "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

def draw_gradient_bg(draw, t):
    # Deep midnight purple to dark navy background
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(12 + 10 * math.sin(t * 0.5 + ratio * 2.0))
        g = int(8 + 5 * math.cos(t * 0.5 + ratio * 1.5))
        b = int(24 + 18 * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

def test_frame():
    img = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(img)
    draw_gradient_bg(draw, 0.0)
    
    # Draw top neon pill
    font_sm = get_font(26, bold=True)
    pill_text = "⚡ 3-DAY EARNING REPORT • GTA 6 CLIPPING"
    bbox = font_sm.getbbox(pill_text)
    pw = bbox[2] - bbox[0] + 40
    ph = 56
    px = (WIDTH - pw) // 2
    py = 140
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=28, fill=(35, 15, 45), outline=(225, 29, 72), width=3)
    draw.text((px + 20, py + 12), pill_text, fill=(255, 60, 110), font=font_sm)
    
    # Big Headline
    font_lg = get_font(68, bold=True)
    hl = "₹42,282.27 INR"
    hl_bbox = font_lg.getbbox(hl)
    draw.text(((WIDTH - (hl_bbox[2] - hl_bbox[0])) // 2, 230), hl, fill=(16, 235, 140), font=font_lg)
    
    font_sub = get_font(42, bold=True)
    sub = "($573 IN JUST 3 DAYS)"
    sub_bbox = font_sub.getbbox(sub)
    draw.text(((WIDTH - (sub_bbox[2] - sub_bbox[0])) // 2, 320), sub, fill=(255, 255, 255), font=font_sub)
    
    # Place SBI Proof Image
    sbi = Image.open("public/proofs/sbi_transfer_42k.png").convert("RGBA")
    # Scale to width 940
    sw, sh = sbi.size
    target_w = 940
    target_h = int(sh * (target_w / sw))
    sbi_scaled = sbi.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    card_x = (WIDTH - target_w) // 2
    card_y = 440
    # Card glow border
    draw.rounded_rectangle([card_x - 16, card_y - 16, card_x + target_w + 16, card_y + target_h + 16], radius=24, fill=(20, 15, 30), outline=(6, 182, 212), width=4)
    img.paste(sbi_scaled, (card_x, card_y), sbi_scaled)
    
    img.save("scripts/test_frame.png")
    print("Test frame saved: scripts/test_frame.png")

if __name__ == "__main__":
    test_frame()
