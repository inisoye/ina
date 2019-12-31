let mapContainer = document.querySelector("div.map-container");

mapButton.addEventListener("click", function() {
  mapContainer.style.display = "grid";
});

forecastButton.addEventListener("click", function() {
  mapContainer.style.display = "none";
});

rankingsButton.addEventListener("click", function() {
  mapContainer.style.display = "none";
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW5pc295ZSIsImEiOiJjazRtYzZxcWYwdDB1M2xuNTl3YXJ1bXc5In0.vfxOcP9RhW08C-SoFtSV8g";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/inisoye/ck4pqx1en1irw1crv8twc5iko"
});

//* Makes the map fill the container regardless of size
map.on("load", () => {
  map.resize();

  map.fitBounds([
    [3.453827, 6.673474], // Northeast
    [3.287144, 6.490666] // Southwest
  ]);

  map.on("click", e => {
    let areas = map.queryRenderedFeatures(e.point, {
      layers: ["areas"]
    });

    //* update area info
    let areaUpdate = document.querySelector("p.area-update");
    areaUpdate.textContent = areas[0].properties.name;

    //* hide instr show info
    let instrOverlay = document.querySelector("div.instr-overlay");
    let infoOverlay = document.querySelector("section.info-overlay");
    instrOverlay.style.display = "none";
    infoOverlay.style.display = "grid";
  });

  let mapFeatures = map.queryRenderedFeatures({ layers: ["areas"] });
  // var mapFeatures = map.querySourceFeatures("composite", {
  //   sourceLayer: "streets-1jwgoh"
  // });
  console.log(mapFeatures);

  // let blah = map.getSource("composite").vectorLayerIds;
  // console.log(blah);

  fetch("https://checklight.pythonanywhere.com/streets")
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      let streetsArray = data.streets.map(eachStreet => ({
        name: eachStreet.name,
        host: eachStreet.host,
        status: eachStreet.status
      }));

      //* extract array of only host streets
      let hostStreetsArray = streetsArray.filter(streetObject => {
        return streetObject.host.includes(streetObject.name);
      });

      console.log(hostStreetsArray);

      // mapFeatures.forEach((feature) => {
      //   var prop = feature.properties;
      //   // console.log(prop);
      //   console.log(prop.hostStreet);
      // });
    })

    .catch(function(error) {
      console.log(error);
    });
});
