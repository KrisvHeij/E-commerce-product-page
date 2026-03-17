const navBtn = document.getElementById("nav-button");



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
