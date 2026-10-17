// ============ МОБИЛЬНОЕ МЕНЮ ============
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

burger?.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('is-open'));
});

// ============ АНИМАЦИЯ ПОЯВЛЕНИЯ ============
const revealTargets = document.querySelectorAll(
  '.card, .game, .fact, .timeline__item, .section__lead'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

// ============ ПЛАВНАЯ ПРОКРУТКА ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============ ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop) current = section.id;
  });
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.style.color = isActive ? 'var(--accent)' : '';
  });
});

// ============ СЧЁТЧИКИ ФАКТОВ ============
document.querySelectorAll('.fact__num').forEach(el => {
  const raw = el.textContent.trim();
  const numMatch = raw.match(/^\$?(\d+)/);
  if (!numMatch) return;

  const prefix = raw.startsWith('$') ? '$' : '';
  const target = parseInt(numMatch[1], 10);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));

  const animate = () => {
    current += step;
    if (current >= target) {
      el.textContent = raw;
      return;
    }
    el.textContent = prefix + current;
    requestAnimationFrame(animate);
  };

  const numObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animate();
      numObserver.disconnect();
    }
  }, { threshold: 0.5 });

  numObserver.observe(el);
});

// ============ ПРОВЕРКА ЗАГРУЗКИ SVG ============
document.querySelectorAll('.game__logo img, .steam__brand-logo, .steam__extra-logo img, .logo__img')
  .forEach(img => {
    img.addEventListener('error', () => {
      const parent = img.closest('.game__logo, .steam__brand, .steam__extra-logo');
      if (parent) parent.style.display = 'none';
      console.warn('❌ Не загрузилось:', img.src);
    });
  });

console.log('%c🎮 Valve Site loaded', 'color:#66c0f4;font-weight:bold;font-size:14px');
