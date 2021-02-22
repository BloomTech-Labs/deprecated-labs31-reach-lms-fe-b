import { axiosAuth } from '../../api/axiosAuth';

//=========================
//Action Types
//=========================
const GET_PROGRAM_START = ' GET_PROGRAM_START';
const GET_PROGRAM_SUCCESS = ' GET_PROGRAM_SUCCESS';
const GET_PROGRAM_FAIL = ' GET_PROGRAM_FAIL';
const GET_PROGRAM_RESOLVE = ' GET_PROGRAM_RESOLVE';

const GET_ALLPROGRAMS_START = 'GET_ALLPROGRAMS_START';
const GET_ALLPROGRAMS_SUCCESS = 'GET_ALLPROGRAMS_SUCCESS';
const GET_ALLPROGRAMS_FAIL = 'GET_ALLPROGRAMS_FAIL';
const GET_ALLPROGRAMS_RESOLVE = 'GET_ALLPROGRAMS_RESOLVE';

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

const GET_PROGRAM_COURSES_START = 'GET_PROGRAM_COURSES_START';
const GET_PROGRAM_COURSES_SUCCESS = 'GET_PROGRAM_COURSES_SUCCESS';
const GET_PROGRAM_COURSES_FAIL = 'GET_PROGRAM_COURSES_FAIL';
const GET_PROGRAM_COURSES_RESOLVE = 'GET_PROGRAM_COURSES_RESOLVE';

//=========================
//Action Creators
//=========================

export const programsActions = {
  //=========================
  //Get All Programs Action
  //=========================
  getAllProgramsThunk: () => dispatch => {
    dispatch({ type: GET_ALLPROGRAMS_START });

    axiosAuth()
      .get('/programs/programs')
      .then(res => {
        dispatch({ type: GET_ALLPROGRAMS_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_ALLPROGRAMS_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_ALLPROGRAMS_RESOLVE });
      });
  },

  //=========================
  //Get Program Action
  //=========================
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

  //=========================
  //Add Program Action
  //=========================
  addProgramThunk: programObj => dispatch => {
    dispatch({ type: ADD_PROGRAM_START });
    console.log({ programObj });
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

  //=========================
  //Edit Program Action
  //=========================
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

  //=========================
  //Delete Program Action
  //=========================
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

  //=========================
  // GET Program Courses
  //=========================
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

//=========================
//Initial Slice of State
//=========================
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
  statusGetCourses: 'idle',
  statusGet: 'idle',
  statusAdd: 'idle',
  statusEdit: 'idle',
  statusDelete: 'idle',
  error: '',
};

//=========================
//Reducers
//=========================
const programsReducer = (state = programsInitialState, action) => {
  switch (action.type) {
    //=========================
    //Get All Programs Reducers
    //=========================
    case GET_ALLPROGRAMS_START:
      return { ...state, statusGet: 'pending' };

    case GET_ALLPROGRAMS_SUCCESS:
      return {
        ...state,
        programs: action.payload,
        statusGet: 'success',
      };
    case GET_ALLPROGRAMS_FAIL:
      return { ...state, statusGet: 'error', error: action.payload };

    case GET_ALLPROGRAMS_RESOLVE:
      return { ...state, statusGet: 'idle' };

    //================================
    //Get Individual Programs Reducers
    //================================
    case GET_PROGRAM_START:
      return { ...state, statusGet: 'pending' };

    case GET_PROGRAM_SUCCESS:
      const {
        programId,
        programName,
        programType,
        programDescription,
        courses,
      } = action.payload;
      return {
        ...state,
        program: {
          ...state.program,
          programId,
          programName,
          programType,
          programDescription,
          courses: courses,
        },
        statusGet: 'success',
      };

    case GET_PROGRAM_FAIL:
      return { ...state, statusGet: 'error', error: action.payload };

    case GET_PROGRAM_RESOLVE:
      return { ...state, statusGet: 'idle' };

    //=========================
    //Add Program Reducers
    //=========================
    case ADD_PROGRAM_START:
      return { ...state, statusAdd: 'pending' };

    case ADD_PROGRAM_SUCCESS:
      return { ...state, statusAdd: 'success' };

    case ADD_PROGRAM_FAIL:
      return { ...state, statusAdd: 'error', error: action.payload };

    case ADD_PROGRAM_RESOLVE:
      return { ...state, statusAdd: 'idle' };

    //=========================
    //Edit Program Reducers
    //=========================
    case EDIT_PROGRAM_START:
      return { ...state, statusEdit: 'pending' };

    case EDIT_PROGRAM_SUCCESS:
      return { ...state, statusEdit: 'success' };

    case EDIT_PROGRAM_FAIL:
      return { ...state, statusEdit: 'error', error: action.payload };

    case EDIT_PROGRAM_RESOLVE:
      return { ...state, statusEdit: 'idle' };

    //=========================
    //Delete Program Reducers
    //=========================
    case DELETE_PROGRAM_START:
      return { ...state, statusDelete: 'pending' };

    case DELETE_PROGRAM_SUCCESS:
      return { ...state, statusDelete: 'success' };

    case DELETE_PROGRAM_FAIL:
      return { ...state, statusDelete: 'error', error: action.payload };

    case DELETE_PROGRAM_RESOLVE:
      return { ...state, statusDelete: 'idle' };

    //=========================
    // GET Program Courses Reducers
    //=========================
    case GET_PROGRAM_COURSES_START:
      return {
        ...state,
        statusGetCourses: 'pending',
      };
    case GET_PROGRAM_COURSES_SUCCESS:
      return {
        ...state,
        statusGetCourses: 'success',
        programCourses: action.payload,
      };
    case GET_PROGRAM_COURSES_FAIL:
      return {
        ...state,
        statusGetCourses: 'fail',
        error: action.payload,
      };
    case GET_PROGRAM_COURSES_RESOLVE:
      return {
        ...state,
        statusGetCourses: 'idle',
      };

    //=========================
    //Default Case
    //=========================
    default:
      return state;
  }
};

export default programsReducer;
