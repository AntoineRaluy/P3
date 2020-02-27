// https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=0bfc09ea2231530610e8ebd057fa19cc18539930


const linkClick = document.querySelector('.click-link');

linkClick.addEventListener('click', event => {
    event.preventDefault();
    console.log(event);
});

document.addEventListener('keydown', event => {
    if ( event.key === "ArrowLeft" ) {
        console.log("fleche gauche activée");
    }
    console.log(event);
});

class Car {
    constructor (modele, serie, couleur) {
        this.modele = modele;
        this.serie = serie;
        this.couleur = couleur;
        this.avance();
    }

    avance() {
        console.log("ma voiture avance");
    }
}

let myCar= new Car("Peugeot", "207", "noire");
console.log(myCar);
