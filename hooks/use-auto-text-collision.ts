"use client";

import { useEffect } from 'react';
import { useTextCollision } from '@/contexts/text-collision-context';

export function useAutoTextCollision() {
  const { registerText, unregisterText } = useTextCollision();

  useEffect(() => {
    // Auto-register all text elements on the page
    const textSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'a', 'li', 'td', 'th',
      '[class*="text-"]', '[class*="heading"]'
    ];

    const textElements: HTMLElement[] = [];
    textSelectors.forEach(selector => {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      elements.forEach(el => {
        // Only register if element has visible text
        if (el.textContent && el.textContent.trim().length > 0) {
          textElements.push(el);
        }
      });
    });

    // Register all text elements
    textElements.forEach((el, index) => {
      const id = `auto-text-${index}-${Math.random().toString(36).substr(2, 9)}`;
      registerText(id, el);
    });

    // Cleanup
    return () => {
      textElements.forEach((_, index) => {
        const id = `auto-text-${index}-${Math.random().toString(36).substr(2, 9)}`;
        unregisterText(id);
      });
    };
  }, [registerText, unregisterText]);
}

