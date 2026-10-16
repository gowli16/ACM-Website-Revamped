import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function PhotoCard({ photo, index, isActive, onImageError }) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className="sigc-photo-card">
      {hasImageError ? (
        <div className="sigc-photo-unavailable" role="img" aria-label={`${photo.name} photo unavailable`}>
          <span>PHOTO UNAVAILABLE</span>
          <strong>{photo.name}</strong>
        </div>
      ) : (
        <img
          src={photo.image}
          alt={photo.name}
          draggable="false"
          loading={isActive ? "eager" : "lazy"}
          decoding="async"
          onError={() => {
            setHasImageError(true);
            onImageError(photo.image);
          }}
        />
      )}
      <span className="sigc-photo-label">ACM ARCHIVE / {String(index + 1).padStart(2, "0")}</span>
      <div className="sigc-photo-caption">
        <span>{photo.role}</span>
        <strong>{photo.name}</strong>
      </div>
    </div>
  );
}

export default function SigPhotoDeck({ photos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [dismissDirection, setDismissDirection] = useState(1);
  const [unavailableImages, setUnavailableImages] = useState({});
  const prefersReducedMotion = useReducedMotion();

  if (photos.length === 0) return null;

  const goToNext = (direction = 1) => {
    setDismissDirection(direction);
    if (currentIndex >= photos.length - 1) {
      setIsComplete(true);
      return;
    }
    setCurrentIndex((index) => index + 1);
  };

  const goToPrevious = () => {
    setIsComplete(false);
    setDismissDirection(-1);
    setCurrentIndex((index) => Math.max(0, index - 1));
  };

  const resetDeck = () => {
    setDismissDirection(-1);
    setCurrentIndex(0);
    setIsComplete(false);
  };

  const recordUnavailableImage = (image) => {
    setUnavailableImages((current) => ({ ...current, [image]: true }));
  };

  const stackIndices = [
    currentIndex - 2,
    currentIndex - 1,
    currentIndex + 1,
    currentIndex + 2,
  ].filter((index) => index >= 0 && index < photos.length);

  return (
    <div className="sigc-photo-deck">
      <div className="sigc-photo-stage" aria-live="polite">
        {stackIndices.map((index, stackPosition) => (
          <div
            className={`sigc-photo-stack-layer sigc-photo-stack-layer-${stackPosition + 1}`}
            key={`stack-${index}`}
            aria-hidden="true"
          >
            <PhotoCard
              photo={photos[index]}
              index={index}
              isActive={false}
              onImageError={recordUnavailableImage}
            />
          </div>
        ))}

        {!isComplete ? (
          <AnimatePresence initial={false} custom={dismissDirection}>
            <motion.div
              className="sigc-photo-active"
              key={currentIndex}
              custom={dismissDirection}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.72}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                const passedThreshold = Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500;
                if (passedThreshold) {
                  const dragDirection = info.offset.x === 0 ? info.velocity.x : info.offset.x;
                  goToNext(dragDirection >= 0 ? 1 : -1);
                }
              }}
              variants={{
                exit: (direction) => ({
                  x: direction * 520,
                  rotate: direction * 8,
                  opacity: 0,
                  transition: { duration: prefersReducedMotion ? 0.12 : 0.28, ease: "easeOut" },
                }),
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
              exit="exit"
              transition={{ duration: prefersReducedMotion ? 0.12 : 0.25, ease: "easeOut" }}
              aria-label={`Photo ${currentIndex + 1} of ${photos.length}: ${photos[currentIndex].name}. Drag horizontally to reveal the next photo.`}
            >
              <PhotoCard
                photo={photos[currentIndex]}
                index={currentIndex}
                isActive
                onImageError={recordUnavailableImage}
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="sigc-photo-complete" role="status">
            <span className="sigc-photo-label">ACM ARCHIVE / COMPLETE</span>
            <strong>You&apos;ve seen the collection.</strong>
            <p>Explore the ACM community and its work across all four SIGs.</p>
            <button type="button" onClick={resetDeck}>View photos again</button>
          </div>
        )}
      </div>

      <div className="sigc-photo-controls">
        <div className="sigc-photo-arrows">
          <button
            type="button"
            onClick={goToPrevious}
            disabled={currentIndex === 0 || isComplete}
            aria-label="Previous ACM photo"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => goToNext(1)}
            disabled={isComplete}
            aria-label={currentIndex === photos.length - 1 ? "Finish ACM photo collection" : "Next ACM photo"}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        <span className="sigc-photo-counter" aria-label={`Photo ${currentIndex + 1} of ${photos.length}`}>
          {String(currentIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
      </div>
      <p className="sigc-photo-instruction">
        {isComplete ? "COLLECTION COMPLETE" : "DRAG TO REVEAL"}
        {Object.keys(unavailableImages).length > 0 && (
          <span className="sigc-photo-unavailable-count"> · Some photos could not be loaded</span>
        )}
      </p>
    </div>
  );
}
