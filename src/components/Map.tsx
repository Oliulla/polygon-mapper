"use client";

import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MapClickHandler from "./MapClickHandler";
import {
  addPolygon,
  setSelectedPolygon,
  updatePolygon,
} from "@/lib/polygonSlice";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/lib/store";
import ColorPicker from "./ColorPicker";

const Map = () => {
  const [color, setColor] = useState("#ff0000");
  const dispatch = useDispatch();
  const [currentPolygon, setCurrentPolygon] = useState<[number, number][]>([]);
  const selectedPolygon = useSelector(
    (state: RootState) => state.polygon.selectedPolygon
  );

  useEffect(() => {
    if (selectedPolygon) {
      setCurrentPolygon(selectedPolygon.coordinates);
    }
  }, [selectedPolygon]);

  const handleSavePolygon = () => {
    if (currentPolygon.length > 0) {
      if (selectedPolygon?.id) {
        dispatch(
          updatePolygon({
            id: selectedPolygon.id,
            coordinates: currentPolygon,
            color: color,
          })
        );
        dispatch(
          setSelectedPolygon({
            id: "",
            coordinates: [],
            color: "",
          })
        );
      } else {
        dispatch(
          addPolygon({
            id: uuidv4(),
            coordinates: currentPolygon,
            color: color,
          })
        );
      }
      setCurrentPolygon([]);
    }
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
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
          <Polygon positions={currentPolygon} pathOptions={{ color: color }} />
        )}
      </MapContainer>
      <div className="w__full flex justify__between">
        <button
          onClick={handleSavePolygon}
          disabled={currentPolygon.length === 0}
          className={`h__10 ${
            currentPolygon.length === 0 ? "btn__disabled" : "btn__success"
          }`}
        >
          Save Polygon
        </button>
        <div>
          <ColorPicker initialColor={color} onColorChange={handleColorChange} />
        </div>
      </div>
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
