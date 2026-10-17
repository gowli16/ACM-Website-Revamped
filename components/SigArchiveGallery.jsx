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

function ribbonPoint(t) {
  const a = t * Math.PI * 2;
  return new THREE.Vector3(
    Math.sin(a) * 7.6,
    Math.sin(a * 2) * 1.85,
    Math.cos(a) * 5.2
  );
}

export default function SigArchiveGallery() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0, 16.2);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x000000, 0);

    const loader = new THREE.TextureLoader();
    const textures = new Map();
    const cards = [];
    const copies = 6;
    const totalCards = galleryItems.length * copies;
    const cardW = 2.05;
    const cardH = 1.35;
    let targetProgress = 0;
    let currentProgress = 0;

    galleryItems.forEach((item) => {
      const texture = loader.load(item.src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;
      textures.set(item.src, texture);
    });

    for (let index = 0; index < totalCards; index += 1) {
      const item = galleryItems[index % galleryItems.length];
      const geometry = new THREE.PlaneGeometry(cardW, cardH);
      const material = new THREE.MeshBasicMaterial({
        map: textures.get(item.src),
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.item = item;
      groupSafeAdd(scene, mesh);
      cards.push(mesh);
    }

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 19 : width < 900 ? 17.5 : 16.2;
      camera.updateProjectionMatrix();
    };

    const onWheel = (event) => {
      event.preventDefault();
      targetProgress += event.deltaY * 0.00018;
      targetProgress = THREE.MathUtils.clamp(targetProgress, -2.5, 2.5);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      currentProgress += (targetProgress - currentProgress) * 0.085;

      cards.forEach((mesh, index) => {
        const t = (index / totalCards + currentProgress) % 1;
        const wrappedT = t < 0 ? t + 1 : t;
        const point = ribbonPoint(wrappedT);
        mesh.position.copy(point);

        const angle = wrappedT * Math.PI * 2;
        mesh.rotation.x = Math.sin(angle) * 0.07;
        mesh.rotation.y = Math.sin(angle) * 0.22;
        mesh.rotation.z = Math.sin(angle * 2) * 0.035;

        const depthScale = THREE.MathUtils.clamp((point.z + 5.8) / 8.4, 0.34, 1.12);
        mesh.scale.setScalar(depthScale);
        mesh.material.opacity = THREE.MathUtils.clamp((point.z + 6.2) / 7.6, 0.18, 1);
        mesh.renderOrder = Math.round(point.z * 10);
      });

      renderer.render(scene, camera);
    };

    cards.forEach((mesh, index) => {
      const t = index / totalCards;
      const point = ribbonPoint(t);
      mesh.position.copy(point);
      mesh.scale.setScalar(THREE.MathUtils.clamp((point.z + 5.8) / 8.4, 0.34, 1.12));
    });

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("wheel", onWheel);
      cards.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <section className="sig-gallery" aria-label="ACM Amritapuri depth ribbon photo gallery">
      <div className="sig-gallery__stage">
        <h2 className="sig-gallery__title">GALLERY</h2>
        <canvas
          ref={canvasRef}
          className="sig-gallery__canvas"
          aria-label="Scroll with the mouse wheel to travel through the 3D ribbon of ACM photographs"
        />
        <p className="sig-gallery__hint">SCROLL TO EXPLORE <span aria-hidden="true">/</span> ACM AMRITAPURI</p>
      </div>
    </section>
  );
}

function groupSafeAdd(scene, mesh) {
  scene.add(mesh);
}
