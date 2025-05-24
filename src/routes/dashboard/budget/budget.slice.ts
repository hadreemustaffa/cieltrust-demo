import { createSlice } from '@reduxjs/toolkit';

import { Table } from '@/routes/dashboard/budget/budget.types';

import { RootState } from '@/store';

const initialState: Table[] = [];

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {},
});

export const getTables = (state: RootState) => state.budget;

export default budgetSlice.reducer;
