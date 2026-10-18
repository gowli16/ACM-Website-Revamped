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

  useEffect(() => {
    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      // Keep the title in a continuous signal-corruption loop.
      // Brief clean frames preserve readability without pausing the effect.
      setDisplayText(frame % 9 === 0 ? original : scrambleText(original));
    }, 85);

    return () => window.clearInterval(interval);
  }, [original]);

  return (
    <span
      className="sigc-glitch-title is-glitching"
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
