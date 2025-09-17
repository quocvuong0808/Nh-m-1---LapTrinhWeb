// ELITARIO Whiskey Store - JavaScript Functionality

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

// Initialize all app functionality
function initializeApp() {
  initMobileMenu();
  initProductInteractions();
  initHeroSlider();
  initScrollEffects();
  initSearchFunctionality();
  initCartFunctionality();
  initWishlistFunctionality();
  initProductFilters();
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      this.classList.toggle("active");
    });
  }
}

// Product Interactions
function initProductInteractions() {
  // Add to Cart buttons
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      const productName = this.dataset.productName;
      const productPrice = this.dataset.productPrice;

      addToCart(productId, productName, productPrice);
      showNotification(`${productName} added to cart!`, "success");
    });
  });

  // Wishlist buttons
  const wishlistBtns = document.querySelectorAll(".wishlist-btn");
  wishlistBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      toggleWishlist(productId);
    });
  });

  // Product quick view
  const quickViewBtns = document.querySelectorAll(".quick-view-btn");
  quickViewBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      openQuickView(productId);
    });
  });
}

// Hero Slider Functionality
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.querySelector(".hero-prev");
  const nextBtn = document.querySelector(".hero-next");
  let currentSlide = 0;

  if (slides.length > 1) {
    // Auto-slide every 5 seconds
    setInterval(() => {
      nextSlide();
    }, 5000);

    if (prevBtn) {
      prevBtn.addEventListener("click", prevSlide);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", nextSlide);
    }
  }

  function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  function prevSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }
}

// Scroll Effects
function initScrollEffects() {
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Scroll to top button
  const scrollTopBtn = document.querySelector(".scroll-top-btn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero-section");
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// Search Functionality
function initSearchFunctionality() {
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");
  const searchResults = document.querySelector(".search-results");

  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleSearch, 300));
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        performSearch(query);
      }
    });
  }

  function handleSearch(e) {
    const query = e.target.value.trim();
    if (query.length > 2) {
      performSearch(query);
    } else if (searchResults) {
      searchResults.innerHTML = "";
      searchResults.classList.remove("active");
    }
  }
}

// Cart Functionality
function initCartFunctionality() {
  updateCartCount();

  // Cart toggle
  const cartToggle = document.querySelector(".cart-toggle");
  const cartSidebar = document.querySelector(".cart-sidebar");
  const cartOverlay = document.querySelector(".cart-overlay");

  if (cartToggle && cartSidebar) {
    cartToggle.addEventListener("click", () => {
      cartSidebar.classList.add("active");
      if (cartOverlay) cartOverlay.classList.add("active");
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", function () {
      cartSidebar.classList.remove("active");
      this.classList.remove("active");
    });
  }
}

// Wishlist Functionality
function initWishlistFunctionality() {
  updateWishlistCount();
}

// Product Filters
function initProductFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const sortSelect = document.querySelector(".sort-select");
  const priceRange = document.querySelector(".price-range");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const category = this.dataset.category;
      filterProducts(category);

      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      const sortBy = this.value;
      sortProducts(sortBy);
    });
  }

  if (priceRange) {
    priceRange.addEventListener("input", function () {
      const maxPrice = this.value;
      filterByPrice(maxPrice);
    });
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function addToCart(productId, productName, productPrice) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function toggleWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showNotification("Removed from wishlist", "info");
  } else {
    wishlist.push(productId);
    showNotification("Added to wishlist", "success");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElements = document.querySelectorAll(".cart-count");

  cartCountElements.forEach((element) => {
    element.textContent = cartCount;
    element.style.display = cartCount > 0 ? "block" : "none";
  });
}

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishlistCountElements = document.querySelectorAll(".wishlist-count");

  wishlistCountElements.forEach((element) => {
    element.textContent = wishlist.length;
    element.style.display = wishlist.length > 0 ? "block" : "none";
  });
}

function performSearch(query) {
  // Simulate search functionality
  console.log(`Searching for: ${query}`);
  // In a real app, this would make an API call
}

function filterProducts(category) {
  const products = document.querySelectorAll(".product-item");

  products.forEach((product) => {
    if (category === "all" || product.dataset.category === category) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function sortProducts(sortBy) {
  const productContainer = document.querySelector(".products-grid");
  const products = Array.from(document.querySelectorAll(".product-item"));

  products.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          Number.parseFloat(a.dataset.price) -
          Number.parseFloat(b.dataset.price)
        );
      case "price-high":
        return (
          Number.parseFloat(b.dataset.price) -
          Number.parseFloat(a.dataset.price)
        );
      case "name":
        return a.dataset.name.localeCompare(b.dataset.name);
      case "rating":
        return (
          Number.parseFloat(b.dataset.rating) -
          Number.parseFloat(a.dataset.rating)
        );
      default:
        return 0;
    }
  });

  products.forEach((product) => productContainer.appendChild(product));
}

function filterByPrice(maxPrice) {
  const products = document.querySelectorAll(".product-item");

  products.forEach((product) => {
    const price = Number.parseFloat(product.dataset.price);
    if (price <= maxPrice) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

function openQuickView(productId) {
  // Simulate quick view modal
  console.log(`Opening quick view for product: ${productId}`);
  // In a real app, this would open a modal with product details
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#3b82f6"
        };
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Newsletter Subscription
function initNewsletter() {
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        // Simulate newsletter subscription
        showNotification("Successfully subscribed to newsletter!", "success");
        this.reset();
      }
    });
  }
}

// Initialize newsletter on load
document.addEventListener("DOMContentLoaded", () => {
  initNewsletter();
});
