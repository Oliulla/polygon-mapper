"use client";

import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import MapClickHandler from "./MapClickHandler";
import { addPolygon } from "@/lib/polygonSlice";
import { v4 as uuidv4 } from "uuid";

const Map = () => {
  const dispatch = useDispatch();
  const [currentPolygon, setCurrentPolygon] = useState<[number, number][]>([]);

  const handleSavePolygon = () => {
    if (currentPolygon.length > 0) {
      dispatch(
        addPolygon({
          id: uuidv4(),
          coordinates: currentPolygon,
          color: "#ff0000",
        })
      );
      setCurrentPolygon([]);
    }
  };

  return (
    <div className="w__full">
      <MapContainer style={{ height: "60vh", width: "100%" }}>
        <MapView />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler
          currentPolygon={currentPolygon}
          setCurrentPolygon={setCurrentPolygon}
          dispatch={dispatch}
        />
        {currentPolygon.length > 0 && (
          <Polygon
            positions={currentPolygon}
            pathOptions={{ color: "#0000ff" }}
          />
        )}
      </MapContainer>
      <button
        onClick={handleSavePolygon}
        disabled={currentPolygon.length === 0}
        className={`${
          currentPolygon.length === 0 ? "btn__disabled" : "btn__success"
        }`}
      >
        Save Polygon
      </button>
    </div>
  );
};

export default Map;

const MapView = () => {
  const map = useMap();
  useEffect(() => {
    map.setView([51.505, -0.09], 13);
  }, [map]);

  return null;
};
