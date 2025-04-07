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

  // Get category from data attribute and render products
  const category = tab.getAttribute("data-category");
  renderProducts(products, category, container);
});

document.addEventListener("DOMContentLoaded", () => {
  // Initial render of all products
  renderProducts(products, "all", container);
});
