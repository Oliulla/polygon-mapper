import * as turf from "@turf/turf";

export const getCenter = (coordinates: [number, number][]) => {
  if (coordinates.length < 3) {
    return null; 
  }

  const closedPolygon = [...coordinates, coordinates[0]];

  const polygon = turf.polygon([closedPolygon]);
  const centroid = turf.centroid(polygon);

  return centroid.geometry.coordinates as [number, number];
};
