
// let slideIndex = 1;

// const intervalId = setInterval(() => autoSlides(slideIndex), 1000);

// const $prevBtn = document.querySelector('.prev'); 
// $prevBtn.addEventListener('click', () => plusSlides(-1));

// const $nextBtn = document.querySelector('.next'); 
// $nextBtn.addEventListener('click', () => plusSlides(1));

// const $playBtn = document.querySelector('.play'); 
// $playBtn.addEventListener('click',() => {
//     console.log("test")
//     return setInterval(() => autoSlides(slideIndex), 1000);
// });

// const $pauseBtn = document.querySelector('.pause'); 
// $pauseBtn.addEventListener('click', () => {
//     console.log("test 2")
//     return clearInterval(intervalId);
// });



// function plusSlides(n) {
//   manualSlides(slideIndex += n);
// }

// document.addEventListener('keydown', event => {
//     if ( event.key === "ArrowLeft" ) {
//         plusSlides(-1)
//     }
// });

// document.addEventListener('keydown', event => {
//     if ( event.key === "ArrowRight" ) {
//         plusSlides(1)
//     }
// });


// function manualSlides(n) {
//   const slides = document.querySelectorAll(".innerSlide");

//   if (n > slides.length) {
//       slideIndex = 0
//     }
//   if (n < 0) {
//       slideIndex = slides.length-1
//     }
//   for (let i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   slides[slideIndex-1].style.display = "block";
// } 

// function autoSlides() {
//   var i;
//   var slides = document.querySelectorAll(".innerSlide");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}
//   slides[slideIndex-1].style.display = "block";
  
// } 
