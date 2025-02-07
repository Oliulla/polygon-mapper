"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { Polygon, removePolygon, setSelectedPolygon } from "@/lib/polygonSlice";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const polygons = useSelector((state: RootState) => state.polygon.polygons);
  const dispatch = useDispatch();

  const handleEditPolygon = (polygon: Polygon) => {
    dispatch(setSelectedPolygon(polygon));
  };
  const selectedPolygon: Polygon | null = useSelector(
    (state: RootState) => state.polygon.selectedPolygon
  );

  const filteredPolygons = polygons.filter(
    (polygon) =>
      polygon.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      polygon.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <h2 className="text__xl font__semibold">Saved Polygons</h2>

      <div className="mr__5">
        <input
          type="text"
          placeholder="Search polygons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search__input w__full mt__1"
        />
      </div>
      {filteredPolygons.length === 0 ? <p>No polygons found.</p> : null}

      <div className="polygon__list">
        {filteredPolygons.map((polygon, idx) => (
          <div key={polygon.id} className="polygon__item">
            <p className="font__semibold">{polygon.label}</p>
            <div className="flex gap__x_1">
              <button
                disabled={selectedPolygon?.id === polygon.id}
                onClick={() => dispatch(removePolygon(polygon.id))}
                className={`btn__danger w__full ${
                  selectedPolygon?.id === polygon.id
                    ? "cursor__not__allowed"
                    : ""
                }`}
              >
                Delete
              </button>
              <button
                disabled={selectedPolygon?.id === polygon.id}
                onClick={() => handleEditPolygon(polygon)}
                className={`btn__success w__full ${
                  selectedPolygon?.id === polygon.id
                    ? "cursor__not__allowed"
                    : ""
                }`}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
