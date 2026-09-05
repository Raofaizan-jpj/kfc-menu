/* ==========================================================================
   KFC Menu Pakistan — Unified JavaScript Engine
   50+ Menu Items, 15 Categories, 20 Cities, Dual PKR/USD Currency,
   Live Search, Filters, Sorting, Details Modal & Dynamic City Pages
   ========================================================================== */

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
    price: 850,
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
    price: 1120,
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
    id: "deal-festival-1",
    name: "Family Festival 1",
    category: "Deals & Offers",
    price: 2450,
    badge: "Mega Saver",
    calories: "3100 kcal",
    servingSize: "Serves 4",
    description: "The nation's top celebration feast: 4x Zinger Burgers, 4x Fried Chicken Pieces, 2x Regular Fries, and 1x 1.5L Pepsi.",
    itemsIncluded: ["4x Zinger Burgers", "4x Chicken Pcs", "2x Regular Fries", "1x 1.5L Pepsi"],
    image: "images/cat_family.jpg",
    isPopular: true,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
  {
    id: "deal-festival-2",
    name: "Family Festival 2",
    category: "Deals & Offers",
    price: 2990,
    badge: "Feast Deal",
    calories: "3500 kcal",
    servingSize: "Serves 4-5",
    description: "4x Zinger Burgers, 4x Chicken Pieces, 2x Regular Fries, 2x Warm Dinner Rolls, and 1x 1.5L soft drink.",
    itemsIncluded: ["4x Zinger Burgers", "4x Chicken Pcs", "2x Fries", "2x Dinner Rolls", "1x 1.5L Drink"],
    image: "images/cat_family.jpg",
    isPopular: false,
    isBestValue: true,
    isFamilyMeal: true,
    isDeal: true
  },
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
      { q: "Where can I find KFC in Islamabad?", a: "Key branches include F-7 Jinnah Super, F-10 Markaz, Centaurus Mall food court, Blue Area, and G-9 Markaz." },
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
      { q: "What is the cost of KFC Family Festival 1 in Multan?", a: "Family Festival 1 (4 Zingers, 4 Chicken Pcs, 2 Fries, 1.5L Pepsi) costs Rs. 2,450 (≈ $8.75 USD)." }
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

  // Render Popular Combos & Family Meals for this city
  const cityItemsGrid = document.getElementById('city-items-grid');
  if (cityItemsGrid) {
    const popularInCity = KFC_MENU_DATA.filter(i => i.isPopular || i.isFamilyMeal).slice(0, 8);
    cityItemsGrid.innerHTML = popularInCity.map(createCardHTML).join('');
  }

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
