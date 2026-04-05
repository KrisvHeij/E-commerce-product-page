const navBtn = document.getElementById("nav-button");
const shoppingCart = document.getElementById("shopping-cart");
const cartBtn = document.getElementById("cart-btn");
const prevImageBtn = document.getElementById("previous-button");
const nextImageBtn = document.getElementById("next-button");
const slides = document.querySelectorAll(".image-gallery-inner img");
const minBtn = document.querySelector(".quantity-min");
const plusBtn = document.querySelector(".quantity-plus");
const quantitytInput = document.querySelector(".product-quantity input");
const thumbnailsBtns = document.querySelectorAll(".image-thumbnails-inner button");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartContent = document.querySelector(".cart-content");

let quantity = parseInt(quantitytInput.value);
let currentIndex = 0;
let cart = [];

// Open & Close navigation
if (navBtn) {
  const primaryNav = document.getElementById("primary-nav");
  const navIcon = navBtn.querySelector("img");
  const darkBg = document.querySelector(".dark-bg");

  navBtn.addEventListener("click", () => {
    primaryNav.classList.toggle("show-primary-nav");
    darkBg.classList.toggle("visually-hidden");
    
    primaryNav.classList.contains("show-primary-nav") ? navIcon.src =        "./images/icon-close.svg" : navIcon.src = "./images/icon-menu.svg";   
  })
}

// Image slider/gallery for mobile/tablets screen size
function slideImage(btn) {
  const imageContainer = document.querySelector(".image-gallery-inner");
  
  if (btn.id === "previous-button") {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }
    
  if (btn.id === "next-button") {
    if (currentIndex < (slides.length - 1)) {
      currentIndex++;
    }
  }  

  imageContainer.style.transform = `translateX(-${currentIndex * 100}%)`;  
}

// Show thumbnail in image slide/gallery on desktop screen size
function showThumbnail(target) {
  const currentBtn = target.closest("button").dataset.image;

  if (currentBtn) {
    slides[0].src = `./images/image-product-${currentBtn}.jpg`;
  }
}

// Show cart quantity icon
function showCartQuantityIcon() {
  const cartQuantityIcon = document.querySelector(".cart-quantity-icon");
  
  if (cart !== "") {
    cartQuantityIcon.removeAttribute("hidden");
  }
}

// Update order quantity input
function updateQuantity(target) {
  
  if (target.classList.contains("quantity-min")) {
    if (quantity > 1) {
      quantity--;
    }
  }

  if (target.classList.contains("quantity-plus")) {
    quantity++;
  }

  quantitytInput.value = quantity;
}

// Update Cart
function updateCart() {
  const productImage = document.getElementById("cart-img").src;
  const productName = document.querySelector(".product-name").innerText;
  const productPrice = document.querySelector(".product-price").innerText;
  const quantity = parseInt(quantitytInput.value);
  const productPriceInt = productPrice.replace(/[$.]/g, "") / 100;

  const newCartItem = {
    image: productImage,
    name: productName,
    price: productPriceInt,
    quantity: quantity,
    totalPrice: productPriceInt * quantity
  }

  cart.push(newCartItem);

  renderCart();
}

function renderCart() {
  cartContent.innerHTML = "";
  // if (cart) {
  //   cartContent.innerHTML = "";
  // } 

  cart.forEach((item) => {
    // New cart item
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    // Cart item image
    const itemImage = document.createElement("img");
    itemImage.src = item.image;
    // Cart item information
    const div = document.createElement("div");
    const itemName = document.createElement("p");
    itemName.className = "cart-item-name";
    itemName.innerText = item.name;
    const itemPrice = document.createElement("p");
    itemPrice.className = "cart-item-price";
    itemPrice.textContent = `$${item.price}.00 `;
    const itemQuantity = document.createElement("span");
    itemQuantity.className = "cart-item-quantity";
    itemQuantity.textContent = `x ${item.quantity}`;
    const totalPrice = document.createElement("span");
    totalPrice.className = "cart-item-price-total";
    totalPrice.textContent = ` $${item.totalPrice}.00`;

    itemPrice.append(itemQuantity, totalPrice);
    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";

    div.append(itemName, itemPrice);
    cartItem.append(itemImage, div, deleteBtn);

    cartContent.append(cartItem);
  })

  // Checkout button
  const checkoutBtn = document.createElement("button");
  checkoutBtn.className = "checkout-btn";
  checkoutBtn.textContent = "Checkout";

  cartContent.append(checkoutBtn);

  console.log(cart)
  
}

// Event listeners
// Show & hide shopping cart content
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
   shoppingCart.toggleAttribute("hidden");
  })
}

// Image slider
if (prevImageBtn && nextImageBtn) {
  [prevImageBtn, nextImageBtn].forEach((btn) => {
    btn.addEventListener("click", (e) => {
      slideImage(e.currentTarget);
    });
  })
}

// Quantity input
if (minBtn && plusBtn) {
  [minBtn, plusBtn].forEach((button) => {
    button.addEventListener("click", (e) => {
        updateQuantity(e.currentTarget);
    })
  })
}

// Show thumbnail in image slider
if (thumbnailsBtns) {
  thumbnailsBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
      showThumbnail(e.target);
    })
  })
}

// Add to cart 
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    updateCart();
  })
}
