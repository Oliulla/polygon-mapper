"use client";

import { useMapEvents } from "react-leaflet";
import { Dispatch, SetStateAction } from "react";

const MapClickHandler = ({
  currentPolygon,
  setCurrentPolygon,
}: {
  currentPolygon: [number, number][];
  setCurrentPolygon: Dispatch<SetStateAction<[number, number][]>>;
  dispatch: any;
}) => {
  useMapEvents({
    click(e: { latlng: { lat: number; lng: number } }) {
      setCurrentPolygon([...currentPolygon, [e.latlng.lat, e.latlng.lng]]);
    },
    dblclick() {},
  });

  return null;
};

export default MapClickHandler;
