import { useState } from "react";
import { motion } from "framer-motion";
import { useHoverTarget } from "@/lib/hover-target";

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
}: {
  name: string;
  role: string;
  image: string;
  quote: string;
  i: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { setHovered, setPressed } = useHoverTarget();

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    
    // Repel effect: if hovered on top-left (x < 0, y < 0), that side goes behind (rotateX is negative, rotateY is positive)
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
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onPointerLeave={handleMouseLeave}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onMouseMove={handleMouseMove}
        className={`absolute top-0 inset-x-0 rounded-2xl cursor-pointer ${
          isHovered ? "z-20" : "z-10"
        }`}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.05)`
            : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`,
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

        {/* Main Card Content Container */}
        <div
          className={`p-6 rounded-2xl shadow-sm flex flex-col justify-between transition-all duration-300 ${
            i % 2 === 0 
              ? "bg-card/45 backdrop-blur-md border border-border/50" 
              : "bg-card border border-border"
          }`}
          style={{
            transform: "translateZ(0px)",
            borderColor: isHovered ? "var(--color-accent)" : undefined,
            boxShadow: isHovered ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" : "none",
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
              animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
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

export function TeamSection() {
  return (
    <section id="team" className="min-h-screen py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-mono text-sm mb-3">// team</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-accent">
            WORDS FROM CORE
          </h2>
        </motion.div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-start">
          {MEMBERS.map((m, i) => (
            <MemberCard key={m.name} {...m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}