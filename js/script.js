/* ==========================================================================
   KFC USA Menu & Prices (2026) — Unified JavaScript Engine
   Full USA Menu Items, Standard USD ($) Pricing, Top 22 US Cities,
   Live Search, Filters, Sorting, Details Modal & Dynamic City Pages
   ========================================================================== */

// 0. Technical SEO Dynamic Canonical & Robots Engine
(function initTechnicalSEO() {
  const CANONICAL_DOMAIN = 'https://kfc-menu-orpin.vercel.app';
  const DEDICATED_CITIES = {
    'new-york': '/city-new-york',
    'los-angeles': '/city-los-angeles',
    'chicago': '/city-chicago',
    'houston': '/city-houston',
    'miami': '/city-miami',
    'dallas': '/city-dallas'
  };

  try {
    const loc = window.location;
    let path = loc.pathname;

    // 1. Normalize path (remove .html and handle index)
    if (path === '/index.html' || path === '/index') {
      path = '/';
    } else if (path.endsWith('.html')) {
      path = path.slice(0, -5);
    }

    // 2. Remove trailing slashes (e.g. /burgers/ -> /burgers)
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    // 3. Handle query parameters (allow 'city' to rank, strip tracking/junk)
    const currentParams = new URLSearchParams(loc.search);
    let finalSearch = '';

    if (currentParams.has('city')) {
      const citySlug = (currentParams.get('city') || '').toLowerCase().trim();
      if (DEDICATED_CITIES[citySlug]) {
        path = DEDICATED_CITIES[citySlug];
      } else if (citySlug) {
        finalSearch = '?city=' + encodeURIComponent(citySlug);
      }
    }

    // 4. Construct the clean canonical URL
    const cleanCanonicalUrl = CANONICAL_DOMAIN + path + finalSearch;

    // 5. Update or inject <link rel="canonical">
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', cleanCanonicalUrl);

    // 6. Update or inject <meta property="og:url">
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', cleanCanonicalUrl);

    // 7. Ensure standard index robots tag is present and clean
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  } catch (err) {
    console.error('SEO Canonical Engine error:', err);
  }
})();

// 1. Central Currency Configuration (USD Default)
const CURRENCY_CONFIG = {
  activeCurrency: 'USD',
  disclaimer: "Prices listed are standard estimated retail averages for US KFC outlets. Franchise pricing may vary by US city, state taxes, drive-thru, and delivery platforms (DoorDash, Uber Eats, Grubhub)."
};

function formatPriceHTML(price) {
  const numericPrice = typeof price === 'number' ? price : parseFloat(price);
  return `
    <div class="card-price-stack">
      <span class="price-primary">$${numericPrice.toFixed(2)}</span>
      <span class="price-secondary">USD Menu Price</span>
    </div>
  `;
}

function setGlobalCurrency(curr) {
  CURRENCY_CONFIG.activeCurrency = 'USD';
  localStorage.setItem('kfc_active_currency', 'USD');

  // Update all toggle buttons in DOM
  document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
  });

  // Re-render open views
  if (typeof window.reRenderActiveViews === 'function') {
    window.reRenderActiveViews();
  }

  // Update modal price if modal is currently open
  const openModalItem = document.querySelector('.modal-container[data-current-item-id]');
  if (openModalItem) {
    const itemId = openModalItem.dataset.currentItemId;
    const item = KFC_MENU_DATA.find(i => i.id === itemId);
    if (item) {
      const modalPriceEl = openModalItem.querySelector('.modal-price-area');
      if (modalPriceEl) {
        modalPriceEl.innerHTML = formatPriceHTML(item.price);
      }
    }
  }
}

// 2. Comprehensive 65+ Authentic USA KFC Menu Items
const KFC_MENU_DATA = [
  // === 1. SANDWICHES & COMBOS ===
  {
    id: "sandwich-classic",
    name: "KFC Classic Chicken Sandwich",
    category: "Burgers & Sandwiches",
    price: 5.99,
    badge: "Bestseller",
    calories: "650 kcal",
    servingSize: "1 Sandwich",
    description: "An extra-crispy double-breaded chicken breast fillet topped with crinkle-cut thick pickles and Colonel's real mayo on a toasted buttery brioche bun.",
    itemsIncluded: ["Extra Crispy Chicken Breast Fillet", "Thick Crinkle-Cut Pickles", "Colonel's Mayo", "Toasted Brioche Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "sandwich-spicy",
    name: "KFC Spicy Chicken Sandwich",
    category: "Burgers & Sandwiches",
    price: 5.99,
    badge: "Fan Favorite",
    calories: "650 kcal",
    servingSize: "1 Sandwich",
    description: "Extra-crispy chicken breast fillet packed with fiery heat, thick crinkle-cut pickles, and spicy sauce on a toasted buttery brioche bun.",
    itemsIncluded: ["Spicy Extra Crispy Fillet", "Pickles", "Spicy Signature Sauce", "Toasted Brioche Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "sandwich-classic-combo",
    name: "KFC Classic Chicken Sandwich Combo",
    category: "Combos",
    price: 9.49,
    badge: "Top Combo",
    calories: "980 kcal",
    servingSize: "1 Combo Meal",
    description: "The classic KFC Chicken Sandwich served with a side of Secret Recipe Fries and a medium refreshing fountain beverage.",
    itemsIncluded: ["1x Classic Chicken Sandwich", "1x Secret Recipe Fries (Individual)", "1x Medium Drink (20 oz)"],
    image: "images/cat_combos.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "sandwich-spicy-combo",
    name: "KFC Spicy Chicken Sandwich Combo",
    category: "Combos",
    price: 9.49,
    badge: "Spicy Combo",
    calories: "980 kcal",
    servingSize: "1 Combo Meal",
    description: "The fiery Spicy KFC Chicken Sandwich accompanied by Secret Recipe Fries and your choice of medium fountain drink.",
    itemsIncluded: ["1x Spicy Chicken Sandwich", "1x Secret Recipe Fries", "1x Medium Fountain Drink"],
    image: "images/cat_combos.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "sandwich-bacon-cheese",
    name: "KFC Bacon & Cheese Chicken Sandwich",
    category: "Burgers & Sandwiches",
    price: 6.99,
    badge: "Loaded",
    calories: "740 kcal",
    servingSize: "1 Sandwich",
    description: "Crispy fried chicken breast fillet layered with savory hickory-smoked bacon, melted Monterey Jack cheese, pickles, and mayo on brioche.",
    itemsIncluded: ["Crispy Fillet", "Smoked Bacon Strips", "Monterey Jack Cheese", "Pickles", "Mayo", "Brioche Bun"],
    image: "images/mighty_zinger.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "sandwich-chicken-littles",
    name: "KFC Chicken Little",
    category: "Burgers & Sandwiches",
    price: 2.79,
    badge: "Best Value",
    calories: "300 kcal",
    servingSize: "1 Slider",
    description: "An Extra Crispy chicken tender topped with pickles and creamy Colonel's mayo served on a warm sesame seed slider bun.",
    itemsIncluded: ["1x Extra Crispy Tender", "Pickles", "Mayo", "Sesame Seed Slider Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "deal-2-chicken-littles",
    name: "2 Chicken Littles Value Deal",
    category: "Deals & Offers",
    price: 5.00,
    badge: "Value Saver",
    calories: "600 kcal",
    servingSize: "2 Sliders",
    description: "Two crispy Chicken Little sliders served hot and fresh. Perfect snack or quick bite on the go.",
    itemsIncluded: ["2x Chicken Little Sandwiches"],
    image: "images/zinger_burger.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },

  // === 2. FRIED CHICKEN (ORIGINAL RECIPE & EXTRA CRISPY) ===
  {
    id: "chicken-2pc-drum-thigh",
    name: "2 Pc Drum & Thigh Chicken Combo",
    category: "Combos",
    price: 8.99,
    badge: "Classic Meal",
    calories: "780 kcal",
    servingSize: "1 Person",
    description: "Two pieces of iconic fried chicken (Drumstick & Thigh in Original Recipe or Extra Crispy), 1 individual side, 1 warm buttermilk biscuit, and a medium drink.",
    itemsIncluded: ["2x Chicken Pieces (Drum & Thigh)", "1x Individual Side", "1x Buttermilk Biscuit", "1x Medium Drink"],
    image: "images/fried_chicken.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-3pc-meal",
    name: "3 Pc Chicken Combo (Breast, Thigh & Drum)",
    category: "Combos",
    price: 10.99,
    badge: "Hearty Meal",
    calories: "1050 kcal",
    servingSize: "1 Person",
    description: "Three pieces of world-famous chicken (variety cut), paired with 1 individual side, 1 warm buttermilk biscuit, and a medium fountain beverage.",
    itemsIncluded: ["3x Chicken Pieces", "1x Individual Side", "1x Warm Biscuit", "1x Medium Drink"],
    image: "images/fried_chicken.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-4pc-meal",
    name: "4 Pc Half Chicken Combo",
    category: "Combos",
    price: 12.99,
    badge: "Hungry Man",
    calories: "1350 kcal",
    servingSize: "1 Person",
    description: "Four piece fried chicken combo including breast, thigh, drumstick, and wing, plus 1 individual side, 1 buttermilk biscuit, and a medium drink.",
    itemsIncluded: ["4x Fried Chicken Pieces (Half Bird)", "1x Individual Side", "1x Biscuit", "1x Medium Drink"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-1pc-breast",
    name: "1 Pc Fried Chicken Breast (A La Carte)",
    category: "Fried Chicken",
    price: 3.99,
    badge: "Signature",
    calories: "390 kcal",
    servingSize: "1 Breast Piece",
    description: "One large juicy fried chicken breast prepared with the secret 11 herbs and spices (Original Recipe) or double-breaded Extra Crispy.",
    itemsIncluded: ["1x Fried Chicken Breast"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-1pc-thigh",
    name: "1 Pc Fried Chicken Thigh (A La Carte)",
    category: "Fried Chicken",
    price: 2.99,
    badge: "Juicy Dark",
    calories: "290 kcal",
    servingSize: "1 Thigh Piece",
    description: "Succulent, tender dark meat chicken thigh seasoned to perfection.",
    itemsIncluded: ["1x Fried Chicken Thigh"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-1pc-drum",
    name: "1 Pc Fried Chicken Drumstick",
    category: "Fried Chicken",
    price: 2.49,
    badge: "Snack Piece",
    calories: "130 kcal",
    servingSize: "1 Drumstick",
    description: "Classic fried drumstick hand-breaded and cooked fresh.",
    itemsIncluded: ["1x Chicken Drumstick"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 3. TENDERS & SAUCY NUGGETS ===
  {
    id: "tenders-3pc-combo",
    name: "3 Pc Hand-Breaded Tenders Combo",
    category: "Combos",
    price: 8.99,
    badge: "Top Seller",
    calories: "840 kcal",
    servingSize: "1 Person",
    description: "Three extra crispy 100% white meat chicken tenders, 1 dipping sauce of choice, Secret Recipe Fries, 1 biscuit, and a medium drink.",
    itemsIncluded: ["3x Extra Crispy Tenders", "1x Dipping Sauce", "1x Secret Recipe Fries", "1x Biscuit", "1x Medium Drink"],
    image: "images/chicken_tenders.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "tenders-5pc-combo",
    name: "5 Pc Hand-Breaded Tenders Combo",
    category: "Combos",
    price: 11.49,
    badge: "Big Eater",
    calories: "1120 kcal",
    servingSize: "1 Person",
    description: "Five extra-crispy chicken tenders, 2 dipping sauces, individual side, warm buttermilk biscuit, and a medium drink.",
    itemsIncluded: ["5x Extra Crispy Tenders", "2x Dipping Sauces", "1x Secret Recipe Fries", "1x Biscuit", "1x Medium Drink"],
    image: "images/chicken_tenders.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "tenders-4pc-box",
    name: "4 Pc Tenders Big Box Meal",
    category: "Signature Boxes",
    price: 12.49,
    badge: "Big Box",
    calories: "1280 kcal",
    servingSize: "1 Person",
    description: "Four crispy tenders, 2 dipping sauces, 2 individual sides (e.g. Mashed Potatoes & Fries), 1 biscuit, and a medium drink.",
    itemsIncluded: ["4x Crispy Tenders", "2x Dipping Sauces", "2x Individual Sides", "1x Biscuit", "1x Medium Drink"],
    image: "images/signature_box.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-sandwich-meal",
    name: "KFC Chicken Sandwich Big Box Meal",
    category: "Signature Boxes",
    price: 12.99,
    badge: "Loaded Box",
    calories: "1350 kcal",
    servingSize: "1 Person",
    description: "KFC Classic or Spicy Chicken Sandwich, 1 Extra Crispy Tender, 1 dipping sauce, individual fries, warm buttermilk biscuit, and a medium fountain drink.",
    itemsIncluded: ["1x KFC Chicken Sandwich", "1x Extra Crispy Tender", "1x Secret Recipe Fries", "1x Biscuit", "1x Medium Drink"],
    image: "images/signature_box.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-2pc-chicken-meal",
    name: "2 Pc Drum & Thigh Big Box Meal",
    category: "Signature Boxes",
    price: 11.99,
    badge: "Variety Box",
    calories: "1220 kcal",
    servingSize: "1 Person",
    description: "Two pieces of fried chicken (Drumstick & Thigh), 1 Extra Crispy Tender, individual mashed potatoes with gravy, 1 biscuit, and a medium drink.",
    itemsIncluded: ["2x Fried Chicken (Drum & Thigh)", "1x Crispy Tender", "1x Mashed Potatoes & Gravy", "1x Biscuit", "1x Medium Drink"],
    image: "images/signature_box.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "nuggets-8pc",
    name: "8 Pc 100% White Meat Nuggets",
    category: "Fried Chicken",
    price: 5.49,
    badge: "100% White Meat",
    calories: "280 kcal",
    servingSize: "8 Nuggets",
    description: "Eight hand-breaded 100% white meat nuggets seasoned with the Colonel's 11 herbs & spices. Includes 1 dipping sauce.",
    itemsIncluded: ["8x Hand-Breaded Nuggets", "1x Dipping Sauce"],
    image: "images/chicken_nuggets.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "nuggets-12pc",
    name: "12 Pc 100% White Meat Nuggets",
    category: "Fried Chicken",
    price: 7.99,
    badge: "Great Value",
    calories: "420 kcal",
    servingSize: "12 Nuggets",
    description: "Twelve hand-breaded chicken nuggets served with your choice of 2 signature dipping sauces.",
    itemsIncluded: ["12x Hand-Breaded Nuggets", "2x Dipping Sauces"],
    image: "images/chicken_nuggets.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "saucy-nuggets-honey-bbq",
    name: "10 Pc Honey BBQ Saucy Nuggets",
    category: "Fried Chicken",
    price: 6.99,
    badge: "Sweet & Smoky",
    calories: "490 kcal",
    servingSize: "10 Sauced Nuggets",
    description: "Ten crispy white-meat nuggets tossed in sweet, tangy Honey BBQ sauce with hints of brown sugar and smoke.",
    itemsIncluded: ["10x Saucy Nuggets in Honey BBQ"],
    image: "images/kfc_saucy_nuggets.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "saucy-nuggets-korean-bbq",
    name: "10 Pc Korean BBQ Saucy Nuggets",
    category: "Fried Chicken",
    price: 6.99,
    badge: "Umami Sweet",
    calories: "510 kcal",
    servingSize: "10 Sauced Nuggets",
    description: "Ten hand-breaded nuggets glazed in savory Korean BBQ sauce with soy, garlic, sesame, and chili kick.",
    itemsIncluded: ["10x Saucy Nuggets in Korean BBQ"],
    image: "images/kfc_saucy_nuggets.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "saucy-nuggets-mango-habanero",
    name: "10 Pc Mango Habanero Saucy Nuggets",
    category: "Fried Chicken",
    price: 6.99,
    badge: "Sweet Heat",
    calories: "500 kcal",
    servingSize: "10 Sauced Nuggets",
    description: "Ten crispy nuggets generously tossed in fiery habanero pepper and tropical mango glaze.",
    itemsIncluded: ["10x Saucy Nuggets in Mango Habanero"],
    image: "images/kfc_saucy_nuggets.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 4. POT PIES & FAMOUS BOWLS ===
  {
    id: "bowl-famous",
    name: "KFC Famous Bowl",
    category: "Combos",
    price: 6.99,
    badge: "All-Time Icon",
    calories: "720 kcal",
    servingSize: "1 Bowl",
    description: "Creamy mashed potatoes layered with sweet corn, crispy bite-sized nuggets, roasted brown gravy, and a shredded three-cheese blend.",
    itemsIncluded: ["Mashed Potatoes", "Sweet Corn", "Crispy Chicken Nuggets", "Brown Gravy", "3-Cheese Blend"],
    image: "images/kfc_famous_bowl.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bowl-spicy-famous",
    name: "KFC Spicy Famous Bowl",
    category: "Combos",
    price: 7.29,
    badge: "Spicy Twist",
    calories: "750 kcal",
    servingSize: "1 Bowl",
    description: "The Famous Bowl kicked up a notch with fiery Nashville Hot sauce drizzled over crispy nuggets and mashed potatoes.",
    itemsIncluded: ["Mashed Potatoes", "Sweet Corn", "Crispy Nuggets", "Spicy Drizzle", "Gravy", "Cheese"],
    image: "images/kfc_famous_bowl.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "pot-pie-classic",
    name: "KFC Chunky Chicken Pot Pie",
    category: "Combos",
    price: 6.99,
    badge: "Comfort Food",
    calories: "720 kcal",
    servingSize: "1 Pot Pie",
    description: "Tender shredded chicken, diced potatoes, green peas, and carrots in a rich savory cream sauce under a golden flaky crust.",
    itemsIncluded: ["Flaky Golden Crust", "Shredded Chicken", "Diced Vegetables", "Creamy Veloute Sauce"],
    image: "images/kfc_pot_pie.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 5. FAMILY MEALS & BUCKETS ===
  {
    id: "family-8pc-meal",
    name: "8 Pc Family Chicken Meal",
    category: "Family Deals",
    price: 24.99,
    badge: "Family Classic",
    calories: "2850 kcal",
    servingSize: "3-4 People",
    description: "8 pieces of world-famous chicken (Original Recipe or Extra Crispy), 2 large homestyle sides of choice, and 4 warm buttermilk biscuits.",
    itemsIncluded: ["8x Chicken Pieces (2 Breasts, 2 Thighs, 2 Drums, 2 Wings)", "2x Large Sides", "4x Buttermilk Biscuits"],
    image: "images/family_bucket.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "family-8pc-bucket-only",
    name: "8 Pc Chicken Bucket (Chicken Only)",
    category: "Family Deals",
    price: 18.99,
    badge: "Bucket Deal",
    calories: "2100 kcal",
    servingSize: "3-4 People",
    description: "8 pieces of fresh, hand-breaded chicken cooked in the secret 11 herbs & spices recipe or Extra Crispy.",
    itemsIncluded: ["8x Freshly Fried Chicken Pieces"],
    image: "images/bucket_pieces.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "family-12pc-meal",
    name: "12 Pc Family Feast Meal",
    category: "Family Deals",
    price: 33.99,
    badge: "Feast Saver",
    calories: "4200 kcal",
    servingSize: "5-6 People",
    description: "12 pieces of fried chicken, 3 large homestyle sides, and 6 warm buttermilk biscuits. Perfect for family dinner nights.",
    itemsIncluded: ["12x Fried Chicken Pieces", "3x Large Sides", "6x Warm Buttermilk Biscuits"],
    image: "images/family_festival.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "family-12pc-bucket-only",
    name: "12 Pc Chicken Bucket (Chicken Only)",
    category: "Family Deals",
    price: 25.99,
    badge: "Crowd Favorite",
    calories: "3150 kcal",
    servingSize: "5-6 People",
    description: "12 pieces of crispy, juicy fried chicken in a classic KFC bucket.",
    itemsIncluded: ["12x Fried Chicken Pieces"],
    image: "images/bucket_pieces.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "family-16pc-meal",
    name: "16 Pc Mega Family Feast",
    category: "Family Deals",
    price: 41.99,
    badge: "Mega Party",
    calories: "5600 kcal",
    servingSize: "7-8 People",
    description: "16 pieces of crispy chicken, 4 large homestyle sides, and 8 warm buttermilk biscuits. Feeds the entire crew.",
    itemsIncluded: ["16x Fried Chicken Pieces", "4x Large Homestyle Sides", "8x Warm Buttermilk Biscuits"],
    image: "images/family_festival.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "family-12pc-tenders-meal",
    name: "12 Pc Extra Crispy Tenders Family Meal",
    category: "Family Deals",
    price: 28.99,
    badge: "Tenders Feast",
    calories: "3400 kcal",
    servingSize: "4-5 People",
    description: "12 hand-breaded crispy tenders, 4 dipping sauces, 2 large sides, and 4 warm biscuits.",
    itemsIncluded: ["12x Crispy Tenders", "4x Dipping Sauces", "2x Large Sides", "4x Biscuits"],
    image: "images/chicken_tenders.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "deal-taste-of-kfc-20",
    name: "$20 Taste of KFC Meal Deal",
    category: "Deals & Offers",
    price: 20.00,
    badge: "$20 Value Deal",
    calories: "2700 kcal",
    servingSize: "4 People",
    description: "6 pieces of chicken (2 drums, 2 thighs, 1 breast, 1 wing), 4 individual sides, and 4 warm biscuits for just $20.",
    itemsIncluded: ["6x Fried Chicken Pieces", "4x Individual Sides", "4x Buttermilk Biscuits"],
    image: "images/box_duo.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },

  // === 6. SIDES & EXTRAS ===
  {
    id: "side-secret-fries",
    name: "Secret Recipe Fries",
    category: "Snacks & Sides",
    price: 3.29,
    badge: "Signature Side",
    calories: "320 kcal",
    servingSize: "Individual / Regular",
    description: "Crispy cut potatoes seasoned with a signature blend of herbs and spices for an unmatched flavor and crunch.",
    itemsIncluded: ["Individual Portion Seasoned Fries"],
    image: "images/crispy_fries.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-mashed-potatoes-gravy",
    name: "Mashed Potatoes with Brown Gravy",
    category: "Snacks & Sides",
    price: 3.29,
    badge: "Iconic",
    calories: "130 kcal",
    servingSize: "Individual Bowl",
    description: "Smooth, buttery whipped mashed potatoes drenched in the Colonel's famous roasted savory brown gravy.",
    itemsIncluded: ["1x Creamy Mashed Potatoes with Gravy"],
    image: "images/kfc_mashed_potatoes.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-coleslaw",
    name: "Creamy Coleslaw",
    category: "Snacks & Sides",
    price: 3.19,
    badge: "Fresh & Crisp",
    calories: "170 kcal",
    servingSize: "Individual Cup",
    description: "Fresh, crisp shredded cabbage and diced carrots tossed in KFC's signature creamy sweet dressing.",
    itemsIncluded: ["1x Cup Fresh Creamy Coleslaw"],
    image: "images/kfc_coleslaw.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-biscuit-single",
    name: "Warm Buttermilk Biscuit (1 Pc)",
    category: "Snacks & Sides",
    price: 1.29,
    badge: "Flaky & Warm",
    calories: "180 kcal",
    servingSize: "1 Biscuit",
    description: "Warm, golden, flaky buttermilk biscuit with butter spread and honey sauce packet.",
    itemsIncluded: ["1x Buttermilk Biscuit", "1x Honey Sauce / Butter"],
    image: "images/buttermilk_biscuits.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-biscuits-4pc",
    name: "Buttermilk Biscuits (4 Pcs)",
    category: "Snacks & Sides",
    price: 4.49,
    badge: "Pack of 4",
    calories: "720 kcal",
    servingSize: "4 Biscuits",
    description: "Four freshly baked flaky buttermilk biscuits with honey and butter.",
    itemsIncluded: ["4x Warm Buttermilk Biscuits"],
    image: "images/buttermilk_biscuits.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-mac-cheese",
    name: "Mac & Cheese",
    category: "Snacks & Sides",
    price: 3.69,
    badge: "Cheesy",
    calories: "280 kcal",
    servingSize: "Individual Cup",
    description: "Elbow macaroni enveloped in a rich, creamy cheddar cheese sauce.",
    itemsIncluded: ["1x Individual Mac & Cheese Cup"],
    image: "images/kfc_mac_cheese.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-sweet-corn",
    name: "Sweet Whole Kernel Corn",
    category: "Snacks & Sides",
    price: 3.29,
    badge: "Sweet & Tender",
    calories: "100 kcal",
    servingSize: "Individual Cup",
    description: "Sweet, juicy tender golden corn kernels lightly buttered.",
    itemsIncluded: ["1x Cup Sweet Kernel Corn"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-large-gravy",
    name: "Colonel's Signature Brown Gravy (Large)",
    category: "Snacks & Sides",
    price: 2.99,
    badge: "Savory Dip",
    calories: "120 kcal",
    servingSize: "Large Cup",
    description: "A large cup of warm, savory roasted chicken brown gravy for dipping tenders, biscuits, and fries.",
    itemsIncluded: ["1x Large Gravy Cup"],
    image: "images/kfc_mashed_potatoes.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 7. DESSERTS ===
  {
    id: "dessert-apple-pie-poppers",
    name: "Apple Pie Poppers (4 Pcs)",
    category: "Desserts",
    price: 2.99,
    badge: "Warm & Crispy",
    calories: "340 kcal",
    servingSize: "4 Poppers",
    description: "Crispy, flaky puff pastry poppers filled with warm spiced apple pie filling and dusted with cinnamon sugar.",
    itemsIncluded: ["4x Warm Apple Pie Poppers"],
    image: "images/chocolate_dessert.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "dessert-cake-choc-chip",
    name: "KFC Chocolate Chip Mini Cake",
    category: "Desserts",
    price: 3.49,
    badge: "Sweet Treat",
    calories: "300 kcal",
    servingSize: "1 Mini Cake",
    description: "Warm individual chocolate chip cake with melted chocolate drizzle.",
    itemsIncluded: ["1x Chocolate Chip Cake"],
    image: "images/chocolate_dessert.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "dessert-cookies-3pc",
    name: "Chocolate Chip Cookies (3 Pcs)",
    category: "Desserts",
    price: 2.49,
    badge: "Fresh Baked",
    calories: "420 kcal",
    servingSize: "3 Cookies",
    description: "Three soft-baked chocolate chip cookies loaded with rich semi-sweet chocolate morsels.",
    itemsIncluded: ["3x Chocolate Chip Cookies"],
    image: "images/chocolate_dessert.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 8. BEVERAGES ===
  {
    id: "drink-mtn-dew-sweet-lightning",
    name: "MTN DEW Sweet Lightning (Medium)",
    category: "Beverages",
    price: 2.69,
    badge: "KFC Exclusive",
    calories: "220 kcal",
    servingSize: "20 oz Drink",
    description: "KFC exclusive Mountain Dew flavor with sweet peach and honey notes, formulated to pair with fried chicken.",
    itemsIncluded: ["1x 20 oz Fountain Drink"],
    image: "images/kfc_krushers_drinks.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "drink-pepsi-medium",
    name: "Pepsi Cola Fountain Drink (Medium)",
    category: "Beverages",
    price: 2.69,
    badge: "Classic Refresh",
    calories: "250 kcal",
    servingSize: "20 oz Drink",
    description: "Chilled, ice-cold fountain Pepsi cola.",
    itemsIncluded: ["1x 20 oz Fountain Drink"],
    image: "images/kfc_krushers_drinks.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "drink-sweet-tea",
    name: "Southern Sweet Iced Tea",
    category: "Beverages",
    price: 2.69,
    badge: "Southern Style",
    calories: "180 kcal",
    servingSize: "20 oz Cup",
    description: "Freshly brewed iced black tea sweetened southern style.",
    itemsIncluded: ["1x 20 oz Sweet Tea"],
    image: "images/kfc_krushers_drinks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "drink-lemonade",
    name: "Colonel's Lemonade",
    category: "Beverages",
    price: 2.89,
    badge: "Tangy & Sweet",
    calories: "200 kcal",
    servingSize: "20 oz Cup",
    description: "Refreshing, crisp lemonade made with real lemon juice.",
    itemsIncluded: ["1x 20 oz Lemonade"],
    image: "images/kfc_krushers_drinks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 9. NEW AUTHENTIC KFC USA ADDITIONS ===
  // --- KFC Chicken Wraps & Combos ---
  {
    id: "wrap-classic",
    name: "KFC Classic Chicken Wrap",
    category: "Burgers & Sandwiches",
    price: 3.49,
    badge: "Fan Favorite",
    calories: "370 kcal",
    servingSize: "1 Wrap",
    description: "An Extra Crispy hand-breaded chicken tender, crunchy pickles, and Colonel's creamy real mayo wrapped in a warm toasted flour tortilla.",
    itemsIncluded: ["1x Extra Crispy Chicken Tender", "Thick Crinkle-Cut Pickles", "Colonel's Mayo", "Warm Flour Tortilla"],
    image: "images/chicken_wrap.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "wrap-spicy-slaw",
    name: "KFC Spicy Slaw Chicken Wrap",
    category: "Burgers & Sandwiches",
    price: 3.49,
    badge: "Spicy Crunch",
    calories: "390 kcal",
    servingSize: "1 Wrap",
    description: "An Extra Crispy chicken tender topped with KFC's signature creamy coleslaw, spicy sauce, and pickles wrapped in a toasted flour tortilla.",
    itemsIncluded: ["1x Extra Crispy Tender", "Creamy Coleslaw", "Spicy Signature Sauce", "Pickles", "Toasted Flour Tortilla"],
    image: "images/chicken_wrap.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "wrap-mac-cheese",
    name: "KFC Mac & Cheese Chicken Wrap",
    category: "Burgers & Sandwiches",
    price: 3.49,
    badge: "Cheesy Favorite",
    calories: "400 kcal",
    servingSize: "1 Wrap",
    description: "An Extra Crispy chicken tender topped with rich cheddar Mac & Cheese and a shredded three-cheese blend wrapped in a warm tortilla.",
    itemsIncluded: ["1x Extra Crispy Tender", "Cheddar Mac & Cheese", "Three-Cheese Blend", "Warm Flour Tortilla"],
    image: "images/chicken_wrap.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "wrap-honey-bbq",
    name: "KFC Honey BBQ Chicken Wrap",
    category: "Burgers & Sandwiches",
    price: 3.49,
    badge: "Sweet & Tangy",
    calories: "380 kcal",
    servingSize: "1 Wrap",
    description: "An Extra Crispy chicken tender smothered in sweet Honey BBQ sauce with crunchy pickles and mayo in a warm toasted tortilla.",
    itemsIncluded: ["1x Extra Crispy Tender", "Sweet Honey BBQ Sauce", "Pickles", "Mayo", "Toasted Tortilla"],
    image: "images/chicken_wrap.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-2-wraps",
    name: "KFC 2 Wraps Combo Meal",
    category: "Combos",
    price: 8.99,
    badge: "Value Combo",
    calories: "980 kcal",
    servingSize: "1 Combo Meal",
    description: "Your choice of any 2 KFC Chicken Wraps served with individual Secret Recipe Fries and a refreshing medium fountain drink.",
    itemsIncluded: ["2x KFC Chicken Wraps of Choice", "1x Secret Recipe Fries", "1x Medium Fountain Drink"],
    image: "images/cat_combos.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // --- Fried Chicken Cuts & Tenders Packs ---
  {
    id: "chicken-1pc-wing",
    name: "1 Pc Fried Chicken Whole Wing (A La Carte)",
    category: "Fried Chicken",
    price: 2.19,
    badge: "Crispy Wing",
    calories: "130 kcal",
    servingSize: "1 Whole Wing",
    description: "Golden crispy fried chicken whole wing prepared with Original Recipe 11 herbs & spices or Extra Crispy double breading.",
    itemsIncluded: ["1x Fried Chicken Whole Wing"],
    image: "images/hot_wings.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-2pc-breast-wing",
    name: "2 Pc Breast & Wing Chicken Combo",
    category: "Combos",
    price: 9.49,
    badge: "White Meat Combo",
    calories: "890 kcal",
    servingSize: "1 Person",
    description: "Two pieces of 100% white meat fried chicken (Breast & Wing), paired with 1 individual side, 1 warm buttermilk biscuit, and a medium fountain drink.",
    itemsIncluded: ["1x Chicken Breast", "1x Chicken Wing", "1x Individual Side", "1x Buttermilk Biscuit", "1x Medium Drink"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "tenders-8pc-alacarte",
    name: "8 Pc Hand-Breaded Tenders (A La Carte)",
    category: "Fried Chicken",
    price: 14.99,
    badge: "Tenders Pack",
    calories: "1080 kcal",
    servingSize: "2-3 People",
    description: "Eight hand-breaded extra crispy 100% white meat chicken tenders served with your choice of 3 signature dipping sauces.",
    itemsIncluded: ["8x Extra Crispy Tenders", "3x Dipping Sauces"],
    image: "images/chicken_tenders.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "tenders-16pc-bucket-only",
    name: "16 Pc Extra Crispy Tenders Bucket",
    category: "Family Deals",
    price: 26.99,
    badge: "Mega Tenders",
    calories: "2160 kcal",
    servingSize: "4-6 People",
    description: "A full party bucket of 16 extra-crispy hand-breaded chicken tenders served with 6 dipping sauces of your choice.",
    itemsIncluded: ["16x Extra Crispy Tenders", "6x Dipping Sauces"],
    image: "images/chicken_tenders.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },

  // --- Nuggets & Saucy Nuggets ---
  {
    id: "nuggets-5pc",
    name: "5 Pc 100% White Meat Nuggets",
    category: "Fried Chicken",
    price: 3.99,
    badge: "Snack Pack",
    calories: "180 kcal",
    servingSize: "5 Nuggets",
    description: "Five hand-breaded white meat nuggets seasoned with the Colonel's 11 herbs & spices. Includes 1 dipping sauce.",
    itemsIncluded: ["5x White Meat Nuggets", "1x Dipping Sauce"],
    image: "images/chicken_nuggets.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "nuggets-20pc",
    name: "20 Pc 100% White Meat Nuggets",
    category: "Fried Chicken",
    price: 12.49,
    badge: "Party Size",
    calories: "700 kcal",
    servingSize: "3-4 People",
    description: "Twenty crispy hand-breaded nuggets served with 4 dipping sauces. Ideal for sharing.",
    itemsIncluded: ["20x Hand-Breaded Nuggets", "4x Dipping Sauces"],
    image: "images/chicken_nuggets.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "saucy-nuggets-5pc-honey-bbq",
    name: "5 Pc Honey BBQ Saucy Nuggets",
    category: "Fried Chicken",
    price: 4.49,
    badge: "Saucy Snack",
    calories: "250 kcal",
    servingSize: "5 Sauced Nuggets",
    description: "Five crispy white meat nuggets tossed in sweet Honey BBQ sauce with hints of brown sugar and hickory smoke.",
    itemsIncluded: ["5x Saucy Nuggets in Honey BBQ"],
    image: "images/chicken_nuggets.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "saucy-nuggets-20pc",
    name: "20 Pc Saucy Nuggets Variety",
    category: "Fried Chicken",
    price: 13.99,
    badge: "Saucy Party",
    calories: "980 kcal",
    servingSize: "3-4 People",
    description: "Twenty crispy white-meat nuggets tossed in your choice of Honey BBQ, Korean BBQ, or Mango Habanero glaze.",
    itemsIncluded: ["20x Saucy Nuggets in Selected Glaze"],
    image: "images/chicken_nuggets.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // --- Specialty Bowls ---
  {
    id: "bowl-smashd-potato",
    name: "KFC Smash'd Potato Bowl",
    category: "Combos",
    price: 3.49,
    badge: "Value Innovation",
    calories: "520 kcal",
    servingSize: "1 Bowl",
    description: "Creamy mashed potatoes topped with crispy Secret Recipe Fries, warm cheese sauce, savory bacon crumbles, and melted three-cheese blend.",
    itemsIncluded: ["Mashed Potatoes", "Secret Recipe Fries", "Warm Cheddar Cheese Sauce", "Bacon Crumbles", "Three-Cheese Blend"],
    image: "images/kfc_famous_bowl.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bowl-smashd-with-nuggets",
    name: "KFC Smash'd Potato Bowl with Nuggets",
    category: "Combos",
    price: 5.49,
    badge: "Loaded Meal",
    calories: "760 kcal",
    servingSize: "1 Loaded Bowl",
    description: "The Smash'd Potato Bowl topped with hand-breaded crispy chicken nuggets, warm cheese sauce, bacon crumbles, and melted cheese.",
    itemsIncluded: ["Crispy Nuggets", "Mashed Potatoes", "Secret Recipe Fries", "Cheese Sauce", "Bacon Crumbles", "3-Cheese Blend"],
    image: "images/kfc_famous_bowl.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bowl-mac-cheese",
    name: "KFC Mac & Cheese Bowl",
    category: "Combos",
    price: 6.49,
    badge: "Cheesy Comfort",
    calories: "710 kcal",
    servingSize: "1 Bowl",
    description: "Rich cheddar Mac & Cheese layered with crispy hand-breaded nuggets and topped with a savory three-cheese blend.",
    itemsIncluded: ["Cheddar Mac & Cheese", "Crispy Chicken Nuggets", "Three-Cheese Blend"],
    image: "images/kfc_mac_cheese.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // --- Taste of KFC Deals & Mega Buckets ---
  {
    id: "deal-taste-of-kfc-2pc",
    name: "$4.99 Taste of KFC 2 Pc Meal Deal",
    category: "Deals & Offers",
    price: 4.99,
    badge: "$4.99 Deal",
    calories: "690 kcal",
    servingSize: "1 Person",
    description: "Two pieces of fried chicken (1 Drumstick & 1 Thigh), 1 individual side of creamy mashed potatoes with gravy, and 1 warm buttermilk biscuit.",
    itemsIncluded: ["2x Fried Chicken Pieces (Drum & Thigh)", "1x Mashed Potatoes with Gravy", "1x Buttermilk Biscuit"],
    image: "images/box_wow.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },
  {
    id: "deal-taste-of-kfc-4pc",
    name: "$10.00 Taste of KFC 4 Pc Meal for Two",
    category: "Deals & Offers",
    price: 10.00,
    badge: "$10 Meal for Two",
    calories: "1380 kcal",
    servingSize: "2 People",
    description: "Four pieces of fried chicken (1 Breast, 1 Thigh, 1 Drum, 1 Wing), 2 individual sides of mashed potatoes with gravy, and 2 warm buttermilk biscuits.",
    itemsIncluded: ["4x Fried Chicken Pieces", "2x Mashed Potatoes with Gravy", "2x Buttermilk Biscuits"],
    image: "images/box_boneless.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },
  {
    id: "family-16pc-bucket-only",
    name: "16 Pc Chicken Bucket (Chicken Only)",
    category: "Family Deals",
    price: 32.99,
    badge: "Mega Bucket",
    calories: "4200 kcal",
    servingSize: "7-8 People",
    description: "Sixteen pieces of fresh, hand-breaded fried chicken in Original Recipe or Extra Crispy in a classic party bucket.",
    itemsIncluded: ["16x Fried Chicken Pieces"],
    image: "images/bucket_pieces.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },

  // --- Large Homestyle Sides & Green Beans ---
  {
    id: "side-secret-fries-large",
    name: "Secret Recipe Fries (Large)",
    category: "Snacks & Sides",
    price: 5.49,
    badge: "Shareable Side",
    calories: "840 kcal",
    servingSize: "3-4 People",
    description: "A large shareable portion of crispy cut potatoes seasoned with the Colonel's special blend of signature herbs and spices.",
    itemsIncluded: ["Large Portion Secret Recipe Fries"],
    image: "images/crispy_fries.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-mashed-potatoes-large",
    name: "Mashed Potatoes with Gravy (Large / Family Size)",
    category: "Snacks & Sides",
    price: 5.49,
    badge: "Family Size",
    calories: "390 kcal",
    servingSize: "3-4 People",
    description: "Large family-size bowl of smooth, creamy mashed potatoes smothered in savory brown gravy.",
    itemsIncluded: ["Large Bowl Mashed Potatoes with Gravy"],
    image: "images/kfc_mashed_potatoes.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-coleslaw-large",
    name: "Creamy Coleslaw (Large / Family Size)",
    category: "Snacks & Sides",
    price: 5.49,
    badge: "Family Size",
    calories: "510 kcal",
    servingSize: "3-4 People",
    description: "Family-size bowl of freshly shredded crisp cabbage and carrots in sweet creamy dressing.",
    itemsIncluded: ["Large Bowl Creamy Coleslaw"],
    image: "images/kfc_coleslaw.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-mac-cheese-large",
    name: "Mac & Cheese (Large / Family Size)",
    category: "Snacks & Sides",
    price: 5.99,
    badge: "Family Size",
    calories: "840 kcal",
    servingSize: "3-4 People",
    description: "Large family portion of tender elbow macaroni in a velvety, rich cheddar cheese sauce.",
    itemsIncluded: ["Large Bowl Mac & Cheese"],
    image: "images/kfc_mac_cheese.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-sweet-corn-large",
    name: "Sweet Whole Kernel Corn (Large)",
    category: "Snacks & Sides",
    price: 5.49,
    badge: "Family Size",
    calories: "300 kcal",
    servingSize: "3-4 People",
    description: "Large bowl of juicy golden sweet corn kernels lightly buttered.",
    itemsIncluded: ["Large Bowl Sweet Whole Kernel Corn"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "side-green-beans",
    name: "Seasoned Green Beans",
    category: "Snacks & Sides",
    price: 3.29,
    badge: "Homestyle Classic",
    calories: "50 kcal",
    servingSize: "Individual Cup",
    description: "Tender green beans simmered with onions, garlic, and savory spices for classic southern homestyle flavor.",
    itemsIncluded: ["1x Cup Seasoned Green Beans"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // --- Official KFC Dipping Sauces ---
  {
    id: "sauce-sampler-pack",
    name: "KFC Signature Dipping Sauce 4-Pack",
    category: "Snacks & Sides",
    price: 1.49,
    badge: "Sauce Sampler",
    calories: "450 kcal",
    servingSize: "4 Dipping Cups (1 oz each)",
    description: "Assorted pack of 4 iconic KFC dipping sauces: Colonel's Signature Sauce, Honey Mustard, Classic Buttermilk Ranch, and Buffalo Ranch.",
    itemsIncluded: ["1x KFC Signature Sauce", "1x Honey Mustard", "1x Classic Ranch", "1x Buffalo Ranch"],
    image: "images/cat_snacks.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // --- Beverages & Desserts ---
  {
    id: "drink-diet-pepsi",
    name: "Diet Pepsi Fountain Drink (Medium)",
    category: "Beverages",
    price: 2.69,
    badge: "Zero Calorie",
    calories: "0 kcal",
    servingSize: "20 oz Fountain Drink",
    description: "Crisp, cold, zero-calorie Diet Pepsi served fresh over ice.",
    itemsIncluded: ["1x 20 oz Fountain Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "drink-starry",
    name: "Starry Lemon-Lime Fountain Drink (Medium)",
    category: "Beverages",
    price: 2.69,
    badge: "Caffeine Free",
    calories: "210 kcal",
    servingSize: "20 oz Fountain Drink",
    description: "Crisp, clear, caffeine-free lemon-lime soda with bright citrus flavor.",
    itemsIncluded: ["1x 20 oz Fountain Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "dessert-apple-pie-8pc",
    name: "Apple Pie Poppers (8 Pcs Family Pack)",
    category: "Desserts",
    price: 5.49,
    badge: "Shareable Pack",
    calories: "680 kcal",
    servingSize: "8 Poppers",
    description: "Eight warm, crispy, flaky puff pastry poppers filled with spiced apple pie filling and dusted with cinnamon sugar.",
    itemsIncluded: ["8x Warm Apple Pie Poppers"],
    image: "images/chocolate_dessert.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  }
];

// 3. Top 22 US Metropolitan City Directories with Highlights & FAQs
const KFC_CITIES_DATA = [
  {
    slug: "new-york",
    name: "New York City, NY",
    state: "New York",
    outlets: "65+ Outlets",
    highlights: "Times Square Manhattan, Harlem, Brooklyn Flatbush, Queens Flushing, Bronx Grand Concourse, Staten Island Mall",
    deliveryHours: "10:30 AM – 02:00 AM (Late Night Select)",
    popularCombo: "KFC Spicy Chicken Sandwich Combo & 8 Pc Bucket",
    description: "From midtown Manhattan skyscrapers to Brooklyn and Queens neighborhoods, KFC New York serves millions of commuters and locals with fast drive-thrus, walk-up counters, and 24/7 delivery options via DoorDash and Uber Eats.",
    faqs: [
      { q: "What is the average KFC Chicken Sandwich price in New York City?", a: "In NYC metro branches, the standalone KFC Chicken Sandwich is typically priced around $5.99 to $6.49, while the full combo with Secret Recipe Fries and a medium drink averages $9.49 to $9.99." },
      { q: "Is late night KFC delivery available in Manhattan and Brooklyn?", a: "Yes, numerous KFC locations in Manhattan (such as 125th St Harlem and 14th St) and Brooklyn offer late-night delivery until 2:00 AM through the official KFC App and third-party delivery partners." },
      { q: "How much does an 8 Piece Family Meal cost in New York?", a: "The 8-piece Family Meal with 2 large homestyle sides and 4 warm biscuits is standard at approximately $24.99 across New York locations." }
    ]
  },
  {
    slug: "los-angeles",
    name: "Los Angeles, CA",
    state: "California",
    outlets: "55+ Outlets",
    highlights: "Hollywood Blvd, Downtown LA (DTLA), Koreatown, Santa Monica, Long Beach, Pasadena, Glendale",
    deliveryHours: "10:00 AM – 01:00 AM",
    popularCombo: "10 Pc Saucy Nuggets & 12 Pc Family Feast",
    description: "Across Los Angeles County, KFC restaurants offer quick drive-thru lanes and mobile order pick-up. Popular with families and late-night diners craving extra crispy chicken and saucy nuggets.",
    faqs: [
      { q: "Are KFC prices in Los Angeles subject to local California taxes?", a: "Yes, listed menu prices in Los Angeles are before local state and county sales taxes. Most meal combos range from $8.99 to $11.49." },
      { q: "Where are the busiest KFC drive-thrus in LA?", a: "High-volume drive-thru branches include Western Ave in Koreatown, Sunset Blvd in Hollywood, and Long Beach Blvd." },
      { q: "How much is the KFC Famous Bowl in Los Angeles?", a: "The KFC Famous Bowl is typically priced around $6.99 in the Greater Los Angeles area." }
    ]
  },
  {
    slug: "chicago",
    name: "Chicago, IL",
    state: "Illinois",
    outlets: "40+ Outlets",
    highlights: "The Loop, Lincoln Park, Logan Square, South Side, Cicero, Evanston, Schaumburg",
    deliveryHours: "10:30 AM – 12:30 AM",
    popularCombo: "3 Pc Hand-Breaded Tenders & Famous Bowl",
    description: "Chicagoans count on KFC for hot, crispy comfort food during cold winters and summer block parties. Easily accessible in the Loop and across suburban Cook County.",
    faqs: [
      { q: "Can I order KFC catering buckets in Chicago?", a: "Yes, Chicago branches offer 16-piece and 20-piece tenders catering boxes ideal for tailgates and family gatherings." },
      { q: "What is the 3 Pc Tenders Combo price in Chicago?", a: "The 3 Pc Tenders Combo with fries, biscuit, and beverage costs approximately $8.99." }
    ]
  },
  {
    slug: "houston",
    name: "Houston, TX",
    state: "Texas",
    outlets: "48+ Outlets",
    highlights: "Midtown, Galleria, Katy Freeway, Westheimer Rd, Sugar Land, Spring, Pearland",
    deliveryHours: "10:30 AM – 01:00 AM",
    popularCombo: "8 Pc Chicken Meal & MTN DEW Sweet Lightning",
    description: "Houston features expansive KFC branches with dual drive-thru lanes, serving classic southern fried chicken, sweet iced tea, and buttermilk biscuits across Harris County.",
    faqs: [
      { q: "Does KFC Houston carry MTN DEW Sweet Lightning on tap?", a: "Yes, all official KFC fountain dispensers in Houston carry the exclusive Sweet Lightning peach-honey flavor." },
      { q: "What is the price of the $20 Taste of KFC deal in Houston?", a: "The $20 Taste of KFC Meal Deal (6 pcs chicken, 4 individual sides, 4 biscuits) is available for $20.00 at participating Houston locations." }
    ]
  },
  {
    slug: "miami",
    name: "Miami, FL",
    state: "Florida",
    outlets: "32+ Outlets",
    highlights: "South Beach, Little Havana (Calle Ocho), Brickell, Coral Gables, Hialeah, Doral, Miami Gardens",
    deliveryHours: "10:30 AM – 02:00 AM",
    popularCombo: "KFC Spicy Chicken Sandwich & 12 Pc Nuggets",
    description: "Miami's vibrant food scene embraces KFC for beachside lunches, late-night dinners, and family buckets. Bilingual staff and drive-thrus operate across Miami-Dade.",
    faqs: [
      { q: "Is there a bilingual Spanish KFC menu in Miami?", a: "Yes, KFC locations across Miami and Hialeah provide bilingual service and Spanish menu assistance (Menú y Precios de KFC en Estados Unidos / KFC Precios USA)." },
      { q: "How much are 12 Pc Nuggets in Miami?", a: "12 pieces of 100% white-meat hand-breaded nuggets cost approximately $7.99." }
    ]
  },
  {
    slug: "dallas",
    name: "Dallas, TX",
    state: "Texas",
    outlets: "38+ Outlets",
    highlights: "Downtown Dallas, Uptown, Plano, Arlington, Irving, Fort Worth, Frisco",
    deliveryHours: "10:30 AM – 12:00 AM",
    popularCombo: "12 Pc Family Feast & Extra Crispy Tenders",
    description: "Serving the bustling Dallas-Fort Worth metroplex with high-capacity drive-thrus and mobile app order ahead pick-up points.",
    faqs: [
      { q: "What is the cost of a 12 Pc Family Feast in Dallas?", a: "The 12 Pc Family Feast (12 pcs chicken, 3 large sides, 6 biscuits) is priced at $33.99." }
    ]
  },
  {
    slug: "phoenix",
    name: "Phoenix, AZ",
    state: "Arizona",
    outlets: "30+ Outlets",
    highlights: "Camelback Rd, Scottsdale, Tempe (ASU Campus), Mesa, Glendale, Chandler",
    deliveryHours: "10:00 AM – 11:30 PM",
    popularCombo: "4 Pc Tenders Big Box & Secret Recipe Fries",
    description: "Phoenix and Valley of the Sun residents enjoy fast drive-thru service and air-conditioned dining rooms across Maricopa County.",
    faqs: [
      { q: "Where is the closest KFC near ASU Tempe campus?", a: "A popular student KFC location operates on Rural Rd near Apache Blvd in Tempe." }
    ]
  },
  {
    slug: "philadelphia",
    name: "Philadelphia, PA",
    state: "Pennsylvania",
    outlets: "28+ Outlets",
    highlights: "Center City, South Philly (Broad St), North Philly, University City, Northeast Philly",
    deliveryHours: "10:30 AM – 01:00 AM",
    popularCombo: "Famous Bowl & Classic Chicken Sandwich Combo",
    description: "Philadelphia outlets serve students, sports fans, and local neighborhoods with quick counter service and delivery.",
    faqs: [
      { q: "Can I get KFC delivery near South Philly sports stadiums?", a: "Yes, delivery is active across South Philadelphia via the KFC app, DoorDash, and Uber Eats." }
    ]
  },
  {
    slug: "san-antonio",
    name: "San Antonio, TX",
    state: "Texas",
    outlets: "26+ Outlets",
    highlights: "River Walk area, Alamo Heights, San Pedro Ave, Westover Hills, Medical Center",
    deliveryHours: "10:30 AM – 11:30 PM",
    popularCombo: "8 Pc Bucket & Buttermilk Biscuits",
    description: "San Antonio families trust KFC for authentic Original Recipe chicken and southern sides across Bexar County.",
    faqs: [
      { q: "How much are buttermilk biscuits at San Antonio KFCs?", a: "An individual biscuit is $1.29, while a 4-pack of warm biscuits costs $4.49." }
    ]
  },
  {
    slug: "san-diego",
    name: "San Diego, CA",
    state: "California",
    outlets: "24+ Outlets",
    highlights: "Mission Valley, Pacific Beach, Chula Vista, El Cajon, Clairemont, Escondido",
    deliveryHours: "10:30 AM – 11:00 PM",
    popularCombo: "3 Pc Chicken Combo & Southern Sweet Tea",
    description: "San Diego's sunny coast features modern KFC locations equipped with drive-thrus and mobile pick-up cubbies.",
    faqs: [
      { q: "What is the price of the 3 Pc Combo in San Diego?", a: "The 3 Pc Chicken Combo is around $10.99 with side, biscuit, and beverage." }
    ]
  },
  {
    slug: "atlanta",
    name: "Atlanta, GA",
    state: "Georgia",
    outlets: "35+ Outlets",
    highlights: "Midtown, Downtown Atlanta, Buckhead, Decatur, Marietta, College Park, Alpharetta",
    deliveryHours: "10:30 AM – 01:00 AM",
    popularCombo: "Chunky Pot Pie & Extra Crispy Tenders Combo",
    description: "In the heart of the South, Atlanta KFC locations serve hot, golden fried chicken, sweet tea, and warm biscuits to millions of residents and travelers passing through Hartsfield-Jackson.",
    faqs: [
      { q: "Is there a KFC near Atlanta Hartsfield Airport?", a: "Yes, several outlets operate along Virginia Ave and Camp Creek Pkwy within minutes of the airport." }
    ]
  },
  {
    slug: "orlando",
    name: "Orlando, FL",
    state: "Florida",
    outlets: "25+ Outlets",
    highlights: "International Drive, Kissimmee, Universal Blvd, Downtown Orlando, Winter Park",
    deliveryHours: "10:30 AM – 01:30 AM",
    popularCombo: "16 Pc Mega Feast & Apple Pie Poppers",
    description: "A favorite for tourists and theme park visitors looking for high-value family meals on International Drive and US-192.",
    faqs: [
      { q: "Can I order family buckets near Disney and Universal in Orlando?", a: "Yes, high-volume branches along I-Drive and Kissimmee specialize in family buckets and fast mobile orders." }
    ]
  },
  {
    slug: "las-vegas",
    name: "Las Vegas, NV",
    state: "Nevada",
    outlets: "22+ Outlets",
    highlights: "Las Vegas Strip vicinity, Henderson, North Las Vegas, Spring Valley, Summerlin",
    deliveryHours: "10:00 AM – 03:00 AM (Late Night)",
    popularCombo: "Spicy Chicken Sandwich Combo & Saucy Nuggets",
    description: "Late-night dining capital featuring extended hours, 24/7 delivery options, and convenient drive-thrus off the Las Vegas Strip.",
    faqs: [
      { q: "How late is KFC open in Las Vegas?", a: "Multiple Las Vegas branches operate drive-thru lanes until 2:00 AM or 3:00 AM on weekends." }
    ]
  },
  {
    slug: "seattle",
    name: "Seattle, WA",
    state: "Washington",
    outlets: "18+ Outlets",
    highlights: "Downtown Seattle, Rainier Ave, Ballard, Bellevue, Renton, Tacoma",
    deliveryHours: "10:30 AM – 11:00 PM",
    popularCombo: "KFC Classic Chicken Sandwich & Famous Bowl",
    description: "Pacific Northwest locations serving hot, hearty comfort meals and crispy chicken tenders.",
    faqs: [
      { q: "How much does a Classic Chicken Sandwich cost in Seattle?", a: "In the Seattle metropolitan area, the sandwich is priced at $5.99." }
    ]
  },
  {
    slug: "denver",
    name: "Denver, CO",
    state: "Colorado",
    outlets: "20+ Outlets",
    highlights: "Colfax Ave, Downtown Denver, Aurora, Lakewood, Thornton, Highlands Ranch",
    deliveryHours: "10:30 AM – 11:00 PM",
    popularCombo: "Chunky Chicken Pot Pie & 8 Pc Meal",
    description: "Mile High City residents enjoy hearty warm pot pies, mashed potatoes, and crispy chicken buckets after a day in the mountains.",
    faqs: [
      { q: "What is the price of the Chunky Pot Pie in Denver?", a: "The Chicken Pot Pie is priced at $6.99." }
    ]
  },
  {
    slug: "san-francisco",
    name: "San Francisco, CA",
    state: "California",
    outlets: "16+ Outlets",
    highlights: "Mission District, Geary Blvd, South San Francisco, Oakland, Daly City, Berkeley",
    deliveryHours: "10:30 AM – 11:00 PM",
    popularCombo: "5 Pc Tenders Combo & Secret Recipe Fries",
    description: "Serving the Bay Area with digital pick-up kiosks and swift delivery options across SF, Oakland, and Peninsula cities.",
    faqs: [
      { q: "Are mobile orders available at SF Bay Area KFC locations?", a: "Yes, express mobile order pick-up is enabled at all Bay Area locations." }
    ]
  },
  {
    slug: "boston",
    name: "Boston, MA",
    state: "Massachusetts",
    outlets: "15+ Outlets",
    highlights: "Dorchester, Roxbury, East Boston, Cambridge, Quincy, Medford",
    deliveryHours: "10:30 AM – 11:30 PM",
    popularCombo: "Classic Chicken Sandwich Combo & Mac & Cheese",
    description: "Serving Greater Boston colleges and neighborhoods with hot chicken combos, crispy fries, and rich Mac & Cheese.",
    faqs: [
      { q: "What is the price of Mac & Cheese in Boston KFCs?", a: "Individual Mac & Cheese is priced at $3.49." }
    ]
  },
  {
    slug: "austin",
    name: "Austin, TX",
    state: "Texas",
    outlets: "18+ Outlets",
    highlights: "South Congress, North Lamar, Riverside Dr, Round Rock, Cedar Park",
    deliveryHours: "10:30 AM – 12:00 AM",
    popularCombo: "Spicy Famous Bowl & 8 Pc Chicken Bucket",
    description: "Capital of Texas favorite for quick lunches, student meals near UT Austin, and weekend family buckets.",
    faqs: [
      { q: "How much is an 8 Pc Bucket (chicken only) in Austin?", a: "The 8 Pc chicken-only bucket is $18.99." }
    ]
  },
  {
    slug: "columbus",
    name: "Columbus, OH",
    state: "Ohio",
    outlets: "22+ Outlets",
    highlights: "High St (Ohio State campus), Dublin, Westerville, Reynoldsburg, Grove City",
    deliveryHours: "10:30 AM – 11:30 PM",
    popularCombo: "4 Pc Tenders Box & Apple Pie Poppers",
    description: "Serving Central Ohio and Buckeye fans with hot tenders, big boxes, and delicious dessert poppers.",
    faqs: [
      { q: "How much are Apple Pie Poppers in Columbus?", a: "A 4-pack of warm Apple Pie Poppers is $2.99." }
    ]
  },
  {
    slug: "charlotte",
    name: "Charlotte, NC",
    state: "North Carolina",
    outlets: "24+ Outlets",
    highlights: "South Blvd, University City, Independence Blvd, Concord, Gastonia, Huntersville",
    deliveryHours: "10:30 AM – 11:00 PM",
    popularCombo: "8 Pc Family Meal & Buttermilk Biscuits",
    description: "Queen City favorite for authentic southern comfort chicken, crispy tenders, and sweet tea.",
    faqs: [
      { q: "What sides come with the 8 Pc Family Meal in Charlotte?", a: "You get 2 large sides (such as Mashed Potatoes & Coleslaw) and 4 biscuits." }
    ]
  },
  {
    slug: "indianapolis",
    name: "Indianapolis, IN",
    state: "Indiana",
    outlets: "20+ Outlets",
    highlights: "Speedway, Broad Ripple, Greenwood, Carmel, Castleton, Fishers",
    deliveryHours: "10:30 AM – 11:00 PM",
    popularCombo: "KFC Chicken Sandwich & 3 Pc Tenders Combo",
    description: "Hoosier state favorite offering fast drive-thrus near the Indianapolis Motor Speedway and suburban hubs.",
    faqs: [
      { q: "What is the price of the KFC Chicken Sandwich in Indianapolis?", a: "The standalone sandwich is $5.99." }
    ]
  },
  {
    slug: "jacksonville",
    name: "Jacksonville, FL",
    state: "Florida",
    outlets: "22+ Outlets",
    highlights: "Beach Blvd, Southside, Arlington, Orange Park, Mandarin, Northside",
    deliveryHours: "10:30 AM – 11:30 PM",
    popularCombo: "12 Pc Family Feast & MTN DEW Sweet Lightning",
    description: "Extensive network across Duval County with convenient drive-thrus and family-friendly dining.",
    faqs: [
      { q: "Can I order 12 Pc Family Meals in Jacksonville?", a: "Yes, the 12 Pc Family Feast is available for $33.99." }
    ]
  }
];

// 4. Render Menu Card HTML (USD + Badges + Serving/Calories)
function createCardHTML(item) {
  const isGoldBadge = item.badge === 'Bestseller' || item.badge === 'Top Seller' || item.badge === 'Value Saver' || item.badge === 'Big Box';
  const priceHTML = formatPriceHTML(item.price);

  return `
    <article class="food-card" data-id="${item.id}" data-category="${item.category}" data-price="${item.price}">
      <div class="card-img-wrapper">
        ${item.badge ? `<span class="card-badge ${isGoldBadge ? 'gold' : ''}">${item.badge}</span>` : ''}
        <img src="${item.image}" alt="${item.name} - KFC USA Menu" loading="lazy" width="300" height="200">
        <span class="card-calorie-pill">${item.calories}</span>
      </div>
      <div class="card-body">
        <div class="card-meta-top">
          <span class="card-category">${item.category}</span>
          <span class="card-serving-tag">🍽️ ${item.servingSize}</span>
        </div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
        
        <div class="card-includes-preview">
          <strong>Includes:</strong> ${item.itemsIncluded.slice(0, 3).join(' • ')}${item.itemsIncluded.length > 3 ? '...' : ''}
        </div>

        <div class="card-footer">
          <div class="card-price-container">
            ${priceHTML}
          </div>
          <button class="btn-card-details" onclick="openItemModal('${item.id}')" aria-label="View details for ${item.name}">
            View Details
          </button>
        </div>
      </div>
    </article>
  `;
}

// 5. Grid Renderer
function renderMenuGrid(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = `
      <div class="no-results-box">
        <div class="no-results-icon">🍗</div>
        <h3>No matching menu items found</h3>
        <p>Try clearing your search keyword, adjusting the price filter, or switching categories.</p>
        <button class="btn btn-secondary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(createCardHTML).join('');
}

// 6. Curated Spotlight Sections Renderer (Popular, Best Value, Family Deals, Latest Offers, Bowls, Tenders, Sides)
function renderSpotlightSections() {
  const popularContainer = document.getElementById('spotlight-popular-container');
  const bestValueContainer = document.getElementById('spotlight-value-container');
  const familyContainer = document.getElementById('spotlight-family-container');
  const dealsContainer = document.getElementById('spotlight-deals-container');
  const bowlsContainer = document.getElementById('spotlight-bowls-container');
  const tendersContainer = document.getElementById('spotlight-tenders-container');
  const sidesContainer = document.getElementById('spotlight-sides-container');

  if (popularContainer) {
    const popularIds = [
      'sandwich-classic',
      'chicken-2pc-drum-thigh',
      'tenders-3pc-combo',
      'bowl-famous'
    ];
    const popularItems = popularIds.map(id => KFC_MENU_DATA.find(i => i.id === id)).filter(Boolean);
    popularContainer.innerHTML = popularItems.map(createCardHTML).join('');
  }
  if (bestValueContainer) {
    const valueIds = [
      'sandwich-chicken-littles',
      'wrap-classic',
      'chicken-1pc-drum',
      'side-biscuits-4pc'
    ];
    const valueItems = valueIds.map(id => KFC_MENU_DATA.find(i => i.id === id)).filter(Boolean);
    bestValueContainer.innerHTML = valueItems.map(createCardHTML).join('');
  }
  if (familyContainer) {
    const familyIds = [
      'family-8pc-meal',
      'family-12pc-meal',
      'family-12pc-tenders-meal',
      'family-16pc-meal'
    ];
    const familyItems = familyIds.map(id => KFC_MENU_DATA.find(i => i.id === id)).filter(Boolean);
    familyContainer.innerHTML = familyItems.map(createCardHTML).join('');
  }
  if (dealsContainer) {
    const dealIds = [
      'deal-taste-of-kfc-20',
      'deal-taste-of-kfc-2pc',
      'deal-taste-of-kfc-4pc',
      'deal-2-chicken-littles'
    ];
    const dealsItems = dealIds.map(id => KFC_MENU_DATA.find(i => i.id === id)).filter(Boolean);
    dealsContainer.innerHTML = dealsItems.map(createCardHTML).join('');
  }
  if (bowlsContainer) {
    const bowlIds = [
      'bowl-famous',
      'pot-pie-classic',
      'bowl-mac-cheese',
      'bowl-smashd-potato'
    ];
    const bowlItems = bowlIds.map(id => KFC_MENU_DATA.find(i => i.id === id)).filter(Boolean);
    bowlsContainer.innerHTML = bowlItems.map(createCardHTML).join('');
  }
  if (tendersContainer) {
    const tenderIds = [
      'tenders-3pc-combo',
      'nuggets-8pc',
      'saucy-nuggets-honey-bbq',
      'tenders-4pc-box'
    ];
    const tenderItems = tenderIds.map(id => KFC_MENU_DATA.find(i => i.id === id)).filter(Boolean);
    tendersContainer.innerHTML = tenderItems.map(createCardHTML).join('');
  }
  if (sidesContainer) {
    const sideIds = [
      'side-secret-fries',
      'side-mashed-potatoes-gravy',
      'side-coleslaw',
      'side-mac-cheese',
      'side-biscuit-single',
      'drink-mtn-dew-sweet-lightning'
    ];
    const sideItems = sideIds.map(id => KFC_MENU_DATA.find(i => i.id === id)).filter(Boolean);
    sidesContainer.innerHTML = sideItems.map(createCardHTML).join('');
  }
}

// 7. Price Comparison Table Renderer (USD)
function renderPriceTable(tableId, items) {
  const tableContainer = document.getElementById(tableId);
  if (!tableContainer) return;

  if (!items || items.length === 0) {
    tableContainer.innerHTML = `<p class="no-table-data">No items available for current selection.</p>`;
    return;
  }

  let tableHTML = `
    <div class="table-responsive">
      <table class="price-table">
        <thead>
          <tr>
            <th>Menu Item</th>
            <th>Category</th>
            <th>Serving Size</th>
            <th>Est. Calories</th>
            <th>Price (USD $)</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  `;

  items.forEach(item => {
    tableHTML += `
      <tr>
        <td class="table-item-name">
          <strong>${item.name}</strong>
          ${item.badge ? `<span class="table-badge">${item.badge}</span>` : ''}
        </td>
        <td><span class="table-category-badge">${item.category}</span></td>
        <td class="table-muted">${item.servingSize}</td>
        <td class="table-muted">${item.calories}</td>
        <td class="table-price-pk" style="color:#d62300; font-weight:700;">$${item.price.toFixed(2)}</td>
        <td class="table-price-usd">${item.isDeal ? 'Deal' : (item.isFamilyMeal ? 'Family Meal' : 'A La Carte / Combo')}</td>
        <td>
          <button class="btn-table-action" onclick="openItemModal('${item.id}')">Details</button>
        </td>
      </tr>
    `;
  });

  tableHTML += `
        </tbody>
      </table>
    </div>
  `;

  tableContainer.innerHTML = tableHTML;
}

// 8. Rich Detail Modal Handler
function openItemModal(itemId) {
  const item = KFC_MENU_DATA.find(i => i.id === itemId);
  if (!item) return;

  const modalOverlay = document.getElementById('item-modal');
  const modalContainer = document.getElementById('modal-content-area');
  if (!modalOverlay || !modalContainer) return;

  modalContainer.dataset.currentItemId = item.id;
  const priceHTML = formatPriceHTML(item.price);

  modalContainer.innerHTML = `
    <button class="modal-close-btn" onclick="closeItemModal()" aria-label="Close dialog">&times;</button>
    
    <div class="modal-split-layout">
      <div class="modal-img-wrapper">
        <img src="${item.image}" alt="${item.name} - KFC USA Menu" style="width:100%; height:100%; object-fit:cover;">
        ${item.badge ? `<span class="modal-badge-tag">${item.badge}</span>` : ''}
      </div>
      
      <div class="modal-content">
        <div class="modal-meta-bar">
          <span class="modal-category">${item.category}</span>
          <span class="modal-serving">🍽️ ${item.servingSize}</span>
          <span class="modal-cal">🔥 ${item.calories}</span>
        </div>

        <h2 class="modal-title">${item.name}</h2>
        
        <div class="modal-price-area">
          ${priceHTML}
        </div>

        <p class="modal-desc">${item.description}</p>
        
        <div class="modal-details-grid">
          <div class="modal-box">
            <h4>📦 Meal Includes / Ingredients:</h4>
            <ul class="modal-items-list">
              ${item.itemsIncluded.map(inc => `<li>✓ ${inc}</li>`).join('')}
            </ul>
          </div>
          
          <div class="modal-box">
            <h4>🥗 Nutritional & Allergen Info:</h4>
            <div class="modal-nutri-tags">
              <span class="nutri-pill">Calories: <strong>${item.calories}</strong></span>
              <span class="nutri-pill">Serving: <strong>${item.servingSize}</strong></span>
              <span class="nutri-pill">100% Real Chicken</span>
              <span class="nutri-pill">Contains wheat, milk, soy</span>
            </div>
          </div>
        </div>

        <div class="modal-disclaimer-card">
          <span class="icon">🛡️</span>
          <div>
            <strong>Consumer Notice:</strong> ${CURRENCY_CONFIG.disclaimer} This is an independent consumer price guide not affiliated with KFC or Yum! Brands. Prices and item availability may vary by US location.
          </div>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeItemModal() {
  const modalOverlay = document.getElementById('item-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 9. Interactive Filtering, Search & Sorting Engine
function initMenuPage(initialCategory = 'All') {
  let activeCategory = initialCategory;
  let searchQuery = '';
  let activePriceRange = 'all';
  let activeSortOption = 'popular';

  const searchInput = document.getElementById('menu-search-input');
  const searchClear = document.getElementById('search-clear-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const priceFilterSelect = document.getElementById('price-filter-select');
  const sortSelect = document.getElementById('menu-sort-select');

  function getFilteredItems() {
    return KFC_MENU_DATA.filter(item => {
      // Category match
      const targetCat = activeCategory.toLowerCase();
      const itemCat = item.category.toLowerCase();
      const matchCat = (
        activeCategory === 'All' ||
        itemCat === targetCat ||
        itemCat.includes(targetCat) ||
        targetCat.includes(itemCat) ||
        (targetCat.includes('sandwich') && (itemCat.includes('sandwich') || itemCat.includes('burger'))) ||
        (targetCat.includes('burger') && (itemCat.includes('sandwich') || itemCat.includes('burger'))) ||
        (targetCat.includes('chicken') && (itemCat.includes('chicken') || itemCat.includes('tender') || itemCat.includes('nugget'))) ||
        (targetCat.includes('combo') && (itemCat.includes('combo') || itemCat.includes('bowl') || itemCat.includes('pie'))) ||
        (targetCat.includes('box') && (itemCat.includes('box') || itemCat.includes('fill up'))) ||
        (targetCat.includes('family') && (itemCat.includes('family') || itemCat.includes('bucket') || item.isFamilyMeal)) ||
        (targetCat.includes('bucket') && (itemCat.includes('family') || itemCat.includes('bucket') || item.isFamilyMeal)) ||
        (targetCat.includes('snack') && (itemCat.includes('snack') || itemCat.includes('side'))) ||
        (targetCat.includes('side') && (itemCat.includes('snack') || itemCat.includes('side'))) ||
        (targetCat.includes('beverage') && (itemCat.includes('beverage') || itemCat.includes('drink') || itemCat.includes('dessert'))) ||
        (targetCat.includes('drink') && (itemCat.includes('beverage') || itemCat.includes('drink') || itemCat.includes('dessert'))) ||
        (targetCat.includes('deal') && (itemCat.includes('deal') || item.isDeal))
      );

      // Keyword match
      const q = searchQuery.toLowerCase();
      const matchQuery = !q || (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.itemsIncluded.some(inc => inc.toLowerCase().includes(q))
      );

      // Price filter match (USD)
      let matchPrice = true;
      if (activePriceRange === 'under-5') {
        matchPrice = item.price < 5.00;
      } else if (activePriceRange === '5-10') {
        matchPrice = item.price >= 5.00 && item.price <= 10.00;
      } else if (activePriceRange === '10-20') {
        matchPrice = item.price > 10.00 && item.price <= 20.00;
      } else if (activePriceRange === 'over-20') {
        matchPrice = item.price > 20.00;
      }

      return matchCat && matchQuery && matchPrice;
    }).sort((a, b) => {
      if (activeSortOption === 'price-low') {
        return a.price - b.price;
      } else if (activeSortOption === 'price-high') {
        return b.price - a.price;
      } else if (activeSortOption === 'name-az') {
        return a.name.localeCompare(b.name);
      }
      // Default: popularity / bestsellers first
      const scoreA = (a.isPopular ? 10 : 0) + (a.badge ? 5 : 0);
      const scoreB = (b.isPopular ? 10 : 0) + (b.badge ? 5 : 0);
      return scoreB - scoreA;
    });
  }

  function updateView() {
    const filtered = getFilteredItems();
    renderMenuGrid('menu-grid-container', filtered);
    renderPriceTable('price-table-container', filtered);

    // Update result count if indicator exists
    const resultCountEl = document.getElementById('search-result-count');
    if (resultCountEl) {
      resultCountEl.textContent = `Showing ${filtered.length} item${filtered.length === 1 ? '' : 's'}`;
    }
  }

  // Register global refresh callback
  window.reRenderActiveViews = () => {
    updateView();
    renderSpotlightSections();
  };

  // Search input listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      if (searchClear) {
        searchClear.style.display = searchQuery ? 'block' : 'none';
      }
      updateView();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      updateView();
    });
  }

  // Category filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'All';
      updateView();
    });
  });

  // Price range dropdown
  if (priceFilterSelect) {
    priceFilterSelect.addEventListener('change', (e) => {
      activePriceRange = e.target.value;
      updateView();
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSortOption = e.target.value;
      updateView();
    });
  }

  window.resetFilters = () => {
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    searchQuery = '';
    activeCategory = 'All';
    activePriceRange = 'all';
    activeSortOption = 'popular';
    filterBtns.forEach(b => {
      if (b.dataset.category === 'All') b.classList.add('active');
      else b.classList.remove('active');
    });
    if (priceFilterSelect) priceFilterSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'popular';
    updateView();
  };

  // Initial render
  updateView();
  renderSpotlightSections();
}

// 10. Dynamic City Page Controller (for city.html?city=[slug] or direct execution)
function initCityPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const citySlug = urlParams.get('city') || window.location.hash.replace('#', '') || 'new-york';

  const city = KFC_CITIES_DATA.find(c => c.slug.toLowerCase() === citySlug.toLowerCase()) || KFC_CITIES_DATA[0];

  // Update Page Title and Meta Tags
  document.title = `KFC Menu with Prices in ${city.name} (2026) – USA Price Directory`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `Check KFC ${city.name} menu items, prices in USD ($), Chicken Sandwich prices, fried chicken bucket deals, outlet locations, and local FAQs across ${city.name}.`;
  }

  // Sync Canonical & OpenGraph tags for current city
  const dedicatedCityRoutes = {
    'new-york': '/city-new-york',
    'los-angeles': '/city-los-angeles',
    'chicago': '/city-chicago',
    'houston': '/city-houston',
    'miami': '/city-miami',
    'dallas': '/city-dallas'
  };
  const cityPath = dedicatedCityRoutes[city.slug.toLowerCase()] 
    ? dedicatedCityRoutes[city.slug.toLowerCase()] 
    : `/city?city=${encodeURIComponent(city.slug.toLowerCase())}`;
  const cityCanonicalUrl = `https://kfc-menu-orpin.vercel.app${cityPath}`;

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute('href', cityCanonicalUrl);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', cityCanonicalUrl);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', `KFC Menu & Prices in ${city.name} – KFC USA Menu Guide`);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', `KFC ${city.name} menu prices, deals, and branch directory in USD ($).`);
  }

  // Update City Hero Content
  const cityNameEls = document.querySelectorAll('.city-dynamic-name');
  cityNameEls.forEach(el => el.textContent = city.name);

  const cityH1 = document.getElementById('city-page-h1');
  if (cityH1) cityH1.textContent = `KFC Menu & Prices in ${city.name}`;

  const cityDesc = document.getElementById('city-page-desc');
  if (cityDesc) cityDesc.textContent = city.description;

  const cityOutlets = document.getElementById('city-outlets-stat');
  if (cityOutlets) cityOutlets.textContent = city.outlets;

  const cityHours = document.getElementById('city-hours-stat');
  if (cityHours) cityHours.textContent = city.deliveryHours;

  const cityCombo = document.getElementById('city-combo-stat');
  if (cityCombo) cityCombo.textContent = city.popularCombo;

  const cityLocations = document.getElementById('city-locations-list');
  if (cityLocations) {
    const areas = city.highlights.split(',').map(s => s.trim());
    cityLocations.innerHTML = areas.map(area => `
      <div class="city-location-badge">
        <span class="loc-pin">📍</span>
        <span>${area}</span>
      </div>
    `).join('');
  }

  // Setup Interactive Multi-Category Menu Controls & Search for City Page
  setupCityMenuControls(city);

  // Render City FAQs
  const cityFaqList = document.getElementById('city-faq-list');
  if (cityFaqList && city.faqs) {
    cityFaqList.innerHTML = city.faqs.map(faq => `
      <div class="accordion-item">
        <button class="accordion-header">
          ${faq.q}
          <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-body">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');
    initAccordions();
  }

  // Inject City JSON-LD Schema (FAQPage + Restaurant / WebPage)
  if (city.faqs && city.faqs.length > 0) {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": city.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    });
    document.head.appendChild(schemaScript);
  }
}

// 10b. City Menu Controller (Filters + Search + Real-Time Rendering)
function setupCityMenuControls(city) {
  const cityItemsGrid = document.getElementById('city-items-grid');
  if (!cityItemsGrid) return;

  const filterBtns = document.querySelectorAll('#city-category-filters .filter-btn');
  const searchInput = document.getElementById('city-item-search');
  let activeCategory = 'All';
  let searchQuery = '';

  function getCityFilteredItems() {
    return KFC_MENU_DATA.filter(item => {
      // Category match
      let matchCat = true;
      if (activeCategory !== 'All') {
        if (activeCategory === 'Burgers & Sandwiches' || activeCategory === 'Sandwiches') {
          matchCat = item.category === 'Burgers & Sandwiches';
        } else if (activeCategory === 'Fried Chicken') {
          matchCat = item.category === 'Fried Chicken' || item.category === 'Chicken Tenders' || item.category === 'Nuggets';
        } else if (activeCategory === 'Combos') {
          matchCat = item.category === 'Combos';
        } else if (activeCategory === 'Signature Boxes') {
          matchCat = item.category === 'Signature Boxes';
        } else if (activeCategory === 'Family Deals' || activeCategory === 'Family Buckets') {
          matchCat = item.category === 'Family Deals' || item.isFamilyMeal;
        } else if (activeCategory === 'Snacks & Sides') {
          matchCat = item.category === 'Snacks & Sides';
        } else if (activeCategory === 'Beverages') {
          matchCat = item.category === 'Beverages';
        } else if (activeCategory === 'Desserts') {
          matchCat = item.category === 'Desserts';
        } else if (activeCategory === 'Deals & Offers') {
          matchCat = item.category === 'Deals & Offers' || item.isDeal;
        } else {
          matchCat = item.category.toLowerCase().includes(activeCategory.toLowerCase());
        }
      }

      // Search query match
      let matchSearch = true;
      if (searchQuery) {
        matchSearch = item.name.toLowerCase().includes(searchQuery) ||
                      item.description.toLowerCase().includes(searchQuery) ||
                      item.category.toLowerCase().includes(searchQuery) ||
                      (item.itemsIncluded && item.itemsIncluded.some(inc => inc.toLowerCase().includes(searchQuery)));
      }

      return matchCat && matchSearch;
    });
  }

  function renderCityGrid() {
    const items = getCityFilteredItems();
    if (items.length === 0) {
      cityItemsGrid.innerHTML = `
        <div class="no-results-box" style="grid-column: 1/-1;">
          <div class="no-results-icon">🍗</div>
          <h3>No matching items found</h3>
          <p>Try switching categories or searching for a different dish.</p>
        </div>
      `;
      return;
    }
    cityItemsGrid.innerHTML = items.map(createCardHTML).join('');
  }

  // Bind category button click events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'All';
      renderCityGrid();
    });
  });

  // Bind search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCityGrid();
    });
  }

  // Initial render
  renderCityGrid();

  // Attach rerender
  const currentReRender = window.reRenderActiveViews;
  window.reRenderActiveViews = function() {
    if (typeof currentReRender === 'function') currentReRender();
    renderCityGrid();
  };
}

// 10c. Controller for Dedicated City Pages
function initDedicatedCityMenu(citySlug) {
  const city = KFC_CITIES_DATA.find(c => c.slug.toLowerCase() === citySlug.toLowerCase()) || KFC_CITIES_DATA[0];
  setupCityMenuControls(city);
  initAccordions();
}

// 11. Global FAQ Accordion Toggle
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    if (header.dataset.hasAccordionEvent) return;
    header.dataset.hasAccordionEvent = "true";

    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// 12. Navigation Drawer Controls
function initNavigation() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const drawerClose = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');

  if (mobileToggle && drawer && overlay) {
    mobileToggle.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeNav = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (drawerClose) drawerClose.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);
  }
}

// 13. Back to Top Button Handler
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 14. Currency Switcher Handler
function initCurrencySwitcher() {
  document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      setGlobalCurrency('USD');
    });
  });
  setGlobalCurrency(CURRENCY_CONFIG.activeCurrency);
}

// Global Modal Overlay Close Listener
document.addEventListener('click', (e) => {
  const modalOverlay = document.getElementById('item-modal');
  if (e.target === modalOverlay) {
    closeItemModal();
  }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeItemModal();
  }
});

// DOM Content Loaded Initializer
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAccordions();
  initBackToTop();
  initCurrencySwitcher();
});
