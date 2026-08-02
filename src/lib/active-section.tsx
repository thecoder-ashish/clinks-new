import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { scrollToId } from "./smooth-scroll";

export const SECTIONS = [
  { id: "about", label: "About Us" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"] | "hero";

const Ctx = createContext<{ activeId: SectionId; isHero: boolean }>({
  activeId: "hero",
  isHero: true,
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<SectionId>("hero");
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  useEffect(() => {
    if (pathname !== "/") {
      setActiveId("hero");
      return;
    }

    const ids: SectionId[] = ["hero", "about", "events", "gallery", "team", "contact"];
    let cleanup = () => {};

    // Wait slightly to ensure elements are fully mounted in the DOM
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        if (window.location.hash && window.location.hash !== "#about") {
          const hashId = window.location.hash.substring(1);
          scrollToId(hashId);
        } else {
          // Explicitly scroll to top of home page and clear hash on initial load
          window.scrollTo({ top: 0, left: 0 });
          if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }
      }

      const els = ids
        .map((id) => document.getElementById(id))
        .filter((e): e is HTMLElement => !!e);
      if (!els.length) return;

      const visible = new Map<string, number>();
      const obs = new IntersectionObserver(
        (entries) => {
          if (typeof window !== "undefined" && window.scrollY < 120) {
            setActiveId("hero");
            return;
          }

          for (const e of entries) {
            visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
          }
          let topId: SectionId = "hero";
          let topRatio = 0;
          for (const [id, r] of visible) {
            if (r > topRatio) {
              topRatio = r;
              topId = id as SectionId;
            }
          }
          if (topRatio > 0) setActiveId(topId);
        },
        { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
      );
      els.forEach((el) => obs.observe(el));
      cleanup = () => obs.disconnect();
    }, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [pathname]);

  return <Ctx.Provider value={{ activeId, isHero: activeId === "hero" }}>{children}</Ctx.Provider>;
}

export const useActiveSection = () => useContext(Ctx);