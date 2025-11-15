"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface TextElement {
  id: string;
  element: HTMLElement;
  isIntersecting: boolean;
}

interface TextCollisionContextType {
  registerText: (id: string, element: HTMLElement) => void;
  unregisterText: (id: string) => void;
  checkCollision: (x: number, y: number, radius: number) => void;
  isTextIntersecting: (id: string) => boolean;
}

const TextCollisionContext = createContext<TextCollisionContextType | undefined>(undefined);

export function TextCollisionProvider({ children }: { children: ReactNode }) {
  const [textElements, setTextElements] = useState<Map<string, TextElement>>(new Map());
  const animationFrameRef = useRef<number>();

  const registerText = (id: string, element: HTMLElement) => {
    setTextElements(prev => {
      const newMap = new Map(prev);
      newMap.set(id, { id, element, isIntersecting: false });
      return newMap;
    });
  };

  const unregisterText = (id: string) => {
    setTextElements(prev => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  const checkCollision = (x: number, y: number, radius: number) => {
    setTextElements(prev => {
      const newMap = new Map(prev);
      
      newMap.forEach((textEl, id) => {
        const rect = textEl.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from blob center to text center
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        
        // Check if blob intersects with text (considering both blob radius and text size)
        // Use a more generous collision detection
        const textRadius = Math.max(rect.width, rect.height) / 2;
        const collisionRadius = radius + textRadius * 1.2; // Add 20% padding
        const isIntersecting = distance < collisionRadius;
        
        if (isIntersecting !== textEl.isIntersecting) {
          newMap.set(id, { ...textEl, isIntersecting });
          
          // Apply color change with smooth transition
          if (isIntersecting) {
            textEl.element.style.color = '#ffffff';
            textEl.element.style.transition = 'color 0.2s ease';
            // Also change background if it's a text element with background
            if (textEl.element.style.background) {
              textEl.element.style.background = 'rgba(255, 255, 255, 0.1)';
            }
          } else {
            // Restore original color gradually
            textEl.element.style.color = '';
            textEl.element.style.transition = 'color 0.4s ease';
            if (textEl.element.style.background) {
              textEl.element.style.background = '';
            }
          }
        }
      });
      
      return newMap;
    });
  };

  const isTextIntersecting = (id: string) => {
    return textElements.get(id)?.isIntersecting || false;
  };


  return (
    <TextCollisionContext.Provider
      value={{
        registerText,
        unregisterText,
        checkCollision,
        isTextIntersecting,
      }}
    >
      {children}
    </TextCollisionContext.Provider>
  );
}

export function useTextCollision() {
  const context = useContext(TextCollisionContext);
  if (context === undefined) {
    throw new Error('useTextCollision must be used within a TextCollisionProvider');
  }
  return context;
}

