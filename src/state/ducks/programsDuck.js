import { axiosAuth } from '../../api/axiosAuth';

/******************************************************
 * PROGRAM ACTION TYPES
 ******************************************************/
const GET_PROGRAM_START = ' GET_PROGRAM_START';
const GET_PROGRAM_SUCCESS = ' GET_PROGRAM_SUCCESS';
const GET_PROGRAM_FAIL = ' GET_PROGRAM_FAIL';
const GET_PROGRAM_RESOLVE = ' GET_PROGRAM_RESOLVE';

const GET_ALL_PROGRAMS_START = 'GET_ALL_PROGRAMS_START';
const GET_ALL_PROGRAMS_SUCCESS = 'GET_ALL_PROGRAMS_SUCCESS';
const GET_ALL_PROGRAMS_FAIL = 'GET_ALL_PROGRAMS_FAIL';
const GET_ALL_PROGRAMS_RESOLVE = 'GET_ALL_PROGRAMS_RESOLVE';

const GET_PROGRAM_COURSES_START = 'GET_PROGRAM_COURSES_START';
const GET_PROGRAM_COURSES_SUCCESS = 'GET_PROGRAM_COURSES_SUCCESS';
const GET_PROGRAM_COURSES_FAIL = 'GET_PROGRAM_COURSES_FAIL';
const GET_PROGRAM_COURSES_RESOLVE = 'GET_PROGRAM_COURSES_RESOLVE';

const ADD_PROGRAM_START = 'ADD_PROGRAM_START';
const ADD_PROGRAM_SUCCESS = 'ADD_PROGRAM_SUCCESS';
const ADD_PROGRAM_FAIL = 'ADD_PROGRAM_FAIL';
const ADD_PROGRAM_RESOLVE = 'ADD_PROGRAM_RESOLVE';

const EDIT_PROGRAM_START = 'EDIT_PROGRAM_START';
const EDIT_PROGRAM_SUCCESS = 'EDIT_PROGRAM_SUCCESS';
const EDIT_PROGRAM_FAIL = 'EDIT_PROGRAM_FAIL';
const EDIT_PROGRAM_RESOLVE = 'EDIT_PROGRAM_RESOLVE';

const DELETE_PROGRAM_START = 'DELETE_PROGRAM_START';
const DELETE_PROGRAM_SUCCESS = 'DELETE_PROGRAM_SUCCESS';
const DELETE_PROGRAM_FAIL = 'DELETE_PROGRAM_FAIL';
const DELETE_PROGRAM_RESOLVE = 'DELETE_PROGRAM_RESOLVE';

/******************************************************
 * PROGRAM ACTIONS
 ******************************************************/
export const programsActions = {
  // GET ALL PROGRAMS
  getAllProgramsThunk: () => dispatch => {
    dispatch({ type: GET_ALL_PROGRAMS_START });

    axiosAuth()
      .get('/users/getuserprograms')
      .then(res => {
        dispatch({ type: GET_ALL_PROGRAMS_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_ALL_PROGRAMS_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_ALL_PROGRAMS_RESOLVE });
      });
  },

  // GET INDIVIDUAL PROGRAM
  getProgramThunk: programId => dispatch => {
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

  // ADD PROGRAM
  addProgramThunk: programObj => dispatch => {
    dispatch({ type: ADD_PROGRAM_START });

    axiosAuth()
      .post(`/programs/program`, programObj)
      .then(res => {
        dispatch({ type: ADD_PROGRAM_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ADD_PROGRAM_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: ADD_PROGRAM_RESOLVE });
      });
  },

  // EDIT PROGRAM
  editProgramThunk: programObj => dispatch => {
    dispatch({ type: EDIT_PROGRAM_START });

    axiosAuth()
      .put(`/programs/program/${programObj.programId}`, programObj)
      .then(res => {
        dispatch({ type: EDIT_PROGRAM_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: EDIT_PROGRAM_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: EDIT_PROGRAM_RESOLVE });
      });
  },

  // DELETE PROGRAM
  deleteProgramThunk: programId => dispatch => {
    dispatch({ type: DELETE_PROGRAM_START });

    axiosAuth()
      .delete(`/programs/program/${programId}`)
      .then(res => {
        dispatch({ type: DELETE_PROGRAM_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: DELETE_PROGRAM_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: DELETE_PROGRAM_RESOLVE });
      });
  },

  // GET PROGRAM COURSES
  getProgramCoursesThunk: programId => dispatch => {
    dispatch({ type: GET_PROGRAM_COURSES_START });

    axiosAuth()
      .get(`/programs/program/${programId}/courses`)
      .then(res =>
        dispatch({ type: GET_PROGRAM_COURSES_SUCCESS, payload: res.data })
      )
      .catch(err =>
        dispatch({ type: GET_PROGRAM_COURSES_FAIL, payload: err.message })
      )
      .finally(() => dispatch({ type: GET_PROGRAM_COURSES_RESOLVE }));
  },
};

/******************************************************
 * PROGRAMS INITIAL STATE
 ******************************************************/
const programsInitialState = {
  programs: [],
  program: {
    programId: '',
    programName: '',
    programType: '',
    programDescription: '',
    courses: [],
  },
  programCourses: [],
  status: 'idle',
  error: '',
};

/******************************************************
 * PROGRAMS REDUCERS
 ******************************************************/
const programsReducer = (state = programsInitialState, action) => {
  switch (action.type) {
    //GET ALL PROGRAMS
    case GET_ALL_PROGRAMS_START:
      return { ...state, status: 'get-all/pending' };

    case GET_ALL_PROGRAMS_SUCCESS:
      return {
        ...state,
        programs: action.payload,
        status: 'get-all/success',
      };

    case GET_ALL_PROGRAMS_FAIL:
      return {
        ...state,
        status: 'get-all/error',
        error: action.payload,
      };

    case GET_ALL_PROGRAMS_RESOLVE:
      return {
        ...state,
        status: 'idle',
      };

    //GET INDIVIDUAL PROGRAM
    case GET_PROGRAM_START:
      return { ...state, status: 'get/pending' };

    case GET_PROGRAM_SUCCESS:
      const {
        programId,
        programName,
        programType,
        programDescription,
      } = action.payload;
      return {
        ...state,
        program: {
          ...state.program,
          programId,
          programName,
          programType,
          programDescription,
        },
        status: 'get/success',
      };

    case GET_PROGRAM_FAIL:
      return { ...state, status: 'get/error', error: action.payload };

    case GET_PROGRAM_RESOLVE:
      return { ...state, status: 'idle' };

    //ADD PROGRAM
    case ADD_PROGRAM_START:
      return { ...state, status: 'add/pending' };

    case ADD_PROGRAM_SUCCESS:
      return { ...state, status: 'add/success' };

    case ADD_PROGRAM_FAIL:
      return { ...state, status: 'add/error', error: action.payload };

    case ADD_PROGRAM_RESOLVE:
      return { ...state, status: 'idle' };

    //EDIT PROGRAM
    case EDIT_PROGRAM_START:
      return { ...state, status: 'edit/pending' };

    case EDIT_PROGRAM_SUCCESS:
      return { ...state, status: 'edit/success' };

    case EDIT_PROGRAM_FAIL:
      return { ...state, status: 'edit/error', error: action.payload };

    case EDIT_PROGRAM_RESOLVE:
      return { ...state, status: 'idle' };

    //DELETE PROGRAM
    case DELETE_PROGRAM_START:
      return { ...state, status: 'delete/pending' };

    case DELETE_PROGRAM_SUCCESS:
      return { ...state, status: 'delete/success' };

    case DELETE_PROGRAM_FAIL:
      return { ...state, status: 'delete/error', error: action.payload };

    case DELETE_PROGRAM_RESOLVE:
      return { ...state, status: 'delete/idle' };

    //GET PROGRAM COURSES
    case GET_PROGRAM_COURSES_START:
      return {
        ...state,
        status: 'get-courses/pending',
      };

    case GET_PROGRAM_COURSES_SUCCESS:
      return {
        ...state,
        status: 'get-courses/success',
        programCourses: action.payload,
      };

    case GET_PROGRAM_COURSES_FAIL:
      return {
        ...state,
        status: 'get-courses/fail',
        error: action.payload,
      };

    case GET_PROGRAM_COURSES_RESOLVE:
      return {
        ...state,
        status: 'get-courses/idle',
      };

    //DEFAULT
    default:
      return state;
  }
};

export default programsReducer;
