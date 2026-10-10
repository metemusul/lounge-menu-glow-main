import { AnimatePresence, motion } from "framer-motion";
import { Dices, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const trending = [
  { emoji: "🔥", label: "Şu an masalarda en çok tercih edilen:", value: "San Sebastian Cheesecake" },
  { emoji: "🧊", label: "Sıcak havaya en iyi giden:", value: "Rainbow Mojito" },
  { emoji: "⭐", label: "Şefin İmza Tabağı:", value: "Köri Soslu Tavuk" },
];

/** Thin infinite right-to-left marquee. Content is duplicated for a seamless loop. */
export function TrendingMarquee() {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="marquee-track flex shrink-0 items-center">
      {trending.map((t) => (
        <span key={t.value} className="flex items-center gap-2 whitespace-nowrap px-6 text-xs text-foreground/90 sm:text-sm">
          <span className="text-base drop-shadow-[0_0_6px_var(--color-primary)]">{t.emoji}</span>
          <span className="text-muted-foreground">{t.label}</span>
          <span className="font-semibold text-gold-light">{t.value}</span>
          <span className="pl-6 text-primary">•</span>
        </span>
      ))}
    </div>
  );
  return (
    <div role="marquee" aria-label="Öne çıkanlar" className="relative z-10 mb-10 flex overflow-hidden border-y border-primary/30 bg-card/60 py-2.5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      {row(false)}
      {row(true)}
    </div>
  );
}

const combos = [
  "San Sebastian Cheesecake & Filtre Kahve",
  "Köri Soslu Tavuk & Naneli Limonata",
  "Sufle & Türk Kahvesi",
  "Penne Arrabbiata & Coca-Cola",
  "Crispy Party & Rainbow Mojito",
];

/** Floating "Ne Yesem?" button + slot-machine suggestion dialog. */
export function MagicSuggestion() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = () => { timers.current.forEach((t) => clearTimeout(t)); timers.current = []; };

  const spin = () => {
    clear();
    setSpinning(true);
    const final = Math.floor(Math.random() * combos.length);
    let elapsed = 0;
    let delay = 60;
    let i = index;
    const tick = () => {
      i = (i + 1) % combos.length;
      setIndex(i);
      elapsed += delay;
      if (elapsed >= 1500 - delay) {
        timers.current.push(window.setTimeout(() => { setIndex(final); setSpinning(false); }, delay));
        return;
      }
      delay = Math.min(220, delay * 1.12);
      timers.current.push(window.setTimeout(tick, delay));
    };
    timers.current.push(window.setTimeout(tick, delay));
  };

  useEffect(() => clear, []);

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); spin(); }}
        className="magic-fab fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-primary/60 bg-background/70 px-5 py-3 text-sm font-semibold text-gold-light backdrop-blur-xl transition-transform active:scale-95"
      >
        <Dices aria-hidden="true" className="size-4 text-primary" />
        Ne Yesem?
      </button>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) clear(); }}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-3xl border-primary/40 bg-card/80 p-7 text-center shadow-gold-lg backdrop-blur-2xl">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <Sparkles aria-hidden="true" className="size-5 text-primary" />
          </div>
          <DialogTitle className="mt-3 font-display text-2xl font-semibold text-foreground">Bugün Senin İçin</DialogTitle>
          <DialogDescription className="text-xs uppercase tracking-[0.25em] text-gold-muted">
            {spinning ? "Seçiliyor..." : "Şefin önerisi"}
          </DialogDescription>

          <div className="relative mt-5 h-24 overflow-hidden rounded-2xl border border-border bg-background/70 [mask-image:linear-gradient(transparent,black_25%,black_75%,transparent)]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.p
                key={`${index}-${spinning}`}
                initial={{ y: -60, opacity: 0, filter: spinning ? "blur(3px)" : "blur(0px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: spinning ? 1 : [1.08, 1] }}
                exit={{ y: 60, opacity: 0 }}
                transition={spinning ? { duration: 0.08, ease: "linear" } : { type: "spring", stiffness: 260, damping: 18 }}
                aria-live="polite"
                className="absolute inset-0 flex items-center justify-center px-4 font-display text-lg font-semibold text-gold-light"
              >
                {combos[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            type="button"
            disabled={spinning}
            onClick={() => setOpen(false)}
            className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground shadow-gold transition-opacity disabled:opacity-40"
          >
            Bunu Deneyeceğim!
          </button>
          <button type="button" disabled={spinning} onClick={spin} className="mt-3 text-xs text-muted-foreground underline-offset-4 hover:text-gold-light hover:underline disabled:opacity-40">
            Tekrar çevir
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
