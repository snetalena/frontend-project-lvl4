import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes';
import { actions as errorsActions } from './errors';

const slice = createSlice({
  name: 'channels',
  initialState: { byId: {}, allIds: [], currentChannelId: 1 },
  reducers: {
    initState: (state, { payload }) => {
      const byId = _.keyBy(payload.channels, 'id');
      const allIds = payload.channels.map((channel) => channel.id);
      const { currentChannelId } = payload;
      return { byId, allIds, currentChannelId };
    },
    selectActiveChannel: (state, { payload: { id } }) => (
      { ...state, currentChannelId: id }
    ),
    removeChannelSuccess: (state, { payload: { data: { id } } }) => {
      const { byId, allIds } = state;
      const newAllIds = allIds.filter((item) => item !== id);
      const newById = _.omit(byId, [id]);
      return { byId: newById, allIds: newAllIds, currentChannelId: 1 };
    },
    renameChannelSuccess: (state, { payload: { data: { attributes } } }) => {
      const { byId } = state;
      const newById = { ...byId, [attributes.id]: attributes };
      return { ...state, byId: newById };
    },
    addChannelSuccess: (state, { payload: { data: { attributes } } }) => {
      const { byId, allIds } = state;
      const addedChannelId = attributes.id;
      const newById = { ...byId, [addedChannelId]: attributes };
      const newAllIds = [...allIds, addedChannelId];
      return { byId: newById, allIds: newAllIds, currentChannelId: addedChannelId };
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
