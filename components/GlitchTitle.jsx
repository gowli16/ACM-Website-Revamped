import { useEffect, useState } from "react";

const SYMBOLS = "ZX91%#[!/@$?KFVX";

function scrambleText(text) {
  return text
    .split("")
    .map((character) => {
      if (character === " ") return " ";
      return Math.random() > 0.38
        ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        : character;
    })
    .join("");
}

export default function GlitchTitle({ children }) {
  const original = String(children);
  const [displayText, setDisplayText] = useState(original);
  const [glitching, setGlitching] = useState(true);

  useEffect(() => {
    let interval = null;

    const startScramble = () => {
      if (interval !== null) window.clearInterval(interval);
      let elapsed = 0;
      setGlitching(true);
      setDisplayText(scrambleText(original));

      interval = window.setInterval(() => {
        elapsed += 85;
        if (elapsed >= 3000) {
          window.clearInterval(interval);
          interval = null;
          setDisplayText(original);
          setGlitching(false);
          return;
        }
        setDisplayText(scrambleText(original));
      }, 85);
    };

    const section = document.querySelector('[data-sigc-mission="glitch"]');
    startScramble();
    section?.addEventListener("sigc:mission-enter", startScramble);

    return () => {
      if (interval !== null) window.clearInterval(interval);
      section?.removeEventListener("sigc:mission-enter", startScramble);
    };
  }, [original]);

  return (
    <span
      className={`sigc-glitch-title${glitching ? " is-glitching" : ""}`}
      data-text={displayText}
      aria-label={original}
    >
      <span className="sigc-glitch-title__reserve" aria-hidden="true">{original}</span>
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
