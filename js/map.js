const leafletMap = L.map('map').setView([45.75, 4.85], 15);
const urlData = 'https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=0bfc09ea2231530610e8ebd057fa19cc18539930';

const infoStation = document.querySelector('#station-infos');
const paragraphe = document.createElement('p');
const firstName = 'Antoine';
const lastName = 'Raluy';
paragraphe.innerHTML = `<ul>
                            <li>${firstName}</li> 
                            <li>${lastName}</li>
                        </ul>`;
infoStation.appendChild(paragraphe);



L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW50b2luZXJhIiwiYSI6ImNrNnh3MnJuazBsYWUzcWp6d3lyNzdtODMifQ.muiq1cgk5b2t5vWwWmpHlA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(leafletMap);


const locData = async () => {
    const response = await fetch (urlData);
    const locStation = await response.json();
    locStation.forEach(element => {
        L.marker([element.position.latitude, element.position.longitude]).addTo(leafletMap); 
    });
}

locData()

