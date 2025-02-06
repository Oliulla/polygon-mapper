import L from 'leaflet';

const marker = new L.Icon({
    iconUrl: './marker.png',
    iconRetinaUrl: './marker.png',
    iconSize: new L.Point(15, 20),
    className: 'leaflet-div-icon'
});

export { marker };