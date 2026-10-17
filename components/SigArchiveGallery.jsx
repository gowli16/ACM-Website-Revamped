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
    Math.sin(a) * 7.7,
    Math.sin(a * 2) * 1.8,
    Math.cos(a) * 4.7
  );
}

function cameraPoint(t) {
  const point = ribbonPoint(t);
  const inward = new THREE.Vector3(-point.x, 0, -point.z).normalize();
  return point.add(inward.multiplyScalar(1.9));
}

export default function SigArchiveGallery() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    const overviewPosition = new THREE.Vector3(0, 0, 18);
    camera.position.copy(overviewPosition);
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
    const totalCards = galleryItems.length * 2;
    const cardW = 1.62;
    const cardH = 1.08;
    const lookAhead = new THREE.Vector3();
    const desiredCamera = new THREE.Vector3();
    const desiredLook = new THREE.Vector3();
    const startLook = new THREE.Vector3(0, 0, 0);
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
      mesh.userData.pathT = index / totalCards;
      scene.add(mesh);
      cards.push(mesh);
    }

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onWheel = (event) => {
      event.preventDefault();
      targetProgress = THREE.MathUtils.clamp(
        targetProgress + event.deltaY * 0.00012,
        0,
        1
      );
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      currentProgress += (targetProgress - currentProgress) * 0.075;

      // First scroll transitions from the full-ribbon overview into the ride.
      const rideBlend = THREE.MathUtils.smoothstep(currentProgress, 0.035, 0.19);
      const rideT = THREE.MathUtils.clamp((currentProgress - 0.12) / 0.88, 0, 0.999);
      const pathPoint = ribbonPoint(rideT);
      const nextPoint = ribbonPoint((rideT + 0.018) % 1);
      const tangent = nextPoint.clone().sub(pathPoint).normalize();
      const inward = new THREE.Vector3(-pathPoint.x, 0, -pathPoint.z).normalize();

      desiredCamera.copy(cameraPoint(rideT));
      desiredCamera.addScaledVector(tangent, -1.3);
      desiredCamera.y += 0.25;
      desiredLook.copy(pathPoint).addScaledVector(tangent, 2.6);
      desiredLook.y += 0.15;

      camera.position.lerpVectors(overviewPosition, desiredCamera, rideBlend);
      lookAhead.copy(startLook).lerp(desiredLook, rideBlend);
      camera.lookAt(lookAhead);

      cards.forEach((mesh) => {
        const t = mesh.userData.pathT;
        const point = ribbonPoint(t);
        const angle = t * Math.PI * 2;
        mesh.position.copy(point);

        // In the overview, cards face toward the viewer; during the ride, they face inward toward the track.
        const inwardYaw = Math.atan2(-Math.sin(angle), -Math.cos(angle));
        const overviewYaw = Math.sin(angle) * 0.18;
        mesh.rotation.set(
          Math.sin(angle * 2) * 0.045,
          THREE.MathUtils.lerp(overviewYaw, inwardYaw, rideBlend),
          Math.sin(angle * 2) * 0.025
        );

        const depthScale = THREE.MathUtils.clamp((point.z + 5.4) / 8.4, 0.52, 1.02);
        const targetScale = THREE.MathUtils.lerp(depthScale, 1.0, rideBlend);
        mesh.scale.setScalar(targetScale);

        const depthOpacity = THREE.MathUtils.clamp((point.z + 5.8) / 7.3, 0.42, 1);
        mesh.material.opacity = THREE.MathUtils.lerp(depthOpacity, 1, rideBlend);
        mesh.renderOrder = Math.round(point.z * 10);
      });

      renderer.render(scene, camera);
    };

    cards.forEach((mesh) => {
      const point = ribbonPoint(mesh.userData.pathT);
      mesh.position.copy(point);
      mesh.rotation.y = Math.sin(mesh.userData.pathT * Math.PI * 2) * 0.18;
      mesh.scale.setScalar(THREE.MathUtils.clamp((point.z + 5.4) / 8.4, 0.52, 1.02));
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
          aria-label="Scroll with the mouse wheel to zoom into and travel along the 3D ribbon of ACM photographs"
        />
        <p className="sig-gallery__hint">SCROLL TO RIDE <span aria-hidden="true">/</span> ACM AMRITAPURI</p>
      </div>
    </section>
  );
}
