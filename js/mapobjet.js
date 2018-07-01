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

ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d", function (reponse) {
    var json_response = JSON.parse(reponse);

    json_response.forEach(function(station) {
        var marker = new google.maps.Marker({
            position: station.position,
            number: station.number,
            map: myMap,
        });
    
    marker.addListener('click', function() {
        var url = "https://api.jcdecaux.com/vls/v1/stations/" + marker.number + "?contract=lyon&apiKey=93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d";

        ajaxGet(url, function (reponse) {
        
        var maStation = Object.create(Station);
        maStation.init(JSON.parse(reponse).name,JSON.parse(reponse).address,JSON.parse(reponse).available_bikes);
        var bookBikeBtn = document.getElementById("book-bike-btn");
        if (maStation.available_bikes === 0) {
            bookBikeBtn.style.display = "none";
        }
        else {
            bookBikeBtn.style.display = "block"
        }

        maStation.afficher();
        });
    });

      markers.push(marker);  
    });

    var markerCluster = new MarkerClusterer(myMap, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
});



//afficher bouton réserver uniquement si vélos disponibles, puis au click du réserver ==> le canvas apparaît pour faire la signature









