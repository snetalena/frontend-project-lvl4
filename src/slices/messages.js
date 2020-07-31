import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';
import { actions as channelsActions } from './channels';
import routes from '../routes';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccess: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: {
    [channelsActions.removeChannelSuccess](state, { payload: { id } }) {
      _.remove(state, (message) => message.channelId === id);
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
