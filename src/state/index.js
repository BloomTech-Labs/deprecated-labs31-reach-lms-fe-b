import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import each duck state slice
import userReducer from './ducks/userDuck';
import programsReducer from './ducks/programsDuck';
import coursesReducer from './ducks/coursesDuck';
import modulesReducer from './ducks/modulesDuck';

export const middleware = [thunk];

export const createStoreWithMiddleware = applyMiddleware(...middleware)(
  createStore
);

export const rootReducer = combineReducers({
  user: userReducer,
  programs: programsReducer,
  courses: coursesReducer,
  modules: modulesReducer,
});

export const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
