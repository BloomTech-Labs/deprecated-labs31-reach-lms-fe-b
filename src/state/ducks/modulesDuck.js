import { axiosAuth } from '../../api';

/******************************************************
 * MODULE ACTION TYPES
 ******************************************************/
const GET_MODULES_START = 'GET_MODULES_START';
const GET_MODULES_SUCCESS = 'GET_MODULES_SUCCESS';
const GET_MODULES_FAIL = 'GET_MODULES_FAIL';
const GET_MODULES_RESOLVE = 'GET_MODULES_RESOLVE';

const GET_MODULE_START = 'GET_MODULE_START';
const GET_MODULE_SUCCESS = 'GET_MODULE_SUCCESS';
const GET_MODULE_FAIL = 'GET_MODULE_FAIL';
const GET_MODULE_RESOLVE = 'GET_MODULE_RESOLVE';

const ADD_MODULE_START = 'ADD_MODULE_START';
const ADD_MODULE_SUCCESS = 'ADD_MODULE_SUCCESS';
const ADD_MODULE_FAIL = 'ADD_MODULE_FAIL';
const ADD_MODULE_RESOLVE = 'ADD_MODULE_RESOLVE';

const EDIT_MODULE_START = 'EDIT_MODULE_START';
const EDIT_MODULE_SUCCESS = 'EDIT_MODULE_SUCCESS';
const EDIT_MODULE_FAIL = 'EDIT_MODULE_FAIL';
const EDIT_MODULE_RESOLVE = 'EDIT_MODULE_RESOLVE';

const DELETE_MODULE_START = 'DELETE_MODULE_START';
const DELETE_MODULE_SUCCESS = 'DELETE_MODULE_SUCCESS';
const DELETE_MODULE_FAIL = 'DELETE_MODULE_FAIL';
const DELETE_MODULE_RESOLVE = 'DELETE_MODULE_RESOLVE';

/******************************************************
 * MODULE ACTIONS
 ******************************************************/
export const modulesActions = {
  getModulesThunk: () => dispatch => {
    dispatch({ type: GET_MODULES_START });

    axiosAuth()
      .get('/modules/modules')
      .then(res => {
        dispatch({ type: GET_MODULES_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_MODULES_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_MODULES_RESOLVE });
      });
  },

  getModuleThunk: id => dispatch => {
    dispatch({ type: GET_MODULE_START });

    axiosAuth()
      .get(`/modules/module/${id}`)
      .then(res => {
        dispatch({ type: GET_MODULE_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_MODULE_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_MODULE_RESOLVE });
      });
  },

  addModuleThunk: module => dispatch => {
    dispatch({ type: ADD_MODULE_START });

    axiosAuth()
      .post('/modules/module', module)
      .then(res => {
        dispatch({ type: ADD_MODULE_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ADD_MODULE_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: ADD_MODULE_RESOLVE });
      });
  },

  editModuleThunk: module => dispatch => {
    dispatch({ type: EDIT_MODULE_START });

    axiosAuth()
      .patch(`/modules/module/${module.moduleId}`, module)
      .then(res => {
        dispatch({ type: EDIT_MODULE_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: EDIT_MODULE_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: EDIT_MODULE_RESOLVE });
      });
  },

  deleteModuleThunk: id => dispatch => {
    dispatch({ type: DELETE_MODULE_START });

    axiosAuth()
      .delete(`/modules/module/${id}`)
      .then(res => {
        dispatch({ type: DELETE_MODULE_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: DELETE_MODULE_FAIL });
      })
      .finally(() => {
        dispatch({ type: DELETE_MODULE_RESOLVE });
      });
  },
};

/******************************************************
 * MODULE INITIAL STATE
 ******************************************************/
const modulesInitialState = {
  modules: [],
  status: 'idle',
  error: '',
  module: {
    moduleId: '',
    moduleName: '',
    moduleDescription: '',
    moduleContent: '',
    course: {},
  },
};

/******************************************************
 * MODULE REDUCERS
 ******************************************************/
const modulesReducer = (state = modulesInitialState, action) => {
  switch (action.type) {
    // GET MODULES
    case GET_MODULES_START:
      return {
        ...state,
        status: 'get-all/pending',
      };

    case GET_MODULES_SUCCESS:
      return {
        ...state,
        status: 'get-all/success',
        modules: action.payload,
      };

    case GET_MODULES_FAIL:
      return {
        ...state,
        status: 'get-all/error',
        error: action.payload,
      };

    case GET_MODULES_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    // GET INDIVIDUAL MODULE
    case GET_MODULE_START:
      return {
        ...state,
        status: 'get/pending',
      };

    case GET_MODULE_SUCCESS:
      return {
        ...state,
        status: 'get/success',
        module: action.payload,
      };

    case GET_MODULE_FAIL:
      return {
        ...state,
        status: 'get/error',
        error: action.payload,
      };

    case GET_MODULE_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    // ADD MODULE
    case ADD_MODULE_START:
      return {
        ...state,
        status: 'add/pending',
      };

    case ADD_MODULE_SUCCESS:
      return {
        ...state,
        status: 'add/success',
      };

    case ADD_MODULE_FAIL:
      return {
        ...state,
        status: 'add/error',
        error: action.payload,
      };

    case ADD_MODULE_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    // EDIT MODULE
    case EDIT_MODULE_START:
      return {
        ...state,
        status: 'edit/pending',
      };

    case EDIT_MODULE_SUCCESS:
      return {
        ...state,
        status: 'edit/success',
      };

    case EDIT_MODULE_FAIL:
      return {
        ...state,
        status: 'edit/error',
        error: action.payload,
      };

    case EDIT_MODULE_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    // DELETE MODULE
    case DELETE_MODULE_START:
      return {
        ...state,
        status: 'delete/pending',
      };

    case DELETE_MODULE_SUCCESS:
      return {
        ...state,
        status: 'delete/success',
      };

    case DELETE_MODULE_FAIL:
      return {
        ...state,
        status: 'delete/error',
        error: action.payload,
      };

    case DELETE_MODULE_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    // DEFAULT
    default:
      return state;
  }
};

export default modulesReducer;
