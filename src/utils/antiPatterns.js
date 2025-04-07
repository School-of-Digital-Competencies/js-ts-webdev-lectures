/**
 * This file contains examples of code that violates YAGNI and KISS principles
 * These examples are intentionally bad and should not be used in production
 */

// Example 1: Violating YAGNI - Adding unnecessary complexity for future use
class SuperComplexProductManager {
    constructor() {
        this.products = new Map();
        this.productInventory = new Map();
        this.productReviews = new Map();
        this.productSuppliers = new Map();
        this.productPriceHistory = new Map();
        this.productPromotions = new Map();
        this.productAnalytics = new Map();
        this.productShippingRules = new Map();
        this.productWarrantyInfo = new Map();
        this.productSeasonalData = new Map();
    }

    // Current requirement: Just store basic product info
    addProduct(name, price, description, image, category) {
        const productId = Date.now().toString();
        this.products.set(productId, { name, price, description, image, category });
        
        // Unnecessary initialization of future features
        this.productInventory.set(productId, {
            inStock: 0,
            reservedStock: 0,
            warehouseLocations: [],
            reorderPoints: {},
            supplierLeadTimes: {}
        });
        this.productReviews.set(productId, {
            ratings: [],
            comments: [],
            verifiedPurchases: new Set(),
            helpfulVotes: new Map()
        });
        this.productSuppliers.set(productId, {
            primarySupplier: null,
            backupSuppliers: [],
            supplierContracts: new Map(),
            supplierRatings: {}
        });
        this.productPriceHistory.set(productId, {
            priceChanges: [],
            competitorPrices: new Map(),
            marketAnalysis: {}
        });
        this.productPromotions.set(productId, {
            activePromotions: [],
            scheduledPromotions: [],
            promotionPerformance: new Map()
        });
        
        return productId;
    }
}

// Example 2: Violating KISS - Overcomplicating a simple task
function calculateProductTotal(products) {
    // Simple task: Calculate total price of products
    // But let's make it unnecessarily complex
    
    return products.reduce((accumulator, currentProduct) => {
        const basePrice = parseFloat(currentProduct.price.replace('$', ''));
        const seasonalMultiplier = this.getSeasonalPriceMultiplier(currentProduct.category);
        const competitorPriceAdjustment = this.analyzeCompetitorPrices(currentProduct.name);
        const marketDemandFactor = this.calculateMarketDemand(currentProduct.category);
        const inventoryLevelDiscount = this.getInventoryBasedDiscount(currentProduct.name);
        const loyaltyTierMultiplier = 0.95; // 5% discount for loyalty
        const bundleDiscountEligibility = this.checkBundleEligibility(currentProduct);
        const shippingTierAdjustment = 1.1; // 10% markup for premium shipping
        
        const adjustedPrice = basePrice * 
            seasonalMultiplier * 
            competitorPriceAdjustment * 
            marketDemandFactor * 
            (1 - inventoryLevelDiscount) * 
            loyaltyTierMultiplier *
            (bundleDiscountEligibility ? 0.9 : 1) *
            shippingTierAdjustment;
        
        return accumulator + adjustedPrice;
    }, 0);
}

// Example 3: Violating both YAGNI and KISS
class UniversalProductProcessor {
    constructor() {
        this.productTransformers = new Map();
        this.cache = new Map();
        this.analytics = new Map();
        this.validationRules = new Map();
        this.errorHandlers = new Map();
        this.loggingSystems = new Map();
        this.metricsCollectors = new Map();
    }

    processProduct(product, options = {}) {
        // Current requirement: Just format product name for display
        // But let's add tons of unnecessary features
        
        const startTime = performance.now();
        
        // Initialize all systems even though we don't need them
        this.initializeAnalytics();
        this.setupValidation();
        this.configureLogging();
        this.prepareMetrics();
        
        // Cache the result even though we might never need it again
        const cacheKey = JSON.stringify(product);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        // Simple task made complex
        const result = {
            ...product,
            name: product.name.split('')
                .map(char => char.toUpperCase())
                .join(''),
            processedTimestamp: new Date(),
            processingMetadata: {
                processingTime: null,
                processingNode: 'node-1',
                processingBatch: Date.now(),
                processingVersion: '1.0.0'
            }
        };
        
        // Store unnecessary data
        this.cache.set(cacheKey, result);
        this.analytics.set(cacheKey, {
            processingTime: performance.now() - startTime,
            timestamp: new Date(),
            productCategory: product.category,
            processingPath: 'standard',
            systemLoad: this.getSystemLoad(),
            cacheHitRate: this.calculateCacheHitRate()
        });
        
        result.processedTimestamp.processingTime = performance.now() - startTime;
        return result;
    }

    // Unnecessary methods that might be needed in the future
    initializeAnalytics() {
        // Complex analytics initialization
    }

    setupValidation() {
        // Complex validation setup
    }

    configureLogging() {
        // Complex logging configuration
    }

    prepareMetrics() {
        // Complex metrics preparation
    }

    getSystemLoad() {
        return Math.random(); // Simulated system load
    }

    calculateCacheHitRate() {
        return Math.random(); // Simulated cache hit rate
    }
}

// Usage examples of anti-pattern code
// Example 1: Using SuperComplexProductManager
const productManager = new SuperComplexProductManager();

// Adding a simple M&M product with unnecessary complexity
const mmProductId = productManager.addProduct(
    "M&M Jar",
    "$13.99",
    "They've graduated — now it's time to celebrate!",
    "mmjar.jpg",
    "sweet-stuff"
);

// Example 2: Using overcomplicated price calculation
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

// This will fail because the required methods are not implemented
try {
    const totalPrice = calculateProductTotal(sampleProducts);
    console.log('Overcomplicated total price:', totalPrice);
} catch (error) {
    console.log('Price calculation failed due to overcomplexity:', error.message);
}

// Example 3: Using UniversalProductProcessor for a simple task
const productProcessor = new UniversalProductProcessor();

// Just to format product name to uppercase, but with unnecessary complexity
const processedProduct = productProcessor.processProduct({
    name: "Jellybeans",
    price: "$2.99",
    description: "Jelly Belly Sours beans in bulk. Tasty and tart. Six sour flavors.",
    image: "jellybeans.jpg",
    category: "sweet-stuff"
});

console.log('Processed product with unnecessary complexity:', processedProduct);

// The result will contain lots of unnecessary data:
// - Cached version of the product
// - Processing analytics
// - System metrics
// - Performance data
// - Metadata
// When all we needed was: processedProduct.name === "JELLYBEANS" 