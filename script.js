/* =============================================
   Rossi Mecânica — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
  initHoverEffects();
  initCounterAnimation();
});

/* ===== Ícones Lucide ===== */
function initLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ===== Smooth scroll para âncoras ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      // Fecha o menu mobile se estiver aberto
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ===== Animações ao rolar ===== */
function initScrollAnimations() {
  // Adiciona classe fade-in aos elementos desejados
  const targets = document.querySelectorAll(
    '.service-card, .review-card, .location-card, .about-visual, .stat-item'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* ===== Menu mobile ===== */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  if (!btn || !menu) return;

  function toggleMenu(isOpen) {
    menu.classList.toggle('active', isOpen);
    if (overlay) overlay.classList.toggle('active', isOpen);
    btn.classList.toggle('active', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('active');
    toggleMenu(isOpen);
  });

  // Fechar menu ao clicar no overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      toggleMenu(false);
    });
  }
}

function closeMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  const btn = document.querySelector('.mobile-menu-btn');
  const overlay = document.querySelector('.mobile-menu-overlay');
  if (!menu) return;
  menu.classList.remove('active');
  if (btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', false);
  }
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ===== Hover nos cards de serviço ===== */
function initHoverEffects() {
  // Os hover effects visuais já estão no CSS.
  // Aqui podemos adicionar efeitos JS extras se necessário.
}

/* ===== Contador animado nas estatísticas ===== */
function initCounterAnimation() {
  const statsSection = document.querySelector('.stats-bar');
  if (!statsSection) return;

  const counters = statsSection.querySelectorAll('.stat-num');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(animateCounter);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

function animateCounter(el) {
  const rawText = el.textContent.trim();
  // Extrai prefixo ('+') e número
  const prefix = rawText.startsWith('+') ? '+' : '';
  const suffix = rawText.endsWith('%') ? '%' : '';
  const target = parseInt(rawText.replace(/\D/g, ''), 10);

  if (isNaN(target)) return;

  let current = 0;
  const step = Math.ceil(target / 40);

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = prefix + current + suffix;
    if (current >= target) clearInterval(timer);
  }, 30);
}

/* ===== Sistema de notificações ===== */
function showNotification(message, type = 'info') {
  // Remove notificação existente
  document.querySelector('.notification')?.remove();

  const el = document.createElement('div');
  el.className = `notification notification-${type}`;
  el.textContent = message;
  document.body.appendChild(el);

  // Animar entrada
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('show'));
  });

  // Remover após 4 segundos
  setTimeout(() => {
    el.classList.remove('show');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  }, 4000);
}

/* ===== Header: efeito ao rolar ===== */
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.style.borderBottomColor = 'rgba(255,255,255,0.15)';
    } else {
      header.style.borderBottomColor = '';
    }
  }, { passive: true });
})();
