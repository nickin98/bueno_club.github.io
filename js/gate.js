/* Дверь в клуб: код на входе.
   Защита декоративная — сайт публичный, проверка идёт в браузере.
   Кто откроет исходники, обойдёт её за минуту. */
(function () {
'use strict';
const KEY = 'bueno-gate';
const CODE_H = 2085845765;     // хэш кода, чтобы он не лежал в файле открытым текстом
const LEN = 4;
const PARTS = ['data/lessons.js', 'data/bonus.js', 'js/app.js'];

const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; return h; };
const opened = () => { try { return localStorage.getItem(KEY) === 'ok'; } catch (e) { return false; } };

function boot() {
  document.documentElement.classList.remove('gate-locked');
  (function next(i) {
    if (i >= PARTS.length) return;
    const s = document.createElement('script');
    s.src = PARTS[i];
    s.onload = () => next(i + 1);
    document.body.appendChild(s);
  })(0);
}

if (opened()) { boot(); return; }

const box = document.createElement('div');
box.className = 'gate';
box.innerHTML =
  '<form class="gate-card" autocomplete="off">' +
    '<span class="bar-mark" aria-hidden="true"></span>' +
    '<h1>Bueno English Club</h1>' +
    '<p>Клуб закрытый. Введите код из нашего чата.</p>' +
    '<input class="gate-in" type="password" inputmode="numeric" pattern="[0-9]*" maxlength="' + LEN + '" ' +
      'autocomplete="off" aria-label="Код доступа" placeholder="••••">' +
    '<button class="btn primary big" type="submit">Войти</button>' +
    '<p class="gate-err" role="alert"></p>' +
  '</form>';
document.body.appendChild(box);

const form = box.querySelector('form');
const input = box.querySelector('.gate-in');
const err = box.querySelector('.gate-err');
input.focus();

function wrong() {
  err.textContent = 'Не тот код. Спросите его у своих';
  box.querySelector('.gate-card').classList.remove('shake');
  void box.offsetWidth;
  box.querySelector('.gate-card').classList.add('shake');
  input.value = '';
  input.focus();
}

function check() {
  if (hash(input.value) !== CODE_H) return wrong();
  try { localStorage.setItem(KEY, 'ok'); } catch (e) {}
  box.remove();
  boot();
}

input.addEventListener('input', () => {
  input.value = input.value.replace(/\D/g, '');
  err.textContent = '';
  if (input.value.length === LEN) check();
});
form.addEventListener('submit', e => { e.preventDefault(); check(); });
})();
