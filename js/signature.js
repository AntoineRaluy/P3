export default class CanvasObject {
    constructor(canvasPosition) { //Paramètres du canvas
        this.$canvas = document.querySelector(canvasPosition);
        this.$checkButton = document.querySelector("#bt-check");
        this.$clearButton = document.querySelector("#bt-clear");
        this.$checkButton.classList.remove('btcheck');

        this.ctx = this.$canvas.getContext('2d');
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 3;

        this.draw = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition;
        this.$canvas.width = 300;
        this.$canvas.height = 150;
        this.evenements();
    }

    //Gestion des événements 
    evenements() {
        //Souris
        this.$canvas.addEventListener("mousedown", (e) => {
            this.draw = true;
            this.$checkButton.disabled = false;
            this.$checkButton.classList.add('btcheck');
            this.lastPosition = this.getMposition(e);
        });

        this.$canvas.addEventListener("mousemove", (e) => {
            this.mousePosition = this.getMposition(e);
            this.canvasResult()
        });

        this.$canvas.addEventListener("mouseup", (e) => {
            this.draw = false;
        });

//         oCanvas.addEventListener("touchstart", downDrawligne);
//   oCanvas.addEventListener("touchend", upDrawligne);
//   oCanvas.addEventListener("touchmove", moveDrawligne); 


        // Stop scrolling (touch)
        this.$canvas.addEventListener("touchstart", (e) => {
            if (e.target == this.canvas) {
                e.preventDefault();
            }
        });

        this.$canvas.addEventListener("touchend", (e) => {
            if (e.target == this.canvas) {
                e.preventDefault();
            }
        });

        this.$canvas.addEventListener("touchmove", (e) => {
            if (e.target == this.canvas) {
                e.preventDefault();
            }
        });


        // Touchpad
        this.$canvas.addEventListener("touchstart", (e) => {
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

        this.$canvas.addEventListener("touchend", (e) => {
            let mouseEvent = new MouseEvent("mouseup", {});
            this.$canvas.dispatchEvent(mouseEvent);
        });


        //Effacer
        this.$clearButton.addEventListener("click", (e) => {
            this.clearCanvas()
            this.$checkButton.disabled = true;
            this.$checkButton.classList.remove('btcheck');
        });

        this.$checkButton.addEventListener("click", () => {
            this.clearCanvas()
            this.$checkButton.disabled = true;
            this.$checkButton.classList.remove('btcheck');
        });

    }

    // Renvoie les coordonnées de la souris 
    getMposition(mouseEvent) {
        if (this.draw) {
            const oRect = this.$canvas.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }

    // Renvoie les coordonnées du pad 
    getTposition(touchEvent) {
        const oRect = this.$canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }

    // Dessin du canvas
    canvasResult() {
        if (this.draw) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.ctx.stroke();
            this.lastPosition = this.mousePosition;
        }
    };

    // Vide le dessin du canvas
    clearCanvas() {
        this.$canvas.width = this.$canvas.width;
        this.ctx.lineWidth = 3;
    }

}

