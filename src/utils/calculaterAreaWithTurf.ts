import * as turf from "@turf/turf";

export function calculateArea(coords: [number, number][], unit: "sqm" | "sqkm" | "acres" = "sqm"): number {
  if (coords.length < 3) {
    return 0;
  }

  const closedPolygon = [...coords, coords[0]];
  const polygon = turf.polygon([closedPolygon]);
  const areaSqMeters = turf.area(polygon);

  switch (unit) {
    case "sqkm":
      return areaSqMeters / 1_000_000;
    case "acres":
      return areaSqMeters * 0.000247105; 
    default:
      return areaSqMeters; 
  }
}
