import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapView = () => {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 13); 
        },
        (error) => {
          alert("Error getting your location: " + error.message);
          map.setView([51.505, -0.09], 13);
        }
      );
    } else {
      map.setView([51.505, -0.09], 13);
    }
  }, [map]);

  return null;
};

export default MapView;
