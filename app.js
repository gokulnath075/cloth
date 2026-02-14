// ============================================================
// SHARED APP LOGIC — Navbar, Search, Toast, Mobile Menu
// ============================================================

// Called by each page AFTER injecting navbar/footer HTML
function initApp() {
  updateCartCount();
  updateWishlistCount();
  updateAuthUI();
  initSearch();
  initMobileMenu();

  window.addEventListener('cartUpdated', updateCartCount);
  window.addEventListener('wishlistUpdated', updateWishlistCount);
  window.addEventListener('authUpdated', updateAuthUI);
}

function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach(el => {
    const c = Store.getCartCount();
    el.textContent = c;
    el.style.display = c > 0 ? 'flex' : 'none';
  });
}

function updateWishlistCount() {
  document.querySelectorAll('.wishlist-count').forEach(el => {
    const c = Store.getWishlistCount();
    el.textContent = c;
    el.style.display = c > 0 ? 'flex' : 'none';
  });
}

function updateAuthUI() {
  const user = Store.getUser();
  document.querySelectorAll('.auth-link').forEach(el => {
    if (user) {
      el.innerHTML = `<span class="material-symbols-outlined">person</span>`;
      el.title = user.name;
    } else {
      el.innerHTML = `<span class="material-symbols-outlined">person_outline</span>`;
      el.title = 'Login / Signup';
    }
  });
}

function initSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  if (!searchInputs.length) return;

  searchInputs.forEach(input => {
    // Skip if already initialized
    if (input.dataset.searchInit) return;
    input.dataset.searchInit = 'true';

    // Find or create results container
    let resultsContainer = input.parentElement.querySelector('.search-results');
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.className = 'search-results';
      input.parentElement.appendChild(resultsContainer);
      input.parentElement.style.position = 'relative';
    }

    function doSearch() {
      const q = input.value.trim();
      if (q.length < 2) { resultsContainer.classList.remove('active'); return; }
      const results = searchProducts(q);
      if (results.length === 0) {
        resultsContainer.innerHTML = '<div style="padding:20px;text-align:center;color:var(--grey-400);font-size:.9rem;">No products found</div>';
      } else {
        resultsContainer.innerHTML = results.map(p => `
                    <a href="product.html?id=${p.id}" class="search-result-item">
                      <img src="${p.image}" alt="${p.name}">
                      <div class="sr-info">
                        <h4>${highlightMatch(p.name, q)}</h4>
                        <span>${formatPrice(p.price)}</span>
                      </div>
                    </a>
                `).join('');
      }
      resultsContainer.classList.add('active');
    }

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(doSearch, 200);
    });

    // Enter key navigates to first result
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = input.value.trim();
        if (q.length >= 2) {
          const results = searchProducts(q);
          if (results.length > 0) {
            window.location.href = 'product.html?id=' + results[0].id;
          } else {
            window.location.href = 'category.html?search=' + encodeURIComponent(q);
          }
        }
      }
    });

    // Click outside closes dropdown
    document.addEventListener('click', (e) => {
      if (!input.parentElement.contains(e.target)) resultsContainer.classList.remove('active');
    });

    // Focus re-opens results if there's content
    input.addEventListener('focus', () => {
      if (input.value.trim().length >= 2 && resultsContainer.innerHTML.trim()) {
        resultsContainer.classList.add('active');
      }
    });
  });
}

function highlightMatch(text, query) {
  const regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return text.replace(regex, '<strong style="color:var(--gold-dark)">$1</strong>');
}

function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    toggle.innerHTML = menu.classList.contains('active')
      ? '<span class="material-symbols-outlined">close</span>'
      : '<span class="material-symbols-outlined">menu</span>';
  });
}

function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="material-symbols-outlined">${type === 'success' ? 'check_circle' : 'error'}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function quickAddToCart(productId) {
  const p = getProduct(productId);
  if (!p) return;
  Store.addToCart(productId, p.sizes[1] || p.sizes[0], p.colors[0], 1);
  showToast(`${p.name} added to cart`);
}

function toggleWishlistBtn(productId, btn) {
  Store.toggleWishlist(productId);
  const inWl = Store.isInWishlist(productId);
  if (btn) {
    btn.classList.toggle('wishlisted', inWl);
    btn.innerHTML = `<span class="material-symbols-outlined">${inWl ? 'favorite' : 'favorite_border'}</span>`;
  }
  showToast(inWl ? 'Added to wishlist' : 'Removed from wishlist');
}

function renderProductCard(p) {
  const discount = getDiscount(p.originalPrice, p.price);
  const inWl = Store.isInWishlist(p.id);
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="pc-image">
        <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}" loading="lazy"></a>
        ${p.badge ? `<span class="pc-badge badge ${p.badge === 'bestseller' ? 'badge-gold' : p.badge === 'new' ? 'badge-black' : 'badge-danger'}">${p.badge === 'bestseller' ? 'Best Seller' : p.badge === 'new' ? 'New' : 'Limited'}</span>` : ''}
        <div class="pc-actions">
          <button onclick="toggleWishlistBtn(${p.id}, this)" class="${inWl ? 'wishlisted' : ''}" title="Wishlist"><span class="material-symbols-outlined">${inWl ? 'favorite' : 'favorite_border'}</span></button>
          <button onclick="window.location.href='product.html?id=${p.id}'" title="Quick View"><span class="material-symbols-outlined">visibility</span></button>
        </div>
      </div>
      <div class="pc-info">
        <div class="pc-category">${p.category.replace('-', ' ')}</div>
        <h3 class="pc-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="pc-price">
          <span class="current">${formatPrice(p.price)}</span>
          <span class="original">${formatPrice(p.originalPrice)}</span>
          <span class="discount">${discount}% OFF</span>
        </div>
        <div class="pc-rating"><span class="stars">${getStars(p.rating)}</span> <span>(${p.reviews})</span></div>
        <button class="pc-cart-btn" onclick="quickAddToCart(${p.id})">Add to Cart</button>
      </div>
    </div>`;
}

// Build Navbar HTML
function getNavbarHTML() {
  return `
  <nav class="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo">PREMIUM<span>.</span></a>
      <div class="nav-links">
        <div class="nav-dropdown">
          <a href="category.html">Categories ▾</a>
          <div class="dropdown-menu">
            ${CATEGORIES.map(c => `<a href="category.html?cat=${c.id}">${c.name}</a>`).join('')}
          </div>
        </div>
        <a href="category.html?sort=newest">New Arrivals</a>
        <a href="category.html?sort=popular">Best Sellers</a>
        <a href="category.html?badge=limited">Limited Edition</a>
        <a href="track.html">Track Order</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="nav-search">
        <span class="material-symbols-outlined search-icon">search</span>
        <input type="text" class="search-input" placeholder="Search shirts...">
        <div class="search-results"></div>
      </div>
      <div class="nav-actions">
        <a href="login.html" class="auth-link" title="Account"><span class="material-symbols-outlined">person_outline</span></a>
        <a href="wishlist.html" title="Wishlist"><span class="material-symbols-outlined">favorite_border</span><span class="count-badge wishlist-count" style="display:none">0</span></a>
        <a href="cart.html" title="Cart"><span class="material-symbols-outlined">shopping_bag</span><span class="count-badge cart-count" style="display:none">0</span></a>
      </div>
      <button class="mobile-toggle"><span class="material-symbols-outlined">menu</span></button>
    </div>
  </nav>
  <div class="mobile-menu">
    <div class="mobile-search"><input type="text" class="search-input" placeholder="Search shirts..."></div>
    ${CATEGORIES.map(c => `<a href="category.html?cat=${c.id}">${c.name}</a>`).join('')}
    <a href="category.html?sort=newest">New Arrivals</a>
    <a href="category.html?sort=popular">Best Sellers</a>
    <a href="track.html">Track Order</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
    <a href="faq.html">FAQ</a>
  </div>`;
}

function getFooterHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="color:var(--white)">PREMIUM<span>.</span></a>
          <p>Redefining men's fashion with premium quality shirts and clothing. Crafted for the modern gentleman who values style and substance.</p>
          <div class="footer-social">
            <a href="#" title="Instagram">IG</a>
            <a href="#" title="Facebook">FB</a>
            <a href="#" title="Twitter">TW</a>
            <a href="#" title="Pinterest">PI</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          ${CATEGORIES.slice(0, 5).map(c => `<a href="category.html?cat=${c.id}">${c.name}</a>`).join('')}
        </div>
        <div class="footer-col">
          <h4>Help</h4>
          <a href="track.html">Track Order</a>
          <a href="policies.html">Shipping & Returns</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact Us</a>
          <a href="policies.html">Privacy Policy</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="about.html">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="policies.html">Terms & Conditions</a>
          <a href="#">Sustainability</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 PREMIUM. All rights reserved. Crafted with care in India.</p>
      </div>
    </div>
  </footer>`;
}
