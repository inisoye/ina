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

      //* if no light paint yellow, paint black if otherwise. status feature-state created
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

      paintAreaData = e => {
        //* ensures nothing  happens till map loads completely. Idea: https://stackoverflow.com/questions/50705118/mapbox-queryrenderedfeatures-on-load
        if (!map.loaded()) {
          return;
        }

        let tilesArray = e.features;

        tilesArray.sort((a, b) =>
          a.properties.hostStreet
            .toLowerCase()
            .localeCompare(b.properties.hostStreet.toLowerCase())
        );

        for (i = 0; i < tilesArray.length; i++) {
          if (
            tilesArray[i].properties.hostStreet.toLowerCase() ===
              hostStreetsArray[i].name.toLowerCase() &&
            hostStreetsArray[i].status === 1
          ) {
            tilesArray[i].properties.status = 1;

            let tileID = tilesArray[i].id;
            //* set status to true if there is light
            map.setFeatureState(
              { source: "areas", id: tileID },
              { status: true }
            );
          } else if (
            tilesArray[i].properties.hostStreet.toLowerCase() ===
              hostStreetsArray[i].name.toLowerCase() &&
            hostStreetsArray[i].status !== 1
          ) {
            tilesArray[i].properties.status = 0;

            let tileID = tilesArray[i].id;
            map.setFeatureState(
              { source: "areas", id: tileID },
              { status: false }
            );
          }

          // tilesArray[i].addEventListener("click", function() {});
          // console.log(tilesArray[i]);
        }

        console.log(tilesArray);

        //* ensures onrender occurs just once. itll otherwise keep firing
        map.off("render", "area-colours", paintAreaData);
      };

      map.on("click", f => {
        //* creates a box around clicked point on map
        var bbox = [
          [f.point.x - 0.5, f.point.y - 0.5],
          [f.point.x + 0.5, f.point.y + 0.5]
        ];
        var features = map.queryRenderedFeatures(bbox, {
          layers: ["area-colours"]
        });

        console.log(features);
        let statusUpdate = document.querySelector("p.status-update");
        if (features[0].properties.status) {
          statusUpdate.textContent = "Light On";
        } else {
          statusUpdate.textContent = "No Light";
        }
      });

      map.on("render", "area-colours", paintAreaData);
    })

    .catch(function(error) {
      console.log(error);
    });
});
