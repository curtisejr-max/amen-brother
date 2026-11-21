// Amen Brother catalog. Variant IDs come from the Shopify store usvtcu-ss (pulled 11/13).
// Variant order per colour: S, M, L, XL, 2XL, 3XL.
window.AB_STORE = 'https://usvtcu-ss.myshopify.com';
window.AB_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
window.AB_COLORS = {
  Black: { fill: '#141414', name: 'Black' },
  Sand: { fill: '#d6c4a2', name: 'Sand' }
};

window.AB_PRODUCTS = [
  {
    line: 'ab', handle: 'faith-over-sight-tee', photo: 'photos/faith-over-sight-tee.webp', name: 'Faith Over Sight', kind: 'tee',
    verse: 'For we walk by faith, not by sight.', ref: '2 Corinthians 5:7',
    art: 'art/faith-over-sight.webp', place: 'full',
    price: 45, bigPrice: 45,
    variants: { Black: ['54931299696958', '54931299729726', '54931299762494', '54931299795262', '54931299828030', '54931299860798'] },
    blurb: 'Jesus on the water, open hand raised, the disciples’ boat behind Him. Antique-gold engraved art, full front.'
  },
  {
    line: 'ab', handle: 'remembrance-table-tee', photo: 'photos/remembrance-table-tee.webp', name: 'Remembrance Table', kind: 'tee',
    verse: 'Do this in remembrance of me.', ref: 'Luke 22:19',
    art: 'art/remembrance-table.webp', place: 'wide',
    price: 45, bigPrice: 45,
    variants: { Black: ['54931299893566', '54931299926334', '54931299959102', '54931299991870', '54931300024638', '54931300057406'] },
    blurb: 'The Last Supper in gold line art. Look closer: there is more at that table than you first see.'
  },
  {
    line: 'ab', handle: 'light-of-the-world-tee', photo: 'photos/light-of-the-world-tee.webp', name: 'Light of the World', kind: 'tee',
    verse: 'I am the light of the world.', ref: 'John 8:12',
    art: 'art/light-of-the-world.webp', place: 'full',
    price: 45, bigPrice: 45,
    variants: { Black: ['54931300090174', '54931300122942', '54931300155710', '54931300188478', '54931300221246', '54931300254014'] },
    blurb: 'A gold-lit portrait crowned with AMEN BROTHER. Bold, quiet, unmistakable.'
  },
  {
    line: 'ab', handle: 'grace-found-me-tee', photo: 'photos/grace-found-me-tee.webp', name: 'Grace. Found Me.', kind: 'tee',
    verse: 'Grace found me.', ref: 'Wear the testimony',
    art: 'art/grace-found-me.webp', place: 'full',
    price: 45, bigPrice: 45,
    variants: {
      Black: ['54931300352318', '54931300385086', '54931300417854', '54931300450622', '54931300483390', '54931300516158'],
      Sand: ['54931300548926', '54931300581694', '54931300614462', '54931300647230', '54931300679998', '54931300712766']
    },
    blurb: 'I wasn’t looking for it. Grace found me. Full-colour illustration. Wear the testimony.'
  },
  {
    line: 'ab', handle: 'communion-seal-tee', photo: 'photos/communion-seal-tee.webp', name: 'Communion Seal', kind: 'tee',
    verse: 'Bread · Wine · Grace', ref: 'The Amen Brother seal',
    art: 'art/communion-seal.webp', place: 'chest',
    price: 45, bigPrice: 45,
    variants: { Black: ['54931300778302', '54931300811070', '54931300843838', '54931300876606', '54931300909374', '54931300942142'] },
    blurb: 'Chalice, bread and the cross inside a gold ring. A clean left-chest mark for every day.'
  },
  {
    line: 'ab', handle: 'faith-over-sight-hoodie', photo: 'photos/faith-over-sight-hoodie.webp', name: 'Faith Over Sight', kind: 'hoodie',
    verse: 'For we walk by faith, not by sight.', ref: '2 Corinthians 5:7',
    art: 'art/faith-over-sight.webp', place: 'full',
    price: 75, bigPrice: 75,
    variants: { Black: ['54931300974910', '54931301007678', '54931301040446', '54931301073214', '54931301105982', '54931301138750'] },
    blurb: 'The hero art on a heavyweight black hoodie.'
  },
  {
    line: 'ab', handle: 'light-of-the-world-hoodie', photo: 'photos/light-of-the-world-hoodie.webp', name: 'Light of the World', kind: 'hoodie',
    verse: 'I am the light of the world.', ref: 'John 8:12',
    art: 'art/light-of-the-world.webp', place: 'full',
    price: 75, bigPrice: 75,
    variants: { Black: ['54931303366974', '54931303399742', '54931303432510', '54931303465278', '54931303498046', '54931303530814'] },
    blurb: 'The gold portrait on a heavyweight black hoodie.'
  },
  {
    line: 'ab', handle: 'communion-seal-hoodie', photo: 'photos/communion-seal-hoodie.webp', name: 'Communion Seal', kind: 'hoodie',
    verse: 'Bread · Wine · Grace', ref: 'The Amen Brother seal',
    art: 'art/communion-seal.webp', place: 'chestCenter',
    price: 75, bigPrice: 75,
    variants: { Black: ['54931303563582', '54931303596350', '54931303629118', '54931303661886', '54931303694654', '54931303727422'] },
    blurb: 'The seal, front chest, on a heavyweight black hoodie.'
  },
  // ---- coming soon: in Curt's design packet v1, not yet created in Shopify (no variant IDs) ----
  {
    line: 'ab', handle: 'remembrance-vertical-tee', photo: 'photos/remembrance-vertical-tee.webp', name: 'Remembrance Vertical', kind: 'tee', soon: true,
    verse: 'Do this in remembrance of me.', ref: 'Luke 22:19',
    art: 'art/remembrance-vertical.webp', place: 'wide',
    price: 45, bigPrice: 45, variants: {},
    blurb: 'The Remembrance Table in a vertical cut.'
  },
  {
    line: 'ab', handle: 'remembrance-table-hoodie', photo: 'photos/remembrance-table-hoodie.webp', name: 'Remembrance Table', kind: 'hoodie', soon: true,
    verse: 'Do this in remembrance of me.', ref: 'Luke 22:19',
    art: 'art/remembrance-table.webp', place: 'wide',
    price: 75, bigPrice: 75, variants: {},
    blurb: 'The flagship Last Supper art on a heavyweight black hoodie.'
  },
  {
    line: 'am', handle: 'dont-buy-in-tee', photo: 'photos/dont-buy-in-tee.webp', name: 'Don’t Buy In', kind: 'tee', soon: true,
    verse: 'There’s glory in the risk.', ref: 'After Midnight',
    art: 'art/am-dont-buy-in.webp', place: 'full', price: 45, bigPrice: 45, variants: {},
    blurb: 'Don’t buy in while I’m shooting.'
  },
  {
    line: 'am', handle: 'table-is-hot-tee', photo: 'photos/table-is-hot-tee.webp', name: 'The Table Is Hot', kind: 'tee', soon: true,
    verse: 'Don’t talk to me.', ref: 'Craps Insider Series',
    art: 'art/am-table-is-hot.webp', place: 'full', price: 45, bigPrice: 45, variants: {},
    blurb: 'Don’t talk to me. The table is hot.'
  },
  {
    line: 'am', handle: '9th-hole-nightcap-tee', photo: 'photos/9th-hole-nightcap-tee.webp', name: '9th Hole Nightcap', kind: 'tee', soon: true,
    verse: '9th Hole Nightcap.', ref: 'After Midnight',
    art: 'art/am-9th-hole-nightcap.webp', place: 'full', price: 45, bigPrice: 45, variants: {},
    blurb: 'Moon over the flag, a cigar and a pour.'
  },
  {
    line: 'am', handle: 'calculated-not-lucky-tee', photo: 'photos/calculated-not-lucky-tee.webp', name: 'Calculated. Not Lucky.', kind: 'tee', soon: true,
    verse: 'They watch. I decide.', ref: 'After Midnight',
    art: 'art/am-calculated.webp', place: 'full', price: 45, bigPrice: 45, variants: {},
    blurb: 'Calculated. Not lucky. They watch. I decide.'
  }
];
