#!/usr/bin/env python3
"""Rebuilds the PRIVATE portfolio library used by Kofix AI.
Put photos in  private-library/<category>/  (this folder stays on your computer, never inside site/), then run:
    pip install pillow
    python3 tools/build-portfolio.py
Categories: weddings, birthdays, maternity-baby, graduation, portraits, events, frames, behind-the-scenes
(or a new folder name; also add it to ALIAS/LABEL in netlify/functions/chat.js). The photo's file name becomes its description.
Then redeploy."""
import os, io, json, base64, secrets, sys
from PIL import Image, ImageOps
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(root, 'private-library'); out = os.path.join(root, 'netlify', 'functions', 'lib')
idx, data = [], {}
for cat in sorted(os.listdir(src)) if os.path.isdir(src) else []:
    d = os.path.join(src, cat)
    if not os.path.isdir(d): continue
    for f in sorted(os.listdir(d)):
        if not f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')): continue
        im = ImageOps.exif_transpose(Image.open(os.path.join(d, f))).convert('RGB'); i = secrets.token_hex(8)
        def enc(mx, q):
            x = im.copy(); x.thumbnail((mx, mx), Image.LANCZOS); b = io.BytesIO(); x.save(b, 'WEBP', quality=q, method=6)
            return base64.b64encode(b.getvalue()).decode(), x.size
        th, _ = enc(640, 76); fu, sz = enc(2000, 88)
        alt = os.path.splitext(f)[0].replace('-', ' ').replace('_', ' ').strip().capitalize()
        idx.append({'id': i, 'cat': cat, 'alt': alt, 'tags': [], 'w': sz[0], 'h': sz[1]}); data[i] = {'thumb': th, 'full': fu}
open(os.path.join(out, 'portfolio-index.js'), 'w').write('module.exports=' + json.dumps(idx, indent=1) + ';\n')
open(os.path.join(out, 'portfolio-data.js'), 'w').write('module.exports=' + json.dumps(data) + ';\n')
print(len(idx), 'photos in the private library')
