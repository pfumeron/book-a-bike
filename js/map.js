var Map = {
    init: function(position, zoom) {
        this.position = position;
        this.zoom = zoom;
        this.map = new google.maps.Map(document.getElementById('map'), {zoom: this.zoom, center: this.position});
    },

    resize: function() {
        document.getElementById("map").classList.add("add-station-details");
    },

    addStations: function(stations) {
        var validateBookingButton = document.getElementById("validate-booking"),
            clearSignature        = document.getElementById("clear"),
            bookBikeBtn           = document.getElementById("book-bike-btn"),
            markers               = [],
            m                     = this.map;
        
        stations.forEach(function(station) {
            var marker = new google.maps.Marker({
                position: station.position,
                number: station.number,
                map: m,
                icon: "images/bike_icon.png",            
            });
        
            marker.addListener('click', function() {
                validateBookingButton.setAttribute("data-station-number",marker.number);
                validateBookingButton.classList.remove("show-validate-booking");
                clearSignature.classList.remove("show-clear");
                bookBikeBtn.classList.add("show-book-bike-btn");

                apiJCDecaux.getStation('lyon',marker.number,function(response) {
                    var name            = JSON.parse(response).name,
                        status          = JSON.parse(response).status,
                        address         = JSON.parse(response).address,
                        availableBikes = JSON.parse(response).available_bikes,
                        maStation       = Object.create(Station);
                
                    maStation.init(name, address, availableBikes,status);
                    
                    if (availableBikes === 0) {
                        bookBikeBtn.classList.remove("show-book-bike-btn");
                        Map.resize();
                        document.getElementById("station-details").classList.add("show-station-details");
                        document.getElementById("status").classList.add("show-status");
                        document.getElementById("no-bike-available").classList.add("show-no-bike-available");
                    }
                    else {
                        document.getElementById("no-bike-available").classList.remove("show-no-bike-available");
                        document.getElementById("status").classList.add("show-status");
                        document.getElementById("map").classList.add("add-station-details");
                        document.getElementById("station-details").classList.add("show-station-details");
                        bookBikeBtn.classList.add("show-book-bike-btn");
                    }

                    signaturePad.canvas.style.display = "none";
                    maStation.afficher();
                });
            });
            markers.push(marker);  
        });

        var markerCluster = new MarkerClusterer(m, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
};