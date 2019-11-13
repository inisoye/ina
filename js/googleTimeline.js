// google.charts.load("current", { packages: ["timeline"] });
// google.charts.setOnLoadCallback(drawChart);
// function drawChart() {
//   var container = document.getElementById("five-hr-timeline");

//   var dataTable = new google.visualization.DataTable();

//   dataTable.addColumn({ type: "string", id: "Label" });
//   dataTable.addColumn({ type: "string", id: "Status" });
//   dataTable.addColumn({ type: "date", id: "Start" });
//   dataTable.addColumn({ type: "date", id: "End" });
//   dataTable.addRows([
//     [
//       "Between",
//       "Light",
//       new Date(0, 0, 0, 12, 0, 0),
//       new Date(0, 0, 0, 12, 30, 0)
//     ],
//     [
//       "Between",
//       "No-light",
//       new Date(0, 0, 0, 12, 30, 0),
//       new Date(0, 0, 0, 16, 30, 0)
//     ],
//     [
//       "Between",
//       "Light",
//       new Date(0, 0, 0, 16, 30, 0),
//       new Date(0, 0, 0, 17, 0, 0)
//     ]
//   ]);

//   var options = {
//     timeline: { groupByRowLabel: true, showRowLabels: false },

//     colors: ["#D4D4D4", "#202020", "#D4D4D4"]
//   };

//   //* custom resize function added to prevent chart size from being weird when page is resized
//   //* source: https://stackoverflow.com/questions/8950761/google-chart-redraw-scale-on-window-resize
//   function resize() {
//     var chart = new google.visualization.Timeline(container);
//     chart.draw(dataTable, options);
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


//* my own additions

//   let enlargedCard = document.querySelector("div.enlarged-card");
//   let timelineText = container.getElementsByTagName("text");
//   console.log(timelineText);
//   console.log(enlargedCard.style.backgroundColor == "202020");
//   if (enlargedCard.style.backgroundColor == "202020") {
//     for (i = 0; i < 11; i++) {
//       console.log(timelineText[i]);
//       timelineText[i].style.fill = "ffffff";
//     }
//   }

  // let enlargedCard = document.querySelector("div.enlarged-card");
  // if (enlargedCard.style.backgroundColor == "202020") {
  //   google.visualization.events.addListener(chart, "ready", function() {
  //     var labels = container.getElementsByTagName("text");
  //     Array.prototype.forEach.call(labels, function(label) {
  //       if (label.getAttribute("text-anchor") === "middle") {
  //         label.setAttribute("fill", "#ffffff");
  //       }
  //     });
  //   });
  // }

  // svg.find('[font-size="13"]').attr("fill", "#ffffff");
// }
