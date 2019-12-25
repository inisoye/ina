void (function() {
  "use strict";

  fetch("https://checklight.pythonanywhere.com/streets")
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      let streetsArray = data.streets.map(
        eachStreet =>
          `${eachStreet.name}, ${eachStreet.lga}, ${eachStreet.state}`
      );
      // console.log(streetsArray);

      horsey(document.querySelector("#first-location"), {
        source: [{ list: streetsArray }],
        limit: 4
      });
      horsey(document.querySelector("#second-location"), {
        source: [{ list: streetsArray }],
        limit: 4
      });
      horsey(document.querySelector("#third-location"), {
        source: [{ list: streetsArray }],
        limit: 4
      });
    })
    .catch(function(error) {
      console.log(error);
    });

  function events(el, type, fn) {
    if (el.addEventListener) {
      el.addEventListener(type, fn);
    } else if (el.attachEvent) {
      el.attachEvent("on" + type, wrap(fn));
    } else {
      el["on" + type] = wrap(fn);
    }

    function wrap(originalEvent) {
      var e = originalEvent || global.event;
      e.target = e.target || e.srcElement;
      e.preventDefault =
        e.preventDefault ||
        function preventDefault() {
          e.returnValue = false;
        };
      e.stopPropagation =
        e.stopPropagation ||
        function stopPropagation() {
          e.cancelBubble = true;
        };
      fn.call(el, e);
    }
  }
})();
