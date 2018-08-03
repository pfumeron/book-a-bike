
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






