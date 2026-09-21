import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PersonCard from "./PersonCard";

export default function PeopleRevealDeck({
  people = [],
  title = "PEOPLE",
  showProgress = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentPerson = people[currentIndex];

  const handleNext = () => {
    if (!currentPerson) return;

    if (currentIndex === people.length - 1) {
      setIsComplete(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const getNameParts = (name = "") => {
    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
      return {
        firstName: parts[0],
        lastName: "",
      };
    }

    return {
      firstName: parts.slice(0, -1).join(" "),
      lastName: parts[parts.length - 1],
    };
  };

  const nameParts = currentPerson
    ? getNameParts(currentPerson.name)
    : {
        firstName: "",
        lastName: "",
      };

  return (
    <div className="people-reveal">

      {/* =========================
          SECTION HEADER
         ========================= */}

      <motion.div
        className="people-reveal-header"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <div>
          <p className="section-kicker">
            [ {title.toLowerCase()} / interactive archive ]
          </p>

          <h2>
            Meet the people behind
            <br />
            <span>the momentum.</span>
          </h2>
        </div>

        {showProgress && !isComplete && (
          <div className="people-reveal-progress">
            <span>
              {String(currentIndex + 1).padStart(2, "0")}
            </span>

            <div className="progress-line">
              <motion.div
                className="progress-fill"
                animate={{
                  width: `${
                    ((currentIndex + 1) / people.length) * 100
                  }%`,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />
            </div>

            <span>
              {String(people.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </motion.div>


      {/* =========================
          ACTIVE CARD
         ========================= */}

      {!isComplete ? (
        <div className="people-reveal-stage">

          {/* Decorative orbital rings */}

          <div className="people-orbit orbit-one" />
          <div className="people-orbit orbit-two" />
          <div className="people-orbit orbit-three" />


          {/* Large background name */}

          <AnimatePresence mode="wait">

            <motion.div
              key={`name-${currentIndex}`}
              className="people-background-name"
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.03,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >

              <span className="people-first-name">
                {nameParts.firstName}
              </span>

              <span className="people-last-name">
                {nameParts.lastName}
              </span>

            </motion.div>

          </AnimatePresence>


          {/* LEFT ARROW */}

          {currentIndex > 0 && (
            <button
              className="people-navigation people-navigation-left"
              onClick={() =>
                setCurrentIndex((prev) => Math.max(prev - 1, 0))
              }
              aria-label="Previous person"
            >
              ←
            </button>
          )}


          {/* RIGHT ARROW */}

          <button
            className="people-navigation people-navigation-right"
            onClick={handleNext}
            aria-label="Next person"
          >
            →
          </button>


          {/* CARD */}

          <AnimatePresence mode="wait" initial={false}>

            <motion.div
              key={`card-${currentIndex}`}
              className="people-reveal-active"

              initial={{
                x: "-65vw",
                opacity: 0,
                scale: 0.9,
                rotate: -3,
              }}

              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}

              exit={{
                x: "65vw",
                opacity: 0,
                scale: 0.9,
                rotate: 3,
              }}

              transition={{
                type: "spring",
                stiffness: 150,
                damping: 21,
                mass: 0.6,
              }}

              onClick={handleNext}
            >

              <div className="people-reveal-card">

                <PersonCard
                  person={currentPerson}
                  index={currentIndex}
                />

                <motion.div
                  className="people-reveal-hint"

                  initial={{
                    opacity: 0,
                    y: 8,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: 0.2,
                    duration: 0.25,
                  }}
                >
                  <span>CLICK TO PROCEED</span>
                  <span>→</span>
                </motion.div>

              </div>

            </motion.div>

          </AnimatePresence>

        </div>

      ) : (

        /* =========================
           FINAL GRID
           ========================= */

        <motion.div
          className="people-final-grid"

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >

          {people.map((person, index) => (

            <motion.div
              key={`${person.name}-${index}`}
              className="people-final-card"

              initial={{
                opacity: 0,
                y: 35,
                scale: 0.94,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              transition={{
                duration: 0.4,
                delay: index * 0.07,
                ease: "easeOut",
              }}
            >

              <PersonCard
                person={person}
                index={index}
              />

            </motion.div>

          ))}

        </motion.div>

      )}

    </div>
  );
}