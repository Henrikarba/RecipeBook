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
    description: "The real deal — fresh pasta sheets, slow ragù bolognese, proper béchamel. A labour of love.",
    ingredients: [
      // Fresh pasta
      { amount: 400, unit: "g", name: "00 flour (pasta)" },
      { amount: 4, name: "eggs (pasta)" },
      // Ragù
      { amount: 500, unit: "g", name: "minced beef" },
      { amount: 200, unit: "g", name: "minced pork" },
      { amount: 150, unit: "g", name: "pancetta, diced" },
      { amount: 1, name: "large onion, finely diced" },
      { amount: 2, name: "carrots, finely diced" },
      { amount: 2, name: "celery stalks, finely diced" },
      { amount: 200, unit: "ml", name: "dry red wine" },
      { amount: 400, unit: "g", name: "canned crushed tomatoes" },
      { amount: 3, unit: "tbsp", name: "tomato paste" },
      { amount: 200, unit: "ml", name: "whole milk" },
      // Béchamel
      { amount: 80, unit: "g", name: "butter (béchamel)" },
      { amount: 80, unit: "g", name: "plain flour (béchamel)" },
      { amount: 800, unit: "ml", name: "whole milk (béchamel)" },
      { amount: 6, unit: "scrapes", name: "nutmeg (freshly grated)" },
      // Assembly
      { amount: 150, unit: "g", name: "Parmigiano Reggiano, grated" },
    ],
    steps: [
      { title: "Make ragù", content: "Cook {i:4} until fat renders. Add {i:5}, {i:6}, {i:7} — cook 10 min. Add {i:2} and {i:3}, brown well. Add {i:8}, evaporate. Add {i:9} and {i:10}, stir. Add {i:11}. Simmer uncovered on very low heat 1.5–2 hrs, stirring occasionally. Season." },
      { title: "Make fresh pasta", content: "Mound {i:0}, make a well, crack {i:1} in. Mix with a fork, then knead by hand 10 min until smooth and elastic. Wrap in cling film, rest 30 min at room temperature." },
      { title: "Roll pasta sheets", content: "Divide dough into 6 portions. Roll each as thin as possible (pasta machine ideal, rolling pin works). Cut into sheets that fit your baking dish. Blanch in boiling salted water 30 sec, transfer to a towel." },
      { title: "Make béchamel", content: "Melt {i:12} in a saucepan. Add {i:13}, whisk constantly 2 min on medium heat. Gradually add warm {i:14}, whisking after each addition. Cook stirring until thick and smooth, 8–10 min. Season with salt and {i:15}." },
      { title: "Assemble", content: "Butter a large baking dish. Layer: béchamel, pasta sheet, ragù, béchamel, {i:16}. Repeat 4–5 layers. Top with béchamel and generous parmesan." },
      { title: "Bake", content: "Bake at 180°C for 40–45 min until golden and bubbling. Rest 15 min before cutting." },
    ],
    tip: "The ragù needs time — don't rush it under 1.5 hrs. Lasagne is always better the next day reheated. If using storebought dry sheets, make the béchamel noticeably thinner than you think — add an extra splash of milk so it's more pourable than spreadable. Dry sheets absorb a lot of moisture and need it or they won't soften properly. Traditional Bolognese lasagne uses green spinach pasta sheets — if you want to go full authentic, add a handful of cooked spinach when making the pasta dough. Totally optional."
  },
  {
    id: 6,
    name: "Pizza (Homemade Dough)",
    cuisine: "Italian",
    level: "Challenging",
    time: "45 min + 24 hr rise",
    emoji: "🍕",
    description: "Neapolitan-style homemade pizza dough with a variety topping guide for the group.",
    ingredients: [
      // Dough
      { amount: 750, unit: "g", name: "00 flour (or strong bread flour)" },
      { amount: 500, unit: "ml", name: "lukewarm water" },
      { amount: 3, unit: "g", name: "instant yeast (less = better flavour)" },
      { amount: 15, unit: "g", name: "salt" },
      { amount: 2, unit: "tbsp", name: "olive oil" },
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
      { title: "Make dough", content: "Dissolve {i:2} in {i:1}. Add {i:0} and {i:3}, mix into a shaggy dough. Add {i:4}, knead 10 min by hand until smooth and elastic. It should spring back when poked. Less yeast + more time = much better flavour." },
      { title: "Cold rise", content: "Place in a lightly oiled bowl, cover with cling film. Leave at room temperature 1 hr, then refrigerate for 24–48 hrs. This slow cold fermentation is the single biggest upgrade. Don't skip it." },
      { title: "Divide and ball", content: "Remove dough 2–3 hrs before baking — it must come fully to room temperature or it won't stretch. Divide into 5 equal balls (~250g each). Place on a floured tray, cover with a damp towel." },
      { title: "Make sauce", content: "Crush {i:5} by hand or blend briefly. Mix with {i:8}, {i:6}, {i:7} and {i:9}. Do not cook — raw sauce on pizza is the authentic Neapolitan way." },
      { title: "Shape pizzas", content: "Preheat oven to absolute maximum (250°C+) for at least 30 min. If you have a pizza stone, preheat it too — it makes a big difference. Stretch dough by hand only — no rolling pin (it presses out the air bubbles). Push from the centre outward, leaving the edge thicker. Lift and rotate, letting gravity stretch it gently." },
      { title: "Top and bake", content: "Spread sauce thinly — less is more. Add torn {i:10}, then toppings (except {i:11} and basil). Bake 8–12 min until crust is golden with charred spots at the edges. Add {i:11} and {i:16} only after baking, never in the oven." },
    ],
    tip: "3g yeast + 24–48hr cold rise is the authentic Neapolitan method — the long fermentation develops flavour the fast version can't match. A full sachet (7g) works if you're short on time but the result is noticeably less good. Max oven heat and a pizza stone are the other two non-negotiables."
  }
];

// Local shopping names. First match wins, so specific patterns come first.
// Swap this whole list to localise the app for another country.
const SHOPPING_TERMS = [
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
  { m: /pancetta/i, it: "pancetta" },
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
  { m: /stale ciabatta|rustic bread/i, it: "pane toscano / ciabatta", note: "Pane toscano is the unsalted local loaf — traditional for panzanella and bruschetta. Must be a day old for panzanella." },
  { m: /spaghetti|tonnarelli/i, it: "spaghetti" },
  { m: /penne or rigatoni/i, it: "penne / rigatoni" },
  { m: /rigatoni or bucatini/i, it: "rigatoni / bucatini" },
  { m: /whole milk/i, it: "latte intero" },
  { m: /nutmeg/i, it: "noce moscata" },
  { m: /bay lea/i, it: "alloro" },
  { m: /rosemary/i, it: "rosmarino" },
  { m: /sage/i, it: "salvia" },
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
  { m: /salt/i, it: "sale" },
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

export default function RecipeBook() {
  const [selected, setSelected] = useState(null);
  const [servings, setServings] = useState(CONFIG.baseServings);
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [checked, setChecked] = useState({});
  const [openNote, setOpenNote] = useState(null);

  function toggleIngredient(recipeId, idx) {
    const key = `${recipeId}-${idx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
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

  const cuisines = [...new Set(recipes.map(r => r.cuisine).filter(Boolean))];
  const visibleRecipes = cuisineFilter === "All"
    ? recipes
    : recipes.filter(r => r.cuisine === cuisineFilter);

  const recipe = selected !== null ? recipes[selected] : null;

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
              ⏱ {recipe.time}
            </div>
          </div>

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
              {recipe.ingredients.map((ing, i) => {
                const have = isChecked(recipe.id, i);
                const ita = localTermFor(ing.name);
                const noteKey = `${recipe.id}-${i}`;
                const noteOpen = openNote === noteKey;
                return (
                  <div
                    key={i}
                    style={{
                      borderBottom: i < recipe.ingredients.length - 1 ? "1px solid #f0e4c8" : "none",
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
              {recipe.steps.map((step, i) => (
                <div key={i} style={{
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
                  const globalIdx = recipes.indexOf(r);
                  return (
                    <button
                      key={r.id}
                      onClick={() => { setSelected(globalIdx); setServings(CONFIG.baseServings); }}
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
