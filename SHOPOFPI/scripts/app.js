// Pi SDK Initialization
Pi.init({
    version: "2.0",
    sandbox: true, // Set to false for production
    appId: "[shopofpi]",
    apiKey: "[ixzrdn8np3w74tcalc5d8mc1x8dm4vduxy9zervl0zgwciroinlo3a9udhhqqnci]"
});

let currentLang = 'en';
let cart = [];

// Load Translations
async function loadTranslations(lang) {
    const response = await fetch(`../translations/${lang}.json`);
    return await response.json();
}

// Update UI Language
async function updateUI() {
    const translations = await loadTranslations(currentLang);
    document.getElementById('cartTitle').textContent = translations.cart;
    document.getElementById('checkoutBtn').textContent = translations.checkout;
}

// Product Template
const products = [
    { id: 1, name: "Pi T-Shirt", price: 10 },
    { id: 2, name: "Pi Hoodie", price: 25 }
];

// Render Products
function renderProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(product => `
        <div class="card mb-3">
            <div class="card-body">
                <h5>${product.name}</h5>
                <p>${document.querySelector('#price').textContent} ${product.price}</p>
                <button onclick="addToCart(${product.id})" class="btn btn-primary">
                    ${document.querySelector('#addToCart').textContent}
                </button>
            </div>
        </div>
    `).join('');
}

// Pi Payment Handler
async function handlePiPayment(total) {
    const payment = await Pi.createPayment({
        amount: total,
        memo: "SHOPOFPI Purchase"
    });
    console.log("Payment successful:", payment);
}

// Language Selector
document.getElementById('languageSelector').addEventListener('change', async (e) => {
    currentLang = e.target.value;
    await updateUI();
    renderProducts();
});

// Initialize App
(async () => {
    await updateUI();
    renderProducts();
})();