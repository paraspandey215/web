// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart data to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display cart items in the checkout page
function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const checkoutTotalElement = document.getElementById('checkout-total');

    cartItemsElement.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: ₹${item.price.toFixed(2)}</p> <!-- Display in INR -->
            <p>Quantity: ${item.quantity}</p>
            <p>Item Total: ₹${itemTotal.toFixed(2)}</p> <!-- Display in INR -->
            <hr>
        `;
        cartItemsElement.appendChild(itemElement);
    });

    checkoutTotalElement.textContent = totalPrice.toFixed(2); // Display in INR
}

// Function to handle "Buy Now" button click
document.getElementById('buy-now-button').addEventListener('click', () => {
    document.getElementById('buy-now-section').style.display = 'none'; // Hide the Buy Now button
    document.getElementById('delivery-form-section').style.display = 'block'; // Show the delivery form
});

// Function to handle form submission
document.getElementById('delivery-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // Simple validation: check if all fields are filled
    if (!state || !city || !pincode || !address || !phone) {
        alert('Please fill out all fields.');
        return;
    }

    // Create delivery details object
    const deliveryDetails = {
        state: state,
        city: city,
        pincode: pincode,
        address: address,
        phone: phone
    };

    // Save the delivery details to localStorage
    localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));

    // Display the order summary
    displayOrderSummary();

    // Hide the delivery form after submission
    document.getElementById('delivery-form-section').style.display = 'none';
    document.getElementById('order-summary-section').style.display = 'block'; // Show the order summary
});

// Function to display the order summary
function displayOrderSummary() {
    const orderSummaryElement = document.getElementById('order-summary-details');
    const deliveryDetails = JSON.parse(localStorage.getItem('deliveryDetails')) || {};
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    orderSummaryElement.innerHTML = ''; // Clear previous order details

    // Display cart items
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'order-summary-item';
        itemElement.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>Price: ₹${item.price.toFixed(2)}</p> <!-- Display in INR -->
            <p>Quantity: ${item.quantity}</p>
            <p>Item Total: ₹${itemTotal.toFixed(2)}</p> <!-- Display in INR -->
            <hr>
        `;
        orderSummaryElement.appendChild(itemElement);
    });

    // Display delivery details
    orderSummaryElement.innerHTML += `
        <h3>Delivery Details</h3>
        <p><strong>State:</strong> ${deliveryDetails.state}</p>
        <p><strong>City:</strong> ${deliveryDetails.city}</p>
        <p><strong>Pincode:</strong> ${deliveryDetails.pincode}</p>
        <p><strong>Address:</strong> ${deliveryDetails.address}</p>
        <p><strong>Phone:</strong> ${deliveryDetails.phone}</p>
        <hr>
    `;

    // Display total price
    orderSummaryElement.innerHTML += `
        <h3>Total Price: ₹${totalPrice.toFixed(2)}</h3>
    `;
}

// Function to handle "Confirm Order" button click
document.getElementById('confirm-order-button').addEventListener('click', () => {
    // Simulate order confirmation (for now, just clear the cart and delivery details)
    localStorage.removeItem('cart');
    localStorage.removeItem('deliveryDetails');

    document.getElementById('confirmation-message').style.display = 'block';
    document.getElementById('confirmation-message').textContent = 'Your order has been confirmed! Thank you for shopping with us.';

    // Hide the order summary and show the confirmation message
    document.getElementById('order-summary-section').style.display = 'none';
});

// Load cart display on page load
displayCart();
