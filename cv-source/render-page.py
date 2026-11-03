"""Render one of the portfolio pages to a PDF, using its print styles.
Usage (from the ves-site folder):  python cv-source/render-page.py lesson-2.html "downloads/Wehan-Coombs-Lesson-2-The-Tempest.pdf"
Needs: pip install playwright && playwright install chromium"""
import sys, pathlib
from playwright.sync_api import sync_playwright

src = pathlib.Path(sys.argv[1]).resolve()
out = sys.argv[2]
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto(src.as_uri())
    pg.evaluate("document.fonts.ready")
    pg.wait_for_timeout(600)
    pg.emulate_media(media="print")
    pg.pdf(path=out, format="A4", print_background=True,
           margin={"top": "15mm", "right": "15mm", "bottom": "15mm", "left": "15mm"})
    b.close()
print("wrote", out)
