const navBtn = document.getElementById("nav-button");
const shoppingCart = document.getElementById("shopping-cart");
const cartBtn = document.getElementById("cart-btn");
const prevImageBtn = document.getElementById("previous-button");
const nextImageBtn = document.getElementById("next-button");
const sliderImageBtns = document.querySelectorAll(".image-button");
const slides = document.querySelectorAll(".slide-image");
const minBtn = document.querySelector(".quantity-min");
const plusBtn = document.querySelector(".quantity-plus");
const quantitytInput = document.querySelector(".product-quantity input");
const thumbnailsBtns = document.querySelectorAll(".image-thumbnails-inner button");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartContent = document.querySelector(".cart-content");
const cartQuantityIcon = document.querySelector(".cart-quantity-icon");
const mainImage = document.getElementById("image-gallery");

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

    primaryNav.classList.contains("show-primary-nav") ? navIcon.src = "./images/icon-close.svg" : navIcon.src = "./images/icon-menu.svg";
  })
}

// Show lightbox
function showLightbox(img) {
  const containerElement = img.closest("#image-gallery");
  
  if (containerElement) {
    
  }
}

// Slide image in container
function slideImage(btn) {
  const imageContainer = btn.closest(".image-container-slider");
  const imageGalleryInner = imageContainer.querySelector(".image-gallery-inner");
  
  if (btn.classList.contains("previous-button")) {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }

  if (btn.classList.contains("next-button")) {
    if (currentIndex < (slides.length - 1)) {
      currentIndex++;
    }
  }
  
  imageGalleryInner.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function removeThumbnailStyles() {
  thumbnailsBtns.forEach((btn) => {
    btn.style.outlineColor = "transparent";
    const thumbnailImage = btn.querySelector("img");
      if (thumbnailImage.classList.contains("opacity-50")) {
        thumbnailImage.classList.remove("opacity-50");
      }
  })
}

// Show thumbnail in image slide/gallery on desktop screen size
function showThumbnail(target) {
  removeThumbnailStyles();

  const currentBtn = target.closest("button").dataset.image;
  const currentBtnElement = target.closest("button");
  const currentBtnImage = currentBtnElement.querySelector("img");
  const sliderContainerOuter= target.closest(".slider-container-outer");
  const imageGalleryInner = sliderContainerOuter.querySelector(".image-gallery-inner");

  if (currentBtn) {
    imageGalleryInner.style.transform = `translateX(-${(currentBtn - 1) * 100}%)`;
    currentIndex = currentBtn - 1;

    currentBtnElement.style.outline = "solid 2px var(--c-orange-500)";
    currentBtnImage.classList.add("opacity-50");
  }
  
}

// Reset cart
function resetCart() {
  cartContent.innerHTML = "";
  cartQuantityIcon.setAttribute("hidden", "");

}

// Show cart quantity icon
function showCartQuantityIcon() {
  let totalItemsInCart = 0;

  cart.forEach((item) => totalItemsInCart += item.quantity);

  if (cart.length >= 1) {
    cartQuantityIcon.removeAttribute("hidden");
    cartQuantityIcon.textContent = totalItemsInCart;
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

// Delete cart item
function deleteCartItem(item) {
  const cartItem = item.closest("div.cart-item");
  const cartItemName = cartItem.querySelector(".cart-item-name").textContent;

  const index = cart.indexOf(cartItemName);

  if (index === -1) {
    cart.splice(index, 1);
  }

  renderCart();
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

  // Check for existing item in cart array
  const existingCartItem = cart.find((item) => item.name === newCartItem.name);

  if (existingCartItem) {
    existingCartItem.quantity += newCartItem.quantity;
  } else {
    cart.push(newCartItem);
  }

  renderCart();
}

function renderCart() {
  resetCart();

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
  if (cart.length >= 1) {
    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "checkout-btn";
    checkoutBtn.textContent = "Checkout";

    cartContent.append(checkoutBtn);
  } else {
    const p = document.createElement("p");
    p.className = "cart-empty-text";
    p.textContent = "Your cart is empty.";
    cartContent.append(p);
  }

  showCartQuantityIcon();
}

// Event listeners
// Show & hide shopping cart content
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    shoppingCart.toggleAttribute("hidden");
  })
}

// Image slider
// if (prevImageBtn && nextImageBtn) {
//   [prevImageBtn, nextImageBtn].forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       slideImage(e.currentTarget);
//     });
//   })
// }

if (sliderImageBtns) {
  sliderImageBtns.forEach((btn) => {
    currentIndex = 0;
    btn.addEventListener("click", (e) => {
      slideImage(e.currentTarget);
    })
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

// Delete cart item
if (shoppingCart) {
  shoppingCart.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      deleteCartItem(e.target);
    }
  })
}

// Show image lightbox
if (mainImage) {
  mainImage.addEventListener("click", (e) => {
    showLightbox(e.target);
  })
}