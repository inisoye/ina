$(function() {
  fetch("https://checklight.pythonanywhere.com/streets")
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      //* put streets from api in array
      let streetsArray = data.streets.map(
        eachStreet =>
          `${eachStreet.name}, ${eachStreet.lga}, ${eachStreet.state}`
      );

      console.log("yes");

      let addAutocomplete = inputQuery => {
        $(inputQuery).autocomplete(
          {
            //* bit added to limit dropdown items: https://stackoverflow.com/questions/7617373/limit-results-in-jquery-ui-autocomplete
            source: function(request, response) {
              var results = $.ui.autocomplete.filter(
                streetsArray,
                request.term
              );

              response(results.slice(0, 4));
            }
          },
          { delay: 0 }
        );
      };

      addAutocomplete("#light-location");
      addAutocomplete("#fuel-location");
      addAutocomplete("#first-location");
      addAutocomplete("#second-location");
      addAutocomplete("#third-location");
    })
    .catch(function(error) {
      console.log(error);
    });
});
