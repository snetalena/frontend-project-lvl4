import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { keyBy } from 'lodash';
import * as actions from '../actions';

// const channels = handleActions({
//   [actions.getChannels](state, { payload: { channelsData } }) {
//     return [...state, ...channelsData];
//   },
// }, []);

const channels = handleActions({
  [actions.initState](state, { payload }) {
    const byId = keyBy(payload.channels, 'id');
    const allIds = payload.channels.map((channel) => channel.id);
    const { currentChannelId } = payload;
    return { byId, allIds, currentChannelId };
  },
  [actions.selectActiveChannel](state, { payload: { id } }) {
    const ns = { ...state, currentChannelId: id };
    return ns;
  },
}, { byId: {}, allIds: [], currentChannelId: 1 });

const messages = handleActions({
  [actions.initState](state, { payload }) {
    return payload.messages;
  },
  [actions.addMessageToState](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
}, []);

export default combineReducers({
  channels,
  messages,
});
