let secondThirdInputs = document.querySelectorAll("input.second-third-input");
let secondThirdSelectors = document.querySelectorAll(
  "div.second-third-selector"
);
let secondThirdPlotButtons = document.querySelectorAll(
  "button.second-third-plot"
);
let secondThirdLabels = document.querySelectorAll("label.second-third-label");

let firstInput = document.querySelector("input.first-location");
let secondInput = document.querySelector("input.second-location");
let thirdInput = document.querySelector("input.third-location");

let firstPlotButton = document.querySelector("button.plot-button-dark");
let secondPlotButton = document.querySelector("button.plot-button-yellow");
let thirdPlotButton = document.querySelector("button.plot-button-light");

let firstLabel = document.querySelector("label.label-dark");
let secondLabel = document.querySelector("label.label-yellow");
let thirdLabel = document.querySelector("label.label-light");

let chartContainers = document.querySelectorAll("section.pie-bar-line");

//* Removes transparency of charts when first input is added
let makeChartsVisible = () => {
  if (firstInput.value) {
    for (let i = 0; i < chartContainers.length; i++) {
      chartContainers[i].classList.add("pie-bar-line-visible");
    }
  }
};
firstPlotButton.addEventListener("click", makeChartsVisible);

//* alerts if first input is unfilled and second button is clicked
let firstLocationFeedback = () => {
  for (let i = 0; i < secondThirdPlotButtons.length; i++) {
    secondThirdPlotButtons[i].addEventListener("click", () => {
      if (!firstInput.value) {
        firstLabel.style.fontWeight = "700";
        firstLabel.style.fontSize = "13px";
        firstLabel.style.color = "#e79e00";

        setTimeout(function() {
          firstLabel.style.fontWeight = "500";
          firstLabel.style.fontSize = "11px";
          firstLabel.style.color = "#212c30";
        }, 500);
      }
    });
  }
};
firstLocationFeedback();

//* alerts if second input is unfilled and third button is clicked
let secondLocationFeedback = () => {
  thirdPlotButton.addEventListener("click", () => {
    if (!secondInput.value) {
      secondLabel.style.fontWeight = "700";
      secondLabel.style.fontSize = "13px";
      secondLabel.style.color = "#212c30";

      setTimeout(function() {
        secondLabel.style.fontWeight = "500";
        secondLabel.style.fontSize = "11px";
        secondLabel.style.color = "#e79e00";
      }, 500);
    }
  });
};
secondLocationFeedback();

//* shows second input field when first is filled
let reduceSecondButtonShowInput = () => {
  //* array with which plot button clicks are monitored
  let clicked = false;

  secondPlotButton.addEventListener("click", () => {
    if (!clicked && firstInput.value) {
      secondPlotButton.textContent = "add";
      secondPlotButton.classList.add("animate-plots");
      secondInput.classList.add("animate-inputs");
      secondLabel.style.visibility = "visible";

      //* ensures process happens once
      clicked = true;
    }
  });
};
reduceSecondButtonShowInput();

//* shows third input field when second is filled
let reduceThirdButtonShowInput = () => {
  //* array with which plot button clicks are monitored
  let clicked = false;

  thirdPlotButton.addEventListener("click", () => {
    if (!clicked && secondInput.value) {
      thirdPlotButton.textContent = "add";
      thirdPlotButton.classList.add("animate-plots");
      thirdInput.classList.add("animate-inputs");
      thirdLabel.style.visibility = "visible";

      //* ensures process happens once
      clicked = true;
    }
  });
};
reduceThirdButtonShowInput();

let historyChartsWrapper = document.querySelector("div.history-charts-wrapper");

historyButton.addEventListener("click", function() {
  if (matchMedia("(min-width: 950px)").matches) {
    historyChartsWrapper.style.display = "grid";
  } else {
    historyChartsWrapper.style.display = "block";
  }
});

mapButton.addEventListener("click", function() {
  historyChartsWrapper.style.display = "none";
});

forecastButton.addEventListener("click", function() {
  historyChartsWrapper.style.display = "none";
});

rankingsButton.addEventListener("click", function() {
  historyChartsWrapper.style.display = "none";
});
