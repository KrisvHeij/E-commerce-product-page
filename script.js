const navBtn = document.getElementById("nav-button");
const shoppingCart = document.getElementById("shopping-cart");
const cartBtn = document.getElementById("cart-btn");
const prevImageBtn = document.getElementById("previous-button");
const nextImageBtn = document.getElementById("next-button");
const slides = document.querySelectorAll(".image-gallery-inner img");
const minBtn = document.querySelector(".quantity-min");
const plusBtn = document.querySelector(".quantity-plus");
const quantitytInput = document.querySelector(".product-quantity input");
const imageThumbnailsContainer = document.querySelector(".image-thumbnails-inner");

const thumbnailsBtns = document.querySelectorAll(".image-thumbnails-inner button");

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
  const currentBtn = target.closest("button");
  const currentImage = currentBtn.querySelector("img").dataset.imageNumber;

  if (currentImage) {
    slides[0].src = `./images/image-product-${currentImage}.jpg`;
  }
}

// Update order quantity input
function updateQuantity(target) {
  let quantity = parseInt(quantitytInput.value);
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
if (imageThumbnailsContainer) {
  imageThumbnailsContainer.addEventListener("click", (e) => {
    showThumbnail(e.target);
  })
}