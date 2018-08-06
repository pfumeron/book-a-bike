var Booking = {
    bookBike: function (stationNumber) {
        apiJCDecaux.getStation('lyon',stationNumber, function(response) {
            var address = JSON.parse(response).address;
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