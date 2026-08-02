import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // 1.6s loading sequence (0.5s longer)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 200);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [onComplete]);

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
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight inline-flex items-baseline gap-0.5"
        >
          <span className="font-druk text-foreground font-bold tracking-wider">Cross</span>
          <span className="font-display text-accent font-bold italic lowercase">links</span>
        </motion.div>

        {/* Subtitle Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="font-mono text-xs sm:text-sm text-muted-foreground tracking-widest mt-2.5 uppercase"
        >
          PR and Media society of NSUT
        </motion.p>

        {/* Glowing Progress Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="mt-8 flex flex-col items-center gap-3 w-48 sm:w-64"
        >
          {/* Progress Bar Container */}
          <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden p-0.5 border border-accent/20 shadow-inner">
            <motion.div
              className="h-full bg-accent rounded-full shadow-[0_0_12px_var(--color-accent)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
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
