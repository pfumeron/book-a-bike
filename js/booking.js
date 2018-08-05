var Booking = {
	
	init: function(name,address) {
        this.name = name;
        this.address = address;

    },

    afficher: function() {
        document.getElementById("booking-confirmed-station-address").innerHTML = this.address;
    },

	bookBike: function (e) {
    	
    	
    	if(typeof sessionStorage!='undefined') {
			
			sessionStorage.timeValidateBooking = Date.now();

			if('timeValidateBooking' in sessionStorage) {
			    booking.displayTimer();
			}

		} else {
		  alert("sessionStorage n'est pas supporté");
		}

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

			// If the count down is finished, clears the booking and removes footer 
	    	if (distance < 0) {
			    clearInterval(x);
			    bookingConfirmed.classList.remove("show-reservation");
	    	}

	    	
		}, 1000);
    }
};