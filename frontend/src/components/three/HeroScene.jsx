import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Inner wire icosa
    const innerGeom = new THREE.IcosahedronGeometry(1.8, 1);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xfafaf7, wireframe: true, transparent: true, opacity: 0.55 });
    const inner = new THREE.Mesh(innerGeom, innerMat);
    scene.add(inner);

    // Outer wire icosa, lime
    const outerGeom = new THREE.IcosahedronGeometry(2.4, 0);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0xc6f24e, wireframe: true, transparent: true, opacity: 0.18 });
    const outer = new THREE.Mesh(outerGeom, outerMat);
    outer.rotation.set(0.4, 0.2, 0);
    scene.add(outer);

    // Particles — faint starfield
    const pCount = 200;
    const pGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    pGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xa1a1aa, size: 0.015, transparent: true, opacity: 0.5 });
    const points = new THREE.Points(pGeom, pMat);
    scene.add(points);

    // Mouse parallax state
    const mouse = { x: 0.5, y: 0.5 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = (e.clientY - r.top) / r.height;
    };
    mount.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    let raf;
    const group = new THREE.Group();
    scene.add(group);
    group.add(inner); group.add(outer);

    const animate = () => {
      const dt = clock.getDelta();
      if (!reduced) {
        inner.rotation.y += dt * 0.12;
        inner.rotation.x += dt * 0.04;
        outer.rotation.y -= dt * 0.08;
        points.rotation.y += dt * 0.02;
      }
      const tx = (mouse.x - 0.5) * 0.8;
      const ty = (0.5 - mouse.y) * 0.5;
      group.position.x += (tx - group.position.x) * 0.06;
      group.position.y += (ty - group.position.y) * 0.06;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      innerGeom.dispose(); innerMat.dispose();
      outerGeom.dispose(); outerMat.dispose();
      pGeom.dispose(); pMat.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
