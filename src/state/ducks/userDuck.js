import { axiosAuth } from '../../api/axiosAuth';

/******************************************************
 * USER ACTION TYPES
 ******************************************************/
const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGIN_RESOLVE = 'LOGIN_RESOLVE';
const UPDATE_USER_START = 'UPDATE_USER_START';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';
const UPDATE_USER_RESOLVE = 'UPDATE_USER_RESOLVE';

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
const userInitialState = {
  user: null, // we don't need to call out individual properties like below... we can just have one big "user" property.
  // but I didn't want to make breaking changes so I'll leave below for now
  userid: '',
  username: '',
  role: '',
  loggedIn: false,
  statusGet: 'idle',
  error: '',
};

/******************************************************
 * USER REDUCER
 ******************************************************/
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    //-----------------------------
    // LOGIN
    //-----------------------------
    case LOGIN_START:
      return { ...state, statusGet: 'pending' };
    case LOGIN_SUCCESS:
      return {
        // this needs to be refactored for consistency — let's wait till Shane updates backend tho
        ...state,
        user: action.payload, // just put all of our payload in as our user info!!
        userid: action.payload.userid,
        username: action.payload.username,
        role: action.payload.roles[0].role.name,
        loggedIn: true,
        statusGet: 'success',
      };
    case LOGIN_FAIL:
      return { ...state, statusGet: 'error', error: action.payload };
    case LOGIN_RESOLVE:
      return { ...state, statusGet: 'idle' };

    //-----------------------------
    // UPDATE_USER
    //-----------------------------
    case UPDATE_USER_START:
      return {
        ...state,
        statusUpdate: 'pending',
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        statusUpdate: 'success',
        user: action.payload,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        statusUpdate: 'error',
        error: action.payload,
      };
    case UPDATE_USER_RESOLVE:
      return {
        ...state,
        statusUpdate: 'idle',
      };
    //-----------------------------
    // DEFAULT
    //-----------------------------
    default:
      return state;
  }
};

export default userReducer;
