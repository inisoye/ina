// * dashbar buttons
let statusButton = document.getElementById("status-button");
let historyButton = document.getElementById("history-button");
let mapButton = document.getElementById("maps-button");
let forecastButton = document.getElementById("forecast-button");
let rankingsButton = document.getElementById("rankings-button");

let collapseButton = document.getElementById("collapse-button");
let collapseButtonImage = document.querySelector("button.collapse-button img");

// * old selectors (have been eliminated)
let mobileSelector = document.getElementById("mobile-selector");
let desktopSelector = document.getElementById("desktop-selector");

// * status section items
let formPlusResults = document.getElementById("forms-and-results");
let cardResults = document.getElementById("card-details");
// * for each card item
let resultCards = document.querySelectorAll("a.card");

// * error message
let historyMessage = document.querySelector("div.history-message");
let mapMessage = document.querySelector("div.map-message");
let forecastMessage = document.querySelector("div.forecast-message");
let rankingsMessage = document.querySelector("div.rankings-message");

statusButton.addEventListener("click", function() {
  statusButton.classList.add("selected");
  historyButton.classList.remove("selected");
  mapButton.classList.remove("selected");
  forecastButton.classList.remove("selected");
  rankingsButton.classList.remove("selected");

  collapseButton.style.borderColor = "#1b2429";
  collapseButtonImage.style.filter = "none";

  formPlusResults.style.display = "block";
  cardResults.style.display = "none";

  historyMessage.style.display = "none";
  mapMessage.style.display = "none";
  forecastMessage.style.display = "none";
  rankingsMessage.style.display = "none";
});

historyButton.addEventListener("click", function() {
  historyButton.classList.add("selected");
  statusButton.classList.remove("selected");
  mapButton.classList.remove("selected");
  forecastButton.classList.remove("selected");
  rankingsButton.classList.remove("selected");

  collapseButton.style.borderColor = "#9dbbca";
  collapseButtonImage.style.filter =
    "invert(76%) sepia(0%) saturate(0%) hue-rotate(51deg) brightness(88%) contrast(88%)";

  formPlusResults.style.display = "none";
  cardResults.style.display = "none";

  historyMessage.style.display = "block";
  mapMessage.style.display = "none";
  forecastMessage.style.display = "none";
  rankingsMessage.style.display = "none";
});

mapButton.addEventListener("click", function() {
  mapButton.classList.add("selected");
  statusButton.classList.remove("selected");
  historyButton.classList.remove("selected");
  forecastButton.classList.remove("selected");
  rankingsButton.classList.remove("selected");

  collapseButton.style.borderColor = "#9dbbca";
  collapseButtonImage.style.filter =
    "invert(76%) sepia(0%) saturate(0%) hue-rotate(51deg) brightness(88%) contrast(88%)";

  formPlusResults.style.display = "none";
  cardResults.style.display = "none";

  historyMessage.style.display = "none";
  mapMessage.style.display = "block";
  forecastMessage.style.display = "none";
  rankingsMessage.style.display = "none";
});

forecastButton.addEventListener("click", function() {
  forecastButton.classList.add("selected");
  statusButton.classList.remove("selected");
  historyButton.classList.remove("selected");
  mapButton.classList.remove("selected");
  rankingsButton.classList.remove("selected");

  collapseButton.style.borderColor = "#9dbbca";
  collapseButtonImage.style.filter =
    "invert(76%) sepia(0%) saturate(0%) hue-rotate(51deg) brightness(88%) contrast(88%)";

  formPlusResults.style.display = "none";
  cardResults.style.display = "none";

  historyMessage.style.display = "none";
  mapMessage.style.display = "none";
  forecastMessage.style.display = "block";
  rankingsMessage.style.display = "none";
});

rankingsButton.addEventListener("click", function() {
  rankingsButton.classList.add("selected");
  statusButton.classList.remove("selected");
  historyButton.classList.remove("selected");
  mapButton.classList.remove("selected");
  forecastButton.classList.remove("selected");

  collapseButton.style.borderColor = "#9dbbca";
  collapseButtonImage.style.filter =
    "invert(76%) sepia(0%) saturate(0%) hue-rotate(51deg) brightness(88%) contrast(88%)";

  formPlusResults.style.display = "none";
  cardResults.style.display = "none";

  historyMessage.style.display = "none";
  mapMessage.style.display = "none";
  forecastMessage.style.display = "none";
  rankingsMessage.style.display = "block";
});

let streetSelector = document.getElementById("street-selector");
//* post-typing reset on label and border color. idea source: https://stackoverflow.com/questions/4220126/run-javascript-function-when-user-finishes-typing-instead-of-on-key-up
let typingTimer;
let doneTypingInterval = 3500;

streetSelector.onkeyup = function() {
  //! Bit verifying input & filtering cards
  let streetInput = streetSelector.value.toLowerCase();

  let resultCards = document.getElementsByClassName("card");
  let fullAdds = document.querySelectorAll("p.full-add");

  for (i = 0; i < resultCards.length; i++) {
    if (fullAdds[i].innerHTML.toLowerCase().includes(streetInput)) {
      resultCards[i].style.display = "grid";
    } else {
      resultCards[i].style.display = "none";
    }
  }

  //! Bit providing feedback with labels and bottom border
  //* fullAddsOldArr is an array containing nodes of full addresses
  let fullAddsOldArr = Array.prototype.slice.call(fullAdds);

  //* push innerHTML content(actual text) into an empty string
  let fullAddsArr = [];
  for (i = 0; i < fullAddsOldArr.length; i++) {
    fullAddsArr.push(fullAddsOldArr[i].innerHTML);
  }

  let fullAddsStr = fullAddsArr.join(" ");
  //* get rid of spaces and commas
  //? consider adding these later, if they can match results
  // fullAddsStr = fullAddsStr.replace(/,/g, "");
  // fullAddsStr = fullAddsStr.replace(/ /g, "");
  fullAddsStr = fullAddsStr.toLowerCase();

  let formLabel = document.getElementById("form-label");

  if (fullAddsStr.includes(streetInput)) {
    if (matchMedia("(min-width: 950px)").matches) {
      formLabel.innerHTML =
        "Results for your search are provided in the section below";
    } else {
      formLabel.innerHTML = "Scroll down to view results for your search";
    }

    formLabel.style.color = "#428f70";
    streetSelector.style.borderBottom = "#428f70 1px solid";
  } else {
    formLabel.innerHTML = "Unknown location. Try another";
    formLabel.style.color = "#b83939";
    streetSelector.style.borderBottom = "#b83939 1px solid";

    //* originally added as reset after wrong entries. removed due to problems
    // setTimeout(function() {
    //   streetSelector.value = "";

    //   for (i = 0; i < resultCards.length; i++) {
    //     resultCards[i].style.display = "grid";
    //   }
    // }, 3850);
  }

  //! post-typing timer rules begin here
  clearTimeout(typingTimer);

  if (streetSelector.value) {
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  } else {
    //* reset colors if input field is empty
    formLabel.innerHTML = "enter your location";
    formLabel.style.color = "#6d8faf";
    streetSelector.style.borderBottom = "#6d8faf 1px solid";
  }
};

//! post-typing function
function doneTyping() {
  let formLabel = document.getElementById("form-label");

  formLabel.innerHTML = "enter your location";
  formLabel.style.color = "#6d8faf";
  streetSelector.style.borderBottom = "#1b2429 1px solid";
}

//! large card updating begins here
let resultCardsArr = Array.prototype.slice.call(resultCards);

//* variables containing content in small cards
let fullAdds = document.querySelectorAll("p.full-add");
let fullAddsArr = Array.prototype.slice.call(fullAdds);
let viewDetails = document.querySelectorAll("p.view-details");
let viewDetailsArr = Array.prototype.slice.call(viewDetails);
let viewContainer = document.querySelectorAll("div.view-container");
let viewContainerArr = Array.prototype.slice.call(viewContainer);
let cardImage = document.getElementsByClassName("card-image");
let cardImageArr = Array.prototype.slice.call(cardImage);
let imageContainer = document.querySelectorAll("div.image-container");
let imageContainerArr = Array.prototype.slice.call(imageContainer);

//* section containing enlarged card
let enlargedCardSection = document.querySelector("section.card-details");
let formsAndResultsSection = document.querySelector("div.forms-and-results");

//* variables containing content on big card pop-up
let bigAddress = document.querySelector("h2.big-add");
let bigStatus = document.querySelector("p.big-status");
let broughtOrTaken = document.querySelector("span.brought-or-taken");
let enlargedCard = document.querySelector("div.enlarged-card");
let enlargedCardText = document.getElementsByClassName("big-text-color");
let enlargedBulbOrLantern = document.querySelector(
  "img.enlarged-card-header-image"
);
let enlargedCardDivider = document.querySelectorAll("hr.enlarged-card-divider");
let chartIcon = document.querySelectorAll("img.chart-icon");
// let scrollbarTrack = document.querySelector("::-webkit-scrollbar-track");
// console.log(scrollbarTrack.style.borderColor);

function colorEnlargedCardText(textColor) {
  for (i = 0; i < enlargedCardText.length; i++) {
    enlargedCardText[i].style.color = textColor;
  }
}

function updateEnlargedStatus(relevantIndex) {
  if (resultCardsArr[relevantIndex].className.includes("black-card")) {
    // console.log("black");
    bigStatus.innerHTML = "There is no light in this location*";
    broughtOrTaken.innerHTML = "taken at ";
    enlargedCard.style.backgroundColor = "#1b2429";
    colorEnlargedCardText("#ffffff");
    enlargedCard.classList.remove("scrollbar-black");
    enlargedCard.classList.add("scrollbar-white");

    enlargedBulbOrLantern.src = "images/Lantern.svg";
    enlargedBulbOrLantern.style.filter =
      "invert(100%) sepia(0%) saturate(7498%) hue-rotate(173deg) brightness(105%) contrast(101%)";

    enlargedCardDivider[0].style.borderTop = "#ffffff solid 0.5px";
    enlargedCardDivider[1].style.borderTop = "#ffffff solid 0.5px";

    chartIcon[0].style.filter =
      "invert(100%) sepia(0%) saturate(7498%) hue-rotate(173deg) brightness(105%) contrast(101%)";
    chartIcon[1].style.filter =
      "invert(100%) sepia(0%) saturate(7498%) hue-rotate(173deg) brightness(105%) contrast(101%)";
  } else if (resultCardsArr[relevantIndex].className.includes("white-card")) {
    // console.log("white");
    bigStatus.innerHTML = "There is light in this location*";
    broughtOrTaken.innerHTML = "brought at ";
    enlargedCard.style.backgroundColor = "#ffffff";
    colorEnlargedCardText("#1b2429");
    enlargedCard.classList.remove("scrollbar-white");
    enlargedCard.classList.add("scrollbar-black");

    enlargedBulbOrLantern.src = "images/Bulb.svg";
    enlargedBulbOrLantern.style.filter =
      "invert(12%) sepia(9%) saturate(1246%) hue-rotate(157deg) brightness(93%) contrast(95%)";

    enlargedCardDivider[0].style.borderTop = "#c2ced4 solid 0.5px";
    enlargedCardDivider[1].style.borderTop = "#c2ced4 solid 0.5px";

    chartIcon[0].style.filter =
      "invert(12%) sepia(9%) saturate(1246%) hue-rotate(157deg) brightness(93%) contrast(95%)";
    chartIcon[1].style.filter =
      "invert(12%) sepia(9%) saturate(1246%) hue-rotate(157deg) brightness(93%) contrast(95%)";
  }
}

//! bit extracting information from clicked card and updating based on above function
for (i = 0; i < resultCards.length; i++) {
  resultCards[i].addEventListener(
    "click",
    function(clickedItem) {
      if (clickedItem.target.className.includes("full-add")) {
        addIndex = fullAddsArr.indexOf(clickedItem.target);
        bigAddress.innerHTML = fullAddsArr[addIndex].innerHTML;

        formsAndResultsSection.style.display = "none";
        enlargedCardSection.style.display = "block";

        //* updates status details on larger card
        updateEnlargedStatus(addIndex);
      }

      if (clickedItem.target.tagName == "A") {
        resultCardsIndex = resultCardsArr.indexOf(clickedItem.target);
        bigAddress.innerHTML = fullAddsArr[resultCardsIndex].innerHTML;

        formsAndResultsSection.style.display = "none";
        enlargedCardSection.style.display = "block";

        updateEnlargedStatus(resultCardsIndex);
      }

      if (clickedItem.target.className.includes("view-details")) {
        viewIndex = viewDetailsArr.indexOf(clickedItem.target);
        bigAddress.innerHTML = fullAddsArr[viewIndex].innerHTML;

        formsAndResultsSection.style.display = "none";
        enlargedCardSection.style.display = "block";

        updateEnlargedStatus(viewIndex);
      }

      if (clickedItem.target.className.includes("view-container")) {
        viewContainerIndex = viewContainerArr.indexOf(clickedItem.target);
        bigAddress.innerHTML = fullAddsArr[viewContainerIndex].innerHTML;

        formsAndResultsSection.style.display = "none";
        enlargedCardSection.style.display = "block";

        updateEnlargedStatus(viewContainerIndex);
      }

      if (clickedItem.target.tagName == "IMG") {
        cardImageIndex = cardImageArr.indexOf(clickedItem.target);
        bigAddress.innerHTML = fullAddsArr[cardImageIndex].innerHTML;

        formsAndResultsSection.style.display = "none";
        enlargedCardSection.style.display = "block";

        updateEnlargedStatus(cardImageIndex);
      }

      if (clickedItem.target.className.includes("image-container")) {
        imageContainerIndex = imageContainerArr.indexOf(clickedItem.target);
        bigAddress.innerHTML = fullAddsArr[imageContainerIndex].innerHTML;

        formsAndResultsSection.style.display = "none";
        enlargedCardSection.style.display = "block";

        updateEnlargedStatus(imageContainerIndex);
      }
    }
    // false
  );
}

//! bit closing enlarged card
let backResults = document.querySelector("a.back-results");
backResults.addEventListener("click", function() {
  formsAndResultsSection.style.display = "block";
  enlargedCardSection.style.display = "none";
});

//! bit switching between the charts
let inaTimelineLink = document.querySelector("a.ina-timeline-choice");
let dailyChartLink = document.querySelector("a.chart-choice");

let inaTimeline = document.querySelector("div.ina-timeline-container");
let inaTimelineWithTitle = document.querySelector("div.timeline-with-title");
let barChart = document.querySelector("div.bar-container");

inaTimelineLink.addEventListener("click", function() {
  inaTimelineLink.classList.add("selected-chart");
  dailyChartLink.classList.remove("selected-chart");

  inaTimeline.style.display = "block";
  inaTimelineWithTitle.style.display = "block";
  barChart.style.display = "none";
});

dailyChartLink.addEventListener("click", function() {
  inaTimelineLink.classList.remove("selected-chart");
  dailyChartLink.classList.add("selected-chart");

  inaTimeline.style.display = "none";
  inaTimelineWithTitle.style.display = "none";
  barChart.style.display = "block";
});

// //! Back Button Detector
// //* idea from: https://codepen.io/christianismyname/pen/PwmVvG
// (function() {
//   if (window.history && window.history.pushState) {
//     window.onpopstate = function() {
//       //* clicks back to results link
//       backResults.click();
//     };
//   }
// })();

// window.addEventListener(
//   "popstate",
//   function(event) {
//     // The popstate event is fired each time when the current history entry changes.

//     if (formsAndResultsSection.style.display == "block") {
//       enlargedCardSection.style.display = "block";
//       formsAndResultsSection.style.display = "none";
//     } else {
//       enlargedCardSection.style.display = "none";
//       formsAndResultsSection.style.display = "block";
//     }

//     // history.pushState(null, null, window.location.pathname);
//   },
//   false
// );
