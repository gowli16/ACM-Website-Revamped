import { useCallback, useEffect, useRef, useState } from "react";

const planets = [
  {
    id: "ai",
    label: "AI",
    title: "Artificial Intelligence",
    terrain: "A blue world of thinking machines",
    path: "M84 20h48v12h24v12h24v24h12v48h-12v24h-24v24h-48v12H84v-12H60v-24H36v-24H24V84h12V60h24V44h24z",
    details: [
      [48, 84, 24, 12, "#D0D4D7"],
      [72, 60, 12, 12, "#E1E4E6"],
      [108, 72, 24, 12, "#2C8DBA"],
      [132, 108, 36, 12, "#3EA9D0"],
      [72, 132, 24, 12, "#83D9EF"],
      [96, 156, 12, 12, "#1B668F"],
      [156, 60, 12, 12, "#B9F3FF"],
      [48, 108, 12, 12, "#1B668F"],
    ],
    satellites: "ai",
  },
  {
    id: "web",
    label: "Web",
    title: "Web & App",
    terrain: "A connected world of bright pathways",
    path: "M84 24h48v12h24v12h12v24h12v48h-12v24h-24v12h-48v12H72v-12H48v-12H36v-24H24V84h12V60h12V48h24V36h12z",
    details: [
      [48, 72, 36, 12, "#D0D4D7"],
      [96, 48, 12, 24, "#E1E4E6"],
      [120, 72, 36, 12, "#B9BEC2"],
      [72, 96, 12, 36, "#B1F0FB"],
      [96, 108, 36, 12, "#1B668F"],
      [132, 120, 12, 24, "#9AE8F5"],
      [60, 144, 36, 12, "#247EA6"],
      [108, 156, 24, 12, "#E1E4E6"],
    ],
    satellites: "web",
  },
  {
    id: "cyber",
    label: "Cyber",
    title: "Cybersecurity",
    terrain: "A guarded frontier beneath icy peaks",
    path: "M72 24h48v12h24v12h24v24h12v48h-12v24h-24v12h-48v12H72v-12H48v-12H36v-24H24V84h12V60h12V48h24z",
    details: [
      [48, 108, 24, 12, "#E1E4E6"],
      [72, 84, 12, 24, "#ECEEEF"],
      [84, 72, 12, 12, "#D0D4D7"],
      [96, 96, 12, 12, "#ECEEEF"],
      [108, 84, 12, 24, "#D0D4D7"],
      [120, 108, 24, 12, "#1B668F"],
      [60, 144, 48, 12, "#247EA6"],
      [144, 72, 12, 12, "#43B2D8"],
    ],
    satellites: "cyber",
  },
  {
    id: "glitch",
    label: "Glitch",
    title: "Glitch Gaming",
    terrain: "A playful world of arcades and odd moons",
    path: "M84 20h48v12h24v24h12v24h12v48h-12v24h-24v12h-48v-12H60v-12H36v-24H24V84h12V60h12V44h24V32h12z",
    details: [
      [48, 84, 24, 12, "#D0D4D7"],
      [72, 60, 12, 12, "#E1E4E6"],
      [96, 84, 12, 12, "#1B668F"],
      [120, 72, 36, 12, "#B9BEC2"],
      [60, 120, 12, 24, "#E1E4E6"],
      [84, 132, 36, 12, "#2C8DBA"],
      [132, 120, 24, 12, "#DDE1E3"],
      [108, 156, 12, 12, "#247EA6"],
    ],
    satellites: "glitch",
  },
];

const stars = Array.from({ length: 38 }, (_, index) => ({
  left: `${(index * 47 + 13) % 97}%`,
  top: `${(index * 67 + 7) % 89}%`,
  delay: `${(index % 7) * -0.4}s`,
  size: index % 5 === 0 ? 3 : 2,
}));

function PlanetArt({ planet }) {
  return (
    <svg
      className={`sig-space__planet-art sig-space__planet-art--${planet.id}`}
      viewBox="0 0 220 210"
      role="img"
      aria-label={`${planet.title} pixel-art planet`}
      shapeRendering="crispEdges"
    >
      <path d={planet.path} fill="#155F8A" stroke="#D0D4D7" strokeWidth="4" />
      {planet.details.map(([x, y, width, height, color], index) => (
        <rect
          key={`${planet.id}-terrain-${index}`}
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
        />
      ))}
      {planet.satellites === "ai" && (
        <>
          <rect x="168" y="38" width="24" height="8" fill="#C0C5C8" />
          <rect x="176" y="30" width="8" height="24" fill="#E1E4E6" />
          <rect x="168" y="150" width="8" height="8" fill="#E1E4E6" />
        </>
      )}
      {planet.satellites === "web" && (
        <>
          <rect x="16" y="48" width="24" height="8" fill="#D0D4D7" />
          <rect x="24" y="40" width="8" height="24" fill="#E1E4E6" />
          <rect x="172" y="152" width="16" height="8" fill="#C0C5C8" />
        </>
      )}
      {planet.satellites === "cyber" && (
        <>
          <rect x="168" y="36" width="8" height="32" fill="#E1E4E6" />
          <rect x="160" y="44" width="24" height="8" fill="#C0C5C8" />
          <rect x="40" y="160" width="8" height="16" fill="#E1E4E6" />
        </>
      )}
      {planet.satellites === "glitch" && (
        <>
          <rect x="20" y="44" width="16" height="16" fill="#D0D4D7" />
          <rect x="28" y="36" width="8" height="32" fill="#E1E4E6" />
          <rect x="168" y="144" width="24" height="8" fill="#C0C5C8" />
        </>
      )}
      <rect x="180" y="80" width="4" height="4" fill="#F0F2F3" />
      <rect x="28" y="132" width="4" height="4" fill="#F0F2F3" />
    </svg>
  );
}

function PixelRocket({ className = "" }) {
  return (
    <div className={`sig-space__rocket ${className}`} aria-hidden="true">
      <svg viewBox="0 0 40 52" shapeRendering="crispEdges">
        <rect x="16" y="0" width="8" height="8" fill="#EAFBFF" />
        <rect x="12" y="8" width="16" height="8" fill="#D0D4D7" />
        <rect x="8" y="16" width="24" height="16" fill="#B9BEC2" />
        <rect x="16" y="20" width="8" height="8" fill="#09243A" />
        <rect x="4" y="24" width="8" height="12" fill="#DDE1E3" />
        <rect x="28" y="24" width="8" height="12" fill="#DDE1E3" />
        <rect x="12" y="32" width="16" height="8" fill="#EAFBFF" />
        <rect x="16" y="40" width="8" height="8" fill="#FFCF70" />
      </svg>
      <span className="sig-space__exhaust" />
    </div>
  );
}

export default function SigSpaceExploration({ galleryRef, onPlanetChange }) {
  const sectionRef = useRef(null);
  const gallerySeenRef = useRef(false);
  const sectionVisibleRef = useRef(false);
  const introStartedRef = useRef(false);
  const introCompleteRef = useRef(false);
  const currentIndexRef = useRef(0);
  const travelTimerRef = useRef(null);
  const onPlanetChangeRef = useRef(onPlanetChange);
  const [introPhase, setIntroPhase] = useState("waiting");
  const [sequenceStarted, setSequenceStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [landedIndex, setLandedIndex] = useState(0);
  const [travelDirection, setTravelDirection] = useState("forward");
  const [traveling, setTraveling] = useState(false);
  const [fastTravel, setFastTravel] = useState(false);

  onPlanetChangeRef.current = onPlanetChange;

  const finishIntro = useCallback(() => {
    introCompleteRef.current = true;
    setIntroPhase("exploring");
  }, []);

  const beginIntro = useCallback(() => {
    if (introStartedRef.current || !gallerySeenRef.current) return;
    introStartedRef.current = true;
    setSequenceStarted(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishIntro();
      return;
    }

    setIntroPhase("typing");
  }, [finishIntro]);

  const travelTo = useCallback((index) => {
    if (index === currentIndexRef.current) return;

    const wasTraveling = travelTimerRef.current !== null;
    const distance = Math.abs(index - currentIndexRef.current);
    const quick = wasTraveling || distance > 1;
    setTravelDirection(index > currentIndexRef.current ? "forward" : "return");
    currentIndexRef.current = index;
    setActiveIndex(index);
    setFastTravel(quick);

    if (!introCompleteRef.current && introStartedRef.current) {
      finishIntro();
    }

    if (!introStartedRef.current) return;

    setTraveling(true);
    window.clearTimeout(travelTimerRef.current);
    travelTimerRef.current = window.setTimeout(() => {
      travelTimerRef.current = null;
      setTraveling(false);
      setFastTravel(false);
      setLandedIndex(currentIndexRef.current);
      onPlanetChangeRef.current?.(planets[currentIndexRef.current].id);
    }, quick ? 260 : 1050);
  }, [finishIntro]);

  useEffect(() => {
    const gallery = galleryRef?.current;
    const section = sectionRef.current;
    if (!gallery || !section) return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === gallery && entry.isIntersecting) {
          gallerySeenRef.current = true;
          if (sectionVisibleRef.current) beginIntro();
        }
        if (entry.target === section) {
          sectionVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && gallerySeenRef.current) beginIntro();
          if (!entry.isIntersecting) {
            window.clearTimeout(travelTimerRef.current);
            travelTimerRef.current = null;
            setTraveling(false);
            setFastTravel(false);
            setLandedIndex(currentIndexRef.current);
          }
        }
      });
    }, { threshold: 0.01 });

    observer.observe(gallery);
    observer.observe(section);
    return () => observer.disconnect();
  }, [beginIntro, galleryRef]);

  useEffect(() => {
    const section = sectionRef.current;
    const stops = section?.querySelectorAll("[data-sig-space-stop]");
    if (!stops?.length) return undefined;

    const observer = new IntersectionObserver((entries) => {
      const visibleStops = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => (
          Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2) -
          Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2)
        ));
      const index = Number(visibleStops[0]?.target.dataset.sigSpaceStop);
      if (Number.isInteger(index)) travelTo(index);
    }, { rootMargin: "-35% 0px -35% 0px", threshold: 0 });

    stops.forEach((stop) => observer.observe(stop));
    return () => observer.disconnect();
  }, [travelTo]);

  useEffect(() => {
    if (introPhase !== "typing") return undefined;
    const welcome = "WELCOME TO OUR SIGs";
    let character = 0;
    let taglineTimeout;
    const interval = window.setInterval(() => {
      character += 1;
      setTypedText(welcome.slice(0, character));
      if (character >= welcome.length) {
        window.clearInterval(interval);
        taglineTimeout = window.setTimeout(() => setIntroPhase("tagline"), 480);
      }
    }, 62);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(taglineTimeout);
    };
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "tagline") return undefined;
    const timeout = window.setTimeout(() => setIntroPhase("launch"), 900);
    return () => window.clearTimeout(timeout);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "launch") return undefined;
    const timeout = window.setTimeout(finishIntro, 920);
    return () => window.clearTimeout(timeout);
  }, [finishIntro, introPhase]);

  useEffect(() => () => {
    window.clearTimeout(travelTimerRef.current);
  }, []);

  const goToPlanet = (index) => {
    sectionRef.current
      ?.querySelector(`[data-sig-space-stop="${index}"]`)
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "center",
      });
  };

  const isIntro = ["typing", "tagline", "launch"].includes(introPhase);
  const sectionClassName = [
    "sig-space",
    introPhase === "waiting" && "sig-space--waiting",
    isIntro && "sig-space--intro",
    sequenceStarted && "sig-space--started",
    traveling && "sig-space--traveling",
  ].filter(Boolean).join(" ");

  return (
    <section
      className={sectionClassName}
      ref={sectionRef}
      aria-label="ACM SIG space exploration"
    >
      <div className="sig-space__viewport">
        <div className="sig-space__stars" aria-hidden="true">
          {stars.map((star, index) => (
            <span
              key={`star-${index}`}
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.delay,
                width: star.size,
                height: star.size,
              }}
            />
          ))}
        </div>

        <header className="sig-space__hud">
          <span>ACM / STAR MAP</span>
          <span>SCROLL TO EXPLORE</span>
        </header>

        <div className="sig-space__stage" aria-hidden={isIntro}>
          <div
            className={`sig-space__planet-track${traveling ? " is-traveling" : ""}${fastTravel ? " is-fast" : ""}`}
            style={{ transform: `translateX(-${activeIndex * 25}%)` }}
          >
            {planets.map((planet, index) => (
              <div className="sig-space__planet-stop" key={planet.id}>
                <div className={`sig-space__planet-wrap sig-space__planet-wrap--${planet.id}`}>
                  <span className="sig-space__orbit sig-space__orbit--one" />
                  <span className="sig-space__orbit sig-space__orbit--two" />
                  <PlanetArt planet={planet} />
                  <span className="sig-space__terrain">
                    {planet.terrain}
                  </span>
                </div>
                {index === activeIndex && <PixelRocket className="sig-space__planet-rocket" />}
              </div>
            ))}
          </div>
          {traveling && (
            <PixelRocket className={`sig-space__flight is-${travelDirection}${fastTravel ? " is-fast" : ""}`} />
          )}
        </div>

        <div className={`sig-space__intro sig-space__intro--${introPhase}`} aria-live="polite">
          {isIntro ? (
            <>
              <p className="sig-space__welcome">
                {introPhase === "launch" ? "WELCOME TO OUR SIGs" : typedText}
                {introPhase === "typing" && <span className="sig-space__cursor" aria-hidden="true">_</span>}
              </p>
              {(introPhase === "tagline" || introPhase === "launch") && (
                <p className="sig-space__tagline">FOUR WORLDS. ONE COMMUNITY.</p>
              )}
              {introPhase === "launch" && <PixelRocket className="sig-space__intro-rocket" />}
              <button className="sig-space__skip" type="button" onClick={finishIntro}>
                SKIP INTRO <span aria-hidden="true">↓</span>
              </button>
            </>
          ) : (
            <div className="sig-space__planet-label">
              <span>DESTINATION {String(landedIndex + 1).padStart(2, "0")} / 04</span>
              <h2>{planets[landedIndex].title}</h2>
              <p>{planets[landedIndex].label}</p>
            </div>
          )}
        </div>

        <nav className="sig-space__indicator" aria-label="SIG planet navigation">
          <span className="sig-space__indicator-title">PLANETS</span>
          {planets.map((planet, index) => (
            <button
              aria-current={activeIndex === index ? "step" : undefined}
              aria-label={`Go to ${planet.title}`}
              className="sig-space__indicator-item"
              key={planet.id}
              onClick={() => goToPlanet(index)}
              type="button"
            >
              <span className="sig-space__indicator-dot" />
              <span>{planet.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sig-space__scroll-stops" aria-hidden="true">
        {planets.map((planet, index) => (
          <div
            data-sig-space-stop={index}
            key={`scroll-${planet.id}`}
          />
        ))}
      </div>
      <span className="sig-space__sr-only" aria-live="polite">
        {planets[landedIndex].title} planet, {landedIndex + 1} of 4
      </span>
    </section>
  );
}
