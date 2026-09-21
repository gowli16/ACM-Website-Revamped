import { useEffect, useRef, useState, useCallback } from "react";
import {
    useScroll, useTransform, useMotionValueEvent, motion
} from "framer-motion";

// Safeguard the base path to ensure it always starts and ends correctly for Next.js public folder
const BASE = import.meta.env.BASE_URL || '/';
const getSafeBase = () => BASE.endsWith('/') ? BASE : `${BASE}/`;

const FRAME_COUNT = 240; 
const currentFrame = (i) =>
    `${getSafeBase()}sequence/frame_${i.toString().padStart(3, "0")}_delay-0.071s.jpg`;

const CINEMATIC = {
    SCROLL_VH: 2900,
    FRAME_SCROLL_START: 0.0,
    FRAME_SCROLL_END: 1.0,
};

const ROADMAP_START = 0.08;
const ROADMAP_END = 0.98;

const STEPS = [
    { n: "01", title: "Git & GitHub", copy: "Version control first — every change tracked, every mistake reversible.", side: "left" },
    { n: "02", title: "HTML & CSS", copy: "Structure and style, the skeleton and skin of every page.", side: "right" },
    { n: "03", title: "JavaScript", copy: "Logic enters the browser. Static pages start to think.", side: "left" },
    { n: "04", title: "React.js", copy: "Interfaces built from components — small pieces that scale into big products.", side: "right" },
    { n: "05", title: "Node.js", copy: "JavaScript leaves the browser. Servers, APIs, and databases open up.", side: "left" },
    { n: "06", title: "App Development", copy: "The same skills, aimed at native and cross-platform mobile apps.", side: "right" },
    { n: "07", title: "Full Stack Developer", copy: "Frontend to backend, database to deployment — the complete builder.", side: "left" },
];

const SEG = (ROADMAP_END - ROADMAP_START) / STEPS.length;

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 37) % 100}%`,
    delay: `${(i * 0.9) % 6}s`,
    duration: `${5 + (i % 5)}s`,
    size: 2 + (i % 3),
}));

function SyllabusCard({ step, index, scrollYProgress }) {
    const segStart = ROADMAP_START + index * SEG;
    const segEnd = ROADMAP_START + (index + 1) * SEG;
    const igniteEnd = segStart + SEG * 0.22;
    const isLast = index === STEPS.length - 1;
    const dimStart = isLast ? segEnd : segEnd - SEG * 0.2;

    const opacity = useTransform(
        scrollYProgress,
        isLast ? [segStart, igniteEnd, dimStart] : [segStart, igniteEnd, dimStart, segEnd],
        isLast ? [0, 1, 1] : [0, 1, 1, 0]
    );
    const glow = useTransform(
        scrollYProgress,
        [segStart, igniteEnd, dimStart, segEnd],
        [0, 1, 1, 0.4]
    );
    const isLeft = step.side === "left";
    const slideFrom = isLeft ? -60 : 60;
    const x = useTransform(scrollYProgress, [segStart, igniteEnd], [slideFrom, 0]);
    const scale = useTransform(scrollYProgress, [segStart, igniteEnd], [0.92, 1]);
    const blur = useTransform(glow, (g) => `blur(${(1 - g) * 6}px)`);

    return (
        <motion.div
            style={{
                opacity,
                position: "fixed",
                top: "38%",
                [isLeft ? "left" : "right"]: "clamp(1.5rem, 6vw, 6rem)",
                x,
                y: "-50%",
                scale,
                filter: blur,
            }}
            className="z-30 pointer-events-none"
        >
            <div style={{ maxWidth: "min(42vw, 620px)", textAlign: isLeft ? "left" : "right" }} className="bg-[#020204]/40 p-6 rounded-3xl backdrop-blur-sm border border-white/5 shadow-[0_0_30px_rgba(249,115,22,0.08)]">
                <p style={{ fontSize: "clamp(0.6rem, 1vw, 0.7rem)", letterSpacing: "0.5em", color: "#f97316", fontWeight: 600, marginBottom: "0.6rem", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    STAGE {step.n} / 07
                </p>
                <motion.h3 style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.02, color: "#ffffff", margin: "0 0 0.8rem 0", fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    {step.title}
                </motion.h3>
                <p style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: 1.55, color: "rgba(255,255,255,0.7)", margin: 0, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
                    {step.copy}
                </p>
            </div>
        </motion.div>
    );
}

export default function CinematicExperience() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const renderRef = useRef(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(
        scrollYProgress,
        [CINEMATIC.FRAME_SCROLL_START, CINEMATIC.FRAME_SCROLL_END],
        [0, FRAME_COUNT - 1]
    );

    useEffect(() => {
        let cancelled = false;
        const loaded = new Array(FRAME_COUNT);
        let settled = 0;

        const settle = () => {
            settled += 1;
            if (settled === FRAME_COUNT && !cancelled) {
                imagesRef.current = loaded;
                setImagesLoaded(true);
            }
        };

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.onload = settle;
            img.onerror = settle;
            img.src = currentFrame(i);
            loaded[i] = img;
        }

        const timeout = setTimeout(() => {
            if (!cancelled && !imagesLoaded) {
                imagesRef.current = loaded;
                setImagesLoaded(true);
            }
        }, 6000);

        return () => { cancelled = true; clearTimeout(timeout); };
    }, []);

    const drawImage = useCallback((index) => {
        if (!canvasRef.current || imagesRef.current.length < FRAME_COUNT) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const img = imagesRef.current[Math.round(index)];
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!img || !img.complete || img.naturalWidth === 0) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const ox = (canvas.width - img.width * ratio) / 2;
        const oy = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(img, 0, 0, img.width, img.height, ox, oy, img.width * ratio, img.height * ratio);
    }, []);

    useEffect(() => { if (imagesLoaded) drawImage(frameIndex.get()); }, [imagesLoaded, drawImage, frameIndex]);

    useMotionValueEvent(frameIndex, "change", (v) => {
        renderRef.current = v;
        if (imagesLoaded) drawImage(v);
    });

    useEffect(() => {
        const onResize = () => { if (imagesLoaded) drawImage(renderRef.current); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [imagesLoaded, drawImage]);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v < ROADMAP_START) { if (activeIndex !== 0) setActiveIndex(0); return; }
        const idx = Math.min(STEPS.length - 1, Math.floor((v - ROADMAP_START) / SEG));
        if (idx !== activeIndex) setActiveIndex(idx);
    });

    const titleOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.03], [0, -20]);

    return (
        <div id="roadmap" ref={containerRef} className="w-full relative z-10" style={{ height: `${CINEMATIC.SCROLL_VH}vh` }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <img 
                    src={currentFrame(0)} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen" 
                    onError={(e) => e.target.style.display = 'none'} 
                />
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-20" style={{ color: "#f97316", letterSpacing: "0.25em", fontSize: "11px", textTransform: "uppercase" }}>
                        SYNCING ROADMAP...
                    </div>
                )}
                <canvas ref={canvasRef} className="h-full w-full absolute inset-0 z-10 mix-blend-screen opacity-50" />
                
                <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    {EMBERS.map((e) => (
                        <span key={e.id} style={{ 
                            position: "absolute", left: e.left, bottom: "-5%", 
                            width: `${e.size}px`, height: `${e.size}px`, borderRadius: "50%", 
                            background: e.id % 2 === 0 ? "#f97316" : "#eab308", 
                            boxShadow: e.id % 2 === 0 ? "0 0 8px 2px rgba(249,115,22,0.7)" : "0 0 8px 2px rgba(234,179,8,0.7)", 
                            animation: `emberRise ${e.duration} linear ${e.delay} infinite`, opacity: 0 
                        }} />
                    ))}
                </div>
                <style>{`@keyframes emberRise { 0% { transform: translateY(0) translateX(0); opacity: 0; } 10% { opacity: 0.8; } 90% { opacity: 0.3; } 100% { transform: translateY(-105vh) translateX(20px); opacity: 0; } }`}</style>
                
                <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-b from-transparent via-transparent to-[#020204]/80" />
                
                <motion.div style={{ opacity: titleOpacity, y: titleY }} className="absolute top-6 right-8 flex flex-col items-end gap-1 z-30 pointer-events-none">
                    <p style={{ fontSize: "clamp(1.05rem, 1.2vw, 0.72rem)", letterSpacing: "0.55em", color: "#f97316", fontWeight: 500, textTransform: "uppercase" }}>WEB &amp; APP DEV SIG</p>
                    <h2 style={{ fontSize: "clamp(3.6rem, 8vw, 3rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: "#ffffff", textAlign: "right", textShadow: "0 0 40px rgba(249,115,22,0.5)", margin: 0 }}>ROADMAP</h2>
                </motion.div>
                
                {STEPS.map((step, i) => (
                    <SyllabusCard key={step.n} step={step} index={i} scrollYProgress={scrollYProgress} />
                ))}
            </div>
        </div>
    );
}