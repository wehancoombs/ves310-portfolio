/* Wehan Coombs · VES 310 portfolio
   A playable version of the Grade 11 revision quiz, in the style the learners saw it on Kahoot.
   Questions and answers are Wehan's own; the first option listed is the correct one and options are shuffled per play. */
(function () {
  'use strict';
  const ROUNDS = [
    { id: 1, title: '“For Oom Piet”', sub: 'Finuala Dowling', qs: [
      ['Stanza 1: the toddler leading the mother across the road is an example of:', ['role inversion', 'antithesis', 'hyperbole', 'personification']],
      ['Oom Piet uses tones for “bilious dogs”. What does “bilious” mean here?', ['sickly or nauseous', 'aggressive or rabid', 'overly affectionate', 'loud and barking']],
      ['The line “You guessed” implies what about Oom Piet?', ['he intuitively understood her pain without prying', 'he incorrectly assumed why she was crying', 'he was playing a game to entertain the toddler', 'he guessed her daughter’s name incorrectly']],
      ['The repetition of hissing sounds in “the sense of a rescue” is called:', ['sibilance', 'assonance', 'consonance', 'alliteration']],
      ['Bonus: what is the concept of theoxeny?', ['a humble stranger reveals themselves as a disguised deity', 'the sacred, unbreakable Greek law of guest-host hospitality', 'a god suddenly appears to resolve a hopeless situation', 'the act of making offerings to household ancestors'], 2]
    ] },
    { id: 2, title: '“The Herb Garden”', sub: 'Stephen Gray', qs: [
      ['“Before I was ready”: literally, unready to garden. Metaphorically:', ['emotionally unready for her death and imposed legacy', 'unprepared for the physical labour of maintaining a home', 'unforgiving of his mother for rigid English traditions', 'unwilling to accept his own ageing']],
      ['The “heart-stopping drought” is primarily a metaphor for:', ['the emotional barrenness and numbness of grief', 'the devastating effects of climate change in South Africa', 'the speaker’s literal lack of tears at the funeral', 'the physical withering of the herb garden after her death']],
      ['The sensory imagery of mint and sage on fingers and nails demonstrates:', ['her memory has become an inseparable, physical experience', 'the physical exhaustion of maintaining a dying garden', 'the harshness of the South African soil resisting plants', 'he is trying to wash away the physical memory of grief']],
      ['What is the structural significance of the single full stop at the end?', ['it represents the absolute finality of physical death', 'it creates a caesura that forces the reader to pause', 'it signals a shift from an elegiac to a narrative tone', 'it indicates the speaker has finally forgotten his mother']],
      ['Bonus: what defines an elegy?', ['a structured poem, typically a lament for the dead', 'a speech delivered at a funeral praising the deceased', 'an impassioned, unstructured outpouring of raw grief', 'a musical composition or mass for the dead'], 2]
    ] },
    { id: 3, title: '“The Poet”', sub: 'Shakespeare', qs: [
      ['This excerpt about the poet, the lover and the lunatic is from which play?', ['A Midsummer Night’s Dream', 'Macbeth', 'The Tempest', 'Romeo and Juliet']],
      ['Theseus describes the poet’s eye rolling in a “fine frenzy”. This is a:', ['oxymoron', 'paradox', 'hyperbole', 'metonymy']],
      ['The original Greek word “poiesis” translates directly to:', ['making', 'dreaming', 'speaking', 'feeling']],
      ['“Gives to airy nothing a local habitation” relies on what device?', ['paradox', 'sibilance', 'antithesis', 'hyperbole']],
      ['Bonus: what is the deep irony of Duke Theseus delivering this speech?', ['a strict rationalist uses soaring poetry to mock poetry', 'he uses fairy magic to deliver his ruling on rationality', 'he claims to be the only sane person while hallucinating', 'he praises the poet’s imagination while executing lovers'], 2]
    ] },
    { id: 4, title: 'Film literacy', sub: 'visual coding', qs: [
      ['Filmmakers construct meaning; viewers interpret it through personal context:', ['encoding and decoding', 'denotation and connotation', 'index and icon', 'mise-en-scène and setting']],
      ['Which lighting simulates a character losing reality to a dream state?', ['overexposure', 'low-key lighting', 'back lighting', 'high-key lighting']],
      ['Which role uses leitmotifs for emotional depth and character continuity?', ['the composer', 'the editor', 'the director', 'the producer']],
      ['Which technique establishes dominance and vulnerability without words?', ['high and low camera angles', 'overexposure', 'extreme close-ups', 'leitmotifs']]
    ] },
    { id: 5, title: 'Philosophy & the screen', sub: 'enrichment', qs: [
      ['Proving that the speaker in a poem exists tests how you verify knowledge:', ['epistemology', 'axiology', 'metaphysics', 'logic']],
      ['Analysing the fundamental rules of reality in films such as The Matrix uses:', ['metaphysics', 'epistemology', 'axiology', 'logic']],
      ['Characters debating reality (Paprika) versus breaking the fourth wall (Deadpool):', ['literal / meta', 'meta / literal', 'symbolic / literal', 'literal / symbolic']],
      ['Analysing how a character reasons versus what they fundamentally value is:', ['logic / axiology', 'epistemology / metaphysics', 'utility / deontology', 'axiology / logic']],
      ['Bonus: “I avoid AI because it makes me stagnant, not flourishing.” Which ethical frame?', ['virtue', 'utility', 'relational', 'deontology'], 2]
    ] },
    { id: 6, title: 'The Tempest Gauntlet', sub: 'Acts 1 and 2 · all double points', qs: [
      ['Why did Sycorax imprison Ariel in a pine tree for twelve years?', ['Ariel was too delicate for her abhorred commands', 'Ariel plotted with Caliban to steal her magical texts', 'Ariel tried to warn ships away, ruining her spells', 'Ariel refused to acknowledge her authority over the isle'], 2],
      ['What is Antonio’s logic to convince Sebastian to assassinate Alonso?', ['Ferdinand is dead and Claribel is too far away to claim the throne', 'the island’s magic will erase Gonzalo’s memory', 'Alonso’s men are planning mutiny, so Sebastian will be a hero', 'Prospero secretly promised to legitimise Sebastian’s rule'], 2],
      ['When Trinculo finds Caliban, what is his immediate capitalistic thought?', ['he considers taking him to England to exhibit for money', 'he believes Caliban is a deity and bargains for passage', 'he assumes Caliban is a wealthy merchant he can rob', 'he thinks Caliban is a demon sent to punish his sins'], 2],
      ['Why does Prospero immediately treat Ferdinand harshly and enslave him?', ['he wants the courtship to be hard so that Ferdinand values Miranda highly', 'he genuinely fears Ferdinand is a spy plotting with Antonio', 'he is testing Ariel’s loyalty', 'he is overcome with rage at seeing his enemy’s son'], 2]
    ] }
  ];
  const SHAPES = [
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l10 18H2z"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l10 10-10 10L2 12z"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>'
  ];
  const LIMIT = 30; // seconds per question, as in class

  const root = document.getElementById('kq');
  if (!root) return;
  const $ = (s, el) => (el || document).querySelector(s);
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  let queue = [], qi = 0, score = 0, correct = 0, timer = null, startAt = 0, roundLabel = '';

  function shuffle(a) { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

  function screenStart() {
    clearInterval(timer);
    root.innerHTML = '<div class="kq-board kq-start">' +
      '<p class="kq-eyebrow">Try it!</p>' +
      '<h3>The quiz, as the learners saw it</h3>' +
      '<p>Six rounds, 30 seconds a question, points for speed. Bonus and Gauntlet questions count double. Pick a round or play the whole thing.</p>' +
      '<div class="kq-rounds">' + ROUNDS.map(r => '<button type="button" class="kq-round" data-round="' + r.id + '"><b>' + r.id + '</b><span>' + esc(r.title) + '</span><small>' + esc(r.sub) + '</small></button>').join('') + '</div>' +
      '</div>';
  }

  function begin(sel) {
    const rounds = sel === 'all' ? ROUNDS : ROUNDS.filter(r => String(r.id) === sel);
    queue = [];
    rounds.forEach(r => r.qs.forEach((q, i) => queue.push({ round: r, n: i + 1, of: r.qs.length, text: q[0], opts: q[1], mult: q[2] || 1 })));
    qi = 0; score = 0; correct = 0; roundLabel = sel === 'all' ? 'All six rounds' : 'Round ' + rounds[0].id;
    showQuestion();
  }

  function showQuestion() {
    clearInterval(timer);
    const q = queue[qi];
    const order = shuffle([0, 1, 2, 3]);
    root.innerHTML = '<div class="kq-board">' +
      '<div class="kq-top"><span>Round ' + q.round.id + ' · ' + esc(q.round.title) + ' · question ' + q.n + ' of ' + q.of + (q.mult > 1 ? ' · <b>double points</b>' : '') + '</span><span class="kq-score">' + fmt(score) + ' pts</span></div>' +
      '<div class="kq-q">' + esc(q.text) + '</div>' +
      '<div class="kq-timer"><div class="kq-bar"></div><span class="kq-left">' + LIMIT + '</span></div>' +
      '<div class="kq-answers">' + order.map((o, pos) => '<button type="button" class="kq-a kq-a' + pos + '" data-opt="' + o + '">' + SHAPES[pos] + '<span>' + esc(q.opts[o]) + '</span></button>').join('') + '</div>' +
      '<p class="kq-feedback" aria-live="polite"></p>' +
      '</div>';
    startAt = Date.now();
    const bar = $('.kq-bar', root), left = $('.kq-left', root);
    requestAnimationFrame(() => { bar.style.transition = 'width ' + LIMIT + 's linear'; bar.style.width = '0%'; });
    timer = setInterval(() => {
      const t = Math.max(0, LIMIT - (Date.now() - startAt) / 1000);
      left.textContent = Math.ceil(t);
      if (t <= 0) answer(null);
    }, 200);
  }

  function answer(opt) {
    clearInterval(timer);
    const q = queue[qi];
    const elapsed = (Date.now() - startAt) / 1000;
    const bar = $('.kq-bar', root); if (bar) { bar.style.transition = 'none'; }
    const buttons = root.querySelectorAll('.kq-a');
    buttons.forEach(b => { b.disabled = true; if (b.dataset.opt === '0') b.classList.add('kq-right'); else b.classList.add('kq-dim'); if (opt !== null && b.dataset.opt === String(opt) && opt !== 0) b.classList.add('kq-wrong'); });
    const fb = $('.kq-feedback', root);
    let msg;
    if (opt === 0) {
      const pts = Math.round(1000 * (1 - Math.min(elapsed, LIMIT) / LIMIT / 2)) * q.mult;
      score += pts; correct++;
      msg = '<b class="kq-yes">Correct!</b> +' + fmt(pts) + ' points' + (q.mult > 1 ? ' (double)' : '') + '.';
    } else if (opt === null) {
      msg = '<b class="kq-no">Time’s up.</b> The answer was “' + esc(q.opts[0]) + '”.';
    } else {
      msg = '<b class="kq-no">Not quite.</b> The answer was “' + esc(q.opts[0]) + '”.';
    }
    const last = qi >= queue.length - 1;
    fb.innerHTML = msg + ' <button type="button" class="kq-btn kq-next">' + (last ? 'See your result' : 'Next question') + '</button>';
    $('.kq-next', root).focus();
  }

  function screenEnd() {
    clearInterval(timer);
    const total = queue.length;
    const max = queue.reduce((s, q) => s + 1000 * q.mult, 0);
    root.innerHTML = '<div class="kq-board kq-end">' +
      '<p class="kq-eyebrow">' + esc(roundLabel) + ' · finished</p>' +
      '<h3>' + fmt(score) + ' points</h3>' +
      '<p>' + correct + ' of ' + total + ' correct · a perfect, instant run would score ' + fmt(max) + '.</p>' +
      '<svg class="kq-podium" viewBox="0 0 320 150" aria-label="Podium"><rect x="20" y="70" width="80" height="80" rx="4" class="p2"/><rect x="120" y="40" width="80" height="110" rx="4" class="p1"/><rect x="220" y="90" width="80" height="60" rx="4" class="p3"/><text x="60" y="118">2</text><text x="160" y="92">1</text><text x="260" y="128">3</text><text class="you" x="160" y="30">' + (correct === total ? 'You' : correct >= total / 2 ? 'Nearly' : 'Try again') + '</text></svg>' +
      '<p class="kq-small">In class the top three learners scored 17 914, 17 583 and 17 372 points over the whole quiz, and took home a Sleep Token.</p>' +
      '<p class="kq-actions"><button type="button" class="kq-btn" data-restart="1">Play another round</button> <button type="button" class="kq-btn kq-ghost" data-sheet="memo">See the memorandum</button></p>' +
      '</div>';
  }

  root.addEventListener('click', e => {
    const a = e.target.closest('.kq-a'); if (a && !a.disabled) { answer(Number(a.dataset.opt)); return; }
    const n = e.target.closest('.kq-next'); if (n) { qi++; if (qi < queue.length) showQuestion(); else screenEnd(); return; }
    const r = e.target.closest('[data-round]'); if (r) { begin(r.dataset.round); return; }
    const s = e.target.closest('[data-restart]'); if (s) { screenStart(); return; }
  });
  screenStart();
})();
