import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as channelsActions } from './channels';
import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccess: (state, { payload: { attributes } }) => (
      [...state, attributes]
    ),
  },
  extraReducers: {
    [channelsActions.removeChannelSuccess](state, { payload: { data: { id } } }) {
      return state.filter((item) => item.id !== id);
    },
  },
});

export const addMessage = (messageData, currentChannelId) => async () => {
  await axios.post(routes.channelMessagesPath(currentChannelId), messageData);
};

const { actions } = slice;
const asyncActions = {
  addMessage,
};

export { actions, asyncActions };
export default slice.reducer;
