import { lazy, Suspense, useEffect, useState } from "react";

const DumbbellCanvas = lazy(() => import("./dumbbell/DumbbellCanvas"));

export function ScrollEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduceMotion) {
      elements.forEach((element) => element.dataset["visible"] = "true");
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset["visible"] = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6%" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;
  return <Suspense fallback={null}><DumbbellCanvas /></Suspense>;
}
