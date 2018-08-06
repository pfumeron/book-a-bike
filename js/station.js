var Station = {
    init: function(name,address, available_bikes,status) {
        this.name = name;
        this.address = address;
        this.available_bikes = available_bikes;
        this.status = status;
    },

    afficher: function() {
        document.getElementById("station-name").innerHTML = this.name;
        document.getElementById("station-address").innerHTML = this.address;
        document.getElementById("available-bikes").innerHTML = this.available_bikes;
        if (this.status === "OPEN") {
            document.getElementById("status").innerHTML = "Station ouverte";
        } else {
            document.getElementById("status").innerHTML = "Station fermée";
        } 
    }
};