import { axiosAuth } from '../../api/axiosAuth';

const LOGIN_START = 'LOGIN_START';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGIN_RESOLVE = 'LOGIN_RESOLVE';

export const userActions = {
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
};

const userInitialState = {
  userid: '',
  username: '',
  role: '',
  loggedIn: false,
  status: 'idle',
  error: '',
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, status: 'pending' };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userid: action.payload.userid,
        username: action.payload.username,
        role: action.payload.roles[0].role.name,
        loggedIn: true,
        status: 'success',
      };
    case LOGIN_FAIL:
      return { ...state, status: 'error', error: action.payload };
    case LOGIN_RESOLVE:
      return { ...state, status: 'idle' };
    default:
      return state;
  }
};

export default userReducer;
