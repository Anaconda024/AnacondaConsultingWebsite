/**
 * Anaconda Consulting - JavaScript
 * Handles interactive effects and UI enhancements
 */

// ========================================
// Hero Section - Mouse Interaction Effect
// ========================================

(function initHeroInteraction() {
  const heroSection = document.getElementById('hero-section');
  
  if (!heroSection) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let isHovering = false;
  
  // Smooth animation using requestAnimationFrame
  function animateGradient() {
    if (!isHovering) return;
    
    // Smooth lerp (linear interpolation) for natural movement
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;
    
    // Update CSS custom properties for gradient position
    heroSection.style.setProperty('--mouse-x', `${currentX}%`);
    heroSection.style.setProperty('--mouse-y', `${currentY}%`);
    
    requestAnimationFrame(animateGradient);
  }
  
  // Track mouse movement within hero section
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (!isHovering) {
      isHovering = true;
      heroSection.classList.add('active');
      animateGradient();
    }
  });
  
  // Fade out effect when mouse leaves
  heroSection.addEventListener('mouseleave', () => {
    isHovering = false;
    heroSection.classList.remove('active');
  });
  
  // Initialize on mouse enter
  heroSection.addEventListener('mouseenter', () => {
    heroSection.classList.add('active');
  });
})();

// ========================================
// Smooth Scroll Enhancement
// ========================================

(function initSmoothScroll() {
  // Add smooth scroll behavior to internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

// ========================================
// Project Cards - Enhanced Hover Effects
// ========================================

(function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Add subtle 3D tilt effect on mouse move
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * 3; // Max 3 degrees
      const rotateY = ((x - centerX) / centerX) * -3;
      
      card.style.transform = `
        translateY(-8px) 
        scale(1.02) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;
    });
    
    // Reset transform on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ========================================
// Contact Form - Dynamic Placeholder
// ========================================

(function initContactForm() {
  const contactMethod = document.getElementById('contact-method');
  const contactInput = document.getElementById('contact-input');
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactMethod || !contactInput || !contactForm) return;
  
  // Update placeholder based on selected contact method
  function updatePlaceholder() {
    const method = contactMethod.value;
    
    if (method === 'email') {
      contactInput.type = 'email';
      contactInput.placeholder = 'Enter your email address';
      contactInput.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
    } else if (method === 'phone') {
      contactInput.type = 'tel';
      contactInput.placeholder = 'Enter your phone number';
      contactInput.setAttribute('pattern', '[0-9+\\-\\s()]*');
    }
  }
  
  // Initialize placeholder
  updatePlaceholder();
  
  // Update on change
  contactMethod.addEventListener('change', updatePlaceholder);
  
  // Form submission handler (prevents default, can be customized)
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const method = contactMethod.value;
    const contact = contactInput.value.trim();
    
    if (!contact) {
      alert('Please enter your contact information.');
      return;
    }
    
    // Basic validation
    if (method === 'email' && !contact.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Success feedback (customize as needed)
    const button = contactForm.querySelector('.contact-button');
    const originalText = button.textContent;
    
    button.textContent = 'Submitted!';
    button.style.background = 'rgba(34, 197, 94, 0.25)';
    button.style.borderColor = '#22c55e';
    
    // Reset form after delay
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = '';
      button.style.borderColor = '';
      contactForm.reset();
      updatePlaceholder();
    }, 2000);
  });
})();

// ========================================
// Scroll-triggered Animations
// ========================================

(function initScrollAnimations() {
  // Intersection Observer for fade-in effects
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
  
  // Observe sections for entrance animations
  const sections = document.querySelectorAll(
    '.about-container, .portfolio-container, .contact-container'
  );
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Observe project cards individually
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });
})();

// ========================================
// Performance Optimization
// ========================================

(function initPerformanceOptimizations() {
  // Debounce function for resize events
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
  
  // Handle window resize efficiently
  const handleResize = debounce(() => {
    // Recalculate any position-dependent elements if needed
    console.log('Window resized - recalculating layouts');
  }, 250);
  
  window.addEventListener('resize', handleResize);
  
  // Preload images for better performance
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    if (!img.complete) {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
    }
  });
})();

// ========================================
// Accessibility Enhancements
// ========================================

(function initAccessibility() {
  // Add keyboard navigation support for project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Make cards keyboard accessible
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');
    
    // Handle keyboard events
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Trigger any card click behavior here
        card.click();
      }
    });
  });
  
  // Add focus visible styles
  const focusableElements = document.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid #4a9eff';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  });
})();

// ========================================
// Initialize on DOM Ready
// ========================================

// Additional initialization if needed
document.addEventListener('DOMContentLoaded', () => {
  console.log('Anaconda Consulting - Website Initialized');
  
  // Add loading animation complete class
  document.body.classList.add('loaded');
});

// Log any errors for debugging
window.addEventListener('error', (e) => {
  console.error('Error occurred:', e.message);
});