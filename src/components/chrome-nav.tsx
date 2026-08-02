import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Lock, Moon, Sun, ChevronDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter, useRouterState, Link } from "@tanstack/react-router";
import { SECTIONS, useActiveSection, type SectionId } from "@/lib/active-section";
import { scrollToId } from "@/lib/smooth-scroll";
import { useTheme } from "@/lib/theme";
import { useHoverTarget } from "@/lib/hover-target";
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
      onPointerLeave={() => {
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
    >
      {children}
    </div>
  );
}

function Tab({ id, label, active }: { id: SectionId; label: string; active: boolean }) {
  const router = useRouter();
  const state = useRouterState();
  const [isHovered, setIsHovered] = useState(false);
  const isHome = state.location.pathname === "/";

  const handleClick = () => {
    if (isHome) {
      scrollToId(id);
    } else {
      router.navigate({ to: "/", hash: id });
    }
  };

  return (
    <HoverWrap className="relative h-9 flex items-end">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative z-10 px-4 h-9 inline-flex items-center text-sm font-medium rounded-t-xl transition-all duration-200 whitespace-nowrap cursor-pointer ${
          active
            ? "text-accent-foreground font-semibold"
            : "text-tab-inactive-fg hover:text-foreground hover:bg-muted/40"
        }`}
      >
        <span className="relative inline-flex items-center">
          {label}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5, x: 2, y: -2 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 2, y: -2 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-1 -right-3.5 text-accent"
              >
                <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
      {active && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-x-0 bottom-0 top-0 rounded-t-xl bg-accent shadow-md"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
    </HoverWrap>
  );
}

function YearbookTab() {
  const state = useRouterState();
  const active = state.location.pathname === "/yearbook";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverWrap className="relative h-9 flex items-end">
      <Link
        to="/yearbook"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative z-10 px-4 h-9 inline-flex items-center text-sm font-medium rounded-t-xl transition-all duration-200 whitespace-nowrap ${
          active
            ? "text-accent-foreground font-semibold"
            : "text-tab-inactive-fg hover:text-foreground hover:bg-muted/40"
        }`}
      >
        <span className="relative inline-flex items-center">
          Yearbook
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5, x: 2, y: -2 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 2, y: -2 }}
                transition={{ duration: 0.15 }}
                className="absolute -top-1 -right-3.5 text-accent"
              >
                <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </Link>
      {active && (
        <motion.div
          layoutId="active-tab"
          className="absolute inset-x-0 bottom-0 top-0 rounded-t-xl bg-accent shadow-md"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
    </HoverWrap>
  );
}

function CrosslinksBrand({ isHero, path }: { isHero: boolean; path: string }) {
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
    <div className="flex items-end justify-center min-w-[260px] h-9">
      <AnimatePresence mode="wait" initial={false}>
        {isHero ? (
          <HoverWrap key="tab" className="h-9 flex items-end">
            <motion.button
              layoutId="crosslinks-brand"
              onClick={handleClick}
              className="relative h-9 px-6 inline-flex items-center gap-2 rounded-t-xl bg-accent text-accent-foreground font-display font-bold text-base shadow-md cursor-pointer whitespace-nowrap tracking-wide"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <span>Crosslinks</span>
            </motion.button>
          </HoverWrap>
        ) : (
          <HoverWrap key="pill" className="h-8 flex items-center">
            <motion.button
              layoutId="crosslinks-brand"
              onClick={handleClick}
              className="h-8 px-4 inline-flex items-center gap-2 rounded-full bg-address-bg/80 backdrop-blur-md border border-border/70 text-foreground/90 text-xs font-mono cursor-pointer whitespace-nowrap hover:border-accent/60 hover:bg-address-bg transition-all duration-300 shadow-sm"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Lock className="h-3 w-3 shrink-0 text-accent" />
              <motion.span
                key={path}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="whitespace-nowrap"
              >
                crosslinks.nsut/{path}
              </motion.span>
            </motion.button>
          </HoverWrap>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <HoverWrap>
      <button
        aria-label="Toggle theme"
        onClick={toggle}
        className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-muted text-foreground/80 transition-colors cursor-pointer"
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
        className="h-9 px-4 inline-flex items-center rounded-full border border-accent/80 text-accent bg-accent/5 backdrop-blur-sm text-sm font-medium transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent shadow-sm hover:shadow-md whitespace-nowrap"
      >
        Alumni Meet '25
      </a>
    </HoverWrap>
  );
}

export function ChromeNav() {
  const { activeId, isHero } = useActiveSection();
  const [mobile, setMobile] = useState(false);
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";

  const isBrandTabMode = isHome && isHero;

  const path = routerState.location.pathname === "/yearbook"
    ? "yearbook"
    : isHero
      ? ""
      : activeId;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const u = () => setMobile(mq.matches);
    u();
    mq.addEventListener("change", u);
    return () => mq.removeEventListener("change", u);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-frame/80 backdrop-blur-xl border-b border-border/50 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-end gap-3">
        {mobile ? (
          <MobileNav activeId={activeId} />
        ) : (
          <LayoutGroup>
            <div className="flex items-end gap-1 flex-1 pb-0 h-14">
              {SECTIONS.map((s) => (
                <Tab key={s.id} id={s.id} label={s.label} active={isHome && activeId === s.id} />
              ))}
              <YearbookTab />
            </div>
            <div className={`flex items-end justify-center h-14 w-[260px] flex-shrink-0 transition-all duration-300 ${isBrandTabMode ? "pb-0" : "pb-3"}`}>
              <CrosslinksBrand isHero={isBrandTabMode} path={path} />
            </div>
            <div className="flex items-end gap-2 flex-1 justify-end pb-[10px] h-14">
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

  const current = isYearbook
    ? "Yearbook"
    : activeId === "hero"
      ? "Crosslinks"
      : SECTIONS.find((s) => s.id === activeId)?.label ?? "";

  const handleNav = (id: string) => {
    if (isHome) {
      scrollToId(id);
    } else {
      router.navigate({ to: "/", hash: id });
    }
    setOpen(false);
  };

  return (
    <div className="flex items-end justify-between w-full h-14 pb-0">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="h-9 px-4 inline-flex items-center gap-2 rounded-t-xl bg-accent text-accent-foreground text-sm font-medium shadow-sm cursor-pointer whitespace-nowrap">
            {current}
            <ChevronDown className="h-4 w-4" />
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="pt-10 bg-background/95 backdrop-blur-xl border-b border-border/60">
          <SheetHeader>
            <SheetTitle className="font-display text-accent text-2xl">Crosslinks</SheetTitle>
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
            <a
              href={ALUMNI_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 px-4 py-3 rounded-lg bg-accent text-accent-foreground text-center font-medium shadow-sm"
            >
              Alumni Meet '25
            </a>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center justify-end pb-2">
        <ThemeToggle />
      </div>
    </div>
  );
}