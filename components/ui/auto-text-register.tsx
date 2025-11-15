"use client";

import { useEffect } from 'react';
import { useTextCollision } from '@/contexts/text-collision-context';

export function AutoTextRegister() {
  const { registerText, unregisterText } = useTextCollision();

  useEffect(() => {
    // Auto-register all text elements
    const registeredIds = new Set<string>();
    
    const registerAllTexts = () => {
      // Select all text elements
      const textSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'a', 'li', 'td', 'th',
        '[data-text-collision]',
        '.heading', '[class*="heading"]',
        '[class*="text-"]'
      ];

      textSelectors.forEach(selector => {
        const elements = document.querySelectorAll<HTMLElement>(selector);
        elements.forEach((el, index) => {
          // Only register if element has visible text
          if (el.textContent && el.textContent.trim().length > 0 && el.offsetParent !== null) {
            const id = `auto-text-${selector}-${index}-${el.textContent.substring(0, 20).replace(/\s/g, '').substring(0, 10)}`;
            
            if (!registeredIds.has(id)) {
              registeredIds.add(id);
              registerText(id, el);
            }
          }
        });
      });
    };

    // Initial registration with delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      registerAllTexts();
    }, 100);

    // Re-register on mutations
    const observer = new MutationObserver(() => {
      registerAllTexts();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Re-register on scroll/resize
    const handleResize = () => registerAllTexts();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
      registeredIds.forEach(id => unregisterText(id));
    };
  }, [registerText, unregisterText]);

  return null;
}

