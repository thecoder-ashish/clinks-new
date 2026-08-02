import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm mb-3 text-foreground/90">// about us</p>
          <h2 className="font-display font-semibold text-4xl md:text-6xl tracking-tight text-accent">
            ABOUT US
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-justify">
            Crosslinks is the Student & Public Relations Society of NSUT. It is one of the most
            well-known societies of our college. It brings to you everything there is to know about
            NSUT and puts our institution on a national platform. Whether it's about connecting
            students and authorities together, promoting the college, or organizing numerous events
            and fests throughout the year, Crosslinks does it all.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden border-2 border-accent/30 shadow-lg group hover:border-accent transition-colors duration-300"
        >
          <img
            src="/img/CROSSLINKS.jpg"
            alt="Crosslinks team group photo"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}