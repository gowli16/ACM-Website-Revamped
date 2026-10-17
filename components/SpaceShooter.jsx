import { useEffect, useRef, useState } from "react";

const WIDTH = 360;
const HEIGHT = 300;

export default function SpaceShooter() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(true);
  const gameRef = useRef({ left: false, right: false, bullets: [], rocks: [], shipX: WIDTH / 2, score: 0, frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const game = gameRef.current;
    let animationFrame = 0;
    let lastShot = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onKeyDown = (event) => {
      if (["ArrowLeft", "ArrowRight", " "].includes(event.key)) event.preventDefault();
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") game.left = true;
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") game.right = true;
      if (event.key === " " && playing && performance.now() - lastShot > 240) {
        game.bullets.push({ x: game.shipX, y: HEIGHT - 42 });
        lastShot = performance.now();
      }
    };
    const onKeyUp = (event) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") game.left = false;
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") game.right = false;
    };
    const onBlur = () => { game.left = false; game.right = false; };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    const drawShip = (x, y) => {
      context.fillStyle = "#62D4E8";
      context.beginPath();
      context.moveTo(x, y - 13);
      context.lineTo(x - 10, y + 10);
      context.lineTo(x, y + 5);
      context.lineTo(x + 10, y + 10);
      context.closePath();
      context.fill();
      context.fillStyle = "#F4F7FA";
      context.fillRect(x - 2, y + 4, 4, 5);
    };

    const drawRock = (rock) => {
      context.strokeStyle = "#91A9B8";
      context.lineWidth = 1.5;
      context.beginPath();
      rock.points.forEach((point, index) => {
        const x = rock.x + Math.cos(point.angle) * point.radius;
        const y = rock.y + Math.sin(point.angle) * point.radius;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
      context.stroke();
    };

    const loop = () => {
      game.frame += 1;
      context.clearRect(0, 0, WIDTH, HEIGHT);
      context.fillStyle = "#06121D";
      context.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < 32; i += 1) {
        const x = (i * 71 + 19) % WIDTH;
        const y = (i * 47 + game.frame * (reducedMotion ? 0 : 0.18)) % HEIGHT;
        context.fillStyle = i % 5 === 0 ? "#62D4E8" : "#91A9B8";
        context.globalAlpha = i % 3 === 0 ? 0.8 : 0.35;
        context.fillRect(x, y, 1.5, 1.5);
      }
      context.globalAlpha = 1;

      if (playing) {
        if (game.left) game.shipX -= 3.2;
        if (game.right) game.shipX += 3.2;
        game.shipX = Math.max(15, Math.min(WIDTH - 15, game.shipX));

        if (game.frame % 48 === 0) {
          const radius = 8 + Math.random() * 9;
          game.rocks.push({
            x: 18 + Math.random() * (WIDTH - 36),
            y: -radius,
            radius,
            speed: 0.8 + Math.random() * 0.8,
            points: Array.from({ length: 7 }, (_, index) => ({
              angle: (Math.PI * 2 * index) / 7,
              radius: radius * (0.72 + Math.random() * 0.45),
            })),
          });
        }

        game.bullets.forEach((bullet) => { bullet.y -= 5; });
        game.rocks.forEach((rock) => { rock.y += rock.speed; });
        game.bullets = game.bullets.filter((bullet) => bullet.y > -5);
        game.rocks = game.rocks.filter((rock) => rock.y < HEIGHT + rock.radius);

        game.bullets = game.bullets.filter((bullet) => {
          const hitIndex = game.rocks.findIndex((rock) =>
            Math.hypot(rock.x - bullet.x, rock.y - bullet.y) < rock.radius + 3
          );
          if (hitIndex < 0) return true;
          game.rocks.splice(hitIndex, 1);
          game.score += 10;
          setScore(game.score);
          return false;
        });
      }

      game.rocks.forEach(drawRock);
      context.fillStyle = "#FF914D";
      game.bullets.forEach((bullet) => context.fillRect(bullet.x - 1, bullet.y, 2, 8));
      drawShip(game.shipX, HEIGHT - 26);

      if (!playing) {
        context.fillStyle = "rgba(6, 18, 29, 0.78)";
        context.fillRect(0, 0, WIDTH, HEIGHT);
        context.fillStyle = "#F4F7FA";
        context.textAlign = "center";
        context.font = "bold 15px monospace";
        context.fillText("PAUSED", WIDTH / 2, HEIGHT / 2);
      }

      animationFrame = window.requestAnimationFrame(loop);
    };

    loop();
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [playing]);

  const shoot = () => {
    if (!playing) return;
    gameRef.current.bullets.push({ x: gameRef.current.shipX, y: HEIGHT - 42 });
  };
  const move = (direction, active) => {
    gameRef.current.left = direction === "left" && active;
    gameRef.current.right = direction === "right" && active;
  };
  const reset = () => {
    gameRef.current = { left: false, right: false, bullets: [], rocks: [], shipX: WIDTH / 2, score: 0, frame: 0 };
    setScore(0);
    setPlaying(true);
  };

  return (
    <aside className="sigc-shooter" aria-label="Mini space shooter game">
      <div className="sigc-shooter-heading">
        <div>
          <p className="sigc-eyebrow">ARCADE / 01</p>
          <h2>ASTEROID DEFENCE</h2>
        </div>
        <span className="sigc-shooter-score">SCORE <strong>{score.toString().padStart(4, "0")}</strong></span>
      </div>
      <canvas
        ref={canvasRef}
        className="sigc-shooter-canvas"
        width={WIDTH}
        height={HEIGHT}
        tabIndex={0}
        aria-label="Space shooter. Use left and right arrow keys or A and D to move. Press space to fire."
      />
      <div className="sigc-shooter-controls">
        <div className="sigc-shooter-movement">
          <button type="button" aria-label="Move ship left" onPointerDown={() => move("left", true)} onPointerUp={() => move("left", false)} onPointerLeave={() => move("left", false)}>←</button>
          <button type="button" aria-label="Move ship right" onPointerDown={() => move("right", true)} onPointerUp={() => move("right", false)} onPointerLeave={() => move("right", false)}>→</button>
        </div>
        <button type="button" className="sigc-shooter-fire" onClick={shoot}>FIRE</button>
        <button type="button" className="sigc-shooter-pause" onClick={() => setPlaying((value) => !value)}>{playing ? "PAUSE" : "RESUME"}</button>
        <button type="button" className="sigc-shooter-pause" onClick={reset}>RESET</button>
      </div>
      <p className="sigc-shooter-help">MOVE: ← → / A D <span>FIRE: SPACE</span></p>
    </aside>
  );
}
