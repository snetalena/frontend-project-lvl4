/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes';
import { actions as errorsActions } from './errors';

const slice = createSlice({
  name: 'channels',
  initialState: { currentChannelId: 1, channels: [] },
  reducers: {
    selectActiveChannel: (state, { payload: { id } }) => (
      { ...state, currentChannelId: id }
    ),
    removeChannelSuccess: (state, { payload: { data: { id } } }) => {
      _.remove(state.channels, (channel) => channel.id === id);
      state.currentChannelId = 1;
    },
    renameChannelSuccess: (state, { payload: { data: { attributes } } }) => {
      const renamedChannel = state.channels.find((channel) => channel.id === attributes.id);
      renamedChannel.name = attributes.name;
    },
    addChannelSuccess: (state, { payload: { data: { attributes } } }) => {
      state.channels.push(attributes);
    },
  },
});

export const addChannel = (channelName) => async (dispatch) => {
  const channelData = { data: { attributes: channelName } };
  try {
    await axios.post(routes.channelsPath(), channelData);
  } catch (error) {
    dispatch(errorsActions.addError(error.message));
  }
};

export const removeChannel = (channelId) => async (dispatch) => {
  try {
    await axios.delete(routes.channelPath(channelId));
  } catch (error) {
    dispatch(errorsActions.addError(error.message));
  }
};

export const renameChannel = (channelId, channelName) => async (dispatch) => {
  try {
    const channelData = { data: { attributes: channelName } };
    const url = routes.channelPath(channelId);
    await axios.patch(url, channelData);
  } catch (error) {
    dispatch(errorsActions.addError(error.message));
  }
};

const { actions } = slice;
const asyncActions = {
  addChannel,
  removeChannel,
  renameChannel,
};

export { actions, asyncActions };
export default slice.reducer;
