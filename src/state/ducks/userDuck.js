import { axiosAuth } from '../../api/axiosAuth';

/******************************************************
 * USER ACTION TYPES
 ******************************************************/
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_RESOLVE = 'LOGIN_RESOLVE';

export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
export const UPDATE_USER_RESOLVE = 'UPDATE_USER_RESOLVE';

/******************************************************
 * USER ACTIONS
 ******************************************************/
export const userActions = {
  // GET USER INFO
  loginThunk: () => dispatch => {
    dispatch({ type: LOGIN_START });

    axiosAuth()
      .get('/users/getuserinfo')
      .then(res => {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: LOGIN_RESOLVE });
      });
  },

  // UPDATE USER INFO
  updateUserThunk: (userId, userFieldsToUpdate) => dispatch => {
    dispatch({ type: UPDATE_USER_START });

    axiosAuth()
      .patch(`/users/user/${userId}`, userFieldsToUpdate)
      .then(res =>
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: res.data,
        })
      )
      .catch(err =>
        dispatch({
          type: UPDATE_USER_FAIL,
          payload: err.message,
        })
      )
      .finally(() => dispatch({ type: UPDATE_USER_RESOLVE }));
  },
};

/******************************************************
 * USER INITIAL STATE
 ******************************************************/
export const userInitialState = {
  user: null,
  role: null,
  loggedIn: false,
  status: 'idle',
  error: '',
};

/******************************************************
 * USER REDUCER
 ******************************************************/
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    // LOGIN
    case LOGIN_START:
      return { ...state, status: 'get/pending' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        role: action.payload.roles[0].role.name,
        loggedIn: true,
        status: 'get/success',
      };
    case LOGIN_FAIL:
      return { ...state, status: 'get/error', error: action.payload };
    case LOGIN_RESOLVE:
      return { ...state, status: 'idle' };

    // UPDATE USER
    case UPDATE_USER_START:
      return {
        ...state,
        status: 'edit/pending',
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        status: 'edit/success',
        user: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        status: 'edit/error',
        error: action.payload,
      };
    case UPDATE_USER_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    // DEFAULT
    default:
      return state;
  }
};

export default userReducer;
