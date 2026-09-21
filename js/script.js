/* ==========================================================================
   KFC Menu Pakistan — Unified JavaScript Engine
   100+ Menu Items, 15 Categories, 20 Cities, Dual PKR/USD Currency,
   Live Search, Filters, Sorting, Details Modal & Dynamic City Pages
   ========================================================================== */

// 0. Technical SEO Dynamic Canonical & Robots Engine
(function initTechnicalSEO() {
  const CANONICAL_DOMAIN = 'https://kfc-menu-orpin.vercel.app';
  const DEDICATED_CITIES = {
    'lahore': '/city-lahore',
    'karachi': '/city-karachi',
    'islamabad': '/city-islamabad',
    'faisalabad': '/city-faisalabad',
    'multan': '/city-multan'
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

// 1. Central Currency Configuration
const CURRENCY_CONFIG = {
  activeCurrency: localStorage.getItem('kfc_active_currency') || 'PKR',
  usdRate: 280, // 1 USD ≈ 280 PKR (Standard reference conversion)
  disclaimer: "USD prices are approximate conversions (1 USD ≈ 280 PKR) for international reference only. Official restaurant ordering in Pakistan is processed in Pakistani Rupees (PKR)."
};

function convertPKRtoUSD(pkr) {
  return (pkr / CURRENCY_CONFIG.usdRate).toFixed(2);
}

function formatPriceHTML(pkr) {
  const usd = convertPKRtoUSD(pkr);
  if (CURRENCY_CONFIG.activeCurrency === 'USD') {
    return `
      <div class="card-price-stack">
        <span class="price-primary">$${usd} <small>USD</small></span>
        <span class="price-secondary">≈ Rs. ${pkr.toLocaleString()} PKR</span>
      </div>
    `;
  }
  return `
    <div class="card-price-stack">
      <span class="price-primary">Rs. ${pkr.toLocaleString()}</span>
      <span class="price-secondary">≈ $${usd} USD</span>
    </div>
  `;
}

function setGlobalCurrency(curr) {
  CURRENCY_CONFIG.activeCurrency = curr;
  localStorage.setItem('kfc_active_currency', curr);

  // Update all toggle buttons in DOM
  document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
    if (btn.dataset.currency === curr) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
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

// 2. Comprehensive 50+ Menu Items in 15 Realistic KFC Categories
const KFC_MENU_DATA = [
  // === 1. BURGERS & SANDWICHES ===
  {
    id: "burger-zinger",
    name: "Zinger Burger",
    category: "Burgers & Sandwiches",
    price: 600,
    badge: "Bestseller",
    calories: "540 kcal",
    servingSize: "1 Burger",
    description: "The crown jewel: 100% whole chicken breast fillet coated in signature spicy crunch, crisp iceberg lettuce, and spicy mayo inside a warm sesame seed bun.",
    itemsIncluded: ["Crispy Zinger Fillet", "Spicy Pepper Mayo", "Fresh Iceberg Lettuce", "Toasted Sesame Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "burger-mighty",
    name: "Mighty Zinger",
    category: "Burgers & Sandwiches",
    price: 770,
    badge: "Most Popular",
    calories: "820 kcal",
    servingSize: "1 Double Burger",
    description: "Built for massive appetites: two crispy Zinger chicken fillets layered with double slices of melted cheddar cheese, shredded lettuce, and spicy signature sauce.",
    itemsIncluded: ["2x Zinger Chicken Fillets", "2x Cheddar Cheese Slices", "Spicy Signature Sauce", "Crisp Lettuce", "Bakery Bun"],
    image: "images/mighty_zinger.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "burger-stacker",
    name: "Zinger Stacker",
    category: "Burgers & Sandwiches",
    price: 660,
    badge: "Spicy Hot",
    calories: "790 kcal",
    servingSize: "1 Burger",
    description: "Two succulent crunchy fillets, fiery jalapenos, sliced cheese, and special tangy stacker sauce served in a soft toasted sesame bun.",
    itemsIncluded: ["2x Crispy Fillets", "Pickled Jalapenos", "Cheese Slice", "Stacker Special Sauce", "Sesame Bun"],
    image: "images/mighty_zinger.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "burger-krunch",
    name: "Krunch Burger",
    category: "Burgers & Sandwiches",
    price: 330,
    badge: "Best Value",
    calories: "410 kcal",
    servingSize: "1 Burger",
    description: "Crunchy golden boneless chicken fillet dressed with creamy mayonnaise and shredded lettuce inside a freshly baked bun.",
    itemsIncluded: ["Golden Krunch Fillet", "Creamy Mayo", "Iceberg Lettuce", "Fresh Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "burger-kentucky",
    name: "Kentucky Burger",
    category: "Burgers & Sandwiches",
    price: 720,
    badge: "Chef Special",
    calories: "670 kcal",
    servingSize: "1 Burger",
    description: "Original recipe breast fillet infused with smoky BBQ glaze, crispy fried onions, melted cheddar cheese, and creamy herb dressing.",
    itemsIncluded: ["Original Recipe Fillet", "Smoky BBQ Glaze", "Crispy Onions", "Cheddar Cheese", "Gourmet Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 2. FRIED CHICKEN ===
  {
    id: "chicken-1pc",
    name: "1 Pc Fried Chicken",
    category: "Fried Chicken",
    price: 320,
    badge: "Signature",
    calories: "280 kcal",
    servingSize: "1 Piece",
    description: "One succulent piece of world-famous fried chicken cooked with the secret 11 herbs and spices recipe. Choose Original Recipe or Hot & Crispy.",
    itemsIncluded: ["1x Chicken Piece (Original Recipe or Hot & Crispy)"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-3pc",
    name: "3 Pcs Fried Chicken",
    category: "Fried Chicken",
    price: 890,
    badge: "Classic",
    calories: "780 kcal",
    servingSize: "3 Pieces",
    description: "Three succulent, juicy pieces of bone-in chicken fried to crispy golden brown perfection. Great for chicken purists.",
    itemsIncluded: ["3x Chicken Pieces (Original or Crispy)"],
    image: "images/fried_chicken.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-5pc",
    name: "5 Pcs Fried Chicken",
    category: "Fried Chicken",
    price: 1450,
    badge: "Sharing",
    calories: "1250 kcal",
    servingSize: "5 Pieces",
    description: "Five tender pieces of freshly prepared fried chicken with irresistible crunch and flavorful aroma.",
    itemsIncluded: ["5x Chicken Pieces (Original or Crispy)"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 3. CHICKEN TENDERS ===
  {
    id: "tenders-3pc",
    name: "3 Pcs Crispy Tenders",
    category: "Chicken Tenders",
    price: 460,
    badge: "100% Breast Meat",
    calories: "340 kcal",
    servingSize: "3 Tenders",
    description: "Marinated 100% tender chicken breast strips seasoned and double-breaded for unmatched crunch, served with tangy honey mustard dip.",
    itemsIncluded: ["3x Boneless Chicken Tenders", "1x Honey Mustard Dip"],
    image: "images/chicken_tenders.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "tenders-6pc",
    name: "6 Pcs Crispy Tenders",
    category: "Chicken Tenders",
    price: 860,
    badge: "Popular Pick",
    calories: "680 kcal",
    servingSize: "6 Tenders",
    description: "Six long, succulent boneless chicken strips fried to deep golden brown. Includes two choice dipping sauces.",
    itemsIncluded: ["6x Boneless Chicken Tenders", "2x Dip Sauces"],
    image: "images/chicken_tenders.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 4. HOT WINGS ===
  {
    id: "wings-6pc",
    name: "Hot Wings (6 Pcs)",
    category: "Hot Wings",
    price: 490,
    badge: "Spicy",
    calories: "420 kcal",
    servingSize: "6 Wings",
    description: "Six fiery chicken wings coated in a zesty, seasoned chili breading and fried to juicy, spicy perfection.",
    itemsIncluded: ["6x Fiery Hot Wings"],
    image: "images/hot_wings.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "wings-10pc",
    name: "Hot Wings (10 Pcs)",
    category: "Hot Wings",
    price: 750,
    badge: "Top Seller",
    calories: "700 kcal",
    servingSize: "10 Wings",
    description: "A ten-piece platter of KFC's beloved Hot Wings. Crispy on the outside, succulent on the inside with authentic chili kick.",
    itemsIncluded: ["10x Fiery Hot Wings"],
    image: "images/hot_wings.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "wings-20pc",
    name: "Hot Wings Party (20 Pcs)",
    category: "Hot Wings",
    price: 1390,
    badge: "Party Pack",
    calories: "1400 kcal",
    servingSize: "20 Wings",
    description: "Twenty crunchy hot wings for wing enthusiasts and game-night snacking with friends.",
    itemsIncluded: ["20x Fiery Hot Wings"],
    image: "images/hot_wings.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: true,
    isDeal: false
  },

  // === 5. NUGGETS ===
  {
    id: "nuggets-6pc",
    name: "Crispy Nuggets (6 Pcs)",
    category: "Nuggets",
    price: 420,
    badge: "Kids Favorite",
    calories: "310 kcal",
    servingSize: "6 Pieces",
    description: "Six tender, bite-sized chicken nuggets fried to golden crunch, served with sweet & sour or BBQ dipping sauce.",
    itemsIncluded: ["6x Golden Nuggets", "1x Dip Sauce"],
    image: "images/chicken_nuggets.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "nuggets-12pc",
    name: "Crispy Nuggets (12 Pcs)",
    category: "Nuggets",
    price: 780,
    badge: "Snack Box",
    calories: "620 kcal",
    servingSize: "12 Pieces",
    description: "Twelve golden, juicy chicken nuggets with your choice of two gourmet dipping sauces.",
    itemsIncluded: ["12x Golden Nuggets", "2x Dip Sauces"],
    image: "images/chicken_nuggets.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 6. WRAPS ===
  {
    id: "wrap-twister",
    name: "Twister Wrap",
    category: "Wraps",
    price: 490,
    badge: "Classic",
    calories: "520 kcal",
    servingSize: "1 Wrap",
    description: "Two crispy chicken strips rolled in a warm, toasted tortilla with diced tomatoes, crisp lettuce, and signature pepper mayo sauce.",
    itemsIncluded: ["2x Crispy Tenders", "Toasted Tortilla", "Diced Tomatoes", "Iceberg Lettuce", "Pepper Mayo"],
    image: "images/chicken_wrap.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "wrap-zingeratha",
    name: "Zingeratha Wrap",
    category: "Wraps",
    price: 540,
    badge: "Desi Twist",
    calories: "590 kcal",
    servingSize: "1 Paratha Wrap",
    description: "Crispy Zinger strips wrapped inside a golden flaky Paratha with desi mint chutney, pickled onions, and garlic sauce.",
    itemsIncluded: ["Zinger Strips", "Flaky Paratha", "Mint Chutney", "Pickled Onions", "Garlic Mayo"],
    image: "images/chicken_wrap.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 7. SIGNATURE BOXES ===
  {
    id: "box-crispy",
    name: "Crispy Box",
    category: "Signature Boxes",
    price: 1020,
    badge: "Complete Meal",
    calories: "980 kcal",
    servingSize: "1 Person Full Box",
    description: "The complete fast food feast: 1x Zinger Burger, 1 Pc Hot & Crispy Chicken, 1x Regular Fries, 1x Dinner Roll, and 1x 345ml Pepsi.",
    itemsIncluded: ["1x Zinger Burger", "1x Chicken Piece", "1x Regular Fries", "1x Warm Dinner Roll", "1x 345ml Soft Drink"],
    image: "images/signature_box.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-boneless",
    name: "Boneless Box",
    category: "Signature Boxes",
    price: 1150,
    badge: "100% Boneless",
    calories: "940 kcal",
    servingSize: "1 Person Full Box",
    description: "Designed for boneless lovers: 1x Zinger Burger, 3 Pcs Crispy Tenders, 1x Regular Fries, 1x Dipping Sauce, and 1x 345ml soft drink.",
    itemsIncluded: ["1x Zinger Burger", "3x Crispy Tenders", "1x Regular Fries", "1x Sauce Dip", "1x 345ml Drink"],
    image: "images/box_boneless.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-wow",
    name: "Wow Box",
    category: "Signature Boxes",
    price: 1290,
    badge: "Mega Meal",
    calories: "1160 kcal",
    servingSize: "1 Heavy Meal",
    description: "1x Zinger Burger, 1 Pc Fried Chicken, 3x Hot Wings, Regular Fries, Dinner Roll, and chilled 345ml beverage.",
    itemsIncluded: ["1x Zinger Burger", "1x Chicken Pc", "3x Hot Wings", "1x Fries", "1x Dinner Roll", "1x 345ml Drink"],
    image: "images/box_wow.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-crispy-duo",
    name: "Crispy Duo Box",
    category: "Signature Boxes",
    price: 1650,
    badge: "Perfect for 2",
    calories: "1640 kcal",
    servingSize: "Serves 2",
    description: "Share the happiness: 2x Zinger Burgers, 2x Chicken Pieces, 2x Regular Fries, and 2x 345ml soft drinks.",
    itemsIncluded: ["2x Zinger Burgers", "2x Chicken Pieces", "2x Regular Fries", "2x 345ml Drinks"],
    image: "images/box_duo.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-xtreme-duo",
    name: "Xtreme Duo Box",
    category: "Signature Boxes",
    price: 1890,
    badge: "Super Feast",
    calories: "1880 kcal",
    servingSize: "Serves 2-3",
    description: "2x Zinger Burgers, 2x Fried Chicken Pieces, 6x Hot Wings, 2x Fries, and 2x Drinks.",
    itemsIncluded: ["2x Zinger Burgers", "2x Chicken Pieces", "6x Hot Wings", "2x Fries", "2x Drinks"],
    image: "images/box_duo.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 8. FAMILY BUCKETS & FAMILY FESTIVAL DEALS ===
  {
    id: "deal-family-festival-1",
    name: "Family Festival 1",
    category: "Family Buckets",
    price: 2690,
    badge: "Top Family Deal",
    calories: "2950 kcal",
    servingSize: "Serves 4-5",
    description: "The ultimate KFC family feast: 4 signature Zinger Burgers, 4 pieces of world-famous Hot & Crispy fried chicken, 2 fluffy dinner rolls, and 1x 1.5L chilled Pepsi.",
    itemsIncluded: ["4x Zinger Burgers", "4x Hot & Crispy Chicken Pieces", "2x Dinner Rolls", "1x 1.5L Pepsi"],
    image: "images/family_festival.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "deal-family-festival-2",
    name: "Family Festival 2",
    category: "Family Buckets",
    price: 2450,
    badge: "Family Feast",
    calories: "2750 kcal",
    servingSize: "Serves 4",
    description: "Crowd favorite combo: 2 Zinger Burgers, 2 Krunch Burgers, 4 pieces of Hot & Crispy fried chicken, 2 dinner rolls, and 1x 1.5L chilled Pepsi bottle.",
    itemsIncluded: ["2x Zinger Burgers", "2x Krunch Burgers", "4x Fried Chicken Pieces", "2x Dinner Rolls", "1x 1.5L Pepsi"],
    image: "images/family_festival.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "deal-family-festival-3",
    name: "Family Festival 3",
    category: "Family Buckets",
    price: 2190,
    badge: "Budget Saver",
    calories: "2400 kcal",
    servingSize: "Serves 3-4",
    description: "Affordable family celebration: 4 crunchy Krunch Burgers, 4 pieces of signature Hot & Crispy fried chicken, and 1x 1.5L chilled Pepsi.",
    itemsIncluded: ["4x Krunch Burgers", "4x Fried Chicken Pieces", "1x 1.5L Pepsi"],
    image: "images/family_festival.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "bucket-family-9",
    name: "Family Bucket (9 Pcs)",
    category: "Family Buckets",
    price: 2290,
    badge: "Family Favorite",
    calories: "2200 kcal",
    servingSize: "Serves 3-4",
    description: "Nine pieces of world-famous Hot & Crispy or Original Recipe fried chicken packed in the iconic bucket with 1x chilled 1.5L Pepsi.",
    itemsIncluded: ["9x Fried Chicken Pieces", "1x 1.5L Pepsi Bottle"],
    image: "images/bucket_pieces.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "bucket-value-15",
    name: "Value Bucket (15 Pcs)",
    category: "Family Buckets",
    price: 3450,
    badge: "Big Gathering",
    calories: "3600 kcal",
    servingSize: "Serves 5-7",
    description: "Fifteen pieces of freshly hand-breaded crispy fried chicken served alongside a large 1.5L Pepsi bottle.",
    itemsIncluded: ["15x Fried Chicken Pieces", "1x 1.5L Pepsi Bottle"],
    image: "images/bucket_pieces.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "deal-family-mega-feast",
    name: "Family Mega Feast",
    category: "Family Buckets",
    price: 3250,
    badge: "Grand Party",
    calories: "3800 kcal",
    servingSize: "Serves 5-6",
    description: "4 delicious Zinger Burgers, 6 pieces of Hot & Crispy fried chicken, 1 large golden French fries, and 1x 1.5L chilled Pepsi.",
    itemsIncluded: ["4x Zinger Burgers", "6x Fried Chicken Pieces", "1x Large Fries", "1x 1.5L Pepsi"],
    image: "images/family_festival.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "deal-xtreme-duo-feast",
    name: "Xtreme Duo Feast",
    category: "Family Buckets",
    price: 1690,
    badge: "Duo Feast",
    calories: "1850 kcal",
    servingSize: "Serves 2-3",
    description: "2 Zinger Burgers, 2 pieces of Hot & Crispy fried chicken, 1 large French fries, and 2 regular chilled drinks.",
    itemsIncluded: ["2x Zinger Burgers", "2x Fried Chicken Pieces", "1x Large Fries", "2x Regular Soft Drinks"],
    image: "images/box_duo.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "bucket-hot-wings-24",
    name: "Wings Bucket (24 Pcs)",
    category: "Family Buckets",
    price: 1690,
    badge: "Wings Bonanza",
    calories: "1800 kcal",
    servingSize: "Serves 3-4",
    description: "Twenty-four fiery Hot Wings packed in a party bucket with 2x dipping sauces and 1.5L soft drink.",
    itemsIncluded: ["24x Hot Wings", "2x Dip Sauces", "1x 1.5L Pepsi"],
    image: "images/hot_wings.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "deal-tenders-gathering-12",
    name: "Tenders Gathering Bucket (12 Pcs)",
    category: "Family Buckets",
    price: 1790,
    badge: "Boneless Feast",
    calories: "1650 kcal",
    servingSize: "Serves 3-4",
    description: "12 crispy hand-breaded chicken tenders served with 1 large French fries, 2 signature dips (Garlic Mayo & Vietnamese sauce), and 1x 1.5L Pepsi.",
    itemsIncluded: ["12x Chicken Tenders", "1x Large Fries", "2x Signature Dips", "1x 1.5L Pepsi"],
    image: "images/chicken_tenders.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "deal-crispy-duo",
    name: "Crispy Duo Deal",
    category: "Family Buckets",
    price: 1390,
    badge: "Value Pair",
    calories: "1500 kcal",
    servingSize: "Serves 2",
    description: "2 Krunch Burgers, 2 pieces of Hot & Crispy chicken, and 2 regular chilled soft drinks.",
    itemsIncluded: ["2x Krunch Burgers", "2x Fried Chicken Pieces", "2x Regular Soft Drinks"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },

  // === 9. COMBOS ===
  {
    id: "combo-zinger",
    name: "Zinger Combo",
    category: "Combos",
    price: 910,
    badge: "Top Seller",
    calories: "820 kcal",
    servingSize: "1 Combo Meal",
    description: "Our signature Zinger Burger paired with hot golden regular french fries and a refreshing 345ml soft drink.",
    itemsIncluded: ["1x Zinger Burger", "1x Regular Fries", "1x 345ml Soft Drink"],
    image: "images/cat_combos.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-mighty",
    name: "Mighty Zinger Combo",
    category: "Combos",
    price: 1050,
    badge: "Heavy Meal",
    calories: "1100 kcal",
    servingSize: "1 Combo Meal",
    description: "Double fillet Mighty Zinger Burger accompanied by crisp salted regular fries and a 345ml Pepsi.",
    itemsIncluded: ["1x Mighty Zinger Burger", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-stacker",
    name: "Zinger Stacker Combo",
    category: "Combos",
    price: 950,
    badge: "Spicy Combo",
    calories: "1070 kcal",
    servingSize: "1 Combo Meal",
    description: "Zinger Stacker burger layered with jalapenos and cheese, served with fries and cold beverage.",
    itemsIncluded: ["1x Zinger Stacker", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-krunch",
    name: "Krunch Combo",
    category: "Combos",
    price: 590,
    badge: "Best Value",
    calories: "690 kcal",
    servingSize: "1 Combo Meal",
    description: "Crispy Krunch Burger, standard salted fries, and an icy cold 345ml beverage at an unbeatable price.",
    itemsIncluded: ["1x Krunch Burger", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-twister",
    name: "Twister Combo",
    category: "Combos",
    price: 780,
    badge: "Wrap Meal",
    calories: "790 kcal",
    servingSize: "1 Combo Meal",
    description: "Toasted Twister Wrap with fresh veggies and pepper mayo, regular fries, and 345ml soft drink.",
    itemsIncluded: ["1x Twister Wrap", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 10. SNACKS & SIDES ===
  {
    id: "snack-hot-shots",
    name: "Hot Shots (9 Pcs)",
    category: "Snacks & Sides",
    price: 490,
    badge: "Spicy Nibbles",
    calories: "350 kcal",
    servingSize: "9 Chunks",
    description: "Nine bite-sized tender chicken breast poppers seasoned with blazing KFC chili spices.",
    itemsIncluded: ["9x Hot Shots Chicken Bites"],
    image: "images/hot_wings.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-dinner-roll",
    name: "Dinner Roll",
    category: "Snacks & Sides",
    price: 60,
    badge: "Side",
    calories: "120 kcal",
    servingSize: "1 Roll",
    description: "Warm, lightly sweet, freshly baked bakery dinner bun.",
    itemsIncluded: ["1x Fresh Dinner Roll"],
    image: "images/signature_box.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-coleslaw",
    name: "Creamy Coleslaw",
    category: "Snacks & Sides",
    price: 180,
    badge: "Fresh Side",
    calories: "160 kcal",
    servingSize: "1 Cup",
    description: "Crisp shredded cabbage, carrots, and sweet creamy signature dressing.",
    itemsIncluded: ["1x Cup Traditional Coleslaw"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-garlic-dip",
    name: "Garlic Mayo Dip",
    category: "Snacks & Sides",
    price: 80,
    badge: "Sauce",
    calories: "90 kcal",
    servingSize: "1 Dip Cup",
    description: "Rich, creamy mayonnaise infused with aromatic garlic cloves.",
    itemsIncluded: ["1x Garlic Mayo Dip Cup"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-vietnamese-sauce",
    name: "Vietnamese Chili Sauce",
    category: "Snacks & Sides",
    price: 80,
    badge: "Hot Sauce",
    calories: "45 kcal",
    servingSize: "1 Dip Cup",
    description: "Sweet, tangy, and spicy chili sauce crafted to complement fried chicken.",
    itemsIncluded: ["1x Vietnamese Dip Cup"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 11. FRIES ===
  {
    id: "fries-regular",
    name: "French Fries (Regular)",
    category: "Fries",
    price: 270,
    badge: "Crispy",
    calories: "290 kcal",
    servingSize: "1 Regular Bag",
    description: "Thin-cut, golden french fries fried to a crunchy exterior and soft potato center, sprinkled with fine salt.",
    itemsIncluded: ["1x Portion Regular Fries"],
    image: "images/crispy_fries.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "fries-large",
    name: "French Fries (Large Bucket)",
    category: "Fries",
    price: 450,
    badge: "Large",
    calories: "520 kcal",
    servingSize: "1 Large Bucket",
    description: "An overflowing sharing bucket of hot, crispy french fries salted to perfection.",
    itemsIncluded: ["1x Bucket Large Fries"],
    image: "images/crispy_fries.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "fries-masala",
    name: "Spicy Masala Fries",
    category: "Fries",
    price: 310,
    badge: "Zesty",
    calories: "300 kcal",
    servingSize: "1 Bag",
    description: "Golden french fries generously dusted with spicy Pakistani chaat masala seasoning.",
    itemsIncluded: ["1x Masala Seasoned Fries"],
    image: "images/crispy_fries.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 12. BISCUITS ===
  {
    id: "biscuit-single",
    name: "Buttermilk Biscuit (1 Pc)",
    category: "Biscuits",
    price: 160,
    badge: "Warm & Flaky",
    calories: "190 kcal",
    servingSize: "1 Biscuit",
    description: "Freshly baked golden biscuit with buttery flaky layers, served hot with butter honey spread.",
    itemsIncluded: ["1x Buttermilk Biscuit", "1x Honey Butter Dip"],
    image: "images/buttermilk_biscuits.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "biscuit-3pc",
    name: "Buttermilk Biscuits (3 Pcs)",
    category: "Biscuits",
    price: 420,
    badge: "Trio Pack",
    calories: "570 kcal",
    servingSize: "3 Biscuits",
    description: "Three warm, golden-crusted southern buttermilk biscuits with rich honey butter spread.",
    itemsIncluded: ["3x Flaky Biscuits", "2x Honey Butter Dips"],
    image: "images/buttermilk_biscuits.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 13. BEVERAGES ===
  {
    id: "bev-pepsi-345",
    name: "Pepsi (345ml)",
    category: "Beverages",
    price: 140,
    badge: "Chilled",
    calories: "140 kcal",
    servingSize: "345 ml",
    description: "Chilled bottle of original refreshing Pepsi Cola.",
    itemsIncluded: ["1x 345ml Chilled Pepsi"],
    image: "images/family_bucket.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bev-7up-345",
    name: "7UP (345ml)",
    category: "Beverages",
    price: 140,
    badge: "Lemon-Lime",
    calories: "135 kcal",
    servingSize: "345 ml",
    description: "Crisp, sparkling lemon and lime soft drink served ice-cold.",
    itemsIncluded: ["1x 345ml 7UP"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bev-mirinda-345",
    name: "Mirinda (345ml)",
    category: "Beverages",
    price: 140,
    badge: "Orange",
    calories: "150 kcal",
    servingSize: "345 ml",
    description: "Fizzy, fruity orange flavored beverage to quench thirst.",
    itemsIncluded: ["1x 345ml Mirinda"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bev-pepsi-15l",
    name: "Pepsi Bottle (1.5 Liter)",
    category: "Beverages",
    price: 280,
    badge: "Family Sharing",
    calories: "600 kcal",
    servingSize: "1.5 Liters",
    description: "Large 1.5L sharing bottle of chilled Pepsi for family meals.",
    itemsIncluded: ["1x 1.5L Pepsi"],
    image: "images/family_bucket.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "bev-water-500",
    name: "Mineral Water (500ml)",
    category: "Beverages",
    price: 90,
    badge: "Pure",
    calories: "0 kcal",
    servingSize: "500 ml",
    description: "Pure bottled mineral drinking water.",
    itemsIncluded: ["1x 500ml Water Bottle"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 14. DESSERTS ===
  {
    id: "dessert-lava-cake",
    name: "Choc Lava Cake",
    category: "Desserts",
    price: 390,
    badge: "Decadent",
    calories: "380 kcal",
    servingSize: "1 Cake",
    description: "Warm, rich chocolate sponge cake with an oozing molten chocolate ganache center.",
    itemsIncluded: ["1x Warm Molten Lava Cake"],
    image: "images/chocolate_dessert.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "dessert-sundae",
    name: "Chocolate Sundae Cup",
    category: "Desserts",
    price: 290,
    badge: "Sweet Treat",
    calories: "270 kcal",
    servingSize: "1 Cup",
    description: "Creamy vanilla soft serve drizzled with thick, warm Belgian chocolate fudge syrup.",
    itemsIncluded: ["1x Vanilla Soft Serve Cup", "Chocolate Fudge Drizzle"],
    image: "images/chocolate_dessert.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 15. DEALS & OFFERS ===

  {
    id: "deal-midnight-1",
    name: "Midnight Deal 1",
    category: "Deals & Offers",
    price: 520,
    badge: "Late Night (12am+)",
    calories: "780 kcal",
    servingSize: "1 Person",
    description: "Late night exclusive: 1x Krunch Burger + 1 Pc Fried Chicken + 1x 345ml Pepsi.",
    itemsIncluded: ["1x Krunch Burger", "1x Fried Chicken Piece", "1x 345ml Pepsi"],
    image: "images/cat_combos.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },
  {
    id: "deal-midnight-2",
    name: "Midnight Deal 2",
    category: "Deals & Offers",
    price: 670,
    badge: "Late Night (12am+)",
    calories: "890 kcal",
    servingSize: "1 Person",
    description: "Late night craving special: 1x Zinger Burger + 1x Regular Fries + 1x 345ml Drink.",
    itemsIncluded: ["1x Zinger Burger", "1x Regular Fries", "1x 345ml Pepsi"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },
  {
    id: "deal-student",
    name: "Student Value Deal",
    category: "Deals & Offers",
    price: 499,
    badge: "Pocket Friendly",
    calories: "680 kcal",
    servingSize: "1 Person",
    description: "Budget favorite: 1x Krunch Burger, small french fries, and chilled 345ml beverage.",
    itemsIncluded: ["1x Krunch Burger", "1x Small Fries", "1x 345ml Drink"],
    image: "images/signature_box.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },

  // === ADDITIONAL BURGERS & SANDWICHES ===
  {
    id: "burger-hot-crispy-single",
    name: "Hot & Crispy Burger",
    category: "Burgers & Sandwiches",
    price: 580,
    badge: "Fiery Hot",
    calories: "560 kcal",
    servingSize: "1 Burger",
    description: "A boldly seasoned Hot & Crispy chicken fillet nestled in a lightly toasted bun with spicy chili sauce and fresh iceberg lettuce. This burger is crafted for those who crave an extra punch of heat in every bite — the coating delivers intense crunch while the fiery marinade seeps right through the meat for deep, lingering flavor.",
    itemsIncluded: ["Hot & Crispy Chicken Fillet", "Spicy Chili Sauce", "Iceberg Lettuce", "Toasted Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "burger-tower",
    name: "Zinger Tower Burger",
    category: "Burgers & Sandwiches",
    price: 710,
    badge: "Towering Flavor",
    calories: "720 kcal",
    servingSize: "1 Burger",
    description: "The Zinger Tower stacks a crispy Zinger fillet, a golden hash brown patty, sliced tomatoes, creamy mayonnaise, and crunchy lettuce between a tall toasted sesame bun. The hash brown layer adds a unique crispy potato element that elevates this burger above the classic Zinger, making it a premium choice for those who want more texture and substance in a single sandwich.",
    itemsIncluded: ["Crispy Zinger Fillet", "Golden Hash Brown Patty", "Tomato Slices", "Creamy Mayo", "Lettuce", "Sesame Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "burger-double-crunch",
    name: "Double Crunch Burger",
    category: "Burgers & Sandwiches",
    price: 690,
    badge: "Extra Crunch",
    calories: "740 kcal",
    servingSize: "1 Burger",
    description: "Two extra-crispy battered chicken breast fillets layered with tangy pickles, a generous smear of signature KFC sauce, and soft shredded lettuce inside a pillowy bakery bun. The double-breading technique creates an audibly satisfying crunch with every bite, delivering twice the texture of a standard chicken sandwich without being overly heavy.",
    itemsIncluded: ["2x Double-Breaded Crispy Fillets", "Tangy Pickles", "KFC Signature Sauce", "Shredded Lettuce", "Soft Bun"],
    image: "images/mighty_zinger.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "burger-bbq-zinger",
    name: "BBQ Zinger Burger",
    category: "Burgers & Sandwiches",
    price: 640,
    badge: "Smoky BBQ",
    calories: "610 kcal",
    servingSize: "1 Burger",
    description: "A full-size crispy Zinger chicken fillet glazed with smoky sweet BBQ sauce, topped with crispy fried onion strings, and layered with fresh tomato slices and lettuce inside a toasted brioche-style bun. The combination of the spicy fried chicken and the sweet-smoky BBQ glaze creates a perfectly balanced flavor profile that appeals to both BBQ lovers and Zinger fans alike.",
    itemsIncluded: ["Crispy Zinger Fillet", "Smoky BBQ Glaze", "Crispy Onion Strings", "Tomato Slices", "Lettuce", "Brioche Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "burger-original-recipe",
    name: "Original Recipe Burger",
    category: "Burgers & Sandwiches",
    price: 570,
    badge: "Classic Original",
    calories: "490 kcal",
    servingSize: "1 Burger",
    description: "A true classic — the Original Recipe Burger features KFC's legendary 11 herbs and spices chicken fillet cooked to golden juicy perfection, paired with creamy coleslaw and a lightly buttered toasted bun. Unlike spicy variants, this burger celebrates the original secret recipe flavors that have made KFC famous worldwide since 1952, delivering an unmistakable savory aroma and tender, moist chicken in every bite.",
    itemsIncluded: ["Original Recipe Chicken Fillet", "Creamy Coleslaw", "Signature Herb Sauce", "Buttered Toasted Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL FRIED CHICKEN ===
  {
    id: "chicken-hot-crispy-1pc",
    name: "Hot & Crispy Chicken (1 Pc)",
    category: "Fried Chicken",
    price: 350,
    badge: "Spicy Crunch",
    calories: "310 kcal",
    servingSize: "1 Piece",
    description: "One premium piece of KFC's Hot & Crispy chicken — marinated for hours in fiery chili spices, hand-breaded in seasoned crumb, and pressure-fried to deliver an explosively crunchy exterior and a supremely juicy interior. Hot & Crispy is specially formulated for customers who prefer bold, spicy heat alongside the iconic KFC 11 herbs and spices coating, making it distinct from the milder Original Recipe.",
    itemsIncluded: ["1x Hot & Crispy Chicken Piece"],
    image: "images/fried_chicken.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-original-3pc",
    name: "Original Recipe Chicken (3 Pcs)",
    category: "Fried Chicken",
    price: 870,
    badge: "Original Recipe",
    calories: "750 kcal",
    servingSize: "3 Pieces",
    description: "Three golden, herb-encrusted pieces of KFC's legendary Original Recipe chicken — pressure-cooked with 11 secret herbs and spices and served piping hot. The Original Recipe has a milder, more savory profile compared to Hot & Crispy, making it a universally loved choice for customers of all ages, especially for family meals and first-time visitors to KFC Pakistan.",
    itemsIncluded: ["3x Original Recipe Chicken Pieces"],
    image: "images/fried_chicken.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-hot-crispy-3pc",
    name: "Hot & Crispy Chicken (3 Pcs)",
    category: "Fried Chicken",
    price: 920,
    badge: "Triple Spicy",
    calories: "820 kcal",
    servingSize: "3 Pieces",
    description: "Three blazing pieces of Hot & Crispy fried chicken, each coated in extra-spiced seasoned breading and fried to a sizzling golden crunch. This three-piece serving is a crowd favorite for spice lovers sharing a quick meal or pairing with fries and a drink. The intense pepper and chili notes linger pleasantly, making every piece an experience from first bite to last.",
    itemsIncluded: ["3x Hot & Crispy Chicken Pieces"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-original-5pc",
    name: "Original Recipe Chicken (5 Pcs)",
    category: "Fried Chicken",
    price: 1420,
    badge: "Sharing Platter",
    calories: "1200 kcal",
    servingSize: "5 Pieces",
    description: "Five generously portioned pieces of KFC's iconic Original Recipe chicken — ideal for sharing between two or three people or as a hearty personal feast. The signature 11 herbs and spices recipe ensures every piece is full of savory depth, with a golden crispy crust giving way to tender, juicy chicken. Perfect for family lunches when paired with fries and 1.5L Pepsi.",
    itemsIncluded: ["5x Original Recipe Chicken Pieces"],
    image: "images/fried_chicken.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chicken-strip-meal",
    name: "Chicken Strip Meal (4 Pcs)",
    category: "Fried Chicken",
    price: 790,
    badge: "Strip Feast",
    calories: "680 kcal",
    servingSize: "4 Strips",
    description: "Four long, golden crispy chicken strips made from premium breast fillets — seasoned, hand-breaded, and fried to perfection. Each strip offers a satisfying pull-apart texture with a moist, flavorful interior. The Strip Meal is a fantastic alternative to bone-in chicken for customers who prefer easy-to-eat, convenient portions with maximum chicken flavor and minimum mess.",
    itemsIncluded: ["4x Crispy Chicken Strips", "1x Dipping Sauce"],
    image: "images/chicken_tenders.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL TENDERS ===
  {
    id: "tenders-9pc",
    name: "9 Pcs Crispy Tenders",
    category: "Chicken Tenders",
    price: 1250,
    badge: "Sharing Pack",
    calories: "1020 kcal",
    servingSize: "9 Tenders",
    description: "Nine long, juicy 100% white breast meat tenders coated in KFC's signature seasoned breading and fried to a perfectly satisfying golden crunch. This generous shareable serving comes with three dipping sauce cups — choose from Garlic Mayo, Vietnamese Chili Sauce, or Honey Mustard. A favorite for office lunches, college hangouts, and anyone who prefers boneless chicken in a large format.",
    itemsIncluded: ["9x Boneless Crispy Tenders", "3x Choice Dipping Sauces"],
    image: "images/chicken_tenders.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "tenders-tender-dip-combo",
    name: "Tenders & Dip Combo (3 Pcs)",
    category: "Chicken Tenders",
    price: 650,
    badge: "Dip Lovers",
    calories: "450 kcal",
    servingSize: "3 Tenders + 2 Dips",
    description: "Three crispy chicken breast tenders served alongside two premium dipping sauces of your choice. This combo is specifically designed for diners who love to dip — whether in creamy garlic mayo, tangy sweet chili, smoky BBQ, or zesty Vietnamese sauce. The tenders are double-dipped in seasoned batter for maximum crunch and served hot for the best dipping experience.",
    itemsIncluded: ["3x Crispy Tenders", "2x Premium Dip Sauces"],
    image: "images/chicken_tenders.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "tenders-zingy-tenders-6",
    name: "Zingy Tenders (6 Pcs)",
    category: "Chicken Tenders",
    price: 920,
    badge: "Zingy Flavor",
    calories: "710 kcal",
    servingSize: "6 Tenders",
    description: "Six chicken tenders marinated in KFC's signature Zingy seasoning — a blend of sharp citrus zest, black pepper, and paprika that delivers a bright, tangy heat distinct from the standard Hot & Crispy style. These tenders are double-breaded for a thick, extra-crunchy coating, making them ideal for snacking or pairing with masala fries and a cold beverage.",
    itemsIncluded: ["6x Zingy Marinated Tenders", "2x Dip Sauces"],
    image: "images/chicken_tenders.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL HOT WINGS ===
  {
    id: "wings-24pc-bucket",
    name: "Hot Wings Bucket (24 Pcs)",
    category: "Hot Wings",
    price: 1890,
    badge: "Party Bucket",
    calories: "1680 kcal",
    servingSize: "24 Wings",
    description: "Twenty-four of KFC Pakistan's signature fiery Hot Wings arranged in a sharing bucket — the ultimate wing feast for large gatherings, cricket match nights, or office parties. Every wing is coated in a blazing chili-seasoned breading and pressure-fried for consistent juiciness inside and crunch outside. Served with two large garlic mayo and chili sauce dips.",
    itemsIncluded: ["24x Fiery Hot Wings", "2x Large Dip Sauces"],
    image: "images/hot_wings.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "wings-4pc",
    name: "Hot Wings (4 Pcs)",
    category: "Hot Wings",
    price: 340,
    badge: "Snack Size",
    calories: "280 kcal",
    servingSize: "4 Wings",
    description: "Four crispy, spicy chicken wings — the perfect snack-size order to accompany a burger meal or enjoy as a standalone bite. Each wing is generously coated in KFC's signature hot chili breading, delivering a satisfying crunch and consistent heat that builds pleasantly with each piece. Ideal as an add-on order or for light snacking.",
    itemsIncluded: ["4x Fiery Hot Wings"],
    image: "images/hot_wings.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL NUGGETS ===
  {
    id: "nuggets-9pc",
    name: "Crispy Nuggets (9 Pcs)",
    category: "Nuggets",
    price: 620,
    badge: "Family Snack",
    calories: "465 kcal",
    servingSize: "9 Pieces",
    description: "Nine golden, perfectly round chicken nuggets fried to a crispy, satisfying crunch — a universally loved item for both children and adults. Each nugget is made from prime chicken breast meat, seasoned with a mild savory blend, and coated in a light tempura-style breading. Served with two dipping sauces — choose from sweet & sour, BBQ, garlic mayo, or Vietnamese chili.",
    itemsIncluded: ["9x Golden Chicken Nuggets", "2x Dip Sauces"],
    image: "images/chicken_nuggets.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "nuggets-20pc",
    name: "Crispy Nuggets (20 Pcs)",
    category: "Nuggets",
    price: 1290,
    badge: "Sharing Platter",
    calories: "1030 kcal",
    servingSize: "20 Pieces",
    description: "Twenty bite-sized golden chicken nuggets served in a large sharing box — perfect for family movie nights, birthday parties, or group snacking sessions. This jumbo nugget platter comes with three dip sauce cups, offering maximum variety for sauce lovers. At this serving size, the 20-piece nugget box provides excellent value per piece compared to smaller orders.",
    itemsIncluded: ["20x Golden Chicken Nuggets", "3x Dip Sauces"],
    image: "images/chicken_nuggets.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },

  // === ADDITIONAL WRAPS ===
  {
    id: "wrap-zingeratha-combo",
    name: "Zingeratha Wrap Combo",
    category: "Wraps",
    price: 820,
    badge: "Desi Combo",
    calories: "890 kcal",
    servingSize: "1 Wrap + Sides",
    description: "KFC's most iconic Pakistani innovation — the Zingeratha Wrap — served as a complete combo with regular crispy fries and a cold 345ml beverage. The Zingeratha wraps a full crispy Zinger fillet inside a hot, flaky layered paratha with tangy mint chutney, pickled onions, and creamy garlic sauce, creating a fusion of Western fast food and beloved desi flavors in a single, satisfying hand-held meal.",
    itemsIncluded: ["1x Zingeratha Wrap", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/chicken_wrap.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "wrap-twister-combo",
    name: "Twister Wrap Combo",
    category: "Wraps",
    price: 780,
    badge: "Wrap Meal",
    calories: "820 kcal",
    servingSize: "1 Wrap + Sides",
    description: "The classic Twister Wrap served as a full combo experience — the warm tortilla encases two crispy chicken strips, fresh diced tomatoes, crisp iceberg lettuce, and KFC's signature pepper mayo, all paired with a serving of hot golden regular fries and a refreshing 345ml cold drink. The Twister Combo offers a lighter, more portable alternative to traditional burger combos while remaining fully satisfying.",
    itemsIncluded: ["1x Twister Wrap", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/chicken_wrap.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "wrap-grilled-twister",
    name: "Grilled Twister Wrap",
    category: "Wraps",
    price: 520,
    badge: "Lighter Choice",
    calories: "440 kcal",
    servingSize: "1 Wrap",
    description: "A lighter, health-conscious alternative to the classic Twister — featuring grilled (not fried) chicken strips wrapped in a warm whole-wheat tortilla with cucumber slices, fresh tomatoes, crisp shredded lettuce, and a low-fat yogurt herb dressing. The Grilled Twister delivers all the satisfying flavors of a KFC wrap with significantly fewer calories, making it an excellent choice for health-minded customers who don't want to compromise on taste.",
    itemsIncluded: ["Grilled Chicken Strips", "Whole Wheat Tortilla", "Cucumber Slices", "Tomato", "Lettuce", "Yogurt Herb Dressing"],
    image: "images/chicken_wrap.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL SIGNATURE BOXES ===
  {
    id: "box-mighty-zinger-box",
    name: "Mighty Zinger Box",
    category: "Signature Boxes",
    price: 1390,
    badge: "Premium Box",
    calories: "1250 kcal",
    servingSize: "1 Person Heavy Box",
    description: "The premium single-person meal box built around KFC's most indulgent burger — the double-fillet Mighty Zinger — paired with one piece of Hot & Crispy fried chicken, a full serving of golden regular fries, a warm freshly baked dinner roll, and a chilled 345ml soft drink. This box is specifically designed for hearty eaters who want both a premium burger experience and the satisfaction of additional fried chicken pieces in a complete, single-box meal.",
    itemsIncluded: ["1x Mighty Zinger Burger", "1x Hot & Crispy Chicken Piece", "1x Regular Fries", "1x Dinner Roll", "1x 345ml Drink"],
    image: "images/box_boneless.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-stacker-box",
    name: "Zinger Stacker Box",
    category: "Signature Boxes",
    price: 1290,
    badge: "Stacked Meal",
    calories: "1180 kcal",
    servingSize: "1 Person Full Box",
    description: "The complete Zinger Stacker experience in a convenient box format — featuring the double-fillet Stacker Burger loaded with pickled jalapenos and melted cheddar cheese, one piece of signature fried chicken, hot salted regular fries, a freshly baked warm dinner roll, and a 345ml cold beverage. This box delivers the maximum KFC value for Stacker fans who want a complete and fully satisfying one-box meal.",
    itemsIncluded: ["1x Zinger Stacker Burger", "1x Fried Chicken Piece", "1x Regular Fries", "1x Dinner Roll", "1x 345ml Drink"],
    image: "images/signature_box.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-tenders-box",
    name: "Tenders Box Meal",
    category: "Signature Boxes",
    price: 1150,
    badge: "All Boneless",
    calories: "980 kcal",
    servingSize: "1 Person Full Box",
    description: "A 100% boneless signature box for tender lovers — featuring a crispy Zinger Burger, five premium crispy chicken tenders, a serving of hot regular fries, and a refreshing 345ml cold drink. This box eliminates all bones from the meal and is perfect for customers who prefer completely boneless chicken with the same full-box value as the classic Crispy Box. Includes a Vietnamese chili dipping sauce for the tenders.",
    itemsIncluded: ["1x Zinger Burger", "5x Crispy Tenders", "1x Regular Fries", "1x Vietnamese Dip", "1x 345ml Drink"],
    image: "images/box_boneless.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-wings-box",
    name: "Wings Box Meal",
    category: "Signature Boxes",
    price: 1080,
    badge: "Wing Lover",
    calories: "1020 kcal",
    servingSize: "1 Person Full Box",
    description: "Six fiery Hot Wings paired with a classic Zinger Burger, a regular serving of hot salted fries, and a 345ml chilled drink — all packed in a convenient single-person box. The Wings Box Meal is ideal for customers who want to experience both KFC's famous Hot Wings and the flagship Zinger Burger in a single, well-priced meal package. A garlic mayo dip is included for the wings.",
    itemsIncluded: ["6x Fiery Hot Wings", "1x Zinger Burger", "1x Regular Fries", "1x Garlic Mayo Dip", "1x 345ml Drink"],
    image: "images/box_wow.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "box-krunch-box",
    name: "Krunch Box Meal",
    category: "Signature Boxes",
    price: 850,
    badge: "Budget Box",
    calories: "870 kcal",
    servingSize: "1 Person Full Box",
    description: "An affordable complete meal box centered around the popular Krunch Burger — paired with one piece of Hot & Crispy fried chicken, regular golden fries, a freshly baked dinner roll, and a 345ml chilled soft drink. The Krunch Box offers the same full box-meal experience as premium options but at a more accessible price point, making it the go-to choice for value-conscious diners and students.",
    itemsIncluded: ["1x Krunch Burger", "1x Hot & Crispy Chicken Piece", "1x Regular Fries", "1x Dinner Roll", "1x 345ml Drink"],
    image: "images/signature_box.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL COMBOS ===
  {
    id: "combo-kentucky",
    name: "Kentucky Burger Combo",
    category: "Combos",
    price: 1010,
    badge: "Gourmet Combo",
    calories: "960 kcal",
    servingSize: "1 Combo Meal",
    description: "The premium Kentucky Burger — featuring Original Recipe fillet with smoky BBQ glaze, crispy fried onions, and melted cheddar cheese — served alongside a generous regular portion of hot salted French fries and a refreshing 345ml chilled soft drink. The Kentucky Burger Combo is KFC Pakistan's most sophisticated burger combo, ideal for customers who appreciate richer, more complex burger flavor profiles.",
    itemsIncluded: ["1x Kentucky Burger", "1x Regular Fries", "1x 345ml Soft Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-hot-crispy",
    name: "Hot & Crispy Combo",
    category: "Combos",
    price: 870,
    badge: "Spicy Meal",
    calories: "900 kcal",
    servingSize: "1 Combo Meal",
    description: "Two pieces of KFC's signature Hot & Crispy fried chicken served as a complete combo with a full portion of hot golden French fries and a cold 345ml beverage of your choice. This combo is the preferred ordering choice for traditional bone-in chicken fans who want a satisfying, old-school KFC meal experience without a burger — pure, original-style fried chicken at its finest.",
    itemsIncluded: ["2x Hot & Crispy Chicken Pieces", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-wings-fries",
    name: "Wings & Fries Combo",
    category: "Combos",
    price: 750,
    badge: "Wing Snack",
    calories: "840 kcal",
    servingSize: "1 Combo Meal",
    description: "Six fiery, crispy Hot Wings paired with a full serving of hot salted French fries and a cold 345ml drink — a simple but deeply satisfying combo for wing enthusiasts. The Wings & Fries Combo is a classic pairing that lets the bold, spicy flavors of KFC's Hot Wings shine alongside golden potato fries, making it an ideal quick lunch or late-afternoon snack combo.",
    itemsIncluded: ["6x Hot Wings", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-nuggets-fries",
    name: "Nuggets & Fries Combo",
    category: "Combos",
    price: 670,
    badge: "Snack Combo",
    calories: "740 kcal",
    servingSize: "1 Combo Meal",
    description: "Nine crispy golden chicken nuggets paired with a portion of hot salted French fries and a cold 345ml drink. The Nuggets & Fries Combo is a crowd favorite for light eaters, children, and anyone who prefers bite-sized boneless chicken without the commitment of a full burger meal. Two dipping sauces are included — choose from sweet & sour, garlic mayo, or Vietnamese chili sauce.",
    itemsIncluded: ["9x Crispy Nuggets", "1x Regular Fries", "2x Dip Sauces", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "combo-tenders-fries",
    name: "Tenders & Fries Combo",
    category: "Combos",
    price: 820,
    badge: "Boneless Combo",
    calories: "880 kcal",
    servingSize: "1 Combo Meal",
    description: "Six crispy 100% breast meat chicken tenders paired with a generous serving of hot golden French fries, two dipping sauces, and a chilled 345ml cold drink. The Tenders & Fries Combo is the go-to order for boneless chicken fans who want maximum crunch and tender meat without any bone, making it a consistently popular choice for both dine-in and delivery orders.",
    itemsIncluded: ["6x Crispy Tenders", "1x Regular Fries", "2x Dipping Sauces", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL FAMILY BUCKETS & DEALS ===
  {
    id: "deal-family-festival-supreme",
    name: "Family Festival Supreme",
    category: "Family Buckets",
    price: 3490,
    badge: "Ultimate Feast",
    calories: "4200 kcal",
    servingSize: "Serves 5-6",
    description: "KFC Pakistan's grandest family gathering deal — 6 signature Zinger Burgers, 6 pieces of Hot & Crispy fried chicken, 3 portions of golden French fries, 2 freshly baked dinner rolls, and 2x 1.5L chilled Pepsi bottles. The Family Festival Supreme is designed for large family dinners, Eid gatherings, or weekend celebrations where every person around the table deserves a full individual serving of KFC's best items.",
    itemsIncluded: ["6x Zinger Burgers", "6x Hot & Crispy Chicken Pieces", "3x Regular Fries", "2x Dinner Rolls", "2x 1.5L Pepsi"],
    image: "images/family_festival.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "bucket-hot-wings-12",
    name: "Hot Wings Bucket (12 Pcs)",
    category: "Family Buckets",
    price: 990,
    badge: "Wings Party",
    calories: "840 kcal",
    servingSize: "Serves 2-3",
    description: "Twelve of KFC's signature fiery Hot Wings in a sharing-size bucket — perfect for two to three people snacking together or as a group add-on to a family meal. Each wing delivers the same intense chili-seasoned crunch that has made KFC Hot Wings a staple across Pakistan. The 12-piece bucket comes with two garlic mayo dipping sauces for the ultimate wing-dipping experience.",
    itemsIncluded: ["12x Fiery Hot Wings", "2x Garlic Mayo Dip Sauces"],
    image: "images/hot_wings.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "deal-trio-box",
    name: "Trio Box Deal",
    category: "Family Buckets",
    price: 2190,
    badge: "Perfect for 3",
    calories: "2850 kcal",
    servingSize: "Serves 3",
    description: "Three complete individual box meals at a special group price — each person gets a Zinger Burger, one piece of Hot & Crispy fried chicken, regular fries, a dinner roll, and a 345ml cold drink. The Trio Box Deal eliminates the need to order separately and is perfect for small group outings, office lunches, or family dinners for three, offering each person a complete, satisfying KFC meal in their own personal box.",
    itemsIncluded: ["3x Zinger Burgers", "3x Fried Chicken Pieces", "3x Regular Fries", "3x Dinner Rolls", "3x 345ml Drinks"],
    image: "images/family_festival.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "deal-couple-deal",
    name: "Couple Deal",
    category: "Family Buckets",
    price: 1590,
    badge: "For Two",
    calories: "1920 kcal",
    servingSize: "Serves 2",
    description: "A romantic or friendly date meal designed perfectly for two — 2 Zinger Burgers, 2 pieces of signature fried chicken, 1 large sharing fries bucket, 2 regular 345ml cold drinks, and 1 warm dinner roll to share. The Couple Deal is the most popular sharing meal among young couples and college-going friends at KFC Pakistan, offering generous portions at an attractive combined price.",
    itemsIncluded: ["2x Zinger Burgers", "2x Fried Chicken Pieces", "1x Large Fries", "2x 345ml Drinks", "1x Dinner Roll"],
    image: "images/box_duo.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },

  // === ADDITIONAL SNACKS & SIDES ===
  {
    id: "snack-spicy-masala-fries",
    name: "Spicy Masala Fries (Large)",
    category: "Snacks & Sides",
    price: 390,
    badge: "Desi Spice",
    calories: "420 kcal",
    servingSize: "1 Large Bag",
    description: "A large bucket of KFC's golden French fries generously dusted with an authentic Pakistani chaat masala blend — a tangy, spicy, and aromatic seasoning that transforms classic fries into a bold desi-style snack. The large Spicy Masala Fries are a uniquely Pakistani KFC innovation, catering to the local preference for bold, complex spice flavors in even simple side dishes. Best enjoyed alongside a cold Pepsi or Mirinda.",
    itemsIncluded: ["1x Large Bucket Masala-Seasoned Fries"],
    image: "images/crispy_fries.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-corn-cup",
    name: "Corn on the Cob",
    category: "Snacks & Sides",
    price: 140,
    badge: "Sweet Side",
    calories: "130 kcal",
    servingSize: "1 Cob",
    description: "A classic American-style side dish served at KFC — a whole sweet corn cob steamed to tender perfection and lightly seasoned with butter and a pinch of salt. The Corn on the Cob provides a natural, wholesome sweetness that balances the bold spice of KFC's fried chicken items. It is a simple, universally loved side dish that brings a healthy and satisfying element to any KFC meal.",
    itemsIncluded: ["1x Buttered Corn Cob"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-mashed-potato",
    name: "Mashed Potato & Gravy",
    category: "Snacks & Sides",
    price: 200,
    badge: "Comfort Side",
    calories: "220 kcal",
    servingSize: "1 Cup",
    description: "Creamy, smooth mashed potato topped with KFC's signature rich, savory chicken gravy — the ultimate comfort food side dish. The mashed potato is prepared fresh with real butter and milk for a velvety texture, while the warm gravy adds depth of savory chicken flavor that pairs perfectly with fried chicken pieces. A beloved classic side dish at KFC worldwide, now available at KFC Pakistan branches.",
    itemsIncluded: ["1x Cup Creamy Mashed Potato", "KFC Chicken Gravy Topping"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-bbq-dip",
    name: "Smoky BBQ Dip",
    category: "Snacks & Sides",
    price: 80,
    badge: "BBQ Sauce",
    calories: "60 kcal",
    servingSize: "1 Dip Cup",
    description: "A rich, smoky BBQ dipping sauce with a deep caramelized sweetness and subtle tanginess — perfect for dipping nuggets, tenders, or hot wings. Made with a blend of tomato, molasses, brown sugar, and smoky hickory flavoring, this sauce adds a bold, American BBQ character to any KFC item. Order extra to enhance your meal with a premium dipping option.",
    itemsIncluded: ["1x Smoky BBQ Dip Cup"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-honey-mustard-dip",
    name: "Honey Mustard Dip",
    category: "Snacks & Sides",
    price: 80,
    badge: "Sweet Tangy",
    calories: "75 kcal",
    servingSize: "1 Dip Cup",
    description: "A perfectly balanced dipping sauce combining the natural sweetness of golden honey with the sharp, tangy bite of Dijon mustard. KFC's Honey Mustard Dip is the most popular sauce for crispy chicken tenders and nuggets, offering a sweet-and-savory flavor that complements the seasoned chicken coating without overpowering it. A classic accompaniment for both boneless chicken items and dinner rolls.",
    itemsIncluded: ["1x Honey Mustard Dip Cup"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-sweet-chili-dip",
    name: "Sweet Chili Dip",
    category: "Snacks & Sides",
    price: 80,
    badge: "Sweet Heat",
    calories: "55 kcal",
    servingSize: "1 Dip Cup",
    description: "A vibrant red sweet chili sauce that combines mild fruity heat with a pleasant sweetness — a favorite dipping accompaniment for KFC nuggets and crispy tenders. Inspired by South-East Asian sweet chili sauces, this dip offers a gentler heat profile compared to Vietnamese chili sauce, making it an excellent choice for customers who want a flavored dip that isn't too spicy.",
    itemsIncluded: ["1x Sweet Chili Dip Cup"],
    image: "images/cat_snacks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "snack-biscuit-gravy",
    name: "Biscuit & Gravy",
    category: "Snacks & Sides",
    price: 230,
    badge: "Southern Classic",
    calories: "340 kcal",
    servingSize: "1 Biscuit + Gravy",
    description: "A warm, freshly baked buttermilk biscuit served with a generous cup of KFC's savory chicken gravy for dipping or pouring. This American Southern-style combination is a comforting, hearty side that pairs beautifully with fried chicken meals. The flaky, buttery biscuit absorbs the rich gravy perfectly, creating a fulfilling accompaniment that is both simple and deeply satisfying.",
    itemsIncluded: ["1x Warm Buttermilk Biscuit", "1x Cup KFC Chicken Gravy"],
    image: "images/buttermilk_biscuits.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL BEVERAGES ===
  {
    id: "bev-mountain-dew",
    name: "Mountain Dew (345ml)",
    category: "Beverages",
    price: 140,
    badge: "Citrus Blast",
    calories: "155 kcal",
    servingSize: "345 ml",
    description: "The electrifying citrus-flavored Mountain Dew served ice-cold — a beloved choice among Pakistan's youth and the preferred beverage pairing for spicy KFC items. The bold citrus flavor and high carbonation of Mountain Dew provide a refreshing contrast to the heat of Zinger burgers and Hot Wings, making it a natural complement to KFC's spiciest offerings on the menu.",
    itemsIncluded: ["1x 345ml Chilled Mountain Dew"],
    image: "images/family_bucket.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bev-7up-15l",
    name: "7UP Bottle (1.5 Liter)",
    category: "Beverages",
    price: 280,
    badge: "Family Sharing",
    calories: "580 kcal",
    servingSize: "1.5 Liters",
    description: "A large 1.5L bottle of crisp, refreshing 7UP lemon-lime soda — ideal for sharing across a family meal or group gathering at KFC. The light, citrus-clean flavor of 7UP makes it a versatile pairing option that cuts through the richness of fried chicken and works equally well with burgers, wings, and box meals. Best served chilled over ice.",
    itemsIncluded: ["1x 1.5L 7UP Bottle"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "bev-mirinda-15l",
    name: "Mirinda Bottle (1.5 Liter)",
    category: "Beverages",
    price: 280,
    badge: "Orange Burst",
    calories: "620 kcal",
    servingSize: "1.5 Liters",
    description: "A large 1.5L family-size bottle of Mirinda orange-flavored soda — vibrant, fruity, and fizzy, served chilled to complement KFC's family bucket meals and festival deals. Mirinda's sweet, bright orange flavor is a favorite among younger family members and provides a colorful, fun alternative to cola drinks for family gatherings and group KFC orders.",
    itemsIncluded: ["1x 1.5L Mirinda Orange Bottle"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "bev-mountain-dew-15l",
    name: "Mountain Dew (1.5 Liter)",
    category: "Beverages",
    price: 280,
    badge: "Citrus Sharing",
    calories: "640 kcal",
    servingSize: "1.5 Liters",
    description: "A large 1.5L sharing bottle of Mountain Dew — the citrus-charged choice for groups who prefer bold, energetic flavors with their KFC family meals. Perfect for pairing with family buckets, Family Festival deals, or as an alternative to Pepsi at large gatherings. The intense citrus carbonation of Mountain Dew refreshes the palate between bites of spicy fried chicken.",
    itemsIncluded: ["1x 1.5L Mountain Dew Bottle"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: false
  },
  {
    id: "bev-fanta-345",
    name: "Fanta Orange (345ml)",
    category: "Beverages",
    price: 140,
    badge: "Fruity Fizz",
    calories: "145 kcal",
    servingSize: "345 ml",
    description: "A chilled, fizzy Fanta Orange — a bright, fruity carbonated drink that offers a sweet, orange-flavored refreshment alongside any KFC meal. Fanta's vibrant citrus taste pairs particularly well with KFC's milder menu items like the Krunch Burger and chicken tenders, providing a pleasant sweetness that balances savory flavors without overwhelming the palate.",
    itemsIncluded: ["1x 345ml Chilled Fanta Orange"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bev-sting-250",
    name: "Sting Energy Drink (250ml)",
    category: "Beverages",
    price: 120,
    badge: "Energy Boost",
    calories: "110 kcal",
    servingSize: "250 ml",
    description: "A chilled 250ml can of Sting, Pakistan's most popular energy drink — a bold, sweet-sour energy beverage with a distinctive raspberry or gold flavor profile, available at select KFC Pakistan branches. Sting is a preferred late-night beverage choice for young customers ordering Midnight Deals or late-evening KFC deliveries, providing an energy boost alongside the meal.",
    itemsIncluded: ["1x 250ml Sting Energy Drink Can"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL DESSERTS ===
  {
    id: "dessert-strawberry-sundae",
    name: "Strawberry Sundae Cup",
    category: "Desserts",
    price: 290,
    badge: "Fruity Sweet",
    calories: "260 kcal",
    servingSize: "1 Cup",
    description: "Smooth, creamy vanilla soft serve ice cream generously topped with vibrant, sweet strawberry fruit sauce — a classic dessert that brings a cool, fruity finish to any KFC meal. The natural strawberry topping provides a light, refreshing sweetness that contrasts beautifully with the rich savory flavors of fried chicken and burgers, making it an ideal palate-cleanser and dessert choice.",
    itemsIncluded: ["1x Vanilla Soft Serve Cup", "Strawberry Fruit Sauce Topping"],
    image: "images/chocolate_dessert.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "dessert-soft-serve-cone",
    name: "Soft Serve Ice Cream Cone",
    category: "Desserts",
    price: 150,
    badge: "Classic Cone",
    calories: "150 kcal",
    servingSize: "1 Cone",
    description: "A freshly swirled vanilla soft serve ice cream served in a classic crispy wafer cone — light, cool, and refreshing. The Soft Serve Cone is KFC's most affordable dessert option, offering a simple, universally loved treat that provides a pleasant sweet ending to any meal. Perfect for children and adults who want something light and sweet without the richness of a full dessert cup.",
    itemsIncluded: ["1x Swirled Vanilla Soft Serve Cone"],
    image: "images/chocolate_dessert.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "dessert-oreo-sundae",
    name: "Oreo Crunch Sundae",
    category: "Desserts",
    price: 330,
    badge: "Cookie Crunch",
    calories: "320 kcal",
    servingSize: "1 Cup",
    description: "Creamy vanilla soft serve ice cream layered with crushed Oreo cookie crumbs and drizzled with a dark chocolate fudge sauce — an indulgent, dessert-lover's treat. The combination of crunchy Oreo crumbs, smooth ice cream, and warm chocolate fudge creates a multi-textured dessert experience that is both satisfying and visually impressive. A premium dessert option for those who want something beyond a standard sundae.",
    itemsIncluded: ["1x Vanilla Soft Serve Cup", "Crushed Oreo Cookie Topping", "Chocolate Fudge Drizzle"],
    image: "images/chocolate_dessert.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "dessert-brownie-cake",
    name: "Chocolate Fudge Brownie",
    category: "Desserts",
    price: 320,
    badge: "Fudge Rich",
    calories: "350 kcal",
    servingSize: "1 Brownie",
    description: "A dense, fudgy chocolate brownie served warm — packed with real chocolate chips and finished with a drizzle of premium dark chocolate ganache. The Chocolate Fudge Brownie delivers an intensely rich chocolate flavor with a moist, gooey texture that makes it one of KFC's most decadent dessert options. Best enjoyed as a shareable dessert or as a standalone sweet treat after a full KFC meal.",
    itemsIncluded: ["1x Warm Chocolate Fudge Brownie", "Dark Chocolate Ganache Drizzle"],
    image: "images/chocolate_dessert.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === ADDITIONAL DEALS & OFFERS ===
  {
    id: "deal-midnight-3",
    name: "Midnight Deal 3",
    category: "Deals & Offers",
    price: 790,
    badge: "Late Night (12am+)",
    calories: "1050 kcal",
    servingSize: "1 Person",
    description: "The most generous of KFC Pakistan's late-night Midnight Deals — featuring a full Zinger Burger, one piece of Hot & Crispy fried chicken, a regular serving of golden fries, and a chilled 345ml beverage, all available exclusively after midnight for night-owl customers and late-shift workers. Available at drive-thru and delivery-enabled branches throughout major Pakistan cities.",
    itemsIncluded: ["1x Zinger Burger", "1x Hot & Crispy Chicken Piece", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },
  {
    id: "deal-ramadan-iftar",
    name: "Ramadan Iftar Deal",
    category: "Deals & Offers",
    price: 1290,
    badge: "Ramadan Special",
    calories: "1650 kcal",
    servingSize: "Serves 1-2",
    description: "A specially curated Iftar meal offered exclusively during the holy month of Ramadan at KFC Pakistan — featuring 2 Zinger Burgers, 2 pieces of Hot & Crispy fried chicken, a serving of regular fries, and a 1.5L chilled beverage to break the fast with. The Ramadan Iftar Deal is one of KFC's most beloved seasonal promotions, offered at a significant discount compared to ordering the same items individually.",
    itemsIncluded: ["2x Zinger Burgers", "2x Fried Chicken Pieces", "1x Regular Fries", "1x 1.5L Drink"],
    image: "images/cat_family.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },
  {
    id: "deal-office-box",
    name: "Office Lunch Box (5 Persons)",
    category: "Deals & Offers",
    price: 3990,
    badge: "Office Pack",
    calories: "5200 kcal",
    servingSize: "Serves 5",
    description: "A bulk corporate lunch deal designed for small office teams — 5 individual Crispy Box meals, each containing a Zinger Burger, one piece of fried chicken, regular fries, a dinner roll, and a 345ml cold drink. The Office Lunch Box eliminates individual ordering hassle for corporate clients and provides a complete, balanced KFC meal to every person in the group at a discounted bulk price.",
    itemsIncluded: ["5x Zinger Burgers", "5x Fried Chicken Pieces", "5x Regular Fries", "5x Dinner Rolls", "5x 345ml Drinks"],
    image: "images/cat_family.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "deal-happy-meal",
    name: "Kids Happy Meal",
    category: "Deals & Offers",
    price: 590,
    badge: "Kids Delight",
    calories: "520 kcal",
    servingSize: "1 Child Serving",
    description: "A lovingly assembled meal created specifically for younger KFC fans — featuring a smaller Krunch Burger or 4 crispy chicken nuggets, a small serving of golden French fries, and a chilled 250ml soft drink. The Kids Happy Meal ensures children get a complete, satisfying KFC meal sized appropriately for smaller appetites, with familiar, mild flavors that children love and parents trust.",
    itemsIncluded: ["1x Krunch Burger OR 4x Nuggets", "1x Small Fries", "1x 250ml Soft Drink"],
    image: "images/signature_box.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },
  {
    id: "deal-weekend-feast",
    name: "Weekend Feast Deal",
    category: "Deals & Offers",
    price: 2990,
    badge: "Weekend Special",
    calories: "3600 kcal",
    servingSize: "Serves 4",
    description: "Exclusively available on Fridays, Saturdays, and Sundays, the Weekend Feast Deal offers premium family value — 4 Mighty Zinger Burgers, 4 pieces of Hot & Crispy fried chicken, 2 large fries buckets, and 2x 1.5L chilled Pepsi bottles. The Weekend Feast replaces the standard Family Festival with a premium burger upgrade, offering the Mighty Zinger double-fillet experience for every family member at a specially reduced weekend price.",
    itemsIncluded: ["4x Mighty Zinger Burgers", "4x Hot & Crispy Chicken Pieces", "2x Large Fries", "2x 1.5L Pepsi"],
    image: "images/family_festival.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "deal-zinger-tenders-deal",
    name: "Zinger & Tenders Deal",
    category: "Deals & Offers",
    price: 1190,
    badge: "Mix & Match",
    calories: "1350 kcal",
    servingSize: "Serves 1-2",
    description: "A specially priced mix-and-match deal combining KFC's two most popular items — 1 Zinger Burger and 6 Crispy Chicken Tenders — alongside a large sharing fries bucket and 2 individual 345ml cold drinks. The Zinger & Tenders Deal allows customers to enjoy both the full burger experience and the boneless tender experience in a single, well-priced deal that is perfect for two people who want to share different items.",
    itemsIncluded: ["1x Zinger Burger", "6x Crispy Tenders", "1x Large Fries", "2x Dip Sauces", "2x 345ml Drinks"],
    image: "images/cat_combos.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: true
  },
  {
    id: "deal-bucket-boneless",
    name: "Boneless Bucket Deal",
    category: "Deals & Offers",
    price: 2490,
    badge: "100% Boneless",
    calories: "2800 kcal",
    servingSize: "Serves 3-4",
    description: "A complete 100% boneless family-style deal for those who prefer all their KFC entirely boneless — 12 crispy chicken tenders, 12 golden nuggets, a large fries bucket, 3 dipping sauce cups, and a 1.5L chilled Pepsi bottle. The Boneless Bucket Deal is the ultimate order for families or groups where everyone prefers boneless chicken, eliminating bones entirely from the meal while maintaining full KFC flavors and generous portions.",
    itemsIncluded: ["12x Crispy Tenders", "12x Golden Nuggets", "1x Large Fries", "3x Dip Sauces", "1x 1.5L Pepsi"],
    image: "images/box_boneless.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },

  // === SEASONAL & REGIONAL SPECIALTIES ===
  {
    id: "special-bbq-chicken-piece",
    name: "BBQ Glazed Chicken Piece",
    category: "Fried Chicken",
    price: 420,
    badge: "BBQ Special",
    calories: "360 kcal",
    servingSize: "1 Piece",
    description: "A premium single piece of KFC's bone-in fried chicken given a generous post-fry glaze of rich, smoky BBQ sauce — available at select branches during BBQ promotional seasons. The BBQ Glazed Chicken Piece combines the iconic crunch and juiciness of KFC's Original Recipe chicken with a sweet, smoky BBQ coating that caramelizes over the crispy exterior, creating a distinctively different flavor experience from the standard hot and crispy variants.",
    itemsIncluded: ["1x BBQ-Glazed Bone-In Chicken Piece"],
    image: "images/fried_chicken.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "special-cheese-zinger",
    name: "Cheese Zinger Burger",
    category: "Burgers & Sandwiches",
    price: 650,
    badge: "Cheese Loaded",
    calories: "620 kcal",
    servingSize: "1 Burger",
    description: "The classic Zinger Burger elevated with a double layer of melted cheddar cheese — the cheese melts across the crispy Zinger fillet, adding a rich, creamy dairy richness to the bold spicy chicken and signature pepper mayo. The Cheese Zinger is the perfect middle ground between the plain Zinger Burger and the more elaborate Zinger Stacker, offering extra indulgence without the full double-fillet commitment.",
    itemsIncluded: ["Crispy Zinger Fillet", "2x Cheddar Cheese Slices", "Pepper Mayo", "Iceberg Lettuce", "Sesame Bun"],
    image: "images/zinger_burger.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "special-spicy-mayo-wrap",
    name: "Spicy Mayo Wrap",
    category: "Wraps",
    price: 510,
    badge: "Spicy Wrap",
    calories: "560 kcal",
    servingSize: "1 Wrap",
    description: "A fiery, flavor-packed wrap featuring crispy spicy chicken strips, sliced jalapenos, diced tomatoes, shredded lettuce, and a generous drizzle of KFC's special spicy mayo — all rolled tight in a warm, toasted tortilla. The Spicy Mayo Wrap brings together the heat of jalapenos and spicy chicken with the cooling, creamy contrast of mayo, creating a complex, layered flavor experience in a convenient hand-held format.",
    itemsIncluded: ["Spicy Chicken Strips", "Sliced Jalapenos", "Diced Tomatoes", "Lettuce", "Spicy Mayo", "Toasted Tortilla"],
    image: "images/chicken_wrap.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "special-popcorn-chicken",
    name: "Popcorn Chicken (Regular)",
    category: "Snacks & Sides",
    price: 380,
    badge: "Bite-Sized",
    calories: "310 kcal",
    servingSize: "1 Regular Box",
    description: "A generous box of tiny, bite-sized crispy popcorn chicken pieces — perfectly seasoned miniature chunks of tender chicken breast coated in a light, crunchy breading. Popcorn Chicken is KFC's most snackable item, ideal for munching on the go, sharing as a group starter, or simply enjoying as a casual chicken snack between meals. Best served with garlic mayo or sweet chili dip.",
    itemsIncluded: ["1x Regular Box Popcorn Chicken", "1x Choice Dip Sauce"],
    image: "images/chicken_nuggets.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "special-popcorn-chicken-large",
    name: "Popcorn Chicken (Large)",
    category: "Snacks & Sides",
    price: 580,
    badge: "Large Share Box",
    calories: "490 kcal",
    servingSize: "1 Large Box",
    description: "A large sharing box of KFC's addictive popcorn chicken — dozens of bite-sized crispy chicken morsels perfect for groups, movie nights, or anyone with a serious chicken snacking craving. The large Popcorn Chicken box comes with two dipping sauces for maximum variety. Every piece is consistently seasoned and fried to maintain the same flavor-packed crunch from the first bite to the very last piece.",
    itemsIncluded: ["1x Large Box Popcorn Chicken", "2x Choice Dip Sauces"],
    image: "images/chicken_nuggets.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 16. CHIZZA & PIZZA SPECIALS ===
  {
    id: "chizza-classic",
    name: "KFC Chizza Classic",
    category: "Chizza & Pizza Specials",
    price: 650,
    badge: "All-Chicken Crust",
    calories: "590 kcal",
    servingSize: "1 Chizza Portion",
    description: "No crust, all chicken! 100% crispy all-chicken fillet base smothered with rich herb pizza sauce, melted mozzarella cheese, crunchy green bell peppers, sliced black olives, and Italian herbs with chili flakes.",
    itemsIncluded: ["1x Crispy All-Chicken Fillet Crust", "Rich Mozzarella Cheese", "Marinara Pizza Sauce", "Olives & Bell Peppers", "Italian Herbs & Chili Flakes"],
    image: "images/kfc_chizza.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "chizza-pepperoni-jalapeno",
    name: "KFC Chizza Pepperoni & Jalapeno",
    category: "Chizza & Pizza Specials",
    price: 720,
    badge: "Spicy Gourmet",
    calories: "640 kcal",
    servingSize: "1 Chizza Portion",
    description: "Extra crispy double chicken fillet base loaded with savory chicken pepperoni slices, fiery pickled jalapenos, double mozzarella cheese blend, and spicy pizza herb seasoning.",
    itemsIncluded: ["Crispy Chicken Base", "Chicken Pepperoni Slices", "Pickled Jalapenos", "Double Mozzarella Blend", "Pizza Herb Seasoning"],
    image: "images/kfc_chizza.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 17. RICE & BOWLS ===
  {
    id: "rice-arabian-crispy",
    name: "KFC Arabian Rice with Crispy Fillet",
    category: "Rice & Bowls",
    price: 430,
    badge: "Flavorful Bowl",
    calories: "510 kcal",
    servingSize: "1 Meal Bowl",
    description: "Steaming aromatic golden spiced basmati rice topped with hand-sliced crispy fried chicken fillet pieces and rich Vietnamese spiced sauce, garnished with fresh parsley.",
    itemsIncluded: ["Spiced Basmati Rice Bowl", "Crispy Fried Chicken Fillet Strips", "Vietnamese Spiced Gravy", "Parsley Garnish"],
    image: "images/kfc_arabian_rice.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "rice-colonel-bowl",
    name: "KFC Colonel Rice Bowl (Vietnamese Gravy)",
    category: "Rice & Bowls",
    price: 480,
    badge: "Chef Special",
    calories: "540 kcal",
    servingSize: "1 Large Bowl",
    description: "Fragrant yellow spiced rice served with crispy boneless chicken chunks, signature Colonel pepper gravy, and sliced bell peppers for a warm, satisfying hearty meal.",
    itemsIncluded: ["Fragrant Spiced Rice", "Crispy Chicken Chunks", "Colonel Gravy Drizzle", "Bell Pepper Garnish"],
    image: "images/kfc_arabian_rice.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "rice-popcorn-bowl",
    name: "KFC Popcorn Chicken Rice Bowl",
    category: "Rice & Bowls",
    price: 460,
    badge: "Bite-Sized Crunch",
    calories: "490 kcal",
    servingSize: "1 Bowl",
    description: "Golden bite-sized popcorn chicken pieces layered over seasoned spicy yellow basmati rice with savory herb drizzle.",
    itemsIncluded: ["Popcorn Chicken Bites", "Spiced Basmati Rice", "Savory Herb Drizzle"],
    image: "images/kfc_arabian_rice.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 18. PASTA & LOADED BOWLS ===
  {
    id: "pasta-mac-cheese-chicken",
    name: "KFC Cheesy Chicken Mac & Cheese",
    category: "Pasta & Loaded Bowls",
    price: 520,
    badge: "Creamy & Cheesy",
    calories: "580 kcal",
    servingSize: "1 Pasta Bowl",
    description: "Elbow macaroni pasta baked in a luscious cheddar and mozzarella cheese sauce, topped with golden crispy fried chicken bites, Italian oregano, and cracked black pepper.",
    itemsIncluded: ["Elbow Macaroni Pasta", "Cheddar & Mozzarella Cheese Sauce", "Crispy Chicken Bites", "Italian Herb Seasoning"],
    image: "images/kfc_creamy_pasta.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "pasta-spicy-loaded-bowl",
    name: "KFC Spicy Loaded Pasta Bowl",
    category: "Pasta & Loaded Bowls",
    price: 560,
    badge: "Spicy Tangy",
    calories: "620 kcal",
    servingSize: "1 Large Pasta Bowl",
    description: "Tender penne pasta tossed in a fiery marinara herb sauce, loaded with crispy chicken fillet chunks, melted mozzarella cheese, and chili flakes.",
    itemsIncluded: ["Penne Pasta in Spicy Sauce", "Crispy Chicken Fillet Chunks", "Melted Mozzarella", "Crushed Chili Flakes"],
    image: "images/kfc_creamy_pasta.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "loaded-cheesy-fries",
    name: "KFC Cheesy Loaded Fries",
    category: "Pasta & Loaded Bowls",
    price: 490,
    badge: "Loaded Crunch",
    calories: "610 kcal",
    servingSize: "1 Loaded Sharing Basket",
    description: "Crispy golden french fries smothered with warm melted cheddar cheese sauce, fiery chicken hot shots, fresh scallions, and tangy jalapeno slices.",
    itemsIncluded: ["Crispy French Fries Basket", "Warm Cheddar Cheese Sauce", "Crispy Chicken Hot Shots", "Sliced Pickled Jalapenos"],
    image: "images/kfc_loaded_fries.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },

  // === 19. SPECIALTY DRINKS & KRUSHERS ===
  {
    id: "bev-mint-margarita",
    name: "KFC Mint Margarita Crusher",
    category: "Beverages",
    price: 290,
    badge: "Cooling Refreshment",
    calories: "140 kcal",
    servingSize: "1 Regular Cup",
    description: "Ice-blended sparkling cooler made with freshly crushed mint leaves, lemon juice, sparkling soda, and a touch of black salt for an ultra-refreshing burst.",
    itemsIncluded: ["1x Ice-Cold Mint Margarita Crusher"],
    image: "images/kfc_krushers_drinks.jpg",
    isPopular: true,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bev-chocolate-oreo-krusher",
    name: "KFC Chocolate Oreo Krusher",
    category: "Beverages",
    price: 380,
    badge: "Thick Shake",
    calories: "360 kcal",
    servingSize: "1 Large Cup",
    description: "Rich and thick creamy chocolate milkshake blended with crunchy crushed Oreo cookies, topped with whipped cream and chocolate fudge drizzle.",
    itemsIncluded: ["1x Chocolate Oreo Milkshake", "Whipped Cream", "Oreo Cookie Crumbs"],
    image: "images/kfc_krushers_drinks.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: false,
    isDeal: false
  },
  {
    id: "bev-strawberry-sparkler",
    name: "KFC Strawberry Sparkler",
    category: "Beverages",
    price: 280,
    badge: "Fruity Fizz",
    calories: "150 kcal",
    servingSize: "1 Regular Cup",
    description: "Sparkling fizzy beverage infused with sweet strawberry syrup, crushed berries, lemon slices, and crushed ice.",
    itemsIncluded: ["1x Strawberry Sparkler Drink"],
    image: "images/kfc_krushers_drinks.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  },

  {
    id: "bev-7up-zero-345",
    name: "7UP Zero (345ml)",
    category: "Beverages",
    price: 140,
    badge: "Zero Sugar",
    calories: "0 kcal",
    servingSize: "345 ml",
    description: "Refreshing lemon-lime sparkle with zero calories and zero sugar.",
    itemsIncluded: ["1x 345ml 7UP Zero Sugar"],
    image: "images/family_bucket.jpg",
    isPopular: false,
    isBestValue: false,
    isFamilyMeal: false,
    isDeal: false
  }
];

// 3. Centralized 20 Pakistan Cities Directory Dataset
const KFC_CITIES_DATA = [
  {
    slug: "lahore",
    name: "Lahore",
    province: "Punjab",
    outlets: "38+ Outlets",
    highlights: "Gulberg, DHA Phase 5 & 6, MM Alam Road, Johar Town, Mall Road, Bahria Town, Model Town, Shadman, Wapda Town",
    deliveryHours: "11:00 AM – 04:00 AM",
    popularCombo: "Zinger Combo & Family Festival 1",
    description: "Lahore is home to over 38 KFC outlets spread across major commercial hubs and residential sectors. Known for lively food culture, late-night midnight deals and family buckets are wildly popular.",
    faqs: [
      { q: "What is the price of a KFC Zinger Burger in Lahore?", a: "The standalone Zinger Burger in Lahore is priced at approximately Rs. 600 (≈ $2.14 USD), while the full Zinger Combo with fries and drink is Rs. 910 (≈ $3.25 USD)." },
      { q: "What are the most popular KFC locations in Lahore?", a: "Flagship outlets include MM Alam Road Gulberg, DHA Phase 5 Commercial, Johar Town G-1 Market, Mall Road, and Bahria Town Lahore." },
      { q: "Are KFC midnight deals available in Lahore?", a: "Yes! Most drive-thru and delivery outlets in Lahore operate until 4:00 AM with Midnight Deals starting from Rs. 520." }
    ]
  },
  {
    slug: "karachi",
    name: "Karachi",
    province: "Sindh",
    outlets: "45+ Outlets",
    highlights: "Clifton Block 2 & 5, DHA Phase 4, Bahadurabad, North Nazimabad, Gulshan-e-Iqbal, Tariq Road, Shahrah-e-Faisal, Malir Cantt",
    deliveryHours: "11:00 AM – 05:00 AM",
    popularCombo: "Mighty Zinger & 9 Pcs Family Bucket",
    description: "Karachi has the largest network of KFC branches in Pakistan with over 45 outlets. From seaside Clifton locations to vibrant Gulshan, KFC operates around the clock serving crispy chicken and zinger meals.",
    faqs: [
      { q: "Are KFC prices in Karachi different from other cities?", a: "Base menu prices in Karachi match nationwide rates (e.g., Zinger Rs. 600, Krunch Rs. 330), although airport branches may include specific concession surcharges." },
      { q: "Does KFC deliver late night in Karachi?", a: "Yes, major Karachi branches in Clifton, DHA, and Gulshan offer delivery and drive-thru services until 5:00 AM." },
      { q: "What is the price of the KFC Family Bucket in Karachi?", a: "The 9-piece Family Bucket with a 1.5L Pepsi is priced at Rs. 2,290 (≈ $8.18 USD)." }
    ]
  },
  {
    slug: "islamabad",
    name: "Islamabad",
    province: "Federal Capital",
    outlets: "18+ Outlets",
    highlights: "F-6 Super Market, F-7 Jinnah Super, F-10 Markaz, Blue Area, F-11 Markaz, I-8 Markaz, DHA Phase 2, Centaurus Mall",
    deliveryHours: "11:00 AM – 03:00 AM",
    popularCombo: "Crispy Duo Box & Zinger Stacker",
    description: "Serving the capital city across prestigious sectors including F-6, F-7, Blue Area, and Centaurus Mall. Islamabad residents enjoy swift drive-thru access and delivery.",
    faqs: [
      { q: "Where can I find KFC in Islamabad?", a: "Key branches include F-7 Jinnah Super, F-10 Markaz, Centaurus Mall food court, Blue Area, F-6 Super Market, and F-11 Markaz." },
      { q: "Is there a KFC branch in Sector F-1 Islamabad?", a: "Islamabad does not have a Sector F-1 branch; users searching for F-1 are usually looking for nearby F-10 or F-11 Markaz branches, or the verified Sector F-1 Mirpur (AJK) location on Main Kotli Road." },
      { q: "How much does a KFC Crispy Box cost in Islamabad?", a: "The Crispy Box (Zinger, chicken pc, fries, dinner roll, and drink) costs Rs. 1,020 (≈ $3.64 USD)." }
    ]
  },
  {
    slug: "rawalpindi",
    name: "Rawalpindi",
    province: "Punjab",
    outlets: "15+ Outlets",
    highlights: "Saddar Cantt, Bahria Town Phase 4 & 7, Commercial Market Satellite Town, Peshawar Road, Chaklala Scheme 3",
    deliveryHours: "11:00 AM – 03:00 AM",
    popularCombo: "Zinger Combo & Hot Wings 10 Pcs",
    description: "With lively outlets in Saddar, Satellite Town, and Bahria Town, KFC Rawalpindi serves twin-city commuters and families with quick service and drive-thrus.",
    faqs: [
      { q: "What is the KFC 10-piece Hot Wings price in Rawalpindi?", a: "10 pieces of crispy spicy Hot Wings cost Rs. 750 (≈ $2.68 USD)." },
      { q: "Are KFC branches in Rawalpindi open for dine-in?", a: "Yes, major Rawalpindi branches feature spacious family dine-in areas and dedicated parking." }
    ]
  },
  {
    slug: "multan",
    name: "Multan",
    province: "Punjab",
    outlets: "9+ Outlets",
    highlights: "Gulgasht Colony, Cantt Mall Road, Bosan Road, DHA Multan, Abdali Road",
    deliveryHours: "11:30 AM – 02:00 AM",
    popularCombo: "Family Festival 1 & Krunch Combo",
    description: "Multan's foodies enjoy KFC at premier hubs on Bosan Road and Gulgasht Colony. Excellent student and family deals make it a top weekend dining destination.",
    faqs: [
      { q: "What is the cost of KFC Family Festival 1 in Multan?", a: "Family Festival 1 (4 Zingers, 4 Chicken Pcs, 2 Fries, 1.5L Pepsi) costs Rs. 2,450 (≈ $8.75 USD)." },
      { q: "What is the Zinger Stacker price in Multan?", a: "Current Multan listings show the standalone Zinger Stacker Burger around Rs. 660 (≈ $2.36 USD) and the Zinger Stacker Combo around Rs. 950 (≈ $3.39 USD)." },
      { q: "Where are the main KFC branches in Multan?", a: "Major KFC outlets in Multan operate on Bosan Road (near BZU), Gulgasht Colony Main Commercial, Multan Cantt Mall Road, Abdali Road, and DHA Multan." }
    ]
  },
  {
    slug: "faisalabad",
    name: "Faisalabad",
    province: "Punjab",
    outlets: "12+ Outlets",
    highlights: "D-Ground Peoples Colony, Canal Road, Jaranwala Road, Kohinoor City, Susan Road",
    deliveryHours: "11:00 AM – 03:00 AM",
    popularCombo: "Mighty Zinger & Crispy Box",
    description: "Faisalabad's bustling industrial and textile city is served by prominent KFC outlets in D-Ground, Susan Road, and Canal Road.",
    faqs: [
      { q: "Where is the main KFC branch in Faisalabad?", a: "The flagship branch is located at D-Ground Peoples Colony with drive-thru on Canal Road." }
    ]
  },
  {
    slug: "peshawar",
    name: "Peshawar",
    province: "KPK",
    outlets: "8+ Outlets",
    highlights: "University Road, Peshawar Cantt Mall, Hayatabad Phase 3, Ring Road",
    deliveryHours: "11:30 AM – 02:00 AM",
    popularCombo: "Family Bucket & Zingeratha",
    description: "Peshawar features modern KFC branches on University Road and Hayatabad, providing delicious fried chicken to students and families across Khyber Pakhtunkhwa.",
    faqs: [
      { q: "What is the price of 3 Pcs Fried Chicken in Peshawar?", a: "3 Pieces of Fried Chicken cost Rs. 890 (≈ $3.18 USD)." }
    ]
  },
  {
    slug: "sialkot",
    name: "Sialkot",
    province: "Punjab",
    outlets: "6+ Outlets",
    highlights: "Paris Road, Sialkot Cantt, Aziz Shaheed Road",
    deliveryHours: "11:30 AM – 02:00 AM",
    popularCombo: "Zinger Combo & Boneless Box",
    description: "Sialkot's vibrant export hub boasts popular KFC outlets along Paris Road and Sialkot Cantt, serving crispy meals to business executives and families.",
    faqs: [
      { q: "Where is KFC located in Sialkot?", a: "Key branches are on Paris Road and in Sialkot Cantt." }
    ]
  },
  {
    slug: "gujranwala",
    name: "Gujranwala",
    province: "Punjab",
    outlets: "7+ Outlets",
    highlights: "GT Road Model Town, Gujranwala Cantt, DC Road, Master City",
    deliveryHours: "11:30 AM – 02:30 AM",
    popularCombo: "Value Bucket 15 Pcs & Mighty Zinger",
    description: "Famous for food lovers, Gujranwala's KFC branches on GT Road and Cantt cater to large gatherings with sharing buckets and festival deals.",
    faqs: [
      { q: "How much is the 15-piece Value Bucket in Gujranwala?", a: "The 15 Pcs Value Bucket costs Rs. 3,450 (≈ $12.32 USD) with a 1.5L drink." }
    ]
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    province: "Sindh",
    outlets: "6+ Outlets",
    highlights: "Auto Bhan Road, Saddar Hyderabad, Latifabad Unit 7, Qasimabad",
    deliveryHours: "11:30 AM – 02:30 AM",
    popularCombo: "Krunch Combo & Twister Wrap",
    description: "Hyderabad's bustling food strip on Auto Bhan Road and Latifabad offers complete KFC menu ranges with dine-in and home delivery.",
    faqs: [
      { q: "Does KFC in Hyderabad offer home delivery?", a: "Yes, KFC delivers across Latifabad, Qasimabad, Saddar, and surrounding areas." }
    ]
  },
  {
    slug: "quetta",
    name: "Quetta",
    province: "Balochistan",
    outlets: "4+ Outlets",
    highlights: "Quetta Cantt, Shahrah-e-Zarghoon, Jinnah Road, Serena Hotel vicinity",
    deliveryHours: "12:00 PM – 01:30 AM",
    popularCombo: "Family Bucket 9 Pcs & Zinger Burger",
    description: "KFC in Quetta provides high-quality fast food to the capital of Balochistan with prime locations in Quetta Cantt and Shahrah-e-Zarghoon.",
    faqs: [
      { q: "Where can I find KFC in Quetta?", a: "The most popular branch is located inside Quetta Cantt on Shahrah-e-Zarghoon." }
    ]
  },
  {
    slug: "bahawalpur",
    name: "Bahawalpur",
    province: "Punjab",
    outlets: "4+ Outlets",
    highlights: "Circular Road, Model Town A, Noor Mahal Road",
    deliveryHours: "12:00 PM – 01:30 AM",
    popularCombo: "Crispy Box & Hot Wings 10 Pcs",
    description: "Serving the historic city of Bahawalpur with favorite Zinger burgers and crispy chicken meals near Model Town and Circular Road.",
    faqs: [
      { q: "What are the timings for KFC Bahawalpur?", a: "Outlets typically open from 12:00 PM until 1:30 AM daily." }
    ]
  },
  {
    slug: "sargodha",
    name: "Sargodha",
    province: "Punjab",
    outlets: "4+ Outlets",
    highlights: "Club Road, Sargodha Cantt, University Road",
    deliveryHours: "12:00 PM – 02:00 AM",
    popularCombo: "Zinger Stacker & Krunch Combo",
    description: "Sargodha's central outlets on Club Road and Cantt serve students of University of Sargodha and residents with fast drive-thru convenience.",
    faqs: [
      { q: "Is KFC drive-thru available in Sargodha?", a: "Yes, the Club Road branch offers a convenient drive-thru lane." }
    ]
  },
  {
    slug: "abbottabad",
    name: "Abbottabad",
    province: "KPK",
    outlets: "3+ Outlets",
    highlights: "Mansehra Road, Supply Bazaar, Mandian",
    deliveryHours: "11:30 AM – 01:00 AM",
    popularCombo: "Family Festival & Hot Wings",
    description: "Nestled in the scenic hills, KFC Abbottabad on Mansehra Road is a beloved stop for tourists heading to northern Pakistan and local university students.",
    faqs: [
      { q: "Is there a KFC on Mansehra Road in Abbottabad?", a: "Yes, the primary Abbottabad branch is conveniently situated on the main Mansehra Road." }
    ]
  },
  {
    slug: "sukkur",
    name: "Sukkur",
    province: "Sindh",
    outlets: "3+ Outlets",
    highlights: "Military Road, Sukkur Cantt, Minara Road",
    deliveryHours: "12:00 PM – 02:00 AM",
    popularCombo: "Zinger Combo & 3 Pcs Chicken",
    description: "Serving Northern Sindh from prime locations on Military Road, KFC Sukkur is a landmark dining choice for travelers and local families.",
    faqs: [
      { q: "What is the price of a Zinger Combo in Sukkur?", a: "The Zinger Combo is standard at Rs. 910 (≈ $3.25 USD)." }
    ]
  },
  {
    slug: "rahim-yar-khan",
    name: "Rahim Yar Khan",
    province: "Punjab",
    outlets: "3+ Outlets",
    highlights: "Abu Dhabi Road, Model Town, City Center",
    deliveryHours: "12:00 PM – 01:30 AM",
    popularCombo: "Crispy Box & Family Festival 1",
    description: "KFC Rahim Yar Khan serves the southern Punjab hub on Abu Dhabi Road with high quality fried chicken and prompt home delivery.",
    faqs: [
      { q: "Does KFC Rahim Yar Khan deliver to residential sectors?", a: "Yes, delivery is active across Model Town, Gulshan-e-Usman, and Abu Dhabi Road." }
    ]
  },
  {
    slug: "gujrat",
    name: "Gujrat",
    province: "Punjab",
    outlets: "4+ Outlets",
    highlights: "Bhimber Road, GT Road bypass, Court Road",
    deliveryHours: "11:30 AM – 02:00 AM",
    popularCombo: "Mighty Zinger & Nuggets 12 Pcs",
    description: "Strategically located on Bhimber Road, KFC Gujrat is popular among overseas Pakistanis visiting home and local families.",
    faqs: [
      { q: "Where is KFC situated in Gujrat?", a: "The main branch is on Bhimber Road with ample parking and family dine-in." }
    ]
  },
  {
    slug: "sheikhupura",
    name: "Sheikhupura",
    province: "Punjab",
    outlets: "3+ Outlets",
    highlights: "Lahore-Sargodha Road, Housing Colony, Stadium Road",
    deliveryHours: "12:00 PM – 01:30 AM",
    popularCombo: "Krunch Combo & Hot Shots",
    description: "Conveniently located on main Lahore-Sargodha Road, serving Sheikhupura commuters and local residents with fresh, crunchy meals.",
    faqs: [
      { q: "Is KFC open late in Sheikhupura?", a: "Yes, service operates until 1:30 AM on weekdays and 2:00 AM on weekends." }
    ]
  },
  {
    slug: "jhelum",
    name: "Jhelum",
    province: "Punjab",
    outlets: "3+ Outlets",
    highlights: "GT Road Jhelum, Cantt area, River View Road",
    deliveryHours: "11:30 AM – 01:30 AM",
    popularCombo: "Family Bucket 9 Pcs & Zinger Burger",
    description: "KFC Jhelum on the historic GT Road offers river-view dining, drive-thru service, and fresh meals for highway travelers and locals.",
    faqs: [
      { q: "Can I stop at KFC Jhelum on the GT Road?", a: "Yes, the branch is directly accessible on the main GT Road with drive-thru." }
    ]
  },
  {
    slug: "mardan",
    name: "Mardan",
    province: "KPK",
    outlets: "3+ Outlets",
    highlights: "Mall Road Mardan, Nowshera Road, Cantt",
    deliveryHours: "12:00 PM – 01:30 AM",
    popularCombo: "Crispy Duo Box & Hot Wings",
    description: "Serving Mardan and surrounding districts with authentic KFC taste, located conveniently near Mall Road and Cantt.",
    faqs: [
      { q: "What is the price of Hot Wings in Mardan?", a: "10 pieces of Hot Wings cost Rs. 750 (≈ $2.68 USD)." }
    ]
  }
];

// 4. Render Menu Card HTML (Dual Currency + Badges + Serving/Calories)
function createCardHTML(item) {
  const isGoldBadge = item.badge === 'Bestseller' || item.badge === 'Top Seller' || item.badge === 'Mega Saver';
  const priceHTML = formatPriceHTML(item.price);

  return `
    <article class="food-card" data-id="${item.id}" data-category="${item.category}" data-price="${item.price}">
      <div class="card-img-wrapper">
        ${item.badge ? `<span class="card-badge ${isGoldBadge ? 'gold' : ''}">${item.badge}</span>` : ''}
        <img src="${item.image}" alt="${item.name} - KFC Pakistan Menu" loading="lazy" width="300" height="200">
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

// 6. Curated Spotlight Sections Renderer (Popular, Best Value, Family Deals, Latest Offers)
function renderSpotlightSections() {
  const popularContainer = document.getElementById('spotlight-popular-container');
  const bestValueContainer = document.getElementById('spotlight-value-container');
  const familyContainer = document.getElementById('spotlight-family-container');
  const dealsContainer = document.getElementById('spotlight-deals-container');

  if (popularContainer) {
    const popularItems = KFC_MENU_DATA.filter(i => i.isPopular).slice(0, 4);
    popularContainer.innerHTML = popularItems.map(createCardHTML).join('');
  }
  if (bestValueContainer) {
    const valueItems = KFC_MENU_DATA.filter(i => i.isBestValue).slice(0, 4);
    bestValueContainer.innerHTML = valueItems.map(createCardHTML).join('');
  }
  if (familyContainer) {
    const familyItems = KFC_MENU_DATA.filter(i => i.isFamilyMeal).slice(0, 4);
    familyContainer.innerHTML = familyItems.map(createCardHTML).join('');
  }
  if (dealsContainer) {
    const dealsItems = KFC_MENU_DATA.filter(i => i.isDeal).slice(0, 4);
    dealsContainer.innerHTML = dealsItems.map(createCardHTML).join('');
  }
}

// 7. Price Comparison Table Renderer
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
            <th>PKR Price</th>
            <th>USD Approx.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  `;

  items.forEach(item => {
    const usd = convertPKRtoUSD(item.price);
    tableHTML += `
      <tr>
        <td class="table-item-name">
          <strong>${item.name}</strong>
          ${item.badge ? `<span class="table-badge">${item.badge}</span>` : ''}
        </td>
        <td><span class="table-category-badge">${item.category}</span></td>
        <td class="table-muted">${item.servingSize}</td>
        <td class="table-muted">${item.calories}</td>
        <td class="table-price-pk">Rs. ${item.price.toLocaleString()}</td>
        <td class="table-price-usd">≈ $${usd}</td>
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
        <img src="${item.image}" alt="${item.name} - KFC Pakistan" style="width:100%; height:100%; object-fit:cover;">
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
              <span class="nutri-pill">Halal 100% Verified</span>
              <span class="nutri-pill">May contain wheat, dairy, soy</span>
            </div>
          </div>
        </div>

        <div class="modal-disclaimer-card">
          <span class="icon">🛡️</span>
          <div>
            <strong>Consumer Notice:</strong> ${CURRENCY_CONFIG.disclaimer} This is an independent price guide not affiliated with KFC or Yum! Brands. Prices and item availability may vary across individual branches.
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
      // Category match (flexible match for short names like 'Burgers', 'Chicken', 'Snacks', 'Deals')
      const targetCat = activeCategory.toLowerCase();
      const itemCat = item.category.toLowerCase();
      const matchCat = (
        activeCategory === 'All' ||
        itemCat === targetCat ||
        itemCat.includes(targetCat) ||
        targetCat.includes(itemCat) ||
        (targetCat.includes('family') && (itemCat.includes('family') || itemCat.includes('bucket') || item.isFamilyMeal)) ||
        (targetCat.includes('bucket') && (itemCat.includes('family') || itemCat.includes('bucket') || item.isFamilyMeal)) ||
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

      // Price filter match
      let matchPrice = true;
      if (activePriceRange === 'under-500') {
        matchPrice = item.price < 500;
      } else if (activePriceRange === '500-1000') {
        matchPrice = item.price >= 500 && item.price <= 1000;
      } else if (activePriceRange === '1000-2000') {
        matchPrice = item.price > 1000 && item.price <= 2000;
      } else if (activePriceRange === 'over-2000') {
        matchPrice = item.price > 2000;
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
  const citySlug = urlParams.get('city') || window.location.hash.replace('#', '') || 'lahore';

  const city = KFC_CITIES_DATA.find(c => c.slug.toLowerCase() === citySlug.toLowerCase()) || KFC_CITIES_DATA[0];

  // Update Page Title and Meta Tags
  document.title = `KFC Menu & Prices in ${city.name} (PKR & USD) – 2026 Price Directory`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.content = `Check KFC ${city.name} menu items, prices in PKR & USD, Zinger burger price, fried chicken deals, outlet locations, and FAQs across ${city.name}.`;
  }

  // Sync Canonical & OpenGraph tags for current city
  const dedicatedCityRoutes = {
    'lahore': '/city-lahore',
    'karachi': '/city-karachi',
    'islamabad': '/city-islamabad',
    'faisalabad': '/city-faisalabad',
    'multan': '/city-multan'
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
    ogTitle.setAttribute('content', `KFC Menu & Prices in ${city.name} (PKR & USD)`);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', `KFC ${city.name} menu prices, deals, and branch directory in PKR & USD.`);
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
        if (activeCategory === 'Burgers & Sandwiches') {
          matchCat = item.category === 'Burgers & Sandwiches';
        } else if (activeCategory === 'Fried Chicken') {
          matchCat = item.category === 'Fried Chicken' || item.category === 'Chicken Tenders' || item.category === 'Hot Wings' || item.category === 'Nuggets';
        } else if (activeCategory === 'Rice & Bowls') {
          matchCat = item.category === 'Rice & Bowls';
        } else if (activeCategory === 'Chizza & Pizza Specials') {
          matchCat = item.category === 'Chizza & Pizza Specials';
        } else if (activeCategory === 'Pasta & Loaded Bowls') {
          matchCat = item.category === 'Pasta & Loaded Bowls';
        } else if (activeCategory === 'Combos') {
          matchCat = item.category === 'Combos';
        } else if (activeCategory === 'Signature Boxes') {
          matchCat = item.category === 'Signature Boxes';
        } else if (activeCategory === 'Family Buckets') {
          matchCat = item.category === 'Family Buckets' || item.isFamilyMeal || item.category === 'Deals & Offers';
        } else if (activeCategory === 'Snacks & Sides') {
          matchCat = item.category === 'Snacks & Sides' || item.category === 'Fries' || item.category === 'Biscuits' || item.category === 'Wraps';
        } else if (activeCategory === 'Beverages') {
          matchCat = item.category === 'Beverages';
        } else if (activeCategory === 'Desserts') {
          matchCat = item.category === 'Desserts';
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

  // Attach currency rerender
  const currentReRender = window.reRenderActiveViews;
  window.reRenderActiveViews = function() {
    if (typeof currentReRender === 'function') currentReRender();
    renderCityGrid();
  };
}

// 10c. Controller for Dedicated City Pages (e.g. city-lahore.html, city-multan.html)
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

// 14. Currency Toggle Buttons in DOM
function initCurrencySwitcher() {
  document.querySelectorAll('.currency-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const curr = e.currentTarget.dataset.currency;
      if (curr) {
        setGlobalCurrency(curr);
      }
    });
  });
  // Apply saved currency on page load
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
