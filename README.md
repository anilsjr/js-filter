# JS Filter Product Catalog

A simple, beautiful product catalog built with JavaScript, HTML, and CSS. Products and categories are fetched from [dummyjson.com](https://dummyjson.com/). Users can filter products by category, and click on any product card to see detailed information.

## Features

- **All Product Categories**: Dynamically loads all categories from the live API.
- **Category Filtering**: Instantly filter products by category.
- **Responsive UI**: Beautiful, modern design with Bootstrap 5.
- **Product Details Page**: Click any product to see a dedicated details page with images, price, rating, description, and brand.
- **Add to Cart/Buy Now UI**: (Demo UI only, not functional yet)
- **Wishlist Icon**: (Demo UI only)

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
- `index.js` – JS logic for fetching and rendering products and categories
- `product.html` – Product detail page
- `style.css` – Custom styles

## How it works

- On load, fetches all products from [dummyjson.com](https://dummyjson.com/products?limit=1000)
- Renders all categories as filter buttons at the top
- Clicking a category filters the product list
- Clicking a product opens its detail page (`product.html?id=PRODUCT_ID`)

## Customization

- UI uses Bootstrap 5 and Bootstrap Icons via CDN
- Easily customizable by editing `style.css` and HTML files

## License

MIT
