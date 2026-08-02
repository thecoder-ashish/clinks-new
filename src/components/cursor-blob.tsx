import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useHoverTarget } from "@/lib/hover-target";

export function CursorBlob() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const { hovered, pressed } = useHoverTarget();

  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

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
      x.set(e.clientX);
      y.set(e.clientY);
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
  }, [enabled, x, y]);

  if (!enabled) return null;

  const scale = pressed ? 0.85 : hovered ? 1.35 : 1;
  const opacity = visible ? (pressed ? 0.45 : hovered ? 0.75 : 0.55) : 0;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[90px] w-[90px]"
      animate={{ scale, opacity }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <div
        className="h-full w-full rounded-full"
        style={{ background: "var(--color-blob)", filter: "blur(24px)" }}
      />
    </motion.div>
  );
}