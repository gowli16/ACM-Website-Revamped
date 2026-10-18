import { useEffect, useRef } from "react";

const stars = [
  [4, 8, 1, 0.48], [9, 18, 1, 0.52], [16, 31, 1, 0.38],
  [23, 12, 2, 0.42], [29, 43, 1, 0.5], [35, 23, 1, 0.45],
  [41, 52, 2, 0.38], [47, 16, 1, 0.55], [53, 36, 1, 0.42],
  [59, 8, 1, 0.5], [64, 47, 2, 0.4], [70, 26, 1, 0.48],
  [76, 58, 1, 0.44], [82, 15, 2, 0.4], [88, 38, 1, 0.52],
  [95, 22, 1, 0.43], [7, 66, 2, 0.38], [14, 81, 1, 0.5],
  [20, 57, 1, 0.42], [27, 91, 1, 0.45], [34, 72, 2, 0.4],
  [40, 87, 1, 0.48], [47, 63, 1, 0.4], [55, 78, 2, 0.43],
  [61, 59, 1, 0.5], [68, 92, 1, 0.38], [74, 69, 2, 0.42],
  [81, 84, 1, 0.48], [87, 61, 1, 0.4], [94, 77, 2, 0.44],
  [12, 39, 1, 0.38], [25, 70, 1, 0.52], [38, 5, 1, 0.4],
  [51, 94, 1, 0.46], [66, 19, 1, 0.4], [79, 48, 1, 0.5],
  [91, 95, 1, 0.4],
  // Additional fine-grain stars for a denser galaxy field.
  [2, 25, 1, 0.34], [6, 48, 1, 0.3], [11, 5, 1, 0.42], [13, 93, 1, 0.36],
  [18, 15, 1, 0.31], [21, 46, 2, 0.34], [24, 28, 1, 0.4], [28, 61, 1, 0.33],
  [31, 84, 1, 0.38], [33, 35, 1, 0.3], [37, 16, 1, 0.44], [39, 97, 1, 0.32],
  [43, 30, 1, 0.36], [45, 76, 2, 0.34], [49, 44, 1, 0.4], [52, 6, 1, 0.32],
  [56, 22, 1, 0.38], [58, 93, 1, 0.35], [62, 34, 1, 0.3], [66, 63, 1, 0.42],
  [69, 86, 1, 0.32], [72, 11, 1, 0.36], [75, 43, 2, 0.34], [78, 74, 1, 0.4],
  [84, 31, 1, 0.33], [86, 7, 1, 0.38], [89, 53, 1, 0.3], [92, 12, 1, 0.42],
  [97, 44, 1, 0.36], [3, 78, 1, 0.38], [8, 89, 1, 0.32], [17, 68, 1, 0.4],
  [22, 98, 1, 0.3], [30, 4, 1, 0.36], [36, 61, 1, 0.32], [42, 69, 1, 0.4],
  [50, 57, 1, 0.34], [54, 86, 1, 0.38], [60, 71, 1, 0.32], [63, 97, 1, 0.4],
  [71, 56, 1, 0.34], [77, 29, 1, 0.38], [83, 95, 1, 0.32], [90, 83, 1, 0.4],
  [98, 68, 1, 0.34], [15, 52, 1, 0.3], [26, 19, 1, 0.42], [46, 3, 1, 0.32],
  [57, 48, 1, 0.38], [68, 5, 1, 0.3], [80, 56, 1, 0.42], [93, 36, 1, 0.32],
];

function StarLayer({ depth, className }) {
  return (
    <div className={`sigc-starfield ${className}`} data-parallax-depth={depth}>
      {stars.map(([left, top, size, opacity], index) => (
        <span
          key={index}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
          }}
        />
      ))}
    </div>
  );
}

export default function ControlRoom() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = Array.from(background.querySelectorAll("[data-parallax-depth]"));
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      if (reducedMotion) return;
      const scrollY = window.scrollY || 0;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.parallaxDepth) || 0;
        layer.style.transform = `translate3d(0, ${scrollY * depth * -1}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="sigc-space-background" aria-hidden="true">
      <StarLayer depth={0.018} className="sigc-starfield--distant" />
      <StarLayer depth={0.055} className="sigc-starfield--near" />
      <div className="sigc-shooting-stars" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
    </div>
  );
}
