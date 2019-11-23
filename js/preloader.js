let fullPageWrapper = document.querySelector("div.full-page-wrapper");
let preloaderContainer = document.querySelector("div.preloader-container");
let countdown = document.querySelector("span.countdown");

setTimeout(function() {
  fullPageWrapper.style.display = "block";
}, 700);
setTimeout(function() {
  preloaderContainer.style.display = "none";
}, 1999);

let timeLeft = 1;
countdown.innerHTML = timeLeft;

let pageLoadTimer = setInterval(function() {
  timeLeft--;
  countdown.innerHTML = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(pageLoadTimer);
    countdown.innerHTML = 0;
  }
}, 1000);
