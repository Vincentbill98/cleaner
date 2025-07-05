// ==============================
// Initialize cart count on page load
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

// ==============================
// Add to Cart Function
// ==============================
function addToCart(button) {
  // Find the product-card container
  const card = button.closest('.product-card');

  const name = card.getAttribute('data-name');
  const price = card.getAttribute('data-price');

  // You could grab more info if needed (size, color, etc.)
  const product = {
    name,
    price,
    quantity: 1,
  };

  // Load existing cart or create new
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if product already in cart — increase qty instead
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }

  // Save back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count
  updateCartCount();
}

// ==============================
// Update Cart Count Badge
// ==============================
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalQty = 0;
  cart.forEach(item => {
    totalQty += item.quantity;
  });
  document.getElementById('cartCount').innerText = totalQty;
}
