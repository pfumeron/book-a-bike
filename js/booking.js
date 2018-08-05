var Booking = {

	bookBike: function (stationNumber) {
    	var url = "https://api.jcdecaux.com/vls/v1/stations/" + stationNumber + "?contract=lyon&apiKey=93e55d0f44a09c1eb3a3a29e5ae0068c69ae318d";
        ajaxGet(url, function (reponse) {
            var address = JSON.parse(reponse).address;
            if(typeof sessionStorage!='undefined') {
                
                sessionStorage.timeValidateBooking = Date.now();
                sessionStorage.maStationAddress = address;

                if('timeValidateBooking' in sessionStorage) {
                    Booking.displayTimer();
                }

            } else {
                alert("sessionStorage n'est pas supporté");
            }
        });
    },

    displayTimer: function () {
    	var bookingConfirmed = document.getElementById("booking-confirmed");
		
		var countDownTime = 1200000;
	    
	    // Update the count down every 1 second
		var x = setInterval(function() {
			var now = Date.now() - sessionStorage.timeValidateBooking;
			var distance = countDownTime - now;

		    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			document.getElementById("time-left-booking").innerHTML = minutes + ":" + seconds;

			// confirmation message			    
	    	bookingConfirmed.classList.add("show-reservation");
	    	document.getElementById("booking-confirmed-station-address").innerHTML = sessionStorage.maStationAddress;

			// If the count down is finished, clears the booking and removes footer 
	    	if (distance < 0) {
			    clearInterval(x);
			    bookingConfirmed.classList.remove("show-reservation");
	    	}

	    	
		}, 1000);
    }
};