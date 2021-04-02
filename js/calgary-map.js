document.addEventListener('DOMContentLoaded', function () {

    var map = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmF5ZWhlIiwiYSI6ImNrbHZ5NHMyejBkdXcyc214OHlvNmhrZG0ifQ.KXVOh3T-0PdiPnVQ5iMCCQ'
    });
    
    
    var mymap = L.map('mapid', {layers: [map]}).setView([51.0447, -114.0719], 13);

    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "User made polygon"
        },
        "geometry": {
            "type": "LineString",
            "coordinates": []
        }
    };

    var polygon = L.geoJSON(geojsonFeature).addTo(mymap);

    function onMapClick(e) {
        geojsonFeature["geometry"]["coordinates"].push([e.latlng['lng'], e.latlng['lat']]);
        console.log(e);
        console.log(geojsonFeature);
        // alert("You clicked the map at " + e.latlng);
        polygon.remove();
        polygon = L.geoJSON(geojsonFeature).addTo(mymap);
    }

    mymap.on('click', onMapClick);

});