const $prevBtn = document.querySelector('.fa-chevron-circle-left');
const $nextBtn = document.querySelector('.fa-chevron-circle-right');
const $pauseBtn = document.querySelector('.fa-pause-circle');
const $playBtn = document.querySelector('.fa-play-circle');

const imgArray = [
    'images/bike1.jpg',
    'images/bike2.jpg',
    'images/bike3.jpg',
    'images/bike4.jpg',
];
let indexSlide = 0;
const imageElement = document.querySelector("#innerSlide");

$nextBtn.addEventListener('click', () => nextSlide());
$prevBtn.addEventListener('click', () => prevSlide());

document.addEventListener('keydown', event => {
    if ( event.key === "ArrowLeft" ) {
        prevSlide()
    }
});

document.addEventListener('keydown', event => {
    if ( event.key === "ArrowRight" ) {
        nextSlide()
    }
});

function nextSlide() {
    if (indexSlide>=imgArray.length) {
        indexSlide=0;
    }
    imageElement.src = imgArray[indexSlide];
    indexSlide++;
}

function prevSlide() {
    if (indexSlide < 0) {
        indexSlide = imgArray.length-1;
    }
    imageElement.src = imgArray[indexSlide];
    indexSlide--;
}

function auto() {
    setInterval("nextSlide()", 2000);
}



// $prevBtn.addEventListener('click', () => nextSlide(-1));
// $nextBtn.addEventListener('click', () => nextSlide(1));
// // $pauseBtn.addEventListener('click', () => manualSlides(slideIndex)); 
// // $playBtn.addEventListener('click', () => autoSlides(0));

// function nextSlide()
// {
//     imgArray.forEach(element => {
//         document.querySelectorAll("innerSlide").src = imgArray[element];
//     })


//     if(slideIndex != imgArray.lenght-1) {

//     }

//         imgArray.forEach( n => {
//           if((n--) === imgArray.length){
//             document.getElementById(n).src = imgArray[0].src;
//         }
//         document.getElementById(n).src = imgArray[n++].src;
//         })
// }