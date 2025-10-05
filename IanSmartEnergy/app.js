// Current year
document.getElementById('yr').textContent = new Date().getFullYear();

// Mobile drawer
const burger = document.querySelector('.hamburger');
const drawer = document.getElementById('mob');
burger?.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  for (const e of entries) { if (e.isIntersecting) e.target.classList.add('show'); }
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Blur-up loader for images (thumbs + gallery)
function armBlurUp(root=document){
  root.querySelectorAll('img.blur-up').forEach(img => {
    if (img.complete) img.classList.add('loaded');
    img.addEventListener('load', () => img.classList.add('loaded'));
  });
}
armBlurUp();

// Package modal logic
const modal = document.getElementById('package-modal');
const includesEl = document.getElementById('pkg-includes');
const modalImg = document.getElementById('pkg-image');

function openPackage(card) {
  const name = card.dataset.name || 'IANsmart Package';
  const size = card.dataset.size || '';
  const monthly = card.dataset.monthly || '';
  const image = card.dataset.image || '';
  const includes = JSON.parse(card.dataset.includes || '[]');

  document.getElementById('pkg-name').textContent = name;
  document.getElementById('pkg-size').textContent = size;
  document.getElementById('pkg-monthly').textContent = monthly;

  includesEl.innerHTML = '';
  includes.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' + item;
    includesEl.appendChild(li);
  });

  if (image) {
    modalImg.src = image;
    modalImg.classList.remove('loaded'); // for blur-up transition
    // re-arm blur-up for modal image only
    armBlurUp(modal.closest('dialog') || document);
  } else {
    modalImg.removeAttribute('src');
  }

  if (typeof modal.showModal === 'function') modal.showModal();
  else modal.setAttribute('open', '');
}

// Clicks
document.querySelectorAll('.package-card .open-modal').forEach(btn => {
  btn.addEventListener('click', (e) => openPackage(e.currentTarget.closest('.package-card')));
});

// Keyboard accessibility — open when Enter/Space on card
document.querySelectorAll('.package-card').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPackage(card); }
  });
});

// Close handlers
modal.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', () => modal.close()));
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
