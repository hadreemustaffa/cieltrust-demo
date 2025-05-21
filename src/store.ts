import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { apiSlice } from '@/routes/dashboard/api-slice';
import dashboardReducer from '@/routes/dashboard/dashboard-slice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
