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