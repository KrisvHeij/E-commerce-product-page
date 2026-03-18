const navBtn = document.getElementById("nav-button");
const prevBtn = document.getElementById("previous-button");
const nextBtn = document.getElementById("next-button");

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

// Image slider/gallery
const btns = [prevBtn, nextBtn];
const imageContainer = document.querySelector(".image-gallery-inner");
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const slide = e.target.closest(".image-button");

    let currentIndex = 0;
  
    if (slide.id === "previous-button") {
      currentIndex--;
      imageContainer.style.transform = "translateX(-100%)";
    }
    if (slide.id === "next-button") {
      currentIndex++;
      imageContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  })
})