import { motion } from "framer-motion";

export function GallerySection() {
  const row1 = [
    "/img/gallery1.jpg",
    "/img/gallery2.jpg",
    "/img/gallery3.jpg",
    "/img/gallery4.jpg",
    "/img/gallery5.jpg",
  ];

  const row2 = [
    "/img/gallery5.jpg",
    "/img/gallery6.jpg",
    "/img/gallery7.jpg",
    "/img/gallery8.jpg",
    "/img/gallery9.jpg",
  ];

  // Duplicate the arrays for seamless looping marquee
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section id="gallery" className="py-32 overflow-hidden flex flex-col justify-center gap-8">
      <div className="max-w-6xl mx-auto px-6 w-full mb-4">
        <p className="text-accent font-mono text-sm mb-3">// gallery</p>
        <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-accent">
          GALLERY
        </h2>
      </div>

      <div className="relative w-full overflow-x-hidden marquee-container flex flex-col gap-6">
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
        <div className="animate-marquee-left flex gap-6 px-4 py-4">
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
        <div className="animate-marquee-right flex gap-6 px-4 py-4">
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
