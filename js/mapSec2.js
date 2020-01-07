//* dash-buttons
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

//* view-streets modal control
let openStreets = document.querySelector("button.view-streets");
let closeStreets = document.querySelector("button.close-streets-modal");
let streetsModal = document.querySelector("div.modal-streets-list"); //* actually the overlay
let streetsModalInner = document.querySelector("div.modal-inner");

openStreets.addEventListener("click", () => {
  streetsModal.style.display = "block";
});
closeStreets.addEventListener("click", () => {
  streetsModal.style.display = "none";
});

//* click outside inner modal to close
document.addEventListener("click", event => {
  let isClickInsideModal = streetsModal.contains(event.target);
  let isModalOpen = streetsModal.style.display === "block";
  let isClickInsideModalInner = streetsModalInner.contains(event.target);

  //* if click within modal overlay but not within the inner modal and the modal is open, hide.
  if (isClickInsideModal && isModalOpen && !isClickInsideModalInner) {
    streetsModal.style.display = "none";
  }
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW5pc295ZSIsImEiOiJjazRtYzZxcWYwdDB1M2xuNTl3YXJ1bXc5In0.vfxOcP9RhW08C-SoFtSV8g";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/inisoye/ck4veka1f2wnd1cr97gr3d2kt"
});

if (matchMedia("(min-width: 950px)").matches) {
  map.addControl(new mapboxgl.NavigationControl());
}

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

    paint: {
      //* match approach to painting: https://stackoverflow.com/questions/46177267/mapbox-layer-fill-color-based-on-text-property?answertab=oldest#tab-top
      //! match approach not used

      //* if light paint yellow, paint black if otherwise. status feature-state created
      "fill-color": [
        "case",
        ["boolean", ["feature-state", "status"], false],
        "#ffb005",
        "#1b2429"
      ],

      //* idea: https://docs.mapbox.com/mapbox-gl-js/style-spec/#types-function-zoom-property
      "fill-opacity": {
        stops: [
          // zoom is 12 -> zoom will be 1
          [11, 1],
          // zoom is 16 -> zoom will be 0.65
          [16, 0.65]
        ]
      }
    }
  });

  map.addLayer({
    id: "area-lines",
    type: "line",
    source: "areas",
    paint: {
      "line-color": [
        "case",
        ["boolean", ["feature-state", "status"], false],
        "#1b2429",
        "#ffb005"
      ],

      "line-width": [
        "case",
        ["boolean", ["feature-state", "border"], false],
        2,
        0
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

      //* sort array alphabetically based on street names
      hostStreetsArray.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );

      paintAreaData = e => {
        //* ensures nothing  happens till map loads completely. Idea: https://stackoverflow.com/questions/50705118/mapbox-queryrenderedfeatures-on-load
        if (!map.loaded()) {
          return;
        }

        let tilesArray = e.features;

        //* sort array of tiles alphabetically as well to match order of "hostStreetsArray"
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
        }

        map.resize();

        map.on("click", f => {
          //* creates a box around clicked point on map: https://docs.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures-around-point/
          var bbox = [
            [f.point.x - 0.5, f.point.y - 0.5],
            [f.point.x + 0.5, f.point.y + 0.5]
          ];
          var features = map.queryRenderedFeatures(bbox, {
            layers: ["area-colours"]
          });

          let statusUpdate = document.querySelector("p.status-update");
          if (features[0].state.status) {
            statusUpdate.textContent = "Light On";
          } else {
            statusUpdate.textContent = "No Light";
          }

          //* update area info
          let areaUpdate = document.querySelector("p.area-update");
          areaUpdate.textContent = features[0].properties.name;

          //* update area streets
          let clickedAreaStreets = streetsArray.filter(streetObject => {
            return streetObject.host
              .toLowerCase()
              .includes(features[0].properties.hostStreet.toLowerCase());
          });

          let clickedAreaStreetsArray = clickedAreaStreets.map(
            eachStreet => `${eachStreet.name}`
          );

          let listContainer = document.querySelector(".streets-list-container");

          //* empty container on each click - without innerHTML
          while (listContainer.firstChild)
            listContainer.removeChild(listContainer.firstChild);

          for (i = 0; i < clickedAreaStreetsArray.length; i++) {
            let newListItem = document.createElement("li");

            newListItem.classList.add("street-item");

            newListItem.insertAdjacentHTML(
              "beforeend",
              `${clickedAreaStreetsArray[i]}`
            );

            listContainer.appendChild(newListItem);
          }

          //* filter goes here
          //* create street filter functionality
          let streetFilter = document.querySelector("input.streets-filter");
          let streetItems = document.querySelectorAll("li.street-item");

          streetFilter.onkeyup = () => {
            for (i = 0; i < streetItems.length; i++) {
              if (
                streetItems[i].innerHTML
                  .toLowerCase()
                  .includes(streetFilter.value.toLowerCase())
              ) {
                streetItems[i].style.display = "";
              } else {
                streetItems[i].style.display = "none";
              }
            }
          };

          //* outline clicked card
          let featureID = features[0].id;
          map.setFeatureState(
            { source: "areas", id: featureID },
            { border: true }
          );

          setTimeout(function() {
            map.setFeatureState(
              { source: "areas", id: featureID },
              { border: false }
            );
          }, 3000);
        });

        //* function zooms into card
        map.on("click", g => {
          var bbox = [
            [g.lngLat.lng + 0.005, g.lngLat.lat + 0.005],
            [g.lngLat.lng - 0.005, g.lngLat.lat - 0.005]
          ];

          //* zoom to clicked tile
          map.fitBounds(bbox);

          //* hide instr show info
          let instrOverlay = document.querySelector("div.instr-overlay");
          let infoOverlay = document.querySelector("section.info-overlay");
          instrOverlay.style.display = "none";
          infoOverlay.style.display = "grid";
        });

        map.resize();

        //* ensures onrender (below) occurs just a couple of times. itll otherwise keep firing
        map.off("render", "area-colours", paintAreaData);
        // setTimeout(function() {
        //   map.off("render", "area-colours", paintAreaData);
        // }, 1000);
      };

      map.resize();

      map.on("render", "area-colours", paintAreaData);
    })

    .catch(function(error) {
      console.log(error);
    });
});
