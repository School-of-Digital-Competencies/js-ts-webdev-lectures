import {
  formatPriceForDisplay,
  isSweetStuff,
  isCookie,
  isCake,
} from "../utils/productUtils.js";

/**
 * Creates DOM element for product card
 * @param {Object} product - Product object with name, price, description, image and category
 * @returns {HTMLElement} DOM element for product card
 */
export function Product(product) {
  const column = document.createElement("div");
  column.classList.add("column", "is-one-third");

  column.innerHTML = `
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="./src/assets/${product.image}" alt="${product.name}">
        </figure>
      </div>
      <div class="card-content">
        
        <p class="subtitle is-6 ${
          isSweetStuff(product)
            ? "has-text-info"
            : isCookie(product)
            ? "has-text-success"
            : isCake(product)
            ? "has-text-danger"
            : "has-text-warning"
        }">${product.category}</p>
        <p class="title is-5">${product.name}</p>
        <p class="subtitle is-6">${formatPriceForDisplay(product.price)}</p>
        <p>${product.description}</p>
        <div class="buttons mt-3">
          <button class="button is-primary">Purchase</button>
          <button class="button is-light">Add to Bag</button>
        </div>
      </div>
    </div>
  `;

  return column;
}
