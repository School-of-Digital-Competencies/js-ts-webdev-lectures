/**
 * This file contains examples of code that follows YAGNI and KISS principles
 * These are simplified, clean versions of the anti-patterns from antiPatterns.js
 */

// Example 1: Following YAGNI - Only implementing what's needed now
class SimpleProductManager {
    constructor() {
        this.products = new Map();
    }

    // Only implementing the current requirement: storing basic product info
    addProduct(name, price, description, image, category) {
        const productId = Date.now().toString();
        this.products.set(productId, { 
            name, 
            price, 
            description, 
            image, 
            category 
        });
        return productId;
    }

    // Add other methods only when they are actually needed
    getProduct(productId) {
        return this.products.get(productId);
    }
}

// Example 2: Following KISS - Keeping the calculation simple and straightforward
function calculateProductTotal(products) {
    return products.reduce((total, product) => {
        const price = parseFloat(product.price.replace('$', ''));
        return total + price;
    }, 0);
}

// Example 3: Following both YAGNI and KISS
class ProductFormatter {
    formatProductName(product) {
        return product.name.toUpperCase();
    }
}

// Usage examples of clean patterns
// Example 1: Using SimpleProductManager
const productManager = new SimpleProductManager();

// Adding a product with just the necessary data
const mmProductId = productManager.addProduct(
    "M&M Jar",
    "$13.99",
    "They've graduated — now it's time to celebrate!",
    "mmjar.jpg",
    "sweet-stuff"
);

// Example 2: Using simple price calculation
const sampleProducts = [
    {
        name: "M&M Jar",
        price: "$13.99",
        category: "sweet-stuff"
    },
    {
        name: "Macarons",
        price: "$3.99",
        category: "cookies"
    }
];

const totalPrice = calculateProductTotal(sampleProducts);
console.log('Simple total price:', totalPrice); // Output: 17.98

// Example 3: Using ProductFormatter for a simple task
const productFormatter = new ProductFormatter();

// Just format the product name, nothing more
const formattedName = productFormatter.formatProductName({
    name: "Jellybeans",
    price: "$2.99",
    description: "Jelly Belly Sours beans in bulk. Tasty and tart. Six sour flavors.",
    image: "jellybeans.jpg",
    category: "sweet-stuff"
});

console.log('Formatted product name:', formattedName); // Output: JELLYBEANS