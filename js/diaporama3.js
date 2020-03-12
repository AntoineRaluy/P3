export default class Slideshow {
    constructor(elementImage) {
        this.$prevBtn = document.querySelector('.fa-chevron-circle-left');
        this.$nextBtn = document.querySelector('.fa-chevron-circle-right');
        this.$pauseBtn = document.querySelector('.fa-pause-circle');
        this.$playBtn = document.querySelector('.fa-play-circle');
        this.$imageElement = document.querySelector(elementImage);
        this.imgArray  = [
            'images/bike1.jpg',
            'images/bike2.jpg',
            'images/bike3.jpg',
            'images/bike4.jpg',
        ];
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
        this.intervalSlide = 0;
        this.intervalSlide = setInterval(() => this.nextSlide(), 1500);
    }

    nextSlide() {
        this.indexSlide++;
        if (this.indexSlide >= this.imgArray.length) {
            this.indexSlide = 0;
        }
        this.$imageElement.src = this.imgArray[this.indexSlide];    
    }

    prevSlide() {
        this.indexSlide--;
        if (this.indexSlide < 0) {
            this.indexSlide = this.imgArray.length-1;
        }
        this.$imageElement.src = this.imgArray[this.indexSlide];
    }

}


