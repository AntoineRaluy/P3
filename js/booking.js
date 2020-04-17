export default class Booking {
    constructor(bookingPosition) {
        this.$userForm = document.querySelector(bookingPosition);
        this.$signingStep = document.querySelector('.lightbox-sign');
        this.$checkButton = document.querySelector('#bt-check');
        this.$closeBtn = document.querySelector('.fa-times');
        this.$userForm.addEventListener('submit', event => {
            event.preventDefault();
            this.$userLastName = document.querySelector('#user-lastname').value;
            this.$userFirstName = document.querySelector('#user-firstname').value;
            localStorage.setItem('lastname', this.$userLastName);
            localStorage.setItem('firstname', this.$userFirstName);
            sessionStorage.setItem('lastname', this.$userLastName);
            sessionStorage.setItem('firstname', this.$userFirstName); 
            this.$signingStep.style.display = "inline-block";
            document.body.classList.add("stopscroll");
            });

        this.$checkButton.addEventListener("click", () => {
            this.displayBooking();   
            this.$signingStep.style.display = "none";
            document.body.classList.remove("stopscroll");
            });

        this.$closeBtn.addEventListener('click', () => {
            this.$signingStep.style.display = "none";
            document.body.classList.remove("stopscroll");
            });
            
        document.querySelector('#user-lastname').value = localStorage.getItem('lastname');
        document.querySelector('#user-firstname').value = localStorage.getItem('firstname'); 
    }

    displayBooking() {
        this.$infoBooking = document.querySelector('#booking-status');
        let lstName = localStorage.getItem('lastname');
        let fstName = localStorage.getItem('firstname');
        let bstName = sessionStorage.getItem('stationname');
        this.$infoBooking.innerHTML = `<hr>
                                <p>Vélo réservé à la station :<br> <span class="infouser">${bstName}</span></p>
                                <p>par <span class="infouser">${fstName} ${lstName}</span></p> 
                                <p>Temps restant : <span id="time"></span> </p>
                                <br>
                                <div class="anim">
                                <i class="fas fa-bicycle"></i>
                                <div class="dline"></div>
                                </div>`;
        this.$infoBooking.scrollIntoView();
        this.bookingTime();    
    }

    bookingTime() {
        const twentyMinutes = 60 * 20;
        const $timeDisplay = document.querySelector('#time');
        this.startTimer(twentyMinutes, $timeDisplay);
    }

    startTimer(duration, display) {
        let timer = duration;
        let minutes;
        let seconds;

        const interval = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;             
            if (--timer< 0) {
                timer = duration;
                sessionStorage.clear();
                this.$infoBooking.innerHTML =``;
                this.$userForm.style.display = "none";
                clearInterval(interval);
            }
        }, 1000);
    }
}
