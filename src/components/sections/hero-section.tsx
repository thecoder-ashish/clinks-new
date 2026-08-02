import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scrollToId } from "@/lib/smooth-scroll";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14"
    >
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[520px] w-[520px] rounded-full opacity-40"
        style={{ background: "var(--color-accent)", filter: "blur(140px)" }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-accent max-w-full leading-none"
        >
          CROSSLINKS
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-3 sm:mt-4 font-display text-xs sm:text-lg md:text-xl tracking-[0.25em] text-foreground/75 font-medium uppercase"
        >
          THE FACE OF NSUT
        </motion.h2>
        <motion.button
          onClick={() => scrollToId("about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-24 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
        >
          Scroll to explore
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}