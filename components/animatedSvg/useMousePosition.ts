import { useState, useEffect } from "react";

type MousePosition = {
    x: number | null,
    y: number | null
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x:null, y: null });

  const updateMousePosition = (ev: MouseEvent): void => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export default useMousePosition;