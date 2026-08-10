import { motion } from "framer-motion";

export function GallerySection() {
  const row1 = [
    "/img/gallery/gallery1.jpg",
    "/img/gallery/gallery2.jpg",
    "/img/gallery/gallery3.jpg",
    "/img/gallery/gallery4.jpg",
    "/img/gallery/gallery5.JPG",
  ];

  const row2 = [
    "/img/gallery/gallery5.JPG",
    "/img/gallery/gallery6.jpg",
    "/img/gallery/gallery7.jpg",
    "/img/gallery/gallery8.JPG",
    "/img/gallery/gallery9.jpg",
  ];

  // Duplicate the arrays for seamless looping marquee
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section id="gallery" className="min-h-[92vh] sm:min-h-screen flex flex-col justify-center scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-24 overflow-hidden gap-8 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full mb-2">
        <p className="font-mono text-xs sm:text-sm mb-2 text-foreground/90">// GALLERY</p>
        <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl md:text-5xl text-accent">
          Captured Moments
        </h2>
      </div>

      <div className="relative w-full overflow-x-hidden marquee-container flex flex-col gap-2 sm:gap-3">
        {/* Inject CSS animation locally for robust cross-browser continuous marquee */}
        <style>{`
          @keyframes marqueeLeft {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marqueeLeft 45s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marqueeRight 45s linear infinite;
          }
          .marquee-container:hover .animate-marquee-left,
          .marquee-container:hover .animate-marquee-right {
            animation-play-state: paused;
          }
        `}</style>

        {/* First Row - Scrolls Left */}
        <div className="animate-marquee-left flex gap-4 sm:gap-6 px-2 py-2">
          {marqueeRow1.map((src, idx) => (
            <div
              key={`row1-${idx}`}
              className="relative group flex-shrink-0 w-60 sm:w-72 md:w-80 aspect-[4/3]"
            >
              {/* Backlight Glow */}
              <div
                className="absolute inset-0 rounded-2xl bg-accent/25 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-2xl scale-95 group-hover:scale-105 pointer-events-none"
              />
              {/* Main Image Container */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-accent"
              >
                <img
                  src={src}
                  alt={`Gallery photo row 1 - ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Scrolls Right */}
        <div className="animate-marquee-right flex gap-4 sm:gap-6 px-2 py-2">
          {marqueeRow2.map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className="relative group flex-shrink-0 w-60 sm:w-72 md:w-80 aspect-[4/3]"
            >
              {/* Backlight Glow */}
              <div
                className="absolute inset-0 rounded-2xl bg-accent/25 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-2xl scale-95 group-hover:scale-105 pointer-events-none"
              />
              {/* Main Image Container */}
              <div
                className="w-full h-full rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-accent"
              >
                <img
                  src={src}
                  alt={`Gallery photo row 2 - ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
