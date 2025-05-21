import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/store';

const initialState: { id: number } = {
  id: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { setDashboardId } = dashboardSlice.actions;
export const getDashboardId = (state: RootState) => state.dashboard.id;

export default dashboardSlice.reducer;
