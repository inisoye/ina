let mobileMenuButton = document.getElementById("mobile-menu-button");
let closeMobileButton = document.getElementById("close-mobile-button");
let mobileMenu = document.getElementById("mobile-menu");
let bgWrapper = document.getElementById("bg-wrapper");
let pageMinusFooter = document.getElementById("page-minus-footer");
let footer = document.getElementById("footer");

let fullPageWrapper = document.querySelector("div.full-page-wrapper");

mobileMenu.style.display = "none";

mobileMenuButton.addEventListener("click", function() {
  if (mobileMenu.style.display == "none") {
    mobileMenu.style.display = "flex";
    bgWrapper.style.display = "none";
    pageMinusFooter.style.display = "none";
    footer.style.display = "none";

    // fullPageWrapper.style.border = "none"
  }
});

closeMobileButton.addEventListener("click", function() {
  if (mobileMenu.style.display !== "none") {
    mobileMenu.style.display = "none";
    bgWrapper.style.display = "block";
    pageMinusFooter.style.display = "block";
    footer.style.display = "flex";

    // fullPageWrapper.style.border = "rgb(255, 227, 133) 12px solid"
  }
});
