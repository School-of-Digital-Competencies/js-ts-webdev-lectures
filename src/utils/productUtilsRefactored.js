// Refactored code following DRY principle

// Single price formatting function
function formatPrice(price) {
    return `$${parseFloat(price.replace('$', '')).toFixed(2)}`;
}

// Single category checking function
function isCategory(product, category) {
    return product.category === category;
}

// Single category filtering function
function filterByCategory(products, category) {
    return products.filter(product => product.category === category);
}

// Category constants to avoid string typos
const CATEGORIES = {
    SWEET_STUFF: 'sweet-stuff',
    COOKIES: 'cookies',
    CAKE: 'cake'
};

// Usage example
const product = { name: 'M&M Jar', price: '$13.99', category: 'sweet-stuff' };

// Price formatting - one function for all cases
console.log('Display Price:', formatPrice(product.price));
console.log('Cart Price:', formatPrice(product.price));
console.log('Checkout Price:', formatPrice(product.price));

// Category checking - one function with different parameters
console.log('Is Sweet Stuff:', isCategory(product, CATEGORIES.SWEET_STUFF));
console.log('Is Cookie:', isCategory(product, CATEGORIES.COOKIES));
console.log('Is Cake:', isCategory(product, CATEGORIES.CAKE));

// Filtering - one function with different parameters
const products = [
    { name: 'M&M Jar', price: '$13.99', category: 'sweet-stuff' },
    { name: 'Macarons', price: '$3.99', category: 'cookies' },
    { name: 'Cupcakes', price: '$7.99', category: 'cake' }
];

const sweetStuff = filterByCategory(products, CATEGORIES.SWEET_STUFF);
const cookies = filterByCategory(products, CATEGORIES.COOKIES);
const cakes = filterByCategory(products, CATEGORIES.CAKE);

console.log('Filtered products:', { sweetStuff, cookies, cakes }); 