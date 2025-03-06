const container = document.getElementById('row');
let datajson;
let categoryButtons = document.querySelectorAll('.category-buttons');

async function getData(categoryFiltered) {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    datajson = data;

    let categories = [...new Set(data.products.map(item => item.category))];
    categories.unshift('all');
    renderData(data, categoryFiltered);
}

function renderData(data, categoryFiltered) {
    container.innerHTML = '';

    data.products.forEach((product) => {
        let itemDetail = product.description;

        let itemBox = document.createElement('div');
        itemBox.classList.add('col', 'col-md-4', 'mt-3');

        if (categoryFiltered === "ALL" || categoryFiltered.toUpperCase() === product.category.toUpperCase()) {
            itemBox.innerHTML = `
                        <div class="product-card shadow-sm">
                            <div class="position-relative">
                                <img src="${product.thumbnail}" class="product-image w-100" alt="Product">
                                <button class="wishlist-btn">
                                    <i class="bi bi-heart"></i>
                                </button>
                            </div>
                            <div class="p-3">
                                <span class="category-badge mb-2 d-inline-block">${categoryFiltered}</span>
                                <h6 class="mb-1">${product.title}</h6>
                               
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="price">$${product.price}</span>
                                    
                                </div>
                                <div class="d-flex justify-content-between">
                                <button class="btn btn-primary add-to-cart">Add to Cart</button>
                                <button class="btn btn-success buy">Buy Now</button>
                            </div>
                            </div>
                        </div>
                    
            `;
            container.appendChild(itemBox);
        }
    });
}

categoryButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        categoryButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        let categoryFiltered = e.target.innerText.toUpperCase();
        getData(categoryFiltered);
    });
});

let categoryFiltered = 'ALL';
getData(categoryFiltered);

