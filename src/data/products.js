/**
 * The wholesale line sheet.
 *
 * `price` is the per-piece wholesale price before tier discount and GST.
 * `mrp` is the suggested retail price we print on the tag — the gap is the
 * reseller's margin, and it is shown on every card because it is the number
 * a boutique owner actually decides on.
 *
 * ⚠️ Prices, GSM and dispatch times are PLACEHOLDERS. Confirm with the client.
 * ⚠️ The photographs are AI-generated, carried over from the retail build.
 *    Replace them with photos of the real garments before taking an order —
 *    a bulk buyer who receives something that does not match the photo returns
 *    the whole consignment.
 */

const gallery = (key) => [1, 2, 3, 4].map((n) => `/products/${key}-${n}.jpg`)

const READY = 'Ready stock'
const MTO = 'Made to order'

export const products = [
  // ─────────────── Men · Thobes & Jubbas ───────────────
  {
    code: 'AQ-TH-101',
    name: 'Saudi Thobe',
    category: 'thobe',
    audience: 'Men',
    run: 'thobe',
    colour: 'White',
    fabric: 'TR (terry-rayon) suiting',
    gsm: 160,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Stand collar, concealed placket, chest pocket, two side pockets, cuffed sleeve.',
    occasions: ['Friday', 'Everyday', 'Umrah & Travel'],
    price: 690,
    mrp: 1499,
    dispatch: READY,
    images: gallery('saudi')
  },
  {
    code: 'AQ-TH-102',
    name: 'Emirati Kandura',
    category: 'thobe',
    audience: 'Men',
    run: 'thobe',
    colour: 'White',
    fabric: 'Japanese polyester',
    gsm: 150,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Collarless neck with tarboosh loop, chest pocket, straight hem.',
    occasions: ['Eid', 'Friday', 'Everyday'],
    price: 740,
    mrp: 1599,
    dispatch: READY,
    images: gallery('emirati')
  },
  {
    code: 'AQ-TH-103',
    name: 'Omani Dishdasha',
    category: 'thobe',
    audience: 'Men',
    run: 'thobe',
    colour: 'White',
    fabric: 'Cotton-poly blend',
    gsm: 155,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Round collarless neck with tassel (furakha), side pockets.',
    occasions: ['Eid', 'Friday', 'Wedding & Nikah'],
    price: 780,
    mrp: 1699,
    dispatch: READY,
    images: gallery('omani')
  },
  {
    code: 'AQ-TH-104',
    name: 'Moroccan Embroidered Jubba',
    category: 'thobe',
    audience: 'Men',
    run: 'thobe',
    colour: 'Ivory / gold',
    fabric: 'Linen-look viscose',
    gsm: 180,
    opacity: 'Opaque',
    lining: 'Half-lined',
    details: 'Hand-finished gold zari on neck, placket and hem. Wide sleeve.',
    occasions: ['Eid', 'Wedding & Nikah'],
    price: 1450,
    mrp: 3299,
    dispatch: MTO,
    images: gallery('moroccan')
  },
  {
    code: 'AQ-TH-105',
    name: 'Designer Jubba',
    category: 'thobe',
    audience: 'Men',
    run: 'thobe',
    colour: 'Navy',
    fabric: 'Twill suiting',
    gsm: 190,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Band collar, tonal buttons, tailored shoulder, straight sleeve.',
    occasions: ['Eid', 'Wedding & Nikah', 'Friday'],
    price: 990,
    mrp: 2199,
    dispatch: READY,
    images: gallery('designer')
  },

  // ─────────────── Men · Sets & layers ───────────────
  {
    code: 'AQ-KP-201',
    name: 'Straight-cut Kurta Pajama',
    category: 'kurta',
    audience: 'Men',
    run: 'kurta',
    colour: 'Beige',
    fabric: 'Cotton slub',
    gsm: 140,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Knee-length kurta with side slits and matching drawstring pajama.',
    occasions: ['Friday', 'Everyday', 'Eid'],
    price: 620,
    mrp: 1299,
    dispatch: READY,
    images: gallery('straight')
  },
  {
    code: 'AQ-PS-301',
    name: 'Pathani Suit',
    category: 'pathani',
    audience: 'Men',
    run: 'kurta',
    colour: 'Bottle green',
    fabric: 'Cotton-poly blend',
    gsm: 170,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Shirt collar, epaulettes, chest pockets, with salwar.',
    occasions: ['Eid', 'Friday', 'Everyday'],
    price: 720,
    mrp: 1599,
    dispatch: READY,
    images: gallery('pathani')
  },
  {
    code: 'AQ-JK-401',
    name: 'Nehru Waistcoat',
    category: 'jacket',
    audience: 'Men',
    run: 'kurta',
    colour: 'Navy',
    fabric: 'Poly-viscose suiting',
    gsm: 220,
    opacity: 'Opaque',
    lining: 'Fully lined',
    details: 'Mandarin collar, five-button front, two welt pockets.',
    occasions: ['Wedding & Nikah', 'Eid'],
    price: 560,
    mrp: 1199,
    dispatch: READY,
    images: gallery('jacket')
  },

  // ─────────────── Women ───────────────
  {
    code: 'AQ-AB-501',
    name: 'Embroidered Open Abaya',
    category: 'abaya',
    audience: 'Women',
    run: 'abaya',
    colour: 'Black / gold',
    fabric: 'Nida',
    gsm: 130,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Open front with gold embroidered panels, wide sleeve, matching belt.',
    occasions: ['Eid', 'Wedding & Nikah', 'Umrah & Travel'],
    price: 1150,
    mrp: 2599,
    dispatch: MTO,
    images: gallery('women')
  },

  // ─────────────── Kids ───────────────
  {
    code: 'AQ-KD-601',
    name: 'Kids Saudi Thobe',
    category: 'kids',
    audience: 'Kids',
    run: 'kids',
    colour: 'White',
    fabric: 'TR (terry-rayon) suiting',
    gsm: 150,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Stand collar, concealed placket, chest pocket.',
    occasions: ['Eid', 'Friday'],
    price: 390,
    mrp: 849,
    dispatch: READY,
    images: gallery('kids-saudi')
  },
  {
    code: 'AQ-KD-602',
    name: 'Kids Emirati Kandura',
    category: 'kids',
    audience: 'Kids',
    run: 'kids',
    colour: 'White',
    fabric: 'Japanese polyester',
    gsm: 140,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Collarless neck with tarboosh loop, chest pocket.',
    occasions: ['Eid', 'Friday'],
    price: 410,
    mrp: 899,
    dispatch: READY,
    images: gallery('kids-emirati')
  },
  {
    code: 'AQ-KD-603',
    name: 'Kids Omani Dishdasha',
    category: 'kids',
    audience: 'Kids',
    run: 'kids',
    colour: 'White',
    fabric: 'Cotton-poly blend',
    gsm: 145,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Round neck with tassel, side pockets.',
    occasions: ['Eid', 'Friday'],
    price: 430,
    mrp: 949,
    dispatch: READY,
    images: gallery('kids-omani')
  },
  {
    code: 'AQ-KD-604',
    name: 'Kids Moroccan Jubba',
    category: 'kids',
    audience: 'Kids',
    run: 'kids',
    colour: 'Ivory / gold',
    fabric: 'Linen-look viscose',
    gsm: 170,
    opacity: 'Opaque',
    lining: 'Half-lined',
    details: 'Gold zari on neck and placket.',
    occasions: ['Eid', 'Wedding & Nikah'],
    price: 690,
    mrp: 1499,
    dispatch: MTO,
    images: gallery('kids-moroccan')
  },
  {
    code: 'AQ-KD-605',
    name: 'Kids Designer Jubba',
    category: 'kids',
    audience: 'Kids',
    run: 'kids',
    colour: 'Navy',
    fabric: 'Twill suiting',
    gsm: 180,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Band collar, tonal buttons.',
    occasions: ['Eid', 'Wedding & Nikah'],
    price: 520,
    mrp: 1149,
    dispatch: READY,
    images: gallery('kids-designer')
  },
  {
    code: 'AQ-KD-606',
    name: 'Kids Pathani Suit',
    category: 'kids',
    audience: 'Kids',
    run: 'kids',
    colour: 'Bottle green',
    fabric: 'Cotton-poly blend',
    gsm: 160,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Shirt collar, chest pockets, with salwar.',
    occasions: ['Eid', 'Everyday'],
    price: 420,
    mrp: 899,
    dispatch: READY,
    images: gallery('kids-pathani')
  },
  {
    code: 'AQ-KD-607',
    name: 'Kids Kurta Pajama',
    category: 'kids',
    audience: 'Kids',
    run: 'kids',
    colour: 'Beige',
    fabric: 'Cotton slub',
    gsm: 135,
    opacity: 'Opaque',
    lining: 'Unlined',
    details: 'Straight kurta with drawstring pajama.',
    occasions: ['Friday', 'Everyday'],
    price: 360,
    mrp: 799,
    dispatch: READY,
    images: gallery('kids-straight')
  }
]

export const productByCode = Object.fromEntries(products.map((p) => [p.code, p]))

/** Reseller margin on MRP, as a whole percent. */
export const marginOf = (p) => Math.round(((p.mrp - p.price) / p.mrp) * 100)

export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')
