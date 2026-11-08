# Progress log: VES 310 teaching portfolio

Plain-words record of where the portfolio site stands. Newest entries at the bottom.

## What this is

A separate website, built from a copy of Wehan's personal site, for the VES 310 exam equivalent (Sections B and C, 65 of 100 marks). It doubles as the 2027 job-hunt portfolio for FET English Home Language posts.

- Live address (once published): https://wehancoombs.github.io/ves310-portfolio/
- GitHub repo: wehancoombs/ves310-portfolio (separate from the personal site's repo).
- The personal site at wehancoombs.github.io is **not** connected to this folder and cannot be changed from here.

## Folders

- `index.html`, `profile.html`, `lessons.html`, `lesson-1.html`, `lesson-2.html`, `assessment.html`, `technology.html`, `references.html`: the pages.
- `assets/`: the stylesheet and the small menu script.
- `cv/`: the FET CV PDF (links back to this portfolio).
- `cv-source/`: the CV's source files. To re-render after editing `fet-cv.html`: `python render.py fet-cv.html "../cv/Wehan-Coombs-FET-CV.pdf"`.
- `materials/`: downloadable LTSM and other resources (PDFs).
- `downloads/`: lesson plan and assessment PDFs generated from the pages.
- Videos: both the Section C introduction and the micro-lesson are streamed from YouTube (no video files in the repo).

## How to preview and publish

- **Preview on your computer:** open the `ves-site` folder in File Explorer and double-click `index.html`.
- **Publish:** changes go live about a minute after they are pushed to GitHub (Claude does this on request).

---

## 2026-11-03: split from the personal site and first skeleton

**Done**
- Removed the link to the personal site's GitHub repo and started a fresh git history.
- Read the brief, rubric and planning notes; listed what could be reused.
- Rebuilt the site as a simple multi-page portfolio with a menu: Home, Profile & CV, Lesson plans, Assessment, Technology, References.
- Reused the headshot, fonts and Wehan's own profile, qualifications, practicum and philosophy text.
- Copied the CV source out of `ves-cvs`, changed the website line to the portfolio address, re-rendered the PDF into `cv/`.
- Compressed the micro-lesson video (10 min 53 s) from 142 MB to 57 MB and embedded it on the Home page.
- Pre-filled Lesson 2 from the WIL lesson plan for *The Tempest*, Act 3 Scene 3 (4 September 2026).
- Marked every spot that still needs Wehan's content with a yellow "Placeholder" box.

**Still needed from Wehan** (see the yellow boxes on each page)
- Section C video (3–5 min).
- (Done 2026-11-03: Lesson 1 = The Poet with its lesson notes as LTSM 1; Lesson 2 = Macbeth essay preparation with the revision sheet as LTSM 2; the Tempest lesson kept as an extra.)
- (Done 2026-11-03: B3 = Wehan's Kahoot revision quiz with memo; B4 = toolkit, Tempest Gauntlet activity, paper version, responsible-AI note.)
- Wehan to check the drafted text listed in `SITE-TEXT.md` and reply in chat.

---

## 2026-11-03 (evening): redesign

**Done**
- Rebuilt the home page as one visual page in the style of the personal site: dark theme with a light toggle, headshot in a gold ring, stat cards that open the assessors' quotes, two video frames, profile cards and the "arc of a lesson" drawing, a bookshelf of lesson plans, six round tokens for the quiz, tool chips and activity tiles. Everything opens in a slide-in pop-out; the detail pages stay as printable full versions.
- `CHAT-PROMPT.txt`: a copy-paste prompt with every drafted passage, for revising the text in a chat.

---

## 2026-11-04: playable quiz and visual Technology section

**Done**
- Assessment: the Kahoot quiz is now playable on the page (`assets/quiz.js`): pick a round or all six, 30-second timer, four coloured answer tiles, points for speed, double points on bonus and Gauntlet questions, a result podium. Three podium photos from the three classes (learner nicknames blurred) sit beside it as evidence.
- Technology: five tool cards; a switch that flips one illustration between the Kahoot version (projector and phones) and the chalkboard version (A B C D, tally scoreboard, paper letters) with three steps for each; four small cards for the responsible-AI note.
- Pop-outs are wider; tool pop-outs show purpose and limitation side by side; instructions use numbered steps.
- Later the same day: podium photos became a swipeable gallery; Profile and Lesson pop-outs are wider and visual (timeline, badges, pull quotes, lesson-at-a-glance bars, download cards, school cards); the five tools and the four responsible-AI cards open centred hover cards with their own content (hover to peek, click to pin).

