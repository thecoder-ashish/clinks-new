import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TeamSection } from "@/components/sections/team-section";
import { EventsSection } from "@/components/sections/events-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { ContactSection } from "@/components/sections/contact-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crosslinks NSUT — The student community at NSUT" },
      { name: "description", content: "Crosslinks is NSUT's Student & Public Relations Society. Connecting students, authorities, and alumni." },
      { property: "og:title", content: "Crosslinks NSUT" },
      { property: "og:description", content: "The Student & Public Relations Society of NSUT." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="text-foreground relative z-10"
    >
      <main>
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <GallerySection />
        <TeamSection />
        <ContactSection />
      </main>
    </motion.div>
  );
}
