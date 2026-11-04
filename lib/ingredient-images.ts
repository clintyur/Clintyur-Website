/**
 * Thumbnails for the ingredient lists.
 *
 * Deliberately an explicit map rather than fuzzy matching: a wrong photo is
 * worse than no photo. Keys are matched case-insensitively against the
 * ingredient text, longest key first, so "garlic powder" cannot fall through
 * to the garlic bulb and "sharp white cheddar" beats "cheddar".
 *
 * Ingredients with no confident match render without a thumbnail.
 */
const IMAGES: Record<string, string> = {
  // dairy and eggs
  'american cheese': 'american-cheese',
  'sharp white cheddar': 'cheddar',
  'white cheddar': 'cheddar',
  gouda: 'gouda',
  cheddar: 'cheddar',
  taleggio: 'taleggio',
  parmigiano: 'parmesan',
  parmesan: 'parmesan',
  burrata: 'burrata',
  feta: 'feta',
  'heavy cream': 'heavy-cream',
  buttermilk: 'milk',
  milk: 'milk',
  butter: 'butter',
  'egg yolks': 'eggs',
  'egg yolk': 'eggs',
  eggs: 'eggs',

  // produce
  'heirloom tomatoes': 'heirloom-tomato',
  'heirloom tomato': 'heirloom-tomato',
  'yukon gold potatoes': 'potato',
  potatoes: 'potato',
  potato: 'potato',
  'red onion': 'red-onion',
  shallot: 'shallot',
  scallions: 'scallions',
  leeks: 'leek',
  leek: 'leek',
  spinach: 'spinach',
  kale: 'kale',
  watermelon: 'watermelon',
  cucumbers: 'cucumber',
  cucumber: 'cucumber',
  blueberries: 'blueberries',
  pineapple: 'pineapple-juice',
  garlic: 'garlic',
  ginger: 'ginger',
  habanero: 'habanero',

  // herbs
  chives: 'chives',
  basil: 'basil',
  mint: 'mint',
  rosemary: 'rosemary',
  thyme: 'thyme',
  sage: 'sage',
  'bay leaves': 'bay-leaf',
  'bay leaf': 'bay-leaf',

  // citrus
  lemongrass: 'lemongrass',
  lemon: 'lemon',
  limes: 'lime',
  lime: 'lime',
  orange: 'orange',

  // meat
  'ground beef': 'ground-beef',
  '80/20': 'ground-beef',
  bacon: 'bacon',
  'chicken thighs': 'chicken',
  'chicken quarters': 'chicken',
  'leg quarters': 'chicken',
  chickens: 'chicken',
  chicken: 'chicken',
  'chicken stock': 'chicken-stock',

  // pantry
  'puff pastry': 'puff-pastry',
  'almond flour': 'almond-flour',
  'all-purpose flour': 'flour',
  flour: 'flour',
  panko: 'panko',
  pistachios: 'pistachios',
  baguette: 'baguette',
  croissant: 'croissant',
  donut: 'donut',
  pasta: 'pasta',
  pesto: 'pesto',
  ketchup: 'ketchup',
  honey: 'honey',
  'soy sauce': 'soy-sauce',
  'fig balsamic': 'fig-balsamic',
  'apple cider vinegar': 'apple-cider-vinegar',
  'calabrian chili oil': 'calabrian-chili-oil',
  'olive oil': 'olive-oil',
  'beef tallow': 'beef-tallow',
  'white wine': 'white-wine',

  // baking and seasoning
  'powdered sugar': 'powdered-sugar',
  'brown sugar': 'brown-sugar',
  sugar: 'sugar',
  'baking powder': 'baking-powder',
  'baking soda': 'baking-soda',
  'vanilla extract': 'vanilla-extract',
  'vanilla bean': 'vanilla-bean',
  cinnamon: 'cinnamon',
  nutmeg: 'nutmeg',
  allspice: 'allspice',
  'black pepper': 'black-pepper',
  peppercorns: 'black-pepper',
  salt: 'salt',

  // sourced to fill gaps the original set did not cover
  'beef tenderloin': 'beef-tenderloin',
  tenderloin: 'beef-tenderloin',
  anchovies: 'anchovies',
  anchovy: 'anchovies',
  capers: 'capers',
  'dijon mustard': 'dijon-mustard',
  dijon: 'dijon-mustard',
  mayonnaise: 'mayonnaise',
  'fish sauce': 'fish-sauce',
  'maple syrup': 'maple-syrup',
  carrots: 'carrots',
  carrot: 'carrots',
  cilantro: 'cilantro',
  focaccia: 'focaccia',
  'gherkin pickles': 'gherkin-pickles',
  gherkin: 'gherkin-pickles',
  'brioche bun': 'brioche',
  brioche: 'brioche',
  'avocado oil': 'avocado-oil',
  'balsamic glaze': 'balsamic-glaze',
  'ground coriander': 'ground-coriander',
  'green thai chiles': 'green-chile',
  'thai chiles': 'green-chile',
  'scotch bonnet': 'green-chile',
  serranos: 'green-chile',
  serrano: 'green-chile',
  'red chile': 'red-chile',
  'garlic powder': 'garlic-powder',
  'onion powder': 'onion-powder',
  'smoked paprika': 'smoked-paprika',
  paprika: 'smoked-paprika',
  'rice vinegar': 'rice-vinegar',
  'neutral oil': 'neutral-oil',
}

// Longest first so specific names win over the generic ones they contain.
const KEYS = Object.keys(IMAGES).sort((a, b) => b.length - a.length)

export function ingredientImage(text: string): string | null {
  // Only the part before the em dash names the ingredient; everything after
  // it is preparation notes that can mention other ingredients entirely.
  const name = text.split('—')[0]
  const t = (name || text).toLowerCase()
  // Powders only match a genuine powder photo — never the fresh bulb.
  if (t.includes('powder') && !/garlic powder|onion powder|baking|powdered sugar/.test(t)) return null
  for (const k of KEYS) {
    if (t.includes(k)) return `/images/ingredients/${IMAGES[k]}.png`
  }
  return null
}
