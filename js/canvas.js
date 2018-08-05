var signaturePad = {
	clickX: new Array(),
	clickY: new Array(),
	newDrawing: new Array(),
	paint: false,
	isNotEmpty: false,

	init: function(canvasId) {
		signaturePad.canvas = document.getElementById(canvasId);
		signaturePad.context = signaturePad.canvas.getContext("2d"),
		signaturePad.canvas.addEventListener("mousedown",signaturePad.mouseDown);
	    signaturePad.canvas.addEventListener("mousemove", signaturePad.mouseMove);
	    signaturePad.canvas.addEventListener("mouseup",signaturePad.mouseUp);

	     //For mobile
	    signaturePad.canvas.addEventListener("touchstart", signaturePad.mouseDown, false);
	    signaturePad.canvas.addEventListener("touchmove", signaturePad.touchMove, true);
	    signaturePad.canvas.addEventListener("touchend", signaturePad.mouseUp, false);
	    document.body.addEventListener("touchcancel", signaturePad.mouseUp, false);

	    var clearButton = document.getElementById("clear");
	    clearButton.addEventListener('click', signaturePad.clear);
	    
		var validateBooking = document.getElementById("validate-booking");
		validateBooking.addEventListener('click', function(){
            if (signaturePad.isNotEmpty) {
                if ('timeValidateBooking' in sessionStorage) {
                    var confirmNewBooking = confirm("Attention, en validant, vous annulerez votre réservation en cours.");
                    if (confirmNewBooking) {
                        Booking.bookBike();
                        //hide buttons once booking is confirmed
                        canvas.style.display = "none"; 
                        validateBookingButton.classList.remove("show-validate-booking");
                        clearSignature.classList.remove("show-clear"); 
                    }
                } else {
        		    Booking.bookBike();
                    //hide buttons once booking is confirmed
                    canvas.style.display = "none"; 
                    validateBookingButton.classList.remove("show-validate-booking");
                    clearSignature.classList.remove("show-clear");
                    signaturePad.clear();
                } 
            } else {
                console.log("test");
    		  	alert("Veuillez signer pour réserver votre vélo.");
    		}
		});    
	},

	addClick: function(mouseX,mouseY,newClick) {
        signaturePad.clickX.push(mouseX);
        signaturePad.clickY.push(mouseY);
        signaturePad.newDrawing.push(newClick);
	},

	mouseDown: function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        
        if (mouseX > 0) {
	        signaturePad.paint = true;
		    signaturePad.addClick(mouseX, mouseY, false); //sends coordinates
		    signaturePad.draw();
        }
	},

    draw: function () {
        signaturePad.context.strokeStyle = "#000000";  //set the "ink" color
        signaturePad.context.lineJoin = "miter";       //line join
        signaturePad.context.lineWidth = 2;

        for (var i=0; i < signaturePad.clickX.length;i++) {
            signaturePad.context.beginPath();
            
            if (signaturePad.newDrawing[i]) {
                signaturePad.context.moveTo(signaturePad.clickX[i-1], signaturePad.clickY[i-1]);    
            } else {
                signaturePad.context.moveTo(signaturePad.clickX[i]-1, signaturePad.clickY[i]);
            }
            
            signaturePad.context.lineTo(signaturePad.clickX[i],signaturePad.clickY[i]);
            signaturePad.context.stroke();                                  //filled with "ink"
            signaturePad.context.closePath();                               //close path
        }

        signaturePad.isNotEmpty = true;
    },

    mouseMove: function (e) {
    	e.preventDefault();
        if (signaturePad.paint) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            signaturePad.addClick(mouseX, mouseY, true);
            signaturePad.draw();
        }
	},

    touchMove: function (e) {
        e.preventDefault();
        if (signaturePad.paint) {
            var touch = e.touches[0]; // Get the information for finger #1
            var mouseX = touch.pageX - this.offsetLeft;
            var mouseY = touch.pageY - this.offsetTop;
            signaturePad.addClick(mouseX, mouseY, true);
            signaturePad.draw();
        } else {
        	signaturePad.paint = true;
        	signaturePad.addClick(mouseX, mouseY, false);
            signaturePad.draw();
            }
    },

    mouseUp: function (e) {
        signaturePad.paint = false;
    },

    clear: function (e) {
        signaturePad.context.clearRect(0,0,signaturePad.canvas.width,signaturePad.canvas.height);
        signaturePad.clickX = [];
        signaturePad.clickY = [];
        signaturePad.newDrawing = [];
        signaturePad.isNotEmpty = false;
	}
};