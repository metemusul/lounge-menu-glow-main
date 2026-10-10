import { formatPrice } from "@/lib/price";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

/** Slow drifting gold orbs + faint noise, fixed behind everything. */
export function BackgroundDepth() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="noise absolute inset-0" />
    </div>
  );
}

const particles = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.8,
}));

const SPRING = { stiffness: 100, damping: 30, mass: 0.4 };
const HERO_BG =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80";

/** Multi-layer 3D hero: slow background, faster midground, foreground fade. */
export function HeroParallax({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, SPRING);
  const k = reduce ? 0 : 1;
  const bgY = useTransform(p, [0, 1], ["0%", `${30 * k}%`]);
  const bgScale = useTransform(p, [0, 1], [1, 1 + 0.15 * k]);
  const particlesY = useTransform(p, [0, 1], ["0%", `${-40 * k}%`]);
  const fgY = useTransform(p, [0, 1], ["0%", `${-55 * k}%`]);
  const fgScale = useTransform(p, [0, 1], [1, 1 - 0.18 * k]);
  const fgOpacity = useTransform(p, [0, 0.8], [1, reduce ? 1 : 0]);

  return (
    <section ref={ref} className="relative flex min-h-[88svh] flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-12 text-center">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <img src={HERO_BG} alt="" className="h-full w-full object-cover opacity-35" />
        <div className="hero-aura opacity-80" />
      </motion.div>
      <motion.div style={{ y: particlesY }} className="absolute inset-0 will-change-transform" aria-hidden="true">
        {particles.map((pt, i) => (
          <span
            key={i}
            className="gold-particle absolute rounded-full bg-primary"
            style={{ left: `${pt.left}%`, top: `${pt.top}%`, width: pt.size, height: pt.size, animationDelay: `${pt.delay}s` }}
          />
        ))}
      </motion.div>
      <motion.div style={{ y: fgY, scale: fgScale, opacity: fgOpacity }} className="relative z-10 flex flex-col items-center will-change-transform">
        {children}
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-b from-transparent via-background/80 to-background" />
    </section>
  );
}

/** 3D fold reveal: rotateX 45 -> 0 with staggered spring per row. */
export function TiltReveal({ children, index }: { children: ReactNode; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="[perspective:1000px]"
      initial={reduce ? false : { opacity: 0, rotateX: 45, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ type: "spring", ...SPRING, mass: 1, delay: (index % 3) * 0.12 }}
      style={{ transformOrigin: "50% 100%" }}
    >
      {children}
    </motion.div>
  );
}

/** Featured card whose background dolly-zooms 100% -> 115% while text stays put. */
export function SignatureZoom({ name, tagline, image, price, onSelect }: { name: string; tagline: string; image: string; price?: number | undefined; onSelect?: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, SPRING);
  const scale = useTransform(p, [0, 1], [1, reduce ? 1 : 1.15]);
  return (
    <button ref={ref} type="button" onClick={onSelect} className="relative mb-20 block h-[26rem] w-full overflow-hidden rounded-3xl border border-primary/40 text-left shadow-gold-lg sm:mb-28 sm:h-[30rem]">
      <motion.img style={{ scale }} src={image} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover will-change-transform" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary">{tagline}</p>
        <p className="mt-2 font-display text-4xl font-semibold text-foreground sm:text-5xl">{name}</p>
        <span className="mt-4 inline-block rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm font-bold text-gold-light">{formatPrice(price)}</span>
      </div>
    </button>
  );
}

export type SignatureItem = { name: string; tagline: string; image: string; price?: number | undefined };

/** 3D coverflow carousel. */
export function SignatureCarousel({ items }: { items: SignatureItem[] }) {
  const [active, setActive] = useState(1);
  const go = (d: number) => setActive((a) => (a + d + items.length) % items.length);

  return (
    <section aria-label="İmza Seçkisi" className="relative z-10 px-4 pb-14">
      <div className="mb-6 text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold-muted">Signature Selection</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-foreground">İmza Lezzetler</h2>
      </div>
      <motion.div
        className="relative mx-auto h-80 max-w-3xl [perspective:1200px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -40) go(1);
          else if (info.offset.x > 40) go(-1);
        }}
      >
        {items.map((item, i) => {
          let offset = i - active;
          if (offset > items.length / 2) offset -= items.length;
          if (offset < -items.length / 2) offset += items.length;
          const isCenter = offset === 0;
          const abs = Math.abs(offset);
          return (
            <motion.button
              key={item.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={item.name}
              aria-current={isCenter}
              className={`absolute left-1/2 top-0 h-80 w-56 -ml-28 overflow-hidden rounded-2xl border text-left sm:w-64 sm:-ml-32 ${
                isCenter ? "border-primary/60 shadow-gold-lg" : "border-border"
              }`}
              animate={{
                x: `${offset * 62}%`,
                z: -abs * 160,
                rotateY: offset * -28,
                scale: isCenter ? 1.05 : 0.82,
                opacity: abs > 1 ? 0 : 1,
                filter: isCenter ? "brightness(1)" : "brightness(0.45)",
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ zIndex: 10 - abs, transformStyle: "preserve-3d" }}
            >
              <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-primary">{item.tagline}</p>
                <p className="mt-1 font-display text-xl font-semibold text-foreground">{item.name}</p>
                <span className="price-tag mt-3 inline-block rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-bold text-gold-light">{formatPrice(item.price)}</span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
      <div className="mt-6 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            aria-label={`${item.name} göster`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-7 bg-primary" : "w-1.5 bg-muted-foreground/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

/** Premium eased scroll to a section (cubic-bezier-like easeInOutCubic). */
export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const target = el.getBoundingClientRect().top + window.scrollY - 80;
  if (reduce) return window.scrollTo(0, target);
  const start = window.scrollY;
  const dist = target - start;
  const duration = Math.min(1400, 500 + Math.abs(dist) * 0.25);
  const t0 = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, start + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
