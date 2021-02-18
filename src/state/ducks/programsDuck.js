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

//Initial Slice of State
const programsInitialState = {
  programs: [],
  program: {
    programId: '',
    programName: '',
    programType: '',
    programDescription: '',
    courses: [],
  },
  status: 'idle',
  error: '',
};

//Reducers
const programsReducer = (state = programsInitialState, action) => {
  switch (action.type) {
    case GET_PROGRAM_START:
      return { ...state, status: 'pending' };
    case GET_PROGRAM_SUCCESS:
      return {
        ...state,
        program: {
          ...state.program,
          programId: action.payload.programId,
          programName: action.payload.programName,
          programType: action.payload.programType,
          programDescription: action.payload.programDescription,
          courses: [...state.program.courses, action.payload.courses],
        },
        loggedIn: true,
        status: 'success',
      };
    case GET_PROGRAM_FAIL:
      return { ...state, status: 'error', error: action.payload };
    case GET_PROGRAM_RESOLVE:
      return { ...state, status: 'idle' };
    default:
      return state;
  }
};

export default programsReducer;
