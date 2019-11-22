//* updates colours of cards in list
fetch("https://checklight.pythonanywhere.com/streets")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);
    // console.log(data.streets);
    data.streets.forEach(function(post) {
      //* Ifako Ijaiye 1 denote first subdivisions area.
      let ifakoIjaiye1Cards = document.querySelectorAll(
        "a.ifako-ijaiye-1-card"
      );
      let ifako1cardImages = document.querySelectorAll(
        "a.ifako-ijaiye-1-card img.card-image.bulb-or-lantern"
      );

      if (post.status == 0 && post.lga == "Ifako ijaiye") {
        for (i = 0; i < ifakoIjaiye1Cards.length; i++) {
          ifakoIjaiye1Cards[i].classList.add("black-card");
          ifakoIjaiye1Cards[i].classList.remove("white-card");

          ifako1cardImages[i].src = "images/Lantern.svg";
        }
      } else if (post.status !== 0 && post.lga == "Ifako ijaiye") {
        for (i = 0; i < ifakoIjaiye1Cards.length; i++) {
          ifakoIjaiye1Cards[i].classList.remove("black-card");
          ifakoIjaiye1Cards[i].classList.add("white-card");

          ifako1cardImages[i].src = "images/Bulb.svg";
        }
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });

function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "hr(s) " + rminutes + "min(s)";
}

//* updates big card elements for ifako Ijaiye 1
fetch("https://checklight.pythonanywhere.com/streets")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);
    // console.log(data.streets);

    //* Ifako Ijaiye 1 denote first subdivisions area.
    let ifakoIjaiye1Cards = document.querySelectorAll("a.ifako-ijaiye-1-card");
    let ifakoIjaiye1CardsArr = Array.prototype.slice.call(ifakoIjaiye1Cards);
    let ifako1cardImages = document.querySelectorAll(
      "a.ifako-ijaiye-1-card img.card-image.bulb-or-lantern"
    );

    let bigTimeValue = document.querySelector("span.big-time-value");
    let dataSourceValue = document.querySelector("span.data-source-value");

    for (i = 0; i < ifakoIjaiye1CardsArr.length; i++) {
      //* ensures data sourcing happens only when ifako-ijaiye-1 cards are clicked based on class(ifako-ijaiye-1) given to all childnodes
      ifakoIjaiye1CardsArr[i].addEventListener("click", function(clickedItem) {
        if (clickedItem.target.className.includes("ifako-ijaiye-1")) {
          dataSourceValue.innerHTML = "Adejonwo Close, Ifako-Ijaiye, Lagos";

          data.streets.forEach(function(post) {
            if (post.status == 0 && post.lga == "Ifako ijaiye") {
              let timeLightTaken = post.last_no_light.slice(-10, -1);
              bigTimeValue.innerHTML = timeLightTaken;
            } else if (post.status !== 0 && post.lga == "Ifako ijaiye") {
              let timeLightBrought = post.last_light.slice(-10, -1);
              bigTimeValue.innerHTML = timeLightBrought;
            }

            //***************
            //*bit for timeline values
            let flags = document.querySelectorAll("span.flag");
            let times = document.querySelectorAll("span.time");
            let durations = document.querySelectorAll("span.duration");
            let desc = document.querySelectorAll("div.desc");

            // *added for colouring
            // let afterFlag = document.querySelectorAll(".flag:after");
            // let beforeFlag = document.querySelectorAll(".flag:before");
            let durationSpan = document.querySelectorAll(".desc span");

            //! Timeline updates start here
            for (i = 0; i < flags.length; i++) {
              times[i].innerHTML = post.history.time_line[i].time;

              //* previous index variable created due to back-end error
              let previousIndex = i - 1;

              //* converts duration to rounded minutes
              //* conditional used to prevent error of negative indices when previous index is used
              if (i > 0) {
                let durationValue = Math.round(
                  post.history.time_line[previousIndex].period / 60
                );

                //* timeConvert function defined above. From: https://www.w3resource.com/javascript-exercises/javascript-date-exercise-13.php
                durationValue = timeConvert(durationValue);

                if (post.history.time_line[i].status) {
                  durations[i].innerHTML = "Uptime Duration: " + durationValue;
                } else {
                  durations[i].innerHTML =
                    "Downtime Duration: " + durationValue;
                }
              } else {
                if (post.history.time_line[i].status) {
                  durations[i].innerHTML = "Uptime Duration: Ongoing";
                } else {
                  durations[i].innerHTML = "Downtime Duration: Ongoing";
                }
              }

              //* Second conditional to fix other timeline feautures
              if (post.history.time_line[i].status) {
                flags[i].innerHTML = "Light On";

                //*concerning colours
                flags[i].style.backgroundColor = "#ffffff";
                flags[i].style.color = "#1d282e";

                times[i].style.backgroundColor = "#ffffff";
                times[i].style.color = "#1d282e";
                desc[i].style.backgroundColor = "#ffffff";

                durations[i].style.color = "#1d282e";
                durationSpan[i].style.color = "#1d282e";
              } else {
                flags[i].innerHTML = "Light Off";

                //*concerning colours
                flags[i].style.backgroundColor = "#1d282e";
                flags[i].style.color = "#ffffff";

                times[i].style.backgroundColor = "#1d282e";
                times[i].style.color = "#ffffff";
                desc[i].style.backgroundColor = "#1d282e";

                durations[i].style.color = "#ffffff";
                durationSpan[i].style.color = "#ffffff";
              }
            }
          });
        }
      });
    }
  })
  .catch(function(error) {
    console.log(error);
  });

//! redraws bar chart with ifako-ijaiye-1-data
fetch("https://checklight.pythonanywhere.com/streets")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    //* Ifako Ijaiye 1 denote first subdivisions area.
    let ifakoIjaiye1Cards = document.querySelectorAll("a.ifako-ijaiye-1-card");
    let ifakoIjaiye1CardsArr = Array.prototype.slice.call(ifakoIjaiye1Cards);

    for (i = 0; i < ifakoIjaiye1CardsArr.length; i++) {
      //* ensures data sourcing happens only when ifako-ijaiye-1 cards are clicked based on class(ifako-ijaiye-1) given to all childnodes
      ifakoIjaiye1CardsArr[i].addEventListener("click", function(clickedItem) {
        if (clickedItem.target.className.includes("ifako-ijaiye-1")) {
          let streetsArrray = data.streets;
          for (i = 0; i < streetsArrray.length; i++) {
            if (streetsArrray[i].lga == "Ifako ijaiye") {
              //! Bar Chart updates start here
              let dailySupplyHoursArray =
                streetsArrray[i].history.daily_supply.values;

              google.charts.load("current", {
                packages: ["corechart"]
              });
              google.charts.setOnLoadCallback(drawChart);

              var yesterdayData = Math.round(
                dailySupplyHoursArray[dailySupplyHoursArray.length - 1]
              );
              // console.log(yesterdayData);
              var day8Data = Math.round(
                dailySupplyHoursArray[dailySupplyHoursArray.length - 2]
              );
              var day7Data = Math.round(
                dailySupplyHoursArray[dailySupplyHoursArray.length - 3]
              );
              var day6Data = Math.round(
                dailySupplyHoursArray[dailySupplyHoursArray.length - 4]
              );
              var day5Data = Math.round(
                dailySupplyHoursArray[dailySupplyHoursArray.length - 5]
              );
              var day4Data = Math.round(
                dailySupplyHoursArray[dailySupplyHoursArray.length - 6]
              );
              var day3Data = Math.round(
                dailySupplyHoursArray[dailySupplyHoursArray.length - 7]
              );
              // console.log(day3Data);

              function drawChart() {
                Date.prototype.subDays = function(days) {
                  var date = new Date(this.valueOf());
                  date.setDate(date.getDate() - days);
                  return date;
                };

                let today = new Date();
                let day9 = today.subDays(1);
                let day8 = today.subDays(2);
                let day7 = today.subDays(3);
                let day6 = today.subDays(4);
                let day5 = today.subDays(5);
                let day4 = today.subDays(6);
                let day3 = today.subDays(7);
                let day2 = today.subDays(8);
                let day1 = today.subDays(9);

                let dd = String(today.getDate()).padStart(2, "0");
                let mm = String(today.getMonth() + 1).padStart(2, "0");
                let yyyy = today.getFullYear();
                today = dd + "/" + mm;

                let dd9 = String(day9.getDate()).padStart(2, "0");
                let mm9 = String(day9.getMonth() + 1).padStart(2, "0");
                let yyyy9 = day9.getFullYear();
                day9 = dd9 + "/" + mm9;

                let dd8 = String(day8.getDate()).padStart(2, "0");
                let mm8 = String(day8.getMonth() + 1).padStart(2, "0");
                let yyyy8 = day8.getFullYear();
                day8 = dd8 + "/" + mm8;

                let dd7 = String(day7.getDate()).padStart(2, "0");
                let mm7 = String(day7.getMonth() + 1).padStart(2, "0");
                let yyyy7 = day7.getFullYear();
                day7 = dd7 + "/" + mm7;

                let dd6 = String(day6.getDate()).padStart(2, "0");
                let mm6 = String(day6.getMonth() + 1).padStart(2, "0");
                let yyyy6 = day6.getFullYear();
                day6 = dd6 + "/" + mm6;

                let dd5 = String(day5.getDate()).padStart(2, "0");
                let mm5 = String(day5.getMonth() + 1).padStart(2, "0");
                let yyyy5 = day5.getFullYear();
                day5 = dd5 + "/" + mm5;

                let dd4 = String(day4.getDate()).padStart(2, "0");
                let mm4 = String(day4.getMonth() + 1).padStart(2, "0");
                let yyyy4 = day4.getFullYear();
                day4 = dd4 + "/" + mm4;

                let dd3 = String(day3.getDate()).padStart(2, "0");
                let mm3 = String(day3.getMonth() + 1).padStart(2, "0");
                let yyyy3 = day3.getFullYear();
                day3 = dd3 + "/" + mm3;

                let dd2 = String(day2.getDate()).padStart(2, "0");
                let mm2 = String(day2.getMonth() + 1).padStart(2, "0");
                let yyyy2 = day2.getFullYear();
                day2 = dd2 + "/" + mm2;

                let dd1 = String(day1.getDate()).padStart(2, "0");
                let mm1 = String(day1.getMonth() + 1).padStart(2, "0");
                let yyyy1 = day1.getFullYear();
                day1 = dd1 + "/" + mm1;

                // Define the chart to be drawn.

                if (matchMedia("(max-width: 619px)").matches) {
                  var data = google.visualization.arrayToDataTable([
                    [
                      "Day",
                      "Hours",
                      {
                        role: "style"
                      },
                      { role: "annotation" }
                    ],
                    [
                      day9,
                      yesterdayData,
                      "color: #1b2429",
                      yesterdayData + "hrs"
                    ],
                    [day8, day8Data, "color: #1b2429", day8Data + "hrs"],
                    [day7, day7Data, "color: #1b2429", day7Data + "hrs"],
                    [day6, day6Data, "color: #1b2429", day6Data + "hrs"]
                    // [day5, day5Data, "color: #1b2429", day5Data + "hrs"],
                    // [day4, day4Data, "color: #1b2429", day4Data + "hrs"],
                    // [day3, day3Data, "color: #1b2429", day3Data + "hrs"]
                    // [day3, 63.2, "color: #1b2429"],
                    // [day2, 6.8, "color: #1b2429"],
                    // [day1, 5, "color: #1b2429"]
                  ]);
                } else {
                  var data = google.visualization.arrayToDataTable([
                    [
                      "Day",
                      "Hours",
                      {
                        role: "style"
                      },
                      { role: "annotation" }
                    ],
                    [
                      day9,
                      yesterdayData,
                      "color: #1b2429",
                      yesterdayData + "hrs"
                    ],
                    [day8, day8Data, "color: #1b2429", day8Data + "hrs"],
                    [day7, day7Data, "color: #1b2429", day7Data + "hrs"],
                    [day6, day6Data, "color: #1b2429", day6Data + "hrs"],
                    [day5, day5Data, "color: #1b2429", day5Data + "hrs"],
                    [day4, day4Data, "color: #1b2429", day4Data + "hrs"],
                    [day3, day3Data, "color: #1b2429", day3Data + "hrs"]
                    // [day3, 63.2, "color: #1b2429"],
                    // [day2, 6.8, "color: #1b2429"],
                    // [day1, 5, "color: #1b2429"]
                  ]);
                }

                let darkColor = "#1b2429";

                var options = {
                  backgroundColor: {
                    fill: "#e1e5e9"
                    // stroke: '#1b2429',
                    // strokeWidth: 1
                  },
                  chartArea: {
                    backgroundColor: {
                      fill: "#e1e5e9",
                      opacity: 100
                    }
                  },

                  // title: "Note: Hover over bars to view figures",
                  titleTextStyle: {
                    fontSize: 11,
                    color: darkColor,
                    bold: false
                  },
                  bar: {
                    groupWidth: "60%"
                  },
                  legend: {
                    position: "none"
                  },
                  hAxis: {
                    textStyle: {
                      fontSize: 10.5,
                      color: darkColor,
                      baselineColor: darkColor
                    }
                  },
                  vAxis: {
                    gridlines: { color: "#c2ced4" },
                    viewWindow: {
                      min: 0,
                      max: 24
                    },
                    ticks: [8, 16, 24],
                    textStyle: {
                      fontSize: 11,
                      color: darkColor,
                      baselineColor: darkColor
                    },
                    title: "Hours (hrs)",
                    titleTextStyle: {
                      italic: false,
                      color: darkColor,
                      baselineColor: darkColor
                    }
                  }
                };

                var chart = new google.visualization.ColumnChart(
                  document.getElementById("container")
                );
                chart.draw(data, options);

                // Instantiate and draw the chart.
                //* custom resize function added to prevent chart size from being weird when page is resized
                //* source: https://stackoverflow.com/questions/8950761/google-chart-redraw-scale-on-window-resize
                function resize() {
                  var chart = new google.visualization.ColumnChart(
                    document.getElementById("container")
                  );
                  chart.draw(data, options);
                }

                //* reloads or resizes chart when each card is clicked
                let resultCards = document.querySelectorAll("a.card");
                for (i = 0; i < resultCards.length; i++) {
                  resultCards[i].addEventListener(
                    "click",
                    function(clickedItem) {
                      if (
                        clickedItem.target.className == "full-add" ||
                        clickedItem.target.tagName == "A" ||
                        clickedItem.target.className == "view" ||
                        clickedItem.target.className == "view-container" ||
                        clickedItem.target.tagName == "IMG" ||
                        clickedItem.target.className == "image-container"
                      ) {
                        resize();
                      }
                    },
                    false
                  );
                }

                //* when dailychart link is clicked
                let dailyChartLink = document.querySelector("a.chart-choice");
                dailyChartLink.onclick = resize;
              }
              google.charts.setOnLoadCallback(drawChart);
            }
          }
        }
      });
    }
  })
  .catch(function(error) {
    console.log(error);
  });
