import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animId: number;
    const startTime = performance.now();
    const duration = 1500; // 1.5s loading sequence

    const update = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        animId = requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <motion.div
      key="preloader"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(16px)",
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 1. Ambient Backdrop Glow Spotlight */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [0.85, 1.15, 0.95],
            opacity: [0.2, 0.4, 0.25],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="h-[450px] w-[450px] sm:h-[600px] sm:w-[600px] rounded-full bg-accent/20 blur-[120px]"
        />
      </div>

      {/* 2. Cyber Radial Ambient Light Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* 3. Center Content: Brand Logo & Animated Tech Meter */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="tracking-tight text-5xl sm:text-7xl md:text-8xl leading-none inline-flex items-baseline justify-center gap-0 select-none"
        >
          <span className="font-druk font-bold text-foreground tracking-wider text-[0.95em] sm:text-[1em]">Cross</span>
          <span className="font-display font-bold italic text-accent lowercase">links</span>
        </motion.h1>

        {/* Subtitle Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.85, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-3 sm:mt-4 font-montserrat text-xs sm:text-sm tracking-[0.28em] text-foreground/85 font-bold uppercase"
        >
          PR AND MEDIA SOCIETY OF NSUT
        </motion.p>

        {/* Glowing Progress Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-8 flex flex-col items-center gap-3 w-48 sm:w-64"
        >
          {/* Progress Bar Container */}
          <div className="h-2 w-full bg-secondary/80 rounded-full overflow-hidden border border-accent/30 shadow-inner relative">
            <div
              className="h-full rounded-full transition-all duration-75 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: "var(--accent)",
                boxShadow: "0 0 12px var(--accent)",
              }}
            />
          </div>

          {/* Monospace Counter */}
          <div className="flex items-center justify-between w-full text-[11px] font-mono text-muted-foreground tracking-widest">
            <span className="text-accent/80 animate-pulse">// INITIALIZING</span>
            <span className="font-semibold text-foreground">{String(progress).padStart(3, "0")}%</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Corner Frame Lines */}
      <div className="absolute bottom-8 font-mono text-[10px] text-muted-foreground/50 tracking-widest uppercase pointer-events-none">
        NSUT DELHI • CROSSLINKS 2026
      </div>
    </motion.div>
  );
}
