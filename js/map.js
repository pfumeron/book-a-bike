function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
};

function initMap() {
        var lyon = {lat: 45.750000, lng: 4.850000};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: lyon
        });

        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d", function (reponse) {
        var veloLyon = JSON.parse(reponse);
        var markers = [];
        veloLyon.forEach(function(station) {
          var marker = new google.maps.Marker({
            position: station.position,
            number: station.number,
            map: map,
          }); //fin du marker

          marker.addListener('click', function() {
            var url = "https://api.jcdecaux.com/vls/v1/stations/" + marker.number + "?contract=lyon&apiKey=93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d";

            ajaxGet(url, function (reponse) {
            var maStation = JSON.parse(reponse);

            var stationName = document.getElementById("station-name").innerHTML = maStation.name;
            var stationAddress = document.getElementById("station-address").innerHTML = maStation.address;
            var stationAvailableBikes = document.getElementById("available_bikes").innerHTML = maStation.available_bikes;
            });
          });

          markers.push(marker);
        }); // fin du forEach
      var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }); // fin du ajaxGet

    };        





        











