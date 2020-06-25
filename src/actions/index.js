import { createAction } from 'redux-actions';

// export const getChannels = createAction('CHANNELS_GET');

// export const getChannelsData = (channelsData) => (dispatch) => {
//   console.log('channelsData ', channelsData);
//   dispatch(getChannels({ channelsData }));
// };

export const initState = createAction('INIT_STATE');

export const addMessageToState = createAction('ADD_MESSAGE');

export const selectActiveChannel = createAction('SELECT_ACTIVE_CHANNEL');
