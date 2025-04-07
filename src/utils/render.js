import { ProductList } from "../components/ProductList.js";

/**
 * Renders products based on selected category
 * @param {string} category - Category to filter products by. 'all' shows all products
 * @param {HTMLElement} container - DOM element to render products into
 */
export function renderProducts(products, category, container) {
  // Clear existing products from container
  container.innerHTML = "";

  // Filter products based on category
  const filteredProducts = products.filter(
    (product) => category === "all" || product.category === category
  );

  // Create and append product list with filtered products
  container.append(ProductList(filteredProducts));
}
