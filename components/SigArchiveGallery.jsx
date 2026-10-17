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
    Math.sin(a) * 7.2,
    Math.sin(a * 2) * 2.1,
    Math.cos(a) * 4.5
  );
}

function cameraPoint(t) {
  const point = ribbonPoint(t);
  const inward = new THREE.Vector3(-point.x, 0, -point.z).normalize();
  return point.add(inward.multiplyScalar(2.1));
}

export default function SigArchiveGallery() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Keep the SIG shortcut rail out of the opening/landing view.
    const gallerySection = canvas.closest(".sig-gallery");
    let galleryObserver;
    if (gallerySection && "IntersectionObserver" in window) {
      galleryObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.25)) {
          gallerySection.classList.add("sig-gallery--entered");
          galleryObserver.disconnect();
        }
      }, { threshold: [0.25] });
      galleryObserver.observe(gallerySection);
    } else {
      gallerySection?.classList.add("sig-gallery--entered");
    }

    const updateMissionRail = () => {
      const rail = document.querySelector(".sigc-mission-nav");
      if (!gallerySection || !rail) return;
      const galleryBottom = gallerySection.getBoundingClientRect().bottom;
      const beyondGallery = galleryBottom <= 2;
      rail.classList.toggle("sigc-mission-nav--visible", beyondGallery);
    };
    updateMissionRail();
    window.addEventListener("scroll", updateMissionRail, { passive: true });
    window.addEventListener("resize", updateMissionRail);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    const overviewPosition = new THREE.Vector3(0, 0, 15.5);
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
    const cardW = 3.05;
    const cardH = 2.03;
    const initialCardPosition = new THREE.Vector3(0, -0.25, 1.2);
    const desiredCamera = new THREE.Vector3();
    const desiredLook = new THREE.Vector3();
    const lookAtPoint = new THREE.Vector3();
    let targetProgress = 0;
    let currentProgress = 0;

    galleryItems.forEach((item) => {
      const texture = loader.load(item.src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.generateMipmaps = true;
      textures.set(item.src, texture);
    });

    galleryItems.forEach((item, index) => {
      const geometry = new THREE.PlaneGeometry(cardW, cardH);
      const material = new THREE.MeshBasicMaterial({
        map: textures.get(item.src),
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: index === 0 ? 1 : 0,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.item = item;
      mesh.userData.pathT = index / galleryItems.length;
      mesh.position.copy(index === 0 ? initialCardPosition : ribbonPoint(mesh.userData.pathT));
      mesh.scale.setScalar(index === 0 ? 1 : 0.55);
      scene.add(mesh);
      cards.push(mesh);
    });

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onWheel = (event) => {
      const atStart = targetProgress <= 0 && event.deltaY < 0;
      const atEnd = targetProgress >= 1 && event.deltaY > 0;
      if (atStart || atEnd) return;

      event.preventDefault();
      targetProgress = THREE.MathUtils.clamp(
        targetProgress + event.deltaY * 0.00022,
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
      currentProgress += (targetProgress - currentProgress) * 0.065;

      const rideBlend = THREE.MathUtils.smoothstep(currentProgress, 0.025, 0.2);
      const rideT = THREE.MathUtils.clamp(currentProgress, 0, 0.999);
      const pathPoint = ribbonPoint(rideT);
      const nextPoint = ribbonPoint((rideT + 0.025) % 1);
      const tangent = nextPoint.clone().sub(pathPoint).normalize();

      desiredCamera.copy(cameraPoint(rideT));
      desiredCamera.addScaledVector(tangent, -2.3);
      desiredCamera.y += Math.sin(rideT * Math.PI * 4) * 0.5;
      desiredLook.copy(pathPoint).addScaledVector(tangent, 3.4);
      desiredLook.y += Math.sin(rideT * Math.PI * 6) * 0.4;

      camera.position.lerpVectors(overviewPosition, desiredCamera, rideBlend);
      lookAtPoint.set(0, 0, 0).lerp(desiredLook, rideBlend);
      camera.lookAt(lookAtPoint);
      camera.rotation.z += Math.sin(rideT * Math.PI * 6) * rideBlend * 0.0015;

      cards.forEach((mesh, index) => {
        const t = mesh.userData.pathT;
        const point = ribbonPoint(t);
        const isFirst = index === 0;
        const reveal = isFirst
          ? 1 - THREE.MathUtils.smoothstep(currentProgress, 0.02, 0.12)
          : THREE.MathUtils.smoothstep(currentProgress, Math.max(0.015, t - 0.075), t + 0.025);

        const pathPosition = point.clone();
        const targetPosition = isFirst
          ? initialCardPosition.clone().lerp(pathPosition, rideBlend)
          : pathPosition;
        mesh.position.lerp(targetPosition, 0.16);

        const angle = t * Math.PI * 2;
        const tangentYaw = Math.atan2(-Math.cos(angle), Math.sin(angle));
        mesh.rotation.x = Math.sin(angle * 2) * 0.045;
        mesh.rotation.y = THREE.MathUtils.lerp(Math.sin(angle) * 0.12, tangentYaw, rideBlend);
        mesh.rotation.z = Math.sin(angle * 2) * 0.035;

        const depthScale = THREE.MathUtils.clamp((point.z + 5.2) / 8.8, 0.5, 1.08);
        const rideScale = 0.88 + Math.sin((t - rideT) * Math.PI * 2) * 0.12;
        const targetScale = isFirst
          ? THREE.MathUtils.lerp(1, depthScale, rideBlend)
          : THREE.MathUtils.lerp(0.5, depthScale * rideScale, rideBlend);
        mesh.scale.setScalar(targetScale);
        mesh.material.opacity = isFirst
          ? Math.max(0, reveal)
          : Math.max(0, reveal) * THREE.MathUtils.clamp((point.z + 6.2) / 7.5, 0.35, 1);
        mesh.renderOrder = Math.round(point.z * 10) + (isFirst && currentProgress < 0.08 ? 100 : 0);
      });

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      galleryObserver?.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateMissionRail);
      window.removeEventListener("resize", updateMissionRail);
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
    <section className="sig-gallery" aria-label="ACM Amritapuri interactive photo journey">
      <div className="sig-gallery__stage">
        <div className="sig-gallery__intro" aria-hidden="true">
          <h2 className="sig-gallery__title"><span>GALLERY</span></h2>
        </div>
        <canvas
          ref={canvasRef}
          className="sig-gallery__canvas"
          aria-label="Scroll with the mouse wheel to travel through ACM photographs in a 3D roller-coaster experience"
        />
        <p className="sig-gallery__hint">SCROLL TO BEGIN <span aria-hidden="true">/</span> KEEP SCROLLING TO TRAVEL</p>
      </div>
    </section>
  );
}
