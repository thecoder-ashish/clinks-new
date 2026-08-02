import { createContext, useContext, useState, type ReactNode } from "react";

interface HoverTargetContext {
  hovered: boolean;
  pressed: boolean;
  hoverText: string | null;
  setHovered: (v: boolean | string) => void;
  setPressed: (v: boolean) => void;
}

const Ctx = createContext<HoverTargetContext>({
  hovered: false,
  pressed: false,
  hoverText: null,
  setHovered: () => {},
  setPressed: () => {},
});

export function HoverTargetProvider({ children }: { children: ReactNode }) {
  const [hovered, setHoveredState] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const setHovered = (val: boolean | string) => {
    if (typeof val === "string") {
      setHoveredState(true);
      setHoverText(val);
    } else {
      setHoveredState(val);
      if (!val) setHoverText(null);
    }
  };

  return (
    <Ctx.Provider value={{ hovered, pressed, hoverText, setHovered, setPressed }}>
      {children}
    </Ctx.Provider>
  );
}

export const useHoverTarget = () => useContext(Ctx);