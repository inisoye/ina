var data = {
  labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Sunflower Street",
      borderColor: "#212c30",
      backgroundColor: [
        "#212c30",
        "#212c30",
        "#212c30",
        "#212c30",
        "#212c30",
        "#212c30",
        "#212c30"
      ],
      data: [15, 14, 24, 5, 8, 11, 21]
    },
    {
      label: "Bola Ademola Close",
      borderColor: "#ffc64a",
      backgroundColor: [
        "#ffc64a",
        "#ffc64a",
        "#ffc64a",
        "#ffc64a",
        "#ffc64a",
        "#ffc64a",
        "#ffc64a"
      ],
      data: [8, 6, 22, 21, 1, 16, 12]
    },
    {
      label: "Bamiduro Kosinibi Avenue",
      borderColor: "#6d8faf",
      backgroundColor: [
        "#6d8faf",
        "#6d8faf",
        "#6d8faf",
        "#6d8faf",
        "#6d8faf",
        "#6d8faf",
        "#6d8faf"
      ],
      data: [14, 6, 13, 3, 22, 6, 23.7]
    }
  ]
};

//* Gives the legend a bit of padding: https://stackoverflow.com/questions/42585861/chart-js-increase-spacing-between-legend-and-chart
Chart.Legend.prototype.afterFit = function() {
  this.height = this.height + 20;
};

Chart.defaults.global.defaultFontColor = "#1b2429";
var myBarChart = new Chart(document.getElementById("bar-chart"), {
  type: "bar",
  data: data,
  options: {
    legend: {
      display: true,
      labels: {
        boxWidth: 13
      }
    },

    responsive: true,
    maintainAspectRatio: false,

    title: {
      display: false,
      text: "A very optional extra title/subtitle"
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          maxBarThickness: 50,
          scaleLabel: {
            display: true,
            labelString: "Day of the week"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            color: "#c2ced4",
            drawBorder: false
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 24,
            stepSize: 6,
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "Hours (hrs)"
          }
        }
      ]
    },
    defaultFontFamily: (Chart.defaults.global.defaultFontFamily =
      "'rubik'")
  }
});
