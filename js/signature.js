export default class CanvasObject {
    constructor(canvasPosition) { 
        this.$canvas = document.querySelector(canvasPosition);
        this.$checkButton = document.querySelector("#bt-check");
        this.$clearButton = document.querySelector("#bt-clear");
        this.$checkButton.classList.remove('btcheck');
        this.ctx = this.$canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;
        if (window.matchMedia("(min-width: 1024px)").matches) {     // adjusts canvas with MQs
            this.$canvas.width = 800;
            this.$canvas.height = 300;
        } else if (window.matchMedia("(min-width: 800px)").matches) {
            this.$canvas.width = 700;
            this.$canvas.height = 300;
        } else {
            this.$canvas.width = 300;
            this.$canvas.height = 200;
        }
        this.draw = false;
        this.mousePosition = {x: 0, y: 0};
        this.lastPosition = this.mousePosition;
        this.evenements();
    }
    
    evenements() {
            this.$canvas.addEventListener("mousedown", (e) => {     // Mouse config
            this.draw = true;
            this.$checkButton.disabled = false;
            this.$checkButton.classList.add('btcheck');
            this.lastPosition = this.getMposition(e);
        });
        this.$canvas.addEventListener("mousemove", (e) => {
            this.mousePosition = this.getMposition(e);
            this.canvasResult();
        });
        this.$canvas.addEventListener("mouseup", () => {
            this.draw = false;
        });
        this.$canvas.addEventListener("touchstart", (e) => {    // Stop touchpad scrolling
            if (e.target == this.$canvas) {
                e.preventDefault();
            }
        });
        this.$canvas.addEventListener("touchend", (e) => {
            if (e.target == this.$canvas) {
                e.preventDefault();
            }
        });
        this.$canvas.addEventListener("touchmove", (e) => {
            if (e.target == this.$canvas) {
                e.preventDefault();
            }
        });        
        this.$canvas.addEventListener("touchstart", (e) => {       // Touchpad config
            this.mousePosition = this.getTposition(e);
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.$canvas.dispatchEvent(mouseEvent);
        });
        this.$canvas.addEventListener("touchmove", (e) => {
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.$canvas.dispatchEvent(mouseEvent);
        });
        this.$canvas.addEventListener("touchend", () => {
            let mouseEvent = new MouseEvent("mouseup", {});
            this.$canvas.dispatchEvent(mouseEvent);
        });      
        this.$clearButton.addEventListener("click", () => {    // Clear signature
            this.clearCanvas();
            this.$checkButton.disabled = true;
            this.$checkButton.classList.remove('btcheck');
        });
        this.$checkButton.addEventListener("click", () => {     // Check signature
            this.clearCanvas();
            this.$checkButton.disabled = true;
            this.$checkButton.classList.remove('btcheck');
            if (sessionStorage['booked']) {
                this.stationName = sessionStorage.getItem('stationname-temp');
                sessionStorage.setItem('stationname', this.stationName);
                window.location.reload();
                sessionStorage.removeItem('secondes');
            }
            this.booking = 1;
            sessionStorage.setItem('booked', this.booking);
        });
    }

    getMposition(mouseEvent) {      // Get mouse position
        if (this.draw) {
            const oRect = this.$canvas.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }

    getTposition(touchEvent) {      // Get touchpad position
        const oRect = this.$canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }

    canvasResult() {             // Draw in canvas
        if (this.draw) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.ctx.stroke();
            this.lastPosition = this.mousePosition;
        }
    };

    clearCanvas() {            
        this.$canvas.width = this.$canvas.width;
        this.ctx.lineWidth = 3;
    }

}

