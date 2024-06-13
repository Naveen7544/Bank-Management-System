import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    beneficiary: null,
};

const beneficiarySlice = createSlice({
  name: 'beneficiary',
  initialState,
  reducers: {
    setBeneficiary(state, action) {
      state.beneficiary = action.payload;
    },
    removeBeneficiary(state) {
      state.beneficiary = null;
    },
  },
});

export const { setBeneficiary, removeBeneficiary } = beneficiarySlice.actions;

export default beneficiarySlice.reducer;
