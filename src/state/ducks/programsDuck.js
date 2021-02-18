import { axiosAuth } from '../../api/axiosAuth';

//Action Types
const GET_PROGRAM_START = 'LOGIN_START';
const GET_PROGRAM_SUCCESS = 'LOGIN_SUCCESS';
const GET_PROGRAM_FAIL = 'LOGIN_FAIL';
const GET_PROGRAM_RESOLVE = 'LOGIN_RESOLVE';

export const programsActions = {};

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
