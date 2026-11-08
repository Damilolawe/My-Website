#!/usr/bin/env python3
"""Build labelled contact sheets for visual review.

Two modes:
  screenshots: python3 scripts/qa-contact-sheet.py shots <date> <out.jpg> [slug ...] [--view mobile] [--crop 2400]
      Tiles the top of each site's homepage screenshot from artifacts/portfolio-qa/<date>/.
  images:      python3 scripts/qa-contact-sheet.py images <out.jpg> <url-or-path> ...
      Downloads candidate photos (small size) and tiles them with index labels,
      so a person (or agent) can confirm each photo's subject before using it.
"""
import io, os, sys, urllib.request
from PIL import Image, ImageDraw, ImageFont

def font(size):
    for p in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf"]:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def label(img, text):
    d = ImageDraw.Draw(img)
    f = font(18)
    d.rectangle([0, 0, img.width, 28], fill=(0, 0, 0))
    d.text((6, 4), text[:60], fill=(255, 255, 0), font=f)

def grid(tiles, cols, out):
    w, h = tiles[0].size
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * w + (cols - 1) * 6, rows * h + (rows - 1) * 6), (90, 90, 90))
    for i, t in enumerate(tiles):
        sheet.paste(t, ((i % cols) * (w + 6), (i // cols) * (h + 6)))
    sheet.save(out, quality=78)
    print(out, sheet.size)

def shots(args):
    date, out, rest = args[0], args[1], args[2:]
    view = "desktop"; crop = 2400; slugs = []
    i = 0
    while i < len(rest):
        if rest[i] == "--view": view = rest[i + 1]; i += 2
        elif rest[i] == "--crop": crop = int(rest[i + 1]); i += 2
        else: slugs.append(rest[i]); i += 1
    base = f"artifacts/portfolio-qa/{date}"
    if not slugs: slugs = sorted(os.listdir(base))
    tw = 360 if view == "desktop" else 200
    tiles = []
    for s in slugs:
        p = f"{base}/{s}/index-{view}.jpg"
        if not os.path.exists(p): continue
        im = Image.open(p).convert("RGB")
        im = im.crop((0, 0, im.width, min(im.height, crop if view == "desktop" else int(crop * 1.4))))
        im = im.resize((tw, int(im.height * tw / im.width)))
        canvas = Image.new("RGB", (tw, int((crop if view == "desktop" else crop * 1.4) * tw / (1440 if view == "desktop" else 390))), (255, 255, 255))
        canvas.paste(im, (0, 0))
        label(canvas, s)
        tiles.append(canvas)
    grid(tiles, 6 if view == "desktop" else 8, out)

def images(args):
    out, sources = args[0], args[1:]
    tiles = []
    for n, src in enumerate(sources):
        try:
            if src.startswith("http"):
                url = src
                if "images.unsplash.com" in url:
                    url = url.split("?")[0] + "?w=480&q=60&auto=format&fm=jpg"
                elif "images.pexels.com" in url:
                    url = url.split("?")[0] + "?auto=compress&w=480"
                data = urllib.request.urlopen(url, timeout=20).read()
                im = Image.open(io.BytesIO(data)).convert("RGB")
            else:
                im = Image.open(src).convert("RGB")
            im.thumbnail((400, 300))
            tile = Image.new("RGB", (400, 300), (30, 30, 30))
            tile.paste(im, ((400 - im.width) // 2, (300 - im.height) // 2))
        except Exception as e:
            tile = Image.new("RGB", (400, 300), (120, 0, 0))
            ImageDraw.Draw(tile).text((10, 140), "FAILED " + str(e)[:40], fill=(255, 255, 255), font=font(14))
        label(tile, f"{n}: " + src.split("/")[-1][:50])
        tiles.append(tile)
    grid(tiles, 4, out)

if __name__ == "__main__":
    mode, rest = sys.argv[1], sys.argv[2:]
    {"shots": shots, "images": images}[mode](rest)
