"""Render a CV template to PDF.  Usage: python render.py fet-cv.html "out/Wehan Coombs FET CV.pdf"
Needs: pip install playwright && playwright install chromium"""
import sys, pathlib
from playwright.sync_api import sync_playwright
src = pathlib.Path(sys.argv[1]).resolve(); out = sys.argv[2]
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    pg.goto(src.as_uri()); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(400)
    print(pg.evaluate("""() => [...document.querySelectorAll('.page')].map((x,i) => {
        const parts = [x.querySelector('main'), x.querySelector('.side')].filter(Boolean);
        const pb = x.getBoundingClientRect().bottom;
        const spill = parts.flatMap(e => [...e.children].map(c => c.getBoundingClientRect().bottom - pb));
        return {page: i+1, overflow: Math.round(Math.max(...parts.map(e => e.scrollHeight - e.clientHeight), ...spill, 0))};
    })"""))
    pg.pdf(path=out, format="A4", print_background=True, prefer_css_page_size=True, margin={"top":"0","right":"0","bottom":"0","left":"0"})
    b.close()
