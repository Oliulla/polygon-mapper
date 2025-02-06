"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Polygon, removePolygon, setSelectedPolygon } from "@/lib/polygonSlice";

const Sidebar = () => {
  const polygons = useSelector((state: RootState) => state.polygon.polygons);
  const dispatch = useDispatch();

  const handleEditPolygon = (polygon: Polygon) => {
    dispatch(
      setSelectedPolygon({
        id: polygon.id,
        coordinates: polygon.coordinates,
        color: polygon.color,
      })
    );
  };

  return (
    <div className="sidebar">
      <h2>Saved Polygons</h2>
      {polygons.length === 0 ? <p>No polygons added.</p> : null}
      <div>
        {polygons.map((polygon, idx) => {
          return (
            <div key={polygon.id} className="polygon__item">
              <p>Map {idx + 1}</p>
              <div>
                <button
                  onClick={() => dispatch(removePolygon(polygon.id))}
                  className="btn__danger w__full ml__1"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEditPolygon(polygon)}
                  className="btn__success w__full ml__1 mt__1"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
