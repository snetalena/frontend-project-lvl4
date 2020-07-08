import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: { byId: {}, allIds: [], currentChannelId: 1 },
  reducers: {
  },
});

export const { actions } = slice;
export default slice.reducer;
