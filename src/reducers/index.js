import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import * as actions from '../actions';

// const channels = handleActions({
//   [actions.getChannels](state, { payload: { channelsData } }) {
//     return [...state, ...channelsData];
//   },
// }, []);

const channels = handleActions({
  [actions.initState](state, { payload }) {
    const byId = _.keyBy(payload.channels, 'id');
    const allIds = payload.channels.map((channel) => channel.id);
    const { currentChannelId } = payload;
    return { byId, allIds, currentChannelId };
  },
  [actions.selectActiveChannel](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
  [actions.removeChannelSuccess](state, { payload }) {
    const { data: { id } } = payload;
    const { byId, allIds } = state;
    const newAllIds = allIds.filter((item) => item !== id);
    const newById = _.omit(byId, [id]);
    return { byId: newById, allIds: newAllIds, currentChannelId: 1 };
  },
  [actions.renameChannelSuccess](state, { payload }) {
    const { data: { attributes } } = payload;
    const renamedChannelId = attributes.id;
    const { byId, allIds, currentChannelId } = state;
    const newById = { ...byId, [renamedChannelId]: attributes };
    return { byId: newById, allIds, currentChannelId };
  },
  [actions.addChannelSuccess](state, { payload }) {
    const { data: { attributes } } = payload;
    const { byId, allIds } = state;
    const addedChannelId = attributes.id;
    const newById = { ...byId, [addedChannelId]: attributes };
    const newAllIds = [...allIds, addedChannelId];
    return { byId: newById, allIds: newAllIds, currentChannelId: addedChannelId };
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

const modals = handleActions({
  [actions.openModal](state, { payload: { modalType, modalData } }) {
    return { modalType, modalData };
  },
  [actions.closeModal]() {
    return { modalType: null, modalData: null };
  },
}, {});

const errors = handleActions({
  [actions.addChannelFailure]() {
    return { message: 'Adding channel error! Please, try do it later' };
  },
  [actions.removeChannelFailure]() {
    return { message: 'Removing channel error! Please, try do it later' };
  },
  [actions.renameChannelFailure]() {
    return { message: 'Renaming channel error! Please, try do it later' };
  },
}, {});

export default combineReducers({
  channels,
  messages,
  modals,
  errors,
});
