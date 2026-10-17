import { useEffect, useRef } from "react";
import * as THREE from "three";

const galleryItems = [
  { name: "Epochon 2.0 hackathon", src: "/assets/aiEvents/epochon 2.0.jpeg" },
  { name: "Active Directory workshop", src: "/assets/workshops/active-directory-1.jpeg" },
  { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/2.jpeg" },
  { name: "Agentic AI workshop", src: "/assets/aiEvents/agentic ai workshop.jpeg" },
  { name: "Web SIG exploration", src: "/assets/webexplorations/3.jpeg" },
  { name: "ACM Amritapuri chapter team", src: "/assets/ACM-Pics/team-photo.jpg" },
  { name: "ISEA cybersecurity workshop", src: "/assets/cyberworkshops/1.jpeg" },
  { name: "Active Directory workshop", src: "/assets/workshops/active-directory-2.jpeg" },
  { name: "Cybersecurity exploration", src: "/assets/cyberExplorations/4.jpeg" },
  { name: "Glitch SIG exploration", src: "/assets/glitchExplorations/3.jpg" },
  { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/4.jpeg" },
  { name: "Web SIG exploration", src: "/assets/webexplorations/5.jpeg" },
];

function ribbonPoint(t, phase = 0) {
  const a = t * Math.PI * 2 + phase;
  return new THREE.Vector3(
    Math.sin(a) * 4.2,
    Math.sin(a * 2) * 1.55,
    Math.cos(a) * 2.2
  );
}

export default function SigArchiveGallery() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0, 12.5);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x000000, 0);
    const ambient = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambient);

    const group = new THREE.Group();
    scene.add(group);
    const loader = new THREE.TextureLoader();
    const cards = [];
    const materialFallback = new THREE.MeshBasicMaterial({ color: 0x163044, side: THREE.DoubleSide });
    const cardW = 2.25;
    const cardH = 1.45;

    galleryItems.forEach((item, index) => {
      const geometry = new THREE.PlaneGeometry(cardW, cardH);
      const material = materialFallback.clone();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.index = index;
      mesh.userData.item = item;
      group.add(mesh);
      cards.push(mesh);
      loader.load(item.src, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
      });
    });

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 15 : width < 900 ? 13.5 : 12.5;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = (now) => {
      raf = requestAnimationFrame(animate);
      if (!last) last = now;
      const delta = Math.min((now - last) / 1000, 0.04);
      last = now;
      if (!reduced) elapsed += delta * 0.032;
      cards.forEach((mesh, index) => {
        const t = (index / cards.length + elapsed) % 1;
        const p = ribbonPoint(t);
        mesh.position.copy(p);
        mesh.position.x *= window.innerWidth < 600 ? 0.72 : 1;
        mesh.position.y += Math.sin(t * Math.PI * 4) * 0.1;
        mesh.position.z += Math.sin(t * Math.PI * 2) * 0.5;
        mesh.rotation.set(
          Math.sin(t * Math.PI * 2) * 0.09,
          Math.sin(t * Math.PI * 2) * 0.28,
          Math.sin(t * Math.PI * 4) * 0.055
        );
        const depthScale = THREE.MathUtils.clamp((mesh.position.z + 4.5) / 8, 0.58, 1.08);
        mesh.scale.setScalar(depthScale);
        mesh.material.opacity = THREE.MathUtils.clamp((mesh.position.z + 5) / 6, 0.2, 1);
        mesh.material.transparent = true;
      });
      group.rotation.y = Math.sin(elapsed * 0.35) * 0.08;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      cards.forEach((mesh) => {
        mesh.geometry.dispose();
        if (mesh.material.map) mesh.material.map.dispose();
        mesh.material.dispose();
      });
      materialFallback.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="sig-gallery" aria-label="ACM Amritapuri depth ribbon photo gallery">
      <div className="sig-gallery__stage">
        <h2 className="sig-gallery__title">GALLERY</h2>
        <canvas ref={canvasRef} className="sig-gallery__canvas" aria-label="Photographs moving along a 3D ribbon" />
        <p className="sig-gallery__hint">ACM AMRITAPURI <span aria-hidden="true">/</span> OUR MOMENTS</p>
      </div>
    </section>
  );
}
