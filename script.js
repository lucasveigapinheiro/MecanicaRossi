// JavaScript para Rossi Mecânica

document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
    initHoverEffects();
    initMobileMenu();
});

// Inicializar ícones Lucide
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Smooth scroll para navegação
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animações ao rolar a página
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Formulário de contato
function initContactForm() {
    const contactForms = document.querySelectorAll('form');

    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.querySelector('input[type="text"]')?.value || '';
            const email = form.querySelector('input[type="email"]')?.value || '';
            const message = form.querySelector('textarea')?.value || '';

            if (!name || !message) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            const whatsappMessage = `Olá! Meu nome é ${name}${email ? ' e meu email é ' + email : ''}. Gostaria de falar sobre: ${message}`;
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=5511954429886&text=${encodeURIComponent(whatsappMessage)}`;

            window.open(whatsappUrl, '_blank');
            showNotification('Redirecionando para o WhatsApp...', 'success');
            form.reset();
        });
    });
}

// Efeitos hover
function initHoverEffects() {
    // Cards de serviços
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Botões
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .whatsapp-contact');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Menu mobile
function initMobileMenu() {
    // Poder ser implementado no futuro
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });
    }
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificações existentes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#25D366' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Adicionar ao DOM
    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover automaticamente
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--color-medium)';
            header.style.backdropFilter = 'none';
        }

        lastScrollY = currentScrollY;
    });
}

// Contador de estatísticas animado
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 30);
    });
}

// Validação de formulário
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#E74C3C';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--color-border)';
        }
    });

    return isValid;
}

// Loading states
function showLoading(button, originalText) {
    button.disabled = true;
    button.innerHTML = `
        <span style="display: inline-block; animation: spin 1s linear infinite;">⏳</span>
        Processando...
    `;
}

function hideLoading(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
}

// Adicionar CSS de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .notification-success {
        border-left: 4px solid #25D366;
    }
    
    .notification-error {
        border-left: 4px solid #E74C3C;
    }
    
    .notification-info {
        border-left: 4px solid #3498DB;
    }
`;
document.head.appendChild(style);

// Inicializar contador quando visível
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}
