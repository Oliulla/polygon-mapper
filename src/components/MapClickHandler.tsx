"use client";

import { useMapEvents } from "react-leaflet";
import { Dispatch, SetStateAction } from "react";
import { addPolygon } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";

const MapClickHandler = ({
  currentPolygon,
  setCurrentPolygon,
  dispatch,
}: {
  currentPolygon: [number, number][];
  setCurrentPolygon: Dispatch<SetStateAction<[number, number][]>>;
  dispatch: any;
}) => {
  useMapEvents({
    click(e: { latlng: { lat: number; lng: number } }) {
      setCurrentPolygon([...currentPolygon, [e.latlng.lat, e.latlng.lng]]);
    },
    dblclick() {
      dispatch(
        addPolygon({
          id: uuidv4(),
          coordinates: currentPolygon,
          color: "#ff0000",
        })
      );
      setCurrentPolygon([]);
    },
  });

  return null;
};

export default MapClickHandler;
