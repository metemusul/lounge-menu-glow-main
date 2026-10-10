# Protokol Lounge Menu

Act as an expert UI/UX Designer and Frontend Developer. I need you to build a premium, ultra-modern, and mobile-first QR Menu Web Application for a high-end cafe and restaurant named "Protokol Lounge". 

The design should reflect 2027 web design trends, offering a luxurious, sleek, and highly professional user experience. Avoid any outdated layouts (no basic accordions or old-school tables). 

### 1. Design System & Theme (Premium Lounge Vibe)
- **Color Palette:** Implement a sophisticated "Dark Mode" theme. Use deep blacks and charcoal grays (e.g., #121212, #1A1A1A) for the background. Use Gold/Bronze accents (e.g., #D4AF37, #E5C158) for active states, buttons, prices, and highlights to match our brand logo. Text should be off-white and light gray for high readability.
- **Typography:** Use an elegant font pairing. For example, 'Playfair Display' or 'Cinzel' for category headings to give a luxury feel, and 'Inter' or 'Montserrat' for the menu items and descriptions for modern readability.
- **Logo:** I will provide a logo file named "logo.png" (a 3D golden 'PL' typography). Place this logo elegantly at the top center of the homepage (Hero section) with a subtle glowing or floating animation.
- **UI Elements:** Use soft rounded corners (border-radius), glassmorphism effects for sticky headers, and smooth fade-in animations when scrolling. 

### 2. Layout & Navigation (Mobile-First)
- The app must be 100% optimized for mobile devices since it's a QR menu.
- **Sticky Category Bar:** At the top of the screen (just below the hero/logo section), create a horizontally scrollable, sticky navigation bar with category names and minimal icons (e.g., 🍳 Breakfast, 🍗 Main Courses, 🍰 Desserts). When a user taps a category, the page should smooth-scroll to that section.
- **Menu Item Cards:** Each menu item should be displayed in a modern, sleek card layout. 
  - Layout: High-quality image on the left or top, Item Name, and a dedicated Price Tag aligned to the right.
  - **Price Placeholders:** Since prices are not determined yet, design a beautiful price tag UI but use "₺ --" as the placeholder text. The UI must be ready for prices to be added later.

### 3. Images (Placeholders)
- I don't have original photos yet. Please use the Unsplash API to automatically fetch high-quality, appetizing, and professional food/drink placeholder images matching the names of the items. Do not leave the image areas empty.

### 4. Menu Content Structure (Data)
Please structure the application using the following menu data. Populate the UI with these categories and items:

1. 🍳 KAHVALTI (Breakfast):
- Menemen (Kaşarlı, Kavurmalı)
- Tost (Kaşarlı, Karışık)
- Gözleme (Peynirli, Patatesli)

2. 🍗 ANA YEMEKLER (Main Courses):
- Köri Soslu Tavuk
- Soya Soslu Tavuk
- Barbekü Soslu Tavuk
- Penne Alfredo
- Penne Arrabbiata
- Fettuccine Alfredo
- Köri Soslu Penne

3. 🍟 ATIŞTIRMALIKLAR (Snacks):
- Patates Tava
- Sosis & Patates
- Crispy Party
- Sigara Böreği

4. 🍰 TATLILAR (Desserts):
- Sufle, Fıstık Rüyası, San Sebastian, Limonlu Cheesecake, Frambuazlı Cheesecake, Brownie, Tiramisu, Cup Tatlı

5. 🥤 SOĞUK İÇECEKLER (Cold Drinks):
- Kola, Soda, Ayran, Churchill, Red Bull
- Fuse Tea (Ananas, Karpuz, Limon, Şeftali)
- Meyfit Solo (Çilek, Limon, Elma, Ananas)
- Cappy (Vişne, Şeftali, Karışık)

6. 🍓 FROZEN:
- Çilek, Mango, Kavun, Karpuz, Ananas, Elma, Orman Meyveleri

7. 🍹 TAZE SIKMA & ÖZEL İÇECEKLER (Fresh & Special Drinks):
- Portakal, Limonata, Çilekli Limonata, Naneli Limonata, Mojito, Rainbow Mojito

8. 🥛 MILKSHAKE:
- Çilek, Muz, Vanilya, Karamel, Çikolata

9. 🍵 ÇAYLAR (Teas):
- Çay, Fincan Çay, Kış Çayı, Ihlamur, Papatya, Nane-Limon, Ada Çayı, Kuşburnu, Elma-Tarçın

10. ☕ TÜRK KAHVESİ & SICAK İÇECEKLER (Turkish Coffee & Hot Drinks):
- Türk Kahvesi, Aromalı Türk Kahvesi, Dibek Kahvesi, Menengiç, Sıcak Çikolata, Double Türk, Double Dibek, Nescafe, Salep, Damla Sakızlı Salep, Aromalı Sıcak Çikolata (Muz, Çilek, Karamel)

11. ☕ ESPRESSO & SICAK KAHVELER (Espresso & Hot Coffees):
- Espresso Single, Espresso Double, Americano, Cafe Latte, Flat White, Mocha, White Mocha, Caramel Latte, Cappuccino, Lotus Latte, Cookie Latte

12. 🧊 ICE COFFEE:
- Ice Latte, Ice Mocha, Ice Caramel Latte, Ice Americano, Cool Lime, Red Berries

Deliver a fully functional, interactive, and beautifully styled frontend with React and Tailwind CSS. Ensure the scrolling is smooth and the dark/gold aesthetic is extremely polished.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a754544b-ab37-4883-a6bd-6020a19a7986).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
