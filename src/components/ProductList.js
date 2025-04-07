import { Product } from "./Product.js";

/**
 * Creates DOM element with list of products
 * @param {Array} products - Array of product objects to display
 * @returns {HTMLElement} DOM element containing product cards
 */
export function ProductList(products) {
  const columns = document.createElement("div");
  columns.classList.add("columns", "is-multiline");

  products.forEach((product) => {
    columns.append(Product(product));
  });

  return columns;
}
