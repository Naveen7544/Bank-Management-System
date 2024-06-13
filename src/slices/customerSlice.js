import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customer: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    removeCustomer(state) {
      state.customer = null;
    },
  },
});

export const { setCustomer, removeCustomer } = customerSlice.actions;

export default customerSlice.reducer;
