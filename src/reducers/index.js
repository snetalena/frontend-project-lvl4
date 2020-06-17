import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const channels = handleActions({
  [actions.getChannels](state, { payload: { channelsData } }) {
    return [...state, ...channelsData];
  },
}, []);

export default combineReducers({
  channels,
});
