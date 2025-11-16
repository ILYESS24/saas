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
        try {
          const elements = document.querySelectorAll<HTMLElement>(selector);
          elements.forEach((el, index) => {
            // Only register if element has visible text and is not already registered
            if (el && el.textContent && el.textContent.trim().length > 0 && el.offsetParent !== null) {
              const textHash = el.textContent.substring(0, 20).replace(/\s/g, '').substring(0, 10);
              const id = `auto-text-${selector.replace(/[^a-zA-Z0-9]/g, '')}-${index}-${textHash}`;
              
              if (!registeredIds.has(id) && !el.dataset.collisionRegistered) {
                registeredIds.add(id);
                el.dataset.collisionRegistered = 'true';
                registerText(id, el);
              }
            }
          });
        } catch (error) {
          console.warn('Error registering texts for selector:', selector, error);
        }
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

