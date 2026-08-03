import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHoverTarget } from "@/lib/hover-target";

const EVENTS = [
  {
    title: "NSUTTHON",
    image: "/img/events/thon.jpg",
    blurb:
      "The annual flagship event of crosslinks. It consists of orientations, auditions , workshops and competitions organised by various societies. It is a team - based event which promotes teamwork and leadership qualities. Every team is credited with specific points for every participation and win. It is a race of being - THE ULTIMATE FRESHER.",
  },
  {
    title: "GARBA NIGHT",
    image: "/img/events/garba.jpg",
    blurb:
      "Garba night, a sparkling festive lights and colourful decor with dandiya under the dazzling stars.The university lit up in beautiful purple lights and the vibrant songs echoed through the grounds as the students dressed up in pretty ethnic clothes gathered to dance and have fun.",
  },
  {
    title: "MR. & MS. MOKSHA",
    image: "/img/events/moksha.jpg",
    blurb:
      "Mr. and Ms. Moksha, an event held at our college, is a celebration of charisma, talent, and personality. This competition showcases the finest qualities of students as they compete for the title with confidence and style.",
  },
  {
    title: "SCRIBBLE DAY",
    image: "/img/events/scribble.jpg",
    blurb:
      "Scribble Day is a creative see off to our beloved seniors. Cute, funny and some outrageous messages are signed off on t-shirts and even body parts during the event. Together with music and a lot of pictures to capture memories worth many years.",
  },
  {
    title: "FAREWELL",
    image: "/img/events/farewell.jpg",
    blurb:
      "Farewell day is a bittersweet occasion, marking the end of an important chapter in one's life and the start of a new journey. We at crosslinks organized a farewell day party bidding them a goodbye and wishing them for a new journey in their lives. Their memories and the bonds they formed will always be remembered and will be cherished.",
  },
  {
    title: "ALUMNI MEET",
    image: "/img/events/alumni.jpg",
    blurb:
      "A lovely reunion for all the alumni to reminisce about their good old days together. The alumni gathered to share their experiences with the students and discuss new ideas. The alumni were also facilitated and live music during the evening made the event enjoyable.It was organized in collaboration with Alumni Association, NSUT.",
  },
];

function EventCard({ e, i }: { e: (typeof EVENTS)[number]; i: number }) {
  const { setHovered, setPressed } = useHoverTarget();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;

    // Repel effect: if hovered on top-left (x < 0, y < 0), that side goes behind (rotateX is negative, rotateY is positive)
    const maxTilt = 12;
    const rotX = (y / (box.height / 2)) * maxTilt;
    const rotY = -(x / (box.width / 2)) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setIsHovered(true);
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
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="snap-start shrink-0"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-[300px] md:w-[380px] rounded-2xl cursor-pointer"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateY(-8px)`
            : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)`,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.3s ease-out",
        }}
      >
        {/* Backlight Glow */}
        <div
          className="absolute inset-0 rounded-2xl bg-accent/15 opacity-0 transition-opacity duration-300 blur-2xl pointer-events-none"
          style={{
            transform: "translateZ(-20px) scale(0.95)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Main Card (translucent glassmorphism) */}
        <div
          className="w-full rounded-2xl overflow-hidden bg-card/40 backdrop-blur-xl border border-border/50 shadow-md hover:shadow-2xl hover:bg-card/65 transition-all duration-300"
          style={{
            transform: "translateZ(0px)",
            borderColor: isHovered ? "var(--color-accent)" : undefined,
          }}
        >
          <div
            className="relative w-full aspect-[16/9] overflow-hidden bg-muted"
            style={{ transform: "translateZ(20px)" }}
          >
            <img
              src={e.image}
              alt={e.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div className="p-6" style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-display font-extrabold text-2xl text-accent tracking-tight">{e.title}</h3>
            <motion.div
              animate={{ height: isHovered ? "auto" : "120px" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-justify pr-1">
                {e.blurb}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EventsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      const timer = setTimeout(() => {
        const oneSetWidth = container.scrollWidth / 3;
        container.scrollLeft = oneSetWidth;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const oneSetWidth = container.scrollWidth / 3;
    if (oneSetWidth <= 0) return;

    if (container.scrollLeft < 100) {
      // Near start, wrap to middle set (maintaining scroll position offset)
      container.scrollLeft = oneSetWidth + container.scrollLeft;
    } else if (container.scrollLeft > (oneSetWidth * 2) - 100) {
      // Near end, wrap to middle set (maintaining scroll position offset)
      container.scrollLeft = container.scrollLeft - oneSetWidth;
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const displayEvents = [...EVENTS, ...EVENTS, ...EVENTS];

  return (
    <section id="events" className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full flex items-end justify-between mb-12">
        <div>
          <p className="font-mono text-sm mb-3 text-foreground/90">// EVENTS</p>
          <h2 className="font-display font-semibold tracking-tight text-4xl md:text-6xl text-accent">
            events
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-sm transition-all duration-300 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-sm transition-all duration-300 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-none w-full scroll-smooth pt-8 pb-16"
      >
        <div className="flex gap-6 px-6 pb-6 max-w-6xl mx-auto items-start">
          {displayEvents.map((e, i) => (
            <EventCard key={`${e.title}-${i}`} e={e} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}