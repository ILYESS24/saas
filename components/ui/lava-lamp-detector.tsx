"use client";

import React, { useEffect, useRef } from 'react';
import { useTextCollision } from '@/contexts/text-collision-context';

export function LavaLampDetector() {
  const { checkCollision } = useTextCollision();
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let isRunning = true;

    const detectBlobs = () => {
      if (!isRunning) return;

      try {
        const time = Date.now() / 1000;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (viewportWidth === 0 || viewportHeight === 0) {
          animationFrameRef.current = requestAnimationFrame(detectBlobs);
          return;
        }

        // Calculate blob positions based on shader logic
        // The shader uses 3D rotations, we project to 2D screen space
        const angle1 = time / 5.0;
        const angle2 = -time / 5.0;
        const angle3 = -time / 4.5;
        const angle4 = -time / 4.0;

        // Helper function to rotate a 2D point
        const rotate2D = (x: number, y: number, angle: number) => {
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          return {
            x: x * cos - y * sin,
            y: x * sin + y * cos
          };
        };

        const blobs = [
          {
            // First sphere: p1 rotated around Z axis, at (-0.5, 0.0, 0.0), radius 0.35
            ...rotate2D(-0.5, 0.0, angle1),
            radius: 0.35
          },
          {
            // Second sphere: p2 rotated, at (0.55, 0.0, 0.0), radius 0.3
            ...rotate2D(0.55, 0.0, angle2),
            radius: 0.3
          },
          {
            // Third sphere: p2 rotated, at (-0.8, 0.0, 0.0), radius 0.2
            ...rotate2D(-0.8, 0.0, angle2),
            radius: 0.2
          },
          {
            // Fourth sphere: p3 rotated, at (1.0, 0.0, 0.0), radius 0.15
            ...rotate2D(1.0, 0.0, angle3),
            radius: 0.15
          },
          {
            // Fifth sphere: p4 rotated, at (0.45, -0.45, 0.0), radius 0.15
            ...rotate2D(0.45, -0.45, angle4),
            radius: 0.15
          },
        ];

        // Transform normalized coordinates to screen coordinates
        // The shader uses orthographic camera with bounds [-0.5, 0.5] for both axes
        blobs.forEach(blob => {
          // Map from shader space [-0.5 to 0.5] to screen space [0 to viewportSize]
          const screenX = ((blob.x + 0.5) / 1.0) * viewportWidth;
          const screenY = ((0.5 - blob.y) / 1.0) * viewportHeight; // Flip Y axis
          const screenRadius = blob.radius * Math.min(viewportWidth, viewportHeight);

          checkCollision(screenX, screenY, screenRadius);
        });

        animationFrameRef.current = requestAnimationFrame(detectBlobs);
      } catch (error) {
        console.error('Error in detectBlobs:', error);
        // Continue animation even if there's an error
        animationFrameRef.current = requestAnimationFrame(detectBlobs);
      }
    };

    animationFrameRef.current = requestAnimationFrame(detectBlobs);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [checkCollision]);

  return null;
}

