var Ajax = {
    baseUrl: "https://api.jcdecaux.com/vls/v1",
    apiKey: "93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d",

    getAllStations: function(contract, callback) {
    var url = this.baseUrl + '/stations?contract=' + contract + '&apiKey=' + this.apiKey;
    this.load(url, callback);
    },

    getStation: function(contract, stationNumber, callback) {
    var url = this.baseUrl + "/stations/" + stationNumber +"?contract=" + contract + '&apiKey=' + this.apiKey;
    this.load(url, callback);
    },

    load: function(url, callback) {
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
    }
};








/*function ajaxGet(url, callback) {
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



ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d", function (reponse) {
    var json_response = JSON.parse(reponse);

    var canvas = Object.create(signaturePad);
    canvas.init("canvas");

    myMap.addStations(json_response);
});*/











