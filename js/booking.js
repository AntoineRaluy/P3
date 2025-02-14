export default class Booking {
    constructor(bookingPosition) {
        this.$userForm = document.querySelector(bookingPosition);
        this.$stationInfos = document.querySelector('#map-stations');
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
            this.$userForm.style.display = "none";
            this.$signingStep.style.display = "none";
            this.$stationInfos.style.textAlign = "center";
            document.body.classList.remove("stopscroll");
            });
        this.$closeBtn.addEventListener('click', () => {
            this.$signingStep.style.display = "none";
            document.body.classList.remove("stopscroll");
            });
        document.querySelector('#user-lastname').value = localStorage.getItem('lastname');
        document.querySelector('#user-firstname').value = localStorage.getItem('firstname'); 
        if (sessionStorage['booked']) {
            this.displayBooking();
        }
    }

    displayBooking() {
        this.$infoBooking = document.querySelector('#booking-status');
        let lstName = localStorage.getItem('lastname');
        let fstName = localStorage.getItem('firstname');
        let bstName = sessionStorage.getItem('stationname');
        this.$infoBooking.style.display = "block";
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
        let minutes, seconds;
        if (sessionStorage['secondes']) {
            minutes = sessionStorage.getItem('minutes');
            seconds = sessionStorage.getItem('secondes');
            timer = parseInt(minutes) * 60 + parseInt(seconds);
            const dline = document.querySelector('.dline');
            const bicycle = document.querySelector('.fa-bicycle');
            dline.style.animation = `${timer}s linear trackline forwards`;
            bicycle.style.animation = `${timer}s linear bikerun forwards`;
        }
        const interval = setInterval(() => {
            minutes = Math.trunc(timer / 60);       // keep integer part
            seconds = timer % 60;                   // modulo 60
            minutes = minutes < 10 ? `0${minutes}` : minutes;       // display 0 if <10
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            sessionStorage.setItem('minutes', minutes);
            sessionStorage.setItem('secondes', seconds);
            display.textContent = `${minutes}:${seconds}`;             
            if (--timer < 0) {
                timer = duration;
                sessionStorage.clear();
                this.$infoBooking.innerHTML =``;
                this.$infoBooking.style.display = "none";
                clearInterval(interval);
            }
        }, 1000);
    }
}
