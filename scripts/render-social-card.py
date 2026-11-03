#!/usr/bin/env python3
"""Draw the social card with the bundled brand fonts; requires ImageMagick."""
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parents[1]
regular = str(root / 'assets/fonts/HelveticaNeueRoman.otf')
bold = str(root / 'assets/fonts/HelveticaNeueBold.otf')
output = root / 'images/social/portfolio-social-v1.png'
command = ['magick', '-size', '1200x630', 'canvas:#0b162b']

def text(value, x, y, size, color, font=regular, gravity='NorthWest'):
    command.extend(['-gravity', gravity, '-font', font, '-pointsize', str(size), '-fill', color, '-annotate', f'+{x}+{y}', value])

text('JC.', 80, 62, 40, '#b8deff', bold)
text('jcnino-it.vercel.app', 80, 78, 23, '#c4d2e5', gravity='NorthEast')
text('JC Niñonuevo', 80, 176, 84, '#f6f9ff', bold)
text('Useful digital systems.', 80, 286, 70, '#b8deff', bold)
text('Developer · Researcher · Systems thinker', 80, 395, 29, '#c4d2e5')
command.extend(['-stroke', '#516b8c', '-strokewidth', '1', '-draw', 'line 80,490 1120,490', '-stroke', 'none'])
text('Web · Data · Networks', 80, 532, 21, '#c4d2e5')
text('Bacolod City, Philippines', 80, 532, 21, '#c4d2e5', gravity='NorthEast')
command.extend(['-depth', '8', '-define', 'png:color-type=2', '-strip', '-set', 'comment', 'Origin: code-authored with the existing Helvetica Neue fonts and owner-approved midnight navy/ice/off-white palette. Rebuild with scripts/render-social-card.py; editable vector counterpart images/social/portfolio-social-v1.svg. No invented claims.', str(output)])
subprocess.run(command, check=True)
print(output)
