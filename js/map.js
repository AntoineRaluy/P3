const leafletMap = L.map('map').setView([45.75, 4.85], 15);
const urlData = 'https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=0bfc09ea2231530610e8ebd057fa19cc18539930';

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW50b2luZXJhIiwiYSI6ImNrNnh3MnJuazBsYWUzcWp6d3lyNzdtODMifQ.muiq1cgk5b2t5vWwWmpHlA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(leafletMap);

const blueIcon = new L.Icon({
	iconUrl: 'images/marker-icon-2x-blue.png',
	shadowUrl: 'images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

const redIcon = new L.Icon({
	iconUrl: 'images/marker-icon-2x-red.png',
	shadowUrl: 'images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
	iconUrl: 'images/marker-icon-2x-green.png',
	shadowUrl: 'images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

const locData = async () => {  
    let stationInfos;
    const response = await fetch(urlData);
    const locStation = await response.json();
    locStation.forEach(element => { 
        stationInfos = {
            id: element.number,
            name: element.name,
            address: element.address,
            status: element.status,
            capacity: element.totalStands.capacity,
            bikes: element.totalStands.availabilities.bikes,
            stands: element.totalStands.availabilities.stands,
            latitude: element.position.latitude,
            longitude: element.position.longitude,
        };  
    const stationMarker = L.marker([stationInfos.latitude, stationInfos.longitude]).addTo(leafletMap);
    stationMarker.on('click', () => displayStation(element));    
    });
}

const displayStation = (station) => {
    const infoStation = document.querySelector('#station-infos');
    if (station.status === 'OPEN') {
        station.status = 'Ouverte';
    } else {station.status = 'Fermée';
 };
    infoStation.innerHTML = `<ul>
                                <li>Nom : ${station.name}</li> 
                                <li>Adresse : ${station.address}</li>
                                <li>Etat : ${station.status}</li>
                                <li>Places : ${station.totalStands.capacity}</li>
                                <li>Vélos disponibles : ${station.totalStands.availabilities.bikes}</li>
                                <li>Emplacements lilbres : ${station.totalStands.availabilities.stands}</li>
                            </ul>`;
}

locData()