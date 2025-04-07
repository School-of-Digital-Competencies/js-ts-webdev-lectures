import { ProductList } from "../components/ProductList.js";
import {
  filterSweetStuff,
  filterCookies,
  filterCakes,
} from "./productUtils.js";

/**
 * Renders products based on selected category
 * @param {Array} products - Array of products to render
 * @param {string} category - Category to filter products by. 'all' shows all products
 * @param {HTMLElement} container - DOM element to render products into
 */
export function renderProducts(products, category, container) {
  // Clear existing products from container
  container.innerHTML = "";

  // Filter products based on category if not showing all
  let filteredProducts = products;
  if (category !== "all") {
    switch (category) {
      case "sweet-stuff":
        filteredProducts = filterSweetStuff(products);
        break;
      case "cookies":
        filteredProducts = filterCookies(products);
        break;
      case "cake":
        filteredProducts = filterCakes(products);
        break;
    }
  }

  // Create and append product list with filtered products
  container.append(ProductList(filteredProducts));
}
