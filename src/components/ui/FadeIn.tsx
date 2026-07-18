import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
};

/** Fades and slides its children up when they scroll into view. */
export function FadeIn({ children, delay = 0, style = {} }: FadeInProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // threshold must stay 0: it's a fraction of the *element*, so any element
    // taller than ~10x the viewport can never reach a non-zero threshold and
    // would stay invisible forever. The negative bottom rootMargin keeps the
    // "slightly into view" trigger, measured against the viewport instead.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
