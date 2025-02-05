"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, removePolygon } from "@/lib/store";

const Sidebar = () => {
  const polygons = useSelector((state: RootState) => state.polygon.polygons);
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <h2>Saved Polygons</h2>
      {polygons.length === 0 ? <p>No polygons added.</p> : null}
      <div>
        {polygons.map((polygon) => (
          <div key={polygon.id} className="polygon__item">
            <span>Polygon {polygon.id.slice(0, 6)}</span>
            <button
              onClick={() => dispatch(removePolygon(polygon.id))}
              className="btn_danger"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
