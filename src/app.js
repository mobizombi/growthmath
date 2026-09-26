// Shared helpers for every tool page. No tracking, no network calls - everything runs in the browser.
const $ = (id) => document.getElementById(id);
const num = (id) => {
  const v = parseFloat(String($(id).value).replace(/[, $%]/g, ''));
  return Number.isFinite(v) ? v : NaN;
};
const ok = (...xs) => xs.every((x) => Number.isFinite(x));
const money = (x, d = 2) =>
  Number.isFinite(x) ? (x < 0 ? '-$' : '$') + Math.abs(x).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) : '-';
const pct = (x, d = 2) => (Number.isFinite(x) ? x.toLocaleString('en-US', { maximumFractionDigits: d }) + '%' : '-');
const fnum = (x, d = 2) => (Number.isFinite(x) ? x.toLocaleString('en-US', { maximumFractionDigits: d }) : '-');
const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };

// Recalculate on every input change inside the tool, and once on load.
function live(fn) {
  const root = document.querySelector('.tool');
  root.addEventListener('input', fn);
  root.addEventListener('change', fn);
  fn();
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(() => (btn.textContent = old), 1400);
  });
}
