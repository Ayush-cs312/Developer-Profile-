// ---------- Typewriter intro (runs once) ----------

const typeLine = document.getElementById('typeLine');
const introText = "CS Engineering student — building small, practical projects one at a time.";
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeIntro() {
  if (!typeLine) return;
  if (reduceMotion) {
    typeLine.textContent = introText;
    return;
  }
  let i = 0;
  const speed = 18;
  (function step() {
    typeLine.textContent = introText.slice(0, i);
    i++;
    if (i <= introText.length) {
      setTimeout(step, speed);
    }
  })();
}

typeIntro();

// ---------- Active section highlight in the rail ----------

const links = document.querySelectorAll('.rail-link');
const sections = Array.from(links)
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function setActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight * 0.3;
  let current = sections[0];

  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) current = section;
  });

  links.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    link.classList.toggle('active', target === current);
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);

// ---------- Contact form ----------

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in every field before sending.';
      return;
    }

    // This is a static page, so there's no backend to send to yet.
    // Swap this block for a real request (e.g. to Formspree, EmailJS,
    // or your own API) once you wire one up.
    status.textContent = `Thanks, ${name} — message noted. I'll get back to you at ${email}.`;
    form.reset();
  });
}

// ---------- Mobile navigation toggle ----------

const rail = document.querySelector('.rail');
const navToggle = document.getElementById('navToggle');

function setMenu(open) {
  rail.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    setMenu(!rail.classList.contains('open'));
  });

  // Close the menu after picking a section
  links.forEach(link => link.addEventListener('click', () => setMenu(false)));

  // Reset if the window is resized back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) setMenu(false);
  });
}

// ---------- Fade-in on scroll ----------

const revealTargets = document.querySelectorAll('.block, .project, .skill-group');

if ('IntersectionObserver' in window && !reduceMotion) {
  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
}
