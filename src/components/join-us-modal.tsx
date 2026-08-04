import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, UserPlus, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useHoverTarget } from "@/lib/hover-target";

export function JoinUsModal({ triggerClass }: { triggerClass?: string }) {
  const [open, setOpen] = useState(false);
  const { setPressed, setHovered } = useHoverTarget();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="inline-block"
          onPointerLeave={() => {
            setPressed(false);
            setHovered(false);
          }}
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onMouseEnter={() => setHovered("JOIN")}
        >
          <button
            className={
              triggerClass ||
              "h-9 px-4 inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground font-semibold text-xs sm:text-sm shadow-md hover:shadow-accent/25 hover:opacity-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
            }
          >
            <UserPlus className="h-3.5 w-3.5 shrink-0" />
            <span>Join Us</span>
          </button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border border-accent/40 bg-card/95 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden select-none">
        {/* Ambient Backlight Glow inside popup */}
        <div className="absolute -top-24 -right-24 h-56 w-56 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Top Animated Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-14 w-14 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent mb-4 shadow-inner"
          >
            <Sparkles className="h-7 w-7 animate-pulse text-accent" />
          </motion.div>

          <span className="font-mono text-xs text-accent font-semibold tracking-widest uppercase mb-1.5">
            // RECRUITMENTS 2026
          </span>

          <DialogHeader className="p-0 sm:text-center">
            <DialogTitle className="font-sans font-bold text-2xl sm:text-3xl text-foreground tracking-tight leading-snug">
              Recruitments Opening Soon!
            </DialogTitle>
          </DialogHeader>

          <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            We are preparing to welcome the next batch of creators, storytellers, event managers, and designers to <span className="text-foreground font-semibold">Crosslinks</span> — the official PR & Media society of NSUT.
          </p>

          {/* Department Tags */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {[
              "📸 Photography & Film",
              "🎨 Graphic Design",
              "🎬 Video Editing",
              "💻 Tech",
              "✍️ Content",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-xl bg-muted/80 border border-border/80 font-mono text-[11px] text-foreground/90 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 w-full p-3.5 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-2.5 text-left text-xs text-foreground/90 font-medium">
            <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
            <span>Follow our socials & keep your notifications on for application drop updates!</span>
          </div>

          {/* Close Action Button */}
          <button
            onClick={() => setOpen(false)}
            className="mt-6 w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm shadow-md hover:opacity-95 transition-opacity cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <span>Stay Tuned!</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
