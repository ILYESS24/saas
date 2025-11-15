"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, N8AO, SMAA, EffectComposer } from '@react-three/postprocessing';
import { useRef, useState, Suspense, useEffect } from "react";
import { Mesh } from "three";
import { KernelSize } from "postprocessing";
import * as THREE from "three";

function Shape() {
  const meshRef = useRef<Mesh>(null);
  const innerSphereRef = useRef<Mesh>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    // Créer la géométrie du cube avec des bords arrondis
    const loadGeometry = async () => {
      try {
        const module = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
        const RoundedBoxGeometry = module.RoundedBoxGeometry;
        const boxGeo = new RoundedBoxGeometry(2, 2, 2, 7, 0.2);
        setGeometry(boxGeo);
      } catch (err) {
        console.error('Failed to load RoundedBoxGeometry, using BoxGeometry:', err);
        // Fallback vers BoxGeometry si RoundedBoxGeometry ne charge pas
        const boxGeo = new THREE.BoxGeometry(2, 2, 2);
        setGeometry(boxGeo);
      }
    };
    
    loadGeometry();
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.z += delta * 0.2;
    }
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.x += delta * 0.3;
      innerSphereRef.current.rotation.y += delta * 0.5;
      innerSphereRef.current.rotation.z += delta * 0.1;
    }
  });

  if (!geometry) {
    return null;
  }

  return (
    <>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial 
          roughness={0}
          metalness={0.95}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#000000"
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          emissive={"white"}
          emissiveIntensity={1}
        />
      </mesh>
    </>
  );
}

function Environment() {
  return (
    <>
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={0.2} 
        color="#e6f3ff"
      />
      <directionalLight 
        position={[0, -5, 10]} 
        intensity={0.4} 
        color="#fff5e6"
      />
      <ambientLight intensity={0.8} color="#404040" />
      <pointLight 
        position={[8, 3, 8]} 
        intensity={0.2} 
        color="#ffeecc"
        distance={20}
      />
      <pointLight 
        position={[-8, 3, -8]} 
        intensity={0.2} 
        color="#ccf0ff"
        distance={20}
      />
      <directionalLight 
        position={[0, -10, 0]} 
        intensity={0.2} 
        color="#f0f0f0"
      />
    </>
  );
}

function CubeSceneContent() {
  return (
    <>
      <Environment />
      <Suspense fallback={null}>
        <Shape />
      </Suspense>
      <EffectComposer multisampling={0}>
        <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
        <Bloom
          kernelSize={3}
          luminanceThreshold={0}
          luminanceSmoothing={0.4}
          intensity={0.6}
        />
        <Bloom
          kernelSize={KernelSize.HUGE}
          luminanceThreshold={0}
          luminanceSmoothing={0}
          intensity={0.5}
        />
        <SMAA />
      </EffectComposer>
    </>
  );
}

export function Cube3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black rounded-lg">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [5, 5, 5], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <CubeSceneContent />
      </Suspense>
    </Canvas>
  );
}

