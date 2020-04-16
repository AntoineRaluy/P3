export default class Slideshow {
    constructor(slidesPosition) {
        this.$slideElements = document.querySelector(slidesPosition);
        this.$prevBtn = document.querySelector('.fa-chevron-circle-left');
        this.$nextBtn = document.querySelector('.fa-chevron-circle-right');
        this.$pauseBtn = document.querySelector('.fa-pause-circle');
        this.$playBtn = document.querySelector('.fa-play-circle');
        this.howtoArray = document.querySelectorAll('.howto');
        this.indexSlide = 0;
        this.autoSlide();
        this.$prevBtn.addEventListener('click', () => this.prevSlide());
        this.$nextBtn.addEventListener('click', () => this.nextSlide());
        this.$pauseBtn.addEventListener('click', () => {
            clearInterval(this.intervalSlide);
            this.$pauseBtn.style.display = "none";
            this.$playBtn.style.display = "inline";
            });
        this.$playBtn.addEventListener('click', () => {
            this.autoSlide();
            this.$playBtn.style.display = "none";
            this.$pauseBtn.style.display = "inline";
            });
        window.addEventListener('keydown', event => {
            if (event.key === "ArrowLeft") {
                this.prevSlide();
            }
        });
        window.addEventListener('keydown', event => {
            if (event.key === "ArrowRight") {
                this.nextSlide();
            }
        });
    }

    autoSlide() {
        this.intervalSlide = setInterval(() => this.nextSlide(), 5000);
    }

    nextSlide() {
        this.howtoArray[this.indexSlide].style.display="none";
        this.indexSlide++;
        if (this.indexSlide >= this.howtoArray.length) {    
            this.indexSlide = 0;
        }
        this.howtoArray[this.indexSlide].style.display="block"; 
    }

    prevSlide() {
        this.howtoArray[this.indexSlide].style.display="none";
        this.indexSlide--;    
        if (this.indexSlide < 0) {
            this.indexSlide = this.howtoArray.length-1;
        }
        this.howtoArray[this.indexSlide].style.display="block";
    }

}


