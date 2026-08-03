import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, Facebook, Phone, MapPin, Copy, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useHoverTarget } from "@/lib/hover-target";
import { toast } from "sonner";

const SOCIALS = [
  { Icon: Instagram, href: "https://www.instagram.com/crosslinks.nsut/", label: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/crosslinks-nsut/", label: "LinkedIn" },
  { Icon: Facebook, href: "https://www.facebook.com/crosslinks.nsut/", label: "Facebook" },
];

function Fab({ Icon, href, label }: (typeof SOCIALS)[number]) {
  const { setHovered, setPressed } = useHoverTarget();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onPointerEnter={() => setHovered("SOCIAL")}
      onPointerLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      className="h-14 w-14 inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-accent/95 cursor-pointer"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { setHovered } = useHoverTarget();
  const email = "crosslinks.nsut@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full my-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm mb-3 text-foreground/90">// CONTACT</p>
            <h2 className="font-display font-semibold tracking-tight text-4xl md:text-6xl text-accent mb-8">
              reach out to us
            </h2>

            <div className="flex flex-col gap-6 font-sans text-lg text-muted-foreground">
              <div className="flex items-center gap-4 group">
                <Mail className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="select-all">{email}</span>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-accent flex-shrink-0" />
                <a href="tel:+918888604009" className="hover:text-accent transition-colors">
                  +91 8888604009
                </a>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-accent flex-shrink-0" />
                <span>Sector 3, Dwarka, Delhi, 110078</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-6 md:justify-end flex-wrap"
          >
            {SOCIALS.map((s) => (
              <Fab key={s.label} {...s} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full mt-24 pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <span className="text-center sm:text-left">
          Copyright ©2026 Crosslinks NSUT - All Rights reserved • Privacy policy
        </span>
        <span className="font-mono text-accent flex items-center">
          Developed by&nbsp;
          <a
            href="https://www.linkedin.com/in/ashish-kumar-103587378?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"

            onPointerEnter={() => setHovered("ASHISH_KUMAR")}
            onPointerLeave={() => setHovered(false)}
            className="inline-flex items-center gap-0.5 text-accent hover:text-white font-semibold transition-colors group cursor-pointer"
          >
            Ashish Kumar
            <ArrowUpRight className="h-3.5 w-3.5 text-accent group-hover:text-white transition-colors shrink-0" />
          </a>
        </span>
      </div>
    </section>
  );
}