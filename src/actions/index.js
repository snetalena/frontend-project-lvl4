import { createAction } from 'redux-actions';

export const getChannels = createAction('CHANNELS_GET');

export const getChannelsData = (channelsData) => (dispatch) => {
  console.log('channelsData ', channelsData);
  dispatch(getChannels({ channelsData }));
};
