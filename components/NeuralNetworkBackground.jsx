import { useEffect, useRef, useState } from "react";

const layers = [
  { x: 45, count: 5 },
  { x: 245, count: 5 },
  { x: 445, count: 5 },
  { x: 645, count: 5 },
  { x: 845, count: 5 },
  { x: 1045, count: 3 },
];

function nodeY(index, count) {
  return 55 + (index * 390) / Math.max(1, count - 1);
}

const connections = layers.slice(0, -1).flatMap((layer, layerIndex) => {
  const next = layers[layerIndex + 1];
  return Array.from({ length: layer.count }, (_, from) =>
    Array.from({ length: next.count }, (_, to) => ({
      key: `${layerIndex}-${from}-${to}`,
      x1: layer.x + 25,
      y1: nodeY(from, layer.count),
      x2: next.x - 20,
      y2: nodeY(to, next.count),
      layerIndex,
      order: from * next.count + to,
    }))
  ).flat();
});

export default function NeuralNetworkBackground() {
  const backgroundRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = backgroundRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.05 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={backgroundRef} className={`sigc-neural-bg${isVisible ? " is-visible" : ""}`} aria-hidden="true">
      <svg className="sigc-neural-bg__svg" viewBox="0 0 1100 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="sigc-neural-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#56DCE0" />
          </marker>
          <radialGradient id="sigc-neural-node-glow">
            <stop offset="0%" stopColor="#8FE8F0" stopOpacity=".26" />
            <stop offset="100%" stopColor="#8FE8F0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="sigc-neural-links">
          {connections.map((line) => (
            <line
              key={line.key}
              className={`sigc-neural-link sigc-neural-link--layer-${line.layerIndex}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              pathLength="1"
              markerEnd="url(#sigc-neural-arrow)"
              style={{ "--link-delay": `${0.85 + line.layerIndex * 0.8 + line.order * 0.018}s` }}
            />
          ))}
        </g>
        {layers.map((layer, layerIndex) => (
          <g className={`sigc-neural-layer sigc-neural-layer--${layerIndex}`} key={layer.x}>
            {Array.from({ length: layer.count }, (_, index) => {
              const y = nodeY(index, layer.count);
              return (
                <g className="sigc-neural-node" key={index} style={{ "--node-delay": `${layerIndex * 0.8 + index * 0.07}s` }}>
                  <circle cx={layer.x} cy={y} r="34" fill="url(#sigc-neural-node-glow)" />
                  <circle className="sigc-neural-node-core" cx={layer.x} cy={y} r="16" />
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
