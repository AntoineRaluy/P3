let slideIndex = 1;

const $prevBtn = document.querySelector('.fa-chevron-circle-left'); 
const $nextBtn = document.querySelector('.fa-chevron-circle-right'); 
const $pauseBtn = document.querySelector('.fa-pause-circle'); 
const $playBtn = document.querySelector('.fa-play-circle'); 

$prevBtn.addEventListener('click', () => plusSlides(-1));
$nextBtn.addEventListener('click', () => plusSlides(1));
$pauseBtn.addEventListener('click', () => manualSlides(slideIndex)); 
$playBtn.addEventListener('click', () => autoSlides(0));

document.addEventListener('keydown', event => {
    if ( event.key === "ArrowLeft" ) {
        plusSlides(-1)
    }
});

document.addEventListener('keydown', event => {
    if ( event.key === "ArrowRight" ) {
        plusSlides(1)
    }
});

function manualSlides(n) {
  const slides = document.querySelectorAll(".innerSlide");
  if (n > slides.length) {
      slideIndex = 1
    }
  if (n < 1) {
      slideIndex = slides.length
    }

  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
} 
