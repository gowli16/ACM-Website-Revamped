import { useEffect, useRef, useState } from "react";

const galleryColumns = [
  [
    { name: "Epochon 2.0 hackathon", src: "/assets/aiEvents/epochon 2.0.jpeg", shape: "landscape" },
    { name: "Active Directory workshop", src: "/assets/workshops/active-directory-1.jpeg", shape: "portrait" },
    { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/2.jpeg", shape: "landscape" },
    { name: "Agentic AI workshop", src: "/assets/aiEvents/agentic ai workshop.jpeg", shape: "portrait" },
    { name: "Web SIG exploration", src: "/assets/webexplorations/3.jpeg", shape: "landscape" },
    { name: "ACM Amritapuri chapter team", src: "/assets/ACM-Pics/team-photo.jpg", shape: "landscape" },
  ],
  [
    { name: "ISEA cybersecurity workshop", src: "/assets/cyberworkshops/1.jpeg", shape: "landscape" },
    { name: "Active Directory workshop", src: "/assets/workshops/active-directory-2.jpeg", shape: "portrait" },
    { name: "Cybersecurity exploration", src: "/assets/cyberExplorations/4.jpeg", shape: "landscape" },
    { name: "Glitch SIG exploration", src: "/assets/glitchExplorations/3.jpg", shape: "portrait" },
    { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/4.jpeg", shape: "landscape" },
    { name: "Epochon 2.0 hackathon", src: "/assets/aiEvents/epochon 2.0.jpeg", shape: "landscape" },
  ],
  [
    { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/hero.jpeg", shape: "landscape" },
    { name: "Active Directory workshop", src: "/assets/workshops/active-directory-3.jpeg", shape: "portrait" },
    { name: "Web SIG exploration", src: "/assets/webexplorations/5.jpeg", shape: "landscape" },
    { name: "Agentic AI workshop", src: "/assets/aiEvents/agentic ai workshop.jpeg", shape: "portrait" },
    { name: "Cybersecurity exploration", src: "/assets/cyberExplorations/6.jpeg", shape: "landscape" },
    { name: "ACM Amritapuri chapter team", src: "/assets/ACM-Pics/team-photo.jpg", shape: "landscape" },
  ],
];
const photos = galleryColumns.flat();

const cardLayout = [
  { x: 5, y: 13, r: -7, d: -68, z: 1 },
  { x: 27, y: 10, r: 5, d: 44, z: 2 },
  { x: 51, y: 12, r: -3, d: -38, z: 3 },
  { x: 74, y: 14, r: 7, d: 62, z: 2 },
  { x: 87, y: 47, r: -5, d: -55, z: 1 },
  { x: 66, y: 54, r: 4, d: 48, z: 4 },
  { x: 41, y: 56, r: -6, d: -45, z: 3 },
  { x: 15, y: 52, r: 3, d: 60, z: 2 },
  { x: 7, y: 79, r: 5, d: -48, z: 1 },
  { x: 31, y: 82, r: -4, d: 52, z: 3 },
  { x: 57, y: 80, r: 6, d: -62, z: 2 },
  { x: 79, y: 78, r: -3, d: 40, z: 4 },
];

export default function SigArchiveGallery() {
  const columns = galleryColumns;
  return (
    <section className="sig-gallery" aria-label="ACM Amritapuri event photo gallery">
      <div className="sig-gallery__sticky">
        <h2 className="sig-gallery__title">GALLERY</h2>
        <div className="sig-gallery__columns">
          {columns.map((column, columnIndex) => (
            <div
              className={`sig-gallery__column sig-gallery__column--${columnIndex + 1}`}
              key={columnIndex}
            >
              <div className="sig-gallery__column-track">
                {[...column, ...column].map((photo, index) => (
                  <figure className="sig-gallery__frame" key={`${photo.src}-${index}`}>
                    <img
                      alt={photo.name}
                      decoding="async"
                      draggable="false"
                      loading={index < 3 ? "eager" : "lazy"}
                      src={photo.src}
                    />
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="sig-gallery__hint">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></p>
      </div>
    </section>
  );
}
