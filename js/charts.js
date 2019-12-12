//* updates colours of cards in list
var data;
var myChart = false;
function timeConvert(n) {
  var num = n/60; //CONVERT SECONDS TO MINUTES
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "hr(s) " + rminutes + "min(s)";
}

//* updates big card elements for alausa 1
fetch("https://checklight.pythonanywhere.com/streets")
  .then(function(response) {
    data = response.json();
    return data;
  })
  .then(function(data) {
    
    //* alausa 1 denote first subdivisions area.
    let street_cards = document.getElementsByClassName("street");
    let chart = document.getElementById("card-details");
    let cards_section = document.getElementById("forms-and-results");


    Array.from(street_cards).forEach((element)=>{
        
      element.addEventListener("click",(e)=>{

        let id = e.target.id;
        let street = fetch_street(id, data);
        chart.style.display = "block";
        cards_section.style.display = "none";
        populate_big_card(street);
        create_timeline(street);
        plot_chart(street)
      })
    })
    return data
  })
  .catch(function(error) {
    console.log(error);
  });

const fetch_street = (id, data)=>{
  
  let street = data.streets.filter((e)=>{
    if (e.id == id){
      return e
    }
  })

  return street[0]
}

const color_detail_text = (color)=>{
  
  let text = document.getElementsByClassName("detail-text")
  let barchart_black  = document.getElementById("barchart_icon_black")
  let barchart_white  = document.getElementById("barchart_icon_white")
  let timeline1_white = document.getElementById("timeline1_icon_white")
  let timeline1_black = document.getElementById("timeline1_icon_black")
  console.log(color)

  Array.from(text).forEach((e)=>{
    e.style.color = color;
  })
  if (color == "black"){
    
    barchart_black.style.display = "block";
    barchart_white.style.display = "none";
    timeline1_black.style.display = "block";
    timeline1_white.style.display = "none";
  }
  else if (color == "white"){
    
    barchart_black.style.display = "none";
    barchart_white.style.display = "block";
    timeline1_black.style.display = "none";
    timeline1_white.style.display = "block";
  }

}

const populate_big_card = (street)=>{

  let bigTimeValue = document.querySelector("span.big-time-value");
  let bigStreetValue = document.getElementsByClassName("large_street")[0];
  let dataSourceValue = document.querySelector("span.data-source-value");
  let bigStatus = document.querySelector("p.big-status");
  let brought_or_taken = document.getElementsByClassName("brought-or-taken big-text-color")[0];
  let enlarged_card = document.getElementsByClassName("enlarged-card")[0];
  let datasource = document.getElementById("data_source");

  bigStreetValue.innerHTML = `${street.name}, ${street.lga}, ${street.state}`
  datasource.innerHTML = `${street.host}`

  if (street.status == 0){
    
    bigTimeValue.innerHTML = street.last_no_light;
    bigStatus.innerHTML = "There is no light in this location*";
    brought_or_taken.innerHTML = "taken on ";
    enlarged_card.style.backgroundColor = "black";
    color_detail_text("white");
  }
  else if (street.status == 1){
    
    bigTimeValue.innerHTML = street.last_light;
    bigStatus.innerHTML = "There is light in this location*";
    brought_or_taken.innerHTML = "brought on ";
    enlarged_card.style.backgroundColor = "#ffffff";
    color_detail_text("black");
  }
}


const create_timeline = (street)=>{
  
  let timeline_container = document.getElementById("timeline_container")
  let timeline = street.history.time_line
  timeline_container.innerHTML = "";
  let duration = "Ongoing"
  timeline.forEach((e)=>{
     template =  `<li>
                      <div class="direction-${e.status == 1 ? "r" : "l"}">
                        <div class="flag-wrapper">
                        <span class="flag flag-2">Light ${e.status == 1 ? "On" : "Off"}</span>
                          <span class="time-wrapper"
                            ><span class="time time-2"
                              >${e.time}</span
                              ></span
                          >
                        </div>
                        <div class="desc">
                        <span class="duration duration-2"
                            >${e.status == 1 ? "Uptime" : "Blackout"} Duration: ${duration}</span
                          >
                        </div>
                      </div>
                      </li>`
        timeline_container.innerHTML += template;
        duration = timeConvert(e.period)
  })
  

}


const plot_chart = (street)=>{
  
  var ctx = document.getElementById('container');
  ctx.style.background = "#e1e5e9";
  // ctx.style.backgroundColor = '#c3c3c3';
  let labels = street.history.daily_supply.labels.map(x => x.slice(x.length-6, x.length));

  if (myChart){
    myChart.destroy()
  }
  myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Hours Supplied',
              data: street.history.daily_supply.values,
              backgroundColor: "black",
              borderColor: "black",
              borderWidth: 1
          }]
      },
      options: {
        "hover": {
          "animationDuration": 0
        },
        "animation": {
          "duration": 1,
          "onComplete": function() {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
      
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            
      
            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                var data = (dataset.data[index]);
                let value = `${Math.round(data)}hrs`
                ctx.fillText(value, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
          legend: {
              display: false
          },
          scales: {
              yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Hours of light'
                  },
                  ticks: {
                      max: 25,
                      beginAtZero: true,
                      display: false
                  },
                  gridLines: {
                    display: false,
                    color: street.status == 1 ? '#c3c3c3' : "#616161",
                }
              }],
              xAxes: [{
                gridLines: {
                    display:false
                }   
            }]
          }
      }
  });
};

x = {
  "hover": {
    "animationDuration": 0
  },
  "animation": {
    "duration": 1,
    "onComplete": function() {
      var chartInstance = this.chart,
        ctx = chartInstance.ctx;

      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      this.data.datasets.forEach(function(dataset, i) {
        var meta = chartInstance.controller.getDatasetMeta(i);
        meta.data.forEach(function(bar, index) {
          var data = dataset.data[index];
          ctx.fillText(data, bar._model.x, bar._model.y - 5);
        });
      });
    }
  }
}