# ALQAIRA Wholesale

B2B wholesale site for ALQAIRA — thobes, jubbas, kurta pajama, pathani suits, Nehru jackets, abayas and kids'
wear, sold to boutiques and resellers **by the size-set pack**.

Same stack and folder pattern as DuoStack: Vite + React (JSX) + Tailwind + framer-motion, no backend.
Orders and trade-account applications go to the wholesale desk as pre-filled WhatsApp messages.

```
alqaira-wholesale/
├── public/            images (products/, banners/), wordmark, favicon, robots.txt, manifest
├── scripts/           generate-sitemap.mjs (runs after vite build)
└── src/
    ├── App.jsx        routes + global drawers
    ├── main.jsx
    ├── components/    Nav, TopBar, Footer, Logo, Drawer, ProductCard, ProductDrawer,
    │                  OrderSheet, OrderDock, QtyStepper, TierMeter
    ├── context/       OrderContext — the order sheet (cart), tier maths, WhatsApp + CSV export
    ├── data/          business.js (terms, tiers, contact) · products.js · categories.js · faq.js
    ├── pages/         Home, Catalogue, QuickOrder, Apply, NotFound
    ├── sections/      Hero, BuyerStrip, Categories, LineSheet, Process, Pricing,
    │                  PrivateLabel, Faq, Apply
    └── styles/        index.css
```

## Run

```bash
npm install
npm run dev        # http://localhost:5175
npm run build      # dist/ + sitemap.xml
```

## How wholesale works on this site

Researched against B2B apparel practice (Faire, FashionGo, JOOR, RepSpark MOQ guides, Indian thobe wholesalers):

| Feature | Where |
|---|---|
| **Size-set packs** — 1 pack = 1 piece of every size in the run (thobe 52–60, kurta S–XXL, kids 2Y–12Y) | `data/categories.js` → `sizeRuns` |
| **MOQ per style** = one pack; flagged in the order sheet if a style is short | `OrderContext.jsx` |
| **Order minimum** (₹ value) across mixed styles | `data/business.js` → `MIN_ORDER_VALUE` |
| **Volume tiers on the whole order** (not per style), with a "add N more for X% off" meter | `data/business.js` → `tiers`, `components/TierMeter.jsx` |
| **Wholesale price + printed MRP + reseller margin** on every card | `components/ProductCard.jsx` |
| **Order by pack or size-by-size** | `components/ProductDrawer.jsx` |
| **Quick order grid** — every style on one screen for repeat buyers | `pages/QuickOrderPage.jsx` |
| **Order sheet** with GST, tier discount, buyer GSTIN → WhatsApp message or CSV | `components/OrderSheet.jsx` |
| **Trade-account application** with GSTIN validation | `sections/Apply.jsx` |
| **Private label** from 100 pcs/design | `sections/PrivateLabel.jsx` |

The order sheet and buyer details persist in `localStorage` for the visitor only.

## ⚠️ Before this goes live

1. **Every number in `src/data/business.js` and every price in `src/data/products.js` is a placeholder.**
   Minimum order, tier discounts, GST rate, payment and dispatch terms, prices, GSM — confirm each with the client.
   A wholesale buyer will hold them to a printed term.
2. **Phone / WhatsApp is set to `+91 761 809 4118`.** The email `wholesale@alqaira.com` is still a placeholder —
   confirm it in `business.js`.
3. **Product photos are AI-generated** (copied from the retail build). Replace with photographs of the real garments
   before taking an order — a bulk buyer who receives something unlike the photo returns the whole consignment.
4. There are **no testimonials, ratings or customer counts** on purpose. Add them only when real buyers wrote them.
5. Domain `wholesale.alqaira.com` is assumed in `index.html`, `robots.txt` and `scripts/generate-sitemap.mjs`.

## Design rules

Carried over from the retail build's `DESIGN.md`: navy + gold for chrome only, ivory product surfaces, Bodoni Moda +
Hanken Grotesk, 2px radius on controls, no card shadows, no decorative gradients, one gold element per screen.
