/* =============================================
   Rossi Mecânica — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initSmoothScroll();
  initScrollAnimations();
  initMobileMenu();
  initCounterAnimation();
  initCardGlowEffect();
  initParallaxGears();
  initInteractiveDashboard();
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
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ===== Animações ao rolar ===== */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.service-card, .review-card, .location-card, .about-visual, .stat-item, .dashboard-container'
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

  if (overlay) {
    overlay.addEventListener('click', () => toggleMenu(false));
  }
}

function closeMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  const btn = document.querySelector('.mobile-menu-btn');
  const overlay = document.querySelector('.mobile-menu-overlay');
  if (menu) menu.classList.remove('active');
  if (btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', false);
  }
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ===== Efeito "Lanterna" / Glow nos Cards ===== */
function initCardGlowEffect() {
  const cards = document.querySelectorAll('.service-card, .review-card');
  
  document.addEventListener('mousemove', (e) => {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ===== Parallax nas Engrenagens / Elementos Flutuantes ===== */
function initParallaxGears() {
  const gears = document.querySelectorAll('.floating-gear');
  if (!gears.length) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    gears.forEach((gear, index) => {
      const speed = gear.getAttribute('data-speed') || (index + 1) * 20;
      const x = mouseX * speed;
      const y = mouseY * speed;
      // Mantém a animação base de flutuar girando e adiciona o transform do mouse
      gear.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

/* ===== Dashboard Interativo (Luzes do Painel) ===== */
function initInteractiveDashboard() {
  const indicators = document.querySelectorAll('.dash-indicator');
  const infoTitle = document.getElementById('dash-info-title');
  const infoDesc = document.getElementById('dash-info-desc');
  
  if (!indicators.length || !infoTitle) return;

  const data = {
    engine: {
      title: "Luz de Injeção Eletrônica",
      desc: "Indica falhas no motor, sensores ou sistema de exaustão. Requer diagnóstico imediato com scanner para evitar danos graves."
    },
    oil: {
      title: "Pressão de Óleo Baixa",
      desc: "O motor está operando sem lubrificação adequada. Pare o carro imediatamente para evitar que o motor funda."
    },
    battery: {
      title: "Falha na Bateria / Alternador",
      desc: "O sistema elétrico não está sendo carregado corretamente. O carro pode parar a qualquer momento. Verifique a bateria e o alternador."
    },
    temp: {
      title: "Superaquecimento",
      desc: "O motor atingiu uma temperatura crítica. Desligue imediatamente para evitar o derretimento de juntas e retentores."
    }
  };

  indicators.forEach(ind => {
    ind.addEventListener('click', () => {
      // Remove active class
      indicators.forEach(i => i.classList.remove('active'));
      // Add to current
      ind.classList.add('active');
      
      // Update text with animation
      const type = ind.getAttribute('data-type');
      
      infoTitle.style.opacity = 0;
      infoDesc.style.opacity = 0;
      
      setTimeout(() => {
        infoTitle.textContent = data[type].title;
        infoDesc.textContent = data[type].desc;
        infoTitle.style.opacity = 1;
        infoDesc.style.opacity = 1;
      }, 200);
    });
  });
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

/* ===== Header: efeito ao rolar ===== */
(function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();
