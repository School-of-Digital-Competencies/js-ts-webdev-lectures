// Example of DRY principle violation in product context

// Price formatting logic duplication
export function formatPriceForDisplay(price) {
  return `$${parseFloat(price.replace("$", "")).toFixed(2)}`;
}

export function formatPriceForCart(price) {
  return `$${parseFloat(price.replace("$", "")).toFixed(2)}`;
}

export function formatPriceForCheckout(price) {
  return `$${parseFloat(price.replace("$", "")).toFixed(2)}`;
}

// Category checking logic duplication
export function isSweetStuff(product) {
  return product.category === "sweet-stuff";
}

export function isCookie(product) {
  return product.category === "cookies";
}

export function isCake(product) {
  return product.category === "cake";
}

// Filtering logic duplication
export function filterSweetStuff(products) {
  return products.filter((product) => product.category === "sweet-stuff");
}

export function filterCookies(products) {
  return products.filter((product) => product.category === "cookies");
}

export function filterCakes(products) {
  return products.filter((product) => product.category === "cake");
}

// Usage example
const product = { name: "M&M Jar", price: "$13.99", category: "sweet-stuff" };

console.log("Display Price:", formatPriceForDisplay(product.price));
console.log("Cart Price:", formatPriceForCart(product.price));
console.log("Checkout Price:", formatPriceForCheckout(product.price));

console.log("Is Sweet Stuff:", isSweetStuff(product));
console.log("Is Cookie:", isCookie(product));
console.log("Is Cake:", isCake(product));
