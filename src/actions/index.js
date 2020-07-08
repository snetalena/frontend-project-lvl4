import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

// export const getChannels = createAction('CHANNELS_GET');

// export const getChannelsData = (channelsData) => (dispatch) => {
//   console.log('channelsData ', channelsData);
//   dispatch(getChannels({ channelsData }));
// };

export const initState = createAction('INIT_STATE');

export const addMessageSuccess = createAction('ADD_MESSAGE_SUCCESS');
export const addMessageFailure = createAction('ADD_MESSAGE_FAILURE');

export const selectActiveChannel = createAction('SELECT_ACTIVE_CHANNEL');

export const openModal = createAction('OPEN_MODAL');

export const closeModal = createAction('CLOSE_MODAL');

export const addChannelSuccess = createAction('ADD_CHANNEL_SUCCESS');
export const addChannelFailure = createAction('ADD_CHANNEL_FAILURE');

export const removeChannelSuccess = createAction('REMOVE_CHANNEL_SUCCESS');
export const removeChannelFailure = createAction('REMOVE_CHANNEL_FAILURE');

export const renameChannelSuccess = createAction('RENAME_CHANNEL_SUCCESS');
export const renameChannelFailure = createAction('RENAME_CHANNEL_FAILURE');

export const cleanErrors = createAction('CLEAN_ERRORS');

export const addMessage = (currentChannelId, text, userName) => async (dispatch) => {
  console.log('add message text ', text);
  const messageData = { data: { attributes: { text, userName } } };
  console.log('messageData ', messageData);
  try {
    await axios.post(routes.channelMessagesPath(currentChannelId), messageData);
  } catch (error) {
    // console.log('error when adding message ', e);
    dispatch(addMessageFailure({ error }));
  }
};

export const addChannel = (channelName) => async (dispatch) => {
  const channelData = { data: { attributes: channelName } };
  try {
    await axios.post(routes.channelsPath(), channelData);
  } catch (error) {
    // console.log('error when adding channel ', e);
    dispatch(addChannelFailure({ error }));
  }
};

export const removeChannel = (channelId) => async (dispatch) => {
  try {
    await axios.delete(routes.channelPath(channelId));
  } catch (error) {
    // console.log('error when removing channel ', e);
    dispatch(removeChannelFailure({ error }));
  }
};

export const renameChannel = (channelId, channelName) => async (dispatch) => {
  try {
    const channelData = { data: { attributes: channelName } };
    const url = routes.channelPath(channelId);
    await axios.patch(url, channelData);
  } catch (error) {
    // console.log('error when renaming channel ', e);
    dispatch(renameChannelFailure({ error }));
  }
};
