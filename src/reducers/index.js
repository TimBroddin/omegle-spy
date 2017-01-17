import {combineReducers} from 'redux';
import language from './language';
import replacements from './replacements';
import autoStart from './autoStart';
import conversation from './conversation'

const reducers = combineReducers({language, replacements, autoStart, conversation});

export default reducers;
