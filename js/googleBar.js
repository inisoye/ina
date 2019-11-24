// //* Dummy bar chart

// google.charts.load("current", {
//   packages: ["corechart"]
// });
// google.charts.setOnLoadCallback(drawChart);

// var todayData = 8;
// var day9Data = 22;
// var day8Data = 14;
// var day7Data = 12;
// var day6Data = 11;
// var day5Data = 14;
// var day4Data = 5;

// function drawChart() {
//   Date.prototype.subDays = function(days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() - days);
//     return date;
//   };

//   let today = new Date();
//   let day9 = today.subDays(1);
//   let day8 = today.subDays(2);
//   let day7 = today.subDays(3);
//   let day6 = today.subDays(4);
//   let day5 = today.subDays(5);
//   let day4 = today.subDays(6);
//   let day3 = today.subDays(7);
//   let day2 = today.subDays(8);
//   let day1 = today.subDays(9);

//   let dd = String(today.getDate()).padStart(2, "0");
//   let mm = String(today.getMonth() + 1).padStart(2, "0");
//   let yyyy = today.getFullYear();
//   today = dd + "/" + mm;

//   let dd9 = String(day9.getDate()).padStart(2, "0");
//   let mm9 = String(day9.getMonth() + 1).padStart(2, "0");
//   let yyyy9 = day9.getFullYear();
//   day9 = dd9 + "/" + mm9;

//   let dd8 = String(day8.getDate()).padStart(2, "0");
//   let mm8 = String(day8.getMonth() + 1).padStart(2, "0");
//   let yyyy8 = day8.getFullYear();
//   day8 = dd8 + "/" + mm8;

//   let dd7 = String(day7.getDate()).padStart(2, "0");
//   let mm7 = String(day7.getMonth() + 1).padStart(2, "0");
//   let yyyy7 = day7.getFullYear();
//   day7 = dd7 + "/" + mm7;

//   let dd6 = String(day6.getDate()).padStart(2, "0");
//   let mm6 = String(day6.getMonth() + 1).padStart(2, "0");
//   let yyyy6 = day6.getFullYear();
//   day6 = dd6 + "/" + mm6;

//   let dd5 = String(day5.getDate()).padStart(2, "0");
//   let mm5 = String(day5.getMonth() + 1).padStart(2, "0");
//   let yyyy5 = day5.getFullYear();
//   day5 = dd5 + "/" + mm5;

//   let dd4 = String(day4.getDate()).padStart(2, "0");
//   let mm4 = String(day4.getMonth() + 1).padStart(2, "0");
//   let yyyy4 = day4.getFullYear();
//   day4 = dd4 + "/" + mm4;

//   let dd3 = String(day3.getDate()).padStart(2, "0");
//   let mm3 = String(day3.getMonth() + 1).padStart(2, "0");
//   let yyyy3 = day3.getFullYear();
//   day3 = dd3 + "/" + mm3;

//   let dd2 = String(day2.getDate()).padStart(2, "0");
//   let mm2 = String(day2.getMonth() + 1).padStart(2, "0");
//   let yyyy2 = day2.getFullYear();
//   day2 = dd2 + "/" + mm2;

//   let dd1 = String(day1.getDate()).padStart(2, "0");
//   let mm1 = String(day1.getMonth() + 1).padStart(2, "0");
//   let yyyy1 = day1.getFullYear();
//   day1 = dd1 + "/" + mm1;

//   // Define the chart to be drawn.
//   var data = google.visualization.arrayToDataTable([
//     [
//       "Day",
//       "Hours",
//       {
//         role: "style"
//       }
//     ],
//     ["Today", todayData, "color: #1b2429"],
//     [day9, day9Data, "color: #1b2429"],
//     [day8, day8Data, "color: #1b2429"],
//     [day7, day7Data, "color: #1b2429"],
//     [day6, day6Data, "color: #1b2429"],
//     [day5, day5Data, "color: #1b2429"],
//     [day4, day4Data, "color: #1b2429"]
//     // [day3, 23.2, "color: #1b2429"],
//     // [day2, 6.8, "color: #1b2429"],
//     // [day1, 5, "color: #1b2429"]
//   ]);

//   let darkColor = "#1b2429";

//   var options = {
//     backgroundColor: {
//       fill: "#e1e5e9"
//       // stroke: '#1b2429',
//       // strokeWidth: 1
//     },
//     chartArea: {
//       backgroundColor: {
//         fill: "#e1e5e9",
//         opacity: 100
//       }
//     },

//     // title: "Note: Hover over bars to view figures",
//     titleTextStyle: {
//       fontSize: 11,
//       color: darkColor,
//       bold: false
//     },
//     bar: {
//       groupWidth: "60%"
//     },
//     legend: {
//       position: "none"
//     },
//     hAxis: {
//       textStyle: {
//         fontSize: 10.5,
//         color: darkColor,
//         baselineColor: darkColor
//       }
//     },
//     vAxis: {
//       viewWindow: {
//         min: 0,
//         max: 24
//       },
//       ticks: [8, 16, 24],
//       textStyle: {
//         fontSize: 11,
//         color: darkColor,
//         baselineColor: darkColor
//       },
//       title: "Hours (hrs)",
//       titleTextStyle: {
//         italic: false,
//         color: darkColor,
//         baselineColor: darkColor
//       }
//     }
//   };

//   //* conditional to change x-axis text color for blackout cases
//   let enlargedCard = document.querySelector("div.enlarged-card");

//   // Instantiate and draw the chart.
//   //* custom resize function added to prevent chart size from being weird when page is resized
//   //* source: https://stackoverflow.com/questions/8950761/google-chart-redraw-scale-on-window-resize
//   function resize() {
//     var chart = new google.visualization.ColumnChart(
//       document.getElementById("container")
//     );
//     chart.draw(data, options);
//   }

//   //* reloads or resizes chart when each card is clicked
//   let resultCards = document.querySelectorAll("a.card");
//   for (i = 0; i < resultCards.length; i++) {
//     resultCards[i].addEventListener(
//       "click",
//       function(clickedItem) {
//         if (
//           clickedItem.target.className == "full-add" ||
//           clickedItem.target.tagName == "A" ||
//           clickedItem.target.className == "view" ||
//           clickedItem.target.className == "view-container" ||
//           clickedItem.target.tagName == "IMG" ||
//           clickedItem.target.className == "image-container"
//         ) {
//           resize();
//         }
//       },
//       false
//     );
//   }

//   //* when dailychart link is clicked
//   let dailyChartLink = document.querySelector("a.chart-choice");
//   dailyChartLink.onclick = resize;
// }
// google.charts.setOnLoadCallback(drawChart);
