import { configureStore } from '@reduxjs/toolkit';

import customerSlice from '../slices/customerSlice';
import beneficiarySlice from '../slices/beneficiarySlice';

const store = configureStore({
  reducer: {
    customerList: customerSlice,
    beneficiaryList: beneficiarySlice,
  },
});

export default store;
