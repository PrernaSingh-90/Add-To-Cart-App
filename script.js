const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2999,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2599,
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1599,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 4,
    name: "Leather Backpack",
    price: 2499,
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 999,
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 1299,
    img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
  },
];

let cart = JSON.parse(localStorage.getItem("myCart")) || [];

// DOM ElEMENTS
const productGrid = document.getElementById("productGrid");
const cartOverlay = document.getElementById("cartOverlay");
const cartSidebar = document.getElementById("cartSidebar");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

// FUNCTIONS
// Render Products
function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">₹${product.price}</p>
            <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>`
    )
    .join("");
}

// Add to Cart Logic
window.addToCart = (id) => {
  const product = products.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  openCart();
};

// Render Cart Items
function renderCartItems() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
        <div class="empty-cart-msg">
         <i class="fas fa-shopping-basket"></i>
         <p>Your Cart is Empty</p>
        </div>
        `;
  } else {
    cartItemsContainer.innerHTML = cart.map(
      (item) => `
            <div class="cart-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="item-details">
             <h4 class="item-name">${item.name}</h4>
             <p class="item-price">₹${item.price}</p>
              <div class="item-controls">   
             <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
             <span>${item.qty}</span>
             <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
             </div>
            </div>
             <i class="fas fa-trash-alt remove-btn" onclick="removeItem(${item.id})"></i>
            </div>
            `).join('');
  }
}

// Change Quantity (+/-)
window.changeQty = (id, change) => {
    const item = cart.find(item => item.id === id);
    if(item) {
        item.qty += change;
        if(item.qty <= 0) {
            removeItem(id);
        } else {
            updateCart();
        }
    }
};

// Remove Item
window.removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// Clear Cart
window.clearCart = () => {
    if(confirm("Are you sure you want to clear cart?")) {
        cart = [];
        updateCart();
    }
};

// update Cart
function updateCart() {
    const totalQty = cart.reduce((sum,item) => sum + item.qty, 0);
    cartCountEl.innerText = totalQty;

    const totalPrice = cart.reduce((sum, item) => sum + (item.price*item.qty), 0);
    cartTotalEl.innerText = `₹${totalPrice.toFixed(2)}`;

    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCartItems();
}

// Toggle UI
window.toggleCart = () => {
    cartSidebar.classList.toggle("open");
    cartOverlay.classList.toggle("open");
};

 // --- INITIALIZATION ---
    renderProducts();
    updateCart(); // Load saved cart data on refresh
