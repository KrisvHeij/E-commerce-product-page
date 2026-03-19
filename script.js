const navBtn = document.getElementById("nav-button");
const prevBtn = document.getElementById("previous-button");
const nextBtn = document.getElementById("next-button");
const btns = [prevBtn, nextBtn];
const slides = document.querySelectorAll(".image-gallery-inner img");

let currentIndex = 0;

// Open/Close navigation
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

// Event listeners
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    slideImage(e.currentTarget);
  });
})