// Shoelace Theorem function to calculate the area
export function calculatePolygonArea(coords: [number, number][]): number {
    const n = coords.length;
    let area = 0;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += coords[i][0] * coords[j][1];
      area -= coords[j][0] * coords[i][1];
    }

    area = Math.abs(area) / 2;
    return area;
  }