(function(){
'use strict';
const COURSE = COURSE_A.concat(COURSE_B);
const LESSONS = [];
COURSE.forEach(m => { m.from = LESSONS.length + 1; m.L.forEach(l => { l.n = LESSONS.length + 1; l.m = m; LESSONS.push(l); }); m.to = LESSONS.length; });
const TOTAL = LESSONS.length;
LESSONS.forEach((l, i) => { l.ss = SOLO[i]; });
const TRACKS = Object.assign({}, TRACKS_A, TRACKS_B);
const TRACK_LEN = 6;
const BONUS_TOTAL = Object.keys(TRACKS).length * TRACK_LEN;
const RU_GEN = {Nikita:'Никиты', Nastya:'Насти', Seryozha:'Серёжи', Anya:'Ани'};

const SPK = {
  Nikita:{e:'💻',c:'nikita'}, Nastya:{e:'🩺',c:'nastya'}, Seryozha:{e:'🍢',c:'seryozha'}, Anya:{e:'📸',c:'anya'}, Polina:{e:'🐶',c:'polina'},
  All:{e:'🎉',c:'other'}, Seller:{e:'🛒',c:'other'}, Tourist:{e:'🧳',c:'other'}, Story:{e:'📖',c:'other'},
  Emma:{e:'👩‍💻',c:'other'}, Mum:{e:'👩',c:'other'}, Leo:{e:'👦',c:'other'}, Visitor:{e:'🧳',c:'other'}, Guest:{e:'🧑',c:'other'}, Chef:{e:'👨‍🍳',c:'other'}, Waiter:{e:'🤵',c:'other'}, Client:{e:'💁‍♀️',c:'other'}, Coach:{e:'🏋️',c:'other'}
};
const PITCH = {Nikita:1, Nastya:1.25, Seryozha:.8, Anya:1.35, Polina:1.6, Tourist:1.1, Seller:.95, All:1, Story:1, Emma:1.2, Mum:1.15, Leo:1.5, Visitor:1.05, Guest:.95, Chef:.85, Waiter:1.05, Client:1.25, Coach:.9};
const DN = {Nikita:'Никита', Nastya:'Настя', Seryozha:'Серёжа', Anya:'Аня', Polina:'Полина', Seller:'продавец', Tourist:'турист', Emma:'Эмма', Mum:'мама', Leo:'Лео', Visitor:'посетитель', Guest:'гость', Chef:'шеф', Waiter:'официант', Client:'клиентка', Coach:'тренер', Story:'диктор', All:'все'};

const TEAM = [
  {n:'Nikita', ru:'Никита', role:'программист', facts:[['Откуда','Верхняя Пышма'],['Работа','программист'],['Пара','Настя']],
   about:"Hi! I'm Nikita. I'm from Verkhnyaya Pyshma. I'm a programmer. Nastya is my girlfriend. I love Bueno, board games and long walks."},
  {n:'Nastya', ru:'Настя', role:'врач', facts:[['Откуда','Курган'],['Работа','педиатр, нутрициолог'],['Учёба','ординатура, эндокринология'],['Пара','Никита']],
   about:"Hi! I'm Nastya. I'm from Kurgan. I'm a pediatrician and a nutritionist, and I study endocrinology. Nikita is my boyfriend. I love Bueno, board games and long walks."},
  {n:'Seryozha', ru:'Серёжа', role:'ресторатор', facts:[['Кто','армянин'],['Работа','ресторанный бизнес'],['Машина','Kia K5'],['Суперсила','шашлык'],['Жена','Аня']],
   about:"Hi! I'm Seryozha. I'm Armenian. I work in the restaurant business and I've got a Kia K5. Anya is my wife. I love cooking shashlik, board games and Bueno."},
  {n:'Anya', ru:'Аня', role:'бровист и фуд-блогер', facts:[['Откуда','Таборы'],['Работа','бровист, фуд-блогер'],['Любит','спорт'],['Муж','Серёжа']],
   about:"Hi! I'm Anya. I'm from Tabory. I'm a brow artist and a food blogger. I love sport! Seryozha is my husband. I love Bueno, board games and long walks."},
  {n:'Polina', ru:'Полина', role:'шпиц', facts:[['Кто','шпиц'],['Семья','Аня и Серёжа'],['Любит','прогулки и мясо']],
   about:"Woof! I'm Polina. I'm a Spitz. Anya and Seryozha are my family. I love walks and... meat!"}
];

const FLOW = [
  {m:10, t:'Разминка', d:'Повторяем прошлый урок и слушаем домашние голосовые.'},
  {m:15, t:'Слова', d:'Новые слова вслух, с озвучкой и проверкой друг друга.'},
  {m:10, t:'Грамматика', d:'Одно правило на примерах про нас.'},
  {m:10, t:'Диалог', d:'Читаем по ролям, потом меняемся ролями.'},
  {m:10, t:'Упражнения', d:'Прямо на сайте: кто больше наберёт.'},
  {m:30, t:'Говорим', d:'Игра или сценка. Только английский.', talk:true},
  {m:5, t:'Итог', d:'Домашка и одно новое слово от каждого.'}
];

const FLOW_S = [
  {m:10, t:'Слова', d:'Слушаем, повторяем вслух, потом проверяем себя со скрытым переводом.'},
  {m:5, t:'Грамматика', d:'Одно правило и примеры.'},
  {m:10, t:'Тренажёр диалога', d:'Повторяем за диктором, потом играем роль: сайт говорит за остальных.', talk:true},
  {m:5, t:'Упражнения', d:'Проверка прямо на сайте.'},
  {m:10, t:'Говорю вслух', d:'Монолог на тему урока, лучше с записью голосового.', talk:true}
];
const PLAN_G = 'Вместе: разминка 10 минут, слова 15, грамматика 10, диалог по ролям 10, упражнения 10, разговорная игра 30 и итог 5.';
const PLAN_S = 'Сам: слова 10 минут — слушайте и повторяйте, потом скройте перевод; грамматика 5; тренажёр диалога 10 — сначала за диктором, потом в роли; упражнения 5; говорю вслух 10.';
const PLAN_GB = 'Вместе: слова вслух по кругу 5 минут, диалог по ролям 5, упражнения по очереди 5 и сценка от ведущего 15.';

const RULES = [
  ['В игре — только английский.','Сказал слово по-русски — кладёшь фишку в общий банк. На выпускном банк превращается в Буэно.'],
  ['Ошибаться — нормально.','A1 — это про смелость, а не про идеальную грамматику. Главное — говорить.'],
  ['Домашку сдаём голосом.','Голосовые в общий чат тренируют речь лучше, чем тетрадь.'],
  ['Ведущий — по очереди.','Он включает озвучку, следит за временем и раздаёт роли в диалоге.']
];

/* storage */
const KEY = 'bueno-english-a1';
const PEOPLE = ['Nikita', 'Nastya', 'Seryozha', 'Anya'];
const RU = {Nikita:'Никита', Nastya:'Настя', Seryozha:'Серёжа', Anya:'Аня'};
const state = {me:null, people:{}, legacy:null, meets:{}, format:'solo', rate:0.9, hideRu:false, showTr:true};
try {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    const s = JSON.parse(raw);
    if (s && typeof s === 'object') {
      if (s.done || s.scores) { s.legacy = {done: s.done || {}, scores: s.scores || {}}; delete s.done; delete s.scores; }
      Object.assign(state, s);
    }
  }
} catch (e) {}
const onlyBonusKeys = o => { const r = {}; Object.keys(o || {}).forEach(k => { if (k.indexOf(':') > 0) r[k] = o[k]; }); return r; };
PEOPLE.forEach(p => { const d = state.people[p] || {}; state.people[p] = {done: d.done || {}, scores: d.scores || {}, pdone: onlyBonusKeys(d.pdone), pscores: onlyBonusKeys(d.pscores)}; });
if (state.format !== 'group') state.format = 'solo';
if (!state.meets || typeof state.meets !== 'object') state.meets = {};
if (state.me && !PEOPLE.includes(state.me)) state.me = null;
function save(){ try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
const EMPTY = {done:{}, scores:{}, pdone:{}, pscores:{}};
const P = () => state.me ? state.people[state.me] : EMPTY;
function plural(n, f){ const a = Math.abs(n) % 100, b = a % 10; if (a > 10 && a < 20) return f[2]; if (b > 1 && b < 5) return f[1]; if (b === 1) return f[0]; return f[2]; }

/* helpers */
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $ = (s, r) => (r || document).querySelector(s);
const view = $('#view');
const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function shuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
const norm = s => String(s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[.!?,;:]+$/g, '').replace(/\s+/g, ' ').trim();
let toastTimer;
function toast(msg){ const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2800); }

/* speech */
const synth = ('speechSynthesis' in window) ? window.speechSynthesis : null;
let voice = null;
function pickVoice(){
  if (!synth) return;
  let vs = []; try { vs = synth.getVoices() || []; } catch (e) {}
  const en = vs.filter(v => /^en([-_]|$)/i.test(v.lang));
  voice = en.find(v => /gb/i.test(v.lang) && /google|natural|daniel|serena|kate|libby|sonia|ryan/i.test(v.name))
       || en.find(v => /gb/i.test(v.lang))
       || en.find(v => /us/i.test(v.lang) && /google|natural|samantha|aria|jenny/i.test(v.name))
       || en.find(v => /us/i.test(v.lang)) || en[0] || null;
}
if (synth) { pickVoice(); try { synth.addEventListener('voiceschanged', pickVoice); } catch (e) { synth.onvoiceschanged = pickVoice; } }
const clean = t => String(t).replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/\.\.\./g, ', ').replace(/\s+/g, ' ').trim();
function utter(text, pitch){
  const u = new SpeechSynthesisUtterance(clean(text));
  u.lang = voice ? voice.lang : 'en-GB'; if (voice) u.voice = voice;
  u.rate = state.rate; u.pitch = pitch || 1; return u;
}
function noVoice(){ toast('Этот браузер не озвучивает текст. Попробуйте Chrome или Safari.'); }
function speak(text, pitch){ if (!synth) return noVoice(); try { synth.cancel(); synth.speak(utter(text, pitch)); } catch (e) { noVoice(); } }
function stopSpeech(){ if (synth) try { synth.cancel(); } catch (e) {} }

const I_SAY = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 0 1 0 7M18.6 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
function sayBtn(text, pitch, label){
  return `<button class="say" type="button" data-say="${esc(text)}"${pitch && pitch !== 1 ? ` data-pitch="${pitch}"` : ''} aria-label="Послушать: ${esc(label || text)}">${I_SAY}</button>`;
}
const rateLabel = () => state.rate < 0.85 ? 'Скорость: медленно' : 'Скорость: обычная';

/* progress */
const doneCount = (d) => LESSONS.filter(l => (d || P()).done[l.n]).length;
const nextLesson = () => LESSONS.find(l => !P().done[l.n]) || null;
const points = p => { const d = state.people[p]; return Object.values(d.scores).concat(Object.values(d.pscores)).reduce((s, x) => s + (+x || 0), 0); };
const maxPoints = p => { const d = state.people[p];
  return Object.keys(d.scores).reduce((s, n) => s + (LESSONS[n - 1] ? LESSONS[n - 1].q.length : 0), 0)
       + Object.keys(d.pscores).reduce((s, key) => { const x = key.split(':'), l = TRACKS[x[0]] && TRACKS[x[0]].L[x[1] - 1]; return s + (l ? l.q.length : 0); }, 0); };
const pCount = p => Object.keys(state.people[p].pdone).length;
const recOf = (p, c) => c.kind === 'p' ? state.people[p].pdone : state.people[p].done;
const keyOf = c => c.kind === 'p' ? c.owner + ':' + c.k : c.n;
function finishHtml(){
  const key = keyOf(cur), mineDone = !!(state.me && recOf(state.me, cur)[key]);
  const mine = `<button type="button" class="btn big${mineDone ? '' : ' primary'}" data-act="done">${mineDone ? 'Пройден. Снять отметку' : `Отметить пройденным${state.me ? ': ' + RU[state.me] : ''}`}</button>`;
  if (state.format === 'solo') return mine;
  const all = PEOPLE.every(p => recOf(p, cur)[key]);
  return mine + `<button type="button" class="btn big" data-act="done-all"${all ? ' disabled' : ''}>${all ? 'Пройден всеми четырьмя ✓' : 'Отметить для всех четверых'}</button>`;
}
function report(){
  const rows = PEOPLE.filter(p => doneCount(state.people[p]) || pCount(p) || maxPoints(p)).map(p => {
    const d = state.people[p], dc = doneCount(d), mp = maxPoints(p);
    return `${RU[p]}: ${dc} из ${TOTAL} уроков${pCount(p) ? `, бонусных ${pCount(p)}` : ''}${mp ? `, упражнения ${points(p)} из ${mp}` : ''}`;
  });
  return 'Bueno English Club 🍫\n' + (rows.length ? rows.join('\n') : 'Пока без отметок');
}

/* who is studying */
let lastFocus = null;
function updateChip(){
  const c = $('#me-chip'); if (!c) return;
  if (state.me) { c.innerHTML = `<span aria-hidden="true">${SPK[state.me].e}</span><span>${RU[state.me]}</span>`; c.setAttribute('aria-label', `Сейчас занимается ${RU[state.me]}. Сменить`); }
  else { c.innerHTML = '<span>Кто вы?</span>'; c.setAttribute('aria-label', 'Выбрать, кто занимается'); }
}
function openPicker(){
  closePicker();
  lastFocus = document.activeElement;
  const el = document.createElement('div');
  el.className = 'pk-back'; el.id = 'picker';
  el.innerHTML = `<div class="pk" role="dialog" aria-modal="true" aria-labelledby="pk-t">
    <h2 id="pk-t">Кто сейчас занимается?</h2>
    <p>Отметки уроков и баллы за упражнения сохраняются под этим именем. Сменить можно в любой момент — кнопкой с именем вверху.</p>
    <div class="pk-grid">${PEOPLE.map(p => `<button type="button" class="pk-btn c-${SPK[p].c}${state.me === p ? ' on' : ''}" data-pick="${p}"><span class="av" aria-hidden="true">${SPK[p].e}</span><span>${RU[p]}</span></button>`).join('')}</div>
    ${state.me ? '<button type="button" class="btn small" data-act="pk-close">Отмена</button>' : ''}
  </div>`;
  document.body.appendChild(el);
  const first = el.querySelector('.pk-btn.on') || el.querySelector('.pk-btn'); if (first) first.focus();
}
function closePicker(){ const el = $('#picker'); if (el) { el.remove(); if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {} } }
function pick(p){
  if (!PEOPLE.includes(p)) return;
  state.me = p;
  if (state.legacy) {
    const d = state.people[p];
    if (!Object.keys(d.done).length && !Object.keys(d.scores).length) { d.done = state.legacy.done; d.scores = state.legacy.scores; }
    state.legacy = null;
  }
  save(); closePicker(); updateChip(); rerender();
  toast(`Занимается ${RU[p]} ${SPK[p].e}`);
}

/* HOME */
let firstPaint = true;
function flowCol(title, arr, note){
  return `<div class="format"><h3>${title}</h3><p class="note">${note}</p>
    <div class="tbar" aria-hidden="true">${arr.map(f => `<span style="--m:${f.m}" class="${f.talk ? 'talk' : ''}${f.m < 10 ? ' short' : ''}">${f.m}</span>`).join('')}</div>
    <ol class="steps">${arr.map(f => `<li class="${f.talk ? 'talk' : ''}"><b>${f.t}</b><span class="min">${f.m} мин</span><p>${f.d}</p></li>`).join('')}</ol></div>`;
}
function trackCard(p){
  const T = TRACKS[p], d = P(), pc = T.L.filter((l, i) => d.pdone[p + ':' + (i + 1)]).length;
  return `<article class="track c-${SPK[p].c}">
    <div class="thead"><span class="av" aria-hidden="true">${SPK[p].e}</span><div><h3>${esc(T.en)}</h3><p>Работа ${RU_GEN[p]}. ${esc(T.ru)}</p></div><span class="tcount">${state.me ? `${pc} из ${T.L.length}` : ''}</span></div>
    <ol class="lessons">${T.L.map((l, i) => {
      const k = i + 1, key = p + ':' + k, sc = d.pscores[key];
      return `<li><a class="lrow${d.pdone[key] ? ' done' : ''}" href="#/p/${p}/${k}"><span class="ln">${k}</span><span class="lt"><b>${esc(l.t)}</b><small>${esc(l.ru)}. После модуля ${k}</small></span><span class="lmark">${d.pdone[key] ? '✓' : (sc != null ? `${sc}/${l.q.length}` : '')}</span></a></li>`;
    }).join('')}</ol>
  </article>`;
}
function renderHome(){
  const me = P(), dc = doneCount(), nx = nextLesson();
  const wafer = COURSE.map(m => `<div class="wgroup" role="group" aria-label="Модуль ${m.n}">${m.L.map(l =>
    `<a class="seg${me.done[l.n] ? ' done' : ''}${nx && nx.n === l.n ? ' next' : ''}" href="#/lesson/${l.n}" style="--i:${l.n}" title="Урок ${l.n}: ${esc(l.t)}" aria-label="Урок ${l.n}: ${esc(l.t)}${me.done[l.n] ? ', пройден' : ''}"><span>${l.n}</span></a>`).join('')}</div>`).join('');
  const who = state.me ? RU[state.me] + ': ' : '';
  const cap = dc === 0 ? `${who}каждая долька — урок, пройденные покрываются шоколадом.` : `${who}пройдено ${dc} из ${TOTAL}. Каждая долька — урок.`;
  const nm = COURSE.find(m => !state.meets[m.n]);
  const cta = (nx
    ? `<a class="btn primary big" href="#/lesson/${nx.n}">${dc ? 'Продолжить' : 'Начать'}: урок ${nx.n}</a>`
    : `<p class="grad">Все ${TOTAL} уроков пройдены. Вы — A1! 🎓</p>`)
    + (nm ? `<a class="btn on-dark big" href="#/meet/${nm.n}">Сценарий встречи ${nm.n}</a>` : '');

  const modules = COURSE.map(m => `<article class="module">
    <div class="mhead"><span class="mnum">${m.n}</span><div><h3>${esc(m.en)}</h3><p>${esc(m.ru)}. Недели ${2*m.n-1}–${2*m.n}</p></div><span class="micon" aria-hidden="true">${m.icon}</span></div>
    <ol class="lessons">${m.L.map(l => {
      const sc = me.scores[l.n];
      const mark = me.done[l.n] ? '✓' : (sc != null ? `${sc}/${l.q.length}` : '');
      return `<li><a class="lrow${me.done[l.n] ? ' done' : ''}" href="#/lesson/${l.n}"><span class="ln">${l.n}</span><span class="lt"><b>${esc(l.t)}</b><small>${esc(l.ru)}</small></span><span class="lmark">${mark}</span></a></li>`;
    }).join('')}</ol>
    <div class="mfoot"><a class="btn small" href="#/review/${m.n}">Повторение модуля</a><a class="btn small${state.meets[m.n] ? '' : ' meet'}" href="#/meet/${m.n}">${state.meets[m.n] ? 'Встреча проведена ✓' : 'Встреча офлайн'}</a></div>
  </article>`).join('');

  view.innerHTML = `
  <section class="hero${firstPaint && !reduce ? ' anim' : ''}"><div class="wrap">
    <h1>Английский A1 на четверых и одного шпица</h1>
    <p class="lead">Двадцать четыре урока про нашу жизнь: работу, шашлык, настолки, прогулки по Екатеринбургу и, конечно, Буэно. Уроки одинаковые для всех: каждый проходит их сам, а когда собираемся офлайн — играем, разыгрываем сценки и повторяем вместе.</p>
    <div class="wafer">${wafer}</div>
    <p class="wcap">${cap}</p>
    <div class="hero-cta">${cta}</div>
  </div></section>

  <section class="wrap block">
    <h2>Как мы занимаемся</h2>
    <p class="sub">Все уроки одинаковые для всех четверых. Основной формат — сам: два урока в неделю, около 40 минут каждый. Когда собираемся офлайн, берём сценарий встречи после модуля или проводим любой урок вместе — формат переключается в начале урока.</p>
    <div class="formats">
      ${flowCol('Сам, 40 минут', FLOW_S, 'Основной формат. Дома, в дороге, в перерыве — нужны наушники и возможность говорить вслух.')}
      ${flowCol('Вместе, 90 минут', FLOW, 'Любой урок на офлайн-встрече: один общий экран или у каждого свой телефон.')}
    </div>
    <p class="note">Встреча после модуля — около двух часов: разминка, повторение модуля, игры и сценки про работу каждого. Сценарии — в программе, у каждого модуля.</p>
  </section>

  <section class="wrap block">
    <h2>Программа</h2>
    <p class="sub">Шесть модулей по четыре урока. После каждого модуля — повторение: все упражнения модуля вперемешку.</p>
    <div class="modules">${modules}</div>
  </section>

  <section class="wrap block">
    <h2>Бонус: наша работа</h2>
    <p class="sub">Четыре темы про работу каждого из нас — тоже одинаковые для всех. Они по желанию: проходите сами, когда хочется больше практики. На офлайн-встречах эти сценки ведёт тот, чья это работа.</p>
    <div class="tracks">${PEOPLE.map(trackCard).join('')}</div>
  </section>

  <section class="wrap block">
    <h2>Прогресс команды</h2>
    <p class="sub">Каждый отмечает уроки под своим именем. Занимаетесь вместе с одного экрана — в конце урока жмите «Отметить для всех четверых». Каждый со своего телефона — копируйте отчёт в общий чат: прогресс хранится на устройстве, и здесь видно только то, что отмечено на этом.</p>
    <ul class="board">${PEOPLE.map(p => {
      const d = state.people[p], c = doneCount(d), mp = maxPoints(p), pts = points(p);
      return `<li class="brow c-${SPK[p].c}${state.me === p ? ' me' : ''}">
        <span class="av" aria-hidden="true">${SPK[p].e}</span>
        <div class="bmain"><div class="bname"><b>${RU[p]}</b>${state.me === p ? '<small>сейчас занимается</small>' : ''}</div>
          <div class="mini" aria-hidden="true">${LESSONS.map(l => `<i class="${d.done[l.n] ? 'on' : ''}"></i>`).join('')}</div></div>
        <span class="bstat"><b>${c} из ${TOTAL}</b><small>бонус ${pCount(p)} из ${BONUS_TOTAL}${mp ? `, ${pts} из ${mp} ${plural(mp, ['балла','баллов','баллов'])}` : ''}</small></span>
      </li>`;
    }).join('')}</ul>
    <div class="rep-tools"><button type="button" class="btn" data-act="report">Скопировать отчёт для чата</button></div>
    <div class="rep-out"></div>
  </section>

  <section class="wrap block">
    <h2>Правила клуба</h2>
    <ul class="rules">${RULES.map(r => `<li><b>${r[0]}</b><span>${r[1]}</span></li>`).join('')}</ul>
  </section>

  <footer class="wrap foot">
    <p>Прогресс хранится на этом устройстве, отдельно для Никиты, Насти, Серёжи и Ани.</p>
    <button class="btn small" type="button" data-act="reset">Сбросить прогресс всех</button>
  </footer>`;
  firstPaint = false;
}

/* QUIZ */
function mountQuiz(box, items, onDone){
  const res = new Array(items.length).fill(null);
  box.innerHTML = `<ol class="quiz">${items.map((it, i) => {
    const q = it[0], a = it[1];
    if (Array.isArray(a)) {
      const opts = shuffle(a.map((o, j) => ({o, ok: j === 0})));
      return `<li class="qi" data-i="${i}"><p class="qq">${esc(q)}</p><div class="opts">${opts.map(x => `<button type="button" class="opt" data-ok="${x.ok ? 1 : 0}">${esc(x.o)}</button>`).join('')}</div><p class="fb" aria-live="polite"></p></li>`;
    }
    const first = a.split('|')[0];
    const input = `<input class="gap" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Ответ для пропуска" size="${Math.max(5, first.length + 2)}">`;
    const parts = esc(q).split('___');
    const qq = parts.length > 1 ? parts[0] + input + parts.slice(1).join('___') : parts[0] + ' ' + input;
    return `<li class="qi" data-i="${i}"><p class="qq">${qq}</p><button type="button" class="btn small check">Проверить</button><p class="fb" aria-live="polite"></p></li>`;
  }).join('')}</ol><div class="qscore" aria-live="polite"></div>`;

  function finish(){
    if (!res.every(r => r !== null)) return;
    const sc = res.filter(Boolean).length, n = items.length;
    const msg = sc === n ? 'Идеально! Заслуженная долька Буэно 🍫' : sc >= n * 0.6 ? 'Хорошо. Разберите ошибки вслух всей группой.' : 'Перечитайте грамматику и нажмите «Начать заново».';
    $('.qscore', box).innerHTML = `<b>${sc} из ${n}.</b> ${msg}`;
    if (onDone) onDone(sc, n);
  }
  function check(li){
    const i = +li.dataset.i; if (res[i] !== null) return;
    const inp = $('.gap', li), fb = $('.fb', li);
    const val = norm(inp.value);
    if (!val) { fb.textContent = 'Впишите ответ в пропуск.'; inp.focus(); return; }
    const answers = items[i][1].split('|');
    const ok = answers.some(x => norm(x) === val);
    res[i] = ok; inp.readOnly = true; $('.check', li).disabled = true;
    li.classList.add(ok ? 'is-ok' : 'is-bad'); inp.classList.add(ok ? 'right' : 'wrong');
    fb.textContent = ok ? 'Верно!' : 'Правильный ответ: ' + answers[0];
    finish();
  }
  box.onclick = e => {
    const opt = e.target.closest('.opt');
    if (opt) {
      const li = opt.closest('.qi'), i = +li.dataset.i; if (res[i] !== null) return;
      const ok = opt.dataset.ok === '1'; res[i] = ok;
      li.querySelectorAll('.opt').forEach(b => { b.disabled = true; if (b.dataset.ok === '1') b.classList.add('right'); });
      if (!ok) opt.classList.add('wrong');
      li.classList.add(ok ? 'is-ok' : 'is-bad');
      $('.fb', li).textContent = ok ? 'Верно!' : 'Правильный ответ: ' + items[i][1][0];
      finish(); return;
    }
    const chk = e.target.closest('.check'); if (chk) check(chk.closest('.qi'));
  };
  box.onkeydown = e => { if (e.key === 'Enter' && e.target.classList.contains('gap')) { e.preventDefault(); check(e.target.closest('.qi')); } };
}

/* LESSON */
function alphabet(){
  return `<div class="abc"><h3>Алфавит</h3><p class="note">Нажмите на букву, чтобы услышать её название. Потренируйтесь диктовать имена: N, I, K, I, T, A.</p><div class="abc-grid">${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(ch => `<button type="button" class="abc-l" data-say="${ch}." aria-label="Буква ${ch}">${ch}</button>`).join('')}</div></div>`;
}
const lessonOf = c => c.kind === 'p' ? TRACKS[c.owner].L[c.k - 1] : LESSONS[c.n - 1];
function mountLessonQuiz(){
  const c = cur, l = lessonOf(c);
  mountQuiz($('.quizbox', view), l.q, sc => {
    let rec, key;
    if (!state.me) return;
    rec = c.kind === 'p' ? P().pscores : P().scores; key = keyOf(c);
    const b = rec[key]; if (b == null || sc > b) { rec[key] = sc; save(); }
  });
}
function trainerHtml(l){
  const cnt = {}; l.d.forEach(x => { cnt[x[0]] = (cnt[x[0]] || 0) + 1; });
  let roles = Object.keys(cnt).filter(r => cnt[r] >= 2 && !['Story', 'All', 'Polina'].includes(r));
  const first = cur.kind === 'p' ? cur.owner : state.me;
  if (first && roles.includes(first)) roles = [first].concat(roles.filter(r => r !== first));
  return `<div class="trainer">
    <p class="tr-head"><b>Тренажёр речи.</b> Повторяйте за диктором или возьмите роль: сайт озвучит остальных, а вашу реплику подскажет по-русски — скажите её по-английски вслух.</p>
    <div class="tr-btns"><button type="button" class="btn small" data-trs="shadow">Повторять за диктором</button>${roles.map(r => `<button type="button" class="btn small" data-trs="role" data-role="${esc(r)}">Роль: ${esc(DN[r] || r)}</button>`).join('')}</div>
    <div class="tr-live" hidden><p class="tr-status" aria-live="polite"></p><div class="tr-ctrl"></div></div>
  </div>`;
}
function bonusGroupTask(owner, l){
  const others = []; l.d.forEach(x => { if (x[0] !== owner && !['Story', 'All', 'Polina'].includes(x[0]) && !others.includes(x[0])) others.push(x[0]); });
  const list = others.map(r => DN[r] || r).join(', ');
  return `Сценку ведёт ${RU[owner]} — это ${RU_GEN[owner] === 'Никиты' || RU_GEN[owner] === 'Серёжи' ? 'его' : 'её'} работа. Сначала ${RU[owner]} играет себя в диалоге, остальные по очереди берут роль${others.length > 1 ? 'и' : ''}: ${list}. Потом ведущий придумывает похожую ситуацию из своей настоящей работы, а остальные выкручиваются по-английски. В конце каждый минуту побудет на месте ${RU_GEN[owner]}.`;
}
function renderLesson(){
  const c = cur, l = lessonOf(c), personal = c.kind === 'p';
  const solo = state.format === 'solo';
  let crumbs, lnum, prevA = '', nextA = '', extra = '';
  if (!personal) {
    const n = c.n, m = l.m, prev = LESSONS[n - 2], next = LESSONS[n];
    crumbs = `<span>Модуль ${m.n}. ${esc(m.en)}</span>`;
    lnum = `Урок ${n} из ${TOTAL}`;
    if (prev) prevA = `<a class="pg prev" href="#/lesson/${prev.n}"><small>Предыдущий</small>${prev.n}. ${esc(prev.t)}</a>`;
    nextA = next ? `<a class="pg next" href="#/lesson/${next.n}"><small>Следующий</small>${next.n}. ${esc(next.t)}</a>` : `<a class="pg next" href="#/"><small>Курс завершён</small>К плану</a>`;
    if (n === m.to) extra = `<a class="btn big" href="#/review/${m.n}">Повторение модуля ${m.n}</a>`;
  } else {
    const T = TRACKS[c.owner], k = c.k;
    crumbs = `<span>Бонус. ${esc(T.en)}</span>`;
    lnum = `Бонусный урок ${k} из ${T.L.length} про работу ${RU_GEN[c.owner]}. После модуля ${k}`;
    if (k > 1) prevA = `<a class="pg prev" href="#/p/${c.owner}/${k - 1}"><small>Предыдущий</small>${k - 1}. ${esc(T.L[k - 2].t)}</a>`;
    nextA = k < T.L.length ? `<a class="pg next" href="#/p/${c.owner}/${k + 1}"><small>Следующий</small>${k + 1}. ${esc(T.L[k].t)}</a>` : `<a class="pg next" href="#/"><small>Трек завершён</small>К плану</a>`;
  }
  const fmt = `<div class="fmt" role="group" aria-label="Формат урока"><button type="button" data-fmt="solo" aria-pressed="${solo}">Сам, 40 минут</button><button type="button" data-fmt="group" aria-pressed="${!solo}">Вместе, ${personal ? '30' : '90'} минут</button></div><p class="fmt-plan">${solo ? PLAN_S : (personal ? PLAN_GB : PLAN_G)}</p>`;
  const groupTask = personal ? bonusGroupTask(c.owner, l) : l.s;
  const speakSec = solo
    ? `<section id="s-speak" class="sec speak"><div class="speak-in"><span class="dice" aria-hidden="true">🎙️</span><div><h2>Говорю вслух</h2><p class="speak-meta">10 минут, вслух. Лучше записать голосовое</p><p>${esc(l.ss)}</p></div></div></section>`
    : `<section id="s-speak" class="sec speak"><div class="speak-in"><span class="dice" aria-hidden="true">🎲</span><div><h2>${personal ? 'Сценка' : 'Говорим'}</h2><p class="speak-meta">${personal ? '15 минут, ведёт ' + RU[c.owner] : '30 минут, только английский'}</p><p>${esc(groupTask)}</p></div></div></section>`;
  view.innerHTML = `<article class="lesson wrap narrow">
    <nav class="crumbs" aria-label="Путь"><a href="#/">План</a><span aria-hidden="true">/</span>${crumbs}</nav>
    <header class="lhead">
      <p class="lnum">${lnum}</p>
      <h1>${esc(l.t)}</h1>
      <p class="lru">${esc(l.ru)}</p>
      <p class="goal"><b>После урока вы сможете</b> ${esc(l.goal)}</p>
      ${fmt}
    </header>
    <div class="jump" role="navigation" aria-label="Разделы урока">${[['words','Слова'],['grammar','Грамматика'],['dialog', solo ? 'Тренажёр диалога' : 'Диалог'],['quiz','Упражнения'],['speak', solo ? 'Говорю вслух' : 'Говорим'],['home','Домашка']].map(x => `<button type="button" data-jump="${x[0]}">${x[1]}</button>`).join('')}</div>

    <section id="s-words" class="sec">
      <div class="shead"><h2>Слова</h2><div class="tools">
        <button type="button" class="btn small" data-act="hide-ru" aria-pressed="${state.hideRu}">${state.hideRu ? 'Показать перевод' : 'Скрыть перевод'}</button>
        <button type="button" class="btn small" data-act="rate">${rateLabel()}</button>
      </div></div>
      <ul class="vocab${state.hideRu ? ' hide-ru' : ''}">${l.v.map(w => `<li>${sayBtn(w[0])}<span class="en">${esc(w[0])}</span><span class="ru" tabindex="0">${esc(w[1])}</span></li>`).join('')}</ul>
      <p class="note">${solo ? 'Нажимайте на динамик и повторяйте каждое слово вслух дважды. Потом скройте перевод и проверьте себя: нажмите на размытое слово, чтобы подсмотреть.' : 'Скройте перевод и проверьте себя: нажмите на размытое слово, чтобы подсмотреть.'}</p>
      ${l.abc ? alphabet() : ''}
    </section>

    <section id="s-grammar" class="sec"><h2>Грамматика</h2><div class="grammar">${l.g}</div></section>

    <section id="s-dialog" class="sec">
      <div class="shead"><h2>Диалог</h2><div class="tools">
        <button type="button" class="btn small" data-act="play">Слушать целиком</button>
        <button type="button" class="btn small" data-act="tr" aria-pressed="${!state.showTr}">${state.showTr ? 'Скрыть перевод' : 'Показать перевод'}</button>
      </div></div>
      ${trainerHtml(l)}
      <ol class="dialog${state.showTr ? '' : ' no-tr'}">${l.d.map((x, i) => {
        const s = SPK[x[0]] || {e:'💬', c:'other'};
        return `<li class="line c-${s.c}" data-i="${i}"><span class="who"><span class="av" aria-hidden="true">${s.e}</span><small>${esc(x[0])}</small></span><div class="bubble"><p class="en">${esc(x[1])}</p><p class="tr">${esc(x[2])}</p></div>${sayBtn(x[1], PITCH[x[0]], x[0] + ': ' + x[1])}</li>`;
      }).join('')}</ol>
      ${solo ? '' : '<p class="note">Прочитайте по ролям, затем поменяйтесь ролями и прочитайте ещё раз — уже без перевода.</p>'}
    </section>

    <section id="s-quiz" class="sec">
      <div class="shead"><h2>Упражнения</h2><button type="button" class="btn small" data-act="requiz">Начать заново</button></div>
      <div class="quizbox"></div>
    </section>

    ${speakSec}

    <section id="s-home" class="sec"><h2>Домашка</h2><p>${esc(l.h)}</p></section>

    <div class="finish" id="finish">${finishHtml()}${extra}</div>
    <nav class="pager" aria-label="Соседние уроки">${prevA}${nextA}</nav>
  </article>`;
  mountLessonQuiz();
}

function playDialog(){
  if (!synth) return noVoice();
  trStop();
  const l = lessonOf(cur);
  const lines = Array.from(view.querySelectorAll('.dialog .line'));
  const clear = () => lines.forEach(x => x.classList.remove('playing'));
  try {
    synth.cancel();
    l.d.forEach((x, i) => {
      const u = utter(x[1], PITCH[x[0]]);
      u.onstart = () => { clear(); if (lines[i]) lines[i].classList.add('playing'); };
      if (i === l.d.length - 1) u.onend = clear;
      synth.speak(u);
    });
  } catch (e) { noVoice(); }
}

/* TRAINER */
let tr = null;
const trLines = () => Array.from(view.querySelectorAll('.dialog .line'));
function trClear(){ trLines().forEach(x => x.classList.remove('playing', 'masked')); }
function trStatus(t){ const s = $('.tr-status', view); if (s) s.textContent = t; }
function trCtrl(btns){
  const c = $('.tr-ctrl', view); if (!c) return;
  c.innerHTML = btns.map(b => `<button type="button" class="btn small${b[2] ? ' primary' : ''}" data-trc="${b[0]}">${b[1]}</button>`).join('');
  const p = c.querySelector('.primary'); if (p) try { p.focus({preventScroll:true}); } catch (e) {}
}
function trStart(mode, role){
  stopSpeech(); trClear();
  tr = {mode, role, i:0, id:0};
  const live = $('.tr-live', view); if (live) live.hidden = false;
  view.querySelectorAll('[data-trs]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.trs === mode && (mode === 'shadow' || b.dataset.role === role))));
  trStep();
}
function trStop(){
  tr = null; stopSpeech(); trClear();
  const live = $('.tr-live', view); if (live) live.hidden = true;
  view.querySelectorAll('[data-trs]').forEach(b => b.removeAttribute('aria-pressed'));
}
function trSay(text, pitch, then){
  if (!tr) return;
  const id = ++tr.id;
  if (!synth) return;
  try {
    synth.cancel();
    const u = utter(text, pitch);
    if (then) u.onend = () => { if (tr && tr.id === id) then(); };
    synth.speak(u);
  } catch (e) {}
}
function trStep(){
  if (!tr) return;
  const l = lessonOf(cur), lines = trLines(), n = l.d.length;
  trClear();
  if (tr.i >= n) {
    trStatus(tr.mode === 'shadow' ? 'Готово! Прогоните диалог ещё раз — теперь без перевода.' : 'Готово! Попробуйте ещё раз быстрее или возьмите другую роль.');
    trCtrl([['restart', 'Ещё раз', true], ['stop', 'Закрыть']]);
    return;
  }
  const x = l.d[tr.i], li = lines[tr.i];
  if (li) { li.classList.add('playing'); try { li.scrollIntoView({block:'nearest', behavior: reduce ? 'auto' : 'smooth'}); } catch (e) {} }
  const pos = `Реплика ${tr.i + 1} из ${n}. `;
  if (tr.mode === 'shadow') {
    trStatus(pos + 'Послушайте и повторите вслух.');
    trCtrl([['next', 'Дальше', true], ['again', 'Послушать ещё раз'], ['stop', 'Стоп']]);
    trSay(x[1], PITCH[x[0]]);
  } else if (x[0] !== tr.role) {
    trStatus(pos + `Говорит ${DN[x[0]] || x[0]}...`);
    trCtrl([['next', 'Дальше'], ['stop', 'Стоп']]);
    trSay(x[1], PITCH[x[0]], () => { const id = tr.id; setTimeout(() => { if (tr && tr.id === id) { tr.i++; trStep(); } }, 450); });
  } else {
    if (li) li.classList.add('masked');
    stopSpeech(); tr.id++;
    trStatus(pos + `Ваша реплика. Скажите по-английски: «${x[2]}»`);
    trCtrl([['reveal', 'Показать ответ', true], ['stop', 'Стоп']]);
  }
}
function trReveal(){
  if (!tr) return;
  const l = lessonOf(cur), x = l.d[tr.i], li = trLines()[tr.i];
  if (li) li.classList.remove('masked');
  trStatus('Сравните со своим вариантом и повторите за диктором.');
  trCtrl([['next', 'Дальше', true], ['again', 'Послушать ещё раз'], ['stop', 'Стоп']]);
  trSay(x[1], PITCH[x[0]]);
}

/* REVIEW */
function renderReview(mn){
  const m = COURSE[mn - 1], nextM = COURSE[mn];
  view.innerHTML = `<article class="lesson wrap narrow">
    <nav class="crumbs" aria-label="Путь"><a href="#/">План</a><span aria-hidden="true">/</span><span>Модуль ${m.n}. ${esc(m.en)}</span></nav>
    <header class="lhead">
      <p class="lnum">Повторение модуля ${m.n}</p>
      <h1>${esc(m.en)}</h1>
      <p class="lru">${esc(m.ru)}: все упражнения уроков ${m.from}–${m.to} вперемешку.</p>
      <p class="goal">Устройте соревнование: отвечайте по очереди вслух, а кнопки нажимает ведущий.</p>
    </header>
    <section class="sec">
      <div class="shead"><h2>${m.L.reduce((s, l) => s + l.q.length, 0)} заданий</h2><button type="button" class="btn small" data-act="rereview">Перемешать заново</button></div>
      <div class="quizbox"></div>
    </section>
    <nav class="pager" aria-label="Дальше">
      <a class="pg prev" href="#/lesson/${m.to}"><small>Назад</small>Урок ${m.to}</a>
      ${nextM ? `<a class="pg next" href="#/lesson/${nextM.from}"><small>Следующий модуль</small>${nextM.from}. ${esc(nextM.L[0].t)}</a>` : `<a class="pg next" href="#/"><small>Курс завершён</small>К плану</a>`}
    </nav>
  </article>`;
  mountQuiz($('.quizbox', view), shuffle(m.L.flatMap(l => l.q)));
}

/* MEETUP */
function renderMeet(mn){
  const m = COURSE[mn - 1], prevM = COURSE[mn - 2], nextM = COURSE[mn];
  const games = m.L.map(l => `<li><b>${esc(l.t)}</b> <a href="#/lesson/${l.n}">урок ${l.n}</a><p>${esc(l.s)}</p></li>`).join('');
  const scenes = PEOPLE.map(p => { const l = TRACKS[p].L[mn - 1]; return `<li class="scene c-${SPK[p].c}"><span class="av" aria-hidden="true">${SPK[p].e}</span><div><b>Ведёт ${RU[p]}: ${esc(l.t)}</b><p>${esc(l.ru)}. <a href="#/p/${p}/${mn}">Открыть урок</a></p></div></li>`; }).join('');
  const steps = [
    ['Разминка', 15, `<p>Каждый по очереди минуту рассказывает по-английски, как прошли его уроки модуля и что было трудно. Остальные задают по одному вопросу.</p>`],
    ['Повторение модуля', 20, `<p>Открываем повторение на общем экране и отвечаем по кругу вслух. Ошибся — объясни правило, как понял, остальные помогают.</p><a class="btn small" href="#/review/${m.n}">Открыть повторение модуля ${m.n}</a>`],
    ['Игры', 45, `<p>Выберите две-три игры из уроков модуля. Правило банка действует: русское слово — фишка в банк.</p><ul class="games">${games}</ul>`],
    ['Сценки про работу', 25, `<p>Каждый ведёт пятиминутную сценку из бонусного урока про свою работу: играет себя, остальные — гостей, пациентов, клиентов и коллег.</p><ul class="scenes">${scenes}</ul>`],
    ['Итог', 10, `<p>Банк фишек превращается в Буэно. Каждый называет одно новое слово за вечер, и вы договариваетесь о следующей встрече — по-английски.</p>`]
  ];
  view.innerHTML = `<article class="lesson wrap narrow">
    <nav class="crumbs" aria-label="Путь"><a href="#/">План</a><span aria-hidden="true">/</span><span>Модуль ${m.n}. ${esc(m.en)}</span></nav>
    <header class="lhead">
      <p class="lnum">Встреча офлайн после модуля ${m.n}</p>
      <h1>Meetup: ${esc(m.en)}</h1>
      <p class="lru">Около двух часов вчетвером.</p>
      <p class="goal"><b>Что нужно:</b> общий экран (ноутбук или телевизор), фишки для банка — пуговицы, монетки, что угодно — и Буэно. Уроки модуля ${m.from}–${m.to} каждый проходит сам заранее.</p>
    </header>
    <ol class="meet-steps">${steps.map(x => `<li><h2>${x[0]}<span>${x[1]} мин</span></h2>${x[2]}</li>`).join('')}</ol>
    <div class="finish"><button type="button" class="btn big${state.meets[mn] ? '' : ' primary'}" data-act="meet-done">${state.meets[mn] ? 'Встреча проведена. Снять отметку' : 'Отметить встречу проведённой'}</button></div>
    <nav class="pager" aria-label="Соседние встречи">
      ${prevM ? `<a class="pg prev" href="#/meet/${prevM.n}"><small>Предыдущая встреча</small>${prevM.n}. ${esc(prevM.en)}</a>` : ''}
      ${nextM ? `<a class="pg next" href="#/meet/${nextM.n}"><small>Следующая встреча</small>${nextM.n}. ${esc(nextM.en)}</a>` : `<a class="pg next" href="#/"><small>Последняя встреча</small>К плану</a>`}
    </nav>
  </article>`;
}

/* CARDS */
const cards = {mod:'0', dir:'en', deck:[], total:0, known:0, flipped:false};
function buildDeck(){
  const v = cards.mod, words = [];
  if (v.indexOf('p:') === 0) { const o = v.slice(2); TRACKS[o].L.forEach((l, i) => l.v.forEach(w => words.push({en:w[0], ru:w[1], from:`Бонус. ${TRACKS[o].en}, урок ${i + 1}`}))); }
  else { const src = v !== '0' ? COURSE[+v - 1].L : LESSONS; src.forEach(l => l.v.forEach(w => words.push({en:w[0], ru:w[1], from:`Урок ${l.n}`}))); }
  cards.deck = shuffle(words); cards.total = words.length; cards.known = 0; cards.flipped = false;
}
function renderCards(){
  buildDeck();
  view.innerHTML = `<section class="page wrap narrow">
    <header class="lhead"><h1>Карточки</h1>
      <p class="lru">Все слова курса. Нажмите на карточку, чтобы перевернуть, и честно отметьте, знаете ли вы слово.</p></header>
    <div class="cfilters">
      <label class="sel">Слова<select id="cmod"><option value="0">Все модули</option>${COURSE.map(m => `<option value="${m.n}">Модуль ${m.n}. ${esc(m.en)}</option>`).join('')}<optgroup label="Бонус: наша работа">${PEOPLE.map(p => `<option value="p:${p}">${esc(TRACKS[p].en)}</option>`).join('')}</optgroup></select></label>
      <button type="button" class="btn" data-act="dir">${cards.dir === 'en' ? 'Английский → русский' : 'Русский → английский'}</button>
    </div>
    <div class="cstage"></div>
  </section>`;
  const sel = $('#cmod', view); sel.value = cards.mod;
  sel.onchange = () => { cards.mod = sel.value; buildDeck(); drawCard(); };
  drawCard();
}
function drawCard(){
  const st = $('.cstage', view); if (!st) return;
  const c = cards.deck[0];
  if (!c) {
    st.innerHTML = `<div class="cdone"><p class="big" aria-hidden="true">🍫</p><h2>Колода пройдена</h2><p>Выучено ${cards.known} из ${cards.total}. Отличная работа!</p><button type="button" class="btn primary" data-act="restart">Пройти ещё раз</button></div>`;
    return;
  }
  const en = cards.dir === 'en';
  const front = en ? c.en : c.ru, back = en ? c.ru : c.en;
  st.innerHTML = `<div class="card${cards.flipped ? ' flipped' : ''}" role="button" tabindex="0" data-act="flip" aria-label="Карточка: ${esc(front)}. Нажмите, чтобы перевернуть">
      <div class="card-in">
        <div class="face front"><span class="clabel">${en ? 'English' : 'Русский'}</span><span class="cword">${esc(front)}</span><span class="cfrom">${esc(c.from)}</span></div>
        <div class="face back" aria-live="polite"><span class="clabel">${en ? 'Русский' : 'English'}</span><span class="cword">${cards.flipped ? esc(back) : ''}</span></div>
      </div>
    </div>
    <div class="cctrl"><button type="button" class="btn" data-act="again">Ещё раз</button>${sayBtn(c.en)}<button type="button" class="btn primary" data-act="know">Знаю</button></div>
    <p class="ccount">Осталось ${cards.deck.length}. Выучено ${cards.known} из ${cards.total}.</p>
    <p class="note" style="text-align:center">Клавиши: пробел — перевернуть, стрелка вправо — знаю, влево — ещё раз.</p>`;
}
function flipCard(){
  const card = $('.card', view), c = cards.deck[0]; if (!card || !c) return;
  cards.flipped = !cards.flipped;
  const back = cards.dir === 'en' ? c.ru : c.en;
  $('.back .cword', card).textContent = back;
  card.classList.toggle('flipped', cards.flipped);
}
function cardKnow(){ if (!cards.deck.length) return; cards.deck.shift(); cards.known++; cards.flipped = false; drawCard(); }
function cardAgain(){ if (!cards.deck.length) return; cards.deck.push(cards.deck.shift()); cards.flipped = false; drawCard(); }

/* TEAM */
function renderTeam(){
  view.innerHTML = `<section class="page wrap">
    <header class="lhead narrow"><h1>Команда</h1>
      <p class="lru">Пятеро героев курса. Все диалоги и упражнения — про вас, поэтому слова сразу пригодятся в жизни.</p>
      <p class="goal">Детали в текстах — во сколько кто встаёт, сколько тренировок в неделю, куда ездили — придуманы для практики. Нашли неправду? Исправьте её вслух по-английски: No, I don't get up at seven. I get up at nine. Это лучшее упражнение.</p>
      <p class="common">Все пятеро любят долгие прогулки, четверо — Буэно и настолки. Полина — прогулки и мясо.</p>
    </header>
    <div class="team">${TEAM.map(p => {
      const s = SPK[p.n];
      return `<article class="person c-${s.c}">
        <div class="phead"><span class="av" aria-hidden="true">${s.e}</span><div><h2>${esc(p.n)}</h2><p>${esc(p.ru)}, ${esc(p.role)}</p></div></div>
        <dl>${p.facts.map(f => `<dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd>`).join('')}</dl>
        <div class="about">${sayBtn(p.about, PITCH[p.n], p.n)}<p>${esc(p.about)}</p></div>
        ${TRACKS[p.n] ? `<a class="btn small" href="#/p/${p.n}/1">Бонус про работу: ${esc(TRACKS[p.n].en)}</a>` : ''}
      </article>`;
    }).join('')}</div>
    <p class="note">К уроку 5 каждый рассказывает свою карточку наизусть — и добавляет два своих факта.</p>
  </section>`;
}

/* ROUTER */
let cur = {type:'home', n:0};
function refreshFinish(){ const f = $('#finish', view); if (!f) return; const extra = f.querySelector('a'); f.innerHTML = finishHtml() + (extra ? extra.outerHTML : ''); }
function rerender(){
  const y = window.scrollY;
  if (cur.type === 'lesson') { refreshFinish(); return; }
  if (cur.type === 'home') { renderHome(); window.scrollTo(0, y); }
}
function route(){
  stopSpeech();
  const parts = location.hash.replace(/^#\/?/, '').split('/');
  const p = parts[0], a = parseInt(parts[1], 10);
  tr = null;
  const k = parseInt(parts[2], 10);
  if (p === 'lesson' && a >= 1 && a <= TOTAL) { cur = {type:'lesson', kind:'main', n:a}; renderLesson(); document.title = `Урок ${a}: ${LESSONS[a-1].t} — Bueno English Club`; }
  else if (p === 'p' && PEOPLE.includes(parts[1]) && k >= 1 && k <= TRACKS[parts[1]].L.length) { cur = {type:'lesson', kind:'p', owner:parts[1], k:k, n:0}; renderLesson(); document.title = `Бонус: ${TRACKS[parts[1]].L[k-1].t} — Bueno English Club`; }
  else if (p === 'meet' && a >= 1 && a <= COURSE.length) { cur = {type:'meet', n:a}; renderMeet(a); document.title = `Встреча ${a}: ${COURSE[a-1].en} — Bueno English Club`; }
  else if (p === 'review' && a >= 1 && a <= COURSE.length) { cur = {type:'review', n:a}; renderReview(a); document.title = `Повторение модуля ${a} — Bueno English Club`; }
  else if (p === 'cards') { cur = {type:'cards', n:0}; renderCards(); document.title = 'Карточки — Bueno English Club'; }
  else if (p === 'team') { cur = {type:'team', n:0}; renderTeam(); document.title = 'Команда — Bueno English Club'; }
  else { cur = {type:'home', n:0}; renderHome(); document.title = 'Bueno English Club — английский A1 на четверых'; }
  document.querySelectorAll('.top nav a').forEach(x => {
    const k = x.dataset.nav;
    const on = k === 'plan' ? ['home','lesson','review','meet'].includes(cur.type) : k === cur.type;
    if (on) x.setAttribute('aria-current', 'page'); else x.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
}

/* EVENTS */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-say],[data-jump],[data-act],[data-pick],[data-fmt],[data-trs],[data-trc],.hide-ru .ru');
  if (!t) return;
  if (t.dataset.pick) { pick(t.dataset.pick); return; }
  if (t.dataset.fmt) {
    if (state.format !== t.dataset.fmt) { state.format = t.dataset.fmt; save(); const y = window.scrollY; trStop(); renderLesson(); window.scrollTo(0, y); toast(state.format === 'solo' ? 'Формат: сам, 40 минут' : 'Формат: вместе, 90 минут'); }
    return;
  }
  if (t.dataset.trs) { trStart(t.dataset.trs, t.dataset.role || null); return; }
  if (t.dataset.trc) {
    const a = t.dataset.trc;
    if (!tr) return;
    if (a === 'next') { tr.i++; trStep(); }
    else if (a === 'again') { const x = lessonOf(cur).d[tr.i]; if (x) trSay(x[1], PITCH[x[0]]); }
    else if (a === 'reveal') trReveal();
    else if (a === 'restart') trStart(tr.mode, tr.role);
    else if (a === 'stop') trStop();
    return;
  }
  if (t.dataset.say != null) { speak(t.dataset.say, parseFloat(t.dataset.pitch) || 1); return; }
  if (t.dataset.jump) { const s = document.getElementById('s-' + t.dataset.jump); if (s) s.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block:'start'}); return; }
  if (t.classList.contains('ru')) { t.classList.toggle('peek'); return; }
  const act = t.dataset.act;
  switch (act) {
    case 'hide-ru': {
      state.hideRu = !state.hideRu; save();
      const v = $('.vocab', view); if (v) { v.classList.toggle('hide-ru', state.hideRu); v.querySelectorAll('.peek').forEach(x => x.classList.remove('peek')); }
      t.textContent = state.hideRu ? 'Показать перевод' : 'Скрыть перевод'; t.setAttribute('aria-pressed', state.hideRu);
      break;
    }
    case 'rate':
      state.rate = state.rate < 0.85 ? 0.9 : 0.7; save();
      view.querySelectorAll('[data-act="rate"]').forEach(b => b.textContent = rateLabel());
      break;
    case 'tr': {
      state.showTr = !state.showTr; save();
      const d = $('.dialog', view); if (d) d.classList.toggle('no-tr', !state.showTr);
      t.textContent = state.showTr ? 'Скрыть перевод' : 'Показать перевод'; t.setAttribute('aria-pressed', !state.showTr);
      break;
    }
    case 'play': playDialog(); break;
    case 'requiz': mountLessonQuiz(); break;
    case 'rereview': { const m = COURSE[cur.n - 1]; mountQuiz($('.quizbox', view), shuffle(m.L.flatMap(l => l.q))); break; }
    case 'done': {
      if (!state.me) { openPicker(); break; }
      if (cur.kind === 'p') {
        const d = P().pdone, key = keyOf(cur);
        if (d[key]) { delete d[key]; toast('Отметка снята'); } else { d[key] = Date.now(); toast(`Бонусный урок пройден 🍫`); }
        save(); refreshFinish(); break;
      }
      const n = cur.n, d = P().done;
      if (d[n]) { delete d[n]; toast('Отметка снята'); }
      else { d[n] = Date.now(); toast(doneCount() >= TOTAL ? `${RU[state.me]} прошёл весь курс! Празднуем с Буэно 🎉` : `Урок ${n} пройден. Ещё одна долька в шоколаде 🍫`); }
      save(); refreshFinish();
      break;
    }
    case 'done-all': {
      const key = keyOf(cur), ts = Date.now();
      PEOPLE.forEach(p => { const r = recOf(p, cur); if (!r[key]) r[key] = ts; });
      save(); refreshFinish();
      toast('Урок отмечен для всех четверых 🍫');
      break;
    }
    case 'meet-done': {
      const n = cur.n;
      if (state.meets[n]) delete state.meets[n]; else state.meets[n] = Date.now();
      save();
      t.className = 'btn big' + (state.meets[n] ? '' : ' primary');
      t.textContent = state.meets[n] ? 'Встреча проведена. Снять отметку' : 'Отметить встречу проведённой';
      if (state.meets[n]) toast('Встреча проведена! Банк фишек — в Буэно 🍫');
      break;
    }
    case 'report': {
      const text = report(), out = $('.rep-out', view);
      if (out) { out.innerHTML = '<textarea class="rep" readonly rows="6" aria-label="Отчёт для чата"></textarea>'; const ta = $('.rep', out); ta.value = text; ta.rows = text.split('\n').length + 1; ta.focus(); ta.select(); }
      const fail = () => toast('Текст выделен — скопируйте его и отправьте в чат');
      try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast('Отчёт скопирован — вставьте его в общий чат'), fail); else fail(); } catch (e) { fail(); }
      break;
    }
    case 'who': openPicker(); break;
    case 'pk-close': closePicker(); break;
    case 'reset':
      if (t.dataset.armed) { PEOPLE.forEach(p => { state.people[p] = {done:{}, scores:{}, pdone:{}, pscores:{}}; }); state.meets = {}; state.legacy = null; save(); toast('Прогресс всех четверых сброшен'); firstPaint = true; renderHome(); }
      else { t.dataset.armed = '1'; t.textContent = 'Точно сбросить? Нажмите ещё раз'; setTimeout(() => { if (t.isConnected) { delete t.dataset.armed; t.textContent = 'Сбросить прогресс всех'; } }, 4000); }
      break;
    case 'flip': flipCard(); break;
    case 'know': cardKnow(); break;
    case 'again': cardAgain(); break;
    case 'restart': buildDeck(); drawCard(); break;
    case 'dir':
      cards.dir = cards.dir === 'en' ? 'ru' : 'en';
      t.textContent = cards.dir === 'en' ? 'Английский → русский' : 'Русский → английский';
      cards.flipped = false; drawCard();
      break;
  }
});
document.addEventListener('keydown', e => {
  if (cur.type !== 'cards' || $('#picker')) return;
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'select' || tag === 'input') return;
  if (tag === 'button' && (e.key === ' ' || e.key === 'Enter')) return;
  if (e.key === ' ' || (e.key === 'Enter' && e.target.classList && e.target.classList.contains('card'))) { e.preventDefault(); flipCard(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); cardKnow(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); cardAgain(); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.classList && e.target.classList.contains('ru') && e.target.closest('.hide-ru')) e.target.classList.toggle('peek');
});
document.addEventListener('keydown', e => {
  const pk = $('#picker'); if (!pk) return;
  if (e.key === 'Escape' && state.me) { e.preventDefault(); closePicker(); return; }
  if (e.key === 'Tab') {
    const f = Array.from(pk.querySelectorAll('button'));
    if (!f.length) return;
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  }
}, true);
window.addEventListener('hashchange', () => { closePicker(); route(); if (!state.me) openPicker(); });
updateChip();
route();
if (!state.me) openPicker();
})();
