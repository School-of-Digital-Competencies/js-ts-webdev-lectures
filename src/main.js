// Product data array containing information about different items
const products = [
  {
    name: "M&M Jar",
    price: "$13.99",
    description: "They've graduated — now it's time to celebrate!",
    image: "mmjar.jpg",
    category: "sweet-stuff",
  },
  {
    name: "Macarons",
    price: "$3.99",
    description:
      "Flavors include: Original, Spearmint, Wintergreen, Mint Bliss, Wild Blueberry Twist.",
    image: "macarons.jpg",
    category: "cookies",
  },
  {
    name: "Jellybeans",
    price: "$2.99",
    description:
      "Jelly Belly Sours beans in bulk. Tasty and tart. Six sour flavors.",
    image: "jellybeans.jpg",
    category: "sweet-stuff",
  },
  {
    name: "Doughnuts",
    price: "$5.99",
    description: "Our original glazed doughnut with candy sprinkling!",
    image: "doughnnuts.jpg",
    category: "cake",
  },
  {
    name: "Cupcakes",
    price: "$7.99",
    description:
      "Our fruit cakes are the ideal choice for those who prefer a classic taste.",
    image: "cupcakes.jpg",
    category: "cake",
  },
  {
    name: "Fruit Jelly",
    price: "$4.99",
    description:
      "Large slices of fruity jelly made with real fruit juice and all natural colours.",
    image: "fruitjelly.jpg",
    category: "sweet-stuff",
  },
];

// Get references to DOM elements
const container = document.getElementById("product-container");
const tabsContainer = document.querySelector(".tabs ul");

/**
 * Creates DOM element for product card
 * @param {Object} product - Product object with name, price, description, image and category
 * @returns {HTMLElement} DOM element for product card
 */
function Product(product) {
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
        <p class="title is-5">${product.name}</p>
        <p class="subtitle is-6">${product.price}</p>
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

/**
 * Creates DOM element with list of products
 * @param {Array} products - Array of product objects to display
 * @returns {HTMLElement} DOM element containing product cards
 */
function ProductList(products) {
  const columns = document.createElement("div");
  columns.classList.add("columns", "is-multiline");
  
  products.forEach((product) => {
    columns.append(Product(product));
  });
    
  return columns;
}

/**
 * Renders products based on selected category
 * @param {string} category - Category to filter products by. 'all' shows all products
 */
function renderProducts(category) {
  // Clear existing products from container
  container.innerHTML = "";
  
  // Filter products based on category
  const filteredProducts = products.filter(
    (product) => category === "all" || product.category === category
  );
  
  // Create and append product list with filtered products
  container.append(ProductList(filteredProducts));
}

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
  renderProducts(tab.getAttribute("data-category"));
});

// Initial render of all products
renderProducts("all");
