"use client";

import { useMapEvents } from "react-leaflet";
import { Dispatch, SetStateAction } from "react";
import booleanIntersects from "@turf/boolean-intersects";
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

      // Ensure at least 4 points are present to form a valid polygon
      if (tempPolygon.length >= 4) {
        const line = turf.lineString(
          tempPolygon.map(([lat, lng]) => [lng, lat])
        );

        // Check for intersection with all the previous segments
        for (let i = 0; i < tempPolygon.length - 1; i++) {
          const prevSegment = turf.lineString([
            [tempPolygon[i][1], tempPolygon[i][0]],
            [tempPolygon[i + 1][1], tempPolygon[i + 1][0]],
          ]);
          const newSegment = turf.lineString([
            [tempPolygon[i + 1][1], tempPolygon[i + 1][0]],
            [newPoint[1], newPoint[0]],
          ]);

          // Check if any segment intersects
          if (booleanIntersects(prevSegment, newSegment)) {
            alert("Error: The polygon intersects itself!");
            return;
          }
        }
      }

      setCurrentPolygon(tempPolygon);
    },
  });

  return null;
};

export default MapClickHandler;
