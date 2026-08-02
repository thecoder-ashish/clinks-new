import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { useHoverTarget } from "@/lib/hover-target";
import { Sparkles, Share2 } from "lucide-react";

export function CursorBlob() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const { hovered, pressed, hoverText } = useHoverTarget();

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  // Precision dot (snappy spring)
  const dotX = useSpring(mouseX, { stiffness: 900, damping: 40 });
  const dotY = useSpring(mouseY, { stiffness: 900, damping: 40 });

  // Outer halo ring (smooth spring with subtle bouncy catch-up)
  const haloX = useSpring(mouseX, { stiffness: 340, damping: 14, mass: 0.5 });
  const haloY = useSpring(mouseY, { stiffness: 340, damping: 14, mass: 0.5 });

  // Ambient soft glow (gentle spring)
  const auraX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const auraY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const isImg = !!(
        target &&
        (target.tagName === "IMG" ||
          target.closest("img") ||
          target.closest("[data-hover-type='image']"))
      );
      const isNav = !!(
        target &&
        (target.closest("header") ||
          target.closest("nav") ||
          target.closest("[data-header-nav]"))
      );
      setIsImageHovered(isImg);
      setIsNavHovered(isNav);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const isAshishHovered = hoverText === "ASHISH_KUMAR";
  const isSocialHovered = hoverText === "SOCIAL";
  const isDotHidden = (hovered || isImageHovered || isSocialHovered) && !isNavHovered && !isAshishHovered;

  return (
    <>
      {/* 1. Ambient Background Spotlight Glow */}
      <motion.div
        aria-hidden
        style={{ x: haloX, y: haloY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[9990] h-64 w-64 rounded-full bg-accent/5 blur-3xl transition-opacity duration-500"
        animate={{ opacity: visible ? 1 : 0 }}
      />

      {/* 2. Magnetic Outer Halo Ring / Card Hover Spotlight */}
      <motion.div
        aria-hidden
        style={{ x: haloX, y: haloY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border transition-colors duration-300"
        animate={{
          width: hovered ? (isSocialHovered ? 36 : hoverText && hoverText !== "NAV" && !isAshishHovered ? 84 : 48) : 36,
          height: hovered ? (isSocialHovered ? 36 : hoverText && hoverText !== "NAV" && !isAshishHovered ? 36 : 48) : 36,
          scale: pressed ? 0.82 : 1,
          opacity: visible ? (isNavHovered || isAshishHovered ? 0 : 1) : 0,
          borderColor: isSocialHovered ? "transparent" : hovered ? "var(--color-accent)" : "rgba(var(--color-accent), 0.35)",
          backgroundColor: isSocialHovered
            ? "transparent"
            : hovered
              ? "rgba(var(--color-accent), 0.15)"
              : "rgba(var(--color-accent), 0.03)",
          backdropFilter: isSocialHovered ? "none" : hovered ? "blur(8px)" : "blur(2px)",
          boxShadow: isSocialHovered
            ? "none"
            : hovered
              ? "0 0 25px rgba(var(--color-accent), 0.35), inset 0 0 12px rgba(var(--color-accent), 0.2)"
              : "0 0 10px rgba(0, 0, 0, 0.05)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {hovered && !isNavHovered && !isAshishHovered && (
            <motion.div
              key="hover-badge"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center gap-1 px-1.5 text-center font-mono text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap select-none"
            >
              {isSocialHovered ? (
                <Share2 className="h-6 w-6 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" />
              ) : hoverText && hoverText !== "NAV" ? (
                <span className="text-accent">{hoverText}</span>
              ) : (
                <Sparkles className="h-4 w-4 animate-pulse text-accent" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 3. High-Precision Inner Dot */}
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full transition-colors duration-200 ${
          isAshishHovered || isSocialHovered
            ? "bg-white shadow-[0_0_8px_#ffffff]"
            : "bg-accent shadow-[0_0_8px_var(--color-accent)]"
        }`}
        animate={{
          scale: pressed ? 0.5 : isDotHidden ? 0 : 1,
          opacity: visible ? (isDotHidden ? 0 : 1) : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}