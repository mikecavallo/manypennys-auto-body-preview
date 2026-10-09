const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    mainNav.classList.toggle('is-open', open);
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('is-open');
  }));
}

const estimateForm = document.querySelector('#estimate-form');
if (estimateForm) {
  estimateForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!estimateForm.reportValidity()) return;
    const data = new FormData(estimateForm);
    const message = [
      `Hi, I'm ${data.get('name')}.`,
      `I'd like to ask about ${data.get('service').toLowerCase()}.`,
      `My phone number is ${data.get('phone')}.`,
      data.get('email') ? `My email is ${data.get('email')}.` : '',
      data.get('message') ? `Details: ${data.get('message')}` : ''
    ].filter(Boolean).join(' ');
    const status = estimateForm.querySelector('.form-status');
    status.textContent = 'Your text draft is ready. Review it and tap send to contact the shop.';
    window.location.href = `sms:+19103924777?&body=${encodeURIComponent(message)}`;
  });
}

const reviewCarousel = document.querySelector('.review-carousel');
if (reviewCarousel) {
  const track = reviewCarousel.querySelector('.review-track');
  const slides = [...reviewCarousel.querySelectorAll('.review-slide')];
  const counter = reviewCarousel.querySelector('.review-count');
  const pauseButton = reviewCarousel.querySelector('[data-review-pause]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let paused = prefersReducedMotion.matches;
  let timer;

  const showReview = next => {
    current = (next + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, index) => slide.setAttribute('aria-hidden', String(index !== current)));
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };
  const stopRotation = () => window.clearInterval(timer);
  const startRotation = () => {
    stopRotation();
    if (!paused && !document.hidden) timer = window.setInterval(() => showReview(current + 1), 5000);
  };
  const setPaused = value => {
    paused = value;
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'Resume automatic review rotation' : 'Pause automatic review rotation');
    pauseButton.textContent = paused ? '▶' : 'Ⅱ';
    startRotation();
  };

  reviewCarousel.querySelector('[data-review-prev]').addEventListener('click', () => showReview(current - 1));
  reviewCarousel.querySelector('[data-review-next]').addEventListener('click', () => showReview(current + 1));
  pauseButton.addEventListener('click', () => setPaused(!paused));
  reviewCarousel.addEventListener('mouseenter', stopRotation);
  reviewCarousel.addEventListener('mouseleave', startRotation);
  reviewCarousel.addEventListener('focusin', stopRotation);
  reviewCarousel.addEventListener('focusout', event => {
    if (!reviewCarousel.contains(event.relatedTarget)) startRotation();
  });
  document.addEventListener('visibilitychange', startRotation);
  prefersReducedMotion.addEventListener('change', event => setPaused(event.matches));
  startRotation();
}

const imageMotionTargets = document.querySelectorAll('.hero-photo-frame, .service-image, .approach-image, .work-grid figure, .service-page-hero > img');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('image-motion-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  imageMotionTargets.forEach(target => {
    target.classList.add('image-motion-ready');
    imageObserver.observe(target);
  });
} else {
  imageMotionTargets.forEach(target => target.classList.add('image-motion-visible'));
}
