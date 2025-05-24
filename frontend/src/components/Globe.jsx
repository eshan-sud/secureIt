// frontend/src/components/Globe.jsx

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";

function RotatingGlobe() {
  const meshRef = useRef();
  const earthTexture = useTexture("/textures/earth.jpg");

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.025;
    }
  });

  return (
    <Sphere args={[1, 32, 32]} ref={meshRef} scale={2}>
      <meshStandardMaterial map={earthTexture} />
    </Sphere>
  );
}

export const Globe = () => {
  return (
    <Canvas style={{ height: "100vh" }}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <RotatingGlobe />
    </Canvas>
  );
};
