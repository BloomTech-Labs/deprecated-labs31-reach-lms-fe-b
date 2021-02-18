import { axiosAuth } from '../../api/axiosAuth';

//Action Types
const GET_PROGRAM_START = 'LOGIN_START';
const GET_PROGRAM_SUCCESS = 'LOGIN_SUCCESS';
const GET_PROGRAM_FAIL = 'LOGIN_FAIL';
const GET_PROGRAM_RESOLVE = 'LOGIN_RESOLVE';

//Action Creators
export const programsActions = {
  getProgramsThunk: programId => dispatch => {
    dispatch({ type: GET_PROGRAM_START });

    axiosAuth()
      .get(`/programs/program/${programId}`)
      .then(res => {
        dispatch({ type: GET_PROGRAM_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_PROGRAM_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_PROGRAM_RESOLVE });
      });
  },
};

const programsInitialState = {
  programs: [],
  isFetching: false,
  error: '',
  program: {
    id: '',
    programName: '',
    programType: '',
    programDescription: '',
    courses: [],
    // users: [],
  },
};

const programsReducer = (state = programsInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default programsReducer;
