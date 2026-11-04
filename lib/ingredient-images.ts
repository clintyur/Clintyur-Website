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
  'gouda': 'cheddar',
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
  arugula: 'kale',
  kale: 'kale',
  watermelon: 'watermelon',
  cucumbers: 'cucumber',
  cucumber: 'cucumber',
  blueberries: 'blueberries',
  pineapple: 'pineapple-juice',
  garlic: 'garlic',
  ginger: 'ginger',
  habanero: 'habanero',
  'scotch bonnet': 'habanero',

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
  'champagne vinegar': 'champagne-vinegar',
  'calabrian chili oil': 'calabrian-chili-oil',
  'olive oil': 'olive-oil',
  'duck fat': 'duck-fat',
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
  salt: 'salt',
}

// Longest first so specific names win over the generic ones they contain.
const KEYS = Object.keys(IMAGES).sort((a, b) => b.length - a.length)

export function ingredientImage(text: string): string | null {
  const t = text.toLowerCase()
  // "Garlic powder" is a spice, not a bulb — never borrow the fresh photo.
  if (t.includes('powder') && !t.includes('baking') && !t.includes('powdered sugar')) return null
  for (const k of KEYS) {
    if (t.includes(k)) return `/images/ingredients/${IMAGES[k]}.png`
  }
  return null
}
