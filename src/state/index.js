import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import each duck state slice
import {
  userReducer,
  programsReducer,
  coursesReducer,
  modulesReducer,
} from './ducks';

export const middlewares = [thunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(
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
