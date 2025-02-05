"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, removePolygon } from "@/lib/store";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import { calculateCentroid } from "@/utils/calculateCentroid";

const Sidebar = () => {
  const polygons = useSelector((state: RootState) => state.polygon.polygons);
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <h2>Saved Polygons</h2>
      {polygons.length === 0 ? <p>No polygons added.</p> : null}
      <div>
        {polygons.map((polygon) => {
          const center = calculateCentroid(polygon.coordinates);

          return (
            <div key={polygon.id} className="polygon__item">
              <MapContainer
                style={{ width: "100%", height: "200px", borderRadius: "5px" }}
              >
                <MapView center={center} />

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polygon
                  positions={polygon.coordinates}
                  pathOptions={{ color: polygon.color }}
                />
              </MapContainer>

              <button
                onClick={() => dispatch(removePolygon(polygon.id))}
                className="btn__danger ml__1"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

const MapView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13.8);
  }, [map, center]);

  return null;
};