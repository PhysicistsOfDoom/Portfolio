document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const logo = document.getElementById('heroLogo');

  if (reduceMotion) {
    logo.classList.add('in');
  } else {
    requestAnimationFrame(() => {
      setTimeout(() => logo.classList.add('in'), 150);
    });
  }

  // staggered reveal of the project cards as they enter the viewport
  const cards = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = reduceMotion ? 0 : Array.from(cards).indexOf(el) % 3 * 90;
        setTimeout(() => el.classList.add('in-view'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  cards.forEach((card) => observer.observe(card));
});
