let leafletMap = L.map('map').setView([45.75, 4.85], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW50b2luZXJhIiwiYSI6ImNrNnh3MnJuazBsYWUzcWp6d3lyNzdtODMifQ.muiq1cgk5b2t5vWwWmpHlA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(leafletMap);

// let osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//             attribution: '© OpenStreetMap contributors',
//             maxZoom: 18
//         });
    
//         leafletMap.addLayer(osmLayer);