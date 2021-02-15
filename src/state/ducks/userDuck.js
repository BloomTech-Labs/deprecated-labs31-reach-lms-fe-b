const userATs = {};

export const userActions = {};

const userInitialState = {
  userid: '',
  username: '',
  role: '',
  loggedIn: false,
  isFetching: false,
  error: '',
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
