import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ContactSection } from "@/components/sections/contact-section";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Route = createFileRoute("/yearbook")({
  head: () => ({
    meta: [
      { title: "Yearbook - Crosslinks NSUT" },
      { name: "description", content: "Download the official Crosslinks NSUT Yearbook." },
    ],
  }),
  component: YearbookPage,
});

function YearbookPage() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    
    // Repel effect (consistent with Event cards)
    const maxTilt = 8;
    const rotX = (y / (box.height / 2)) * maxTilt;
    const rotY = -(x / (box.width / 2)) * maxTilt;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="text-foreground min-h-screen flex flex-col justify-between pt-14 relative z-10"
    >
      <main className="flex-grow flex flex-col items-center">
        {/* Yearbook Mockup Container */}
        <div className="w-full max-w-6xl mx-auto px-6 mt-8 flex flex-col items-center gap-8 md:gap-12">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full rounded-3xl cursor-pointer"
            style={{
              transform: isHovered
                ? `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-4px)`
                : `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)`,
              transformStyle: "preserve-3d",
              transition: isHovered 
                ? "transform 0.1s ease-out" 
                : "transform 0.3s ease-out",
            }}
          >
            {/* Backlight Glow */}
            <div
              className="absolute inset-0 rounded-3xl bg-accent/20 opacity-0 transition-opacity duration-300 blur-3xl pointer-events-none"
              style={{
                transform: "translateZ(-30px) scale(0.97)",
                opacity: isHovered ? 1 : 0,
              }}
            />

            {/* Main Mockup Card */}
            <div 
              className="w-full aspect-[4/3] sm:aspect-[16/9] bg-[url(/img/yearbook_mockup.png)] bg-contain bg-center bg-no-repeat transition-colors duration-300"
              style={{
                minHeight: "60vh",
                transform: "translateZ(0px)",
              }}
            />
          </div>

          {/* Download Button (Outside/Below) */}
          <Button
            asChild
            size="lg"
            className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl px-8 py-6 text-md sm:text-lg font-semibold tracking-wide flex gap-3 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            <a
              href="https://drive.google.com/drive/folders/1i9Im4RPLR7fooLR7skZdMZ-e5DY3dXmZ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-5 w-5" />
              DOWNLOAD YEARBOOK 2025
            </a>
          </Button>
        </div>

        {/* Contact/Reach Out Section */}
        <div className="w-full">
          <ContactSection />
        </div>
      </main>
    </motion.div>
  );
}
