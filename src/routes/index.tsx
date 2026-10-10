import { createFileRoute } from "@tanstack/react-router";
import {
  Bean,
  CakeSlice,
  Cherry,
  ChevronDown,
  Citrus,
  Coffee,
  CookingPot,
  CupSoda,
  Leaf,
  MapPin,
  Martini,
  Milk,
  Popcorn,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { BackgroundDepth, HeroParallax, SignatureCarousel, SignatureZoom, TiltReveal, smoothScrollTo } from "@/components/menu/effects";
import logoAsset from "@/assets/protokol-lounge-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { MagicSuggestion, TrendingMarquee } from "@/components/menu/engagement";
import { formatPrice } from "@/lib/price";
import { ItemBottomSheet } from "@/components/menu/item-bottom-sheet";

type MenuItem = {
  name: string;
  detail?: string;
  price?: number;
  image: string;
  imageAlt: string;
};

type MenuCategory = {
  id: string;
  icon: LucideIcon;
  shortName: string;
  name: string;
  eyebrow: string;
  items: MenuItem[];
};


const menu: MenuCategory[] = [
  {
    id: "kahvalti",
    icon: CookingPot,
    shortName: "Kahvaltı",
    name: "Kahvaltı",
    eyebrow: "Güne zarif bir başlangıç",
    items: [
      { name: "Menemen", detail: "Kaşarlı · Kavurmalı", price: 180, image: "/images/menemen.jpg", imageAlt: "Menemen sunumu" },
      { name: "Kaşarlı Tost", price: 220, image: "/images/kasarli-tost.jpg", imageAlt: "Kaşarlı Tost sunumu" },
      { name: "Karışık Tost", price: 280, image: "/images/karisik-tost.jpg", imageAlt: "Karışık Tost sunumu" },
      { name: "Gözleme", detail: "Peynirli · Patatesli", price: 210, image: "/images/gozleme.jpg", imageAlt: "Gözleme sunumu" },
    ],
  },
  {
    id: "ana-yemekler",
    icon: UtensilsCrossed,
    shortName: "Ana Yemekler",
    name: "Ana Yemekler",
    eyebrow: "Mutfağın imza tabakları",
    items: [
      { name: "Köri Soslu Tavuk", price: 300, image: "/images/kori-soslu-tavuk.jpg", imageAlt: "Köri Soslu Tavuk sunumu" },
      { name: "Soya Soslu Tavuk", price: 300, image: "/images/soya-soslu-tavuk.jpg", imageAlt: "Soya Soslu Tavuk sunumu" },
      { name: "Barbekü Soslu Tavuk", price: 300, image: "/images/barbeku-soslu-tavuk.jpg", imageAlt: "Barbekü Soslu Tavuk sunumu" },
      { name: "Penne Alfredo", price: 240, image: "/images/penne-alfredo.jpg", imageAlt: "Penne Alfredo sunumu" },
      { name: "Penne Arrabbiata", price: 240, image: "/images/penne-arrabbiata.jpg", imageAlt: "Penne Arrabbiata sunumu" },
      { name: "Fettuccine Alfredo", price: 280, image: "/images/fettuccine-alfredo.jpg", imageAlt: "Fettuccine Alfredo sunumu" },
      { name: "Köri Soslu Penne", price: 280, image: "/images/kori-soslu-penne.jpg", imageAlt: "Köri Soslu Penne sunumu" },
    ],
  },
  {
    id: "atistirmaliklar",
    icon: Popcorn,
    shortName: "Atıştırmalık",
    name: "Atıştırmalıklar",
    eyebrow: "Sohbete eşlik eden lezzetler",
    items: [
      { name: "Patates Tava", image: "/images/patates-tava.jpg", imageAlt: "Patates Tava sunumu" },
      { name: "Sosis & Patates", image: "/images/sosis-patates.jpg", imageAlt: "Sosis & Patates sunumu" },
      { name: "Crispy Party", image: "/images/crispy-party.jpg", imageAlt: "Crispy Party sunumu" },
      { name: "Sigara Böreği", image: "/images/sigara-boregi.jpg", imageAlt: "Sigara Böreği sunumu" },
    ],
  },
  {
    id: "tatlilar",
    icon: CakeSlice,
    shortName: "Tatlılar",
    name: "Tatlılar",
    eyebrow: "Gecenin tatlı finali",
    items: [
      { name: "Sufle", price: 240, image: "/images/sufle.jpg", imageAlt: "Sufle sunumu" },
      { name: "Fıstık Rüyası", price: 220, image: "/images/fistik-ruyasi.jpg", imageAlt: "Fıstık Rüyası sunumu" },
      { name: "San Sebastian", price: 220, image: "/images/san-sebastian.jpg", imageAlt: "San Sebastian sunumu" },
      { name: "Limonlu Cheesecake", price: 220, image: "/images/limonlu-cheesecake.jpg", imageAlt: "Limonlu Cheesecake sunumu" },
      { name: "Frambuazlı Cheesecake", price: 220, image: "/images/frambuazli-cheesecake.jpg", imageAlt: "Frambuazlı Cheesecake sunumu" },
      { name: "Brownie", price: 270, image: "/images/brownie.jpg", imageAlt: "Brownie sunumu" },
      { name: "Tiramisu", price: 220, image: "/images/tiramisu.jpg", imageAlt: "Tiramisu sunumu" },
      { name: "Cup Tatlı", image: "/images/cup-tatli.jpg", imageAlt: "Cup Tatlı sunumu" },
    ],
  },
  {
    id: "soguk-icecekler",
    icon: CupSoda,
    shortName: "Soğuk İçecekler",
    name: "Soğuk İçecekler",
    eyebrow: "Serin ve ferah",
    items: [
      { name: "Kola", price: 100, image: "/images/kola.jpg", imageAlt: "Kola sunumu" },
      { name: "Fuse Tea", price: 100, image: "/images/fuse-tea.jpg", imageAlt: "Fuse Tea sunumu" },
      { name: "Churchill", price: 90, image: "/images/churchill.jpg", imageAlt: "Churchill sunumu" },
      { name: "Ayran", price: 70, image: "/images/ayran.jpg", imageAlt: "Ayran sunumu" },
      { name: "Meyveli Soda", price: 60, image: "/images/meyveli-soda.jpg", imageAlt: "Meyveli Soda sunumu" },
      { name: "Soda", price: 50, image: "/images/soda.jpg", imageAlt: "Soda sunumu" },
      { name: "Su", price: 40, image: "/images/su.jpg", imageAlt: "Su sunumu" },
      { name: "Red Bull", price: 130, image: "/images/red-bull.jpg", imageAlt: "Red Bull sunumu" },
      { name: "Meyfit Solo", image: "/images/meyfit-solo.jpg", imageAlt: "Meyfit Solo sunumu" },
      { name: "Cappy", image: "/images/cappy.jpg", imageAlt: "Cappy sunumu" },
    ],
  },
  {
    id: "frozen",
    icon: Cherry,
    shortName: "Frozen",
    name: "Frozen",
    eyebrow: "Meyvenin buz gibi hali",
    items: [
      { name: "Çilek", price: 180, image: "/images/frozen-cilek.jpg", imageAlt: "Çilek sunumu" },
      { name: "Mango", price: 180, image: "/images/frozen-mango.jpg", imageAlt: "Mango sunumu" },
      { name: "Kavun", price: 180, image: "/images/frozen-kavun.jpg", imageAlt: "Kavun sunumu" },
      { name: "Karpuz", price: 180, image: "/images/frozen-karpuz.jpg", imageAlt: "Karpuz sunumu" },
      { name: "Ananas", price: 180, image: "/images/frozen-ananas.jpg", imageAlt: "Ananas sunumu" },
      { name: "Elma", price: 180, image: "/images/frozen-elma.jpg", imageAlt: "Elma sunumu" },
      { name: "Orman Meyveleri", price: 180, image: "/images/frozen-orman-meyveleri.jpg", imageAlt: "Orman Meyveleri sunumu" },
    ],
  },
  {
    id: "ozel-icecekler",
    icon: Martini,
    shortName: "Özel İçecekler",
    name: "Taze Sıkma & Özel İçecekler",
    eyebrow: "Canlandıran özel karışımlar",
    items: [
      { name: "Sıkma Portakal", price: 250, image: "/images/sikma-portakal.jpg", imageAlt: "Sıkma Portakal sunumu" },
      { name: "Mojito", price: 200, image: "/images/mojito.jpg", imageAlt: "Mojito sunumu" },
      { name: "Rainbow Mojito", price: 200, image: "/images/rainbow-mojito.jpg", imageAlt: "Rainbow Mojito sunumu" },
      { name: "Limonata", image: "/images/limonata.jpg", imageAlt: "Limonata sunumu" },
      { name: "Çilekli Limonata", image: "/images/cilekli-limonata.jpg", imageAlt: "Çilekli Limonata sunumu" },
      { name: "Naneli Limonata", image: "/images/naneli-limonata.jpg", imageAlt: "Naneli Limonata sunumu" },
    ],
  },
  {
    id: "milkshake",
    icon: Milk,
    shortName: "Milkshake",
    name: "Milkshake",
    eyebrow: "Yoğun, kremsi, serin",
    items: [
      { name: "Çilek", price: 200, image: "/images/milkshake-cilek.jpg", imageAlt: "Çilek sunumu" },
      { name: "Muz", price: 200, image: "/images/milkshake-muz.jpg", imageAlt: "Muz sunumu" },
      { name: "Vanilya", price: 200, image: "/images/milkshake-vanilya.jpg", imageAlt: "Vanilya sunumu" },
      { name: "Karamel", price: 200, image: "/images/milkshake-karamel.jpg", imageAlt: "Karamel sunumu" },
      { name: "Çikolata", price: 200, image: "/images/milkshake-cikolata.jpg", imageAlt: "Çikolata sunumu" },
    ],
  },
  {
    id: "caylar",
    icon: Leaf,
    shortName: "Çaylar",
    name: "Çaylar",
    eyebrow: "Deminde ve huzurlu",
    items: [
      { name: "Çay", price: 40, image: "/images/cay.jpg", imageAlt: "Çay sunumu" },
      { name: "Fincan Çay", price: 70, image: "/images/fincan-cay.jpg", imageAlt: "Fincan Çay sunumu" },
      { name: "Bitki Çayları", detail: "Kış Çayı · Ihlamur · Papatya · Nane-Limon · Ada Çayı · Kuşburnu · Elma-Tarçın", price: 180, image: "/images/bitki-caylari.jpg", imageAlt: "Bitki Çayları sunumu" },
    ],
  },
  {
    id: "turk-kahvesi",
    icon: Coffee,
    shortName: "Türk Kahvesi",
    name: "Türk Kahvesi & Sıcak İçecekler",
    eyebrow: "Gelenekten gelen ritüel",
    items: [
      { name: "Türk Kahvesi", price: 100, image: "/images/turk-kahvesi.jpg", imageAlt: "Türk Kahvesi sunumu" },
      { name: "Double Türk Kahvesi", price: 150, image: "/images/double-turk-kahvesi.jpg", imageAlt: "Double Türk Kahvesi sunumu" },
      { name: "Sütlü Türk Kahvesi", price: 100, image: "/images/sutlu-turk-kahvesi.jpg", imageAlt: "Sütlü Türk Kahvesi sunumu" },
      { name: "Double Sütlü Türk Kahvesi", price: 170, image: "/images/double-sutlu-turk-kahvesi.jpg", imageAlt: "Double Sütlü Türk Kahvesi sunumu" },
      { name: "Damla Sakızlı Türk Kahvesi", price: 100, image: "/images/damla-sakizli-turk-kahvesi.jpg", imageAlt: "Damla Sakızlı Türk Kahvesi sunumu" },
      { name: "Double Damla Sakızlı Türk Kahvesi", price: 150, image: "/images/double-damla-sakizli.jpg", imageAlt: "Double Damla Sakızlı Türk Kahvesi sunumu" },
      { name: "Süvari Türk Kahvesi", price: 150, image: "/images/suvari-turk-kahvesi.jpg", imageAlt: "Süvari Türk Kahvesi sunumu" },
      { name: "Dibek Kahvesi", price: 120, image: "/images/dibek-kahvesi.jpg", imageAlt: "Dibek Kahvesi sunumu" },
      { name: "Double Dibek", price: 160, image: "/images/double-dibek.jpg", imageAlt: "Double Dibek sunumu" },
      { name: "Menengiç", price: 120, image: "/images/menengic.jpg", imageAlt: "Menengiç sunumu" },
      { name: "Double Menengiç", price: 160, image: "/images/double-menengic.jpg", imageAlt: "Double Menengiç sunumu" },
      { name: "Salep", price: 150, image: "/images/salep.jpg", imageAlt: "Salep sunumu" },
      { name: "Çikolatalı Salep", price: 150, image: "/images/cikolatali-salep.jpg", imageAlt: "Çikolatalı Salep sunumu" },
      { name: "Sıcak Çikolata", price: 150, image: "/images/sicak-cikolata.jpg", imageAlt: "Sıcak Çikolata sunumu" },
      { name: "Beyaz Sıcak Çikolata", price: 150, image: "/images/beyaz-sicak-cikolata.jpg", imageAlt: "Beyaz Sıcak Çikolata sunumu" },
      { name: "Fincan Süt", price: 130, image: "/images/fincan-sut.jpg", imageAlt: "Fincan Süt sunumu" },
      { name: "Nescafe", image: "/images/nescafe.jpg", imageAlt: "Nescafe sunumu" },
    ],
  },
  {
    id: "espresso",
    icon: Bean,
    shortName: "Espresso",
    name: "Espresso & Sıcak Kahveler",
    eyebrow: "Ustalıkla hazırlanan kahveler",
    items: [
      { name: "Espresso Single", price: 100, image: "/images/espresso-single.jpg", imageAlt: "Espresso Single sunumu" },
      { name: "Espresso Double", price: 120, image: "/images/espresso-double.jpg", imageAlt: "Espresso Double sunumu" },
      { name: "Americano", price: 150, image: "/images/americano.jpg", imageAlt: "Americano sunumu" },
      { name: "Cafe Latte", price: 160, image: "/images/cafe-latte.jpg", imageAlt: "Cafe Latte sunumu" },
      { name: "Flat White", price: 150, image: "/images/flat-white.jpg", imageAlt: "Flat White sunumu" },
      { name: "Mocha", price: 170, image: "/images/mocha.jpg", imageAlt: "Mocha sunumu" },
      { name: "White Mocha", price: 170, image: "/images/white-mocha.jpg", imageAlt: "White Mocha sunumu" },
      { name: "Caramel Latte", price: 170, image: "/images/caramel-latte.jpg", imageAlt: "Caramel Latte sunumu" },
      { name: "Cappuccino", price: 160, image: "/images/cappuccino.jpg", imageAlt: "Cappuccino sunumu" },
      { name: "Lotus Latte", price: 170, image: "/images/lotus-latte.jpg", imageAlt: "Lotus Latte sunumu" },
      { name: "Cookie Latte", price: 170, image: "/images/cookie-latte.jpg", imageAlt: "Cookie Latte sunumu" },
      { name: "Filtre Kahve", price: 170, image: "/images/filtre-kahve.jpg", imageAlt: "Filtre Kahve sunumu" },
    ],
  },
  {
    id: "ice-coffee",
    icon: Citrus,
    shortName: "Ice Coffee",
    name: "Ice Coffee",
    eyebrow: "Soğuk kahve koleksiyonu",
    items: [
      { name: "Ice Latte", price: 210, image: "/images/ice-latte.jpg", imageAlt: "Ice Latte sunumu" },
      { name: "Ice Mocha", price: 210, image: "/images/ice-mocha.jpg", imageAlt: "Ice Mocha sunumu" },
      { name: "Ice Caramel Latte", price: 210, image: "/images/ice-caramel-latte.jpg", imageAlt: "Ice Caramel Latte sunumu" },
      { name: "Ice Americano", price: 210, image: "/images/ice-americano.jpg", imageAlt: "Ice Americano sunumu" },
      { name: "Cool Lime", price: 210, image: "/images/cool-lime.jpg", imageAlt: "Cool Lime sunumu" },
      { name: "Red Berries", price: 210, image: "/images/red-berries.jpg", imageAlt: "Red Berries sunumu" },
    ],
  },
];

const find = (c: string, n: string) => menu.find((x) => x.id === c)!.items.find((i) => i.name === n)!;
const pick = (c: string, n: string) => ({ image: find(c, n).image, price: find(c, n).price });
const signature = [
  { name: "San Sebastian", tagline: "Şefin favorisi", ...pick("tatlilar", "San Sebastian") },
  { name: "Lotus Latte", tagline: "İmza kahve", ...pick("espresso", "Lotus Latte") },
  { name: "Fettuccine Alfredo", tagline: "Kremsi klasik", ...pick("ana-yemekler", "Fettuccine Alfredo") },
  { name: "Rainbow Mojito", tagline: "Gecenin yıldızı", ...pick("ozel-icecekler", "Rainbow Mojito") },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Protokol Lounge | Dijital Menü" },
      { name: "description", content: "Protokol Lounge'un kahvaltı, yemek, tatlı ve içeceklerden oluşan dijital menüsünü keşfedin." },
      { property: "og:title", content: "Protokol Lounge | Dijital Menü" },
      { property: "og:description", content: "Seçkin lezzetler ve özel içecekler, Protokol Lounge dijital menüsünde." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activeCategory, setActiveCategory] = useState("kahvalti");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.15, 0.5] },
    );

    menu.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLElement>(`[data-category="${activeCategory}"]`);
    activeLink?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCategory]);

  return (
    <Drawer open={sheetOpen} onOpenChange={setSheetOpen} shouldScaleBackground={false}>
    <main className="min-h-screen overflow-clip bg-background text-foreground">
      <BackgroundDepth />
      <MagicSuggestion />
      <HeroParallax>
        <div className="flex flex-col items-center">
          <div className="logo-float relative mb-4 w-[min(53vw,16rem)]">
            <div className="logo-glow absolute inset-[18%] rounded-full" aria-hidden="true" />
            <img
              src={logoAsset.url}
              alt="Protokol Lounge PL monogramı"
              width={1448}
              height={1086}
              className="relative h-auto w-full object-contain drop-shadow-2xl"
            />
          </div>
          <div className="mb-5 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-gold-muted">
            <span className="h-px w-7 bg-gold-muted/40" />
            Digital Menu
            <span className="h-px w-7 bg-gold-muted/40" />
          </div>
          <h1 className="font-display text-4xl font-semibold leading-none text-foreground sm:text-6xl">
            Protokol Lounge
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
            Seçkin tatlar, özenli sunumlar ve zamansız bir lounge deneyimi.
          </p>
          <div className="mt-7 flex items-center gap-2 text-xs text-gold-muted">
            <MapPin aria-hidden="true" className="size-3.5" />
            <span>Lezzeti keşfetmek için aşağı kaydırın</span>
          </div>
        </div>
        <a href="#kahvalti" onClick={(e) => { e.preventDefault(); smoothScrollTo("kahvalti"); }} aria-label="Menüye geç" className="mt-8 inline-block rounded-full p-2 text-primary transition-colors hover:text-gold-light">
          <ChevronDown aria-hidden="true" className="size-5 animate-bounce" />
        </a>
      </HeroParallax>

      <div className="relative z-30 -mt-20 rounded-t-3xl bg-background pt-10 shadow-[0_-30px_60px_-20px_var(--color-background)]">
      <TrendingMarquee />
      <SignatureCarousel items={signature} />

      <nav ref={navRef} aria-label="Menü kategorileri" className="category-nav sticky top-0 z-50 border-y border-border/60 bg-background/55 px-3 py-3">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto scrollbar-none">
          {menu.map((category) => {
            const Icon = category.icon;
            return (
              <a
              key={category.id}
              href={`#${category.id}`}
              data-category={category.id}
              aria-current={activeCategory === category.id ? "location" : undefined}
              onClick={(e) => { e.preventDefault(); setActiveCategory(category.id); smoothScrollTo(category.id); }}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "nav-active scale-105 border-primary/70 bg-primary text-primary-foreground shadow-gold"
                  : "border-border bg-card/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon aria-hidden="true" className="size-3.5" />
              {category.shortName}
            </a>
            );
          })}
        </div>
      </nav>

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6">
        <div className="mb-14 flex items-center justify-center gap-3 text-center text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold-muted">
          <Sparkles aria-hidden="true" className="size-3.5" />
          Menü Koleksiyonu
          <Sparkles aria-hidden="true" className="size-3.5" />
        </div>

        {menu.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
          <Fragment key={category.id}>
          <section id={category.id} className="scroll-mt-24 pb-20 sm:pb-28">
            <header className="mb-7 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-5">
              <div className="min-w-0">
                <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  {String(categoryIndex + 1).padStart(2, "0")} · {category.eyebrow}
                </p>
                <h2 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
                  {category.name}
                </h2>
              </div>
              <Icon className="size-7 shrink-0 text-gold-muted sm:size-8" aria-hidden="true" />
            </header>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {category.items.map((item, itemIndex) => (
                <TiltReveal key={`${category.id}-${item.name}`} index={itemIndex}>
                <article>
                <DrawerTrigger asChild>
                <Button variant="ghost" onClick={() => setSelectedItem(item)} aria-label={`${item.name} detayları`} className="menu-card group grid h-auto min-h-28 w-full grid-cols-[6.75rem_minmax(0,1fr)] items-stretch gap-0 overflow-hidden whitespace-normal rounded-lg border border-border bg-card p-0 text-left hover:bg-card focus-visible:ring-primary sm:min-h-32 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
                  <div className="relative overflow-hidden bg-secondary">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      width={1200}
                      height={912}
                      loading="lazy"
                      className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${itemIndex % 3 === 1 ? "object-[65%_center]" : itemIndex % 3 === 2 ? "object-[35%_center]" : "object-center"}`}
                    />
                    <div className="absolute inset-0 bg-image-shade" aria-hidden="true" />
                  </div>
                  <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-start gap-2 p-4 sm:p-5">
                    <div className="min-w-0 self-center">
                      <h3 className="text-sm font-semibold leading-snug text-card-foreground sm:text-base">{item.name}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{item.detail ?? "Özenle hazırlanır"}</p>
                    </div>
                    <span className="price-tag shrink-0 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-gold-light">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </Button>
                </DrawerTrigger>
                </article>
                </TiltReveal>
              ))}
            </div>
          </section>
          {category.id === "tatlilar" && (() => {
            const featured = category.items.find((i) => i.name === "San Sebastian");
            return featured ? (
              <SignatureZoom name={featured.name} tagline="İmza Tatlı · Şefin favorisi" image={featured.image} price={featured.price} onSelect={() => { setSelectedItem(featured); setSheetOpen(true); }} />
            ) : null;
          })()}
          </Fragment>
          );
        })}
      </div>
      </div>

      <footer className="relative border-t border-border bg-card/50 px-5 py-12 text-center">
        <img src={logoAsset.url} alt="" aria-hidden="true" width={1448} height={1086} loading="lazy" className="mx-auto mb-3 h-14 w-auto object-contain opacity-80" />
        <p className="font-display text-xl text-foreground">Protokol Lounge</p>
        <p className="mt-2 text-xs text-muted-foreground">Afiyet olsun.</p>
      </footer>
    </main>
    <ItemBottomSheet item={selectedItem} />
    </Drawer>
  );
}
