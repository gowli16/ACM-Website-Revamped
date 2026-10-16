const galleryColumns = [
  {
    id: "left",
    label: "First ACM photo column",
    photos: [
      { name: "Epochon 2.0 hackathon", src: "/assets/aiEvents/epochon 2.0.jpeg", shape: "landscape" },
      { name: "Active Directory workshop", src: "/assets/workshops/active-directory-1.jpeg", shape: "portrait" },
      { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/2.jpeg", shape: "landscape" },
      { name: "Agentic AI workshop", src: "/assets/aiEvents/agentic ai workshop.jpeg", shape: "portrait" },
      { name: "Web SIG exploration", src: "/assets/webexplorations/3.jpeg", shape: "landscape" },
      { name: "ACM Amritapuri chapter team", src: "/assets/ACM-Pics/team-photo.jpg", shape: "landscape" },
    ],
  },
  {
    id: "middle",
    label: "Second ACM photo column",
    photos: [
      { name: "ISEA cybersecurity workshop", src: "/assets/cyberworkshops/1.jpeg", shape: "landscape" },
      { name: "Active Directory workshop", src: "/assets/workshops/active-directory-2.jpeg", shape: "portrait" },
      { name: "Cybersecurity exploration", src: "/assets/cyberExplorations/4.jpeg", shape: "landscape" },
      { name: "Glitch SIG exploration", src: "/assets/glitchExplorations/3.jpg", shape: "portrait" },
      { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/4.jpeg", shape: "landscape" },
      { name: "Epochon 2.0 hackathon", src: "/assets/aiEvents/epochon 2.0.jpeg", shape: "landscape" },
    ],
  },
  {
    id: "right",
    label: "Third ACM photo column",
    photos: [
      { name: "Cybersecurity workshop", src: "/assets/cyberworkshops/hero.jpeg", shape: "landscape" },
      { name: "Active Directory workshop", src: "/assets/workshops/active-directory-3.jpeg", shape: "portrait" },
      { name: "Web SIG exploration", src: "/assets/webexplorations/5.jpeg", shape: "landscape" },
      { name: "Agentic AI workshop", src: "/assets/aiEvents/agentic ai workshop.jpeg", shape: "portrait" },
      { name: "Cybersecurity exploration", src: "/assets/cyberExplorations/6.jpeg", shape: "landscape" },
      { name: "ACM Amritapuri chapter team", src: "/assets/ACM-Pics/team-photo.jpg", shape: "landscape" },
    ],
  },
];

function PhotoSequence({ columnId, photos, duplicate = false }) {
  return (
    <div
      aria-hidden={duplicate || undefined}
      className="sig-gallery__sequence"
    >
      {photos.map((photo, index) => (
        <figure
          className={`sig-gallery__frame sig-gallery__frame--${photo.shape}`}
          key={`${columnId}-${duplicate ? "repeat" : "photo"}-${photo.src}`}
        >
          <div className="sig-gallery__image">
            <img
              alt={duplicate ? "" : photo.name}
              decoding="async"
              draggable="false"
              loading={duplicate || index > 1 ? "lazy" : "eager"}
              src={photo.src}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}

export default function SigArchiveGallery() {
  return (
    <section className="sig-gallery" aria-label="ACM Amritapuri event photo archive">
      <div className="sig-gallery__columns">
        {galleryColumns.map((column) => (
          <div
            aria-label={column.label}
            className={`sig-gallery__column sig-gallery__column--${column.id}`}
            key={column.id}
            role="group"
          >
            <div className={`sig-gallery__track sig-gallery__track--${column.id}`}>
              <PhotoSequence columnId={column.id} photos={column.photos} />
              <PhotoSequence columnId={column.id} photos={column.photos} duplicate />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}