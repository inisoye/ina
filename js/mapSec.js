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
  style: "mapbox://styles/inisoye/ck4veka1f2wnd1cr97gr3d2kt"
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

      afterMapLoads = () => {
        //* ensures map is loadeed before query. Idea: https://stackoverflow.com/questions/50705118/mapbox-queryrenderedfeatures-on-load
        if (!map.loaded()) {
          return;
        } //* map still not loaded; bail out.

        //* now that the map is loaded, it's safe to query the features:
        let mapFeatures = map.queryRenderedFeatures({ layers: ["areas"] });

        //* create array of tileset features
        let tileFeatures = mapFeatures.map(eachFeature => ({
          name: eachFeature.properties.hostStreet,
          status: eachFeature.properties.status
        }));

        //* sort both alphabetically arrays by name. idea: https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
        tileFeatures.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        hostStreetsArray.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );

        //* change status in tile properties
        for (i = 0; i < tileFeatures.length; i++) {
          if (
            tileFeatures[i].name.toLowerCase() ===
            hostStreetsArray[i].name.toLowerCase()
          ) {
            tileFeatures[i].status = hostStreetsArray[i].status;
            console.log(hostStreetsArray[i].name.toLowerCase());
          }
        }

        // map.getSource("ina").setData(data);

        //* update no-light alert on tile click
        map.on("click", e => {
          let areas = map.queryRenderedFeatures(e.point, {
            layers: ["areas"]
          });

          //* update area info
          let statusUpdate = document.querySelector("p.status-update");
          if (areas[0].properties.status) {
            statusUpdate.textContent = "Light On";
          } else {
            statusUpdate.textContent = "No Light";
          }
        });

        console.log(tileFeatures);
        console.log(hostStreetsArray);
        map.resize();

        //* ensures onrender occurs just once
        map.off("render", afterMapLoads); // remove this handler now that we're done.
      };

      map.on("render", afterMapLoads);
    })

    .catch(function(error) {
      console.log(error);
    });
});
