var Diapositive = {
	init : function(src,legende) {
		this.src = src;
		this.legende = legende;
	}
};

var diapositive1 = Object.create(Diapositive);
	diapositive1.init("../images/img1.jpg","Légende de l'image 1");

var diapositive2 = Object.create(Diapositive);
	diapositive2.init("../images/img2.jpg","Légende de l'image 2");

var diapositive3 = Object.create(Diapositive);
	diapositive3.init("../images/img3.jpg","Légende de l'image 3");

var diapositives = [diapositive1,diapositive2,diapositive3];




var Diaporama = {
	init : function(slides) {
		this.slides = slides;
		this.slideIndex = 0;
	},
	changeSlide: function(n) {
		this.slideIndex = this.slideIndex + n;
		if (this.slideIndex < 0) {
			this.slideIndex = this.slides.length -1;
		}
		if (this.slideIndex > this.slides.length -1) {
			this.slideIndex = 0;
		}
		document.getElementById("my-slides").src = this.slides[this.slideIndex].src;
		document.getElementById("myDescriptions").innerHTML = this.slides[this.slideIndex].legende;
	}
};

var diaporama = Object.create(Diaporama);
	diaporama.init(diapositives);


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




