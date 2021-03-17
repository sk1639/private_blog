import { combineReducers } from 'redux';
import user from './user_reducer';
import messages from './message_reducer';

const rootReducer = combineReducers({
    messages, user,
});

export default rootReducer;