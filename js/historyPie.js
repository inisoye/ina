var data = {
  labels: [
    "Sunflower Street",
    "Bola Ademola Close",
    "Bamiduro Kosinibi Avenue"
  ],
  datasets: [
    {
      data: [200, 123, 159],
      backgroundColor: ["#212c30", "#ffc64a", "#6d8faf"],
      hoverBackgroundColor: ["#212c30", "#ffc64a", "#6d8faf"]
    }
  ]
};

Chart.Legend.prototype.afterFit = function() {
  this.height = this.height + 20;
};

Chart.defaults.global.defaultFontColor = "#1b2429";
var cdx = new Chart(document.getElementById("pie-chart"), {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
      text: "A very optional extra title/subtitle"
    },

    legend: {
      display: true,
      labels: {
        boxWidth: 13
      },
      // position: "right"
    },
    //* removes automatic chart.js border
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    defaultFontFamily: (Chart.defaults.global.defaultFontFamily =
      "'rubik'")
  }
});
