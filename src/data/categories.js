/**
 * `key` is what products reference; `image` is the category banner.
 * Order here is the order on the home page rail.
 */
export const categories = [
  { key: 'thobe', name: 'Thobes & Jubbas', image: '/banners/cat-thobe-jubba.jpg', blurb: 'Saudi, Emirati, Omani, Moroccan and designer cuts.' },
  { key: 'kurta', name: 'Kurta Pajama', image: '/banners/cat-kurta-pajama.jpg', blurb: 'Straight-cut sets for Friday and everyday wear.' },
  { key: 'pathani', name: 'Pathani Suits', image: '/banners/cat-pathani-suit.jpg', blurb: 'Collared kurta with salwar, in solid colours.' },
  { key: 'jacket', name: 'Nehru Jackets', image: '/banners/cat-jacket.jpg', blurb: 'Sleeveless waistcoats to layer over any set.' },
  { key: 'abaya', name: 'Abayas', image: '/banners/cat-abaya.jpg', blurb: 'Open and closed abayas with embroidered trims.' },
  { key: 'kids', name: 'Kids', image: '/banners/slide-kids.jpg', blurb: 'Every men’s style, cut down for ages 2 to 12.' }
]

export const audiences = ['Men', 'Women', 'Kids']

export const occasions = ['Eid', 'Wedding & Nikah', 'Friday', 'Everyday', 'Umrah & Travel']

/** Size runs. One pack = one piece of every size in the run. */
export const sizeRuns = {
  thobe: ['52', '54', '56', '58', '60'],
  kurta: ['S', 'M', 'L', 'XL', 'XXL'],
  abaya: ['52', '54', '56', '58'],
  kids: ['2Y', '4Y', '6Y', '8Y', '10Y', '12Y']
}

export const sizeRunLabel = {
  thobe: 'Length in inches',
  kurta: 'Chest fit',
  abaya: 'Length in inches',
  kids: 'Age'
}
