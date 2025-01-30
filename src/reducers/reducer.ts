import { combineReducers } from 'redux';
import modalReducer from './modal';

const rootReducer = combineReducers({
  modal: modalReducer,
});

export default rootReducer;
