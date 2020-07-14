import { combineReducers } from 'redux';
import channels, { actions as channelsActions, asyncActions as asyncChannelsActions } from './channels';
import messages, { actions as messagesActions, asyncActions as asyncMessagesActions } from './messages';
import modals, { actions as modalActions } from './modals';
import errors, { actions as errorsActions } from './errors';

export default combineReducers({
  channels,
  messages,
  modals,
  errors,
});

export {
  channelsActions,
  messagesActions,
  modalActions,
  errorsActions,
  asyncChannelsActions,
  asyncMessagesActions,
};
