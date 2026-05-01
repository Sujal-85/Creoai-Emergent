import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ProductScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Panel base
    const panelGeom = new THREE.BoxGeometry(2.6, 1.6, 0.04);
    const panelMat = new THREE.MeshBasicMaterial({ color: 0x111113 });
    const panel = new THREE.Mesh(panelGeom, panelMat);
    group.add(panel);

    // Panel wire overlay
    const wireGeom = new THREE.PlaneGeometry(2.6, 1.6, 6, 4);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x1c1c1f, wireframe: true });
    const wire = new THREE.Mesh(wireGeom, wireMat);
    wire.position.z = 0.03;
    group.add(wire);

    // Accent lime line
    const accent = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.01), new THREE.MeshBasicMaterial({ color: 0xc6f24e }));
    accent.position.set(-1.1, 0.5, 0.04);
    group.add(accent);

    // UI grid squares
    const squarePositions = [-0.8, -0.3, 0.2, 0.7];
    squarePositions.forEach((x, i) => {
      const mat = new THREE.MeshBasicMaterial({ color: i === 1 ? 0xfafaf7 : 0x52525b });
      const sq = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.01), mat);
      sq.position.set(x, -0.4, 0.045);
      group.add(sq);
    });

    // Text-like bars
    const bar1 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.05, 0.01), new THREE.MeshBasicMaterial({ color: 0x52525b }));
    bar1.position.set(0.6, 0.35, 0.045);
    group.add(bar1);
    const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.01), new THREE.MeshBasicMaterial({ color: 0xa1a1aa }));
    bar2.position.set(0.6, 0.2, 0.045);
    group.add(bar2);
    const bar3 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.01), new THREE.MeshBasicMaterial({ color: 0x52525b }));
    bar3.position.set(0.6, 0.05, 0.045);
    group.add(bar3);

    group.rotation.set(-0.1, -0.35, 0);

    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();
      if (!reduced) {
        group.rotation.y += dt * 0.14;
        group.rotation.x = -0.1 + Math.sin(t * 0.4) * 0.12;
        group.position.y = Math.sin(t * 0.6) * 0.08;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth || 600;
      const h = mount.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      panelGeom.dispose(); panelMat.dispose();
      wireGeom.dispose(); wireMat.dispose();
      accent.geometry.dispose(); accent.material.dispose();
      bar1.geometry.dispose(); bar1.material.dispose();
      bar2.geometry.dispose(); bar2.material.dispose();
      bar3.geometry.dispose(); bar3.material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
