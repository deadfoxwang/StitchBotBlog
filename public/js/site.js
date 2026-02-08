// Site JavaScript - Lazy loading, code highlighting, relative time, read more
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

  // Format relative time
  function formatRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days === 1) return '昨天';
    if (days < 7) return `${days}天前`;
    
    // Return formatted date for older items
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours().toString().padStart(2, '0');
    const min = date.getMinutes().toString().padStart(2, '0');
    return `${month}月${day}日 ${hour}:${min}`;
  }

  // Update relative times
  function initRelativeTime() {
    document.querySelectorAll('[data-timestamp]').forEach((el) => {
      const timestamp = el.getAttribute('data-timestamp');
      const date = new Date(timestamp);
      el.textContent = formatRelativeTime(date);
      el.classList.add('relative-time');
    });
  }

  // Read more functionality
  function initReadMore() {
    document.querySelectorAll('.excerpt.collapsible').forEach((el) => {
      const content = el.textContent;
      if (content.length > 160) {
        el.classList.add('collapsed');
        
        const btn = document.createElement('button');
        btn.className = 'read-more-btn';
        btn.textContent = '展开更多';
        btn.onclick = function() {
          if (el.classList.contains('collapsed')) {
            el.classList.remove('collapsed');
            btn.textContent = '收起';
          } else {
            el.classList.add('collapsed');
            btn.textContent = '展开更多';
          }
        };
        
        el.parentNode.insertBefore(btn, el.nextSibling);
      }
    });
  }

  // Copy link functionality
  function initCopyLinks() {
    document.querySelectorAll('.action-btn[data-action="copy"]').forEach((btn) => {
      btn.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        navigator.clipboard.writeText(url).then(() => {
          const originalText = this.textContent;
          this.textContent = '已复制';
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      });
    });
  }

  // Share functionality
  function initShare() {
    document.querySelectorAll('.action-btn[data-action="share"]').forEach((btn) => {
      btn.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        const title = this.getAttribute('data-title');
        
        if (navigator.share) {
          navigator.share({
            title: title,
            url: url
          });
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(`${title} - ${url}`);
          const originalText = this.textContent;
          this.textContent = '已复制';
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initHighlight();
      initLazyLoading();
      initRelativeTime();
      initReadMore();
      initCopyLinks();
      initShare();
    });
  } else {
    initHighlight();
    initLazyLoading();
    initRelativeTime();
    initReadMore();
    initCopyLinks();
    initShare();
  }

  // Re-run after dynamic content loads
  window.refreshScripts = function() {
    initHighlight();
    initRelativeTime();
    initReadMore();
    initCopyLinks();
    initShare();
  };
})();
// Timeline expand/collapse
(function() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach(item => {
    item.classList.add('collapsed');
    const btn = item.querySelector('.expand-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const collapsed = item.classList.toggle('collapsed');
      btn.textContent = collapsed ? '展开' : '收起';
    });
  });
})();
