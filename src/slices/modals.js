import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modals',
  initialState: {},
  reducers: {
    openModal: (state, { payload: { modalType, modalData } }) => (
      { modalType, modalData }
    ),
    closeModal: () => (
      { modalType: null, modalData: null }
    ),
  },
});

export const { actions } = slice;
export default slice.reducer;
