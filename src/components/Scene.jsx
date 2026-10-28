import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      return; // WebGL tidak tersedia: hero tetap tampil tanpa objek 3D
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    const group = new THREE.Group();
    scene.add(group);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.5, 0.45, 220, 24, 2, 3),
      new THREE.MeshBasicMaterial({ color: 0x7c5cff, wireframe: true, transparent: true, opacity: 0.45 })
    );
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.7, 1),
      new THREE.MeshBasicMaterial({ color: 0x35e0c2, wireframe: true, transparent: true, opacity: 0.8 })
    );
    group.add(knot, core);

    const count = 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) positions[i] = (Math.random() - 0.5) * 22;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xb8b6ff, size: 0.03, transparent: true, opacity: 0.7 })
    );
    scene.add(stars);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      group.position.x = w > 900 ? 2.4 : 0;
      group.position.y = w > 900 ? 0 : -1.2;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const clock = new THREE.Clock();
    let raf;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = clock.getElapsedTime();
      const s = reduceMotion ? 0 : 1;
      knot.rotation.x = t * 0.15 * s + mouse.y * 0.6;
      knot.rotation.y = t * 0.2 * s + mouse.x * 0.6;
      core.rotation.x = -t * 0.4 * s;
      core.rotation.y = -t * 0.3 * s;
      stars.rotation.y = t * 0.01 * s;
      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      knot.geometry.dispose();
      knot.material.dispose();
      core.geometry.dispose();
      core.material.dispose();
      starGeo.dispose();
      stars.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="scene" ref={canvasRef} aria-hidden="true" />;
}
