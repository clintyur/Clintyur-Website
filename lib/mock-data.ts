// Placeholder data — replace with real DB queries when content is ready

export const MOCK_RECIPES = [
  {
    id: '1',
    slug: 'crispy-carnitas-tacos',
    title: 'Crispy Carnitas Tacos',
    description: 'Slow-braised pork shoulder crisped in its own fat, served on warm corn tortillas with pickled onions and salsa verde.',
    heroImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    prepTime: 20,
    cookTime: 240,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisine: 'Mexican',
    category: 'Mains',
    tags: ['pork', 'tacos', 'mexican', 'slow-cook'],
    isSubscriber: false,
    isFeatured: true,
    rating: 4.9,
    commentCount: 47,
    likeCount: 312,
  },
  {
    id: '2',
    slug: 'saffron-risotto',
    title: 'Saffron Risotto alla Milanese',
    description: 'Silky, golden risotto made with Carnaroli rice, real saffron, dry white wine, and a cloud of Parmigiano Reggiano.',
    heroImage: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80',
    prepTime: 10,
    cookTime: 30,
    servings: 4,
    difficulty: 'HARD',
    cuisine: 'Italian',
    category: 'Mains',
    tags: ['italian', 'rice', 'vegetarian', 'date-night'],
    isSubscriber: true,
    isFeatured: true,
    rating: 4.8,
    commentCount: 29,
    likeCount: 198,
  },
  {
    id: '3',
    slug: 'smash-burgers',
    title: 'Perfect Smash Burgers',
    description: 'Double smash patties, American cheese, caramelized onions, and secret sauce on a toasted brioche bun.',
    heroImage: '/images/recipe-smash-burger.jpg',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'EASY',
    cuisine: 'American',
    category: 'Mains',
    tags: ['beef', 'burger', 'quick', 'weekend'],
    isSubscriber: false,
    isFeatured: false,
    rating: 5.0,
    commentCount: 83,
    likeCount: 547,
  },
  {
    id: '4',
    slug: 'miso-glazed-salmon',
    title: 'Miso-Glazed Salmon',
    description: 'Broiled salmon with a caramelized white miso glaze, served with sesame green beans and steamed rice.',
    heroImage: '/images/recipe-salmon-polenta.jpg',
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    difficulty: 'EASY',
    cuisine: 'Japanese-inspired',
    category: 'Seafood',
    tags: ['fish', 'healthy', 'quick', 'japanese'],
    isSubscriber: false,
    isFeatured: true,
    rating: 4.7,
    commentCount: 61,
    likeCount: 284,
  },
  {
    id: '5',
    slug: 'sourdough-bread',
    title: 'Open-Crumb Sourdough',
    description: 'A detailed guide to baking bakery-quality sourdough at home — scoring, steam, and that perfect ear.',
    heroImage: '/images/recipe-meat-bread.jpg',
    prepTime: 60,
    cookTime: 45,
    servings: 1,
    difficulty: 'HARD',
    cuisine: 'French',
    category: 'Baking',
    tags: ['bread', 'sourdough', 'baking', 'fermentation'],
    isSubscriber: true,
    isFeatured: false,
    rating: 4.9,
    commentCount: 112,
    likeCount: 891,
  },
  {
    id: '6',
    slug: 'burnt-basque-cheesecake',
    title: 'Burnt Basque Cheesecake',
    description: 'Intentionally torched, crustless cheesecake with a molten center and silky texture. 5 ingredients.',
    heroImage: '/images/recipe-basque-cheesecake.jpg',
    prepTime: 10,
    cookTime: 60,
    servings: 8,
    difficulty: 'EASY',
    cuisine: 'Spanish',
    category: 'Desserts',
    tags: ['dessert', 'cheese', 'baking', 'spanish'],
    isSubscriber: false,
    isFeatured: false,
    rating: 4.8,
    commentCount: 44,
    likeCount: 372,
  },
  {
    id: '7',
    slug: 'citrus-olive-oil-cake',
    title: 'Citrus Olive Oil Cake',
    description: 'A bright, tender cake with candied citrus and a glossy olive oil crumb, served with hand-whipped cream and fresh berry compote.',
    heroImage: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80',
    prepTime: 30,
    cookTime: 45,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisine: 'Mediterranean',
    category: 'Desserts',
    tags: ['dessert', 'cake', 'citrus', 'olive-oil', 'seasonal'],
    isSubscriber: false,
    isFeatured: true,
    rating: 5.0,
    commentCount: 0,
    likeCount: 0,
    sections: [
      {
        name: 'Citrus Olive Oil Cake',
        ingredients: [
          '2 cups all-purpose flour',
          '1½ teaspoons baking powder',
          '½ teaspoon salt',
          '½ cup extra-virgin olive oil',
          '1 cup sugar',
          '3 large eggs',
          '1 tablespoon vanilla extract',
          '½ cup fresh lemon juice',
          '½ cup fresh orange juice',
          '2 tablespoons lemon zest',
          '1 tablespoon orange zest',
          'Candied citrus slices for topping (optional)',
        ],
        instructions: [
          'Preheat your oven to 350°F and prepare a 9-inch round cake pan — butter it generously and dust with flour, tapping out the excess.',
          'In a medium bowl, whisk together flour, baking powder, and salt. Set aside.',
          'In a large bowl, whisk together olive oil and sugar until just combined. The mixture should be slightly thick.',
          'Add eggs one at a time, whisking well after each addition. Add vanilla extract and whisk until smooth.',
          'Whisk in lemon and orange juices slowly — the batter will look loose and a bit separated, but that\'s correct.',
          'Fold in the citrus zests with a spatula.',
          'Gently fold the dry ingredients into the wet ingredients until just combined. Don\'t overwork the batter — a few streaks of flour are fine.',
          'Pour the batter into your prepared pan. Tap the pan on the counter a couple of times to release air bubbles.',
          'Bake for 40–45 minutes, until a toothpick inserted into the center comes out clean or with just a few moist crumbs. The top should be golden and springy to the touch.',
          'Let the cake cool in the pan for 10 minutes, then turn it out onto a wire rack to cool completely.',
          'Once cool, you can dust the top with confectioners\' sugar or top with candied citrus slices if you like.',
          'Serve each slice with a generous dollop of whipped cream and a spoonful of berry compote on the side.',
        ],
      },
      {
        name: 'Hand-Whipped Cream',
        ingredients: [
          '1 cup heavy cream (cold)',
          '2 tablespoons powdered sugar',
          '½ teaspoon vanilla extract',
        ],
        instructions: [
          'Pour cold heavy cream into a chilled bowl. Start whisking by hand with a wire whisk, using steady, circular motions.',
          'After about 2 minutes of whisking, the cream will begin to thicken. Keep going — you\'re looking for soft peaks.',
          'Once you see soft peaks forming (cream holds its shape briefly but tips curl over), add powdered sugar and vanilla extract.',
          'Continue whisking for another 30 seconds to 1 minute until you reach stiff peaks — cream should hold its shape completely.',
          'Don\'t overwhisk or you\'ll end up with butter. Stop as soon as the peaks are firm.',
          'Use immediately or refrigerate for up to 2 hours. If it separates slightly, give it a quick whisk before serving.',
        ],
      },
      {
        name: 'Berry Compote',
        ingredients: [
          '2 cups fresh blueberries (or mixed berries)',
          '¼ cup sugar',
          '1 tablespoon lemon juice',
          '1 tablespoon honey',
          'Pinch of salt',
          '½ teaspoon vanilla extract',
        ],
        instructions: [
          'In a medium saucepan, combine blueberries, sugar, and lemon juice over medium heat.',
          'Stir gently and let the berries begin to release their juices — this takes about 3–4 minutes.',
          'Once the berries are bubbling and the liquid is thickened slightly (you should see a syrupy consistency), remove from heat.',
          'Stir in honey, salt, and vanilla extract.',
          'Let the compote cool to room temperature. It will thicken a bit more as it cools.',
          'Serve at room temperature alongside the cake and whipped cream. The compote can be made up to 2 days ahead and stored in the refrigerator.',
        ],
      },
    ],
  },
]

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  color?: string
  size?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  heroImage: string
  images: string[]
  category: string
  isFeatured: boolean
  variants: ProductVariant[]
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'yurcooked-canvas-apron',
    name: 'yur cooked Canvas Apron',
    description: 'Heavy-duty waxed canvas apron with genuine leather straps, a front pocket, and a bottle opener loop. Built to outlast your cooking obsession.',
    heroImage: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    category: 'APPAREL',
    isFeatured: true,
    variants: [
      { id: '1a', name: 'Natural / One Size', sku: 'APR-NAT-OS', price: 8900, stock: 24, color: 'Natural' },
      { id: '1b', name: 'Black / One Size',   sku: 'APR-BLK-OS', price: 8900, stock: 12, color: 'Black' },
    ],
  },
  {
    id: '2',
    slug: 'yurcooked-chef-tee',
    name: 'Chef Tee — Heavy Cotton',
    description: '7 oz ring-spun cotton, relaxed fit. "yur cooked" embroidered chest logo. Washes beautifully, keeps its shape.',
    heroImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    ],
    category: 'APPAREL',
    isFeatured: true,
    variants: [
      { id: '2a', name: 'White / S',  sku: 'TEE-WHT-S',  price: 4200, stock: 30, size: 'S',  color: 'White' },
      { id: '2b', name: 'White / M',  sku: 'TEE-WHT-M',  price: 4200, stock: 45, size: 'M',  color: 'White' },
      { id: '2c', name: 'White / L',  sku: 'TEE-WHT-L',  price: 4200, stock: 38, size: 'L',  color: 'White' },
      { id: '2d', name: 'White / XL', sku: 'TEE-WHT-XL', price: 4200, stock: 20, size: 'XL', color: 'White' },
      { id: '2e', name: 'Black / S',  sku: 'TEE-BLK-S',  price: 4200, stock: 18, size: 'S',  color: 'Black' },
      { id: '2f', name: 'Black / M',  sku: 'TEE-BLK-M',  price: 4200, stock: 22, size: 'M',  color: 'Black' },
      { id: '2g', name: 'Black / L',  sku: 'TEE-BLK-L',  price: 4200, stock: 15, size: 'L',  color: 'Black' },
      { id: '2h', name: 'Black / XL', sku: 'TEE-BLK-XL', price: 4200, stock: 9,  size: 'XL', color: 'Black' },
    ],
  },
  {
    id: '3',
    slug: 'carbon-steel-skillet-10in',
    name: 'Carbon Steel Skillet 10"',
    description: 'Pre-seasoned carbon steel skillet that bridges cast iron and stainless. Screaming-hot sears, oven-safe to 700°F, and feather-light compared to cast iron.',
    heroImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    category: 'COOKWARE',
    isFeatured: true,
    variants: [
      { id: '3a', name: '10" / Black', sku: 'PAN-CS-10', price: 13500, stock: 16, color: 'Black' },
    ],
  },
  {
    id: '4',
    slug: 'spice-collection',
    name: 'yur cooked Spice Collection',
    description: 'Our 6-jar curated spice set — the exact blends we use on the channel. Custom-ground weekly, shipped fresh.',
    heroImage: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=800&q=80',
    ],
    category: 'ACCESSORIES',
    isFeatured: false,
    variants: [
      { id: '4a', name: 'Set of 6', sku: 'SPICE-6SET', price: 5400, stock: 40 },
    ],
  },
]

export const MOCK_SOCIAL_POSTS = [
  {
    id: '1',
    platform: 'instagram' as const,
    thumbnail: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
    caption: 'Carnitas taco night 🌮 Recipe link in bio',
    url: 'https://instagram.com',
    likes: 2341,
    videoUrl: null,
  },
  {
    id: '2',
    platform: 'youtube' as const,
    thumbnail: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    caption: 'Perfect Saffron Risotto — start to finish',
    url: 'https://youtube.com',
    views: 184000,
    duration: '14:32',
  },
  {
    id: '3',
    platform: 'instagram' as const,
    thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    caption: 'The smash burger that broke my kitchen',
    url: 'https://instagram.com',
    likes: 5892,
    videoUrl: null,
  },
  {
    id: '4',
    platform: 'youtube' as const,
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    caption: 'Sourdough masterclass — everything I know',
    url: 'https://youtube.com',
    views: 312000,
    duration: '28:14',
  },
  {
    id: '5',
    platform: 'instagram' as const,
    thumbnail: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80',
    caption: 'Miso salmon in 12 minutes flat ✨',
    url: 'https://instagram.com',
    likes: 3107,
    videoUrl: null,
  },
  {
    id: '6',
    platform: 'youtube' as const,
    thumbnail: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?w=600&q=80',
    caption: 'Basque cheesecake — the ONLY dessert recipe you need',
    url: 'https://youtube.com',
    views: 97000,
    duration: '9:48',
  },
]

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  heroImage: string
  publishedAt: string
  readTime: number
  /** Article body as paragraphs. Empty until the post is written. */
  body?: string[]
}

export const MOCK_POSTS: BlogPost[] = [
  {
    slug: 'carbon-steel-vs-cast-iron',
    title: 'Carbon Steel vs. Cast Iron: The Real Differences',
    excerpt: 'We cooked the same meal in both pans for 30 days. Here is what we found.',
    category: 'Gear',
    heroImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=1200&q=80',
    publishedAt: '2024-12-15',
    readTime: 7,
  },
  {
    slug: 'how-to-build-flavor',
    title: 'The 5 Techniques That Build Real Flavor',
    excerpt: 'Caramelization, fond, fat, acid, salt — master these and everything you cook improves.',
    category: 'Technique',
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    publishedAt: '2024-12-08',
    readTime: 10,
  },
  {
    slug: 'pantry-setup-guide',
    title: 'The yur cooked Pantry Setup Guide',
    excerpt: 'The 40 ingredients we always have on hand — and why they matter.',
    category: 'Pantry',
    heroImage: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=1200&q=80',
    publishedAt: '2024-11-30',
    readTime: 12,
  },
]
