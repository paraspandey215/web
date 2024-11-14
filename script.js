// Retrieve cart data from localStorage on page load
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart data to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update the cart display
function updateCart() {
    const itemCountElement = document.getElementById('cart-item-count');
    const totalPriceElement = document.getElementById('cart-total');

    let itemCount = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        itemCount += item.quantity;
        totalPrice += item.price * item.quantity; // Price is already in INR
    });

    itemCountElement.textContent = itemCount;
    totalPriceElement.textContent = totalPrice.toFixed(2); // Display INR only

    // Save the cart to localStorage whenever it's updated
    saveCart();
}

// Function to add a product to the cart
function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productDiv = event.target.closest('.product');
        const productId = productDiv.getAttribute('data-product-id');
        const productName = productDiv.getAttribute('data-product-name');
        const productPrice = parseInt(productDiv.getAttribute('data-product-price')); // Price in INR

        const product = {
            id: productId,
            name: productName,
            price: productPrice
        };

        addToCart(product);
    });
});

// Add event listener for checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

// Load cart display on page load
updateCart();