// ── Book Bank UI — shared.js ──

const today = new Date();
const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

function setDateLabels() {
  document.querySelectorAll('.js-date').forEach(el => el.textContent = dateStr);
}

function showToast(msg, sub = '', icon = '✦') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('.toast-icon').textContent = icon;
  t.querySelector('.toast-msg').textContent = msg;
  t.querySelector('.toast-sub').textContent = sub;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}

function animateCount(el, target, duration = 1200) {
  const start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Animate all stat values on load
function animateStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.floor(prog * target);
      if (prog < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setDateLabels();
  animateStats();

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // Active nav link
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    if (a.getAttribute('href') === path || a.getAttribute('href') === `./${path}`) {
      a.classList.add('active');
    }
  });
});
