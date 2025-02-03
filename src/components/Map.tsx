"use client";

import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useState, useEffect } from "react";
import MapClickHandler from "./MapClickHandler";

const Map = () => {
  const dispatch = useDispatch();
  const polygons = useSelector((state: RootState) => state.polygon.polygons);
  const [currentPolygon, setCurrentPolygon] = useState<[number, number][]>([]);

  return (
    <MapContainer style={{ height: "100vh", width: "100%" }}>
      <MapView />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler
        currentPolygon={currentPolygon}
        setCurrentPolygon={setCurrentPolygon}
        dispatch={dispatch}
      />
      {polygons.map((polygon) => (
        <Polygon
          key={polygon.id}
          positions={polygon.coordinates}
          pathOptions={{ color: polygon.color }}
        />
      ))}
      {currentPolygon.length > 0 && (
        <Polygon
          positions={currentPolygon}
          pathOptions={{ color: "#0000ff" }}
        />
      )}
    </MapContainer>
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
