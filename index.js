const container = document.getElementById('row');
const categoriesList = document.getElementById('categories-list');
const sortAsc = document.getElementById('sortAsc');
const sortDesc = document.getElementById('sortDesc');
const inStockOnly = document.getElementById('inStockOnly');
const resultsCount = document.getElementById('results-count');
const themeToggleBtn = document.getElementById('theme-toggle');

let allProducts = [];
let allCategories = [];
let filter = {
  category: 'all',
  sort: 'asc',
  inStock: false,
};
let wishlist = new Set(JSON.parse(localStorage.getItem('wishlist') || '[]'));

// ------ THEME ------
function setTheme(theme) {
  document.documentElement.setAttribute("data-bs-theme", theme);
  localStorage.setItem('theme', theme);
  themeToggleBtn.innerHTML = theme === 'dark'
    ? '<i class="bi bi-brightness-high-fill"></i>'
    : '<i class="bi bi-moon-stars-fill"></i>';
}
themeToggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute("data-bs-theme");
  setTheme(current === "dark" ? "light" : "dark");
});
(function initTheme() {
  const stored = localStorage.getItem('theme');
  setTheme(stored === 'dark' ? 'dark' : 'light');
})();

// ------ FETCH PRODUCTS ------
async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=1000');
  const data = await res.json();
  allProducts = data.products;
  allCategories = Array.from(new Set(allProducts.map(p => p.category)));
  allCategories.unshift('all');
  renderCategories();
  renderProducts();
}
fetchProducts();

// ------ FILTER LOGIC ------
function renderCategories() {
  categoriesList.innerHTML = '';
  allCategories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'list-group-item list-group-item-action' +
      (filter.category === cat ? ' active' : '') +
      ' text-capitalize';
    btn.textContent = cat.replaceAll('-', ' ');
    btn.onclick = () => {
      filter.category = cat;
      document.querySelectorAll('.list-group-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    };
    categoriesList.appendChild(btn);
  });
}

// Listen for sort and stock filter changes
sortAsc.onchange = sortDesc.onchange = function() {
  filter.sort = this.value;
  renderProducts();
};
inStockOnly.onchange = function() {
  filter.inStock = this.checked;
  renderProducts();
};

// ------ WISHLIST LOGIC ------
function updateWishlistInStorage() {
  localStorage.setItem('wishlist', JSON.stringify(Array.from(wishlist)));
}

// ------ RENDER PRODUCTS ------
function renderProducts() {
  let products = allProducts.slice();
  if (filter.category !== 'all') {
    products = products.filter(p => p.category === filter.category);
  }
  if (filter.inStock) {
    products = products.filter(p => p.stock > 0);
  }
  products.sort((a, b) =>
    filter.sort === 'asc' ? a.price - b.price : b.price - a.price
  );
  resultsCount.textContent = products.length + ' products found';
  container.innerHTML = '';
  if (!products.length) {
    container.innerHTML = '<div class="col-12 text-center my-4"><h4>No products found.</h4></div>';
    return;
  }
  products.forEach(product => {
    const itemBox = document.createElement('div');
    itemBox.className = 'col col-sm-6 col-md-4 col-lg-3 mt-4';
    itemBox.innerHTML = `
      <div class="product-card shadow-lg rounded-4 h-100 hover-scale" style="cursor:pointer;" data-id="${product.id}">
        <div class="position-relative">
          <img src="${product.thumbnail}" class="product-image w-100 rounded-top-4" alt="Product" style="height:230px;object-fit:cover;">
          <button class="wishlist-btn shadow ${wishlist.has(product.id) ? "active" : ""}" data-id="${product.id}" aria-label="Wishlist">
            <i class="bi ${wishlist.has(product.id) ? "bi-heart-fill" : "bi-heart"}"></i>
          </button>
        </div>
        <div class="p-3">
          <span class="category-badge mb-2 d-inline-block badge bg-info text-dark">${product.category}</span>
          <h6 class="mb-1 text-truncate" title="${product.title}">${product.title}</h6>
          <p class="text-muted small text-truncate" title="${product.description}">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="price fw-bold fs-5 text-success">$${product.price}</span>
            <span class="badge bg-warning text-dark">${product.rating} ★</span>
          </div>
          <div class="d-flex justify-content-between gap-2">
            <button class="btn btn-primary btn-sm add-to-cart flex-fill">Add to Cart</button>
            <button class="btn btn-success btn-sm buy flex-fill">Buy Now</button>
          </div>
        </div>
      </div>
    `;
    // Card navigation
    itemBox.querySelector('.product-card').addEventListener('click', function(e) {
      if (e.target.closest('.wishlist-btn') || e.target.closest('.add-to-cart') || e.target.closest('.buy')) return;
      window.location.href = `product.html?id=${product.id}`;
    });
    // Wishlist button
    const wishBtn = itemBox.querySelector('.wishlist-btn');
    wishBtn.onclick = (e) => {
      e.stopPropagation();
      const prodId = product.id;
      if (wishlist.has(prodId)) {
        wishlist.delete(prodId);
      } else {
        wishlist.add(prodId);
      }
      updateWishlistInStorage();
      renderProducts();
    };
    container.appendChild(itemBox);
  });
}
