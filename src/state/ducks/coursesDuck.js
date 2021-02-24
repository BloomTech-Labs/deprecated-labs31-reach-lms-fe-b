import { axiosAuth } from '../../api/axiosAuth';

/******************************************************
 * COURSE ACTION TYPES
 ******************************************************/
const GET_ALL_COURSES_START = 'GET_ALL_COURSES_START';
const GET_ALL_COURSES_SUCCESS = 'GET_ALL_COURSES_SUCCESS';
const GET_ALL_COURSES_FAIL = 'GET_ALL_COURSES_FAIL';
const GET_ALL_COURSES_RESOLVE = 'GET_ALL_COURSES_RESOLVE';

const GET_COURSE_START = 'GET_COURSE_START';
const GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS';
const GET_COURSE_FAIL = 'GET_COURSE_FAIL';
const GET_COURSE_RESOLVE = 'GET_COURSE_RESOLVE';

const GET_COURSE_MODULES_START = 'GET_COURSE_MODULES_START';
const GET_COURSE_MODULES_SUCCESS = 'GET_COURSE_MODULES_SUCCESS';
const GET_COURSE_MODULES_FAIL = 'GET_COURSE_MODULES_FAIL';
const GET_COURSE_MODULES_RESOLVE = 'GET_COURSE_MODULES_RESOLVE';

const ADD_COURSE_START = 'ADD_COURSE_START';
const ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS';
const ADD_COURSE_FAIL = 'ADD_COURSE_FAIL';
const ADD_COURSE_RESOLVE = 'ADD_COURSE_RESOLVE';

const EDIT_COURSE_START = 'EDIT_COURSE_START';
const EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS';
const EDIT_COURSE_FAIL = 'EDIT_COURSE_FAIL';
const EDIT_COURSE_RESOLVE = 'EDIT_COURSE_RESOLVE';

const DELETE_COURSE_START = 'DELETE_COURSE_START';
const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';
const DELETE_COURSE_FAIL = 'DELETE_COURSE_FAIL';
const DELETE_COURSE_RESOLVE = 'DELETE_COURSE_RESOLVE';

/******************************************************
 * COURSE ACTIONS
 ******************************************************/
export const coursesActions = {
  getAllCoursesThunk: () => dispatch => {
    dispatch({ type: GET_ALL_COURSES_START });

    axiosAuth()
      .get('/courses/courses')
      .then(res => {
        dispatch({ type: GET_ALL_COURSES_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_ALL_COURSES_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_ALL_COURSES_RESOLVE });
      });
  },

  getCourseThunk: id => dispatch => {
    dispatch({ type: GET_COURSE_START });

    axiosAuth()
      .get(`/courses/course/${id}`)
      .then(res => {
        dispatch({ type: GET_COURSE_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_COURSE_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_COURSE_RESOLVE });
      });
  },

  getCourseModulesThunk: id => dispatch => {
    dispatch({ type: GET_COURSE_MODULES_START });

    axiosAuth()
      .get(`/courses/course/${id}/modules`)
      .then(res => {
        dispatch({ type: GET_COURSE_MODULES_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GET_COURSE_MODULES_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GET_COURSE_MODULES_RESOLVE });
      });
  },

  addCourseThunk: course => dispatch => {
    dispatch({ type: ADD_COURSE_START });

    axiosAuth()
      .post('/courses/course', course)
      .then(res => {
        dispatch({ type: ADD_COURSE_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: ADD_COURSE_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: ADD_COURSE_RESOLVE });
      });
  },

  editCourseThunk: course => dispatch => {
    dispatch({ type: EDIT_COURSE_START });

    axiosAuth()
      .patch(`/courses/course/${course.courseid}`, course)
      .then(res => {
        dispatch({ type: EDIT_COURSE_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: EDIT_COURSE_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: EDIT_COURSE_RESOLVE });
      });
  },

  deleteCourseThunk: id => dispatch => {
    dispatch({ type: DELETE_COURSE_START });

    axiosAuth()
      .delete(`/courses/course/${id}`)
      .then(res => {
        dispatch({ type: DELETE_COURSE_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: DELETE_COURSE_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: DELETE_COURSE_RESOLVE });
      });
  },
};

/******************************************************
 * COURSE INITIAL STATE
 ******************************************************/
const coursesInitialState = {
  courses: [],
  status: 'idle',
  statusGet: 'idle',
  statusAdd: 'idle',
  statusEdit: 'idle',
  statusDelete: 'idle',
  error: '',
  course: {
    courseName: '',
    courseCode: '',
    courseDescription: '',
    program: {},
  },
};

/******************************************************
 * COURSE REDUCERS
 ******************************************************/
const coursesReducer = (state = coursesInitialState, action) => {
  switch (action.type) {
    // GET ALL COURSES
    case GET_ALL_COURSES_START:
      return {
        ...state,
        statusGet: 'pending',
      };

    case GET_ALL_COURSES_SUCCESS:
      return {
        ...state,
        statusGet: 'success',
        courses: action.payload,
      };

    case GET_ALL_COURSES_FAIL:
      return {
        ...state,
        statusGet: 'error',
        error: action.payload,
      };

    case GET_ALL_COURSES_RESOLVE:
      return {
        ...state,
        statusGet: 'idle',
      };

    // GET COURSE (by id)
    case GET_COURSE_START:
      return {
        ...state,
        statusGet: 'pending',
      };

    case GET_COURSE_SUCCESS:
      return {
        ...state,
        course: { ...state.course, ...action.payload },
        statusGet: 'success',
      };

    case GET_COURSE_FAIL:
      return {
        ...state,
        statusGet: 'error',
        error: action.payload,
      };

    case GET_COURSE_RESOLVE:
      return {
        ...state,
        statusGet: 'idle',
      };

    // GET COURSE MODULES (by course id)
    case GET_COURSE_MODULES_START:
      return {
        ...state,
        statusGet: 'pending',
      };

    case GET_COURSE_MODULES_SUCCESS:
      return {
        ...state,
        course: {
          ...state.course,
          modules: action.payload,
        },
        statusGet: 'success',
      };

    case GET_COURSE_MODULES_FAIL:
      return {
        ...state,
        statusGet: 'error',
        error: action.payload,
      };

    case GET_COURSE_MODULES_RESOLVE:
      return {
        ...state,
        statusGet: 'idle',
      };

    // ADD COURSE
    case ADD_COURSE_START:
      return {
        ...state,
        statusAdd: 'pending',
      };

    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        statusAdd: 'success',
        courses: action.payload,
      };

    case ADD_COURSE_FAIL:
      return {
        ...state,
        statusAdd: 'error',
        error: action.payload,
      };

    case ADD_COURSE_RESOLVE:
      return {
        ...state,
        statusAdd: 'idle',
      };

    // EDIT COURSE
    case EDIT_COURSE_START:
      return {
        ...state,
        statusEdit: 'pending',
      };

    case EDIT_COURSE_SUCCESS:
      return {
        ...state,
        statusEdit: 'success',
      };

    case EDIT_COURSE_FAIL:
      return {
        ...state,
        statusEdit: 'error',
        error: action.payload,
      };

    case EDIT_COURSE_RESOLVE:
      return {
        ...state,
        statusEdit: 'idle',
      };

    // DELETE COURSE
    case DELETE_COURSE_START:
      return {
        ...state,
        statusDelete: 'pending',
      };

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        statusDelete: 'success',
      };

    case DELETE_COURSE_FAIL:
      return {
        ...state,
        statusDelete: 'error',
        error: action.payload,
      };

    case DELETE_COURSE_RESOLVE:
      return {
        ...state,
        statusDelete: 'idle',
      };

    //DEFAULT
    default:
      return state;
  }
};

export default coursesReducer;
