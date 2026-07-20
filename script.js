// year
document.getElementById('year').textContent = new Date().getFullYear();

// header shadow on scroll
const header = document.getElementById('header');
addEventListener('scroll', () => {
  header.classList.toggle('scrolled', scrollY > 20);
}, { passive: true });

// reveal-on-scroll — only engage if IntersectionObserver is supported
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js-ready');
  const els = document.querySelectorAll('.svc-card, .eco-point, .section-head, .hw-content, .strip-item, .ba-card, .work-card, .action-card, .work-subhead, .work-cta');
  els.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
  // safety net: reveal everything after 2.5s no matter what
  setTimeout(() => els.forEach(el => el.classList.add('in')), 2500);
}

// ===== Lightbox =====
(function () {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');

  function open(src, cap) {
    lbImg.src = src;
    lbImg.alt = cap || '';
    lbCap.textContent = cap || '';
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.querySelectorAll('#work figure').forEach(fig => {
    fig.addEventListener('click', () => {
      const img = fig.querySelector('img');
      const cap = fig.querySelector('figcaption');
      if (img) open(img.src, cap ? cap.textContent : img.alt);
    });
  });

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
