"use client";

import { useMapEvents } from "react-leaflet";
import { Dispatch, SetStateAction } from "react";
import * as turf from "@turf/turf";

const MapClickHandler = ({
  currentPolygon,
  setCurrentPolygon,
}: {
  currentPolygon: [number, number][];
  setCurrentPolygon: Dispatch<SetStateAction<[number, number][]>>;
}) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newPoint: [number, number] = [lat, lng];

      // Ensure the new point is not the same as the last point
      if (
        currentPolygon.length > 0 &&
        currentPolygon[currentPolygon.length - 1][0] === lat &&
        currentPolygon[currentPolygon.length - 1][1] === lng
      ) {
        alert("Error: Duplicate point detected!");
        return;
      }

      // Create a temporary polygon with the new point
      const tempPolygon = [...currentPolygon, newPoint];

      // Only start checking for intersection after we have at least 3 points
      if (tempPolygon.length >= 3) {
        // Close the polygon by repeating the first point at the end
        const polygonCoords = tempPolygon.map(([lat, lng]) => [lng, lat]);
        polygonCoords.push(polygonCoords[0]); // Close the polygon

        // Create the polygon object
        const polygon = turf.polygon([polygonCoords]);

        // Check for self-intersections by comparing with the line formed by the points
        const line = turf.lineString(polygonCoords);

        if (!turf.booleanDisjoint(polygon, line)) {
          alert("Error: The polygon intersects itself!");
          return;
        }
      }

      setCurrentPolygon(tempPolygon);
    },
  });

  return null;
};

export default MapClickHandler;
