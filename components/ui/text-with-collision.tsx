"use client";

import React, { useEffect, useRef } from 'react';
import { useTextCollision } from '@/contexts/text-collision-context';
import { cn } from '@/lib/utils';

interface TextWithCollisionProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function TextWithCollision({ 
  children, 
  className,
  as: Component = 'span'
}: TextWithCollisionProps) {
  const textRef = useRef<HTMLElement>(null);
  const { registerText, unregisterText } = useTextCollision();
  const idRef = useRef(`text-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (textRef.current) {
      const currentId = idRef.current;
      registerText(currentId, textRef.current);
      
      return () => {
        unregisterText(currentId);
      };
    }
  }, [registerText, unregisterText]);

  // Use React.createElement to properly handle the ref
  return React.createElement(
    Component,
    {
      ref: textRef,
      className: cn(className),
      'data-text-collision-id': idRef.current,
    },
    children
  );
}

