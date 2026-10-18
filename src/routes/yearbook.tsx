import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/sections/contact-section";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { useHoverTarget } from "@/lib/hover-target";

export const Route = createFileRoute("/yearbook")({
  head: () => ({
    meta: [
      { title: "Yearbooks - Crosslinks NSUT" },
      { name: "description", content: "Explore and download the official Crosslinks NSUT Yearbooks." },
    ],
  }),
  component: YearbookPage,
});

interface YearbookItem {
  name: string;
  year: string;
  image: string;
  downloadUrl: string;
  description: string;
}

const YEARBOOKS: YearbookItem[] = [
  {
    name: "Epilogue",
    year: "2026",
    description: "The concluding chapter commemorating the journey, memories, and triumphs of the graduating Class of 2026.",
    image: "/img/yearbook26_mockup.png",
    downloadUrl: "https://drive.google.com/drive/folders/16_2Oo6U4BEzchWx2eSHKHh4eXHwsOZnH?usp=sharing",
  },
  {
    name: "Interlude",
    year: "2025",
    description: "A poetic time capsule preserving the milestone memories and unbreakable bonds of the Class of 2025.",
    image: "/img/yearbook_mockup.png",
    downloadUrl: "https://drive.google.com/drive/folders/1i9Im4RPLR7fooLR7skZdMZ-e5DY3dXmZ",
  },
];

function YearbookCard({ yb, index }: { yb: YearbookItem; index: number }) {
  const { setHovered, setPressed } = useHoverTarget();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;

    const maxTilt = 7;
    const rotX = (y / (box.height / 2)) * maxTilt;
    const rotY = -(x / (box.width / 2)) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setIsCardHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPressed(false);
    setIsCardHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="group relative w-full flex flex-col"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-3xl flex-1 flex flex-col"
        style={{
          transform: isCardHovered
            ? `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-4px)`
            : `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)`,
          transformStyle: "preserve-3d",
          transition: isCardHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
        }}
      >
        {/* Backlight Glow */}
        <div
          className="absolute inset-0 rounded-3xl bg-accent/20 opacity-0 transition-opacity duration-500 blur-3xl pointer-events-none"
          style={{
            transform: "translateZ(-30px) scale(0.95)",
            opacity: isCardHovered ? 1 : 0,
          }}
        />

        {/* Main Card */}
        <div
          className="relative w-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between flex-1 bg-card/75 backdrop-blur-2xl border border-border/70 shadow-lg hover:border-accent/50 transition-all duration-300 overflow-hidden"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Subtle Ambient Decorative Light */}
          <div className="absolute -top-24 -right-24 w-52 h-52 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Photo / Mockup Container */}
          <div
            className="relative w-full aspect-[4/3] rounded-2xl bg-muted/40 border border-border/50 p-4 sm:p-6 flex items-center justify-center overflow-hidden mb-6 group-hover:border-accent/40 transition-colors"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="absolute inset-0 bg-radial from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src={yb.image}
              alt={`${yb.name} (${yb.year})`}
              className="w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2 mb-6" style={{ transform: "translateZ(30px)" }}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-foreground tracking-tight group-hover:text-accent transition-colors duration-300">
                {yb.name}
              </h3>
              <span className="font-mono text-xs sm:text-sm text-muted-foreground font-semibold">
                {yb.year}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {yb.description}
            </p>
          </div>

          {/* Download Button */}
          <div style={{ transform: "translateZ(35px)" }}>
            <Button
              asChild
              size="lg"
              className="w-full rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-accent/25 hover:scale-[1.01] transition-all duration-300 py-6 text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <a
                href={yb.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onPointerDown={() => setPressed(true)}
                onPointerUp={() => setPressed(false)}
              >
                <Download className="h-4 w-4 shrink-0" />
                <span>Download {yb.name}</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function YearbookPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="text-foreground min-h-screen flex flex-col justify-between pt-16 sm:pt-20 relative z-10"
    >
      <main className="flex-grow flex flex-col items-center w-full">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-6 mb-12 flex flex-col gap-8 md:gap-10">
          {/* Section Header */}
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs sm:text-sm text-foreground/90">// YEARBOOKS</p>
            <h1 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl md:text-5xl text-accent">
              Annual Editions
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
              A time capsule of unforgettable memories, shared victories, and untold stories. Explore and download official Crosslinks yearbooks across batches.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {YEARBOOKS.map((yb, index) => (
              <YearbookCard key={yb.name} yb={yb} index={index} />
            ))}
          </div>
        </div>

        {/* Contact/Reach Out Section */}
        <div className="w-full">
          <ContactSection />
        </div>
      </main>
    </motion.div>
  );
}
