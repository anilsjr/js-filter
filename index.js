const container = document.getElementById('row');
let datajson;
const categoryContainer = document.getElementById('category-container');

async function getData(categoryFiltered = "ALL") {
  const response = await fetch('https://dummyjson.com/products?limit=1000');
  const data = await response.json();
  datajson = data;

  let categories = [...new Set(data.products.map(item => item.category))];
  categories.unshift('All');
  renderCategories(categories, categoryFiltered);
  renderData(data, categoryFiltered);
}

function renderCategories(categories, currentCategory) {
  categoryContainer.innerHTML = '';
  categories.forEach(category => {
    const button = document.createElement('button');
    button.classList.add('category-buttons', 'btn', 'btn-outline-primary', 'm-1', 'rounded-pill', 'shadow-sm');
    button.innerText = category.charAt(0).toUpperCase() + category.slice(1);
    if (currentCategory && currentCategory.toUpperCase() === category.toUpperCase()) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      document.querySelectorAll('.category-buttons').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      let categoryFiltered = category.toUpperCase();
      renderData(datajson, categoryFiltered);
    });
    categoryContainer.appendChild(button);
  });
}

function renderData(data, categoryFiltered) {
  container.innerHTML = '';
  const filteredProducts = categoryFiltered === "ALL"
    ? data.products
    : data.products.filter(product => product.category.toUpperCase() === categoryFiltered);

  if(filteredProducts.length === 0) {
    container.innerHTML = `<div class="col-12 text-center my-4"><h4>No products found.</h4></div>`;
    return;
  }

  filteredProducts.forEach((product) => {
    let itemBox = document.createElement('div');
    itemBox.classList.add('col', 'col-sm-6', 'col-md-4', 'col-lg-3', 'mt-4');

    itemBox.innerHTML = `
      <div class="product-card shadow-lg rounded-4 h-100 hover-scale" data-id="${product.id}" style="cursor:pointer;">
        <div class="position-relative">
          <img src="${product.thumbnail}" class="product-image w-100 rounded-top-4" alt="Product" style="height:230px;object-fit:cover;">
          <button class="wishlist-btn shadow">
            <i class="bi bi-heart"></i>
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

    itemBox.querySelector('.product-card').addEventListener('click', function(e) {
      // Prevent bubbling from inner buttons
      if (e.target.closest('button')) return;
      window.location.href = `product.html?id=${product.id}`;
    });

    container.appendChild(itemBox);
  });
}

getData();
