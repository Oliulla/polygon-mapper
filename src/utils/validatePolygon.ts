import * as turf from "@turf/turf";
import booleanIntersects from "@turf/boolean-intersects";
import booleanContains from "@turf/boolean-contains";

export const isPolygonValid = (
  newPolygonCoords: [number, number][],
  existingPolygons: { coordinates: [number, number][] }[]
): boolean => {
  const closedPolygon = [...newPolygonCoords, newPolygonCoords[0]];
  const newTurfPolygon = turf.polygon([closedPolygon]);

  return !existingPolygons.some((existingPolygon) => {
    const closedCoordsExistingPolygon = [
      ...existingPolygon.coordinates,
      existingPolygon.coordinates[0],
    ];
    const existingTurfPolygon = turf.polygon([closedCoordsExistingPolygon]);

    return (
      booleanIntersects(existingTurfPolygon, newTurfPolygon) ||
      booleanContains(existingTurfPolygon, newTurfPolygon) ||
      booleanContains(newTurfPolygon, existingTurfPolygon)
    );
  });
};
