export const calculateCentroid = (
  coordinates: [number, number][]
): [number, number] => {
  if (coordinates.length === 0) return [0, 0];
  const latSum = coordinates.reduce((sum, coord) => sum + coord[0], 0);
  const lngSum = coordinates.reduce((sum, coord) => sum + coord[1], 0);

  return [latSum / coordinates.length, lngSum / coordinates.length] as [
    number,
    number
  ];
};
