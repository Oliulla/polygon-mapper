import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Polygon {
  id: string;
  label: string;
  coordinates: [number, number][];
  color: string;
}

interface PolygonState {
  polygons: Polygon[];
  selectedPolygon: Polygon | null;
}

const initialState: PolygonState = {
  polygons: [],
  selectedPolygon: null,
};

const polygonSlice = createSlice({
  name: "polygon",
  initialState,
  reducers: {
    addPolygon: (state, action: PayloadAction<Polygon>) => {
      state.polygons.push(action.payload);
    },
    removePolygon: (state, action: PayloadAction<string>) => {
      state.polygons = state.polygons.filter((p) => p.id !== action.payload);
    },
    updatePolygon: (
      state,
      action: PayloadAction<{
        id: string;
        label: string;
        color?: string;
        coordinates?: [number, number][];
      }>
    ) => {
      const polygon = state.polygons.find((p) => p.id === action.payload.id);
      if (polygon) {
        if (action.payload.color) polygon.color = action.payload.color;
        if (action.payload.coordinates) {
          polygon.coordinates = action.payload.coordinates;
        }
      }
    },
    setSelectedPolygon: (state, action: PayloadAction<Polygon | null>) => {
      state.selectedPolygon = action.payload;
    },
  },
});

export const { addPolygon, removePolygon, updatePolygon, setSelectedPolygon } =
  polygonSlice.actions;
export default polygonSlice.reducer;
