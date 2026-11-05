// Shared helpers for every tool page. No tracking, no network calls - everything runs in the browser.
const $ = (id) => document.getElementById(id);
const num = (id) => {
  const v = parseFloat(String($(id).value).replace(/[, $%]/g, ''));
  return Number.isFinite(v) && v >= 0 ? v : NaN; // every input on the site is a non-negative quantity
};
const z0 = (x) => (Math.abs(x) < 1e-9 ? 0 : x); // never display -0 from float noise
const ok = (...xs) => xs.every((x) => Number.isFinite(x));
const money = (x, d = 2) =>
  Number.isFinite((x = z0(x))) ? (x < 0 ? '-$' : '$') + Math.abs(x).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }) : '-';
const pct = (x, d = 2) => (Number.isFinite((x = z0(x))) ? x.toLocaleString('en-US', { maximumFractionDigits: d }) + '%' : '-');
const fnum = (x, d = 2) => (Number.isFinite((x = z0(x))) ? x.toLocaleString('en-US', { maximumFractionDigits: d }) : '-');
const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };

// Recalculate on every input change inside the tool, and once on load.
function live(fn) {
  const root = document.querySelector('.tool');
  let used = false;
  const track = () => { if (used) return; used = true; if (window.gtag) gtag('event', 'tool_use', { tool: location.pathname.replace(/\//g, '') || 'home' }); };
  root.addEventListener('input', track, { once: true });
  // Reset outputs first so an invalid input never leaves a stale (wrong) result on screen.
  const run = () => {
    root.querySelectorAll('.big,.stat strong').forEach((e) => (e.textContent = '-'));
    root.querySelectorAll('.verdict').forEach((e) => (e.textContent = ''));
    fn();
  };
  root.addEventListener('input', run);
  root.addEventListener('change', run);
  run();
}

function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(() => (btn.textContent = old), 1400);
  });
}
