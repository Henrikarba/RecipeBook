import { useState } from "react";

// ---------------------------------------------------------------------------
// CONFIG — edit this block to rebrand the app. Nothing below needs changing.
// ---------------------------------------------------------------------------
const CONFIG = {
  title: "Recipe Book",
  subtitle: "cook anything, scaled to your table",
  emoji: "🍳",
  baseServings: 5,        // the servings the recipe amounts below are written for
  servingOptions: [1, 2, 3, 4, 5, 6, 8, 10],

  // Optional shopping-language helper. Set `enabled: false` to hide it entirely,
  // or swap the terms list for another country/language.
  shoppingGuide: {
    enabled: true,
    label: "🇮🇹",         // shown before each local name
    hint: "shopping in Italy",
  },

  // Units that describe a gesture rather than a quantity, so they never scale.
  unscalableUnits: ["pinch", "scrapes", "handful", "sprigs"],
};

const recipes = [
  {
    id: 1,
    name: "Bruschetta al Pomodoro",
    cuisine: "Italian",
    level: "Easy",
    time: "15 min",
    emoji: "🍅",
    description: "Grilled bread with fresh tomato, garlic and basil. The perfect starter.",
    ingredients: [
      { amount: 10, unit: "slices", name: "thick rustic bread (ciabatta or pane toscano)" },
      { amount: 6, name: "ripe tomatoes, diced" },
      { amount: 3, name: "garlic cloves" },
      { amount: 1, unit: "handful", name: "fresh basil leaves" },
      { amount: 5, unit: "tbsp", name: "extra virgin olive oil" },
      { amount: 1, unit: "tsp", name: "salt" },
      { amount: 0.5, unit: "tsp", name: "black pepper" },
    ],
    steps: [
      { title: "Prep tomatoes", content: "Dice {i:1}, remove seeds. Mix with half the {i:4}, {i:5}, {i:6} and torn basil. Let sit 10 min." },
      { title: "Grill bread", content: "Grill or toast {i:0} until golden and crisp on both sides." },
      { title: "Rub garlic", content: "While still hot, rub each slice with the cut side of a {i:2}." },
      { title: "Assemble", content: "Drizzle remaining {i:4} on bread, spoon tomato mixture generously on top. Serve immediately." },
    ],
    tip: "Use the ripest tomatoes you can find — this dish lives or dies by tomato quality."
  },
  {
    id: 2,
    name: "Pasta alla Norcina",
    cuisine: "Italian",
    level: "Easy",
    time: "25 min",
    emoji: "🌭",
    description: "Umbrian sausage and cream pasta. The sauce cooks in the time the pasta boils — nothing else on this list tastes like it.",
    ingredients: [
      { amount: 500, unit: "g", name: "penne or rigatoni" },
      { amount: 500, unit: "g", name: "Italian sausage, casings removed" },
      { amount: 2, name: "garlic cloves, crushed" },
      { amount: 150, unit: "ml", name: "dry white wine" },
      { amount: 200, unit: "ml", name: "panna fresca (cream, ~35%)" },
      { amount: 100, unit: "g", name: "Pecorino Romano, grated" },
      { amount: 2, unit: "tbsp", name: "olive oil" },
      { amount: 1, unit: "tsp", name: "black pepper" },
      { amount: 2, unit: "tsp", name: "salt (for pasta water)" },
    ],
    steps: [
      { title: "Start the pasta", content: "Put {i:0} on to boil in well-salted water using {i:8}. Everything else finishes in the time it takes to cook, so start here. Reserve a cup of pasta water before draining." },
      { title: "Brown the sausage", content: "Heat {i:6} in a wide pan over medium-high. Crumble in {i:1} and break it up with a spoon. Fry 6–8 min until properly browned in places — don't just cook it grey, the colour is the flavour. Add {i:2} for the last minute." },
      { title: "Deglaze", content: "Pour in {i:3}, scrape the pan and let it bubble away almost completely, about 2 min." },
      { title: "Add cream", content: "Stir in {i:4} and {i:7}. Simmer gently 3–4 min until slightly thickened. Taste — it should be rich but not heavy." },
      { title: "Combine", content: "Add the drained pasta to the pan with a splash of pasta water and toss over low heat 1 min. Take off the heat, add {i:5} and toss until creamy. Serve immediately." },
    ],
    tip: "Use real Italian sausage with fennel if you can find it — that's what makes the dish. Plain pork sausage works but add a pinch of crushed fennel seed with the garlic. Keep the heat off when the pecorino goes in, same as cacio e pepe."
  },
  {
    id: 3,
    name: "Honey Soy Ginger Salmon",
    cuisine: "Asian",
    level: "Easy",
    time: "25 min",
    emoji: "🐟",
    description: "Pan-seared salmon with a sticky sweet-savoury glaze. Not Italian at all — but quick, and a break from pasta.",
    ingredients: [
      { amount: 5, name: "salmon fillets (skin-on)" },
      { amount: 8, unit: "tbsp", name: "soy sauce" },
      { amount: 5, unit: "tbsp", name: "honey" },
      { amount: 2.5, unit: "tsp", name: "fresh ginger, grated" },
      { amount: 5, name: "garlic cloves, minced" },
      { amount: 2.5, unit: "tsp", name: "sesame oil" },
      { amount: 2.5, unit: "tbsp", name: "lime juice" },
      { amount: 2.5, unit: "tbsp", name: "olive oil" },
      { amount: 2.5, unit: "tsp", name: "sesame seeds (optional)" },
      { amount: 2, name: "spring onions, sliced (optional)" },
    ],
    steps: [
      { title: "Make the marinade", content: "Mix {i:1}, {i:2}, {i:3}, {i:4}, {i:5} and {i:6} together in a bowl." },
      { title: "Marinate", content: "Pat {i:0} dry with paper towel — wet fish won't sear. Pour the marinade over and leave 15 min. Don't go much longer: the lime starts to cure the fish and turns the texture chalky." },
      { title: "Sear", content: "Heat {i:7} in a wide pan over medium-high. Lift the fillets out of the marinade (keep it) and lay them skin-side down. Don't move them for 4 min — that's how the crust forms. Cook in two batches unless your pan is very large; crowded fillets steam instead of searing." },
      { title: "Glaze", content: "Flip the fillets and pour the reserved marinade into the pan. Let it bubble and reduce to a sticky glaze while the second side cooks, about 3 min. Stay close — the honey catches fast." },
      { title: "Serve", content: "Spoon the glaze over the top. Scatter with {i:8} and {i:9} if using. Serve immediately — the glaze stiffens as it cools." },
    ],
    tip: "Salmon is done when it flakes with gentle pressure and is still slightly translucent in the middle. If you cook it until uniformly opaque it's already dry. Soy sauce and sesame oil aren't standard in small Italian supermarkets — check the 'etnico' or 'cucina del mondo' aisle, or bring them if you're planning this in advance."
  },
  {
    id: 4,
    name: "Saltimbocca alla Romana",
    cuisine: "Italian",
    level: "Intermediate",
    time: "25 min",
    emoji: "🍖",
    description: "Veal with prosciutto and sage, pan-seared in butter and wine. The name means 'jumps in the mouth' — 20 minutes, tastes like a restaurant.",
    ingredients: [
      { amount: 10, name: "thin veal or chicken escalopes" },
      { amount: 10, unit: "slices", name: "prosciutto crudo" },
      { amount: 10, name: "fresh sage leaves" },
      { amount: 50, unit: "g", name: "plain flour (for dusting)" },
      { amount: 60, unit: "g", name: "butter" },
      { amount: 2, unit: "tbsp", name: "olive oil" },
      { amount: 150, unit: "ml", name: "dry white wine" },
      { amount: 0.5, unit: "tsp", name: "black pepper" },
    ],
    steps: [
      { title: "Flatten the meat", content: "Place {i:0} between two sheets of cling film and pound thin with a rolling pin — about 5mm. Season with {i:7} only. Do not salt: the prosciutto brings plenty." },
      { title: "Assemble", content: "Lay one of the {i:2} flat on each escalope, then cover with a slice of {i:1}. Secure through all three layers with a toothpick so nothing slides off in the pan." },
      { title: "Flour lightly", content: "Dust only the bare meat side with {i:3}, tapping off the excess. Leave the prosciutto side bare — flour there stops it crisping." },
      { title: "Sear", content: "Heat {i:5} and half the {i:4} in a wide pan over medium-high. Lay them in prosciutto side down, cook 1 min until it crisps, then flip and cook 2 min more. Work in batches — crowding steams them. Remove to a warm plate." },
      { title: "Make the pan sauce", content: "Pour {i:6} into the hot pan, scrape up the browned bits and let it bubble down by half, about 2 min. Take off the heat and swirl in the remaining {i:4} until glossy. Pour over and serve straight away." },
    ],
    tip: "Ask the butcher to slice the escalopes thin and you skip the pounding entirely. Veal is traditional but chicken breast works well and is much cheaper for five. The fried sage leaf turns savoury and nutty in the butter — nothing like a raw leaf."
  },
  {
    id: 5,
    name: "Lasagne al Forno",
    cuisine: "Italian",
    level: "Challenging",
    time: "3 hrs",
    emoji: "🍝",
    description: "Slow ragù, proper béchamel, layered and baked. Classic, or the Bologna original with green spinach sheets and a white-wine ragù — homemade pasta or dried sheets either way.",
    variants: [
      { options: [
        { id: "classic", label: "Classic" },
        { id: "bologna", label: "Bolognese (green)" },
      ] },
      { options: [
        { id: "fresh", label: "Fresh pasta" },
        { id: "dry", label: "Dried sheets" },
      ] },
    ],
    times: [
      { only: ["classic", "dry"], time: "2.5 hrs" },
      { only: ["bologna", "fresh"], time: "4 hrs" },
      { only: ["bologna", "dry"], time: "3 hrs" },
    ],
    ingredients: [
      // Pasta
      { amount: 400, unit: "g", name: "00 flour (pasta)", only: ["fresh"] },
      { amount: 4, name: "eggs (pasta)", only: ["classic", "fresh"] },
      { amount: 3, name: "eggs (pasta)", only: ["bologna", "fresh"] },
      { amount: 200, unit: "g", name: "fresh spinach", only: ["bologna", "fresh"] },
      { amount: 250, unit: "g", name: "dried egg lasagne sheets", only: ["classic", "dry"] },
      { amount: 250, unit: "g", name: "dried green lasagne sheets", only: ["bologna", "dry"] },
      // Ragù
      { amount: 150, unit: "g", name: "pancetta (unsmoked), finely diced" },
      { amount: 1, name: "large onion, finely chopped" },
      { amount: 2, name: "carrots, finely chopped" },
      { amount: 2, name: "celery stalks, finely chopped" },
      { amount: 500, unit: "g", name: "minced beef, coarse (for ragù)" },
      { amount: 200, unit: "g", name: "minced pork", only: ["classic"] },
      { amount: 200, unit: "ml", name: "dry red wine", only: ["classic"] },
      { amount: 150, unit: "ml", name: "dry white wine", only: ["bologna"] },
      { amount: 400, unit: "g", name: "canned crushed tomatoes", only: ["classic"] },
      { amount: 3, unit: "tbsp", name: "tomato paste", only: ["classic"] },
      { amount: 300, unit: "g", name: "tomato passata", only: ["bologna"] },
      { amount: 1, unit: "tbsp", name: "tomato paste", only: ["bologna"] },
      { amount: 500, unit: "ml", name: "meat or vegetable stock", only: ["bologna"] },
      { amount: 200, unit: "ml", name: "whole milk" },
      // Béchamel
      { amount: 80, unit: "g", name: "butter (béchamel)" },
      { amount: 80, unit: "g", name: "plain flour (béchamel)" },
      { amount: 800, unit: "ml", name: "whole milk (béchamel)" },
      { amount: 150, unit: "ml", name: "whole milk, extra (béchamel)", only: ["dry"] },
      { amount: 6, unit: "scrapes", name: "nutmeg (freshly grated)" },
      // Assembly
      { amount: 150, unit: "g", name: "Parmigiano Reggiano, grated" },
      { amount: 20, unit: "g", name: "butter (for the top)", only: ["bologna"] },
    ],
    steps: [
      { title: "Make ragù", only: ["classic"], content: "Cook {i:6} until fat renders. Add {i:7}, {i:8}, {i:9} — cook 10 min. Add {i:10} and {i:11}, brown well. Add {i:12}, evaporate. Add {i:14} and {i:15}, stir. Add {i:19}. Simmer uncovered on very low heat 1.5–2 hrs, stirring occasionally. Season." },
      { title: "Soffritto", only: ["bologna"], content: "Melt {i:6} in a heavy pot over medium-low until the fat runs. Add {i:7}, {i:8} and {i:9} and soften gently 10 min — no colour." },
      { title: "Brown the meat", only: ["bologna"], content: "Add {i:10}, turn the heat up and break it apart. Cook until it loses its raw colour and starts to sizzle, about 10 min. Pour in {i:13} and let it evaporate completely." },
      { title: "Simmer the ragù", only: ["bologna"], content: "Stir in {i:16}, {i:17} and a ladle of {i:18}. Partly cover and simmer on the lowest heat at least 2 hrs, adding stock whenever it looks dry. In the last 20 min stir in {i:19}. Season with salt and pepper. It should end up thick and meaty, not saucy." },
      { title: "Make fresh pasta", only: ["classic", "fresh"], content: "Mound {i:0}, make a well, crack {i:1} in. Mix with a fork, then knead by hand 10 min until smooth and elastic. Wrap in cling film, rest 30 min at room temperature." },
      { title: "Roll pasta sheets", only: ["classic", "fresh"], content: "Divide dough into 6 portions. Roll each as thin as possible (pasta machine ideal, rolling pin works). Cut into sheets that fit your baking dish. Blanch in boiling salted water 30 sec, transfer to a towel." },
      { title: "Prepare the spinach", only: ["bologna", "fresh"], content: "While the ragù cooks: wilt {i:3} in a covered pan with just the water clinging to the leaves, 2–3 min. Cool, then squeeze in a clean towel until not a drop more comes out — wet spinach ruins the dough. Chop as finely as you possibly can, or blitz." },
      { title: "Make the green dough", only: ["bologna", "fresh"], content: "Mound {i:0}, make a well, add {i:2} and the spinach. Mix with a fork, then knead 10 min until smooth and evenly green. It should be firm — add a spoon of flour if it sticks. Wrap and rest 30 min." },
      { title: "Roll and blanch", only: ["bologna", "fresh"], content: "Roll very thin — you should almost see your hand through it (second-to-last setting on a pasta machine). Cut into sheets that fit your dish. Blanch a few at a time in boiling salted water for 20–30 sec, dip in cold water, lay flat on towels." },
      { title: "Make béchamel", only: ["fresh"], content: "Melt {i:20} in a saucepan. Add {i:21}, whisk constantly 2 min on medium heat. Gradually add warm {i:22}, whisking after each addition. Cook stirring until smooth and it coats a spoon, 8–10 min. Season with salt and {i:24}." },
      { title: "Make béchamel", only: ["dry"], content: "Melt {i:20} in a saucepan. Add {i:21}, whisk constantly 2 min on medium heat. Gradually add warm {i:22} and {i:23}, whisking after each addition. Cook stirring 8–10 min, but stop while it's still pourable rather than spreadable — dry sheets drink up the liquid and won't soften without it. Season with salt and {i:24}." },
      { title: "Assemble", only: ["classic"], content: "Butter a large baking dish. Layer: béchamel, pasta sheet, ragù, béchamel, {i:25}. Repeat 4–5 layers. Top with béchamel and generous parmesan." },
      { title: "Assemble", only: ["bologna"], content: "Butter a baking dish and spread a thin layer of ragù and béchamel on the bottom. Then repeat: pasta sheet, ragù, just a little béchamel — the ragù is the star — and a handful of {i:25}. Aim for at least six layers. Finish with ragù, béchamel, the last of the Parmigiano and {i:26} in small pieces." },
      { title: "Bake", content: "Bake at 180°C for 35–45 min until golden and bubbling at the edges. Rest 15–20 min before cutting." },
    ],
    tip: "The ragù needs time — don't rush it under 1.5 hrs, and it's even better made the day before. Lasagne is always better the next day reheated. For the Bolognese, thin sheets and many layers are the point — six is the minimum."
  },
  {
    id: 6,
    name: "Pizza",
    cuisine: "Italian",
    level: "Challenging",
    time: "45 min + 24 hr rise",
    emoji: "🍕",
    description: "Neapolitan-style pizza — homemade dough or a shop-bought shortcut — with a variety topping guide for the group.",
    variants: [
      { id: "own", label: "Homemade dough" },
      { id: "store", label: "Ready-made dough" },
    ],
    times: [{ only: ["store"], time: "45 min + 2 hr rest" }],
    ingredients: [
      // Dough
      { amount: 750, unit: "g", name: "00 flour (or strong bread flour)", only: ["own"] },
      { amount: 500, unit: "ml", name: "lukewarm water", only: ["own"] },
      { amount: 3, unit: "g", name: "instant yeast (less = better flavour)", only: ["own"] },
      { amount: 15, unit: "g", name: "salt", only: ["own"] },
      { amount: 2, unit: "tbsp", name: "olive oil", only: ["own"] },
      { amount: 1250, unit: "g", name: "ready-made pizza dough", only: ["store"] },
      // Tomato sauce
      { amount: 400, unit: "g", name: "canned San Marzano tomatoes" },
      { amount: 2, name: "garlic cloves, crushed" },
      { amount: 1, unit: "tsp", name: "dried oregano" },
      { amount: 2, unit: "tbsp", name: "olive oil" },
      { amount: 1, unit: "tsp", name: "salt" },
      // Base toppings (all pizzas)
      { amount: 400, unit: "g", name: "fresh mozzarella, torn" },
      // Variety toppings (pick per pizza)
      { amount: 150, unit: "g", name: "prosciutto crudo (add after baking)" },
      { amount: 150, unit: "g", name: "salame or salame piccante, sliced" },
      { amount: 150, unit: "g", name: "cooked ham (prosciutto cotto)" },
      { amount: 2, name: "bell peppers, sliced thin" },
      { amount: 1, unit: "handful", name: "black olives (optional)" },
      { amount: 1, unit: "handful", name: "fresh basil (finish)" },
    ],
    steps: [
      { title: "Make dough", only: ["own"], content: "Dissolve {i:2} in {i:1}. Add {i:0} and {i:3}, mix into a shaggy dough. Add {i:4}, knead 10 min by hand until smooth and elastic. It should spring back when poked. Less yeast + more time = much better flavour." },
      { title: "Cold rise", only: ["own"], content: "Place in a lightly oiled bowl, cover with cling film. Leave at room temperature 1 hr, then refrigerate for 24–48 hrs. This slow cold fermentation is the single biggest upgrade. Don't skip it." },
      { title: "Divide and ball", only: ["own"], content: "Remove dough 2–3 hrs before baking — it must come fully to room temperature or it won't stretch. Divide into balls of ~250g, one per pizza. Place on a floured tray, cover with a damp towel." },
      { title: "Rest the dough", only: ["store"], content: "Take {i:5} out of the fridge 2–3 hrs before baking — cold dough tears instead of stretching. If it came as one lump, divide into balls of ~250g, one per pizza. Place on a floured tray, cover with a damp towel." },
      { title: "Make sauce", content: "Crush {i:6} by hand or blend briefly. Mix with {i:9}, {i:7}, {i:8} and {i:10}. Do not cook — raw sauce on pizza is the authentic Neapolitan way." },
      { title: "Shape pizzas", content: "Preheat oven to absolute maximum (250°C+) for at least 30 min. If you have a pizza stone, preheat it too — it makes a big difference. Stretch dough by hand only — no rolling pin (it presses out the air bubbles). Push from the centre outward, leaving the edge thicker. Lift and rotate, letting gravity stretch it gently." },
      { title: "Top and bake", content: "Spread sauce thinly — less is more. Add torn {i:11}, then toppings (except {i:12} and basil). Bake 8–12 min until crust is golden with charred spots at the edges. Add {i:12} and {i:17} only after baking, never in the oven." },
    ],
    tip: "Max oven heat and a pizza stone matter most, whichever dough you use. For homemade: 3g yeast + 24–48hr cold rise is the authentic Neapolitan method — the long fermentation develops flavour the fast version can't match. A full sachet (7g) works if you're short on time but the result is noticeably less good."
  },
  {
    id: 7,
    name: "Chocolate Brownies",
    course: "dessert",
    cuisine: "American",
    level: "Easy",
    time: "50 min",
    emoji: "🍫",
    description: "Classic fudgy cocoa brownies, with or without white chocolate chunks through the middle and on top.",
    variants: [
      { id: "white", label: "White chocolate" },
      { id: "plain", label: "Plain" },
    ],
    ingredients: [
      { amount: 190, unit: "g", name: "unsalted butter" },
      { amount: 335, unit: "g", name: "granulated sugar" },
      { amount: 85, unit: "g", name: "cocoa powder (unsweetened)" },
      { amount: 3, name: "large eggs" },
      { amount: 1.5, unit: "tsp", name: "vanilla extract" },
      { amount: 170, unit: "g", name: "plain flour" },
      { amount: 0.375, unit: "tsp", name: "salt" },
      { amount: 0.375, unit: "tsp", name: "baking powder" },
      { amount: 200, unit: "g", name: "white chocolate, chopped into chunks", only: ["white"] },
    ],
    steps: [
      { title: "Prep", content: "Preheat oven to 175°C (160°C fan/ventilato). Line a 23×23 cm or 23×33 cm pan with baking paper." },
      { title: "Melt and mix", content: "Melt {i:0}, then whisk in {i:1} and {i:2} until smooth." },
      { title: "Eggs", content: "Whisk in {i:3} one at a time, then {i:4}." },
      { title: "Fold in flour", content: "Fold in {i:5}, {i:6} and {i:7} until just combined. Stop as soon as no dry flour shows — overmixing makes them cakey." },
      { title: "White chocolate", only: ["white"], content: "Fold in {i:8}, saving a handful to scatter on top." },
      { title: "Bake", content: "Pour into the pan and bake about 28 min, until a toothpick comes out with a few moist crumbs. A smaller pan makes thicker brownies that need a few minutes longer." },
      { title: "Cool", content: "Cool completely in the pan, at least 20 min, before slicing." },
    ],
    tip: "Pull them out while the toothpick still has moist crumbs — they keep setting as they cool. If it comes out clean they're already overdone."
  },
  {
    id: 8,
    name: "Ricciarelli di Siena",
    course: "dessert",
    cuisine: "Italian",
    level: "Intermediate",
    time: "2 days · 1 hr hands-on",
    emoji: "🍪",
    description: "Chewy, crackled Sienese almond biscuits. Pure almond, no citrus. Makes about 50 — start two days ahead.",
    variants: [
      { id: "pure", label: "Pure almond" },
      { id: "amaretti", label: "With amaretti" },
    ],
    ingredients: [
      { amount: 500, unit: "g", name: "almond flour" },
      { amount: 415, unit: "g", name: "granulated sugar", only: ["pure"] },
      { amount: 390, unit: "g", name: "granulated sugar", only: ["amaretti"] },
      { amount: 125, unit: "g", name: "icing sugar, for the dough" },
      { amount: 3, name: "large egg whites, room temperature", pair: { leftover: "Yolks", id: 9, variant: "yolks" } },
      { amount: 1, name: "large egg white, extra (only if needed)" },
      { amount: 0.5, unit: "tsp", name: "fine salt (scant)" },
      { amount: 5, unit: "g", name: "baker's ammonia" },
      { amount: 1, unit: "capsule", name: "vanilla extract" },
      { amount: 40, unit: "g", name: "dry amaretti, crushed fine", only: ["amaretti"] },
      { amount: 170, unit: "g", name: "icing sugar, for coating" },
      { amount: 5, unit: "sheets", name: "wafer paper (optional)" },
    ],
    steps: [
      { title: "Mix the dry ingredients", only: ["pure"], content: "In a large bowl combine {i:0}, {i:1}, {i:3} and {i:7}. Break up every lump. If the almond flour feels gritty, pulse it with the icing sugar for a few seconds first." },
      { title: "Mix the dry ingredients", only: ["amaretti"], content: "In a large bowl combine {i:0}, {i:2}, {i:3}, {i:7} and {i:9}. Break up every lump. If the almond flour feels gritty, pulse it with the icing sugar for a few seconds first." },
      { title: "Whip the whites", content: "Whip {i:4} with {i:6} to soft peaks — foamy and holding a shape, not stiff and dry. Keep the extra white aside." },
      { title: "Form the paste", content: "Stir {i:8} into the whites, then fold them into the dry mix in two or three additions. Target: a thick, sticky, marzipan-like paste that just holds together. If it stays crumbly, add the extra egg white a spoonful at a time — pre-ground flour is dry and sometimes needs it. If it goes loose, add more almond flour." },
      { title: "First rest", content: "Cover the bowl with cling film and leave somewhere cool for 12–24 hours. Not optional — this hydrates the almond and is what makes them chewy instead of sandy." },
      { title: "Shape and coat", content: "Put {i:10} in a shallow dish. Take walnut-sized pieces, roll into short logs, flatten slightly, pinch the ends into the classic pointed oval. Roll each generously in icing sugar — thickly. Lay on trays lined with baking paper or on {i:11}, a couple of centimetres apart." },
      { title: "Second rest — this makes the cracks", content: "Leave uncovered at room temperature until the surface is dry to the touch and no longer tacky — 4 to 12 hours, as little as 3–4 in a hot kitchen. Judge by touch, not the clock. This dry skin is what cracks in the oven." },
      { title: "Bake", content: "Heat the oven to 150°C. Dust with a little more icing sugar and bake 12–15 min per tray. They must stay pale — once the edges colour they're overdone. They'll look underbaked and soft in the centre; correct. The kitchen will smell strongly of ammonia; it bakes off completely." },
      { title: "Cool completely", content: "Leave them on the tray until stone cold — they're fragile warm and firm up as they cool. Trim excess wafer paper if used." },
    ],
    tip: "Airtight tin, better on day two, keeps two weeks. No ammoniaca? Use 2 tsp baking powder instead — less dramatic crack, same taste. If you find aroma di mandorla amara, add 1 tsp to the pure-almond version for the bitter-almond note the amaretti would give."
  },
  {
    id: 9,
    name: "Spaghetti alla Carbonara",
    cuisine: "Italian",
    level: "Easy",
    time: "20 min",
    emoji: "🥓",
    description: "The Roman original: guanciale, pecorino, egg and pepper. No cream, no garlic, no onion.",
    variants: [
      { id: "whole", label: "Whole eggs" },
      { id: "yolks", label: "Yolks only (classic)" },
    ],
    ingredients: [
      { amount: 500, unit: "g", name: "spaghetti or rigatoni" },
      { amount: 200, unit: "g", name: "guanciale, cut into thick strips" },
      { amount: 2.5, name: "large eggs", only: ["whole"] },
      { amount: 6, name: "egg yolks", only: ["yolks"], pair: { leftover: "Whites", id: 8 } },
      { amount: 100, unit: "g", name: "Pecorino Romano, finely grated" },
      { amount: 2, unit: "tsp", name: "black pepper, coarsely ground" },
      { amount: 1, unit: "tsp", name: "salt (for pasta water)" },
    ],
    steps: [
      { title: "Start the water", content: "Bring a big pot of water to the boil and salt it lightly with {i:6} — the guanciale and pecorino bring plenty of salt." },
      { title: "Render the guanciale", content: "Put {i:1} in a cold wide pan, then turn the heat to medium-low. Let it render 8–10 min until the fat runs clear and the edges crisp, with the middle still a little chewy. No oil needed. Take off the heat." },
      { title: "Cook the pasta", content: "Cook {i:0} until 1 min short of al dente. Reserve a mug of pasta water before draining." },
      { title: "Make the egg mix", only: ["whole"], content: "Whisk {i:2} with {i:4} and most of the {i:5} into a thick paste." },
      { title: "Make the egg mix", only: ["yolks"], content: "Whisk {i:3} with {i:4} and most of the {i:5} into a thick paste." },
      { title: "Combine off the heat", content: "Put the guanciale pan back on low with a splash of pasta water. Add the drained pasta and toss 1 min. Now take the pan off the heat and wait 30 seconds — then pour in the egg mix and toss fast, adding pasta water a spoonful at a time until glossy and creamy. Serve with the rest of the pepper and extra pecorino." },
    ],
    tip: "Scrambled egg means the pan was too hot — the heat must be off before the eggs go in. Yolks give a richer, silkier sauce; whole eggs are lighter and more forgiving. Pancetta works if you can't find guanciale, but guanciale is what makes it Roman."
  }
];

// Local shopping names. First match wins, so specific patterns come first.
// Swap this whole list to localise the app for another country.
const SHOPPING_TERMS = [
  { m: /cocoa powder/i, it: "cacao amaro in polvere", note: "Must say 'amaro' (unsweetened). 'Cacao zuccherato' or anything aimed at drinks is sweetened and will throw the recipe off." },
  { m: /baking powder/i, it: "lievito per dolci", note: "Baking aisle, in 16g sachets (Paneangeli etc.), often vanilla-flavoured — that's fine. Not 'lievito di birra', which is yeast." },
  { m: /vanilla extract/i, it: "estratto di vaniglia / vanillina", note: "Baking aisle, usually as small single-dose capsules or vials rather than a bottle. If there's none, 'vanillina' powder sachets are the usual substitute." },
  { m: /almond flour/i, it: "farina di mandorle", note: "Baking aisle, usually 250 g packs. 'Granella di mandorle' is chopped nuts, not flour." },
  { m: /icing sugar/i, it: "zucchero a velo" },
  { m: /baker's ammonia/i, it: "ammoniaca per dolci", note: "Baking aisle, 8 g sachets (Paneangeli). Not the household cleaner." },
  { m: /amaretti/i, it: "amaretti secchi", note: "The dry, crunchy kind — not 'amaretti morbidi' (soft)." },
  { m: /wafer paper/i, it: "ostie", note: "Edible wafer sheets, baking aisle. Optional — baking paper works fine." },
  { m: /egg white/i, it: "albumi" },
  { m: /egg yolk/i, it: "tuorli" },
  { m: /pizza dough/i, it: "pasta per pizza", note: "Fridge section near the fresh pasta. Bakeries (forno, panificio) and some pizzerias sell dough balls by weight if you ask. Pre-rolled sheets ('stesa') work but won't puff up the same." },
  { m: /dried green lasagne/i, it: "lasagne verdi (secche)", note: "Not in every supermarket, mostly Emilian brands. Fresh green sheets in the fridge section ('lasagne verdi fresche') are easier to find and work the same here. No green at all? Plain egg sheets." },
  { m: /dried egg lasagne/i, it: "lasagne all'uovo (secche)", note: "Most boxes say 'non serve precuocere' — no boiling needed, which is why the béchamel goes looser. Fresh sheets from the fridge section also work; use the fresh-pasta béchamel for those." },
  { m: /strong bread flour/i, it: "farina 00 / farina manitoba", note: "Strong bread flour is sold as 'manitoba'. Either works for pizza." },
  { m: /salmon/i, it: "salmone", note: "Fish counter or frozen. 'Filetto di salmone con pelle' is skin-on fillet." },
  { m: /soy sauce/i, it: "salsa di soia", note: "Not a standard Italian pantry item. Look in the 'cucina del mondo' or 'etnico' aisle — bigger Coop and Conad stores carry it, small village shops often don't." },
  { m: /sesame oil/i, it: "olio di sesamo", note: "Same aisle as the soy sauce, and the item most likely to be missing. The dish works without it — just leave it out rather than substituting." },
  { m: /sesame seeds/i, it: "semi di sesamo" },
  { m: /spring onion/i, it: "cipollotto" },
  { m: /ginger/i, it: "zenzero", note: "Fresh root is in the fruit and veg section, usually near the garlic." },
  { m: /honey/i, it: "miele" },
  { m: /lime juice|lime/i, it: "lime" },
  { m: /panna fresca/i, it: "panna fresca", note: "Fridge section. Want ~35% fat, non zuccherata (unsweetened). 'Panna da cucina' is the shelf-stable UHT version and also works. British-style double cream doesn't exist here." },
  { m: /Italian sausage/i, it: "salsiccia fresca", note: "Meat counter or fridge, usually in linked pairs. Look for 'con finocchio' (fennel) for Norcina. Slit the casing lengthwise and squeeze the meat out." },
  { m: /prosciutto crudo/i, it: "prosciutto crudo", note: "Labelled by region, not by the word 'crudo' — Parma, San Daniele or Toscano are all crudo. Don't grab 'cotto', that's cooked ham. Toscano is cured with pepper and garlic, so it's saltier." },
  { m: /cooked ham|prosciutto cotto/i, it: "prosciutto cotto" },
  { m: /salame/i, it: "salame / salame piccante", note: "American-style pepperoni doesn't exist in Italy. 'Salame piccante' is the closest thing. Never ask for 'peperoni' — that means bell peppers." },
  { m: /bell pepper/i, it: "peperoni", note: "Careful: 'peperoni' in Italian means bell peppers, not the spicy sausage." },
  { m: /guanciale/i, it: "guanciale", note: "Cured pork cheek, at the banco gastronomia. Pancetta is the fallback." },
  { m: /pancetta/i, it: "pancetta dolce", note: "'Dolce' or 'tesa' is unsmoked — that's the one. 'Affumicata' is smoked and tastes out of place in ragù." },
  { m: /spinach/i, it: "spinaci", note: "Frozen cubes ('spinaci a cubetti', freezer section) are fine and less work — use about half the weight, thaw and squeeze." },
  { m: /passata/i, it: "passata di pomodoro" },
  { m: /stock/i, it: "brodo", note: "Stock cubes are 'dado' (Star, Knorr); 'brodo pronto' comes in cartons." },
  { m: /minced beef, coarse/i, it: "macinato di manzo per ragù", note: "Coarser than burger mince. Supermarket packs often say 'per ragù'; at the counter ask for 'macinato grosso'." },
  { m: /veal or chicken escalopes/i, it: "fettine di vitello / di pollo", note: "Ask for 'fettine sottili, per saltimbocca'. Chicken is much cheaper than veal for five." },
  { m: /chicken pieces/i, it: "cosce e fusi di pollo", note: "Thighs and drumsticks. Bone-in, not 'petto' (breast)." },
  { m: /minced beef/i, it: "macinato di manzo" },
  { m: /minced pork/i, it: "macinato di maiale" },
  { m: /Parmigiano/i, it: "Parmigiano Reggiano" },
  { m: /Pecorino/i, it: "Pecorino Romano" },
  { m: /mozzarella/i, it: "mozzarella / fior di latte", note: "Fior di latte (cow's milk) melts better on pizza than buffalo mozzarella, which releases too much water." },
  { m: /00 flour|plain flour/i, it: "farina 00" },
  { m: /instant yeast/i, it: "lievito di birra secco", note: "Dry yeast in small sachets. If you only find fresh cubes ('lievito fresco'), use about three times the weight." },
  { m: /San Marzano|canned crushed tomatoes|canned tomatoes/i, it: "pomodori pelati", note: "Whole peeled tomatoes in a tin. 'Passata' is smooth purée and works too." },
  { m: /tomato paste/i, it: "concentrato di pomodoro" },
  { m: /ripe tomatoes/i, it: "pomodori maturi" },
  { m: /dry white wine/i, it: "vino bianco secco", note: "Look for 'secco' on the label. Avoid 'abboccato' or 'amabile' — those are off-dry to sweet and turn syrupy when reduced. Cheap local sfuso is fine." },
  { m: /dry red wine/i, it: "vino rosso secco" },
  { m: /red wine vinegar/i, it: "aceto di vino rosso" },
  { m: /stale ciabatta|rustic bread/i, it: "pane toscano / ciabatta", note: "Pane toscano is the unsalted local loaf — traditional for bruschetta." },
  { m: /spaghetti|tonnarelli/i, it: "spaghetti" },
  { m: /penne or rigatoni/i, it: "penne / rigatoni" },
  { m: /rigatoni or bucatini/i, it: "rigatoni / bucatini" },
  { m: /whole milk/i, it: "latte intero" },
  { m: /nutmeg/i, it: "noce moscata" },
  { m: /bay lea/i, it: "alloro" },
  { m: /rosemary/i, it: "rosmarino" },
  { m: /\bsage\b/i, it: "salvia" },
  { m: /basil/i, it: "basilico" },
  { m: /parsley/i, it: "prezzemolo" },
  { m: /oregano/i, it: "origano" },
  { m: /chili flakes/i, it: "peperoncino" },
  { m: /salt and pepper/i, it: "sale e pepe" },
  { m: /black pepper|peppercorns/i, it: "pepe nero" },
  { m: /olive oil/i, it: "olio extravergine di oliva" },
  { m: /olives/i, it: "olive nere" },
  { m: /red onion/i, it: "cipolla rossa" },
  { m: /onion/i, it: "cipolla" },
  { m: /garlic/i, it: "aglio" },
  { m: /carrot/i, it: "carote" },
  { m: /celery/i, it: "sedano" },
  { m: /cucumber/i, it: "cetriolo" },
  { m: /butter/i, it: "burro" },
  { m: /eggs/i, it: "uova" },
  { m: /lukewarm water/i, it: "acqua tiepida" },
  { m: /\bsalt\b/i, it: "sale" },
];

function localTermFor(name) {
  if (!CONFIG.shoppingGuide.enabled) return null;
  return SHOPPING_TERMS.find(e => e.m.test(name)) || null;
}

const levelColors = {
  Easy: { bg: "#e8f5e9", text: "#2e7d32", dot: "#4caf50" },
  Intermediate: { bg: "#fff3e0", text: "#e65100", dot: "#ff9800" },
  Challenging: { bg: "#fce4ec", text: "#880e4f", dot: "#e91e63" },
};

// Recipes without `course` count as mains.
const COURSES = [
  { id: "main", label: "Mains" },
  { id: "dessert", label: "Desserts" },
];

// `variants` is one row of options, or several rows: [{ options: [...] }, ...].
function variantGroups(recipe) {
  if (!recipe?.variants) return [];
  return recipe.variants[0].options ? recipe.variants.map(g => g.options) : [recipe.variants];
}

// `only: [ids]` must match the chosen option in every row it names.
function inVariant(item, groups, chosen) {
  return !item.only || groups.every((opts, g) =>
    !opts.some(o => item.only.includes(o.id)) || item.only.includes(chosen[g]));
}

export default function RecipeBook() {
  const [selected, setSelected] = useState(null);
  const [servings, setServings] = useState(CONFIG.baseServings);
  const [course, setCourse] = useState("main");
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [variantChoice, setVariantChoice] = useState({});
  const [checked, setChecked] = useState({});
  const [openNote, setOpenNote] = useState(null);

  function toggleIngredient(recipeId, idx) {
    const key = `${recipeId}-${idx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function chooseVariant(r, optionId) {
    const g = variantGroups(r).findIndex(opts => opts.some(o => o.id === optionId));
    setVariantChoice(prev => {
      const cur = [...(prev[r.id] ?? [])];
      cur[g] = optionId;
      return { ...prev, [r.id]: cur };
    });
  }

  function openRecipe(id, variantId) {
    const r = recipes.find(r => r.id === id);
    const rCourse = r.course ?? "main";
    if (rCourse !== course) { setCourse(rCourse); setCuisineFilter("All"); }
    if (variantId) chooseVariant(r, variantId);
    setSelected(recipes.indexOf(r));
    setServings(CONFIG.baseServings);
    window.scrollTo(0, 0);
  }

  function isChecked(recipeId, idx) {
    return !!checked[`${recipeId}-${idx}`];
  }

  function scaleAmount(amount) {
    const scaled = (amount / CONFIG.baseServings) * servings;
    if (scaled % 1 === 0) return scaled;
    if (scaled < 10) return Math.round(scaled * 10) / 10;
    return Math.round(scaled);
  }

  // Single source of truth for how an ingredient amount is displayed.
  function formatAmount(ing) {
    if (!ing.amount) return "";
    const unit = ing.unit ? " " + ing.unit : "";
    if (CONFIG.unscalableUnits.includes(ing.unit)) return `${ing.amount}${unit}`;
    return `${scaleAmount(ing.amount)}${unit}`;
  }

  function renderStepContent(content, ingredients) {
    const parts = content.split(/(\{i:\d+\})/g);
    return parts.map((part, idx) => {
      const match = part.match(/^\{i:(\d+)\}$/);
      if (match) {
        const ing = ingredients[parseInt(match[1])];
        if (!ing) return part;
        const amtStr = formatAmount(ing);
        const label = amtStr ? `${amtStr} ${ing.name}` : ing.name;
        return (
          <span key={idx} style={{
            background: "#fff3d4",
            color: "#7a4f00",
            borderRadius: 4,
            padding: "1px 5px",
            fontWeight: 600,
            fontFamily: "sans-serif",
            fontSize: 13,
            whiteSpace: "nowrap",
          }}>{label}</span>
        );
      }
      return part;
    });
  }

  const courseRecipes = recipes.filter(r => (r.course ?? "main") === course);
  const cuisines = [...new Set(courseRecipes.map(r => r.cuisine).filter(Boolean))];
  const visibleRecipes = cuisineFilter === "All"
    ? courseRecipes
    : courseRecipes.filter(r => r.cuisine === cuisineFilter);

  const recipe = selected !== null ? recipes[selected] : null;
  const groups = variantGroups(recipe);
  const chosen = groups.map((opts, g) => variantChoice[recipe.id]?.[g] ?? opts[0].id);
  const visibleIngredients = recipe
    ? recipe.ingredients.map((ing, i) => ({ ing, i })).filter(({ ing }) => inVariant(ing, groups, chosen))
    : [];
  const visibleSteps = recipe ? recipe.steps.filter(s => inVariant(s, groups, chosen)) : [];
  const time = recipe && (recipe.times?.find(t => inVariant(t, groups, chosen))?.time ?? recipe.time);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#faf8f3",
      fontFamily: "'Georgia', serif",
    }}>
      {/* Header */}
      <div style={{
        background: "#1a1008",
        color: "#f5e6c8",
        padding: "40px 24px 32px",
        textAlign: "center",
        borderBottom: "3px solid #c8922a",
      }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{CONFIG.emoji}</div>
        <h1 style={{
          margin: 0,
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: "#f5e6c8",
        }}>
          {CONFIG.title}
        </h1>
        <p style={{
          margin: "8px 0 0",
          color: "#c8922a",
          fontSize: 15,
          fontStyle: "italic",
          letterSpacing: "0.5px",
        }}>
          {recipes.length} recipes · {CONFIG.subtitle}
        </p>
      </div>

      {recipe ? (
        // Recipe detail view
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 0 60px" }}>
          {/* Back button */}
          <button
            onClick={() => setSelected(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#8b6914",
              fontFamily: "inherit",
              fontSize: 15,
              padding: "20px 24px",
              fontWeight: 600,
            }}
          >
            ← All recipes
          </button>

          {/* Recipe header */}
          <div style={{ padding: "0 24px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 40 }}>{recipe.emoji}</span>
              <div>
                <span style={{
                  display: "inline-block",
                  background: levelColors[recipe.level].bg,
                  color: levelColors[recipe.level].text,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: 20,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontFamily: "sans-serif",
                  marginBottom: 6,
                }}>{recipe.level}</span>
                <h2 style={{ margin: 0, fontSize: "clamp(22px, 4vw, 32px)", color: "#1a1008" }}>
                  {recipe.name}
                </h2>
              </div>
            </div>
            <p style={{ color: "#5c4a2a", margin: "0 0 8px", fontSize: 16, lineHeight: 1.6 }}>
              {recipe.description}
            </p>
            <div style={{ color: "#8b6914", fontSize: 14, fontFamily: "sans-serif" }}>
              ⏱ {time}
            </div>
          </div>

          {/* Variant switcher */}
          {groups.map((opts, g) => (
            <div key={g} style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "0 24px 12px" }}>
              {opts.map(v => {
                const active = v.id === chosen[g];
                return (
                  <button
                    key={v.id}
                    onClick={() => chooseVariant(recipe, v.id)}
                    style={{
                      background: active ? "#c8922a" : "#fff",
                      color: active ? "#fff" : "#8b6914",
                      border: active ? "1px solid #c8922a" : "1px solid #e0cfa8",
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 13,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >{v.label}</button>
                );
              })}
            </div>
          ))}
          {groups.length > 0 && <div style={{ height: 4 }} />}

          {/* Servings control */}
          <div style={{
            margin: "0 24px 24px",
            background: "#1a1008",
            borderRadius: 12,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ color: "#f5e6c8", fontFamily: "sans-serif", fontSize: 14, fontWeight: 600 }}>
              Servings
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                onClick={() => setServings(s => Math.max(1, s - 1))}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid #c8922a", background: "none",
                  color: "#c8922a", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >−</button>
              <span style={{ color: "#f5e6c8", fontSize: 22, fontWeight: 700, minWidth: 24, textAlign: "center" }}>
                {servings}
              </span>
              <button
                onClick={() => setServings(s => s + 1)}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  border: "1px solid #c8922a", background: "none",
                  color: "#c8922a", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >+</button>
            </div>
          </div>

          {/* Ingredients */}
          <div style={{ padding: "0 24px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{
                fontSize: 13,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#8b6914",
                fontFamily: "sans-serif",
                margin: 0,
              }}>Ingredients</h3>
              <span style={{ fontSize: 11, color: "#b0956a", fontFamily: "sans-serif", fontStyle: "italic" }}>
                tap to mark as have
                {CONFIG.shoppingGuide.enabled && CONFIG.shoppingGuide.hint
                  ? ` · ${CONFIG.shoppingGuide.label} ${CONFIG.shoppingGuide.hint}`
                  : ""}
              </span>
            </div>
            <div style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #e8d9b8",
              overflow: "hidden",
            }}>
              {visibleIngredients.map(({ ing, i }, pos) => {
                const have = isChecked(recipe.id, i);
                const ita = localTermFor(ing.name);
                const noteKey = `${recipe.id}-${i}`;
                const noteOpen = openNote === noteKey;
                return (
                  <div
                    key={i}
                    style={{
                      borderBottom: pos < visibleIngredients.length - 1 ?"1px solid #f0e4c8" : "none",
                      background: have ? "#f7f7f4" : "#fff",
                      transition: "background 0.15s",
                    }}
                  >
                    <div
                      onClick={() => toggleIngredient(recipe.id, i)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        padding: "12px 16px",
                        gap: 12,
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, minWidth: 0 }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                          border: have ? "none" : "1.5px solid #d4b896",
                          background: have ? "#c8922a" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.15s",
                          marginTop: 2,
                        }}>
                          {have && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <span style={{
                            color: have ? "#b0956a" : "#3a2a10",
                            fontSize: 15,
                            textDecoration: have ? "line-through" : "none",
                            transition: "all 0.15s",
                          }}>{ing.name}</span>
                          {ita && (
                            <div style={{
                              display: "flex", alignItems: "center", gap: 6, marginTop: 2, flexWrap: "wrap",
                            }}>
                              <span style={{
                                color: have ? "#c8b090" : "#a8791a",
                                fontSize: 13,
                                fontStyle: "italic",
                              }}>{CONFIG.shoppingGuide.label} {ita.it}</span>
                              {ita.note && (
                                <span
                                  onClick={(e) => { e.stopPropagation(); setOpenNote(noteOpen ? null : noteKey); }}
                                  style={{
                                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                                    width: 16, height: 16, borderRadius: "50%",
                                    border: "1px solid #c8922a",
                                    background: noteOpen ? "#c8922a" : "transparent",
                                    color: noteOpen ? "#fff" : "#c8922a",
                                    fontSize: 10, fontWeight: 700, fontFamily: "sans-serif",
                                    cursor: "pointer", flexShrink: 0,
                                  }}
                                >i</span>
                              )}
                            </div>
                          )}
                          {ing.pair && (
                            <div
                              onClick={(e) => { e.stopPropagation(); openRecipe(ing.pair.id, ing.pair.variant); }}
                              style={{ marginTop: 2, fontSize: 13, color: "#a8791a", fontFamily: "sans-serif", cursor: "pointer" }}
                            >
                              ↪ {ing.pair.leftover} left over?{" "}
                              <span style={{ textDecoration: "underline" }}>
                                {recipes.find(r => r.id === ing.pair.id).name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span style={{
                        color: have ? "#c8b090" : "#8b6914",
                        fontWeight: 700,
                        fontFamily: "sans-serif",
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        textDecoration: have ? "line-through" : "none",
                        transition: "all 0.15s",
                        marginTop: 1,
                      }}>
                        {formatAmount(ing)}
                      </span>
                    </div>
                    {noteOpen && ita?.note && (
                      <div style={{
                        padding: "0 16px 12px 44px",
                        color: "#6b5220",
                        fontSize: 13,
                        lineHeight: 1.6,
                      }}>{ita.note}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Steps */}
          <div style={{ padding: "0 24px 24px" }}>
            <h3 style={{
              fontSize: 13,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#8b6914",
              fontFamily: "sans-serif",
              margin: "0 0 16px",
            }}>Method</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {visibleSteps.map((step, i) => (
                <div key={`${chosen.join()}-${i}`} style={{
                  display: "flex",
                  gap: 16,
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #e8d9b8",
                  padding: "16px",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "#1a1008", color: "#c8922a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "sans-serif", fontSize: 13, fontWeight: 700,
                    flexShrink: 0, marginTop: 2,
                  }}>{i + 1}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#1a1008", marginBottom: 4, fontSize: 15 }}>
                      {step.title}
                    </div>
                    <div style={{ color: "#5c4a2a", lineHeight: 1.6, fontSize: 15 }}>
                      {renderStepContent(step.content, recipe.ingredients)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div style={{ padding: "0 24px" }}>
            <div style={{
              background: "#fff8e8",
              border: "1px solid #c8922a",
              borderLeft: "4px solid #c8922a",
              borderRadius: 8,
              padding: "14px 16px",
              display: "flex",
              gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>💡</span>
              <p style={{ margin: 0, color: "#5c3a00", lineHeight: 1.6, fontSize: 14, fontStyle: "italic" }}>
                {recipe.tip}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Recipe list
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 60px" }}>
          <div style={{
            display: "flex", gap: 24, marginBottom: 20, padding: "0 8px",
            borderBottom: "1px solid #e0cfa8",
          }}>
            {COURSES.map(c => {
              const active = course === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => { setCourse(c.id); setCuisineFilter("All"); }}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: active ? "3px solid #c8922a" : "3px solid transparent",
                    marginBottom: -1,
                    padding: "8px 2px 10px",
                    fontFamily: "inherit",
                    fontSize: 18,
                    fontWeight: 700,
                    color: active ? "#1a1008" : "#b0956a",
                    cursor: "pointer",
                  }}
                >{c.label}</button>
              );
            })}
          </div>
          {cuisines.length > 1 && (
            <div style={{
              display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24, padding: "0 4px",
            }}>
              {["All", ...cuisines].map(c => {
                const active = cuisineFilter === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCuisineFilter(c)}
                    style={{
                      background: active ? "#1a1008" : "transparent",
                      color: active ? "#f5e6c8" : "#8b6914",
                      border: active ? "1px solid #1a1008" : "1px solid #e0cfa8",
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 13,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >{c}</button>
                );
              })}
            </div>
          )}
          {["Easy", "Intermediate", "Challenging"].map(level => {
            const inLevel = visibleRecipes.filter(r => r.level === level);
            if (inLevel.length === 0) return null;
            return (
            <div key={level} style={{ marginBottom: 32 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
                padding: "0 8px",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: levelColors[level].dot,
                  flexShrink: 0,
                }} />
                <h2 style={{
                  margin: 0,
                  fontSize: 13,
                  fontFamily: "sans-serif",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: levelColors[level].text,
                }}>{level}</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {inLevel.map((r) => {
                  return (
                    <button
                      key={r.id}
                      onClick={() => openRecipe(r.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        background: "#fff",
                        border: "1px solid #e8d9b8",
                        borderRadius: 12,
                        padding: "16px 20px",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "border-color 0.15s, box-shadow 0.15s",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "#c8922a";
                        e.currentTarget.style.boxShadow = "0 2px 12px rgba(200,146,42,0.15)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "#e8d9b8";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <span style={{ fontSize: 28, flexShrink: 0 }}>{r.emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: "#1a1008", fontSize: 17, marginBottom: 2 }}>
                          {r.name}
                        </div>
                        <div style={{ color: "#8b6914", fontSize: 13, fontFamily: "sans-serif" }}>
                          ⏱ {r.time}
                        </div>
                      </div>
                      <span style={{ color: "#c8922a", fontSize: 20, flexShrink: 0 }}>→</span>
                    </button>
                  );
                })}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
