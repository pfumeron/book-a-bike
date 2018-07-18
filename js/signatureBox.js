$(document).ready(function() {

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d"); 
    var clickX = new Array();
    var clickY = new Array();
    var newDrawing = new Array();
    var paint = false;
    var clearButton = document.getElementById("clear");
    var validateBooking = document.getElementById("validate-booking");
    var isnotEmpty = false;
    

    canvas.addEventListener("mousedown",mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup",mouseUp);

     //For mobile
    canvas.addEventListener("touchstart", mouseDown, false);
    canvas.addEventListener("touchmove", touchMove, true);
    canvas.addEventListener("touchend", mouseUp, false);
    document.body.addEventListener("touchcancel", mouseUp, false);

    clearButton.addEventListener('click', clear);
    validateBooking.addEventListener('click', bookBike);
    
    function mouseDown(e) {
        
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        
        addClick(mouseX, mouseY, false); //sends coordinates
        draw();
    }

    
    function addClick(mouseX,mouseY,newClick) {
        clickX.push(mouseX);
        clickY.push(mouseY);
        newDrawing.push(newClick);
    }

    
    function draw() {
        context.strokeStyle = "#000000";  //set the "ink" color
        context.lineJoin = "miter";       //line join
        context.lineWidth = 2;

        for (var i=0; i < clickX.length;i++) {
            context.beginPath();
            
            if (newDrawing[i]) {
                context.moveTo(clickX[i-1], clickY[i-1]);    
            } else {
                context.moveTo(clickX[i]-1, clickY[i]);
            }
            
            context.lineTo(clickX[i],clickY[i]);
            context.stroke();                                  //filled with "ink"
            context.closePath();                               //close path
        }

        isnotEmpty = true;

    }

    function mouseMove(e) {
        e.preventDefault();
        if (paint) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            addClick(mouseX, mouseY, true);
            draw();
        }

    }

    function touchMove(e) {
        e.preventDefault();
        if (paint) {
            var touch = e.touches[0]; // Get the information for finger #1
            var mouseX = touch.pageX - this.offsetLeft;
            var mouseY = touch.pageY - this.offsetTop;

            addClick(mouseX, mouseY, true);
            draw();
        }

    }

    function mouseUp(e) {
        paint = false;
    }

    function clear(e) {
        context.clearRect(0,0,canvas.width,canvas.height);
        clickX = [];
        clickY = [];
        newDrawing = [];
        isnotEmpty = false;
    }

    function bookBike(e) {
        if (isEmpty) {
            console.log("Votre vélo est réservé pendant 20min");
        }
        else {
            console.log("Veuillez refaire votre signature");
        }
    }
});