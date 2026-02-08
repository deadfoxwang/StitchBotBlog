// Site JavaScript - Lazy loading and code highlighting
(function() {
  'use strict';

  // Initialize highlight.js when loaded
  function initHighlight() {
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }

  // Lazy loading for images
  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach((img) => img.classList.add('loaded'));
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initHighlight();
      initLazyLoading();
    });
  } else {
    initHighlight();
    initLazyLoading();
  }

  // Re-run highlight after dynamic content loads
  window.highlightCode = initHighlight;
})();