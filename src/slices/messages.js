import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as channelsActions } from './channels';
import { actions as errorsActions } from './errors';
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
    [channelsActions.initState](state, { payload }) {
      return payload.messages;
    },
    [channelsActions.removeChannelSuccess](state, { payload: { data: { id } } }) {
      return state.filter((item) => item.id !== id);
    },

  },
});

export const addMessage = (currentChannelId, text, userName) => async (dispatch) => {
  const messageData = { data: { attributes: { text, userName } } };
  try {
    await axios.post(routes.channelMessagesPath(currentChannelId), messageData);
  } catch (error) {
    dispatch(errorsActions.addError(error.message));
  }
};

const { actions } = slice;
const asyncActions = {
  addMessage,
};

export { actions, asyncActions };
export default slice.reducer;
