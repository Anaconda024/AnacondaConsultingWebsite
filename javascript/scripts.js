/**
 * Anaconda Consulting - JavaScript
 * Handles interactive effects and UI enhancements
 */

// ========================================
// Navigation Bar - Auto-hide and Scroll Detection
// ========================================

(function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  if (!navbar) return;
  
  let lastScrollY = 0;
  let hideTimeout;
  
  const HIDE_DELAY = 3000; // Hide navbar after 3 seconds of inactivity
  const SECTIONS = [
    { id: 'hero-section', link: 'a[href="#hero-section"]' },
    { id: 'about-section', link: 'a[href="#about-section"]' },
    { id: 'portfolio-section', link: 'a[href="#portfolio-section"]' },
    { id: 'contact-section', link: 'a[href="#contact-section"]' }
  ];
  
  function hideNavbar() {
    navbar.classList.add('hidden');
    navbar.classList.remove('visible');
  }
  
  function showNavbar() {
    navbar.classList.remove('hidden');
    navbar.classList.add('visible');
  }
  
  function resetHideTimer() {
    clearTimeout(hideTimeout);
    showNavbar();
    hideTimeout = setTimeout(hideNavbar, HIDE_DELAY);
  }
  
  function updateActiveLink() {
    let currentSection = null;
    
    // Find which section is currently in view
    for (const section of SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Check if section is in viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = section.link;
          break;
        }
      }
    }
    
    // Update active state for all links
    document.querySelectorAll('.navbar-link').forEach(link => {
      link.classList.remove('active');
      if (link.matches(currentSection)) {
        link.classList.add('active');
      }
    });
  }
  
  // Detect scroll direction
  document.addEventListener('scroll', () => {
    if (lastScrollY < window.scrollY) {
      // Scrolling down
      showNavbar();
      resetHideTimer();
    } else if (lastScrollY > window.scrollY) {
      // Scrolling up
      hideNavbar();
      clearTimeout(hideTimeout);
    }
    
    lastScrollY = window.scrollY;
    updateActiveLink();
  }, { passive: true });
  
  // Hide navbar initially
  hideNavbar();
  
  // Add smooth scrolling for navbar links
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          showNavbar();
          resetHideTimer();
        }
      }
    });
  });
  
  // Click on logo to scroll to home
  document.querySelector('.navbar-brand').addEventListener('click', () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
      showNavbar();
      resetHideTimer();
    }
  });
})();

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

// ========================================
// Animated Radio Component - Horizontal
// ========================================

(function initAnimatedRadio() {
  const radioContainer = document.querySelector('.animated-radio-horizontal');
  if (!radioContainer) return;

  // Radio options
  const options = [
    { id: "contact-email", value: "email", label: "Email" },
    { id: "contact-phone", value: "phone", label: "Cellphone" },
  ];

  // State
  let selectedValue = "email";

  // Initialize radio component
  function initRadio() {
    // Clear container
    radioContainer.innerHTML = '';

    // Create radio options
    options.forEach((option, index) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'radio-option-horizontal';
      
      const input = document.createElement('input');
      input.type = 'radio';
      input.id = option.id;
      input.name = 'contact-method';
      input.value = option.value;
      input.checked = selectedValue === option.value;
      input.className = 'radio-input-horizontal';
      
      const label = document.createElement('label');
      label.htmlFor = option.id;
      label.className = `radio-label-horizontal ${selectedValue === option.value ? 'selected' : 'unselected'}`;
      label.textContent = option.label;
      
      // Add event listener
      input.addEventListener('change', (e) => {
        selectedValue = e.target.value;
        updateRadioSelection();
        updateContactPlaceholder();
      });
      
      optionDiv.appendChild(input);
      optionDiv.appendChild(label);
      radioContainer.appendChild(optionDiv);
    });

    // Create the track and glider
    const track = document.createElement('div');
    track.className = 'radio-track-horizontal';
    
    const glider = document.createElement('div');
    glider.className = 'glider-horizontal';
    glider.id = 'radio-glider';
    glider.style.transform = getGliderTransform();
    
    const gliderBlur = document.createElement('div');
    gliderBlur.className = 'glider-blur-horizontal';
    
    const gliderGradient = document.createElement('div');
    gliderGradient.className = 'glider-gradient-horizontal';
    
    glider.appendChild(gliderBlur);
    glider.appendChild(gliderGradient);
    track.appendChild(glider);
    radioContainer.appendChild(track);
  }

  // Update radio selection
  function updateRadioSelection() {
    document.querySelectorAll('.radio-label-horizontal').forEach((label, index) => {
      label.className = `radio-label-horizontal ${options[index].value === selectedValue ? 'selected' : 'unselected'}`;
    });
    
    // Update glider position
    const glider = document.getElementById('radio-glider');
    if (glider) {
      glider.style.transform = getGliderTransform();
    }
  }

  // Calculate glider transform
  function getGliderTransform() {
    const index = options.findIndex((option) => option.value === selectedValue);
    return `translateX(${index * 100}%)`;
  }

  // Update contact input placeholder based on selection
  function updateContactPlaceholder() {
    const contactInput = document.getElementById('contact-input');
    if (!contactInput) return;

    if (selectedValue === 'email') {
      contactInput.type = 'email';
      contactInput.placeholder = 'Enter your email address';
      contactInput.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
    } else if (selectedValue === 'phone') {
      contactInput.type = 'tel';
      contactInput.placeholder = 'Enter your phone number';
      contactInput.setAttribute('pattern', '[0-9+\\-\\s()]*');
    }
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    initRadio();
    updateContactPlaceholder();
  });
})();

// ========================================
// Falling Pattern Background
// ========================================

(function initFallingPattern() {
  const fallingPattern = document.getElementById('fallingPattern');
  if (!fallingPattern) return;

  // Configuration
  const config = {
    color: 'rgb(252, 252, 252)',
    backgroundColor: 'rgb(12, 15, 29)',
    duration: 150,
    blurIntensity: '1em',
    density: 0.8,
    isPlaying: true
  };

  // Generate pattern background
  function generateBackgroundImage(color) {
    const patterns = [
      `radial-gradient(4px 100px at 0px 235px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 235px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 117.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 252px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 252px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 126px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 150px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 150px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 75px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 253px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 253px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 126.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 204px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 204px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 102px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 134px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 134px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 67px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 179px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 179px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 89.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 299px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 299px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 149.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 215px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 215px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 107.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 281px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 281px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 140.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 158px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 158px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 79px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 210px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 210px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 105px, ${color} 100%, transparent 150%)`,
    ];

    return patterns.join(', ');
  }

  // Background sizes
  const backgroundSizes = [
    '300px 235px', '300px 235px', '300px 235px',
    '300px 252px', '300px 252px', '300px 252px',
    '300px 150px', '300px 150px', '300px 150px',
    '300px 253px', '300px 253px', '300px 253px',
    '300px 204px', '300px 204px', '300px 204px',
    '300px 134px', '300px 134px', '300px 134px',
    '300px 179px', '300px 179px', '300px 179px',
    '300px 299px', '300px 299px', '300px 299px',
    '300px 215px', '300px 215px', '300px 215px',
    '300px 281px', '300px 281px', '300px 281px',
    '300px 158px', '300px 158px', '300px 158px',
    '300px 210px', '300px 210px'
  ].join(', ');

  // Start positions
  const startPositions = '0px 220px, 3px 220px, 151.5px 337.5px, 25px 24px, 28px 24px, 176.5px 150px, 50px 16px, 53px 16px, 201.5px 91px, 75px 224px, 78px 224px, 226.5px 230.5px, 100px 19px, 103px 19px, 251.5px 121px, 125px 120px, 128px 120px, 276.5px 187px, 150px 31px, 153px 31px, 301.5px 120.5px, 175px 235px, 178px 235px, 326.5px 384.5px, 200px 121px, 203px 121px, 351.5px 228.5px, 225px 224px, 228px 224px, 376.5px 364.5px, 250px 26px, 253px 26px, 401.5px 105px, 275px 75px, 278px 75px, 426.5px 180px';

  // End positions
  const endPositions = '0px 6800px, 3px 6800px, 151.5px 6917.5px, 25px 13632px, 28px 13632px, 176.5px 13758px, 50px 5416px, 53px 5416px, 201.5px 5491px, 75px 17175px, 78px 17175px, 226.5px 17301.5px, 100px 5119px, 103px 5119px, 251.5px 5221px, 125px 8428px, 128px 8428px, 276.5px 8495px, 150px 9876px, 153px 9876px, 301.5px 9965.5px, 175px 13391px, 178px 13391px, 326.5px 13540.5px, 200px 14741px, 203px 14741px, 351.5px 14848.5px, 225px 18770px, 228px 18770px, 376.5px 18910.5px, 250px 5082px, 253px 5082px, 401.5px 5161px, 275px 6375px, 278px 6375px, 426.5px 6480px';

  // Initialize falling pattern
  function initPattern() {
    fallingPattern.innerHTML = '';
    
    // Create pattern layer
    const patternLayer = document.createElement('div');
    patternLayer.className = 'pattern-layer';
    
    // Set CSS custom properties
    patternLayer.style.setProperty('--pattern-image', generateBackgroundImage(config.color));
    patternLayer.style.setProperty('--pattern-size', backgroundSizes);
    patternLayer.style.setProperty('--start-positions', startPositions);
    patternLayer.style.setProperty('--end-positions', endPositions);
    patternLayer.style.setProperty('--duration', `${config.duration}s`);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'falling-overlay';
    overlay.style.setProperty('--blur-intensity', config.blurIntensity);
    overlay.style.setProperty('--density', config.density);
    
    // Add to container
    fallingPattern.appendChild(patternLayer);
    fallingPattern.appendChild(overlay);
    
    // Set background color
    fallingPattern.style.backgroundColor = config.backgroundColor;
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', initPattern);
  
  // Handle window resize
  window.addEventListener('resize', initPattern);
})();

// ========================================
// Contact Form - Updated for animated radio
// ========================================

(function initContactForm() {
  const contactInput = document.getElementById('contact-input');
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactInput || !contactForm) return;
  
  // Get selected contact method
  function getSelectedMethod() {
    const selectedRadio = document.querySelector('input[name="contact-method"]:checked');
    return selectedRadio ? selectedRadio.value : 'email';
  }
  
  // Form submission handler
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const method = getSelectedMethod();
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
    
    if (method === 'phone' && !/^[\d\s\-\+\(\)]{10,}$/.test(contact.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number (at least 10 digits).');
      return;
    }
    
    // Success feedback
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
      contactInput.value = '';
      
      // Reset radio to default (email)
      const emailRadio = document.getElementById('contact-email');
      if (emailRadio) {
        emailRadio.checked = true;
        emailRadio.dispatchEvent(new Event('change'));
      }
    }, 2000);
    
    // Log submission (in production, this would send to a server)
    console.log('Contact form submitted:', { method, contact });
  });
})();