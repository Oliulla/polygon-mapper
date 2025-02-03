import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PolygonState {
  polygons: { id: string; coordinates: [number, number][]; color: string }[];
}

const initialState: PolygonState = { polygons: [] };

const polygonSlice = createSlice({
  name: "polygon",
  initialState,
  reducers: {
    addPolygon: (
      state,
      action: PayloadAction<{
        id: string;
        coordinates: [number, number][];
        color: string;
      }>
    ) => {
      state.polygons.push(action.payload);
    },
    removePolygon: (state, action: PayloadAction<string>) => {
      state.polygons = state.polygons.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addPolygon, removePolygon } = polygonSlice.actions;
export const store = configureStore({
  reducer: { polygon: polygonSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
