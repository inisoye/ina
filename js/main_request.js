//* updates colours of cards in list
var data = [];
var card_container = document.getElementById("result");

fetch("https://checklight.pythonanywhere.com/streets")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    // console.log(data.streets);
    data.streets.forEach(function(post) {
      //* Ifako Ijaiye 1 denote first subdivisions area.
      if (post.status == 0){
        card_container.innerHTML +=
                  `<a
                    href="#"
                    class="street card black-card" id = "${post.id}"
                    >
                    <div id = "${post.id}" class="image-container">
                      <img id = "${post.id}"
                        class="card-image bulb-or-lantern"
                        src="images/Lantern.svg"
                        alt="lantern icon"
                      />
                    </div>

                    <div id = "${post.id}" class="view-container">
                      <p id = "${post.id}" class="view-details">VIEW DETAILS</p>
                    </div>

                    <p id = "${post.id}" class="full-add">
                      ${post.name}, ${post.lga}, Lagos
                    </p>
                  </a>`
      }else if (post.status == 1){
        card_container.innerHTML +=
                    `<a
                    href="#"
                    class="street card white-card" id = "${post.id}"
                    >
                    <div id = "${post.id}" class="image-container">
                      <img id = "${post.id}"
                        class="card-image bulb-or-lantern"
                        src="images/Bulb.svg"
                        alt="lantern icon"
                      />
                    </div>

                    <div id = "${post.id}" class="view-container">
                      <p id = "${post.id}" class="view-details">VIEW DETAILS</p>
                    </div>

                    <p id = "${post.id}" class="full-add">
                      ${post.name}, ${post.lga}, Lagos
                    </p>
                  </a>`
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });

function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + "hr(s) " + rminutes + "min(s)";
}