/* ==========================================================================
   KFC Menu Pakistan — Unified JavaScript Core
   Menu Dataset with Real Stock Food Images, Renderer, Search, Filter & Modal
   ========================================================================== */

// 1. Centralized KFC Pakistan Menu Database with Real Stock Images
const KFC_MENU_DATA = [
  // --- BURGERS ---
  {
    id: "burger-zinger",
    name: "Zinger Burger",
    category: "Burgers",
    price: 600,
    badge: "Bestseller",
    description: "Crispy fried chicken fillet served with fresh lettuce and signature creamy mayo sauce in a warm sesame seed bun.",
    itemsIncluded: ["Zinger Chicken Fillet", "Signature Mayo", "Fresh Lettuce", "Sesame Bun"],
    image: "images/zinger_burger.jpg"
  },
  {
    id: "burger-mighty",
    name: "Mighty Zinger",
    category: "Burgers",
    price: 770,
    badge: "Popular",
    description: "Double crispy Zinger fillets layered with double cheese, fresh lettuce, and spicy mayo for the ultimate hunger.",
    itemsIncluded: ["2x Zinger Fillets", "2x Cheese Slices", "Spicy Mayo", "Fresh Lettuce"],
    image: "images/mighty_zinger.jpg"
  },
  {
    id: "burger-stacker",
    name: "Zinger Stacker",
    category: "Burgers",
    price: 850,
    badge: "Hot",
    description: "Two crispy chicken fillets stacked high with spicy jalapeños, cheese, and special stacker sauce.",
    itemsIncluded: ["2x Crispy Fillets", "Jalapeños", "Cheese Slice", "Stacker Sauce"],
    image: "images/mighty_zinger.jpg"
  },
  {
    id: "burger-krunch",
    name: "Krunch Burger",
    category: "Burgers",
    price: 330,
    badge: "Value",
    description: "Crunchy boneless chicken fillet with mayo and lettuce in a soft, fresh bun. Exceptional value!",
    itemsIncluded: ["Krunch Fillet", "Mayo", "Sesame Bun"],
    image: "images/zinger_burger.jpg"
  },
  {
    id: "burger-kentucky",
    name: "Kentucky Burger",
    category: "Burgers",
    price: 720,
    badge: "Special",
    description: "A signature recipe chicken fillet topped with smoky BBQ sauce, crispy onions, and cheddar cheese.",
    itemsIncluded: ["Kentucky Fillet", "Smoky BBQ Sauce", "Crispy Onions", "Cheddar Cheese"],
    image: "images/zinger_burger.jpg"
  },
  {
    id: "burger-twister",
    name: "Twister",
    category: "Burgers",
    price: 490,
    badge: "Classic",
    description: "Crispy chicken strips wrapped in a warm tortilla with fresh diced tomatoes, lettuce, and pepper mayo.",
    itemsIncluded: ["2x Crispy Strips", "Tortilla Wrap", "Diced Tomatoes", "Pepper Mayo"],
    image: "images/zinger_burger.jpg"
  },

  // --- CHICKEN ---
  {
    id: "chicken-1pc",
    name: "1 Pc Fried Chicken",
    category: "Chicken",
    price: 320,
    badge: "Classic",
    description: "One piece of KFC's world-famous Original Recipe or Extra Crispy fried chicken cooked to golden perfection.",
    itemsIncluded: ["1x Chicken Piece (Original/Crispy)"],
    image: "images/fried_chicken.jpg"
  },
  {
    id: "chicken-3pc",
    name: "3 Pcs Fried Chicken",
    category: "Chicken",
    price: 890,
    badge: "Popular",
    description: "Three succulent pieces of Hot & Crispy or Original Recipe fried chicken.",
    itemsIncluded: ["3x Chicken Pieces"],
    image: "images/fried_chicken.jpg"
  },
  {
    id: "chicken-wings-10",
    name: "Hot Wings (10 Pcs)",
    category: "Chicken",
    price: 750,
    badge: "Spicy Hot",
    description: "10 pieces of fiery, crunchy hot wings seasoned with authentic chili spice marinade.",
    itemsIncluded: ["10x Hot Wings"],
    image: "images/hot_wings.jpg"
  },
  {
    id: "chicken-strips-3",
    name: "3 Pcs Chicken Strips",
    category: "Chicken",
    price: 450,
    badge: "Boneless",
    description: "Tender, 100% chicken breast strips seasoned and fried to crispy perfection.",
    itemsIncluded: ["3x Boneless Chicken Strips", "1x Dip Sauce"],
    image: "images/fried_chicken.jpg"
  },
  {
    id: "chicken-popcorn",
    name: "Popcorn Chicken",
    category: "Chicken",
    price: 490,
    badge: "Snack",
    description: "Bite-sized pieces of crispy tender chicken breast seasoned with KFC secret spices.",
    itemsIncluded: ["1x Portion Popcorn Chicken"],
    image: "images/hot_wings.jpg"
  },
  {
    id: "chicken-nuggets-6",
    name: "Nuggets (6 Pcs)",
    category: "Chicken",
    price: 420,
    badge: "Kids Favorite",
    description: "6 pieces of golden chicken nuggets served with your choice of savory dip sauce.",
    itemsIncluded: ["6x Chicken Nuggets", "1x Dipping Sauce"],
    image: "images/hot_wings.jpg"
  },

  // --- COMBOS ---
  {
    id: "combo-zinger",
    name: "Zinger Combo",
    category: "Combos",
    price: 910,
    badge: "Top Seller",
    description: "The classic Zinger Burger paired with golden regular fries and a refreshing 345ml Pepsi.",
    itemsIncluded: ["1x Zinger Burger", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/signature_box.jpg"
  },
  {
    id: "combo-mighty",
    name: "Mighty Zinger Combo",
    category: "Combos",
    price: 1050,
    badge: "Big Meal",
    description: "Mighty Zinger Burger served alongside hot crisp regular fries and a cold 345ml drink.",
    itemsIncluded: ["1x Mighty Zinger Burger", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/signature_box.jpg"
  },
  {
    id: "combo-stacker",
    name: "Zinger Stacker Combo",
    category: "Combos",
    price: 1120,
    badge: "Filling",
    description: "Spicy Zinger Stacker Burger complete with golden french fries and a soft drink.",
    itemsIncluded: ["1x Zinger Stacker Burger", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/signature_box.jpg"
  },
  {
    id: "combo-krunch",
    name: "Krunch Combo",
    category: "Combos",
    price: 590,
    badge: "Best Value",
    description: "Crispy Krunch Burger paired with regular fries and a 345ml soft drink.",
    itemsIncluded: ["1x Krunch Burger", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/signature_box.jpg"
  },
  {
    id: "combo-twister",
    name: "Twister Combo",
    category: "Combos",
    price: 780,
    badge: "Popular",
    description: "Signature Twister wrap with regular fries and chilled 345ml beverage.",
    itemsIncluded: ["1x Twister Wrap", "1x Regular Fries", "1x 345ml Drink"],
    image: "images/signature_box.jpg"
  },

  // --- SIGNATURE BOXES ---
  {
    id: "box-crispy",
    name: "Crispy Box",
    category: "Signature Boxes",
    price: 1020,
    badge: "Box Meal",
    description: "Zinger Burger, 1 Pc Fried Chicken, Regular Fries, Dinner Roll, and a 345ml soft drink.",
    itemsIncluded: ["1x Zinger Burger", "1x Chicken Pc", "1x Regular Fries", "1x Dinner Roll", "1x Drink"],
    image: "images/signature_box.jpg"
  },
  {
    id: "box-boneless",
    name: "Boneless Box",
    category: "Signature Boxes",
    price: 1150,
    badge: "100% Meat",
    description: "Zinger Burger, 3 Pcs Chicken Strips, Regular Fries, Dip Sauce, and a 345ml drink.",
    itemsIncluded: ["1x Zinger Burger", "3x Strips", "1x Regular Fries", "1x Dip Sauce", "1x Drink"],
    image: "images/signature_box.jpg"
  },
  {
    id: "box-wow",
    name: "Wow Box",
    category: "Signature Boxes",
    price: 1290,
    badge: "Supreme",
    description: "Zinger Burger, 1 Pc Fried Chicken, 3 Hot Wings, Regular Fries, Dinner Roll, and 345ml drink.",
    itemsIncluded: ["1x Zinger Burger", "1x Chicken Pc", "3x Hot Wings", "1x Fries", "1x Roll", "1x Drink"],
    image: "images/signature_box.jpg"
  },
  {
    id: "box-crispy-duo",
    name: "Crispy Duo Box",
    category: "Signature Boxes",
    price: 1650,
    badge: "For Two",
    description: "2x Zinger Burgers, 2x Chicken Pieces, 2x Regular Fries, and 2x 345ml Drinks.",
    itemsIncluded: ["2x Zinger Burgers", "2x Chicken Pieces", "2x Fries", "2x 345ml Drinks"],
    image: "images/signature_box.jpg"
  },
  {
    id: "box-xtreme-duo",
    name: "Xtreme Duo Box",
    category: "Signature Boxes",
    price: 1890,
    badge: "Double Delight",
    description: "2x Zinger Burgers, 2x Chicken Pieces, 6x Hot Wings, 2x Fries, and 2x Drinks.",
    itemsIncluded: ["2x Zinger Burgers", "2x Chicken Pieces", "6x Hot Wings", "2x Fries", "2x Drinks"],
    image: "images/signature_box.jpg"
  },

  // --- FAMILY DEALS ---
  {
    id: "family-festival-1",
    name: "Family Festival 1",
    category: "Family Deals",
    price: 2450,
    badge: "Feast",
    description: "4x Zinger Burgers, 4x Chicken Pieces, 2x Regular Fries, and a 1.5 Liter Pepsi bottle.",
    itemsIncluded: ["4x Zinger Burgers", "4x Chicken Pcs", "2x Regular Fries", "1x 1.5L Pepsi"],
    image: "images/family_bucket.jpg"
  },
  {
    id: "family-festival-2",
    name: "Family Festival 2",
    category: "Family Deals",
    price: 2990,
    badge: "Mega Deal",
    description: "4x Zinger Burgers, 4x Chicken Pieces, 2x Regular Fries, 2x Dinner Rolls, and 1.5L Drink.",
    itemsIncluded: ["4x Zinger Burgers", "4x Chicken Pcs", "2x Fries", "2x Rolls", "1x 1.5L Drink"],
    image: "images/family_bucket.jpg"
  },
  {
    id: "family-bucket",
    name: "Family Bucket (9 Pcs)",
    category: "Family Deals",
    price: 2290,
    badge: "Bucket Deal",
    description: "9 Pieces of Hot & Crispy or Original Recipe Fried Chicken served with a 1.5L Pepsi bottle.",
    itemsIncluded: ["9x Fried Chicken Pcs", "1x 1.5L Pepsi"],
    image: "images/family_bucket.jpg"
  },
  {
    id: "family-value-bucket",
    name: "Value Bucket (15 Pcs)",
    category: "Family Deals",
    price: 3450,
    badge: "Party Size",
    description: "15 Pieces of crisp golden chicken with 1.5L beverage for large gatherings.",
    itemsIncluded: ["15x Fried Chicken Pcs", "1x 1.5L Drink"],
    image: "images/family_bucket.jpg"
  },

  // --- SNACKS ---
  {
    id: "snack-fries-reg",
    name: "French Fries (Regular)",
    category: "Snacks",
    price: 270,
    badge: "Crispy",
    description: "Golden, salted crispy french fries cooked fresh to order.",
    itemsIncluded: ["1x Portion Regular Fries"],
    image: "images/crispy_fries.jpg"
  },
  {
    id: "snack-fries-large",
    name: "French Fries (Bucket / Large)",
    category: "Snacks",
    price: 450,
    badge: "Large",
    description: "Extra large bucket of golden hot fries seasoned with light salt.",
    itemsIncluded: ["1x Bucket Fries"],
    image: "images/crispy_fries.jpg"
  },
  {
    id: "snack-hot-shots",
    name: "Hot Shots (9 Pcs)",
    category: "Snacks",
    price: 490,
    badge: "Spicy",
    description: "Bite-sized chicken chunks tossed in fiery chili seasoning.",
    itemsIncluded: ["9x Hot Shots Chunks"],
    image: "images/hot_wings.jpg"
  },
  {
    id: "snack-dinner-roll",
    name: "Dinner Roll",
    category: "Snacks",
    price: 60,
    badge: "Side",
    description: "Soft, warm freshly baked dinner bread roll.",
    itemsIncluded: ["1x Soft Bread Roll"],
    image: "images/signature_box.jpg"
  },
  {
    id: "snack-garlic-dip",
    name: "Garlic Mayo Dip",
    category: "Snacks",
    price: 80,
    badge: "Sauce",
    description: "Creamy garlic mayo dipping sauce.",
    itemsIncluded: ["1x Dip Cup"],
    image: "images/signature_box.jpg"
  },

  // --- BEVERAGES ---
  {
    id: "bev-pepsi-345",
    name: "Pepsi 345ml",
    category: "Beverages",
    price: 140,
    badge: "Chilled",
    description: "Cold, refreshing 345ml bottle of Pepsi Cola.",
    itemsIncluded: ["1x 345ml Pepsi Bottle"],
    image: "images/family_bucket.jpg"
  },
  {
    id: "bev-7up-345",
    name: "7UP 345ml",
    category: "Beverages",
    price: 140,
    badge: "Chilled",
    description: "Crisp lemon-lime flavored soft drink (345ml bottle).",
    itemsIncluded: ["1x 345ml 7UP Bottle"],
    image: "images/family_bucket.jpg"
  },
  {
    id: "bev-mirinda-345",
    name: "Mirinda 345ml",
    category: "Beverages",
    price: 140,
    badge: "Fruity",
    description: "Sparkling orange-flavored refreshing beverage.",
    itemsIncluded: ["1x 345ml Mirinda Bottle"],
    image: "images/family_bucket.jpg"
  },
  {
    id: "bev-pepsi-15l",
    name: "Pepsi 1.5 Liter",
    category: "Beverages",
    price: 280,
    badge: "Family Size",
    description: "1.5L bottle of chilled Pepsi ideal for family sharing.",
    itemsIncluded: ["1x 1.5L Pepsi Bottle"],
    image: "images/family_bucket.jpg"
  },
  {
    id: "bev-water",
    name: "Mineral Water (500ml)",
    category: "Beverages",
    price: 90,
    badge: "Pure",
    description: "Pure, purified drinking water bottle.",
    itemsIncluded: ["1x 500ml Water Bottle"],
    image: "images/family_bucket.jpg"
  },

  // --- SPECIAL DEALS ---
  {
    id: "deal-midnight-1",
    name: "Midnight Deal 1",
    category: "Deals",
    price: 520,
    badge: "Late Night",
    description: "Available late night: 1x Krunch Burger + 1 Pc Chicken + 345ml Drink.",
    itemsIncluded: ["1x Krunch Burger", "1x Chicken Pc", "1x 345ml Drink"],
    image: "images/signature_box.jpg"
  },
  {
    id: "deal-student-box",
    name: "Student Value Deal",
    category: "Deals",
    price: 499,
    badge: "Budget Friendly",
    description: "Special deal for students: Krunch Burger + Regular Fries + Drink.",
    itemsIncluded: ["1x Krunch Burger", "1x Small Fries", "1x Drink"],
    image: "images/signature_box.jpg"
  }
];

// 2. Render Card HTML using Real Stock Image Assets
function createCardHTML(item) {
  return `
  <article class="food-card" data-id="${item.id}" data-category="${item.category}" data-price="${item.price}">
    <div class="card-img-wrapper">
      ${item.badge ? `<span class="card-badge ${item.badge === 'Bestseller' || item.badge === 'Top Seller' ? 'gold' : ''}">${item.badge}</span>` : ''}
      <img src="${item.image}" alt="${item.name}" loading="lazy" style="width:100%; height:100%; object-fit:cover; display:block;">
    </div>
    <div class="card-body">
      <span class="card-category">${item.category}</span>
      <h3 class="card-title">${item.name}</h3>
      <p class="card-desc">${item.description}</p>
      <div class="card-footer">
        <div class="card-price">
          <span class="price-label">Price</span>
          <span class="price-value">Rs. ${item.price.toLocaleString()}</span>
        </div>
        <button class="btn-card-details" onclick="openItemModal('${item.id}')">View Details</button>
      </div>
    </div>
  </article>
  `;
}

// 3. Render Grid to Container
function renderMenuGrid(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>No matching items found</h3>
        <p>Try searching with another keyword or select a different category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(createCardHTML).join('');
}

// 4. Render Price Comparison Table
function renderPriceTable(tableId, items) {
  const tableContainer = document.getElementById(tableId);
  if (!tableContainer) return;

  let tableHTML = `
    <table class="price-table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Category</th>
          <th>Price (PKR)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  items.forEach(item => {
    tableHTML += `
      <tr>
        <td class="table-item-name">${item.name}</td>
        <td><span class="table-category-badge">${item.category}</span></td>
        <td class="table-price-tag">Rs. ${item.price.toLocaleString()}</td>
        <td><button class="btn-card-details" onclick="openItemModal('${item.id}')">Details</button></td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  tableContainer.innerHTML = tableHTML;
}

// 5. Modal Popup Handler
function openItemModal(itemId) {
  const item = KFC_MENU_DATA.find(i => i.id === itemId);
  if (!item) return;

  const modalOverlay = document.getElementById('item-modal');
  const modalContainer = document.getElementById('modal-content-area');
  if (!modalOverlay || !modalContainer) return;

  modalContainer.innerHTML = `
    <button class="modal-close-btn" onclick="closeItemModal()">&times;</button>
    <div class="modal-img-wrapper" style="height:260px; overflow:hidden;">
      <img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; display:block;">
    </div>
    <div class="modal-content">
      <span class="modal-category">${item.category}</span>
      <h2 class="modal-title">${item.name}</h2>
      <div class="modal-price">Rs. ${item.price.toLocaleString()}</div>
      <p class="modal-desc">${item.description}</p>
      
      ${item.itemsIncluded && item.itemsIncluded.length > 0 ? `
        <div class="modal-includes">
          <h4>Meal Includes:</h4>
          <ul>
            ${item.itemsIncluded.map(inc => `<li>${inc}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div class="disclaimer-banner" style="margin-bottom:0;">
        <span class="icon">ℹ️</span>
        <div>
          Prices are for informational purposes only and subject to location variance or official KFC updates.
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

// 6. Interactive Filtering & Search Initialization
function initMenuPage(currentCategory = 'All') {
  let activeCategory = currentCategory;
  let searchQuery = '';

  const searchInput = document.getElementById('menu-search-input');
  const searchClear = document.getElementById('search-clear-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function updateView() {
    let filtered = KFC_MENU_DATA.filter(item => {
      const matchCat = (activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase());
      const matchQuery = (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return matchCat && matchQuery;
    });

    renderMenuGrid('menu-grid-container', filtered);
    renderPriceTable('price-table-container', filtered);
  }

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

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category || 'All';
      updateView();
    });
  });

  // Initial render
  updateView();
}

// 7. Global FAQ Accordion Toggle
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
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

// 8. Navigation Drawer Controls
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

// 9. Back to Top Button Handler
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

// Global Modal Overlay Close Listener
document.addEventListener('click', (e) => {
  const modalOverlay = document.getElementById('item-modal');
  if (e.target === modalOverlay) {
    closeItemModal();
  }
});

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAccordions();
  initBackToTop();
});
