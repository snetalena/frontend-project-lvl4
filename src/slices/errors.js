import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'errors',
  initialState: {},
  reducers: {
    addError: (state, { payload }) => (
      { message: payload }
    ),
    cleanError: () => (
      {}
    ),
  },
});

export const { actions } = slice;
export default slice.reducer;
