import L from 'leaflet';

const marker = new L.Icon({
    iconUrl: './marker.png',
    iconRetinaUrl: './marker.png',
    iconSize: new L.Point(10, 20),
    className: 'leaflet-div-icon'
});

export { marker };