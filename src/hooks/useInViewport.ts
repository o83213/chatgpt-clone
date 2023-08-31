"use client";
import { RefObject, useEffect, useState, useRef, useMemo } from "react";

export function useInViewport(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useMemo(
    () =>
      typeof window !== "undefined" &&
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    observer && observer.observe(ref.current!);

    return () => {
      observer && observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
