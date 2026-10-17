import { useEffect, useRef, useState } from "react";

const WIDTH = 360;
const HEIGHT = 300;

export default function SpaceShooter() {
  const canvasRef = useRef(null);
  const gameRef = useRef({ shipY: HEIGHT / 2, up: false, down: false, bullets: [], rocks: [], frame: 0, score: 0 });
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext("2d");
    if (!ctx) return undefined;
    const game = gameRef.current;
    let raf;
    let lastShot = 0;

    const shoot = () => {
      if (!paused && performance.now() - lastShot > 220) {
        game.bullets.push({ x: WIDTH - 42, y: game.shipY });
        lastShot = performance.now();
      }
    };
    const keyDown = (event) => {
      if (["ArrowUp", "ArrowDown", " "].includes(event.key)) event.preventDefault();
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") game.up = true;
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") game.down = true;
      if (event.key === " ") shoot();
    };
    const keyUp = (event) => {
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") game.up = false;
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") game.down = false;
    };
    const clearKeys = () => { game.up = false; game.down = false; };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("blur", clearKeys);

    const drawAsteroid = (rock) => {
      ctx.save();
      ctx.strokeStyle = "#62D4E8";
      ctx.lineWidth = 1.7;
      ctx.shadowColor = "rgba(98, 212, 232, .7)";
      ctx.shadowBlur = 7;
      ctx.beginPath();
      rock.points.forEach((point, index) => {
        const angle = point.angle + rock.rotation;
        const x = rock.x + Math.cos(angle) * point.radius;
        const y = rock.y + Math.sin(angle) * point.radius;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawShip = () => {
      ctx.save();
      ctx.translate(WIDTH - 28, game.shipY);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = "#62D4E8";
      ctx.beginPath();
      ctx.moveTo(0, -13);
      ctx.lineTo(-10, 10);
      ctx.lineTo(0, 5);
      ctx.lineTo(10, 10);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#F4F7FA";
      ctx.fillRect(-2, 4, 4, 5);
      ctx.restore();
    };

    const loop = () => {
      game.frame += 1;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Tiny ambient stars remain static; asteroids enter from the left.
      for (let i = 0; i < 24; i += 1) {
        ctx.globalAlpha = i % 4 === 0 ? 0.6 : 0.22;
        ctx.fillStyle = i % 4 === 0 ? "#62D4E8" : "#91A9B8";
        ctx.fillRect((i * 71 + 19) % WIDTH, (i * 47 + 11) % HEIGHT, 1.4, 1.4);
      }
      ctx.globalAlpha = 1;

      if (!paused) {
        if (game.up) game.shipY -= 3.2;
        if (game.down) game.shipY += 3.2;
        game.shipY = Math.max(15, Math.min(HEIGHT - 15, game.shipY));

        if (game.frame % 48 === 0) {
          const radius = 8 + Math.random() * 9;
          game.rocks.push({
            x: -radius,
            y: 18 + Math.random() * (HEIGHT - 65),
            speed: 0.75 + Math.random() * 0.85,
            rotation: 0,
            points: Array.from({ length: 9 }, (_, index) => ({
              angle: (Math.PI * 2 * index) / 9,
              radius: radius * (0.66 + Math.random() * 0.52),
            })),
          });
        }

        game.rocks.forEach((rock) => { rock.x += rock.speed; rock.rotation += 0.006; });
        game.bullets.forEach((bullet) => { bullet.x -= 5; });
        game.rocks = game.rocks.filter((rock) => rock.x < WIDTH + 24);
        game.bullets = game.bullets.filter((bullet) => bullet.x > -8);

        game.bullets = game.bullets.filter((bullet) => {
          const hit = game.rocks.findIndex((rock) => Math.hypot(rock.x - bullet.x, rock.y - bullet.y) < 15);
          if (hit < 0) return true;
          game.rocks.splice(hit, 1);
          game.score += 10;
          setScore(game.score);
          return false;
        });
      }

      game.rocks.forEach(drawAsteroid);
      ctx.fillStyle = "#FF914D";
      game.bullets.forEach((bullet) => ctx.fillRect(bullet.x, bullet.y - 1, 8, 2));
      drawShip();

      if (paused) {
        ctx.fillStyle = "rgba(6, 18, 29, .72)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "#F4F7FA";
        ctx.textAlign = "center";
        ctx.font = "bold 15px monospace";
        ctx.fillText("PAUSED", WIDTH / 2, HEIGHT / 2);
      }
      raf = window.requestAnimationFrame(loop);
    };

    loop();
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      window.removeEventListener("blur", clearKeys);
    };
  }, [paused]);

  const move = (direction, active) => {
    gameRef.current.up = direction === "up" && active;
    gameRef.current.down = direction === "down" && active;
  };
  const fire = () => {
    if (!paused) gameRef.current.bullets.push({ x: WIDTH - 42, y: gameRef.current.shipY });
  };
  const reset = () => {
    gameRef.current = { shipY: HEIGHT / 2, up: false, down: false, bullets: [], rocks: [], frame: 0, score: 0 };
    setScore(0);
    setPaused(false);
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
      <canvas ref={canvasRef} className="sigc-shooter-canvas" width={WIDTH} height={HEIGHT} tabIndex={0}
        aria-label="Use up and down arrow keys or W and S to move. Press space to fire." />
      <div className="sigc-shooter-controls">
        <button type="button" aria-label="Move ship up" onPointerDown={() => move("up", true)} onPointerUp={() => move("up", false)} onPointerLeave={() => move("up", false)}>↑</button>
        <button type="button" aria-label="Move ship down" onPointerDown={() => move("down", true)} onPointerUp={() => move("down", false)} onPointerLeave={() => move("down", false)}>↓</button>
        <button type="button" className="sigc-shooter-fire" onClick={fire}>FIRE</button>
        <button type="button" onClick={() => setPaused((value) => !value)}>{paused ? "RESUME" : "PAUSE"}</button>
        <button type="button" onClick={reset}>RESET</button>
      </div>
      <p className="sigc-shooter-help">MOVE: ↑ ↓ / W S <span>FIRE: SPACE</span></p>
    </aside>
  );
}
