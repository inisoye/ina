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

  map.addSource("areas", {
    type: "geojson",
    data: "https://inisoye.github.io/ina/areas.geojson",
    generateId: true // this ensure that all features have unique ids
  });

  map.addLayer({
    id: "area-colours", // the layer id
    type: "fill", // the type of layer
    source: "areas", // the source for the layer (we set it up above)
    sourceLayer: "areasAndData",

    //* match approach to painting: https://stackoverflow.com/questions/46177267/mapbox-layer-fill-color-based-on-text-property?answertab=oldest#tab-top
    paint: {
      // "fill-color": [
      //   "match",
      //   ["get", "status"], // get the property
      //   0,
      //   "#1b2429", // if 0 then dark
      //   1,
      //   "#ffb005", // if 1 then yellow
      //   "white" // white otherwise
      // ]

      //* if no light paint yellow, paint black if otherwise
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "status"], false],
        "#ffb005",
        "#1b2429"
      ]
    }
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

      hostStreetsArray.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );

      console.log(hostStreetsArray);

      sortAreaData = e => {
        //* ensures nothing  happens till map loads completely. Idea: https://stackoverflow.com/questions/50705118/mapbox-queryrenderedfeatures-on-load
        if (!map.loaded()) {
          return;
        }

        e.features.sort((a, b) =>
          a.properties.hostStreet
            .toLowerCase()
            .localeCompare(b.properties.hostStreet.toLowerCase())
        );

        let tilesArray = e.features;

        for (i = 0; i < tilesArray.length; i++) {
          if (
            tilesArray[i].properties.hostStreet.toLowerCase() ===
              hostStreetsArray[i].name.toLowerCase() &&
            hostStreetsArray[i].status === 1
          ) {
            // tilesArray[i].properties.status = 1;
            let tileID = tilesArray[i].id;

            map.setFeatureState(
              { source: "areas", id: tileID },
              { status: true }
            );
            // console.log(tilesArray[i].properties.hostStreet);
            // console.log(tilesArray[i].properties.status);
          } else if (
            tilesArray[i].properties.hostStreet.toLowerCase() ===
              hostStreetsArray[i].name.toLowerCase() &&
            hostStreetsArray[i].status !== 1
          ) {
            // tilesArray[i].properties.status = 0;
            let tileID = tilesArray[i].id;

            map.setFeatureState(
              { source: "areas", id: tileID },
              { status: false }
            );
          }
        }

        console.log(tilesArray);

        //* ensures onrender occurs just once. itll otherwise keep firing
        map.off("render", "area-colours", sortAreaData);
      };

      map.on("render", "area-colours", sortAreaData);
    })

    .catch(function(error) {
      console.log(error);
    });
});
