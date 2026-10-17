import { useEffect, useRef, useState } from "react";
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
    Math.sin(a) * 7.1,
    Math.sin(a * 2) * 1.65,
    Math.cos(a) * 4.1
  );
}

export default function SigArchiveGallery() {
  const canvasRef = useRef(null);
  const [focusedItem, setFocusedItem] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0, 15.8);
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

    const group = new THREE.Group();
    scene.add(group);

    const loader = new THREE.TextureLoader();
    const textures = new Map();
    const cards = [];
    const copies = 4;
    const totalCards = galleryItems.length * copies;
    const cardW = 1.95;
    const cardH = 1.3;
    let selectedIndex = null;
    let pointerDown = false;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    galleryItems.forEach((item) => {
      const texture = loader.load(item.src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
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
      mesh.userData.index = index;
      mesh.userData.item = item;
      group.add(mesh);
      cards.push(mesh);
    }

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 600 ? 18.5 : width < 900 ? 17 : 15.8;
      camera.updateProjectionMatrix();
    };

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = (event) => {
      updatePointer(event);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(cards, false);
      if (!hits.length) {
        selectedIndex = null;
        setFocusedItem(null);
        return;
      }
      const hitIndex = hits[0].object.userData.index;
      if (selectedIndex === hitIndex) {
        selectedIndex = null;
        setFocusedItem(null);
      } else {
        selectedIndex = hitIndex;
        setFocusedItem(hits[0].object.userData.item);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        selectedIndex = null;
        setFocusedItem(null);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);

    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = (now) => {
      raf = requestAnimationFrame(animate);
      if (!last) last = now;
      const delta = Math.min((now - last) / 1000, 0.04);
      last = now;
      if (!reduced && selectedIndex === null) elapsed += delta * 0.045;

      cards.forEach((mesh, index) => {
        const t = (index / totalCards + elapsed) % 1;
        const point = ribbonPoint(t);
        const selected = index === selectedIndex;
        const targetX = selected ? 0 : point.x;
        const targetY = selected ? 0 : point.y;
        const targetZ = selected ? 2.4 : point.z;
        const easing = selected ? 0.12 : 0.16;

        mesh.position.x += (targetX - mesh.position.x) * easing;
        mesh.position.y += (targetY - mesh.position.y) * easing;
        mesh.position.z += (targetZ - mesh.position.z) * easing;

        const angle = t * Math.PI * 2;
        mesh.rotation.x += ((selected ? 0 : Math.sin(angle) * 0.08) - mesh.rotation.x) * 0.12;
        mesh.rotation.y += ((selected ? 0 : Math.sin(angle) * 0.24) - mesh.rotation.y) * 0.12;
        mesh.rotation.z += ((selected ? 0 : Math.sin(angle * 2) * 0.035) - mesh.rotation.z) * 0.12;

        const depthScale = THREE.MathUtils.clamp((point.z + 5.2) / 8.2, 0.42, 1.08);
        const targetScale = selected ? 2.45 : depthScale;
        const scale = mesh.scale.x + (targetScale - mesh.scale.x) * 0.13;
        mesh.scale.setScalar(scale);

        const targetOpacity = selectedIndex !== null
          ? (selected ? 1 : 0.13)
          : THREE.MathUtils.clamp((point.z + 5.5) / 6.8, 0.24, 1);
        mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.12;
        mesh.renderOrder = selected ? 10 : Math.round(point.z * 10);
      });

      renderer.render(scene, camera);
    };

    cards.forEach((mesh) => {
      const t = mesh.userData.index / totalCards;
      const point = ribbonPoint(t);
      mesh.position.copy(point);
      mesh.scale.setScalar(THREE.MathUtils.clamp((point.z + 5.2) / 8.2, 0.42, 1.08));
    });

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("click", onClick);
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
          aria-label="Interactive 3D ribbon of ACM photographs. Click a card to focus it, click again or press Escape to return."
        />
        {focusedItem && (
          <div className="sig-gallery__focus-caption" aria-live="polite">
            <span>ACM AMRITAPURI / ARCHIVE</span>
            <strong>{focusedItem.name}</strong>
            <small>CLICK THE IMAGE OR PRESS ESC TO RETURN</small>
          </div>
        )}
        <p className="sig-gallery__hint">ACM AMRITAPURI <span aria-hidden="true">/</span> OUR MOMENTS</p>
      </div>
    </section>
  );
}
