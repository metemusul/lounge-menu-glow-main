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
      { name: "Menemen", detail: "Kaşarlı · Kavurmalı", price: 180, image: "/__l5e/assets-v1/5e7fd50d-8919-4903-82ca-d6c10fbda435/menu-item-0.jpg", imageAlt: "Menemen sunumu" },
      { name: "Kaşarlı Tost", price: 220, image: "/__l5e/assets-v1/75186d0c-07c9-4f14-b80c-213ba1057cf8/menu-item-1.jpg", imageAlt: "Kaşarlı Tost sunumu" },
      { name: "Karışık Tost", price: 280, image: "/__l5e/assets-v1/0a3f7407-dd68-4bf9-a4eb-8da0e0daa73b/menu-item-2.jpg", imageAlt: "Karışık Tost sunumu" },
      { name: "Gözleme", detail: "Peynirli · Patatesli", price: 210, image: "/__l5e/assets-v1/3160a84e-36f4-46aa-8a78-66a27c6df9e7/menu-item-3.jpg", imageAlt: "Gözleme sunumu" },
    ],
  },
  {
    id: "ana-yemekler",
    icon: UtensilsCrossed,
    shortName: "Ana Yemekler",
    name: "Ana Yemekler",
    eyebrow: "Mutfağın imza tabakları",
    items: [
      { name: "Köri Soslu Tavuk", price: 300, image: "/__l5e/assets-v1/48ddf2b6-e643-49bb-b568-4c653d99eb01/menu-item-4.jpg", imageAlt: "Köri Soslu Tavuk sunumu" },
      { name: "Soya Soslu Tavuk", price: 300, image: "/__l5e/assets-v1/c6c25d91-f2e6-4a97-8af8-79196d83dd1e/menu-item-5.jpg", imageAlt: "Soya Soslu Tavuk sunumu" },
      { name: "Barbekü Soslu Tavuk", price: 300, image: "/__l5e/assets-v1/a9296d91-c2c1-4a42-9b26-6d29049a247a/menu-item-6.jpg", imageAlt: "Barbekü Soslu Tavuk sunumu" },
      { name: "Penne Alfredo", price: 240, image: "/__l5e/assets-v1/e34f2f9c-220e-4624-9c73-27f223a1e8eb/menu-item-7.jpg", imageAlt: "Penne Alfredo sunumu" },
      { name: "Penne Arrabbiata", price: 240, image: "/__l5e/assets-v1/e8254536-736c-4954-8549-d074ae95fa4a/menu-item-8.jpg", imageAlt: "Penne Arrabbiata sunumu" },
      { name: "Fettuccine Alfredo", price: 280, image: "/__l5e/assets-v1/206de2a2-37da-460c-9245-a590bfd1416e/menu-item-9.jpg", imageAlt: "Fettuccine Alfredo sunumu" },
      { name: "Köri Soslu Penne", price: 280, image: "/__l5e/assets-v1/c96e1eca-c968-4836-b671-5108335b2ea1/menu-item-10.jpg", imageAlt: "Köri Soslu Penne sunumu" },
    ],
  },
  {
    id: "atistirmaliklar",
    icon: Popcorn,
    shortName: "Atıştırmalık",
    name: "Atıştırmalıklar",
    eyebrow: "Sohbete eşlik eden lezzetler",
    items: [
      { name: "Patates Tava", image: "/__l5e/assets-v1/55de6361-5e96-45bf-ab51-2cacba5d77b8/menu-item-11.jpg", imageAlt: "Patates Tava sunumu" },
      { name: "Sosis & Patates", image: "/__l5e/assets-v1/53e5faf3-d8ce-45f6-8c51-c59f0e150ff1/menu-item-12.jpg", imageAlt: "Sosis & Patates sunumu" },
      { name: "Crispy Party", image: "/__l5e/assets-v1/8ed24d9c-cce7-4a46-bc38-908b4b4c4f2f/menu-item-13.jpg", imageAlt: "Crispy Party sunumu" },
      { name: "Sigara Böreği", image: "/__l5e/assets-v1/60af0060-213f-4ded-909a-bfdc3bf9efa3/menu-item-14.jpg", imageAlt: "Sigara Böreği sunumu" },
    ],
  },
  {
    id: "tatlilar",
    icon: CakeSlice,
    shortName: "Tatlılar",
    name: "Tatlılar",
    eyebrow: "Gecenin tatlı finali",
    items: [
      { name: "Sufle", price: 240, image: "/__l5e/assets-v1/2a5c87f6-9b18-4d34-83f4-315d2c53cd1e/menu-item-15.jpg", imageAlt: "Sufle sunumu" },
      { name: "Fıstık Rüyası", price: 220, image: "/__l5e/assets-v1/6c29aa8a-94d1-4f8b-97be-12f3e0e77f91/menu-item-16.jpg", imageAlt: "Fıstık Rüyası sunumu" },
      { name: "San Sebastian", price: 220, image: "/__l5e/assets-v1/56d5055c-c7cc-470d-8e4d-6510cd7ec98e/menu-item-17.jpg", imageAlt: "San Sebastian sunumu" },
      { name: "Limonlu Cheesecake", price: 220, image: "/__l5e/assets-v1/1dd0e097-a0f1-457c-a10a-9e3590b5d15a/menu-item-18.jpg", imageAlt: "Limonlu Cheesecake sunumu" },
      { name: "Frambuazlı Cheesecake", price: 220, image: "/__l5e/assets-v1/cc687eb1-efb0-4973-a756-10ed2c9b48b6/menu-item-19.jpg", imageAlt: "Frambuazlı Cheesecake sunumu" },
      { name: "Brownie", price: 270, image: "/__l5e/assets-v1/fe003a25-34ec-4149-b2e4-e687835930b1/menu-item-20.jpg", imageAlt: "Brownie sunumu" },
      { name: "Tiramisu", price: 220, image: "/__l5e/assets-v1/c039b08e-862c-492c-ba3e-8153e968a4d7/menu-item-21.jpg", imageAlt: "Tiramisu sunumu" },
      { name: "Cup Tatlı", image: "/__l5e/assets-v1/8904b685-5f2f-40af-965f-8ae7d2592202/menu-item-22.jpg", imageAlt: "Cup Tatlı sunumu" },
    ],
  },
  {
    id: "soguk-icecekler",
    icon: CupSoda,
    shortName: "Soğuk İçecekler",
    name: "Soğuk İçecekler",
    eyebrow: "Serin ve ferah",
    items: [
      { name: "Kola", price: 100, image: "/__l5e/assets-v1/35eac46a-4260-4c6d-8562-25b00abeeeaa/menu-item-23.jpg", imageAlt: "Kola sunumu" },
      { name: "Fuse Tea", price: 100, image: "/__l5e/assets-v1/ea982f1d-3f43-43c2-b315-c2aa885c9208/menu-item-24.jpg", imageAlt: "Fuse Tea sunumu" },
      { name: "Churchill", price: 90, image: "/__l5e/assets-v1/17d8ed38-bef4-4b1d-a513-440c127b090d/menu-item-25.jpg", imageAlt: "Churchill sunumu" },
      { name: "Ayran", price: 70, image: "/__l5e/assets-v1/af935aaa-8e1f-4ff4-8779-3fd0dffefabe/menu-item-26.jpg", imageAlt: "Ayran sunumu" },
      { name: "Meyveli Soda", price: 60, image: "/__l5e/assets-v1/1e78a90a-f629-4d2f-8787-80198054b540/menu-item-27.jpg", imageAlt: "Meyveli Soda sunumu" },
      { name: "Soda", price: 50, image: "/__l5e/assets-v1/4a6094f3-5a6b-4d9c-81cf-28baa8805ee3/menu-item-28.jpg", imageAlt: "Soda sunumu" },
      { name: "Su", price: 40, image: "/__l5e/assets-v1/af19c118-3c27-4b3e-b9f3-119be23c1447/menu-item-29.jpg", imageAlt: "Su sunumu" },
      { name: "Red Bull", price: 130, image: "/__l5e/assets-v1/76bdf2fa-3715-4e8c-8f01-9f03f8b82800/menu-item-30.jpg", imageAlt: "Red Bull sunumu" },
      { name: "Meyfit Solo", image: "/__l5e/assets-v1/f4398f75-0a0c-4ab2-adfc-ec9a88f06f37/menu-item-31.jpg", imageAlt: "Meyfit Solo sunumu" },
      { name: "Cappy", image: "/__l5e/assets-v1/15ebe9cd-0666-483f-81c4-e16f4c3dcfed/menu-item-32.jpg", imageAlt: "Cappy sunumu" },
    ],
  },
  {
    id: "frozen",
    icon: Cherry,
    shortName: "Frozen",
    name: "Frozen",
    eyebrow: "Meyvenin buz gibi hali",
    items: [
      { name: "Çilek", price: 180, image: "/__l5e/assets-v1/7667c057-6e27-4821-9930-2386953ba875/menu-item-33.jpg", imageAlt: "Çilek sunumu" },
      { name: "Mango", price: 180, image: "/__l5e/assets-v1/f6ef72ea-1d9b-41ac-aae7-26dcbd38a029/menu-item-34.jpg", imageAlt: "Mango sunumu" },
      { name: "Kavun", price: 180, image: "/__l5e/assets-v1/ad2d5ec2-322b-44a1-9a74-99e5acc8f268/menu-item-35.jpg", imageAlt: "Kavun sunumu" },
      { name: "Karpuz", price: 180, image: "/__l5e/assets-v1/f9650e86-3287-401f-8075-1a78f915c6f9/menu-item-36.jpg", imageAlt: "Karpuz sunumu" },
      { name: "Ananas", price: 180, image: "/__l5e/assets-v1/ceac3963-0339-4f76-ac8f-6b5041a64401/menu-item-37.jpg", imageAlt: "Ananas sunumu" },
      { name: "Elma", price: 180, image: "/__l5e/assets-v1/afca3ef0-82db-4b95-b8cb-eb76b9ef9d29/menu-item-38.jpg", imageAlt: "Elma sunumu" },
      { name: "Orman Meyveleri", price: 180, image: "/__l5e/assets-v1/17e43d6e-c02d-494a-b44b-e5c8088615b2/menu-item-39.jpg", imageAlt: "Orman Meyveleri sunumu" },
    ],
  },
  {
    id: "ozel-icecekler",
    icon: Martini,
    shortName: "Özel İçecekler",
    name: "Taze Sıkma & Özel İçecekler",
    eyebrow: "Canlandıran özel karışımlar",
    items: [
      { name: "Sıkma Portakal", price: 250, image: "/__l5e/assets-v1/c9d908b3-4962-463e-832d-02e1f9e23520/menu-item-40.jpg", imageAlt: "Sıkma Portakal sunumu" },
      { name: "Mojito", price: 200, image: "/__l5e/assets-v1/f00e735f-b470-4dc4-9449-8373f0067cb0/menu-item-41.jpg", imageAlt: "Mojito sunumu" },
      { name: "Rainbow Mojito", price: 200, image: "/__l5e/assets-v1/33958db8-bf48-4926-a75e-c78850643a4f/menu-item-42.jpg", imageAlt: "Rainbow Mojito sunumu" },
      { name: "Limonata", image: "/__l5e/assets-v1/2a4c907e-a3dd-4676-8a88-d4394337c92a/menu-item-43.jpg", imageAlt: "Limonata sunumu" },
      { name: "Çilekli Limonata", image: "/__l5e/assets-v1/0d430323-45e8-437f-87f3-59166c5ebfe4/menu-item-44.jpg", imageAlt: "Çilekli Limonata sunumu" },
      { name: "Naneli Limonata", image: "/__l5e/assets-v1/de1ddb67-3058-4c54-bd8e-8c30738cff7f/menu-item-45.jpg", imageAlt: "Naneli Limonata sunumu" },
    ],
  },
  {
    id: "milkshake",
    icon: Milk,
    shortName: "Milkshake",
    name: "Milkshake",
    eyebrow: "Yoğun, kremsi, serin",
    items: [
      { name: "Çilek", price: 200, image: "/__l5e/assets-v1/44458aaa-1ba0-474b-8a66-ceff578e415b/menu-item-46.jpg", imageAlt: "Çilek sunumu" },
      { name: "Muz", price: 200, image: "/__l5e/assets-v1/8e408169-85a9-4d47-bdbf-2d86e6892311/menu-item-47.jpg", imageAlt: "Muz sunumu" },
      { name: "Vanilya", price: 200, image: "/__l5e/assets-v1/1f4b9514-e698-4a14-8916-7343471f6da7/menu-item-48.jpg", imageAlt: "Vanilya sunumu" },
      { name: "Karamel", price: 200, image: "/__l5e/assets-v1/381c6608-3e64-44af-9c15-29a7faeb1b52/menu-item-49.jpg", imageAlt: "Karamel sunumu" },
      { name: "Çikolata", price: 200, image: "/__l5e/assets-v1/bf5e5b78-0870-4f61-b27c-20d55da16a1c/menu-item-50.jpg", imageAlt: "Çikolata sunumu" },
    ],
  },
  {
    id: "caylar",
    icon: Leaf,
    shortName: "Çaylar",
    name: "Çaylar",
    eyebrow: "Deminde ve huzurlu",
    items: [
      { name: "Çay", price: 40, image: "/__l5e/assets-v1/8a256601-85b9-43f8-bcf9-6dcf6ad8403a/menu-item-51.jpg", imageAlt: "Çay sunumu" },
      { name: "Fincan Çay", price: 70, image: "/__l5e/assets-v1/436f1717-dfe0-4d77-b06b-72b75ebd80a2/menu-item-52.jpg", imageAlt: "Fincan Çay sunumu" },
      { name: "Bitki Çayları", detail: "Kış Çayı · Ihlamur · Papatya · Nane-Limon · Ada Çayı · Kuşburnu · Elma-Tarçın", price: 180, image: "/__l5e/assets-v1/eaba38ed-3617-4dd0-b2a1-a926fb9fc28a/menu-item-53.jpg", imageAlt: "Bitki Çayları sunumu" },
    ],
  },
  {
    id: "turk-kahvesi",
    icon: Coffee,
    shortName: "Türk Kahvesi",
    name: "Türk Kahvesi & Sıcak İçecekler",
    eyebrow: "Gelenekten gelen ritüel",
    items: [
      { name: "Türk Kahvesi", price: 100, image: "/__l5e/assets-v1/85c6a46f-faeb-4bca-9a59-247b1ce8754e/menu-item-54.jpg", imageAlt: "Türk Kahvesi sunumu" },
      { name: "Double Türk Kahvesi", price: 150, image: "/__l5e/assets-v1/9828aaba-40d0-4af7-9cdd-8dc2b2cb4a2d/menu-item-55.jpg", imageAlt: "Double Türk Kahvesi sunumu" },
      { name: "Sütlü Türk Kahvesi", price: 100, image: "/__l5e/assets-v1/ce89d7ea-1bd3-419e-b91e-e781a56e269d/menu-item-56.jpg", imageAlt: "Sütlü Türk Kahvesi sunumu" },
      { name: "Double Sütlü Türk Kahvesi", price: 170, image: "/__l5e/assets-v1/e86e3ebb-aff4-42ae-970a-758def475fd4/menu-item-57.jpg", imageAlt: "Double Sütlü Türk Kahvesi sunumu" },
      { name: "Damla Sakızlı Türk Kahvesi", price: 100, image: "/__l5e/assets-v1/ac895ca6-5ac7-49ee-b448-a913f19738ba/menu-item-58.jpg", imageAlt: "Damla Sakızlı Türk Kahvesi sunumu" },
      { name: "Double Damla Sakızlı Türk Kahvesi", price: 150, image: "/__l5e/assets-v1/94904a71-359f-4093-9e06-e9360674fa7e/menu-item-59.jpg", imageAlt: "Double Damla Sakızlı Türk Kahvesi sunumu" },
      { name: "Süvari Türk Kahvesi", price: 150, image: "/__l5e/assets-v1/55158ae5-5b92-477c-8a07-a489b34dd92d/menu-item-60.jpg", imageAlt: "Süvari Türk Kahvesi sunumu" },
      { name: "Dibek Kahvesi", price: 120, image: "/__l5e/assets-v1/e7955462-dd42-4431-b39d-4b1d82674e61/menu-item-61.jpg", imageAlt: "Dibek Kahvesi sunumu" },
      { name: "Double Dibek", price: 160, image: "/__l5e/assets-v1/02b200e0-6f02-41c7-b9b7-aa7b6fe20aea/menu-item-62.jpg", imageAlt: "Double Dibek sunumu" },
      { name: "Menengiç", price: 120, image: "/__l5e/assets-v1/8653ff93-fe8d-4957-b73c-663e951ba21a/menu-item-63.jpg", imageAlt: "Menengiç sunumu" },
      { name: "Double Menengiç", price: 160, image: "/__l5e/assets-v1/09d670e9-ad1d-446c-b4c6-1426e851fd01/menu-item-64.jpg", imageAlt: "Double Menengiç sunumu" },
      { name: "Salep", price: 150, image: "/__l5e/assets-v1/45bfbd6d-075b-486d-afa0-45cc13c21ae2/menu-item-65.jpg", imageAlt: "Salep sunumu" },
      { name: "Çikolatalı Salep", price: 150, image: "/__l5e/assets-v1/20477b5f-e7d7-4885-b419-bfd8795a7593/menu-item-66.jpg", imageAlt: "Çikolatalı Salep sunumu" },
      { name: "Sıcak Çikolata", price: 150, image: "/__l5e/assets-v1/2f5142cb-099c-4921-b3e5-2e34fbb05742/menu-item-67.jpg", imageAlt: "Sıcak Çikolata sunumu" },
      { name: "Beyaz Sıcak Çikolata", price: 150, image: "/__l5e/assets-v1/90ec3f35-fcdb-4ed8-aa6d-c0e3cfbe16f8/menu-item-68.jpg", imageAlt: "Beyaz Sıcak Çikolata sunumu" },
      { name: "Fincan Süt", price: 130, image: "/__l5e/assets-v1/a02318b2-3213-4605-80b2-c0992b03b106/menu-item-69.jpg", imageAlt: "Fincan Süt sunumu" },
      { name: "Nescafe", image: "/__l5e/assets-v1/d240b5a3-7898-444f-a978-8583435440ab/menu-item-70.jpg", imageAlt: "Nescafe sunumu" },
    ],
  },
  {
    id: "espresso",
    icon: Bean,
    shortName: "Espresso",
    name: "Espresso & Sıcak Kahveler",
    eyebrow: "Ustalıkla hazırlanan kahveler",
    items: [
      { name: "Espresso Single", price: 100, image: "/__l5e/assets-v1/d78bf674-2a40-410d-aa03-e9e8e33c23be/menu-item-71.jpg", imageAlt: "Espresso Single sunumu" },
      { name: "Espresso Double", price: 120, image: "/__l5e/assets-v1/f66ec3eb-8c57-4976-b62d-83cafc8246e1/menu-item-72.jpg", imageAlt: "Espresso Double sunumu" },
      { name: "Americano", price: 150, image: "/__l5e/assets-v1/16fa3ed1-8ef8-4ed8-ba90-3260ab8a23d4/menu-item-73.jpg", imageAlt: "Americano sunumu" },
      { name: "Cafe Latte", price: 160, image: "/__l5e/assets-v1/c5f45c0a-e690-41f1-a71e-c3656bd8541d/menu-item-74.jpg", imageAlt: "Cafe Latte sunumu" },
      { name: "Flat White", price: 150, image: "/__l5e/assets-v1/bad254e1-fc4c-4a68-960c-39f5f226c673/menu-item-75.jpg", imageAlt: "Flat White sunumu" },
      { name: "Mocha", price: 170, image: "/__l5e/assets-v1/23f14bf2-becf-421d-8875-ebac24d4a74b/menu-item-76.jpg", imageAlt: "Mocha sunumu" },
      { name: "White Mocha", price: 170, image: "/__l5e/assets-v1/d8c3931b-800f-4bb6-a39b-4d72dff73773/menu-item-77.jpg", imageAlt: "White Mocha sunumu" },
      { name: "Caramel Latte", price: 170, image: "/__l5e/assets-v1/28679ffb-57d6-4384-9402-c61e1c129249/menu-item-78.jpg", imageAlt: "Caramel Latte sunumu" },
      { name: "Cappuccino", price: 160, image: "/__l5e/assets-v1/6cf32b0e-5c90-40c2-ba4d-a4b25d3946a6/menu-item-79.jpg", imageAlt: "Cappuccino sunumu" },
      { name: "Lotus Latte", price: 170, image: "/__l5e/assets-v1/b3ddd266-1f1f-499e-b9c4-bd0671cf7590/menu-item-80.jpg", imageAlt: "Lotus Latte sunumu" },
      { name: "Cookie Latte", price: 170, image: "/__l5e/assets-v1/a2c785f9-f545-40cd-a9d5-45ac09174fef/menu-item-81.jpg", imageAlt: "Cookie Latte sunumu" },
      { name: "Filtre Kahve", price: 170, image: "/__l5e/assets-v1/d1d31cc5-fe68-4180-a2ce-56ef49529446/menu-item-82.jpg", imageAlt: "Filtre Kahve sunumu" },
    ],
  },
  {
    id: "ice-coffee",
    icon: Citrus,
    shortName: "Ice Coffee",
    name: "Ice Coffee",
    eyebrow: "Soğuk kahve koleksiyonu",
    items: [
      { name: "Ice Latte", price: 210, image: "/__l5e/assets-v1/15b9d971-f2cb-40b4-a705-2209be91ecc9/menu-item-83.jpg", imageAlt: "Ice Latte sunumu" },
      { name: "Ice Mocha", price: 210, image: "/__l5e/assets-v1/ac6162fa-3725-46b6-a5c2-ae3337f08095/menu-item-84.jpg", imageAlt: "Ice Mocha sunumu" },
      { name: "Ice Caramel Latte", price: 210, image: "/__l5e/assets-v1/b1ce6855-b180-40f5-89da-c09884ea522c/menu-item-85.jpg", imageAlt: "Ice Caramel Latte sunumu" },
      { name: "Ice Americano", price: 210, image: "/__l5e/assets-v1/89ed7fe1-558c-4997-8acb-9ef6c8551187/menu-item-86.jpg", imageAlt: "Ice Americano sunumu" },
      { name: "Cool Lime", price: 210, image: "/__l5e/assets-v1/f01ab8c5-6f48-4c4c-ad8b-fd56aee94bd0/menu-item-87.jpg", imageAlt: "Cool Lime sunumu" },
      { name: "Red Berries", price: 210, image: "/__l5e/assets-v1/7ac3827a-ab45-40f2-8644-4ac41c9c4cc8/menu-item-88.jpg", imageAlt: "Red Berries sunumu" },
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
