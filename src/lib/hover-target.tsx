import { createContext, useContext, useState, type ReactNode } from "react";

const Ctx = createContext<{
  hovered: boolean;
  pressed: boolean;
  setHovered: (v: boolean) => void;
  setPressed: (v: boolean) => void;
}>({
  hovered: false,
  pressed: false,
  setHovered: () => {},
  setPressed: () => {},
});

export function HoverTargetProvider({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <Ctx.Provider value={{ hovered, pressed, setHovered, setPressed }}>{children}</Ctx.Provider>
  );
}

export const useHoverTarget = () => useContext(Ctx);