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
  Flame,
  Leaf,
  MapPin,
  Martini,
  Milk,
  Popcorn,
  Sparkles,
  UtensilsCrossed,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { BackgroundDepth, HeroParallax, SignatureCarousel, SignatureZoom, TiltReveal, smoothScrollTo } from "@/components/menu/effects";
import { Drawer } from "@/components/ui/drawer";
import { MagicSuggestion, TrendingMarquee } from "@/components/menu/engagement";
import { formatPrice } from "@/lib/price";
import { ItemBottomSheet } from "@/components/menu/item-bottom-sheet";

const logoUrl = "/images/protokol-lounge-logo.png";

type MenuItem = {
  name: string;
  detail?: string;
  price?: number;
  image: string;
  imageAlt: string;
  description?: string;
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
      {
        name: "Menemen",
        detail: "Kaşarlı · Kavurmalı",
        price: 180,
        image: "/images/menemen.jpg",
        imageAlt: "Menemen sunumu",
        description: "Taze köy yumurtası, domates ve biberlerin tereyağında buluştuğu geleneksel lezzet. İsteğe göre kaşarlı veya kavurmalı olarak sıcak tava sunumuyla servis edilir.",
      },
      {
        name: "Kaşarlı Tost",
        detail: "Eriyen bol kaşar peyniri",
        price: 220,
        image: "/images/kasarli-tost.jpg",
        imageAlt: "Kaşarlı Tost sunumu",
        description: "Özel ekmeği arasında bol erimiş kaliteli kaşar peyniri ve tereyağı lezzeti. Çıtır dış dokusu ve uzayan peyniriyle doyurucu bir kahvaltı klasiği.",
      },
      {
        name: "Karışık Tost",
        detail: "Kasap sucuk & kaşar",
        price: 280,
        image: "/images/karisik-tost.jpg",
        imageAlt: "Karışık Tost sunumu",
        description: "Özel kasap sucuğu ve eriyen taze kaşar peynirinin enfes uyumu. Yanında zeytin ve domates dilimleriyle sıcak ve taze servis edilir.",
      },
      {
        name: "Gözleme",
        detail: "Peynirli · Patatesli",
        price: 210,
        image: "/images/gozleme.jpg",
        imageAlt: "Gözleme sunumu",
        description: "El açması incecik yufkanın sac üzerinde nar gibi kızartılmasıyla hazırlanan, içi bol peynirli veya baharatlı patatesli sıcacık Anadolu lezzeti.",
      },
    ],
  },
  {
    id: "ana-yemekler",
    icon: UtensilsCrossed,
    shortName: "Ana Yemekler",
    name: "Ana Yemekler",
    eyebrow: "Mutfağın imza tabakları",
    items: [
      {
        name: "Hamburger",
        detail: "Özel burger köftesi & patates tava",
        price: 380,
        image: "/images/hamburger.jpg",
        imageAlt: "Hamburger sunumu",
        description: "Özel dinlendirilmiş dana burger köftesi, karamelize soğan, cheddar peyniri, marul ve domates; sıcacık burger ekmeği ve çıtır patates tava eşliğinde.",
      },
      {
        name: "Köri Soslu Tavuk",
        detail: "Kremalı köri & pilav",
        price: 300,
        image: "/images/kori-soslu-tavuk.jpg",
        imageAlt: "Köri Soslu Tavuk sunumu",
        description: "Özenle marine edilmiş jülyen tavuk parçaları, kremsi köri sosu ve taze baharatlarla harmanlanarak pilav ve patates eşliğinde servis edilir.",
      },
      {
        name: "Soya Soslu Tavuk",
        detail: "Wok sebzeli sotelenmiş tavuk",
        price: 300,
        image: "/images/soya-soslu-tavuk.jpg",
        imageAlt: "Soya Soslu Tavuk sunumu",
        description: "Wok tavada sotelenmiş çıtır sebzeler ve yumuşacık tavuk parçaları, zengin aromalı soya sosu dokunuşuyla hazırlanır.",
      },
      {
        name: "Barbekü Soslu Tavuk",
        detail: "Tütsülenmiş barbekü aroması",
        price: 300,
        image: "/images/barbeku-soslu-tavuk.jpg",
        imageAlt: "Barbekü Soslu Tavuk sunumu",
        description: "Dumanı üstünde tütsülenmiş özel barbekü sosuyla marine edilen ızgara tavuk lezzeti. Yoğun aromasıyla damaklarda iz bırakır.",
      },
      {
        name: "Penne Alfredo",
        detail: "Kremalı mantar & parmesan",
        price: 240,
        image: "/images/penne-alfredo.jpg",
        imageAlt: "Penne Alfredo sunumu",
        description: "Al dente penne makarna, taze mantar, zengin krema ve hakiki parmesan peynirinin kadifemsi uyumuyla sunulur.",
      },
      {
        name: "Penne Arrabbiata",
        detail: "Acılı domates sosu & fesleğen",
        price: 240,
        image: "/images/penne-arrabbiata.jpg",
        imageAlt: "Penne Arrabbiata sunumu",
        description: "Özel acı biberler, sarımsak, taze fesleğen ve zengin İtalyan domates sosunun mükemmel dengesiyle hazırlanan karakteristik makarna.",
      },
      {
        name: "Fettuccine Alfredo",
        detail: "Tavuklu krema & taze mantar",
        price: 280,
        image: "/images/fettuccine-alfredo.jpg",
        imageAlt: "Fettuccine Alfredo sunumu",
        description: "Geniş şerit fettuccine makarnası, yoğun kremalı Alfredo sosu, taze tavuk dilimleri ve parmesan peyniriyle şefimizin imza tabağı.",
      },
      {
        name: "Köri Soslu Penne",
        detail: "Aromatik köri kreması",
        price: 280,
        image: "/images/kori-soslu-penne.jpg",
        imageAlt: "Köri Soslu Penne sunumu",
        description: "Kremalı köri sosu ile marine edilmiş penne makarna; aromatik baharat dokunuşlarıyla hafif ve doyurucu bir lezzet sunumu.",
      },
    ],
  },
  {
    id: "atistirmaliklar",
    icon: Popcorn,
    shortName: "Atıştırmalık",
    name: "Atıştırmalıklar",
    eyebrow: "Sohbete eşlik eden lezzetler",
    items: [
      {
        name: "Patates Tava",
        detail: "Özel baharat & dip sos",
        price: 200,
        image: "/images/patates-tava.jpg",
        imageAlt: "Patates Tava sunumu",
        description: "Altın sarısı çıtır çıtır kızarmış patates dilimleri, özel baharat harmanı ve dip soslar eşliğinde sıcak servis edilir.",
      },
      {
        name: "Sosis & Patates",
        detail: "Kızarmış dana sosis tabağı",
        price: 220,
        image: "/images/sosis-patates.jpg",
        imageAlt: "Sosis & Patates sunumu",
        description: "Kızarmış dana sosisler ve çıtır patatesler, soslar eşliğinde sohbetlerinize eşlik edecek nefis bir atıştırmalık kombinasyonu.",
      },
      {
        name: "Crispy Party",
        detail: "Zengin paylaşımlık sepet",
        price: 320,
        image: "/images/crispy-party.jpg",
        imageAlt: "Crispy Party sunumu",
        description: "Çıtır tavuk parçaları, soğan halkaları, sigara böreği ve patates tava ile hazırlanmış zengin ve keyifli bir paylaşımlık sepet.",
      },
      {
        name: "Sigara Böreği",
        detail: "Lor peynirli & çıtır yufka",
        price: 220,
        image: "/images/sigara-boregi.jpg",
        imageAlt: "Sigara Böreği sunumu",
        description: "İncecik yufkaya sarılmış özel böreklik lor ve maydanoz harcı; altın sarısı nar gibi kızartılarak çıtır çıtır sunulur.",
      },
    ],
  },
  {
    id: "tatlilar",
    icon: CakeSlice,
    shortName: "Tatlılar",
    name: "Tatlılar",
    eyebrow: "Gecenin tatlı finali",
    items: [
      {
        name: "Sufle",
        detail: "Sıcak akışkan çikolata",
        price: 240,
        image: "/images/sufle.jpg",
        imageAlt: "Sufle sunumu",
        description: "İçinden akışkan sıcak Belçika çikolatası taşan, pudra şekeri ve enfes dondurma eşliğinde servis edilen karşı konulmaz tatlı deneyimi.",
      },
      {
        name: "Fıstık Rüyası",
        detail: "Bol Antep fıstıklı katlar",
        price: 220,
        image: "/images/fistik-ruyasi.jpg",
        imageAlt: "Fıstık Rüyası sunumu",
        description: "Bol antep fıstığı dolgulu katmanlar, hafif krema ve yumuşak pandispanyasıyla fıstık severler için rüya gibi bir tat.",
      },
      {
        name: "San Sebastian",
        detail: "Karamelize yanık cheesecake",
        price: 220,
        image: "/images/san-sebastian.jpg",
        imageAlt: "San Sebastian sunumu",
        description: "İçi kadifemsi ve kremsi, üstü karamelize yanık dokusuyla şefimizin özel reçeteli meşhur cheesecake'i. Sıcak çikolata sosuyla sunulur.",
      },
      {
        name: "Limonlu Cheesecake",
        detail: "Ferahlatıcı limon kreması",
        price: 220,
        image: "/images/limonlu-cheesecake.jpg",
        imageAlt: "Limonlu Cheesecake sunumu",
        description: "Ferahlatıcı limon kreması ve hafif bisküvi tabanıyla dengelenmiş, ferah ve hafif bir tatlı molası.",
      },
      {
        name: "Frambuazlı Cheesecake",
        detail: "Mayhoş frambuaz püresi",
        price: 220,
        image: "/images/frambuazli-cheesecake.jpg",
        imageAlt: "Frambuazlı Cheesecake sunumu",
        description: "Doğal frambuaz püresinin mayhoş tatlılığı ile kremamsı peynir dokusunun kusursuz birlikteliği.",
      },
      {
        name: "Brownie",
        detail: "Yoğun bitter çikolata",
        price: 270,
        image: "/images/brownie.jpg",
        imageAlt: "Brownie sunumu",
        description: "Yoğun kakao ve çikolata kıvamında, dışı hafif kabuklu içi nemli ve yumuşak hakiki çikolata şöleni.",
      },
      {
        name: "Tiramisu",
        detail: "İtalyan mascarpone & espresso",
        price: 220,
        image: "/images/tiramisu.jpg",
        imageAlt: "Tiramisu sunumu",
        description: "Espresso ile ıslatılmış savoiardi kedidili bisküvileri, mascarpone kreması ve yoğun kakao dokunuşuyla zarif bir İtalyan klasiği.",
      },
      {
        name: "Cup Tatlı",
        detail: "Hafif kremalı porsiyonluk tatlı",
        price: 220,
        image: "/images/cup-tatli.jpg",
        imageAlt: "Cup Tatlı sunumu",
        description: "Kat kat hafif krema, taze meyve parçaları ve bisküvi kırıntılarıyla hazırlanan ferahlatıcı porsiyonluk tatlı.",
      },
    ],
  },
  {
    id: "soguk-icecekler",
    icon: CupSoda,
    shortName: "Soğuk İçecekler",
    name: "Soğuk İçecekler",
    eyebrow: "Serin ve ferah",
    items: [
      {
        name: "Kola",
        detail: "Buz gibi ferahlık",
        price: 100,
        image: "/images/kola.jpg",
        imageAlt: "Kola sunumu",
        description: "Buz gibi ferahlatıcı klasik kola deneyimi, taze limon dilimi eşliğinde soğuk servis edilir.",
      },
      {
        name: "Fuse Tea",
        detail: "Şeftali & Limon seçenekleri",
        price: 100,
        image: "/images/fuse-tea.jpg",
        imageAlt: "Fuse Tea sunumu",
        description: "Ferahlatıcı soğuk çay lezzeti; meyve aromalarıyla sıcak anların en iyi serinletici kurtarıcısı.",
      },
      {
        name: "Churchill",
        detail: "Maden suyu, limon & tuz",
        price: 90,
        image: "/images/churchill.jpg",
        imageAlt: "Churchill sunumu",
        description: "Taze sıkılmış limon suyu, maden suyu ve kristal tuzun ferahlatıcı ve canlandırıcı efsane buluşması.",
      },
      {
        name: "Ayran",
        detail: "Bol köpüklü yayık ayranı",
        price: 70,
        image: "/images/ayran.jpg",
        imageAlt: "Ayran sunumu",
        description: "Kıvamında çırpılmış, bol köpüklü ve serinletici geleneksel lezzetli yayık ayranı.",
      },
      {
        name: "Meyveli Soda",
        detail: "Doğal meyve aromalı",
        price: 60,
        image: "/images/meyveli-soda.jpg",
        imageAlt: "Meyveli Soda sunumu",
        description: "Zengin mineralli doğal maden suyunun leziz meyve aromalarıyla buluştuğu ferahlatıcı içecek.",
      },
      {
        name: "Soda",
        detail: "Doğal zengin mineralli",
        price: 50,
        image: "/images/soda.jpg",
        imageAlt: "Soda sunumu",
        description: "Doğal mineralli, canlandırıcı ve hazmı kolaylaştıran saf kaynak maden suyu.",
      },
      {
        name: "Su",
        detail: "Doğal kaynak suyu",
        price: 40,
        image: "/images/su.jpg",
        imageAlt: "Su sunumu",
        description: "Cam şişede sunulan serin, taze ve berrak doğal kaynak suyu.",
      },
      {
        name: "Red Bull",
        detail: "Enerji veren premium formül",
        price: 130,
        image: "/images/red-bull.jpg",
        imageAlt: "Red Bull sunumu",
        description: "Zihni ve bedeni canlandıran, yüksek tempolu anlara enerji katan premium enerji içeceği.",
      },
      {
        name: "Cappy",
        detail: "Meyve suyu çeşitleri",
        price: 100,
        image: "/images/cappy.jpg",
        imageAlt: "Cappy sunumu",
        description: "Taptaze meyvelerin lezzetini sunan zengin aromalı kaliteli meyve suyu.",
      },
    ],
  },
  {
    id: "frozen",
    icon: Cherry,
    shortName: "Frozen",
    name: "Frozen",
    eyebrow: "Meyvenin buz gibi hali",
    items: [
      {
        name: "Çilek",
        detail: "Taze çilek & buz püre",
        price: 180,
        image: "/images/frozen-cilek.jpg",
        imageAlt: "Çilek sunumu",
        description: "Taze çilek püresi ve kırılmış buzun harmanlandığı ferahlatıcı ve tatlı yaz serinliği.",
      },
      {
        name: "Mango",
        detail: "Tropikal mango lezzeti",
        price: 180,
        image: "/images/frozen-mango.jpg",
        imageAlt: "Mango sunumu",
        description: "Egzotik mango aroması ve buz kristalleriyle tropikal adalara uzanan ferah bir mola.",
      },
      {
        name: "Kavun",
        detail: "Mis kokulu yaz kavunu",
        price: 180,
        image: "/images/frozen-kavun.jpg",
        imageAlt: "Kavun sunumu",
        description: "Yaz kavununun mis kokulu tatlılığı, buz gibi kıvamıyla damakları anında serinletiyor.",
      },
      {
        name: "Karpuz",
        detail: "Yaz klasiği ferahlatıcı karpuz",
        price: 180,
        image: "/images/frozen-karpuz.jpg",
        imageAlt: "Karpuz sunumu",
        description: "Taptaze karpuz aromasıyla hazırlanan buzlu, hafif ve susuzluğu anında gideren lezzet.",
      },
      {
        name: "Ananas",
        detail: "Tatlı-ekşi tropikal serinlik",
        price: 180,
        image: "/images/frozen-ananas.jpg",
        imageAlt: "Ananas sunumu",
        description: "Tatlı-ekşi tropikal ananas lezzetinin buz kristalleriyle buluştuğu tazeleyici içecek.",
      },
      {
        name: "Elma",
        detail: "Yeşil elmanın mayhoş ferahlığı",
        price: 180,
        image: "/images/frozen-elma.jpg",
        imageAlt: "Elma sunumu",
        description: "Yeşil elmanın iştah açıcı mayhoşluğu ve buzun serinliğiyle canlandırıcı deneyim.",
      },
      {
        name: "Orman Meyveleri",
        detail: "Böğürtlen, yaban mersini & ahududu",
        price: 180,
        image: "/images/frozen-orman-meyveleri.jpg",
        imageAlt: "Orman Meyveleri sunumu",
        description: "Böğürtlen, yaban mersini ve ahududunun büyüleyici mayhoş aromalarıyla hazırlanan buz gibi ziyafet.",
      },
    ],
  },
  {
    id: "ozel-icecekler",
    icon: Martini,
    shortName: "Özel İçecekler",
    name: "Taze Sıkma & Özel İçecekler",
    eyebrow: "Canlandıran özel karışımlar",
    items: [
      {
        name: "Sıkma Portakal",
        detail: "%100 doğal taze sıkım",
        price: 250,
        image: "/images/sikma-portakal.jpg",
        imageAlt: "Sıkma Portakal sunumu",
        description: "Dalından yeni koparılmış taze portakalların anında sıkılmasıyla hazırlanan %100 doğal C vitamini deposu.",
      },
      {
        name: "Mojito",
        detail: "Taze nane, misket limonu & soda",
        price: 200,
        image: "/images/mojito.jpg",
        imageAlt: "Mojito sunumu",
        description: "Taze nane yaprakları, misket limonu, esmer şeker ve sodanın buzla ezilerek hazırlandığı ferahlatıcı kokteyl.",
      },
      {
        name: "Rainbow Mojito",
        detail: "Renkli meyve katmanları & nane",
        price: 200,
        image: "/images/rainbow-mojito.jpg",
        imageAlt: "Rainbow Mojito sunumu",
        description: "Özel meyve katmanları ve taze naneyle hazırlanan, renk cümbüşü ve görsel şölen sunan imza ferahlık içeceği.",
      },
      {
        name: "Limonata",
        detail: "Ev yapımı geleneksel tarif",
        price: 140,
        image: "/images/limonata.jpg",
        imageAlt: "Limonata sunumu",
        description: "Taze limon kabukları ve suyunun doğal pancar şekeriyle ovulmasıyla hazırlanan ev yapımı geleneksel limonata.",
      },
      {
        name: "Çilekli Limonata",
        detail: "Taze çilek püresi ilavesiyle",
        price: 150,
        image: "/images/cilekli-limonata.jpg",
        imageAlt: "Çilekli Limonata sunumu",
        description: "Klasik ekşi-tatlı limonataya eklenen taze çilek püresiyle çift kat meyve ferahlığı.",
      },
      {
        name: "Naneli Limonata",
        detail: "Taze nane yapraklarıyla blender",
        price: 150,
        image: "/images/naneli-limonata.jpg",
        imageAlt: "Naneli Limonata sunumu",
        description: "Taze nane yapraklarıyla harmanlanan, ekstra serinlik hissi veren ev yapımı naneli limonata.",
      },
    ],
  },
  {
    id: "milkshake",
    icon: Milk,
    shortName: "Milkshake",
    name: "Milkshake",
    eyebrow: "Yoğun, kremsi, serin",
    items: [
      {
        name: "Çilek",
        detail: "Dondurma, taze süt & çilek",
        price: 200,
        image: "/images/milkshake-cilek.jpg",
        imageAlt: "Çilek sunumu",
        description: "Hakiki vanilyalı dondurma, taze soğuk süt ve mis kokulu çileklerin kremsi birleşimi.",
      },
      {
        name: "Muz",
        detail: "Yoğun muz aroması & krema",
        price: 200,
        image: "/images/milkshake-muz.jpg",
        imageAlt: "Muz sunumu",
        description: "Tatlı muz aroması, yoğun dondurma ve sütün blenderda köpürtülmesiyle hazırlanan kıvamlı lezzet.",
      },
      {
        name: "Vanilya",
        detail: "Madagaskar vanilya lezzeti",
        price: 200,
        image: "/images/milkshake-vanilya.jpg",
        imageAlt: "Vanilya sunumu",
        description: "Madagaskar vanilyası aromalı dondurma ve taze sütün kadifemsi klasik lezzeti.",
      },
      {
        name: "Karamel",
        detail: "Karamel sos & dondurma",
        price: 200,
        image: "/images/milkshake-karamel.jpg",
        imageAlt: "Karamel sunumu",
        description: "Akışkan karamel sosu ve dondurmanın yoğun kıvamıyla tatlı krizlerine mükemmel serin çözüm.",
      },
      {
        name: "Çikolata",
        detail: "Belçika çikolatası kıvamı",
        price: 200,
        image: "/images/milkshake-cikolata.jpg",
        imageAlt: "Çikolata sunumu",
        description: "Zengin Belçika çikolatası aroması ve soğuk sütün eşsiz kıvamıyla çikolata tutkunlarına özel.",
      },
    ],
  },
  {
    id: "caylar",
    icon: Leaf,
    shortName: "Çaylar",
    name: "Çaylar",
    eyebrow: "Deminde ve huzurlu",
    items: [
      {
        name: "Çay",
        detail: "Taze demlenmiş Rize çayı",
        price: 40,
        image: "/images/cay.jpg",
        imageAlt: "Çay sunumu",
        description: "Doğu Karadeniz'in seçkin çay yapraklarından özenle demlenmiş, tavşan kanı geleneksel ince belli çay.",
      },
      {
        name: "Fincan Çay",
        detail: "Büyük fincanda servis",
        price: 70,
        image: "/images/fincan-cay.jpg",
        imageAlt: "Fincan Çay sunumu",
        description: "Daha uzun sohbetler için büyük porsiyon fincanda servis edilen taze demlenmiş çay keyfi.",
      },
      {
        name: "Bitki Çayları",
        detail: "Kış Çayı · Ihlamur · Papatya · Ada Çayı",
        price: 180,
        image: "/images/bitki-caylari.jpg",
        imageAlt: "Bitki Çayları sunumu",
        description: "Kış Çayı, Ihlamur, Papatya, Nane-Limon, Ada Çayı, Kuşburnu ve Elma-Tarçın seçenekleriyle şifa dolu aromatik demler.",
      },
    ],
  },
  {
    id: "turk-kahvesi",
    icon: Coffee,
    shortName: "Türk Kahvesi",
    name: "Türk Kahvesi & Sıcak İçecekler",
    eyebrow: "Gelenekten gelen ritüel",
    items: [
      {
        name: "Türk Kahvesi",
        detail: "Közde bol köpüklü pişirim",
        price: 100,
        image: "/images/turk-kahvesi.jpg",
        imageAlt: "Türk Kahvesi sunumu",
        description: "Taze çekilmiş ince kahve çekirdeklerinin köz ateşinde ağır ağır pişirilmesiyle sunulan bol köpüklü geleneksel ritüel.",
      },
      {
        name: "Double Türk Kahvesi",
        detail: "Çift porsiyon zengin fincan",
        price: 150,
        image: "/images/double-turk-kahvesi.jpg",
        imageAlt: "Double Türk Kahvesi sunumu",
        description: "Daha yoğun kahve deneyimi arayanlar için çift porsiyon pişirilen bol köpüklü Türk kahvesi.",
      },
      {
        name: "Sütlü Türk Kahvesi",
        detail: "Süt ile pişirilmiş yumuşak içim",
        price: 100,
        image: "/images/sutlu-turk-kahvesi.jpg",
        imageAlt: "Sütlü Türk Kahvesi sunumu",
        description: "Su yerine taze süt ile pişirilerek yumuşatılmış, kadifemsi kıvamda nefis Türk kahvesi.",
      },
      {
        name: "Double Sütlü Türk Kahvesi",
        detail: "Çift porsiyon sütlü lezzet",
        price: 170,
        image: "/images/double-sutlu-turk-kahvesi.jpg",
        imageAlt: "Double Sütlü Türk Kahvesi sunumu",
        description: "Çift porsiyon sütlü pişirilen, uzun soluklu ve yumuşak içimli Türk kahvesi keyfi.",
      },
      {
        name: "Damla Sakızlı Türk Kahvesi",
        detail: "Ege damla sakızı aromalı",
        price: 100,
        image: "/images/damla-sakizli-turk-kahvesi.jpg",
        imageAlt: "Damla Sakızlı Türk Kahvesi sunumu",
        description: "Ege'nin otantik damla sakızı aromasıyla zenginleştirilmiş, buram buram kokan nostaljik lezzet.",
      },
      {
        name: "Double Damla Sakızlı Türk Kahvesi",
        detail: "Çift porsiyon damla sakızlı",
        price: 150,
        image: "/images/double-damla-sakizli.jpg",
        imageAlt: "Double Damla Sakızlı Türk Kahvesi sunumu",
        description: "Yoğun damla sakızı aromasıyla çift porsiyon pişirilen özel Türk kahvesi sunumu.",
      },
      {
        name: "Süvari Türk Kahvesi",
        detail: "İnce belli bardakta Tarsus usulü",
        price: 150,
        image: "/images/suvari-turk-kahvesi.jpg",
        imageAlt: "Süvari Türk Kahvesi sunumu",
        description: "Geniş ince belli çay bardağında servis edilen, az köpüklü ve yoğun kıvamlı geleneksel Tarsus usulü kahve.",
      },
      {
        name: "Dibek Kahvesi",
        detail: "Taş dibekte dövülmüş baharatlı",
        price: 120,
        image: "/images/dibek-kahvesi.jpg",
        imageAlt: "Dibek Kahvesi sunumu",
        description: "Geleneksel taş dibeklerde dövülmüş aromatik bitki ve baharat harmanlı, yumuşak içimli özel kahve.",
      },
      {
        name: "Double Dibek",
        detail: "Çift porsiyon dibek harmanı",
        price: 160,
        image: "/images/double-dibek.jpg",
        imageAlt: "Double Dibek sunumu",
        description: "Taş dibekte dövülen zengin baharat aromalı kahvenin çift porsiyon doyurucu sunumu.",
      },
      {
        name: "Menengiç",
        detail: "Kafeinsiz çitlembik & süt",
        price: 120,
        image: "/images/menengic.jpg",
        imageAlt: "Menengiç sunumu",
        description: "Yabani fıstık (çitlembik) tanelerinden elde edilen, kafeinsiz ve sütle pişirilen yoğun aromalı Güneydoğu lezzeti.",
      },
      {
        name: "Double Menengiç",
        detail: "Çift porsiyon sütlü menengiç",
        price: 160,
        image: "/images/double-menengic.jpg",
        imageAlt: "Double Menengiç sunumu",
        description: "Doğal menengiç kahvesinin sütle pişirilen çift porsiyon zengin ve şifalı sunumu.",
      },
      {
        name: "Salep",
        detail: "Hakiki dağ salebi & tarçın",
        price: 150,
        image: "/images/salep.jpg",
        imageAlt: "Salep sunumu",
        description: "Hakiki dağ salebi ve tarçının sıcak sütle kıvam almasıyla hazırlanan, içinizi ısıtan kış klasiği.",
      },
      {
        name: "Çikolatalı Salep",
        detail: "Belçika çikolatası & sıcak salep",
        price: 150,
        image: "/images/cikolatali-salep.jpg",
        imageAlt: "Çikolatalı Salep sunumu",
        description: "Yoğun sıcak çikolata lezzetiyle zenginleştirilmiş kadifemsi kıvamlı özel salep karışımı.",
      },
      {
        name: "Sıcak Çikolata",
        detail: "Eritilmiş yoğun çikolata & süt",
        price: 150,
        image: "/images/sicak-cikolata.jpg",
        imageAlt: "Sıcak Çikolata sunumu",
        description: "Eritilmiş kaliteli çikolata ve sıcak sütün yoğun, akışkan ve tatlı kucaklaşması.",
      },
      {
        name: "Beyaz Sıcak Çikolata",
        detail: "Fildişi beyaz çikolata kreması",
        price: 150,
        image: "/images/beyaz-sicak-cikolata.jpg",
        imageAlt: "Beyaz Sıcak Çikolata sunumu",
        description: "Fildişi beyaz çikolatanın kremsi sıcak sütle harmanlandığı yumuşak ve tatlı içecek.",
      },
      {
        name: "Fincan Süt",
        detail: "Sıcak günlük taze süt",
        price: 130,
        image: "/images/fincan-sut.jpg",
        imageAlt: "Fincan Süt sunumu",
        description: "Bal veya tarçın isteğinize göre sıcak servis edilen taze günlük süt.",
      },
      {
        name: "Nescafe",
        detail: "Sütlü veya sade klasik kahve",
        price: 100,
        image: "/images/nescafe.jpg",
        imageAlt: "Nescafe sunumu",
        description: "Pratik ve klasik kahve tadını sevenler için sıcak süt veya su ile hazırlanan kahve.",
      },
    ],
  },
  {
    id: "espresso",
    icon: Bean,
    shortName: "Espresso",
    name: "Espresso & Sıcak Kahveler",
    eyebrow: "Ustalıkla hazırlanan kahveler",
    items: [
      {
        name: "Espresso Single",
        detail: "%100 Arabica yoğun krema",
        price: 100,
        image: "/images/espresso-single.jpg",
        imageAlt: "Espresso Single sunumu",
        description: "%100 kaliteli Arabica çekirdeklerinden yüksek basınçla çekilmiş yoğun aromalı tek shot espresso.",
      },
      {
        name: "Espresso Double",
        detail: "Çift shot yoğun enerji",
        price: 120,
        image: "/images/espresso-double.jpg",
        imageAlt: "Espresso Double sunumu",
        description: "Güne güçlü bir başlangıç için iki shot taze çekilmiş zengin kremalı espresso deneyimi.",
      },
      {
        name: "Americano",
        detail: "Espresso & sıcak su dengesi",
        price: 150,
        image: "/images/americano.jpg",
        imageAlt: "Americano sunumu",
        description: "Taze çekilmiş espressonun sıcak su ile dengelendiği berrak ve zengin filtre kahve alternatifi.",
      },
      {
        name: "Cafe Latte",
        detail: "İpeksi süt köpüğü & espresso",
        price: 160,
        image: "/images/cafe-latte.jpg",
        imageAlt: "Cafe Latte sunumu",
        description: "İpeksi mikro köpüklü sıcak süt ile tek shot espressonun yumuşak ve dengeli buluşması.",
      },
      {
        name: "Flat White",
        detail: "Çift shot ristretto & ince köpük",
        price: 150,
        image: "/images/flat-white.jpg",
        imageAlt: "Flat White sunumu",
        description: "Yoğun çift shot ristretto ve ince kadifemsi süt köpüğüyle kahve lezzetini öne çıkaran Avustralya klasiği.",
      },
      {
        name: "Mocha",
        detail: "Espresso, çikolata sosu & süt",
        price: 170,
        image: "/images/mocha.jpg",
        imageAlt: "Mocha sunumu",
        description: "Zengin espresso, sıcak çikolata sosu ve buharda ısıtılmış sütün tatlı ve doyurucu uyumu.",
      },
      {
        name: "White Mocha",
        detail: "Beyaz çikolata & kremsi espresso",
        price: 170,
        image: "/images/white-mocha.jpg",
        imageAlt: "White Mocha sunumu",
        description: "Beyaz çikolatanın kremsi tatlılığı ile taze çekilmiş espressonun enfes lezzeti.",
      },
      {
        name: "Caramel Latte",
        detail: "Karamel şurubu & kadife süt",
        price: 170,
        image: "/images/caramel-latte.jpg",
        imageAlt: "Caramel Latte sunumu",
        description: "Özel karamel şurubu, sıcak süt köpüğü ve espressonun baştan çıkarıcı tatlı harmanı.",
      },
      {
        name: "Cappuccino",
        detail: "Yoğun süt köpüğü & kakao",
        price: 160,
        image: "/images/cappuccino.jpg",
        imageAlt: "Cappuccino sunumu",
        description: "Eşit oranda espresso, sıcak süt ve yoğun süt köpüğünün üzerine kakao serpiştirilerek sunulan İtalyan klasiği.",
      },
      {
        name: "Lotus Latte",
        detail: "Karamelize bisküvi ezmesi",
        price: 170,
        image: "/images/lotus-latte.jpg",
        imageAlt: "Lotus Latte sunumu",
        description: "Meşhur Lotus Biscoff karamelize bisküvi ezmesi ve kremsi sütün espresso ile buluştuğu imza lezzet.",
      },
      {
        name: "Cookie Latte",
        detail: "Fırın kurabiye aromalı kahve",
        price: 170,
        image: "/images/cookie-latte.jpg",
        imageAlt: "Cookie Latte sunumu",
        description: "Fırından yeni çıkmış kurabiye aroması, süt köpüğü ve espressonun keyifli kış harmanı.",
      },
      {
        name: "Filtre Kahve",
        detail: "Taze demlenmiş dengeli lezzet",
        price: 170,
        image: "/images/filtre-kahve.jpg",
        imageAlt: "Filtre Kahve sunumu",
        description: "Özenle kavrulmuş taze çekirdeklerden filtre yöntemiyle demlenen pürüzsüz ve aromatik kahve.",
      },
    ],
  },
  {
    id: "ice-coffee",
    icon: Citrus,
    shortName: "Ice Coffee",
    name: "Ice Coffee",
    eyebrow: "Soğuk kahve koleksiyonu",
    items: [
      {
        name: "Ice Latte",
        detail: "Soğuk süt, bol buz & espresso",
        price: 210,
        image: "/images/ice-latte.jpg",
        imageAlt: "Ice Latte sunumu",
        description: "Soğuk süt, bol buz ve taze çekilmiş espressonun ferahlatıcı katmanlı sunumu.",
      },
      {
        name: "Ice Mocha",
        detail: "Buzlu çikolata & soğuk espresso",
        price: 210,
        image: "/images/ice-mocha.jpg",
        imageAlt: "Ice Mocha sunumu",
        description: "Buzlu soğuk süt, zengin çikolata sosu ve espressonun serinletici tatlı buluşması.",
      },
      {
        name: "Ice Caramel Latte",
        detail: "Karamel sos & soğuk süt köpüğü",
        price: 210,
        image: "/images/ice-caramel-latte.jpg",
        imageAlt: "Ice Caramel Latte sunumu",
        description: "Buz gibi sütün karamel aroması ve espresso ile buluştuğu iştah açıcı soğuk kahve.",
      },
      {
        name: "Ice Americano",
        detail: "Buz küpleri & soğuk espresso",
        price: 210,
        image: "/images/ice-americano.jpg",
        imageAlt: "Ice Americano sunumu",
        description: "Buz küpleri ve soğuk suyun taze espresso ile birleştiği sek ve ferahlatıcı kahve deneyimi.",
      },
      {
        name: "Cool Lime",
        detail: "Misket limonu & taze nane",
        price: 210,
        image: "/images/cool-lime.jpg",
        imageAlt: "Cool Lime sunumu",
        description: "Ferahlatıcı misket limonu özü, nane ve buzla hazırlanan sıcak günlerin favori serinliği.",
      },
      {
        name: "Red Berries",
        detail: "Kırmızı orman meyveleri aroması",
        price: 210,
        image: "/images/red-berries.jpg",
        imageAlt: "Red Berries sunumu",
        description: "Kırmızı orman meyveleri aroması ve buzun canlı rengiyle hazırlanan ferahlatıcı soğuk içecek.",
      },
    ],
  },
  {
    id: "karisik-nargile",
    icon: Flame,
    shortName: "Karışık Nargile",
    name: "Karışık Nargileler",
    eyebrow: "Özel harman ve zengin aromalar",
    items: [
      {
        name: "Mango + Karpuz",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Mango + Karpuz Nargile sunumu",
        description: "Tropikal mango ve ferahlatıcı karpuzun eşsiz uyumu, yoğun dumanı ve kaliteli köz performansı ile keyifli bir nargile deneyimi.",
      },
      {
        name: "Bisküvi + Cappuccino",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Bisküvi + Cappuccino Nargile sunumu",
        description: "Karamelize bisküvi ve kremsi kahve aromalarının sıcak ve tatlı harmanı, kahve severlere özel zengin içim.",
      },
      {
        name: "Limon + Çilek + Lady Killer",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Limon + Çilek + Lady Killer Nargile sunumu",
        description: "Ekşi-tatlı limon ve çileğin meşhur Lady Killer meyve harmanıyla buluştuğu ferahlatıcı imza karışım.",
      },
      {
        name: "Dejavu + Dondurma",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Dejavu + Dondurma Nargile sunumu",
        description: "Dejavu'nun gizemli meyvemsi notaları ile buz gibi kremsi dondurma lezzetinin pürüzsüz uyumu.",
      },
      {
        name: "Ice Kola + Red Bull + Limon",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Ice Kola + Red Bull + Limon Nargile sunumu",
        description: "Buz gibi kola, enerjik Red Bull ve ferah limon dokunuşuyla hazırlanan ultra enerjik ve canlandırıcı karışım.",
      },
      {
        name: "Love 66 + Lady",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Love 66 + Lady Nargile sunumu",
        description: "Kavun, çarkıfelek ve nane aromalı efsane Love 66 ile tatlı meyvemsi Lady karışımının büyüleyici birlikteliği.",
      },
      {
        name: "Lady + Şeftali",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Lady + Şeftali Nargile sunumu",
        description: "Yaz şeftalisinin sulu tatlılığı ve Lady aromasının yumuşak meyve harmanı ile ipeksi içim.",
      },
      {
        name: "Love 66 + Şeftali + Dejavu",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Love 66 + Şeftali + Dejavu Nargile sunumu",
        description: "Love 66 ferahlığı, tatlı şeftali ve Dejavu aromalarının katman katman açılan zengin ve aromatik birleşimi.",
      },
      {
        name: "İzmir Romantik + Merlin Moro",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "İzmir Romantik + Merlin Moro Nargile sunumu",
        description: "Ege meltemini anımsatan İzmir Romantik ve tatlı orman meyveli Merlin Moro harmanı ile romantik ve derin lezzet.",
      },
      {
        name: "Kola + Red Bull",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Kola + Red Bull Nargile sunumu",
        description: "Kola lezzeti ve Red Bull enerjisinin dengeli uyumuyla yoğun ve canlandırıcı nargile keyfi.",
      },
      {
        name: "İzmir Romantik + Lady",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "İzmir Romantik + Lady Nargile sunumu",
        description: "Hafif meyvemsi tatlı notalar ve ferah dokunuşların zarif buluşmasıyla hazırlanan özel karışım.",
      },
      {
        name: "Mandalin + Şeftali",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Mandalin + Şeftali Nargile sunumu",
        description: "Akdeniz mandalinasının taze narenciye aroması ile tatlı sulu şeftalinin ferahlatıcı dansı.",
      },
      {
        name: "Ananas + Çilek + Karpuz",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Ananas + Çilek + Karpuz Nargile sunumu",
        description: "Tropikal ananas, tatlı çilek ve sulu karpuz üçlüsünün yaz esintisi getiren ferahlatıcı meyve şöleni.",
      },
      {
        name: "Şeftali + Dominik + Tatlı",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Şeftali + Dominik + Tatlı Nargile sunumu",
        description: "Sulu şeftali, egzotik Dominik harmanı ve hafif tatlı notaların kadifemsi ve yoğun uyumu.",
      },
      {
        name: "Dominik + Şeftali",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Dominik + Şeftali Nargile sunumu",
        description: "Karayip esintili egzotik Dominik tütünü ve taze şeftali aromalarının yumuşak ve keyifli birleşimi.",
      },
      {
        name: "Ice Kola + Merlin",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Ice Kola + Merlin Nargile sunumu",
        description: "Buzlu kola serinliği ve Merlin aromasının mistik tatlı dokunuşuyla hazırlanmış özel harman.",
      },
      {
        name: "Çilek + Love 66",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Çilek + Love 66 Nargile sunumu",
        description: "Doğal çilek tatlılığı ve Love 66'nın ikonik mentol-kavun-çarkıfelek lezzetinin tazeleyici uyumu.",
      },
      {
        name: "Love 66 + Şeftali",
        detail: "Özel karışım nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Love 66 + Şeftali Nargile sunumu",
        description: "Popüler Love 66 lezzeti ile taze yaz şeftalisinin mükemmel dengelendiği tatlı ve ferahlatıcı duman.",
      },
    ],
  },
  {
    id: "duz-tutunler",
    icon: Wind,
    shortName: "Düz Tütünler",
    name: "Düz Tütünler",
    eyebrow: "Klasik ve saf tütün aromaları",
    items: [
      {
        name: "Anason",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Anason Nargile sunumu",
        description: "Geleneksel nargile tiryakilerinin vazgeçilmezi; yoğun, karakteristik ve saf anason aroması.",
      },
      {
        name: "Dejavu",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Dejavu Nargile sunumu",
        description: "Meyvemsi ve hafif egzotik notalarıyla öne çıkan, damakta kalıcı ve keyifli Dejavu lezzeti.",
      },
      {
        name: "Şeftali",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Şeftali Nargile sunumu",
        description: "Dalından yeni koparılmış sulu yaz şeftalisinin saf tatlılığı ve yoğun aroması.",
      },
      {
        name: "Limon Nane",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Limon Nane Nargile sunumu",
        description: "Ekşi limon ve ferahlatıcı taze nanenin kusursuz dengesi; hafif ve serinletici içim.",
      },
      {
        name: "Üzüm",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Üzüm Nargile sunumu",
        description: "Geleneksel olgun siyah üzümün zengin tatlılığı ve nostaljik nargile aroması.",
      },
      {
        name: "Cappuccino",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Cappuccino Nargile sunumu",
        description: "Kremamsı süt köpüğü ve kavrulmuş kahve çekirdeği aromasıyla sıcak ve doyurucu tütün.",
      },
      {
        name: "Nakhla Cappuccino",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Nakhla Cappuccino Nargile sunumu",
        description: "Hakiki Nakhla reçetesine sahip yoğun ve sert kahve lezzeti, gerçek kahve tiryakilerine özel.",
      },
      {
        name: "Bisküvi",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Bisküvi Nargile sunumu",
        description: "Fırından yeni çıkmış tereyağlı bisküvinin tatlı, sıcak ve nostaljik lezzeti.",
      },
      {
        name: "Nane",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Nane Nargile sunumu",
        description: "Buz gibi taze nane yapraklarının ferahlatıcı ve canlandırıcı saf aroması.",
      },
      {
        name: "İzmir Romantik",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "İzmir Romantik Nargile sunumu",
        description: "Tatlı kavun ve meyve harmanı ile Ege romantizmini yansıtan efsanevi aroma.",
      },
      {
        name: "Merlin Moro",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Merlin Moro Nargile sunumu",
        description: "Özel yaban mersini ve orman meyveleri aromasıyla zengin, tatlı ve koyu renkli lezzet.",
      },
      {
        name: "Mango",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Mango Nargile sunumu",
        description: "Tropik adaların sulu ve tatlı mangosunun büyüleyici egzotik aroması.",
      },
      {
        name: "Dondurma",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Dondurma Nargile sunumu",
        description: "Kadifemsi vanilyalı sütlü dondurma kıvamında yumuşak ve serinletici duman.",
      },
      {
        name: "Buz",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Buz Nargile sunumu",
        description: "Ekstra ferahlık arayanlar için kristalize buz etkisi ve buz gibi duman hissi.",
      },
      {
        name: "Schweppes",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Schweppes Nargile sunumu",
        description: "Gazlı tonik ve turunçgil lezzetinin ferahlatıcı, canlandırıcı tütün yorumu.",
      },
      {
        name: "Çilek",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Çilek Nargile sunumu",
        description: "Mis kokulu taze çileklerin doğal tatlılığı ile keyifli ve yumuşak içimli nargile.",
      },
      {
        name: "Karpuz",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Karpuz Nargile sunumu",
        description: "Yaz mevsiminin vazgeçilmezi sulu ve tatlı karpuzun ferahlatıcı saf lezzeti.",
      },
      {
        name: "Tatlı",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Tatlı Nargile sunumu",
        description: "Hafif karamel ve vanilya esintileri taşıyan tatlı ve yumuşak içimli özel tütün.",
      },
      {
        name: "Red Bull",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Red Bull Nargile sunumu",
        description: "Klasik enerji içeceği aromasının yoğun ve canlandırıcı nargile dumanıyla buluşması.",
      },
      {
        name: "Damla Sakız",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Damla Sakız Nargile sunumu",
        description: "Sakız Adası'nın geleneksel ve otantik damla sakızı kokusunu taşıyan özel aroma.",
      },
      {
        name: "Tarçın Sakız",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Tarçın Sakız Nargile sunumu",
        description: "Sıcak aromatik tarçın ve sakızın damakta iz bırakan baharatlı nefis uyumu.",
      },
      {
        name: "Ananas",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Ananas Nargile sunumu",
        description: "Tropik lezzet klasiği ananasın tatlı ve hafif mayhoş tazeleyici dumanı.",
      },
      {
        name: "Ice Kola",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Ice Kola Nargile sunumu",
        description: "Buz kristalleriyle harmanlanmış serinletici ve ferah kola aroması.",
      },
      {
        name: "Dominik",
        detail: "Klasik tek çeşit nargile tütünü",
        price: 400,
        image: "/images/nargile.jpg",
        imageAlt: "Dominik Nargile sunumu",
        description: "Dominik Cumhuriyeti'nin tropikal egzotik meyve harmanından esinlenen imza lezzet.",
      },
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
                src={logoUrl}
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
          <a
            href="#kahvalti"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("kahvalti");
            }}
            aria-label="Menüye geç"
            className="mt-8 inline-block rounded-full p-2 text-primary transition-colors hover:text-gold-light"
          >
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
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory(category.id);
                      smoothScrollTo(category.id);
                    }}
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
                        <TiltReveal key={`${category.id}-${item.name}`} index={itemIndex} className="h-full">
                          <article className="h-full">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedItem(item);
                                setSheetOpen(true);
                              }}
                              aria-label={`${item.name} detayları`}
                              className="menu-card group flex h-28 sm:h-32 w-full items-stretch overflow-hidden rounded-xl border border-border bg-card p-0 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary cursor-pointer"
                            >
                              <div className="relative w-28 sm:w-36 shrink-0 overflow-hidden bg-secondary">
                                <img
                                  src={item.image}
                                  alt={item.imageAlt}
                                  loading="lazy"
                                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${itemIndex % 3 === 1 ? "object-[65%_center]" : itemIndex % 3 === 2 ? "object-[35%_center]" : "object-center"}`}
                                />
                                <div className="absolute inset-0 bg-image-shade pointer-events-none" aria-hidden="true" />
                              </div>
                              <div className="flex min-w-0 flex-1 items-center justify-between gap-3 p-3.5 sm:p-5">
                                <div className="min-w-0 flex-1">
                                  <h3 className="truncate font-display text-base font-semibold leading-snug text-card-foreground sm:text-lg">
                                    {item.name}
                                  </h3>
                                  <p className="mt-1 line-clamp-1 text-xs leading-5 text-muted-foreground sm:text-sm">
                                    {item.detail ?? "Özenle hazırlanır"}
                                  </p>
                                </div>
                                <span className="price-tag shrink-0 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-bold text-gold-light sm:text-sm">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            </button>
                          </article>
                        </TiltReveal>
                      ))}
                    </div>
                  </section>
                  {category.id === "tatlilar" && (() => {
                    const featured = category.items.find((i) => i.name === "San Sebastian");
                    return featured ? (
                      <SignatureZoom
                        name={featured.name}
                        tagline="İmza Tatlı · Şefin favorisi"
                        image={featured.image}
                        price={featured.price}
                        onSelect={() => {
                          setSelectedItem(featured);
                          setSheetOpen(true);
                        }}
                      />
                    ) : null;
                  })()}
                </Fragment>
              );
            })}
          </div>
        </div>

        <footer className="relative border-t border-border bg-card/50 px-5 py-12 text-center">
          <img
            src={logoUrl}
            alt=""
            aria-hidden="true"
            width={1448}
            height={1086}
            loading="lazy"
            className="mx-auto mb-3 h-16 w-auto object-contain opacity-90 drop-shadow-md"
          />
          <p className="font-display text-xl text-foreground">Protokol Lounge</p>
          <p className="mt-2 text-xs text-muted-foreground">Afiyet olsun.</p>
        </footer>
      </main>
      <ItemBottomSheet item={selectedItem} />
    </Drawer>
  );
}
