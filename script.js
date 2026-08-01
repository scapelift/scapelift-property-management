function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
  return response.json();
}

function renderCompany(company) {
  const homeLink = document.getElementById('company-home-link');
  const headerLogo = document.getElementById('header-company-logo');
  const footerLogo = document.getElementById('footer-company-logo');
  const heroImage = document.getElementById('hero-image');
  const heroButton = document.getElementById('hero-button');
  const heroTagline = document.getElementById('hero-tagline');

  homeLink.setAttribute('aria-label', `${company.name} home`);
  headerLogo.alt = company.name;
  footerLogo.alt = company.name;

  heroImage.src = company.hero.image;
  heroImage.alt = company.hero.imageAlt;
  setText('hero-eyebrow', company.hero.eyebrow);
  setText('hero-title', company.hero.title);
  setText('hero-description', company.hero.description);
  setText('hero-note', company.hero.note);
  heroButton.href = company.hero.buttonUrl;
  heroButton.textContent = company.hero.buttonLabel;

  heroTagline.replaceChildren();
  company.hero.taglineParts.forEach((part, index) => {
    if (index > 0) {
      heroTagline.append(' ');
      const separator = document.createElement('span');
      separator.className = 'dash';
      separator.textContent = '–';
      heroTagline.append(separator, ' ');
    }
    heroTagline.append(part);
  });

  document.querySelectorAll('.company-email-link').forEach(link => {
    link.href = `mailto:${company.email}`;
  });
  setText('cta-service-area', company.serviceAreaMarketing);
  setText('footer-tagline', company.slogan);
  setText('footer-company-name', company.name);
  setText('footer-service-area', company.serviceArea);

  const footerEmail = document.getElementById('footer-email');
  footerEmail.href = `mailto:${company.email}`;
  footerEmail.textContent = company.email;

  const footerWebsite = document.getElementById('footer-website');
  footerWebsite.href = company.websiteUrl;
  footerWebsite.textContent = company.websiteLabel;
}

function renderServices(services) {
  setText('services-eyebrow', services.eyebrow);
  setText('services-title', services.title);
  setText('services-intro', services.intro);

  const grid = document.getElementById('services-grid');
  const cards = services.items.map(service => {
    const card = document.createElement('article');
    card.className = 'svc-card';

    const title = document.createElement('h3');
    title.textContent = service.title;
    const description = document.createElement('p');
    description.textContent = service.description;

    card.append(title, description);
    return card;
  });
  grid.replaceChildren(...cards);
}

function createGalleryCard(item, className) {
  const figure = document.createElement('figure');
  figure.className = className;

  const image = document.createElement('img');
  image.src = item.image;
  image.alt = item.alt;
  image.loading = 'lazy';

  const caption = document.createElement('figcaption');
  caption.textContent = item.caption;
  figure.append(image, caption);
  return figure;
}

function renderGallery(gallery) {
  setText('work-eyebrow', gallery.section.eyebrow);
  setText('work-title', gallery.section.title);
  setText('work-intro', gallery.section.intro);
  setText('finished-work-heading', gallery.heading);

  const cards = gallery.items.map(item => createGalleryCard(item, 'work-card'));
  document.getElementById('finished-work-grid').replaceChildren(...cards);
}

function renderBeforeAfter(beforeAfter) {
  const heading = document.getElementById('before-after-heading');
  const separator = document.createElement('span');
  separator.className = 'dash';
  separator.textContent = beforeAfter.heading.separator;
  heading.replaceChildren(beforeAfter.heading.before, ' ', separator, ' ', beforeAfter.heading.after);

  const cards = beforeAfter.items.map(item => createGalleryCard(item, 'ba-card'));
  document.getElementById('before-after-grid').replaceChildren(...cards);
}

async function renderExternalContent() {
  const [company, services, gallery, beforeAfter] = await Promise.all([
    loadJson('content/company.json'),
    loadJson('content/services.json'),
    loadJson('content/gallery.json'),
    loadJson('content/before-after.json')
  ]);

  renderCompany(company);
  renderServices(services);
  renderGallery(gallery);
  renderBeforeAfter(beforeAfter);
}

function initializeSiteBehaviors() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const header = document.getElementById('header');
  if (header) {
    addEventListener('scroll', () => {
      header.classList.toggle('scrolled', scrollY > 20);
    }, { passive: true });
  }

  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-ready');
    const elements = document.querySelectorAll('.svc-card, .eco-point, .section-head, .hw-content, .strip-item, .ba-card, .work-card, .action-card, .work-subhead, .work-cta');
    elements.forEach(element => element.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(element => observer.observe(element));
    setTimeout(() => elements.forEach(element => element.classList.add('in')), 2500);
  }

  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImage = document.getElementById('lbImg');
  const lightboxCaption = document.getElementById('lbCap');
  const lightboxClose = document.getElementById('lbClose');

  function openLightbox(src, caption) {
    lightboxImage.src = src;
    lightboxImage.alt = caption || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImage.src = '';
  }

  document.querySelectorAll('#work figure').forEach(figure => {
    figure.addEventListener('click', () => {
      const image = figure.querySelector('img');
      const caption = figure.querySelector('figcaption');
      if (image) openLightbox(image.src, caption ? caption.textContent : image.alt);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  addEventListener('keydown', event => {
    if (event.key === 'Escape') closeLightbox();
  });
}

async function initialize() {
  if (document.getElementById('services-grid')) {
    try {
      await renderExternalContent();
    } catch (error) {
      console.error('Unable to render website content:', error);
    }
  }
  initializeSiteBehaviors();
}

initialize();
