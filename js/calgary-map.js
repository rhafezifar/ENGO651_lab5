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
            "name": "User made polyline"
        },
        "geometry": {
            "type": "LineString",
            "coordinates": []
        }
    };

    var polylineStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    };

    var polyline = L.geoJSON(geojsonFeature, {style: polylineStyle}).addTo(mymap);

    var sGeojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "User made polyline"
        },
        "geometry": {
            "type": "LineString",
            "coordinates": []
        }
    };

    var sPolylineStyle = {
        "color": "#007800",
        "weight": 5,
        "opacity": 0.65
    };

    var sPolyline = L.geoJSON(sGeojsonFeature, {style: sPolylineStyle}).addTo(mymap);

    function onMapClick(e) {
        geojsonFeature["geometry"]["coordinates"].push([e.latlng['lng'], e.latlng['lat']]);
        console.log(e);
        console.log(geojsonFeature);
        // alert("You clicked the map at " + e.latlng);
        polyline.remove();
        polyline = L.geoJSON(geojsonFeature, {style: polylineStyle}).addTo(mymap);
    }

    mymap.on('click', onMapClick);

    document.querySelector('#clear').onclick = function () {
        geojsonFeature["geometry"]["coordinates"] = [];
        polyline.remove();
        sPolyline.remove();
    };

    document.querySelector('#simplify').onclick = function () {
        var options = {tolerance: 0.007, highQuality: false};
        var simplified = turf.simplify(geojsonFeature, options);
        sPolyline = L.geoJSON(simplified).addTo(mymap);
    };

});