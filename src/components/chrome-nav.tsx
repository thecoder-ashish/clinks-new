import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Moon, Sun, ChevronDown, ArrowUpRight, Lock, Home } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter, useRouterState, Link } from "@tanstack/react-router";
import { SECTIONS, useActiveSection, type SectionId } from "@/lib/active-section";
import { scrollToId } from "@/lib/smooth-scroll";
import { useTheme } from "@/lib/theme";
import { useHoverTarget } from "@/lib/hover-target";
import { JoinUsModal } from "@/components/join-us-modal";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const ALUMNI_URL = "https://drive.google.com/drive/folders/1gfa78hM0S5tYqaCZcpYBY7VYq9QF1dVy";

function HoverWrap({ children, className }: { children: ReactNode; className?: string }) {
  const { setPressed } = useHoverTarget();
  return (
    <div
      className={className}
      onPointerLeave={() => setPressed(false)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
    >
      {children}
    </div>
  );
}

function NavTab({
  id,
  label,
  active,
  hasPill,
  pillVisible,
}: {
  id: SectionId;
  label: string;
  active: boolean;
  hasPill: boolean;
  pillVisible: boolean;
}) {
  const router = useRouter();
  const state = useRouterState();
  const isHome = state.location.pathname === "/";

  const handleClick = () => {
    if (isHome) {
      scrollToId(id);
    } else {
      router.navigate({ to: "/", hash: id });
    }
  };

  return (
    <HoverWrap className="relative">
      <button
        onClick={handleClick}
        className={`relative z-10 px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-200 whitespace-nowrap cursor-pointer ${
          active
            ? "text-accent-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span>{label}</span>
      </button>
      {hasPill && (
        <motion.div
          layoutId="active-nav-pill"
          className="absolute inset-0 rounded-full bg-accent shadow-md z-0"
          initial={false}
          animate={{ opacity: pillVisible ? 1 : 0 }}
          transition={{
            layout: { type: "spring", stiffness: 380, damping: 32 },
            opacity: { duration: 0.2 },
          }}
        />
      )}
    </HoverWrap>
  );
}

function YearbookTab({
  active,
  hasPill,
  pillVisible,
}: {
  active: boolean;
  hasPill: boolean;
  pillVisible: boolean;
}) {
  return (
    <HoverWrap className="relative">
      <Link
        to="/yearbook"
        className={`relative z-10 px-4 py-2 text-sm sm:text-base font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
          active
            ? "text-accent-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <span>Yearbook</span>
      </Link>
      {hasPill && (
        <motion.div
          layoutId="active-nav-pill"
          className="absolute inset-0 rounded-full bg-accent shadow-md z-0"
          initial={false}
          animate={{ opacity: pillVisible ? 1 : 0 }}
          transition={{
            layout: { type: "spring", stiffness: 380, damping: 32 },
            opacity: { duration: 0.2 },
          }}
        />
      )}
    </HoverWrap>
  );
}

function CrosslinksBrand() {
  const router = useRouter();
  const state = useRouterState();
  const isHome = state.location.pathname === "/";

  const handleClick = () => {
    if (isHome) {
      scrollToId("hero");
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <HoverWrap>
      <button
        onClick={handleClick}
        className="text-sm sm:text-xl tracking-wider hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center whitespace-nowrap px-0.5 sm:px-1"
      >
        <span className="font-druk text-foreground font-bold">Cross</span>
        <span className="font-display text-accent font-bold lowercase">links</span>
      </button>
    </HoverWrap>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <HoverWrap>
      <button
        aria-label="Toggle theme"
        onClick={toggle}
        className="h-8 sm:h-9 w-8 sm:w-9 inline-flex items-center justify-center rounded-full hover:bg-accent/15 text-foreground/80 transition-colors cursor-pointer shrink-0"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </HoverWrap>
  );
}

function AlumniCta() {
  return (
    <HoverWrap>
      <a
        href={ALUMNI_URL}
        target="_blank"
        rel="noreferrer"
        className="h-9 px-4 inline-flex items-center rounded-full border border-accent/80 text-accent bg-accent/5 backdrop-blur-sm text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-sm hover:shadow-md whitespace-nowrap"
      >
        Alumni Meet '25
      </a>
    </HoverWrap>
  );
}

export function ChromeNav() {
  const { activeId } = useActiveSection();
  const [mobile, setMobile] = useState(false);
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";
  const isYearbook = routerState.location.pathname === "/yearbook";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 800px)");
    const u = () => setMobile(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);

  const activePillKey = isYearbook
    ? "yearbook"
    : isHome && activeId !== "hero"
      ? activeId
      : "about";
  const pillVisible = isYearbook || (isHome && activeId !== "hero");

  return (
    <header className="fixed top-2.5 sm:top-5 inset-x-0 z-40 px-2.5 sm:px-6 pointer-events-none flex justify-center">
      <div className="pointer-events-auto max-w-5xl w-full mx-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/20 bg-card/85 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.25)] flex items-center justify-between gap-1.5 sm:gap-4 flex-nowrap transition-all duration-300">
        {mobile ? (
          <MobileNav activeId={activeId} />
        ) : (
          <LayoutGroup id="header-nav-pill">
            {/* Left: Brand Logo */}
            <div className="flex items-center shrink-0">
              <CrosslinksBrand />
            </div>

            {/* Center: Clean Navigation Tabs with Smooth Horizontal Slider Pill */}
            <div className="flex items-center gap-1">
              {SECTIONS.map((s) => (
                <NavTab
                  key={s.id}
                  id={s.id}
                  label={s.label}
                  active={isHome && activeId === s.id}
                  hasPill={activePillKey === s.id}
                  pillVisible={pillVisible}
                />
              ))}
              <YearbookTab
                active={isYearbook}
                hasPill={activePillKey === "yearbook"}
                pillVisible={pillVisible}
              />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <JoinUsModal />
              <AlumniCta />
              <ThemeToggle />
            </div>
          </LayoutGroup>
        )}
      </div>
    </header>
  );
}

function MobileNav({ activeId }: { activeId: SectionId }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const state = useRouterState();
  const isHome = state.location.pathname === "/";
  const isYearbook = state.location.pathname === "/yearbook";

  const isAtTop = isHome && activeId === "hero";

  const urlSection = isYearbook
    ? "yearbook"
    : activeId === "hero"
      ? "home"
      : activeId;

  const handleNav = (id: string) => {
    if (isHome) {
      scrollToId(id);
    } else {
      router.navigate({ to: "/", hash: id });
    }
    setOpen(false);
  };

  const handleGoHome = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isHome) {
      scrollToId("hero");
    } else {
      router.navigate({ to: "/" });
    }
  };

  return (
    <div className="flex items-center justify-between w-full min-w-0 gap-1.5 flex-nowrap">
      <AnimatePresence mode="wait">
        {isAtTop ? (
          <motion.div
            key="hero-brand"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center shrink-0"
          >
            <CrosslinksBrand />
          </motion.div>
        ) : (
          <motion.div
            key="scrolled-bar"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-0 flex items-center justify-start pr-1"
          >
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="h-8 w-full max-w-[210px] px-3 inline-flex items-center justify-between gap-1.5 rounded-full border border-accent/35 bg-muted/70 hover:bg-muted/95 text-foreground shadow-sm cursor-pointer whitespace-nowrap min-w-0 transition-colors">
                  <span
                    onClick={handleGoHome}
                    title="Go to top"
                    className="p-0.5 rounded-full hover:bg-accent/20 transition-colors flex items-center justify-center shrink-0"
                  >
                    <Home className="h-3.5 w-3.5 text-accent shrink-0" />
                  </span>
                  <span className="truncate text-xs font-mono text-foreground/90 tracking-tight">
                    crosslinks/{urlSection}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-accent shrink-0 ml-0.5" />
                </button>
              </SheetTrigger>
              <SheetContent side="top" className="pt-10 bg-background/95 backdrop-blur-xl border-b border-border/60">
                <SheetHeader>
                  <SheetTitle className="text-2xl tracking-wider">
                    <span className="font-druk text-foreground font-bold">Cross</span>
                    <span className="font-display text-accent font-bold lowercase">links</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  <button
                    className="text-left px-4 py-3 rounded-lg hover:bg-muted/60 font-medium text-foreground transition-colors"
                    onClick={() => {
                      if (isHome) {
                        scrollToId("hero");
                      } else {
                        router.navigate({ to: "/" });
                      }
                      setOpen(false);
                    }}
                  >
                    Home
                  </button>
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      className="text-left px-4 py-3 rounded-lg hover:bg-muted/60 font-medium text-foreground transition-colors"
                      onClick={() => handleNav(s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
                  <Link
                    to="/yearbook"
                    className="text-left px-4 py-3 rounded-lg hover:bg-muted/60 font-medium text-foreground transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Yearbook
                  </Link>
                  <div className="mt-3 flex flex-col gap-2">
                    <JoinUsModal triggerClass="w-full py-2.5 rounded-lg bg-accent text-accent-foreground text-center font-semibold text-sm shadow-md hover:opacity-95 transition-opacity inline-flex items-center justify-center gap-1.5 cursor-pointer" />
                    <a
                      href={ALUMNI_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 rounded-lg border border-accent/80 text-accent text-center font-medium text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      Alumni Meet '25
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right: Theme Toggle */}
      <div className="shrink-0 flex items-center">
        <ThemeToggle />
      </div>
    </div>
  );
}