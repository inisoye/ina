let modeToggle = document.querySelector("a.desktop-mode-toggle.show-desktop");
let downOrUp = document.getElementById("down-or-up");
let lightOrDark = document.getElementById("light-or-dark");

modeToggle.addEventListener("click", function toggle() {
  var el = document.getElementById("default");
  if (el.href.match("css/home.css")) {
    el.href = "css/homeDark.css";
    downOrUp.innerHTML = "up";
    lightOrDark.innerHTML = "light";
  } else {
    el.href = "css/home.css";
    downOrUp.innerHTML = "down";
    lightOrDark.innerHTML = "dark";
  }
});
