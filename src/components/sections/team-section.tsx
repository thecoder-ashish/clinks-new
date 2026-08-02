import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useHoverTarget } from "@/lib/hover-target";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MEMBERS = [
  {
    name: "MITHILESH KOROCHIKAR",
    role: "PRESIDENT, EXTERNAL AFFAIRS",
    image: "/img/mithilesh.png",
    quote: "Crosslinks = endless opportunities + unmatched experiences. Everything else you hear? Just background noise.",
  },
  {
    name: "UDITA JARODIA",
    role: "PRESIDENT, MEDIA",
    image: "/img/udita.jpg",
    quote: "We're not just a team, we're a family, forging a stronger bond with everything we do. What we build here isn't just work - it's love, trust, and legacy in the making!",
  },
  {
    name: "AKSHATH BHAMU",
    role: "VICE PRESIDENT",
    image: "/img/akshath.png",
    quote: "Might genuinely have some of the best connections on here , the people are great, the vibes are immaculate, all in all dont join if youre a loser. peace",
  },
  {
    name: "GAURI BHARDWAJ",
    role: "VICE PRESIDENT",
    image: "/img/gauri.jpg",
    quote: "We are not just a PR society we are home—the kind where seniors guide, juniors inspire and bonds turn into lifelong friendships. We hustle hard, party harder, and make every campus event unforgettable.",
  },
  {
    name: "ARYAN KHUDLAIN",
    role: "MANAGING EDITOR",
    image: "/img/aryan.jpg",
    quote: "moj masti nahi rukni chiye",
  },
  {
    name: "SNEHA VATS",
    role: "MANAGING EDITOR",
    image: "/img/sneha.jpg",
    quote: "Guiding the editorial direction and keeping details polished.",
  },
  {
    name: "PRISHA PRIYA",
    role: "MANAGING EDITOR",
    image: "/img/prisha.png",
    quote: "Crosslinks is all about epic events, amazing people, and unforgettable memories. The kind that makes your college journey truly unforgettable!",
  },
  {
    name: "ABHINAV KUMAR",
    role: "MANAGING EDITOR",
    image: "/img/abhinav.png",
    quote: "Striving for editorial excellence and delivering impactful content.",
  },
];

function MemberCard({
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

    const maxTilt = 12;
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

    const maxTilt = 12;
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
      className="relative h-[230px] w-full"
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
        className={`absolute top-0 inset-x-0 rounded-2xl cursor-pointer ${
          active ? "z-20" : "z-10"
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
          className="absolute inset-0 rounded-2xl bg-accent/15 opacity-0 transition-opacity duration-300 blur-2xl pointer-events-none"
          style={{
            transform: "translateZ(-20px) scale(0.95)",
            opacity: active ? 1 : 0,
          }}
        />

        {/* Main Card Content Container */}
        <div
          className="p-6 rounded-2xl shadow-sm flex flex-col justify-between transition-all duration-300 bg-card border border-border"
          style={{
            transform: "translateZ(0px)",
            borderColor: active ? "var(--color-accent)" : undefined,
            boxShadow: active ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" : "none",
          }}
        >
          <div style={{ transform: "translateZ(20px)" }}>
            <div className="h-24 w-24 rounded-full overflow-hidden bg-muted mx-auto ring-2 ring-accent/30 flex-shrink-0">
              <img src={image} alt={name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-display font-bold text-lg text-foreground tracking-tight">{name}</h3>
              <p className="text-xs text-accent font-mono mt-1 tracking-wide">{role}</p>
            </div>
          </div>

          {quote && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
              style={{ transform: "translateZ(30px)" }}
            >
              <p className="mt-4 text-xs italic text-muted-foreground text-center border-t border-border/50 pt-3 leading-relaxed">
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
}: {
  name: string;
  role: string;
  image: string;
  quote: string;
}) {
  return (
    <div className="w-[88vw] max-w-[340px] snap-center shrink-0 p-6 rounded-2xl bg-card border border-border/80 shadow-md flex flex-col justify-between min-h-[290px] transition-all duration-300">
      <div>
        <div className="h-20 w-20 rounded-full overflow-hidden bg-muted mx-auto ring-2 ring-accent/40 flex-shrink-0">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="mt-3 text-center">
          <h3 className="font-display font-bold text-base text-foreground tracking-tight">{name}</h3>
          <p className="text-[11px] text-accent font-mono mt-0.5 tracking-wide">{role}</p>
        </div>
      </div>
      {quote && (
        <p className="mt-3 text-xs italic text-muted-foreground text-center border-t border-border/50 pt-3 leading-relaxed font-sans">
          "{quote}"
        </p>
      )}
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
    const itemWidth = el.clientWidth * 0.88;
    if (itemWidth <= 0) return;
    const index = Math.round(el.scrollLeft / itemWidth);
    setActiveMobileIndex(Math.min(Math.max(index, 0), MEMBERS.length - 1));
  };

  return (
    <section ref={sectionRef} id="team" className="min-h-screen py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-4"
        >
          <div>
            <p className="text-accent font-mono text-sm mb-3">// team</p>
            <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-accent">
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
            {MEMBERS.map((m) => (
              <MobileMemberCard key={m.name} {...m} />
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
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeMobileIndex === i ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="mt-12 hidden sm:grid grid-cols-2 md:grid-cols-4 gap-6 items-start">
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