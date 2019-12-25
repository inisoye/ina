var data = {
  labels: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  datasets: [
    {
      data: [100, 50, 55, 70, 110, 111, 133, 144, 122, 66],
      label: "Sunflower Street",
      borderColor: "#212c30",
      backgroundColor: "#212c30",
      pointStyle: "rect",
      radius: 2,
      borderWidth: 2,
      fill: false
    },
    {
      data: [33, 44, 66, 32, 75, 90, 99, 100, 121, 110],
      label: "Bola Ademola Close",
      borderColor: "#ffc64a",
      backgroundColor: "#ffc64a",
      pointStyle: "rect",
      radius: 2,
      borderWidth: 2,
      fill: false
    },
    {
      data: [120, 155, 120, 133, 111, 90, 99, 140, 122, 159],
      label: "Bamiduro Kosinibi Avenue",
      borderColor: "#6d8faf",
      backgroundColor: "#6d8faf",
      pointStyle: "rect",
      radius: 2,
      borderWidth: 2,
      fill: false
    }
  ]
};

//* Gives the legend a bit of padding: https://stackoverflow.com/questions/42585861/chart-js-increase-spacing-between-legend-and-chart
Chart.Legend.prototype.afterFit = function() {
  this.height = this.height + 20;
};

Chart.defaults.global.defaultFontColor = "#1b2429";
var myBarChart = new Chart(document.getElementById("line-chart"), {
  type: "line",
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
      }
    },

    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: "Week of the year (Num)"
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
            suggestedMax: 168,
            stepSize: 42,
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: "Hours (hrs)"
          }
        }
      ]
    }
  }
});
