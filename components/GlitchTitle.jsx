import { useEffect, useState } from "react";

const SYMBOLS = "ZX91%#[!/@$?KFVX";

function scrambleText(text) {
  return text
    .split("")
    .map((character) => {
      if (character === " ") return " ";
      return Math.random() > 0.32
        ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        : character;
    })
    .join("");
}

export default function GlitchTitle({ children }) {
  const original = String(children);
  const [displayText, setDisplayText] = useState(original);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timeout;
    let scrambleInterval;

    const runBurst = () => {
      if (!mounted) return;
      setGlitching(true);
      let frames = 0;
      scrambleInterval = window.setInterval(() => {
        if (!mounted) return;
        frames += 1;
        setDisplayText(scrambleText(original));
        if (frames >= 7) {
          window.clearInterval(scrambleInterval);
          setDisplayText(original);
          setGlitching(false);
        }
      }, 55);
    };

    const schedule = () => {
      runBurst();
      timeout = window.setTimeout(() => {
        runBurst();
        timeout = window.setTimeout(schedule, 3900);
      }, 2050);
    };

    timeout = window.setTimeout(schedule, 250);
    return () => {
      mounted = false;
      window.clearTimeout(timeout);
      window.clearInterval(scrambleInterval);
    };
  }, [original]);

  return (
    <span
      className={`sigc-glitch-title${glitching ? " is-glitching" : ""}`}
      data-text={displayText}
      aria-label={original}
    >
      <span className="sigc-glitch-title__main" aria-hidden="true">
        {displayText}
      </span>
      <span className="sigc-glitch-title__channel sigc-glitch-title__channel--warm" aria-hidden="true">
        {displayText}
      </span>
      <span className="sigc-glitch-title__channel sigc-glitch-title__channel--cool" aria-hidden="true">
        {displayText}
      </span>
    </span>
  );
}
