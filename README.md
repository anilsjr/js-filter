# JS Filter Product Catalog

A simple, beautiful product catalog built with JavaScript, HTML, and CSS. Products and categories are fetched from [dummyjson.com](https://dummyjson.com/). Users can filter products by category, sort order, in-stock only, and click on any product card to see detailed information. Wishlist is persisted in localStorage. Dark mode supported.

## Features

- **All Product Categories**: Dynamically loads all categories from the live API.
- **Category Filtering**: Instantly filter products by category (via "Filter" drawer).
- **Sort by Price & Stock**: Filter drawer allows sort by price ascending/descending and "in stock only".
- **Wishlist**: Click heart icon to toggle wishlist for any product. Wishlist is stored in localStorage and persists across reloads. Works on both product list and detail pages.
- **Responsive UI**: Modern, beautiful design with Bootstrap 5 and dark mode toggle.
- **Product Details Page**: Click any product to see a dedicated details page with images, price, rating, description, and brand.
- **Add to Cart/Buy Now UI**: (Demo UI only, not functional yet)
- **Persistent Dark Mode**: Toggle in navbar, remembers your choice.

## Demo

![Product Catalog Screenshot](screenshot.png) <!-- Add your screenshot file -->

## Getting Started

1. **Clone this repository:**
   ```sh
   git clone https://github.com/anilsjr/js-filter.git
   ```
2. **Open `index.html` in your browser**  
   That's it! No build or server required.

## File Structure

- `index.html` – Main product list UI
- `index.js` – JS logic for fetching and rendering products and categories, filtering, sorting, wishlist, dark mode
- `product.html` – Product detail page (with wishlist support)
- `style.css` – Custom styles

## How it works

- On load, fetches all products from [dummyjson.com](https://dummyjson.com/products?limit=1000)
- Renders all categories as filter buttons in a modern drawer
- Clicking a category filters the product list
- Sort by price or "in stock only" from the drawer
- Clicking a product opens its detail page (`product.html?id=PRODUCT_ID`)
- Wishlist is stored in localStorage and works across all pages
- Toggle dark mode in the navbar

## License

MIT
