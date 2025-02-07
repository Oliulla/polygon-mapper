import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setPolygons } from "@/lib/polygonSlice";

const ExportAndImport = () => {
  const dispatch = useDispatch();
  const polygons = useSelector((state: RootState) => state.polygon.polygons);

  const handleExport = () => {
    const dataStr = JSON.stringify(polygons, null, 2); 
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "polygons.json"; 
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedPolygons = JSON.parse(e.target?.result as string);
        dispatch(setPolygons(importedPolygons));
      } catch (error) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w__full flex gap__x_2 align__self my__3 ml__1">
      <button onClick={handleExport} className="btn__primary">
        Export JSON
      </button>

      <label
        htmlFor="file-upload"
        className="btn__secondary cursor__pointer"
      >
        Import JSON
      </label>
      <input
        id="file-upload"
        type="file"
        accept="application/json"
        onChange={handleImport}
        className="hidden"
      />
    </div>
  );
};

export default ExportAndImport;
