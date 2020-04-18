export default class BikeMap {
    constructor(mapPosition) {
        this.$mapElement = document.querySelector(mapPosition);
        this.$userForm = document.querySelector('#booking-details');
        this.$stationAlign = document.querySelector('#map-stations');
        this.urlData = 'https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=0bfc09ea2231530610e8ebd057fa19cc18539930';
        this.leafletMap = L.map(this.$mapElement).setView([45.75, 4.85], 15);
        this.leafletMap.scrollWheelZoom.disable();
        this.leafletMap.on('focus', () => { 
            this.leafletMap.scrollWheelZoom.enable()});
        this.leafletMap.on('mouseout', () => { 
            this.leafletMap.scrollWheelZoom.disable()});
        this.leafletIcon = L.Icon.extend({
            options: {
                shadowUrl: 'images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            }
        });

        this.blueIcon = new this.leafletIcon({iconUrl: 'images/marker-icon-2x-blue.png'});
        this.redIcon = new this.leafletIcon({iconUrl: 'images/marker-icon-2x-red.png'});   
        this.greenIcon = new this.leafletIcon({iconUrl: 'images/marker-icon-2x-green.png'});

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW50b2luZXJhIiwiYSI6ImNrNnh3MnJuazBsYWUzcWp6d3lyNzdtODMifQ.muiq1cgk5b2t5vWwWmpHlA', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
            }).addTo(this.leafletMap);
    
        this.locData();
    }

    locData = async () => {  
        let markerIcon = this.blueIcon;
        const response = await fetch(this.urlData);
        const locStation = await response.json();        
        locStation.forEach(bikeStation => {             
            let stationInfos = {
                id: bikeStation.number,
                name: bikeStation.name,
                address: bikeStation.address,
                status: bikeStation.status,
                capacity: bikeStation.totalStands.capacity,
                bikes: bikeStation.totalStands.availabilities.bikes,
                stands: bikeStation.totalStands.availabilities.stands,
                latitude: bikeStation.position.latitude,
                longitude: bikeStation.position.longitude,
            };  
            if (stationInfos.status === 'OPEN' && stationInfos.stands > 0) {
                markerIcon = this.greenIcon;
            } else if (stationInfos.status === 'OPEN' && stationInfos.stands == 0) {
                markerIcon = this.blueIcon;
            } else {markerIcon = this.redIcon;
            }
            let config = {icon: markerIcon};
            let stationMarker = L.marker([stationInfos.latitude, stationInfos.longitude], config).addTo(this.leafletMap);
            stationMarker.on('click', () => this.displayStation(stationInfos));    
        });
    }

    displayStation(station) {
        const $infoStation = document.querySelector('#station-infos');
        $infoStation.style.display = "inline-block";
        if (window.matchMedia("(min-width: 800px)").matches) {
            this.$stationAlign.style.textAlign = "left" };
        let status = station.status;
        sessionStorage.setItem('stationname', station.name);
        if (status === 'OPEN') {
            status = 'Ouverte';
            this.$userForm.style.display = "block";
            if (station.stands === 0) {
                $infoStation.style.backgroundColor = "#F5F5F5";
            }
            else {$infoStation.style.backgroundColor = "#F0FFF0";
            }
        } else {
            status = 'Fermée';
            this.$userForm.style.display = "none";
            $infoStation.style.backgroundColor = "#fce9e9";
        };
        $infoStation.innerHTML = `<ul>
                                    <li><span class="infostats">Nom</span> : ${station.name}</li> 
                                    <li><span class="infostats">Adresse</span> : ${station.address}</li>
                                    <li><span class="infostats">État</span> : ${status}</li>
                                    <li><span class="infostats">Place(s)</span> : ${station.capacity}</li>
                                    <li><span class="infostats">Vélo(s) disponible(s)</span> : ${station.bikes}</li>
                                    <li><span class="infostats">Emplacement(s) libre(s)</span> : ${station.stands}</li>
                                </ul>`;
        $infoStation.scrollIntoView();
    }
}
