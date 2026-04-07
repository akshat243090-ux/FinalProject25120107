/* ---- CURSOR ---- */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .service-card, .portfolio-item, .testimonial-card, .pricing-card, .filter-btn, .skill-chip, .social-link').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

/* ---- PAGE NAV ---- */
const pages = {
  home: 'page-home',
  about: 'page-about',
  services: 'page-services',
  portfolio: 'page-portfolio',
  contact: 'page-contact'
};

function goTo(pageKey) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pages[pageKey] || 'page-home');
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initReveal();
  if (pageKey === 'about') initSkillBars();
  if (pageKey === 'portfolio') initPortfolio();
  if (pageKey === 'services') initServicesPage();
}

/* ---- NAV SCROLL ---- */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
  initReveal();
  animateCounters();
});

/* ---- HAMBURGER ---- */
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  document.getElementById('hamburger').classList.toggle('open', menuOpen);
  const mm = document.getElementById('mobileMenu');
  mm.style.display = menuOpen ? 'flex' : 'none';
  setTimeout(() => mm.classList.toggle('open', menuOpen), 10);
}

/* ---- MARQUEE ---- */
const marqueeItems = ['Web Design','Brand Identity','UI/UX','Web Development','Figma','React','Webflow','SEO','Animations','E-Commerce','Typography','Visual Identity'];
const track = document.getElementById('marqueeTrack');
const repeated = [...marqueeItems, ...marqueeItems];

repeated.forEach(item => {
  const el = document.createElement('span');
  el.className = 'marquee-item';
  el.innerHTML = `${item} <span class="marquee-dot">·</span>`;
  track.appendChild(el);
});

/* ---- COUNTERS ---- */
let countersRun = false;

function animateCounters() {
  if (countersRun) return;

  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const first = counters[0].getBoundingClientRect();
  if (first.top > window.innerHeight) return;

  countersRun = true;

  counters.forEach(el => {
    const target = +el.dataset.target;
    let val = 0;
    const step = Math.ceil(target / 60);

    const timer = setInterval(() => {
      val = Math.min(val + step, target);
      el.textContent = val;
      if (val >= target) clearInterval(timer);
    }, 16);
  });
}

setTimeout(animateCounters, 1500);

/* ---- SCROLL REVEAL ---- */
function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', initReveal);
initReveal();

/* ---- SKILL BARS ---- */
function initSkillBars() {
  const container = document.getElementById('skillBars');
  if (!container || container.dataset.init) return;

  container.dataset.init = '1';

  const skills = [
    { name: 'UI / UX Design', level: 95 },
    { name: 'HTML & CSS', level: 98 },
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 78 },
    { name: 'Figma', level: 97 },
    { name: 'Webflow', level: 88 },
    { name: 'SEO & Performance', level: 80 },
    { name: 'Brand Design', level: 90 },
  ];

  skills.forEach((s, i) => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'margin-bottom:1.5rem';

    wrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-family:var(--font-ui); font-size:0.72rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;">
        <span>${s.name}</span>
        <span style="color:var(--amber)">${s.level}%</span>
      </div>
      <div style="background:var(--surface2); height:2px;">
        <div class="skill-bar-fill" data-level="${s.level}" style="height:100%; width:0%; background:var(--amber); transition:width 1s;"></div>
      </div>
    `;

    container.appendChild(wrap);
  });

  setTimeout(() => {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.level + '%';
    });
  }, 100);
}

/* ---- INIT ---- */
initPortfolio();