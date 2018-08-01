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


/* Objet Map */
var Map = {
    init: function(position, zoom) {
        this.position = position;
        this.zoom = zoom;
        this.map = new google.maps.Map(document.getElementById('map'), {zoom: this.zoom, center: this.position});
        return this.map;
    },
};

/* Objet Station */
var Station = {
    init: function(name,address, available_bikes) {
        this.name = name;
        this.address = address;
        this.available_bikes = available_bikes;
    },

    afficher: function() {
        document.getElementById("station-name").innerHTML = this.name;
        document.getElementById("station-address").innerHTML = this.address;
        document.getElementById("available_bikes").innerHTML = this.available_bikes;
    }
};



var myMap = Object.create(Map);
var position = {lat: 45.750000, lng: 4.850000};
myMap = myMap.init(position, 13);

var markers = [];
var bookBikeBtn = document.getElementById("book-bike-btn");
var validateBookingButton = document.getElementById("validate-booking");
var clearSignature = document.getElementById("clear");

var canvas = document.querySelector("canvas");


ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d", function (reponse) {
    var json_response = JSON.parse(reponse);

    json_response.forEach(function(station) {
        var marker = new google.maps.Marker({
            position: station.position,
            number: station.number,
            map: myMap,
            icon: "images/bike_icon.png",            
        });
    
    marker.addListener('click', function() {
        validateBookingButton.classList.remove("show-validate-booking");
        clearSignature.classList.remove("show-clear");
        document.getElementById("no-bike-available").classList.remove("show-no-bike-available");
        bookBikeBtn.classList.add("show-book-bike-btn");

        var url = "https://api.jcdecaux.com/vls/v1/stations/" + marker.number + "?contract=lyon&apiKey=93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d";

        ajaxGet(url, function (reponse) {
        
        var maStation = Object.create(Station);
        maStation.init(JSON.parse(reponse).name,JSON.parse(reponse).address,JSON.parse(reponse).available_bikes);
            if (maStation.available_bikes === 0) {
                bookBikeBtn.classList.remove("show-book-bike-btn");
                document.getElementById("map").classList.add("add-station-details");
                document.getElementById("station-details").classList.add("show-station-details");
                document.getElementById("no-bike-available").classList.add("show-no-bike-available");
            }
            else {
                document.getElementById("map").classList.add("add-station-details");
                document.getElementById("station-details").classList.add("show-station-details");
                bookBikeBtn.classList.add("show-book-bike-btn");
            }

        canvas.style.display = "none";
        maStation.afficher();
        });
    });

      markers.push(marker);  
    });

    var markerCluster = new MarkerClusterer(myMap, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
});


bookBikeBtn.addEventListener('click', function() {
    canvas.style.display = "block";
    validateBookingButton.classList.add("show-validate-booking");
    clearSignature.classList.add("show-clear");
    bookBikeBtn.classList.remove("show-book-bike-btn");
});

var goBackToMap = document.getElementById("go-back-map-mobile");
goBackToMap.addEventListener('click', function() {
    document.getElementById("station-details").classList.remove("show-station-details");
    document.getElementById("map").classList.remove("add-station-details");
});













