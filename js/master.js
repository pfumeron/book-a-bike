// ---------------     DIAPORAMA     ------------------

//Create slides for diaporama
var diapositive1 = Object.create(Diapositive);
	diapositive1.init("images/img1.png","Choissisez sur la station de votre choix en cliquant sur l'un des points sur la carte. Un cercle avec un chiffre à l'intérieur indique plusieurs stations proches les unes des autres.");

var diapositive2 = Object.create(Diapositive);
	diapositive2.init("images/img2.png","Vérifier les informations de la station, si vous souhaitez confirmer votre réservation, cliquez sur Réserver");

var diapositive3 = Object.create(Diapositive);
	diapositive3.init("images/img3.png","Finaliser votre réservation en signant dans le cadre puis cliquez sur Valider.");

var diapositive4 = Object.create(Diapositive);
	diapositive4.init("images/img4.png","Vous verrez apparaître un message en bas de page confirmant que votre vélo est réservé pendant 20min.");

var diapositives = [diapositive1,diapositive2,diapositive3,diapositive4];

// Create diaporama object
var diaporama = Object.create(Diaporama);
	diaporama.init(diapositives);

// diaporama behavior
var boutonfg = document.getElementById("left-arrow");
boutonfg.addEventListener("click", function () {
    diaporama.changeSlide(-1);
});

var boutonfd = document.getElementById("right-arrow");
boutonfd.addEventListener("click", function () {
    diaporama.changeSlide(1);
});

window.addEventListener("keyup", function(e) {
	if(e.keyCode == "37") {
		diaporama.changeSlide(-1);
	} else if(e.keyCode == "39") {
		diaporama.changeSlide(1);
	}
});


// --------------    MAP     ----------------

var maStation = Object.create(Station);

var myMap = Object.create(Map);
var position = {lat: 45.750000, lng: 4.850000};
myMap.init(position, 13);

var canvas = document.getElementById("canvas");
var bookBikeBtn = document.getElementById("book-bike-btn");
var validateBookingButton = document.getElementById("validate-booking");
var clearSignature = document.getElementById("clear");

// Book-a-bike button
bookBikeBtn.addEventListener('click', function() {
    canvas.style.display = "block";
    validateBookingButton.classList.add("show-validate-booking");
    clearSignature.classList.add("show-clear");
    bookBikeBtn.classList.remove("show-book-bike-btn");
});

// On mobile only : Go back to map 
var goBackToMap = document.getElementById("go-back-map-mobile");
goBackToMap.addEventListener('click', function() {
    document.getElementById("station-details").classList.remove("show-station-details");
    document.getElementById("map").classList.remove("add-station-details");
});







// ------------ CANVAS --------------


// booking.init(maStation.name,maStation.address);
// booking.afficher();



// Check if a reservation is already occuring
if(typeof sessionStorage!='undefined') {	

	if('timeValidateBooking' in sessionStorage) {
		Booking.displayTimer();
	}
}




