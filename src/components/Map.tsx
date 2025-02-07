"use client";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Tooltip,
} from "react-leaflet";
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
import { getCenter } from "@/utils/getCenter";
import { calculateArea } from "@/utils/calculaterAreaWithTurf";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { isPolygonValid } from "@/utils/validatePolygon";
import ExportAndImport from "./ExportAndImport";
import MapView from "./MapView";

const Map = () => {
  const [color, setColor] = useState<string>("#ff0000");
  const dispatch = useDispatch();
  const [currentPolygon, setCurrentPolygon] = useState<[number, number][]>([]);
  const [polygonArea, setPolygonArea] = useState<number | null>(null);
  const [polygonCenter, setPolygonCenter] = useState<[number, number] | null>(
    null
  );
  const selectedPolygon = useSelector(
    (state: RootState) => state.polygon.selectedPolygon
  );
  const polygons = useSelector((state: RootState) => state.polygon.polygons);

  useEffect(() => {
    if (selectedPolygon) {
      setCurrentPolygon(selectedPolygon.coordinates);
      setColor(selectedPolygon?.color);
    }
  }, [selectedPolygon]);

  useEffect(() => {
    if (currentPolygon.length > 2) {
      const areaSqMeters = calculateArea(currentPolygon, "sqm");
      const center = getCenter(currentPolygon);

      setPolygonArea(areaSqMeters);
      setPolygonCenter(center);
    }
  }, [currentPolygon]);

  const handleSavePolygon = () => {
    if (currentPolygon.length > 0) {
      let removeSelectedPol = polygons;
      if (selectedPolygon?.id) {
        removeSelectedPol = polygons?.filter(
          (pol) => pol.id !== selectedPolygon?.id
        );
      }

      if (currentPolygon.length < 4) {
        alert("Error: A polygon must have at least 4 points!");
        return;
      }
      // console.log(isPolygonValid(currentPolygon, polygons));
      if (!isPolygonValid(currentPolygon, removeSelectedPol)) {
        alert("Error: The new polygon overlaps with an existing polygon!");
        return;
      }

      if (selectedPolygon?.id) {
        dispatch(
          updatePolygon({
            id: selectedPolygon.id,
            label: selectedPolygon.label,
            coordinates: currentPolygon,
            color: color,
          })
        );
        dispatch(
          setSelectedPolygon({ id: "", label: "", coordinates: [], color: "" })
        );
      } else {
        dispatch(
          addPolygon({
            id: uuidv4(),
            label: `Map-${polygons.length + 1}`,
            coordinates: currentPolygon,
            color: color,
          })
        );
      }
      setCurrentPolygon([]);
      setPolygonArea(null);
      setPolygonCenter(null);
    }
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  return (
    <div className="w__full">
      <ExportAndImport />
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
        {polygonCenter && polygonArea !== null && (
          <Marker position={polygonCenter}>
            <Tooltip>{polygonArea.toFixed(2)} m^2</Tooltip>
          </Marker>
        )}
      </MapContainer>
      <div className="w__full flex justify__between mt-4">
        <button
          onClick={handleSavePolygon}
          disabled={currentPolygon.length === 0}
          className={`h__8 w__20 ${
            currentPolygon.length === 0
              ? "btn__disabled cursor__not__allowed"
              : "btn__primary"
          }`}
        >
          {selectedPolygon?.id ? "Update" : "Save"}
        </button>
        {polygonArea !== null && (
          <div className="mt__2">
            <p>
              Polygon Area: {polygonArea.toFixed(2)} m^2 |{" "}
              {(polygonArea / 1_000_000).toFixed(4)} km^2 |{" "}
              {(polygonArea * 0.000247105).toFixed(2)} acres
            </p>
          </div>
        )}
        <ColorPicker initialColor={color} onColorChange={handleColorChange} />
      </div>
    </div>
  );
};

export default Map;

// const MapView = () => {
//   const map = useMap();
//   useEffect(() => {
//     map.setView([51.505, -0.09], 13);
//   }, [map]);

//   return null;
// };
