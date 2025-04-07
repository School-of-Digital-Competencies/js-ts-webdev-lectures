import { renderProducts } from "./utils/render.js";
import { products } from "./data/products.js";

// Get references to DOM elements
const container = document.getElementById("product-container");
const tabsContainer = document.querySelector(".tabs ul");

// Add event delegation for tab clicks
tabsContainer.addEventListener("click", function (event) {
  // Find closest li element that was clicked (or its parent)
  const tab = event.target.closest("li");
  if (!tab) {
    return; // Exit if click was not on a tab
  }

  // Update active tab styling
  document.querySelector(".tabs .is-active").classList.remove("is-active");
  tab.classList.add("is-active");

  // Render products for selected category
  renderProducts(products, tab.getAttribute("data-category"), container);
});

document.addEventListener("DOMContentLoaded", () => {
  // Initial render of all products
  renderProducts(products, "all", container);
});
