let forecastWrapper = document.querySelector(".forecast-wrapper");

forecastButton.addEventListener("click", () => {
  forecastWrapper.style.display = "block";
});

rankingsButton.addEventListener("click", () => {
  forecastWrapper.style.display = "none";
});

toggleNav = (clickedButton, otherButton) => {
  clickedButton.classList.add("selected");
  otherButton.classList.remove("selected");
};

let predictLightButton = document.querySelector(".predict-light-button");
let predictLightSection = document.querySelector("section.predict-light");
let predictFuelButton = document.querySelector(".predict-fuel-button");
let predictFuelSection = document.querySelector("section.predict-fuel");

predictFuelButton.addEventListener("click", () => {
  toggleNav(predictFuelButton, predictLightButton);
  predictFuelSection.classList.remove("hide");
  predictLightSection.classList.add("hide");
});

predictLightButton.addEventListener("click", () => {
  toggleNav(predictLightButton, predictFuelButton);
  predictFuelSection.classList.add("hide");
  predictLightSection.classList.remove("hide");
});

let lightPlotButton = document.querySelector(".plot-button-light");
let fuelPlotButton = document.querySelector(".plot-button-fuel");

let lightInput = document.querySelector(".location-light");
let fuelInput = document.querySelector(".location-fuel");

let lightLabel = document.querySelector(".light-label");
let fuelLabel = document.querySelector(".fuel-label");

let timelineOpacitySection1 = document.querySelector("h3.timeline-opacity");
let timelineOpacitySection2 = document.querySelector("div.timeline-opacity");
let moreDetailsFuelSection = document.querySelector(".fuel-more-details");

//* function that expands input label to alert user
let labelAlert = label => {
  label.style.fontWeight = "700";
  label.style.fontSize = "13px";
  label.style.color = "#e79e00";

  setTimeout(function() {
    label.style.fontWeight = "500";
    label.style.fontSize = "11px";
    label.style.color = "#212c30";
  }, 500);
};

emptyInputFeedback = (button, input, label) => {
  button.addEventListener("click", () => {
    if (!input.value) {
      labelAlert(label);
    }
  });
};
emptyInputFeedback(lightPlotButton, lightInput, lightLabel);
emptyInputFeedback(fuelPlotButton, fuelInput, fuelLabel);

fetch("https://checklight.pythonanywhere.com/streets")
  .then(function(response) {
    return response.json();
  })
  .then(data => {
    //* put streets from api in array
    let streetsArray = data.streets.map(
      eachStreet => `${eachStreet.name}, ${eachStreet.lga}, ${eachStreet.state}`
    );

    //* Removes transparency of sections when relevant inputs have been added
    let makeSectionVisible = (button, input, section) => {
      button.addEventListener("click", () => {
        if (input.value && streetsArray.includes(input.value)) {
          section.style.opacity = 1;
        }
      });
    };

    makeSectionVisible(lightPlotButton, lightInput, timelineOpacitySection1);
    makeSectionVisible(lightPlotButton, lightInput, timelineOpacitySection2);
    makeSectionVisible(fuelPlotButton, fuelInput, moreDetailsFuelSection);

    let labelWrongInputs = (button, input, label) => {
      button.addEventListener("click", () => {
        if (input.value && !streetsArray.includes(input.value)) {
          label.textContent =
            "Unknown Location. Try using dropdown suggestions";
          label.style.color = "#b83939";
          input.style.borderBottom = "#b83939 1px solid";
          label.classList.add("transition-all-3s");

          setTimeout(function() {
            label.textContent = "enter your location";
            label.style.color = "#212c30";
            input.style.borderBottom = "#6d8faf 1px solid";
            label.classList.remove("transition-all-3s");
          }, 3000);
        }
      });
    };

    labelWrongInputs(lightPlotButton, lightInput, lightLabel);
    labelWrongInputs(fuelPlotButton, fuelInput, fuelLabel);
  })
  .catch(function(error) {
    console.log(error);
  });
