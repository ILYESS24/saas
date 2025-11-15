"use client";

import React, { useEffect, useRef } from 'react';
import { useTextCollision } from '@/contexts/text-collision-context';

export function LavaLampDetector() {
  const { checkCollision } = useTextCollision();
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const detectBlobs = () => {
      const time = Date.now() / 1000;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate blob positions based on shader logic
      // The shader rotates points around different axes
      // We need to simulate the 3D rotation and project to 2D
      const blobs = [
        {
          // First sphere: rotated around Z axis, original position (-0.5, 0.0, 0.0)
          x: Math.cos(time / 5) * -0.5 - Math.sin(time / 5) * 0.0,
          y: Math.sin(time / 5) * -0.5 + Math.cos(time / 5) * 0.0,
          radius: 0.35
        },
        {
          // Second sphere: rotated around (1,1,1), original position (0.55, 0.0, 0.0)
          x: Math.cos(-time / 5) * 0.55,
          y: Math.sin(-time / 5) * 0.55,
          radius: 0.3
        },
        {
          // Third sphere: same rotation as second, original position (-0.8, 0.0, 0.0)
          x: Math.cos(-time / 5) * -0.8,
          y: Math.sin(-time / 5) * -0.8,
          radius: 0.2
        },
        {
          // Fourth sphere: rotated around (1,1,0), original position (1.0, 0.0, 0.0)
          x: Math.cos(-time / 4.5) * 1.0,
          y: Math.sin(-time / 4.5) * 1.0,
          radius: 0.15
        },
        {
          // Fifth sphere: rotated around Y axis, original position (0.45, -0.45, 0.0)
          x: Math.cos(-time / 4.0) * 0.45,
          y: -0.45 + Math.sin(-time / 4.0) * 0.45,
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
    };

    animationFrameRef.current = requestAnimationFrame(detectBlobs);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [checkCollision]);

  return null;
}

