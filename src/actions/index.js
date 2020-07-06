import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

// export const getChannels = createAction('CHANNELS_GET');

// export const getChannelsData = (channelsData) => (dispatch) => {
//   console.log('channelsData ', channelsData);
//   dispatch(getChannels({ channelsData }));
// };

export const initState = createAction('INIT_STATE');

export const addMessageToState = createAction('ADD_MESSAGE');

export const selectActiveChannel = createAction('SELECT_ACTIVE_CHANNEL');

export const openModal = createAction('OPEN_MODAL');

export const closeModal = createAction('CLOSE_MODAL');

export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');
export const addChannelFailure = createAction('ADD_CHANNEL_FAILURE');

export const removeChannelSuccess = createAction('REMOVE_CHANNEL_SUCCESS');
export const removeChannelFailure = createAction('REMOVE_CHANNEL_FAILURE');

export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');
export const renameChannelFailure = createAction('RENAMEE_CHANNEL_FAILURE');

export const addChannel = (channelName) => async (dispatch) => {
  const channelData = { data: { attributes: channelName } };
  try {
    await axios.post(routes.channelsPath(), channelData);
  } catch (e) {
    console.log('error when adding channel ', e);
    dispatch(addChannelFailure());
  }
};

export const removeChannel = (channelId) => async (dispatch) => {
  try {
    await axios.delete(routes.channelPath(channelId));
  } catch (e) {
    console.log('error when removing channel ', e);
    dispatch(removeChannelFailure());
  }
};

export const renameChannel = (channelId, channelName) => async (dispatch) => {
  console.log('channelId ', channelId);
  console.log('channelName ', channelName);
  try {
    const channelData = { data: { attributes: channelName } };
    const url = routes.channelPath(channelId);
    await axios.patch(url, channelData);
  } catch (e) {
    console.log('error when renaming channel ', e);
    dispatch(renameChannelFailure());
  }
};
