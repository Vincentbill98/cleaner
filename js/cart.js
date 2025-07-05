document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  document.getElementById("checkoutBtn").addEventListener("click", toggleCheckout);
  updateCartCount();
});

function displayCartItems() {
  const cartContainer = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card h-100 p-3">
          <h5>${item.name}</h5>
          <p>${item.description || 'No description available.'}</p>
          <p>Price: KSH ${item.price}</p>
        </div>
        <button class="btn btn-danger btn-sm mt-2 w-100" onclick="removeItem(${index})">Remove</button>
      `;

      cartContainer.appendChild(col);
    });
  }

  document.getElementById("totalPrice").textContent = total;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
  }
}

function toggleCheckout() {
  const checkoutSection = document.getElementById("checkoutSection");
  checkoutSection.style.display = checkoutSection.style.display === "none" ? "block" : "none";
}

function togglePaymentFields() {
  const paymentMethod = document.getElementById("paymentMethod").value;
  const mpesaSection = document.getElementById("mpesaSection");
  const cardSection = document.getElementById("cardSection");

  if (paymentMethod === "mpesa") {
    mpesaSection.style.display = "block";
    cardSection.style.display = "none";
  } else {
    mpesaSection.style.display = "none";
    cardSection.style.display = "block";
  }
}

function completeCheckout() {
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (paymentMethod === "mpesa") {
    const mpesaNumber = document.getElementById("mpesaNumber").value.trim();
    if (!mpesaNumber) {
      alert("Please enter your M-Pesa number.");
      return;
    }
  } else {
    const cardNumber = document.getElementById("cardNumber").value.trim();
    if (!cardNumber) {
      alert("Please enter your card number.");
      return;
    }
  }

  alert("Payment successful! Thank you for your order.");
  localStorage.removeItem("cart");
  displayCartItems();
  document.getElementById("checkoutSection").style.display = "none";
  document.getElementById("totalPrice").textContent = "0";
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").textContent = cart.length;
}
