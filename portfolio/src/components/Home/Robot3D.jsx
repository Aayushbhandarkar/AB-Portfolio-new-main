import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function RobotBody() {
  const groupRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();
  const antennaRef = useRef();
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const jumpRef = useRef(null);

  const bodyMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#27231f", roughness: 0.3, metalness: 0.8 }),
    []
  );
  const accentMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#7c7a63", roughness: 0.4, metalness: 0.6 }),
    []
  );
  const eyeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#e9e8e2", emissive: "#e9e8e2", emissiveIntensity: 0.8, roughness: 0.1 }),
    []
  );
  const glowMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#c8c5b8", emissive: "#c8c5b8", emissiveIntensity: 0.3, roughness: 0.2, metalness: 0.5 }),
    []
  );

  const handleClick = () => {
    const messages = [
      "👋 Hey there!",
      "⚡ Let's code!",
      "🚀 Hire me!",
      "💡 Full Stack Dev",
      "🎯 Ready to work!"
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    setShowMessage(true);
    setClicked(true);
    jumpRef.current = Date.now();
    
    setTimeout(() => {
      setShowMessage(false);
      setClicked(false);
    }, 2000);
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Jump animation
    if (clicked && jumpRef.current) {
      const jumpProgress = (Date.now() - jumpRef.current) / 400;
      if (jumpProgress < 1) {
        const jumpY = Math.sin(jumpProgress * Math.PI) * 0.3;
        if (groupRef.current) {
          groupRef.current.position.y = jumpY;
        }
      } else {
        if (groupRef.current) {
          groupRef.current.position.y = 0;
        }
      }
    } else if (groupRef.current && !clicked) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.03;
    }
    
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.03;
    }
    
    if (eyeLeftRef.current && eyeRightRef.current) {
      const pulse = Math.sin(t * 3) * 0.1 + 1;
      eyeLeftRef.current.scale.setScalar(pulse);
      eyeRightRef.current.scale.setScalar(pulse);
    }
    
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(t * 1.5) * 0.15;
    }
  });

  // Create message element in DOM
  useEffect(() => {
    if (showMessage) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'robot-message-popup';
      msgDiv.textContent = message;
      document.body.appendChild(msgDiv);
      
      // Position near robot
      const robotContainer = document.querySelector('.robot-container');
      if (robotContainer) {
        const rect = robotContainer.getBoundingClientRect();
        msgDiv.style.position = 'fixed';
        msgDiv.style.left = `${rect.right - 100}px`;
        msgDiv.style.top = `${rect.top + 100}px`;
      }
      
      setTimeout(() => {
        msgDiv.remove();
      }, 2000);
      
      return () => {
        if (msgDiv) msgDiv.remove();
      };
    }
  }, [showMessage, message]);

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} scale={0.9} onClick={handleClick}>
        {/* Head */}
        <mesh position={[0, 1.2, 0]} material={bodyMaterial}>
          <boxGeometry args={[1.4, 1.2, 1.2]} />
        </mesh>
        {/* Head bevel/visor */}
        <mesh position={[0, 1.25, 0.55]} material={accentMaterial}>
          <boxGeometry args={[1.2, 0.5, 0.15]} />
        </mesh>
        {/* Eyes */}
        <mesh ref={eyeLeftRef} position={[-0.3, 1.3, 0.62]} material={eyeMaterial}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.3, 1.3, 0.62]} material={eyeMaterial}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
        {/* Antenna */}
        <group ref={antennaRef}>
          <mesh position={[0, 2, 0]} material={accentMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
          </mesh>
          <mesh position={[0, 2.3, 0]} material={glowMaterial}>
            <sphereGeometry args={[0.1, 16, 16]} />
          </mesh>
        </group>
        {/* Neck */}
        <mesh position={[0, 0.5, 0]} material={accentMaterial}>
          <cylinderGeometry args={[0.2, 0.25, 0.3, 8]} />
        </mesh>
        {/* Torso */}
        <mesh position={[0, -0.3, 0]} material={bodyMaterial}>
          <boxGeometry args={[1.6, 1.4, 1]} />
        </mesh>
        {/* Chest plate */}
        <mesh position={[0, -0.15, 0.52]} material={glowMaterial}>
          <boxGeometry args={[0.8, 0.6, 0.08]} />
        </mesh>
        {/* Chest circle detail */}
        <mesh position={[0, -0.15, 0.58]} material={eyeMaterial}>
          <circleGeometry args={[0.15, 32]} />
        </mesh>
        {/* Arms */}
        <mesh position={[-1.1, -0.1, 0]} material={accentMaterial}>
          <boxGeometry args={[0.35, 1.1, 0.4]} />
        </mesh>
        <mesh position={[-1.1, -0.8, 0]} material={bodyMaterial}>
          <sphereGeometry args={[0.22, 16, 16]} />
        </mesh>
        <mesh position={[1.1, -0.1, 0]} material={accentMaterial}>
          <boxGeometry args={[0.35, 1.1, 0.4]} />
        </mesh>
        <mesh position={[1.1, -0.8, 0]} material={bodyMaterial}>
          <sphereGeometry args={[0.22, 16, 16]} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.4, -1.4, 0]} material={accentMaterial}>
          <boxGeometry args={[0.4, 1, 0.45]} />
        </mesh>
        <mesh position={[0.4, -1.4, 0]} material={accentMaterial}>
          <boxGeometry args={[0.4, 1, 0.45]} />
        </mesh>
        {/* Feet */}
        <mesh position={[-0.4, -2, 0.1]} material={bodyMaterial}>
          <boxGeometry args={[0.5, 0.2, 0.65]} />
        </mesh>
        <mesh position={[0.4, -2, 0.1]} material={bodyMaterial}>
          <boxGeometry args={[0.5, 0.2, 0.65]} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Robot3D() {
  return (
    <div className="robot-3d-wrapper">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#e9e8e2" />
        <directionalLight position={[-3, 3, 2]} intensity={0.6} color="#7c7a63" />
        <pointLight position={[0, 2, 4]} intensity={0.7} color="#e9e8e2" />
        <pointLight position={[2, 1, 3]} intensity={0.5} color="#7c7a63" />
        <RobotBody />
        <Environment preset="studio" background={false} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}