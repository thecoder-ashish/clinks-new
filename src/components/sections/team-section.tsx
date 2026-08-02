import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useHoverTarget } from "@/lib/hover-target";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MEMBERS = [
  {
    name: "Dhruv Sharma",
    role: "PRESIDENT, EXTERNAL AFFAIRS",
    image: "/img/core/dhruv.jpeg",
    quote: "Crosslinks is not just a society for me….it has been a journey of ups and downs. Nevertheless, the learnings, love, kalesh and experiences have remained constant and that’s what matters the most.",
  },
  {
    name: "Vidushi Kotnala",
    role: "PRESIDENT, MEDIA",
    image: "/img/core/vidushi.jpeg",
    quote: "Bunch of undergrads with too many ideas and just enough courage to make them happen. We bring students together, turn ordinary days into memorable ones, and prove that college is about more than just academics.",
  },
  {
    name: "Muskaan Mathur",
    role: "VICE PRESIDENT",
    image: "/img/core/muskaan.jpeg",
    quote: "Crosslinks has shown me the value of teamwork and the impact of everyone’s efforts coming together. Beyond the work, it’s about building lasting friendships, enjoying every experience and creating memories we’ll always look back on.",
  },
]; function MemberCard({
  name,
  role,
  image,
  quote,
  i,
  isExpanded,
  onCardClick,
}: {
  name: string;
  role: string;
  image: string;
  quote: string;
  i: number;
  isExpanded: boolean;
  onCardClick: (name: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { setHovered, setPressed } = useHoverTarget();

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const active = isHovered || isExpanded;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setPressed(true);
    onCardClick(name);

    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;

    const maxTilt = 10;
    const rotX = -(y / (box.height / 2)) * maxTilt;
    const rotY = (x / (box.width / 2)) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;

    const maxTilt = 10;
    const rotX = -(y / (box.height / 2)) * maxTilt;
    const rotY = (x / (box.width / 2)) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setPressed(false);
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="relative w-full h-[235px] sm:h-[255px]"
      data-team-card
    >
      <div
        onMouseEnter={() => {
          setIsHovered(true);
          setHovered("QUOTE");
        }}
        onPointerLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={() => setPressed(false)}
        onMouseMove={handleMouseMove}
        className={`absolute top-0 inset-x-0 rounded-2xl cursor-pointer transition-all duration-300 ${active ? "z-40" : "z-10"
          }`}
        style={{
          transform: active
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.05)`
            : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`,
          transformStyle: "preserve-3d",
          transition: active ? "transform 0.1s ease-out" : "transform 0.3s ease-out",
        }}
      >
        {/* Backlight Glow */}
        <div
          className="absolute inset-0 rounded-2xl bg-accent/25 opacity-0 transition-opacity duration-300 blur-xl pointer-events-none"
          style={{
            transform: "translateZ(-20px) scale(0.95)",
            opacity: active ? 1 : 0,
          }}
        />

        {/* Main Card Content Container */}
        <div
          className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 bg-card border ${active ? "border-accent shadow-2xl shadow-accent/20" : "border-border shadow-sm"
            }`}
          style={{
            transform: "translateZ(0px)",
          }}
        >
          <div style={{ transform: "translateZ(20px)" }}>
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden bg-muted mx-auto ring-2 ring-accent/40 flex-shrink-0 transition-transform duration-300">
              <img src={image} alt={name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-display font-bold text-lg sm:text-xl text-foreground tracking-tight">{name}</h3>
              <p className="text-[11px] sm:text-xs text-accent font-mono font-normal mt-1 tracking-wider uppercase">{role}</p>
            </div>
          </div>

          {quote && (
            <motion.div
              initial={false}
              animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
              style={{ transform: "translateZ(30px)" }}
            >
              <p className="mt-4 text-xs sm:text-sm italic text-foreground/90 font-medium text-center border-t border-border/50 pt-3 leading-relaxed font-sans">
                "{quote}"
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MobileMemberCard({
  name,
  role,
  image,
  quote,
  isFocused,
  onSelect,
}: {
  name: string;
  role: string;
  image: string;
  quote: string;
  isFocused: boolean;
  onSelect: () => void;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const updateTiltFromCoords = (clientX: number, clientY: number, target: HTMLElement) => {
    const box = target.getBoundingClientRect();
    const x = clientX - box.left - box.width / 2;
    const y = clientY - box.top - box.height / 2;

    const maxTilt = 12;
    const rotX = (y / (box.height / 2)) * maxTilt;
    const rotY = -(x / (box.width / 2)) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPressed(true);
    updateTiltFromCoords(e.clientX, e.clientY, e.currentTarget);
    onSelect();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isPressed || isFocused) {
      updateTiltFromCoords(e.clientX, e.clientY, e.currentTarget);
    }
  };

  const handlePointerUpOrLeave = () => {
    setIsPressed(false);
    setTimeout(() => {
      setRotateX(0);
      setRotateY(0);
    }, 200);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrLeave}
      onPointerLeave={handlePointerUpOrLeave}
      onTouchStart={(e) => {
        if (e.touches[0]) {
          setIsPressed(true);
          updateTiltFromCoords(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
        }
        onSelect();
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) {
          updateTiltFromCoords(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
        }
      }}
      onTouchEnd={handlePointerUpOrLeave}
      className="w-[84vw] max-w-[300px] snap-center shrink-0 rounded-2xl cursor-pointer relative py-2 transition-all duration-300 select-none"
      style={{
        transform: isPressed || (isFocused && (rotateX !== 0 || rotateY !== 0))
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04) translateY(-4px)`
          : isFocused
            ? `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02) translateY(-2px)`
            : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.96) translateY(0px)`,
        transformStyle: "preserve-3d",
        transition: isPressed ? "transform 0.05s ease-out" : "transform 0.3s ease-out, scale 0.3s ease-out",
      }}
    >
      {/* Backlight Glow when focused */}
      <div
        className="absolute inset-0 rounded-2xl bg-accent/20 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{
          opacity: isFocused ? 1 : 0,
        }}
      />

      {/* Main Card */}
      <div
        className={`p-5 rounded-2xl bg-card border shadow-md flex flex-col justify-between transition-all duration-300 relative z-10 ${isFocused ? "border-accent/80 shadow-accent/10" : "border-border/70"
          }`}
      >
        <div>
          <div className="h-16 w-16 rounded-full overflow-hidden bg-muted mx-auto ring-2 ring-accent/40 flex-shrink-0 transition-transform duration-300">
            <img src={image} alt={name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-2.5 text-center">
            <h3 className="font-display font-bold text-base text-foreground tracking-tight">{name}</h3>
            <p className="text-[10px] text-accent font-mono font-normal mt-0.5 tracking-wide uppercase">{role}</p>
          </div>
        </div>

        {quote && (
          <motion.div
            initial={false}
            animate={{
              height: isFocused ? "auto" : 0,
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-xs sm:text-sm italic text-foreground/90 font-medium text-center border-t border-border/50 pt-3 leading-relaxed font-sans">
              "{quote}"
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function TeamSection() {
  const [activeName, setActiveName] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToMobileIndex = (index: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const cardEl = el.children[index] as HTMLElement;
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  // Auto-slide horizontal slider on mobile when user reaches section
  useEffect(() => {
    if (!isInView || userInteracted) return;

    const interval = setInterval(() => {
      setActiveMobileIndex((prev) => {
        const next = (prev + 1) % MEMBERS.length;
        scrollToMobileIndex(next);
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isInView, userInteracted]);

  const pauseAutoSlide = () => {
    setUserInteracted(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setUserInteracted(false);
    }, 7000);
  };

  useEffect(() => {
    if (!activeName) return;
    const handleOutsideClick = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-team-card]")) {
        setActiveName(null);
      }
    };

    window.addEventListener("pointerdown", handleOutsideClick);
    return () => window.removeEventListener("pointerdown", handleOutsideClick);
  }, [activeName]);

  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const itemWidth = el.clientWidth * 0.84;
    if (itemWidth <= 0) return;
    const index = Math.round(el.scrollLeft / itemWidth);
    setActiveMobileIndex(Math.min(Math.max(index, 0), MEMBERS.length - 1));
  };

  return (
    <section ref={sectionRef} id="team" className="min-h-screen flex flex-col justify-center pt-24 pb-32 sm:pb-40 px-4 sm:px-6 w-full relative overflow-visible">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-sm mb-3 text-foreground/90">// team</p>
            <h2 className="font-display font-semibold tracking-tight text-4xl md:text-6xl text-accent">
              WORDS FROM CORE
            </h2>
          </div>
          {/* Mobile Carousel Arrow Controls & Step Counter */}
          <div className="flex sm:hidden items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground font-medium">
              {String(activeMobileIndex + 1).padStart(2, "0")}/{String(MEMBERS.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  pauseAutoSlide();
                  const prev = Math.max(0, activeMobileIndex - 1);
                  setActiveMobileIndex(prev);
                  scrollToMobileIndex(prev);
                }}
                disabled={activeMobileIndex === 0}
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors cursor-pointer"
                aria-label="Previous core member"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  pauseAutoSlide();
                  const next = Math.min(MEMBERS.length - 1, activeMobileIndex + 1);
                  setActiveMobileIndex(next);
                  scrollToMobileIndex(next);
                }}
                disabled={activeMobileIndex === MEMBERS.length - 1}
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors cursor-pointer"
                aria-label="Next core member"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mobile Auto-Sliding Horizontal Snap Carousel */}
        <div className="mt-8 block sm:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            onTouchStart={pauseAutoSlide}
            onMouseDown={pauseAutoSlide}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 py-2 pb-6 scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {MEMBERS.map((m, i) => (
              <MobileMemberCard
                key={m.name}
                {...m}
                isFocused={activeMobileIndex === i}
                onSelect={() => {
                  pauseAutoSlide();
                  setActiveMobileIndex(i);
                  scrollToMobileIndex(i);
                }}
              />
            ))}
          </div>
          {/* Dot Indicators */}
          <div className="flex justify-center gap-1.5 mt-3">
            {MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  pauseAutoSlide();
                  setActiveMobileIndex(i);
                  scrollToMobileIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeMobileIndex === i ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground"
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="mt-8 sm:mt-10 hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 items-start w-full">
          {MEMBERS.map((m, i) => (
            <MemberCard
              key={m.name}
              {...m}
              i={i}
              isExpanded={activeName === m.name}
              onCardClick={(name) => setActiveName(name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}