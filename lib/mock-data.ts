// Placeholder data — replace with real DB queries when content is ready

export const MOCK_RECIPES = [
  {
    id: '3',
    slug: 'perfect-bacon-egg-and-cheese',
    title: 'The Perfect Bacon, Egg, and Cheese',
    description: 'Griddled bacon, folded egg and cheddar pressed into toasted bread and wrapped in foil to steam.',
    heroImage: '/images/recipe-bacon-egg-cheese.jpg',
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'EASY',
    cuisine: 'American',
    category: 'Breakfast',
    tags: ['breakfast', 'sandwich', 'bacon', 'egg'],
    isSubscriber: false,
    isFeatured: false,
    rating: 5.0,
    commentCount: 83,
    likeCount: 547,
  },
  {
    id: '4',
    slug: 'arctic-char-three-cheese-grits',
    title: 'Arctic Char & Three-Cheese Grits',
    description: 'Crisp-skinned arctic char over soft three-cheese grits, finished with chives and dill.',
    heroImage: '/images/recipe-arctic-char-grits.jpg',
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    difficulty: 'EASY',
    cuisine: 'Southern-inspired',
    category: 'Seafood',
    tags: ['fish', 'grits', 'arctic-char', 'comfort'],
    isSubscriber: false,
    isFeatured: true,
    rating: 4.7,
    commentCount: 61,
    likeCount: 284,
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
    heroImage: '/images/recipe-citrus-olive-oil-cake.jpg',
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
  {
    id: '8',
    slug: 'duck-fat-roasted-potatoes',
    title: 'Duck Fat Roasted Potatoes',
    description: 'Yukon Golds parboiled, roughed up hard, and roasted in a full jar of duck fat until shatteringly crisp. Finished with Parmigiano, chives and Maldon.',
    heroImage: '/images/recipe-duck-fat-potatoes.jpg',
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    difficulty: 'EASY',
    cuisine: 'British-inspired',
    category: 'Sides',
    tags: ['potatoes', 'duck-fat', 'crispy', 'side'],
    isSubscriber: false,
    isFeatured: true,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    sections: [
      {
        name: 'Duck Fat Roasted Potatoes',
        ingredients: [
          '3 lbs Yukon Gold potatoes, cut into 2-inch chunks',
          '1 jar (14 oz) duck fat',
          'Kosher salt',
          'Garlic powder',
          'Black pepper',
          '4-6 garlic cloves, smashed',
          '3-4 sprigs fresh rosemary',
          '3-4 sprigs fresh thyme',
          'Freshly grated Parmigiano Reggiano',
          'Fresh chives, finely snipped',
          'Maldon flaky salt',
        ],
        instructions: [
          'Grab 3 lbs of Yukon Gold potatoes and cut them into 2-inch chunks. No need to peel — the skin gets crispy and delicious in the duck fat.',
          'Throw the chunks into a large pot and cover with cold water. Season the water heavily with kosher salt — it should taste like the ocean. Bring to a boil over high heat and cook for 10-12 minutes until just fork tender. A fork should slide in with a little resistance — you don\'t want them falling apart.',
          'Drain completely in a colander. Return the potatoes to the empty pot and place back on the stove over low heat for 5 minutes to steam off any remaining moisture. Shake the pot occasionally.',
          'Now here\'s the move — turn the heat off and shake the pot hard and aggressively for a full minute. You want to crater and rough up all the edges of the potatoes. Those rough edges are what get insanely crispy in the duck fat. Don\'t skip this.',
          'Preheat your oven to 425°F convection. Add 1 jar (14 oz) of duck fat to a large sheet pan and place it in the oven until the fat is shimmering hot — about 10 minutes.',
          'Pull the pan out carefully — that fat is extremely hot. Add the potatoes in a single layer. They should sizzle loudly the moment they hit the fat. If they don\'t the fat isn\'t hot enough, back in the oven for a few more minutes.',
          'Season generously with kosher salt, garlic powder, and black pepper. Back in the oven for 15-20 minutes. At the halfway flip add 4-6 smashed garlic cloves and 3-4 sprigs each of fresh rosemary and thyme directly onto the sheet pan into the duck fat. The herbs and garlic will crisp up and infuse into the fat and onto the potatoes for the last 10-15 minutes. Pull at 30-35 minutes total when deep golden and shatteringly crispy.',
          'Pull from the oven and transfer immediately to a serving platter — do not let them sit on the pan or they\'ll steam and lose their crispiness. Shower generously with freshly grated Parmigiano Reggiano and finely snipped chives. Finish with a generous pinch of Maldon flaky salt over everything.',
          'Serve immediately. These do not wait for anyone.',
        ],
      },
    ],
  },
  {
    id: '9',
    slug: 'grilled-jerk-chicken',
    title: 'Grilled Jerk Chicken with Sweet BBQ Glaze',
    description: 'Leg quarters scored to the bone and marinated up to 48 hours in scotch bonnet jerk, then grilled and lacquered with a pineapple BBQ glaze. Smoker optional.',
    heroImage: '/images/recipe-jerk-chicken.jpg',
    prepTime: 45,
    cookTime: 35,
    servings: 6,
    difficulty: 'MEDIUM',
    cuisine: 'Jamaican-inspired',
    category: 'Mains',
    tags: ['chicken', 'grill', 'jerk', 'bbq', 'smoker'],
    isSubscriber: false,
    isFeatured: true,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    sections: [
      {
        name: 'Jerk Marinade',
        ingredients: [
          '3 habanero or scotch bonnet peppers, stemmed',
          '2 bunches scallions, rough chopped',
          '4 garlic cloves',
          '1-inch knob fresh ginger, peeled',
          'Juice of 2 limes',
          '1 tbsp soy sauce',
          '1 tbsp brown sugar',
          '1/2 bunch fresh thyme, leaves stripped',
          '2 tbsp neutral oil',
          '1 tbsp ground allspice',
          '1/2 tsp cinnamon',
          '1/4 tsp nutmeg',
          '1/2 tsp black pepper',
          '1/2 tsp kosher salt',
        ],
        instructions: [
          'Add all marinade ingredients to a blender. Blend until completely smooth. Taste — it should be intensely spicy, savory, and bright. Adjust lime and salt as needed. Reserve 2 tbsp of marinade in a separate small container for basting on the grill.',
          'Score each chicken quarter 3 deep cuts all the way to the bone on both the thigh and drumstick. This is non-negotiable — the marinade needs to get deep into the meat.',
          'Coat every single piece thoroughly in the jerk marinade — get it into every cut. Refrigerate uncovered for a minimum of 8 hours, ideally 24-48 hours. The longer the better.',
        ],
      },
      {
        name: 'Sweet BBQ Glaze',
        ingredients: [
          '1/2 cup pineapple juice',
          '1/4 cup brown sugar, packed',
          '1/4 cup ketchup',
          '1.5 tbsp honey',
          '1 tbsp soy sauce',
          '1 tbsp apple cider vinegar',
          '1/2 tbsp fresh ginger, microplaned',
          '2 garlic cloves, microplaned',
          '1/2 tsp allspice',
          '1/4 tsp cinnamon',
          '1/4 tsp black pepper',
          'Pinch of kosher salt',
        ],
        instructions: [
          'Combine all glaze ingredients in a small saucepan over medium heat. Whisk until the brown sugar is fully dissolved. Bring to a gentle simmer then reduce to low.',
          'Simmer uncovered 15-20 minutes, stirring occasionally, until it thickens and coats the back of a spoon. Pull off heat and cool to room temp. Refrigerate until grilling time.',
        ],
      },
      {
        name: 'The Chicken',
        ingredients: [
          '6 chicken leg quarters',
          'Avocado oil for brushing',
          'Grilled pineapple rings, to serve',
        ],
        instructions: [
          'Pull the chicken from the fridge and let it temper at room temp for 45 minutes. Cold chicken straight from the fridge onto a hot grill is a recipe for burnt outside, raw inside.',
          'OPTION A — SMOKE THEN GRILL (recommended). Preheat your smoker to 225°F. Add 3-4 oz of hickory or pimento wood. Load the chicken quarters skin-side up. Close the door and do not open it during the cook. Smoke until internal temp hits 155°F at the thickest part of the thigh away from the bone — about 2.5-3 hours. Pull, rest uncovered 20 minutes, then refrigerate uncovered on wire racks for at least 1 hour to dry out the skin before grilling.',
          'OPTION B — STRAIGHT GRILL (no smoker needed). Skip the smoke. The jerk marinade and BBQ glaze do all the heavy lifting. Go straight to the grill below; total grill time will be about 25-35 minutes depending on the size of your quarters.',
          'Preheat your grill to medium-high direct heat — around 375-400°F. Brush each quarter lightly with avocado oil on all sides. Place skin-side down. Cook 5-6 minutes until deeply charred and caramelized.',
          'Flip, brush generously with the reserved jerk marinade, cook another 5-6 minutes. Keep flipping and basting with jerk marinade every flip until internal temp hits 158°F at the thickest part of the thigh away from the bone.',
          'At 158°F switch to the sweet BBQ glaze. Brush one generous coat on each side. Grill 2-3 more minutes per side until the glaze caramelizes and lacquers over the jerk crust. Watch it closely — sugar burns fast. Pull at 165°F internal.',
          'Tent with foil and rest 5 minutes. Arrange on a platter with grilled pineapple rings alongside. The combination of that jerk heat underneath and the sweet caramelized glaze on top is the whole move.',
        ],
      },
    ],
  },
  {
    id: '10',
    slug: 'watermelon-mint-feta-salad',
    title: 'Watermelon, Mint & Feta Salad',
    description: 'Built in layers, never tossed — watermelon, Persian cucumber, ice-water onion and hand-torn feta under good olive oil, lime and Maldon.',
    heroImage: '/images/recipe-watermelon-salad.jpg',
    prepTime: 20,
    cookTime: 0,
    servings: 6,
    difficulty: 'EASY',
    cuisine: 'Mediterranean',
    category: 'Salads',
    tags: ['salad', 'summer', 'no-cook', 'watermelon', 'feta'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    sections: [
      {
        name: 'Watermelon, Mint & Feta Salad',
        ingredients: [
          '1/2 large seedless watermelon, cut into 1.5-inch cubes',
          '2 Persian cucumbers, sliced into thin rounds',
          '1/2 red onion, sliced paper thin — soaked in ice water 10 minutes, drained and patted dry',
          '1 shallot, thinly sliced',
          '6 oz Greek feta block, hand crumbled into big chunky pieces',
          '1 small bunch fresh mint, leaves picked and torn',
          '2 tbsp good finishing olive oil',
          'Juice of half a lime',
          'Maldon flaky salt — generous pinch',
        ],
        instructions: [
          'Slice your red onion paper thin. Submerge in a bowl of ice water for 10 minutes — this mellows out the sharp bite without losing the flavor. Drain completely and pat dry with paper towels.',
          'Cut your watermelon into 1.5-inch cubes. Remove any seeds. This is your base so be generous with it — you want a full, abundant platter.',
          'Now build the salad in layers on a large platter. Start with the watermelon as the base. Scatter the cucumber rounds evenly over the top. Add the drained red onion. Add the sliced shallot.',
          'Take your feta block and hand crumble it generously over everything in big chunky pieces — do not use pre-crumbled feta, you want real texture here.',
          'Scatter the torn fresh mint leaves over the top.',
          'Drizzle 2 tbsp of your best finishing olive oil evenly over the whole platter. Squeeze half a lime over everything. Finish with a generous pinch of Maldon flaky salt.',
          'Do not toss. The layers are the whole point — every scoop should get a little of everything. Serve immediately or within 30 minutes max — watermelon weeps fast and you don\'t want a soggy platter.',
        ],
      },
    ],
  },
  {
    id: '11',
    slug: 'thai-smashed-cucumber-salad',
    title: 'Thai Smashed Cucumber Salad',
    description: 'Cool, crunchy cucumbers in a bright lime-chili dressing, finished with cilantro and mint. Vegan.',
    intro: [
      'Smashing the cucumbers instead of slicing them is the whole trick — the jagged torn edges hold onto far more dressing than a clean cut ever will.',
    ],
    heroImage: '/images/recipe-thai-smashed-cucumber.jpg',
    prepTime: 30,
    cookTime: null,
    servings: 10,
    difficulty: 'EASY',
    cuisine: 'Thai',
    category: 'Salads',
    tags: ['salad', 'thai', 'cucumber', 'vegan'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'For the salad',
        items: [
          'English cucumbers — 3 (or 6–8 Persian cucumbers)',
          'Kosher salt — 1 1/2 tsp',
        ],
      },
      {
        name: 'For the dressing',
        items: [
          'Rice vinegar — 3 tbsp',
          'Fresh lime juice — 2 tbsp (about 1 lime)',
          'Soy sauce — 2 tbsp',
          'Sugar — 1 tbsp',
          'Garlic — 2 cloves, finely grated',
          'Red chile — 1, thinly sliced',
          'Avocado oil — 2 tbsp',
        ],
      },
      {
        name: 'To finish',
        items: [
          'Cilantro and mint leaves — 1/2 cup',
        ],
      },
    ],
    stepGroups: [
      {
        name: 'Method',
        items: [
          'Lay each cucumber on a cutting board and press down hard with the flat side of a chef\'s knife, or tap it with a rolling pin, until it cracks open. Cut into rough bite-size pieces — jagged is exactly what you want here.',
          'Toss the cucumbers with the salt in a colander set over a bowl and refrigerate at least 20 minutes. This pulls the excess water out. Skip it and you end up with a watery salad.',
          'Whisk the rice vinegar, lime juice, soy sauce, sugar, garlic, chile and oil together until the sugar is fully dissolved.',
          'Shake the liquid off the cucumbers, toss them with the dressing and pile into a shallow bowl. Top with the herbs and serve right away.',
        ],
      },
    ],
    notes: [
      'Dress the cucumbers just before serving so they stay crunchy. The dressing keeps up to a day ahead.',
      'Top with crispy fried shallots for extra crunch.',
    ],
  },
  {
    id: '12',
    slug: 'thai-roasted-chicken',
    title: 'Roasted Half Chicken with Roasted Carrots',
    description: 'Dry-brined half chickens roasted over carrots, shallots, lemongrass and ginger, finished with a bright green nam jim blended with the warm pan drippings.',
    intro: [
      'The vegetables cook in the drippings underneath while the skin goes dark and crackly on top. The sauce is where it all comes together — nam jim blended green and bright, then loosened at the very last second with the warm fat off the pan.',
    ],
    heroImage: '/images/recipe-thai-roasted-chicken.jpg',
    prepTime: 30,
    cookTime: 60,
    servings: 10,
    difficulty: 'MEDIUM',
    cuisine: 'Thai',
    category: 'Mains',
    tags: ['chicken', 'roast', 'thai', 'nam-jim'],
    isSubscriber: false,
    isFeatured: true,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'For the chicken',
        items: [
          'Whole chickens — 3 (3.5–4 lb each), backbones removed and split in half',
          'Kosher salt — 4 tbsp (Diamond Crystal; use 2 tbsp if using Morton)',
          'Black pepper — 1 tbsp',
          'Ground coriander — 1 tbsp',
          'Limes — zest of 3',
        ],
      },
      {
        name: 'For the roasting base',
        items: [
          'Carrots — 4 lb, halved lengthwise',
          'Shallots — 8, peeled and halved',
          'Lemongrass — 4 stalks, smashed and cut into 3-inch lengths',
          'Ginger — one 2-inch piece, sliced into coins',
          'Avocado oil — 2 tbsp',
          'Kosher salt — 1 tsp',
        ],
      },
      {
        name: 'For the Thai drippings sauce',
        items: [
          'Green Thai chiles — 5 (or 2 serranos)',
          'Garlic — 4 cloves',
          'Cilantro — 1 cup packed, leaves and stems',
          'Fresh lime juice — 1/3 cup (about 3 limes)',
          'Fish sauce — 3 tbsp',
          'Sugar — 1 tbsp',
          'Warm pan drippings — 1/2 cup',
        ],
      },
      {
        name: 'To garnish',
        items: [
          'Chives — cut into 2-inch batons on a slight angle',
          'Red chile — 1, thinly sliced',
          'Cilantro and mint leaves',
          'Lime wedges',
        ],
      },
    ],
    stepGroups: [
      {
        name: 'Dry-brine the chicken',
        items: [
          'Pat the chicken halves completely dry — moisture is the enemy of crispy skin, so be thorough here.',
          'Mix the salt, pepper, coriander and lime zest together, then rub it all over every half. Set them skin-up on a sheet pan and refrigerate uncovered for at least 2 hours, ideally overnight. The longer they sit the drier the skin gets, and dry skin is crispy skin.',
        ],
      },
      {
        name: 'Blend the sauce',
        items: [
          'Blend the green chiles, garlic, cilantro, lime juice, fish sauce and sugar until mostly smooth — leave a little texture in there, you are not making baby food.',
          'Taste it. It should hit sour first, then salty, then spicy. Set it aside. The drippings do not go in until the very end.',
        ],
      },
      {
        name: 'Roast',
        items: [
          'Pull the chicken out of the fridge about 30 minutes before you roast and get your oven to 475°F. Toss the carrots, shallots, lemongrass and ginger with the avocado oil and salt, then spread them across 2 sheet pans.',
          'Set the chicken halves right on top of the vegetables, skin-up. Roast 35–45 minutes, swapping the pans halfway through, until the thighs hit 175°F. Everything underneath is cooking in the drippings — that is the whole point.',
          'Broil one pan at a time for 3–5 minutes, until the skin is deep mahogany with blistered dark spots. Watch it closely, this turns on you fast.',
          'Move the chicken to a cutting board and let it rest 10 minutes. Leave the carrots and shallots on the pans.',
        ],
      },
      {
        name: 'Finish and plate',
        items: [
          'Spoon about 1/2 cup of the warm drippings — the fat and the dark juices underneath — into the blended sauce and stir. Taste and adjust with more lime or fish sauce.',
          'Cut each half into breast, thigh and drumstick. Pile the carrots and shallots onto a platter and lay the chicken on top.',
          'Spoon the sauce across the middle and leave some of that crisp skin showing. Finish with chive batons, red chile, cilantro, mint and lime wedges.',
        ],
      },
    ],
    notes: [
      'Adding the drippings at the end, after blending, keeps the sauce bright green and gives it a rich, savory depth.',
      'Take the lemongrass and ginger off the platter before serving, or leave them for presentation — either way they are not meant to be eaten.',
      'Remove some of the chile seeds before blending if you want a milder sauce.',
    ],
  },
  {
    id: '13',
    slug: 'beef-tartare-on-focaccia',
    title: 'Beef Tartare on Focaccia',
    description: 'Hand-cut beef tartare piled onto focaccia, finished with egg yolk and chives.',
    heroImage: '/images/recipe-beef-tartare-focaccia.jpg',
    prepTime: null,
    cookTime: null,
    servings: null,
    difficulty: 'MEDIUM',
    cuisine: 'Italian-inspired',
    category: 'Starters',
    tags: ['beef', 'tartare', 'focaccia', 'raw'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
  },
  {
    id: '20',
    slug: 'spanish-omelette-taleggio',
    title: 'Spanish Omelette with Taleggio, Bacon & Spinach',
    description: 'Spanish Omelette with Taleggio, Bacon & Spinach.',
    heroImage: '/images/recipe-spanish-omelette.jpg',
    prepTime: null,
    cookTime: null,
    servings: 2,
    difficulty: 'MEDIUM',
    cuisine: 'Spanish-inspired',
    category: 'Breakfast',
    tags: ['brunch', '30-min'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'The Base',
        items: [
          'Thick-cut bacon — 3 strips',
          'Spinach — 1 handful',
          'Yukon Gold potatoes — 2 small'
        ],
      },
      {
        name: 'The Omelette',
        items: [
          'Eggs — 4 large',
          'Taleggio — 10–12 cubes',
          'Olive oil — for frying',
          'Salt — to taste',
          'Black pepper — to taste'
        ],
      },
      {
        name: 'To Finish',
        items: [
          'Sharp white cheddar — finely grated',
          'Chives — to top',
          'Croissant toast — to serve'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'Prep',
        items: [
          'Chop 3 strips of thick-cut bacon into small pieces. Add to a pan over medium heat and stir constantly until fully cooked and crispy.',
          'Add a handful of spinach to the same pan. Cook until wilted, season with salt and pepper, then transfer to a bowl and set aside.',
          'Remove the spinach from the bowl and squeeze out all the excess liquid. Place on a cutting board, cut into 4 pieces, and return to the bowl.',
          'Peel 2 small Yukon Gold potatoes and place in a bowl of water to rinse off the starch. Using the same peeler like a mandoline, thinly slice the potatoes into the water. Remove and lay on a paper-towel-lined sheet tray, patting completely dry.',
          'Crack 4 eggs into a bowl and season lightly with salt and pepper. Whisk until fully combined and smooth, then set aside.',
          'Cube a generous amount of Taleggio — about 10–12 pieces — and set aside for later.'
        ],
      },
      {
        name: 'Cook',
        items: [
          'Heat a small non-stick pan over medium with a drizzle of olive oil. Once hot, add a small handful of the sliced potatoes and fry until golden and crispy.',
          'Once the potatoes are crispy, swirl the pan to coat evenly with oil. Pour in the whisked eggs and gently scramble. Add the Taleggio, bacon, and spinach, giving everything a light stir to combine.',
          'Maintain steady medium heat. Every 1–2 minutes, gently pull the edges toward the center to let uncooked egg flow in and cook. Continue until just a minimal amount of wet egg remains.',
          'When the omelette is set and semi-firm, place a small sheet tray over the pan. Press down and carefully flip the omelette onto the tray. Lightly oil the pan again, then slide it back in to cook the other side for at least 3–4 minutes — longer if you prefer a firmer omelette.'
        ],
      },
      {
        name: 'Plate',
        items: [
          'Transfer to a cutting board and slice into 3 pieces.',
          'Top with finely grated sharp white cheddar and a sprinkle of chives. Serve alongside croissant toast.'
        ],
      }
    ],
  },
  {
    id: '21',
    slug: 'confit-leeks-burrata',
    title: 'Confit Leeks & Burrata',
    description: 'Confit Leeks & Burrata.',
    heroImage: '/images/recipe-confit-leeks-burrata.jpg',
    prepTime: null,
    cookTime: null,
    servings: 2,
    difficulty: 'EASY',
    cuisine: 'Italian-inspired',
    category: 'Starters',
    tags: ['starter', 'vegetarian'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'The Confit',
        items: [
          'Leeks — 6–7, white & pale green only',
          'Garlic — 4–5 cloves, smashed',
          'Whole peppercorns — 10–15',
          'Fresh thyme — 4–5 sprigs',
          'Fresh rosemary — 4–5 sprigs',
          'Bay leaves — 2',
          'Lemon rind — a couple strips',
          'Olive oil — enough to submerge'
        ],
      },
      {
        name: 'To Plate',
        items: [
          'Burrata — 1 ball',
          'Fig balsamic glaze — to drizzle',
          'Whipped honey — a touch',
          'Flaky salt — to finish',
          'Baguette — to serve'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'The Confit',
        items: [
          'Trim the tough, dark green tops from 6–7 leeks, keeping only the tender, pale green and white parts. Slice into 1–1.5-inch pieces, then rinse thoroughly to remove any dirt or grit. Pat them dry — you want them clean, not soggy.',
          'Place the leeks in a pot or pan large enough to hold them. Add 4–5 smashed garlic cloves, 10–15 whole peppercorns, 4–5 sprigs each of thyme and rosemary, 2 bay leaves, and a couple strips of lemon rind. Everything goes in together — this is your flavor base.',
          'Pour in enough olive oil to completely submerge everything. Set over the lowest heat and let it slowly come up to temperature — you\'re looking for a gentle, lazy bubble, nothing aggressive. The goal is to let the leeks and aromatics infuse, not fry.',
          'While the oil comes up to temp, preheat your oven to 275°F. Once ready, transfer the whole pot — leeks, oil, and all — into the oven. Cook low and slow for about 1½ hours, or until the leeks are melt-in-your-mouth tender when pierced with a fork.',
          'Carefully pull the pot from the oven and let everything cool before plating. That oil is hot as hell — give it a few minutes before you touch anything.'
        ],
      },
      {
        name: 'To Plate',
        items: [
          'Grab a plate and place half a burrata — or a whole one if you\'re feeling generous — right in the center. If using a full ball, cut it open so that creamy center shows off a little. Drizzle with fig balsamic glaze and a touch of whipped honey.',
          'Add 2–3 confit leeks alongside with a spoonful of that golden oil, then finish with a pinch of flaky salt. Serve with baguette or whatever good bread you\'ve got on hand.'
        ],
      }
    ],
  },
  {
    id: '22',
    slug: 'creamy-chicken-kale-pasta',
    title: 'Creamy Chicken and Kale Pasta',
    description: 'Creamy Chicken and Kale Pasta.',
    heroImage: '/images/recipe-chicken-kale-pasta.jpg',
    prepTime: null,
    cookTime: null,
    servings: 4,
    difficulty: 'EASY',
    cuisine: 'Italian-inspired',
    category: 'Mains',
    tags: ['mains', 'comfort'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'The Crunch Topping',
        items: [
          'Panko breadcrumbs — equal parts w/ pistachios',
          'Pistachios — crushed to panko size',
          'Olive oil — to coat',
          'Garlic — 2–3 cloves, smashed',
          'Fresh rosemary — 1–2 sprigs',
          'Fresh thyme — 1–2 sprigs'
        ],
      },
      {
        name: 'The Pasta',
        items: [
          'Chicken thighs — bite-sized cubes',
          'Shallot — 1 large, diced',
          'Garlic — 5 cloves total',
          'Kale — 1 bunch, chopped',
          'White wine — 1 cup',
          'Chicken stock — 3–4 cups',
          'Pasta — of choice',
          'Heavy cream — 1 cup',
          'Parmigiano Reggiano — 1–2 cups, grated',
          'Butter — 2 tbsp',
          'Salt & black pepper — to taste'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'The Crunch Topping',
        items: [
          'Preheat your oven to 375°F.',
          'Crush pistachios until they\'re about the size of panko, or slightly bigger — a food processor works perfectly. On a sheet tray, combine equal parts panko and crushed pistachios, drizzle with olive oil, and add 2–3 smashed garlic cloves plus 1–2 sprigs each of rosemary and thyme.',
          'Bake at 375°F for 10–15 minutes until golden and toasted. Remove from the oven and set aside to cool.'
        ],
      },
      {
        name: 'The Pasta',
        items: [
          'Dice a large shallot and thinly slice 3 garlic cloves. Set aside. Cut the chicken thighs into bite-sized cubes and smash 2 more garlic cloves with 2 sprigs each of rosemary and thyme to cook with the chicken.',
          'Wash a bunch of kale and chop into bite-sized pieces.',
          'Heat a large pot over medium-high with a drizzle of oil. Add the chicken, season with salt, and spread evenly. Let it sit undisturbed until a golden crust forms on one side.',
          'Flip each piece. Add the 2 smashed garlic cloves, rosemary, and thyme. Drizzle in a bit more oil, shake the pot gently, and let the other side crust up golden.',
          'Once golden on both sides, remove the chicken and set aside in a bowl.',
          'Add a bit more oil and reduce heat to medium. Add the shallot and sliced garlic, then the kale. Sauté until the kale wilts and shrinks down.',
          'Pour in 1 cup of white wine. Let it cook until the alcohol cooks off and the liquid reduces slightly.',
          'Add 3–4 cups of chicken stock and the chicken. Simmer and reduce for 15–20 minutes.',
          'Meanwhile, bring a separate pot of heavily salted water to a rolling boil. Cook your pasta of choice. Before straining, save about ¼ cup of pasta water.',
          'Stir 1 cup of heavy cream into the chicken-stock mixture. Add a generous amount of Parmigiano Reggiano — a cup, maybe two — and mix until rich and creamy.',
          'Season with salt and pepper. Add the pasta and pasta water. Stir in 2 tablespoons of butter. Creamy, cheesy perfection.'
        ],
      },
      {
        name: 'To Serve',
        items: [
          'Serve in a bowl, scooping up plenty of sauce and chicken. Top generously with Parmigiano Reggiano and a big sprinkle of the toasted panko-pistachio crunch.'
        ],
      }
    ],
  },
  {
    id: '23',
    slug: 'luther-burger',
    title: 'Luther Burger',
    description: 'Luther Burger.',
    heroImage: '/images/recipe-luther-burger.jpg',
    prepTime: null,
    cookTime: null,
    servings: 2,
    difficulty: 'MEDIUM',
    cuisine: 'American',
    category: 'Mains',
    tags: ['mains', 'smash-burger'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'The Bacon Jam',
        items: [
          'Bacon — 4–6 slices, thinly sliced',
          'Red onion — 1, half-moon sliced',
          'Butter — a knob',
          'Brown sugar — 2–3 tbsp',
          'Champagne vinegar — 2 tbsp',
          'Balsamic glaze — 2–3 tbsp',
          'Salt — to taste'
        ],
      },
      {
        name: 'The Smash Burger',
        items: [
          '80/20 ground beef — 1 lb, 4 portions',
          'Beef tallow — for the pan',
          'American cheese — 1 slice per patty',
          'Salt & black pepper — to season'
        ],
      },
      {
        name: 'To Build',
        items: [
          'Glazed donuts — 2–4, as the bun',
          'Sauce of choice — to taste'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'The Bacon Jam',
        items: [
          'Divide 1 pound of 80/20 ground beef into 4 even portions. Shape each into a ball and set aside.',
          'Thinly slice 4–6 bacon strips. Place in a cold pan over medium heat and stir constantly until perfectly crispy. Remove and discard the bacon fat.',
          'Trim both ends off a red onion, halve it, and slice thinly into half-moon shapes.',
          'Heat the same pan over medium-low. Add a knob of butter and all the sliced onions. Sauté until beautifully caramelized, seasoning with salt as you go — this draws out moisture and builds flavor. Lower the heat if the pan gets too hot.',
          'Stir in 2–3 tablespoons of brown sugar, then 2 tablespoons of champagne vinegar. Fold in the crispy bacon until combined.',
          'Stir in 2–3 tablespoons of balsamic glaze. Taste and adjust with more glaze, brown sugar, or salt. Bacon jam is done.'
        ],
      },
      {
        name: 'The Smash Burger',
        items: [
          'Cut a large sheet of parchment into 4 squares — about 2–3 times the size of your beef balls. Place each ball on its own square.',
          'Heat a cast iron or stainless steel pan over medium-high until smoking hot.',
          'Add a knob of beef tallow and coat the surface. Place a beef ball in the pan with parchment on top. Press down hard with a second pan and smash it flat.',
          'Remove the parchment, season immediately with salt and pepper. Cook 45–60 seconds, then flip. Add a slice of American cheese and cook another 45–60 seconds. Transfer to your glazed donut.',
          'Repeat for the remaining patties — stack a second for a double if you\'re feeling it.'
        ],
      },
      {
        name: 'To Build',
        items: [
          'Spoon bacon jam generously over the patty. Add whatever sauce you want, close the donut top, and go.'
        ],
      }
    ],
  },
  {
    id: '24',
    slug: 'perfect-crispy-gnocchi',
    title: 'Perfect Crispy Gnocchi',
    description: 'Perfect Crispy Gnocchi.',
    heroImage: '/images/recipe-crispy-gnocchi.jpg',
    prepTime: null,
    cookTime: null,
    servings: 2,
    difficulty: 'EASY',
    cuisine: 'Italian',
    category: 'Mains',
    tags: ['mains', 'comfort'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'The Gnocchi',
        items: [
          'Yukon Gold potatoes — 4 large',
          'Salt — for bed + seasoning',
          'Egg yolk — 1',
          'All-purpose flour — ⅓ cup + more if needed'
        ],
      },
      {
        name: 'To Crisp',
        items: [
          'Butter — plenty',
          'Fresh sage — optional, to taste'
        ],
      },
      {
        name: 'To Finish',
        items: [
          'Parmigiano Reggiano — generous sprinkle',
          'Black pepper — freshly cracked',
          'Calabrian chili oil — to drizzle',
          'Pesto — optional, for a herby twist'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'The Gnocchi',
        items: [
          'Preheat your oven to 400°F. Cover the bottom of a tray with a layer of salt. Poke holes all over 4 large Yukon Gold potatoes, lay them on the salt bed, and roast for 45–60 minutes — until a knife slides through effortlessly.',
          'Let the potatoes rest 10 minutes before peeling. Pass them through a potato ricer, or roughly mash then push through a fine sieve. Add 1 egg yolk and ⅓ cup of flour, then gently knead in the bowl. Add a little more flour if the dough feels too wet, but don\'t overwork it.',
          'Let the dough rest 20–30 minutes to relax — it makes rolling much easier.',
          'Roll the dough into a log about ½ inch thick. Cut into pieces roughly ¾ inch long — perfect bite-sized gnocchi. Shape them if you like, or leave them as-is.'
        ],
      },
      {
        name: 'Crisp & Serve',
        items: [
          'Bring a pot of salted water to a boil. Cook the gnocchi until they float, then immediately transfer to a hot pan over medium-high heat with plenty of butter. Let them crisp on one side, then flip and repeat until golden all over.',
          'After the first flip, toss in some fresh sage if using. Remove to a plate and finish with a generous sprinkle of Parmigiano Reggiano, freshly cracked black pepper, and a drizzle of Calabrian chili oil. Or serve in a bowl topped with plenty of pesto for a herby twist.'
        ],
      }
    ],
  },
  {
    id: '25',
    slug: 'arugula-caesar-pistachio-panko',
    title: 'Arugula Caesar with Toasted Pistachio-Panko Crunch',
    description: 'Arugula Caesar with Toasted Pistachio-Panko Crunch.',
    heroImage: '/images/recipe-arugula-caesar.jpg',
    prepTime: null,
    cookTime: null,
    servings: 2,
    difficulty: 'EASY',
    cuisine: 'Italian-inspired',
    category: 'Salads',
    tags: ['salads', '30-min'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'The Crunch',
        items: [
          'Pistachios — equal parts w/ panko',
          'Panko breadcrumbs — equal parts w/ pistachios',
          'Olive oil — to coat',
          'Garlic — 2 cloves, smashed',
          'Fresh rosemary — 1 sprig',
          'Fresh thyme — 1 sprig'
        ],
      },
      {
        name: 'The Caesar Dressing',
        items: [
          'Anchovies — 2–3, minced to a paste',
          'Mayonnaise — 1 cup',
          'Dijon mustard — ⅓ cup',
          'Champagne citrus vinegar — 2 tbsp + more to dress',
          'Lemon — zested + juice of 2 wedges',
          'Garlic — 2 cloves, minced',
          'Parmigiano Reggiano — ½ cup, grated',
          'Olive oil — to loosen',
          'Salt & black pepper — to taste'
        ],
      },
      {
        name: 'The Salad',
        items: [
          'Arugula — 1 large bunch, rinsed',
          'Parmigiano Reggiano — generous pile, to top'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'The Crunch',
        items: [
          'Crush up your pistachios. Chop them by hand or give them a quick blitz in a food processor. You\'re aiming for pieces about twice the size of panko — small enough to stick, but still with some texture and crunch.',
          'Toss the crushed pistachios with an equal amount of panko on a sheet tray. Drizzle lightly with olive oil and mix gently so everything gets a thin, even coating — you want them shiny, not drenched.',
          'Smash 2 garlic cloves and scatter them over the tray. Add 1 sprig each of rosemary and thyme, letting the aromatics mingle with the pistachio-panko mix.',
          'Slide the tray into a 375°F oven and toast for 10–15 minutes, until everything turns golden brown and your kitchen smells absolutely amazing. Pull out and set aside — this is your crunch garnish.'
        ],
      },
      {
        name: 'The Caesar Dressing',
        items: [
          'Mince 2–3 anchovies until they form a paste. Transfer to a bowl or deli container — this is your punchy flavor base.',
          'Into the same bowl, add 1 cup mayo, ⅓ cup Dijon mustard, 2 tablespoons champagne citrus vinegar, the zest of a whole lemon, juice from 2 lemon wedges, 2 minced garlic cloves, and ½ cup grated Parmigiano Reggiano. Stir everything together until smooth.',
          'Season with salt and pepper to taste. Drizzle in a bit of olive oil to loosen the dressing and add a subtle, silky finish. Taste and adjust — more lemon, more Parm, whatever it needs.'
        ],
      },
      {
        name: 'To Plate',
        items: [
          'Rinse your arugula thoroughly and toss it into a bowl. Lightly dress with a splash of champagne citrus vinegar, then add as much Caesar dressing as you like — go heavy if you\'re feeling indulgent.',
          'Toss to coat evenly, then plate it up. Pile on a generous mountain of Parmigiano Reggiano and finish with a hearty sprinkle of that toasty pistachio-panko crunch. Enjoy.'
        ],
      }
    ],
  },
  {
    id: '26',
    slug: 'tomato-tart',
    title: 'Tomato Tart',
    description: 'Heirloom tomatoes and razor-thin garlic on puff pastry, finished with Parmigiano, fig balsamic and basil.',
    intro: [
      'This dish is so good... Like who knew tomatoes can be this good! I used to hate tomatoes, and this dish is one of the dishes that changed my perspective on tomatoes forever.',
      "I got the inspiration to make this dish from Thomas Straker, one of my favorite chefs. I also made this dish for my most recent private dinner and everyone loved it. I thought it'd be a great idea to share it with you. So here we are now...",
    ],
    heroImage: '/images/recipe-tomato-tart.jpg',
    prepTime: null,
    cookTime: 30,
    servings: 6,
    difficulty: 'EASY',
    cuisine: 'French-inspired',
    category: 'Starters',
    tags: ['starter', 'summer'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'The Tart',
        items: [
          'Puff pastry — 1 sheet, room temp',
          'Heirloom tomatoes — thinly sliced',
          'Garlic — 2–3 cloves, razor-thin',
          'Salt — to season'
        ],
      },
      {
        name: 'To Finish',
        items: [
          'Finishing olive oil — to drizzle',
          'Parmigiano Reggiano — freshly grated',
          'Fig balsamic glaze — to drizzle',
          'Chives — 1 bunch, thinly sliced',
          'Fresh basil — torn, to finish'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'The Tart',
        items: [
          'Preheat your oven to 375°F. Take your puff pastry out and let it come to room temperature so it\'s easier to work with.',
          'Thinly slice your heirloom tomatoes, season lightly with salt, and set aside. Slice 2–3 garlic cloves as thinly as humanly possible — razor-thin, the thinner the better.',
          'Place the puff pastry on a lightly floured sheet tray. Pat the tomatoes dry, then arrange them in a stacked, staircase-like row. Top each tomato slice with a thin slice of garlic. Bake at 375°F for 15–20 minutes, until the pastry is golden and the tomatoes are perfectly cooked.',
          'While the tart bakes, thinly slice a whole bunch of chives for garnish.'
        ],
      },
      {
        name: 'To Finish',
        items: [
          'Once out of the oven, drizzle with a good finishing olive oil. Grate Parmigiano Reggiano around the edges, drizzle fig balsamic glaze over the top, and finish with a scattering of sliced chives and freshly torn basil leaves.',
          "Enjoy that shit, because it's good as fuck."
        ],
      }
    ],
  },
  {
    id: '27',
    slug: 'famous-fried-chicken',
    title: 'Famous Fried Chicken',
    description: 'Famous Fried Chicken.',
    heroImage: '/images/recipe-famous-fried-chicken.jpg',
    prepTime: null,
    cookTime: null,
    servings: 2,
    difficulty: 'MEDIUM',
    cuisine: 'American',
    category: 'Mains',
    tags: ['mains', 'fried'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'The Marinade',
        items: [
          'Chicken thighs — 4–6 pieces (or any cut)',
          'Buttermilk — enough to fully cover',
          'Pickle juice — 3 tbsp',
          'Kosher salt — to season',
          'Black pepper — to season',
          'Garlic powder — to season',
          'Onion powder — to season',
          'Smoked paprika — to season'
        ],
      },
      {
        name: 'The Dredge',
        items: [
          'All-purpose flour — a generous amount',
          'Kosher salt — to season the flour',
          'Black pepper — to season the flour',
          'Onion powder — to season the flour',
          'Garlic powder — to season the flour',
          'Smoked paprika — to season the flour'
        ],
      },
      {
        name: 'To Fry',
        items: [
          'Duck fat — enough to fill pot halfway'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'The Marinade',
        items: [
          'This marinade and dredge work with any cut of chicken you want to fry — thighs, drumsticks, breast, wings. Whatever you\'re working with, the method is the same.',
          'Season the chicken generously with salt, pepper, garlic powder, onion powder, and smoked paprika.',
          'Place the chicken in a gallon Ziploc bag and pour in enough buttermilk to fully cover it. Add 3 tablespoons of pickle juice, then sprinkle in a bit of the same seasonings — not too much, just enough to complement.',
          'Place the bag in a bowl and refrigerate for at least 4 hours. Overnight is even better for maximum flavor.'
        ],
      },
      {
        name: 'The Dredge',
        items: [
          'When you\'re ready, remove the chicken from the fridge. Grab a large bowl and add a generous amount of flour. Season it generously with salt, pepper, onion powder, garlic powder, and smoked paprika.',
          'Now the most crucial part — pour a couple tablespoons of the buttermilk mixture into the seasoned flour. Use a fork to stir it in until it forms little flour clumps. Those clumps are everything. That\'s what makes the crust shatter.'
        ],
      },
      {
        name: 'Batter & Fry',
        items: [
          'Fill a large pot halfway with duck fat. Set over medium heat and let it come up to temperature. To test, drop a pinch of flour into the oil — if it bubbles and fries immediately, you\'re good to go.',
          'Take one piece of chicken out of the bag, letting the excess buttermilk drip back in. Place it in the flour, scoop more flour on top, and press firmly so the entire piece is fully coated. Repeat with the remaining chicken and set the coated pieces on a plate or wire rack.',
          'Carefully add 2–3 pieces of chicken to the hot duck fat. Fry for 10–15 minutes, or until fully cooked through, stirring gently and occasionally. Work in batches — don\'t crowd the pot.'
        ],
      },
      {
        name: 'Serve',
        items: [
          'Transfer to a wire rack or a paper-towel-lined plate to drain and cool slightly. Then enjoy that shit.'
        ],
      }
    ],
  },
  {
    id: '28',
    slug: 'favorite-burger',
    title: 'Probably my FAVORITE burger...',
    description: 'Probably my FAVORITE burger....',
    heroImage: '/images/recipe-favorite-burger.jpg',
    prepTime: null,
    cookTime: null,
    servings: 2,
    difficulty: 'MEDIUM',
    cuisine: 'American',
    category: 'Mains',
    tags: ['mains', 'burgers'],
    isSubscriber: false,
    isFeatured: false,
    rating: 0,
    commentCount: 0,
    likeCount: 0,
    ingredientGroups: [
      {
        name: 'Bacon Jam',
        items: [
          'Bacon — 6 strips, cut into lardons',
          'Sweet onion — 1 medium, thinly sliced',
          'Brown sugar — 2 tbsp',
          'Champagne vinegar — 1 tbsp',
          'Balsamic glaze — 1 tbsp',
          'Maple syrup — 1 tsp (optional)'
        ],
      },
      {
        name: 'Special Burger Sauce',
        items: [
          'Shallot — 1 small, minced',
          'Mayonnaise — 3 tbsp',
          'Ketchup — 1 tbsp',
          'Dijon mustard — 1 tsp',
          'Champagne vinegar — ½ tsp',
          'Salt & black pepper — to taste'
        ],
      },
      {
        name: 'The Burger',
        items: [
          'Ground beef (80/20) — ½ lb per patty',
          'Gouda cheese — 2 slices per patty',
          'Sweet onion — 1 thick slice, whole ring',
          'Unsalted butter — 1 tbsp',
          'Eggs — 1 per burger',
          'Brioche bun — 1 per burger, toasted',
          'Salt & black pepper — to season'
        ],
      }
    ],
    stepGroups: [
      {
        name: 'Make the Bacon Jam',
        items: [
          'This is the move that elevates everything. In a cold pan, add the bacon lardons and bring the heat up slowly over medium. Render out all that fat until the bacon is crispy. Don\'t rush it.',
          'Remove the bacon and set aside, leaving all the fat in the pan. Add the sliced onions and cook low and slow — 20–25 minutes — stirring occasionally until deeply caramelized and jammy.',
          'Add the brown sugar, champagne vinegar, balsamic glaze, and maple syrup if using. Stir everything together. Return the bacon to the pan. Cook another 5 minutes until thick, sticky, and glossy. Pull off heat and set aside.'
        ],
      },
      {
        name: 'Make the Burger Sauce',
        items: [
          'Combine the minced shallot, mayo, ketchup, Dijon, champagne vinegar, salt, and pepper in a small bowl. Whisk together and taste — adjust salt and vinegar as needed. Refrigerate until you\'re ready to build.'
        ],
      },
      {
        name: 'Grill the Whole Onion',
        items: [
          'Cut a thick slice from the center of a sweet onion — you want a full ring, intact. Season with salt and pepper. Heat a cast iron or grill pan over medium-high with butter. Sear the onion slice 3–4 minutes per side until caramelized on both sides. Set aside.'
        ],
      },
      {
        name: 'Cook the Patty',
        items: [
          'Divide the 80/20 ground beef into ½ lb portions. Season generously with salt and pepper on both sides. Form loosely — don\'t overwork it.',
          'Get a cast iron ripping hot. Add the patties and press firmly with a spatula — smash burgers get their crust from contact. Let it cook undisturbed for 2–3 minutes until a deep crust forms.',
          'Flip once. Immediately lay 2 slices of gouda on top. Cook another 2 minutes to medium-rare — internal temp 130–135°F. Pull and let it rest.'
        ],
      },
      {
        name: 'Fry the Egg',
        items: [
          'In a separate non-stick pan over low heat, melt a knob of butter. Crack in the egg and let it cook completely undisturbed until the whites are fully set but the yolk is still runny. Season with salt and pepper.'
        ],
      },
      {
        name: 'Toast the Bun & Build',
        items: [
          'Toast the brioche bun cut-side down in a dry pan over medium heat until golden. Don\'t skip this — a toasted bun holds everything together and adds texture.',
          'Spread burger sauce generously on both sides of the bun. Bottom bun gets the patty. Layer on the whole grilled onion, then a generous spoonful of bacon jam. Crown it with the sunny side up egg. Top bun goes on.',
          'Cut in half if you want to show off the yolk break. Serve immediately.'
        ],
      }
    ],
  }
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
    name: 'yurr cooked Canvas Apron',
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
    description: '7 oz ring-spun cotton, relaxed fit. "yurr cooked" embroidered chest logo. Washes beautifully, keeps its shape.',
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
    name: 'yurr cooked Spice Collection',
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
    title: 'The yurr cooked Pantry Setup Guide',
    excerpt: 'The 40 ingredients we always have on hand — and why they matter.',
    category: 'Pantry',
    heroImage: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=1200&q=80',
    publishedAt: '2024-11-30',
    readTime: 12,
  },
]
