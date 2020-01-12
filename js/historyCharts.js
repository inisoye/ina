let historyChartsWrapper = document.querySelector("div.history-charts-wrapper");

historyButton.addEventListener("click", function() {
  if (matchMedia("(min-width: 950px)").matches) {
    historyChartsWrapper.style.display = "grid";
  } else {
    historyChartsWrapper.style.display = "block";
  }
});

rankingsButton.addEventListener("click", function() {
  historyChartsWrapper.style.display = "none";
});

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

//* function that expands input label to alert user
let labelAlert = label => {
  label.style.fontWeight = "700";
  label.style.fontSize = "13px";
  label.style.color = "#e79e00";

  setTimeout(function() {
    label.style.fontWeight = "500";
    label.style.fontSize = "10px";
    label.style.color = "#212c30";
  }, 500);
};

//* alerts if first input is unfilled and second (or third) button is clicked
let firstLocationFeedback = button => {
  button.addEventListener("click", () => {
    if (!firstInput.value) {
      labelAlert(firstLabel);
    }
  });
};
firstLocationFeedback(firstPlotButton);
firstLocationFeedback(secondPlotButton);
firstLocationFeedback(thirdPlotButton);

//* alerts if second input is unfilled and third (or second) button is clicked
let secondLocationFeedback = button => {
  button.addEventListener("click", () => {
    if (!secondInput.value) {
      labelAlert(secondLabel);

      setTimeout(function() {
        secondLabel.style.color = "#e79e00";
      }, 600);
    }
  });
};
secondLocationFeedback(secondPlotButton);
secondLocationFeedback(thirdPlotButton);

let thirdLocationFeedback = button => {
  button.addEventListener("click", () => {
    if (!thirdInput.value) {
      labelAlert(thirdLabel);

      setTimeout(function() {
        thirdLabel.style.color = "#6d8faf";
      }, 600);
    }
  });
};
thirdLocationFeedback(thirdPlotButton);

fetch("https://checklight.pythonanywhere.com/streets")
  .then(function(response) {
    return response.json();
  })
  .then(data => {
    //* put streets from api in array
    let streetsArray = data.streets.map(
      eachStreet => `${eachStreet.name}, ${eachStreet.lga}, ${eachStreet.state}`
    );

    //* Removes transparency of charts when relevant inputs have been added
    let makeChartsVisible = (button, input) => {
      button.addEventListener("click", () => {
        if (input.value && streetsArray.includes(input.value)) {
          for (let i = 0; i < chartContainers.length; i++) {
            chartContainers[i].classList.add("pie-bar-line-visible");
          }
        }
      });
    };

    makeChartsVisible(firstPlotButton, firstInput);
    makeChartsVisible(secondPlotButton, secondInput);
    makeChartsVisible(thirdPlotButton, thirdInput);

    let labelWrongInputs = (button, input, label, labelColour) => {
      button.addEventListener("click", () => {
        if (input.value && !streetsArray.includes(input.value)) {
          label.textContent =
            "Unknown Location. Try using dropdown suggestions";
          label.style.color = "#b83939";
          input.style.borderBottom = "#b83939 1px solid";
          label.classList.add("transition-all-3s");

          setTimeout(function() {
            label.textContent = "enter your location";
            label.style.color = labelColour;
            input.style.borderBottom = "#6d8faf 1px solid";
            label.classList.remove("transition-all-3s");
          }, 3000);
        }
      });
    };

    labelWrongInputs(firstPlotButton, firstInput, firstLabel, "#212c30");
    labelWrongInputs(secondPlotButton, secondInput, secondLabel, "#e79e00");
    labelWrongInputs(thirdPlotButton, thirdInput, thirdLabel, "#6d8faf");
  })
  .catch(function(error) {
    console.log(error);
  });

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
