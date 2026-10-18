import { useEffect, useRef, useState } from "react";

const WIDTH = 1600;
const HEIGHT = 500;

export default function SpaceShooter() {
  const canvasRef = useRef(null);
  const gameRef = useRef({ shipY: HEIGHT / 2, up: false, down: false, bullets: [], rocks: [], frame: 0, score: 0 });
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [instruction, setInstruction] = useState("");
  useEffect(() => {
    const message = "USE THE ARROW KEYS TO MOVE";
    let index = 0;
    let deleting = false;
    let timer;
    const type = () => {
      if (!deleting) {
        index += 1;
        setInstruction(message.slice(0, index));
        if (index >= message.length) {
          deleting = true;
          timer = window.setTimeout(type, 1400);
          return;
        }
      } else {
        index -= 1;
        setInstruction(message.slice(0, index));
        if (index <= 0) deleting = false;
      }
      timer = window.setTimeout(type, deleting ? 38 : 68);
    };
    timer = window.setTimeout(type, 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas && canvas.getContext("2d");
    if (!ctx) return undefined;
    const game = gameRef.current;
    game.firing = true; // Keep the background arcade visibly active behind the Glitch title.
    let raf;
    let lastShot = 0;

    const shoot = () => {
      if (!paused && performance.now() - lastShot > 220) {
        game.bullets.push({ x: Math.round(WIDTH * 0.86) - 24, y: game.shipY, length: 42 });
        lastShot = performance.now();
      }
    };
    const keyDown = (event) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) event.preventDefault();
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") game.up = true;
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") game.down = true;
      if (event.key.toLowerCase() === "f" || event.code === "Space") {
        game.firing = true;
        shoot();
      }
    };
    const keyUp = (event) => {
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") game.up = false;
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") game.down = false;
      if (event.key.toLowerCase() === "f" || event.code === "Space") game.firing = false;
    };
    const clearKeys = () => { game.up = false; game.down = false; game.firing = false; };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("blur", clearKeys);

    const drawAsteroid = (rock) => {
      ctx.save();
      ctx.translate(rock.x, rock.y);
      ctx.rotate(rock.rotation);
      ctx.shadowColor = "rgba(244, 247, 250, .38)";
      ctx.shadowBlur = 5;
      ctx.strokeStyle = "#F4F7FA";
      ctx.lineWidth = 2;
      ctx.beginPath();
      rock.points.forEach((point, index) => {
        if (!index) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
      ctx.stroke();
      // Small angular crater details give the rocks a pixel-art / arcade silhouette.
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(98, 212, 232, .45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-rock.radius * 0.28, -rock.radius * 0.12);
      ctx.lineTo(-rock.radius * 0.02, -rock.radius * 0.32);
      ctx.lineTo(rock.radius * 0.16, -rock.radius * 0.02);
      ctx.stroke();
      ctx.restore();
    };

    const drawShip = () => {
      // A clearly visible little rocket, with an animated exhaust flame.
      ctx.save();
      const shipX = Math.round(WIDTH * 0.86);
      ctx.translate(shipX, game.shipY);
      ctx.scale(-1, 1);

      const flameLength = 12 + Math.sin(game.frame * 0.55) * 5;
      ctx.shadowColor = "rgba(255, 145, 77, .75)";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#FF914D";
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.lineTo(-15 - flameLength, -5);
      ctx.lineTo(-12 - flameLength * 0.55, 0);
      ctx.lineTo(-15 - flameLength, 5);
      ctx.closePath();
      ctx.fill();

      ctx.shadowColor = "rgba(221, 238, 246, .65)";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#F4F7FA";
      ctx.beginPath();
      ctx.moveTo(24, 0);
      ctx.quadraticCurveTo(12, -10, -13, -8);
      ctx.lineTo(-19, -4);
      ctx.lineTo(-19, 4);
      ctx.lineTo(-13, 8);
      ctx.quadraticCurveTo(12, 10, 24, 0);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = "#62D4E8";
      ctx.beginPath();
      ctx.ellipse(5, 0, 7, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#91A9B8";
      ctx.beginPath();
      ctx.moveTo(-7, -7);
      ctx.lineTo(-15, -15);
      ctx.lineTo(1, -8);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-7, 7);
      ctx.lineTo(-15, 15);
      ctx.lineTo(1, 8);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#FF914D";
      ctx.beginPath();
      ctx.arc(17, 0, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const loop = () => {
      game.frame += 1;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // Keep the game canvas transparent: only a few stars and game sprites are drawn.
      for (let i = 0; i < 42; i += 1) {
        ctx.globalAlpha = i % 5 === 0 ? 0.48 : 0.16;
        ctx.fillStyle = i % 5 === 0 ? "#62D4E8" : "#91A9B8";
        ctx.fillRect((i * 97 + 19) % WIDTH, (i * 67 + 13) % HEIGHT, 1.5, 1.5);
      }
      ctx.globalAlpha = 1;

      if (!paused) {
        if (game.firing) shoot();
        if (game.up) game.shipY -= 4;
        if (game.down) game.shipY += 4;
        game.shipY = Math.max(18, Math.min(HEIGHT - 18, game.shipY));

        if (game.frame % 45 === 0) {
          const radius = 10 + Math.random() * 13;
          const vertices = 8 + Math.floor(Math.random() * 4);
          const points = Array.from({ length: vertices }, (_, index) => {
            const angle = (Math.PI * 2 * index) / vertices;
            const distance = radius * (0.62 + Math.random() * 0.48);
            return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
          });
          game.rocks.push({
            x: -radius - 4,
            y: 20 + Math.random() * (HEIGHT - 40),
            radius,
            speed: 1.4 + Math.random() * 1.4,
            rotation: Math.random() * 0.5,
            points,
          });
        }

        game.rocks.forEach((rock) => { rock.x += rock.speed; rock.rotation += 0.008; });
        game.bullets.forEach((bullet) => { bullet.x -= 8; });
        game.rocks = game.rocks.filter((rock) => rock.x < WIDTH + 40);
        game.bullets = game.bullets.filter((bullet) => bullet.x > -12);

        game.bullets = game.bullets.filter((bullet) => {
          const hitIndex = game.rocks.findIndex((rock) => Math.hypot(rock.x - bullet.x, rock.y - bullet.y) < rock.radius + 8);
          if (hitIndex < 0) return true;
          game.rocks.splice(hitIndex, 1);
          game.score += 10;
          setScore(game.score);
          return false;
        });
      }

      game.rocks.forEach(drawAsteroid);
      game.bullets.forEach((bullet) => {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.shadowColor = "#62D4E8";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "#62D4E8";
        ctx.fillRect(bullet.x - (bullet.length || 34), bullet.y - 2, bullet.length || 34, 4);
        ctx.shadowBlur = 3;
        ctx.fillStyle = "#F4F7FA";
        ctx.fillRect(bullet.x - (bullet.length || 34), bullet.y - 0.75, bullet.length || 34, 1.5);
        ctx.restore();
      });
      drawShip();

      if (paused) {
        ctx.fillStyle = "rgba(6, 18, 29, .72)";
        ctx.fillRect(WIDTH - 390, 0, 390, HEIGHT);
        ctx.fillStyle = "#F4F7FA";
        ctx.textAlign = "center";
        ctx.font = "bold 16px monospace";
        ctx.fillText("PAUSED", WIDTH - 195, HEIGHT / 2);
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

  const reset = () => {
    gameRef.current = { shipY: HEIGHT / 2, up: false, down: false, firing: true, bullets: [], rocks: [], frame: 0, score: 0 };
    setScore(0);
    setPaused(false);
  };

  return (
    <aside className="sigc-shooter" aria-label="Mini space shooter game">
      <canvas ref={canvasRef} className="sigc-shooter-canvas" width={WIDTH} height={HEIGHT}
        aria-label="Asteroids spawn on the left and travel toward your rocket on the right. Use up and down arrow keys or W and S to move. Hold Space or F to fire energy beams." />
      <div className="sigc-shooter-interface">
        <div className="sigc-shooter-instructions" aria-live="polite">
          <p><span>{instruction}</span><i aria-hidden="true" /></p>
          <p className="sigc-shooter-fire-instruction">HOLD <strong>SPACE</strong> / <strong>F</strong> TO FIRE BEAMS</p>
        </div>
      </div>
    </aside>
  );
}
