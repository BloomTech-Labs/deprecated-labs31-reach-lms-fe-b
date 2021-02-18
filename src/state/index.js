import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import each duck state slice
import userReducer from './ducks/userDuck';
import programsReducer from './ducks/programsDuck';
import coursesReducer from './ducks/coursesDuck';
import modulesReducer from './ducks/modulesDuck';

const middlewares = [thunk];

const createStoreWithMiddelwares = applyMiddleware(...middlewares)(createStore);

const rootReducer = combineReducers({
  user: userReducer,
  programs: programsReducer,
  courses: coursesReducer,
  modules: modulesReducer,
});

export const store = createStoreWithMiddelwares(rootReducer);
