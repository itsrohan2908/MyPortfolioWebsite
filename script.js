// ===== PORTFOLIO WEBSITE INTERACTIVE FEATURES =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features
  initLoadingScreen();
  initNavigation();
  initScrollEffects();
  initAnimations();
  initSkillBars();
  initBackToTop();
  initContactForm();
  initProjectCards();
});

// ===== LOADING SCREEN =====
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  
  // Hide loading screen after page loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500);
  });
}

// ===== NAVIGATION =====
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Handle smooth scrolling for internal links
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Close mobile menu
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  // Active navigation link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ===== ANIMATIONS =====
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .highlight-item, .experience-item');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Hero section animations
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-actions, .profile-card');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      el.style.transition = 'all 0.6s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
}

// ===== SKILL BARS =====
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBar = entry.target;
        const level = skillBar.getAttribute('data-level');
        skillBar.style.width = `${level}%`;
        skillObserver.unobserve(skillBar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      try {
        // Simulate form submission (replace with actual form handling)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
      } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
      } finally {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }
}

// ===== PROJECT CARDS =====
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ===== UTILITY FUNCTIONS =====

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: var(--z-tooltip);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Smooth scroll to element
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
const optimizedScrollHandler = throttle(() => {
  // Scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical images
function preloadImages() {
  const criticalImages = [
    'assets/images/profile.jpg',
    'assets/images/smarthealth-thumb.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading
preloadImages();

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Focus management for mobile menu
function manageFocus() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  navToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      // Focus first link when menu opens
      navLinks[0].focus();
    }
  });
}

// Initialize focus management
manageFocus();

// ===== ANALYTICS & TRACKING =====

// Track section views
function trackSectionViews() {
  const sections = document.querySelectorAll('section[id]');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        console.log(`Section viewed: ${sectionId}`);
        // Add your analytics tracking here
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

// Initialize tracking
trackSectionViews();

// ===== ERROR HANDLING =====

// Global error handler
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
  // Add error reporting here
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Add error reporting here
});