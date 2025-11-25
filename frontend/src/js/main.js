// ===================================
// UBLIO - Main JavaScript
// ===================================

import productsData from '../data/products.json';

// === GLOBAL STATE ===
let cart = JSON.parse(localStorage.getItem('ublioCart')) || [];
let currentSlide = 0;
let currentTestimonial = 0;

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeader();
  initHeroCarousel();
  initCategories();
  initFeaturedProducts();
  initTestimonials();
  initNewsletter();
  updateCartCount();
});

// === THEME TOGGLE ===
function initTheme() {
  const savedTheme = localStorage.getItem('ublioTheme');
  if (savedTheme === 'dark') document.body.classList.add('dark-theme');

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      localStorage.setItem('ublioTheme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
  }
}

// === HEADER FUNCTIONS ===
function initHeader() {
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
      header.classList.remove('header-transparent');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}

// === HERO CAROUSEL ===
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');

  if (!slides.length) return;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
  });

  // Auto advance every 5 seconds
  setInterval(nextSlide, 5000);
}

// === CATEGORIES ===
function initCategories() {
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (!categoriesGrid) return;

  const categories = productsData.categories.filter(cat => cat.id !== 'collaboration');

  categoriesGrid.innerHTML = categories.map((category, index) => {
    const productCount = productsData.products.filter(p => p.category === category.id).length;
    const firstProduct = productsData.products.find(p => p.category === category.id);
    const imagePath = firstProduct ? getImagePath(firstProduct) : '/images/placeholder.jpg';

    return `
      <div class="category-card fade-in" style="animation-delay: ${index * 0.1}s;" onclick="window.location.href='/src/pages/categories/${category.id}.html?category=${category.id}'">
        <img src="${imagePath}" alt="${category.name}" class="category-image" loading="lazy">
        <div class="category-info">
          <h3 class="category-name">${category.name}</h3>
          <p class="category-count">${productCount} Products</p>
        </div>
      </div>
    `;
  }).join('');
}

// === FEATURED PRODUCTS ===
function initFeaturedProducts() {
  const featuredGrid = document.getElementById('featuredProducts');
  if (!featuredGrid) return;

  // Get bestseller products
  const featuredProducts = productsData.products
    .filter(p => p.badges && p.badges.includes('bestseller'))
    .slice(0, 8);

  featuredGrid.innerHTML = featuredProducts.map((product, index) => {
    return createProductCard(product, index);
  }).join('');

  // Add event listeners for add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const productId = btn.dataset.productId;
      addToCart(productId);
    });
  });
}

// === PRODUCT CARD CREATOR ===
function createProductCard(product, index = 0) {
  const imagePath = getImagePath(product);
  const badges = product.badges || [];

  return `
    <div class="product-card fade-in" style="animation-delay: ${index * 0.1}s;" onclick="window.location.href='/src/pages/products/product.html?id=${product.id}'">
      <div class="product-card-image-wrapper">
        <img src="${imagePath}" alt="${product.name}" class="product-card-image" loading="lazy">
        
        ${badges.length > 0 ? `
          <div class="product-card-badges">
            ${badges.map(badge => `
              <span class="badge badge-${badge}">${badge}</span>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="product-card-actions">
          <button class="icon-btn" aria-label="Add to wishlist" onclick="event.stopPropagation();">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button class="icon-btn add-to-cart-btn" aria-label="Add to cart" data-product-id="${product.id}" onclick="event.stopPropagation();">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="product-card-body">
        <p class="product-category">${getCategoryName(product.category)}</p>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">₹${formatPrice(product.price)}</p>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span class="rating-count">(${product.reviewCount})</span>
        </div>
      </div>
    </div>
  `;
}

// === TESTIMONIALS CAROUSEL ===
function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  if (!testimonials.length) return;

  function showTestimonial(index) {
    testimonials.forEach(card => card.classList.remove('active'));
    currentTestimonial = (index + testimonials.length) % testimonials.length;
    testimonials[currentTestimonial].classList.add('active');
  }

  // Auto-rotate every 6 seconds
  setInterval(() => {
    showTestimonial(currentTestimonial + 1);
  }, 6000);
}

// === NEWSLETTER ===
function initNewsletter() {
  const newsletterForm = document.getElementById('newsletterForm');
  if (!newsletterForm) return;

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;

    // Simulate subscription
    alert(`Thank you for subscribing! A confirmation email has been sent to ${email}`);
    newsletterForm.reset();
  });
}

// === CART FUNCTIONS ===
function addToCart(productId) {
  const product = productsData.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: getImagePath(product),
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  showCartNotification(product.name);
}

function saveCart() {
  localStorage.setItem('ublioCart', JSON.stringify(cart));
}

function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (!cartCount) return;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function showCartNotification(productName) {
  // Simple notification (you can enhance this with a better UI)
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.textContent = `${productName} added to cart!`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--color-primary);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// === UTILITY FUNCTIONS ===
function getImagePath(product) {
  if (!product.images || product.images.length === 0) {
    return '/images/placeholder.jpg';
  }

  const categoryFolderMap = {
    'headphones': 'headphones',
    'studio-headphones': 'studio-headphones',
    'earbuds': 'earbuds',
    'speakers': 'speakers',
    'soundbars': 'soundbars',
    'home-theatre': 'home-theatre',
    'turntable': 'turntable',
    'spectacles': 'spectacles',
    'collaboration': 'collaboration'
  };

  const folder = categoryFolderMap[product.category] || 'products';
  return `/images/products/${folder}/${product.images[0]}`;
}

function getCategoryName(categoryId) {
  const category = productsData.categories.find(c => c.id === categoryId);
  return category ? category.name : '';
}

function formatPrice(price) {
  return price.toLocaleString('en-IN');
}

// === SEARCH FUNCTIONALITY ===
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    window.location.href = '/src/pages/search.html';
  });
}

// === EXPORT FOR OTHER MODULES ===
export { cart, addToCart, updateCartCount, productsData, getImagePath, getCategoryName, formatPrice, createProductCard };
