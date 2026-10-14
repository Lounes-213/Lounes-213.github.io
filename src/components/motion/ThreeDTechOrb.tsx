"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeDTechOrbProps = {
  className?: string;
  size?: number;
};

/**
 * ThreeDTechOrb: Interactive WebGL 3D holographic tech sphere using Three.js.
 * Renders an outer wireframe icosahedron, an inner luminous faceted core,
 * and an orbiting constellation of particles that track mouse cursor movement in real time.
 */
export function ThreeDTechOrb({ className, size }: ThreeDTechOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // Dimensions
    const width = size || container.clientWidth || 280;
    const height = size || container.clientHeight || 280;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse-driven 3D rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Colors matching design system accent palette (Cyan / Sky / Indigo)
    const primaryColor = new THREE.Color("#0ea5e9"); // Tailwind sky-500
    const secondaryColor = new THREE.Color("#6366f1"); // Tailwind indigo-500
    const accentColor = new THREE.Color("#38bdf8"); // Tailwind sky-400

    // 1. Outer Geometric Wireframe (Icosahedron)
    const outerGeometry = new THREE.IcosahedronGeometry(1.7, 1);
    const outerWireframe = new THREE.WireframeGeometry(outerGeometry);
    const outerLine = new THREE.LineSegments(
      outerWireframe,
      new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.45,
        linewidth: 1,
      }),
    );
    mainGroup.add(outerLine);

    // 2. Outer Vertices Nodes (added as child of outerLine)
    const posAttr = outerGeometry.attributes.position;
    let vertexPointsGeom: THREE.BufferGeometry | null = null;
    if (posAttr) {
      vertexPointsGeom = new THREE.BufferGeometry();
      vertexPointsGeom.setAttribute("position", posAttr.clone());
      const vertexPointsMat = new THREE.PointsMaterial({
        color: primaryColor,
        size: 0.08,
        transparent: true,
        opacity: 0.85,
      });
      const vertexPoints = new THREE.Points(vertexPointsGeom, vertexPointsMat);
      outerLine.add(vertexPoints);
    }

    // 3. Inner Glowing Faceted Core (Octahedron)
    const innerGeometry = new THREE.OctahedronGeometry(0.85, 0);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: secondaryColor,
      emissive: primaryColor,
      emissiveIntensity: 0.35,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mainGroup.add(innerMesh);

    // 4. Orbiting Constellation Particle Ring
    const particlesCount = 80;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const radius = 2.3 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * 0.9;
      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const particlesRing = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particlesRing);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x6366f1, 1.5);
    dirLight2.position.set(-5, -5, -3);
    scene.add(dirLight2);

    // Mouse tracking with inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 2;
      mouseY = y * 2;
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      // Gentle parallax when moving mouse across the entire window
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRotationY = x * 0.8;
      targetRotationX = y * 0.8;
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    container.addEventListener("mousemove", handleMouseMove, { passive: true });

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Continuous base rotation
      outerLine.rotation.y = elapsedTime * 0.25;
      outerLine.rotation.x = elapsedTime * 0.15;

      innerMesh.rotation.y = -elapsedTime * 0.4;
      innerMesh.rotation.z = elapsedTime * 0.2;

      particlesRing.rotation.y = elapsedTime * 0.12;
      particlesRing.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2;

      // Smooth lerp to mouse targets
      mainGroup.rotation.y += (targetRotationY + mouseX * 0.5 - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX + mouseY * 0.5 - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleWindowMouseMove);
      container.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeometry.dispose();
      outerWireframe.dispose();
      innerGeometry.dispose();
      particleGeometry.dispose();
      if (vertexPointsGeom) vertexPointsGeom.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{ touchAction: "none" }}
    />
  );
}
