import { axiosAuth } from '../../api/axiosAuth';

const GETALL_COURSES_START = 'GETALL_COURSES_START';
const GETALL_COURSES_SUCCESS = 'GETALL_COURSES_SUCCESS';
const GETALL_COURSES_FAIL = 'GETALL_COURSES_FAIL';
const GETALL_COURSES_RESOLVE = 'GETALL_COURSES_RESOLVE';

const GET_COURSE_START = 'GET_COURSE_START';
const GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS';
const GET_COURSE_FAIL = 'GET_COURSE_FAIL';
const GET_COURSE_RESOLVE = 'GET_COURSE_RESOLVE';

const GET_COURSE_MODULES_START = 'GET_COURSE_START';
const GET_COURSE_MODULES_SUCCESS = 'GET_COURSE_SUCCESS';
const GET_COURSE_MODULES_FAIL = 'GET_COURSE_FAIL';
const GET_COURSE_MODULES_RESOLVE = 'GET_COURSE_RESOLVE';

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

export const coursesActions = {
  getAllCoursesThunk: () => dispatch => {
    dispatch({ type: GETALL_COURSES_START });
    axiosAuth()
      .get('/courses/courses')
      .then(res => {
        dispatch({ type: GETALL_COURSES_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: GETALL_COURSES_FAIL, payload: err.message });
      })
      .finally(() => {
        dispatch({ type: GETALL_COURSES_RESOLVE });
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
    dispatch({ type: GET_COURSE_START });
    axiosAuth()
      .get(`/courses/course/${id}/modules`)
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

  addCourseThunk: course => dispatch => {
    dispatch({ type: ADD_COURSE_START });
    axiosAuth()
      .post('/courses/courses', course)
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
      .put(`/courses/course/${id}`)
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

const coursesInitialState = {
  courses: [],
  status: 'idle',
  error: '',
  course: {
    courseName: '',
    courseCode: '',
    courseDescription: '',
    program: {},
  },
};

const coursesReducer = (state = coursesInitialState, action) => {
  switch (action.type) {
    case GETALL_COURSES_START:
      return { ...state, status: 'pending' };
    case GETALL_COURSES_SUCCESS:
      return { ...state, courses: action.payload };
    case GETALL_COURSES_FAIL:
      return { ...state, status: 'error', error: action.payload };
    case GETALL_COURSES_RESOLVE:
      return { ...state, status: 'idle' };

    case GET_COURSE_START:
      return { ...state, status: 'pending' };
    case GET_COURSE_SUCCESS:
      return {
        ...state,
        course: action.payload,
        status: 'success',
      };
    case GET_COURSE_FAIL:
      return { ...state, status: 'error', error: action.payload };
    case GET_COURSE_RESOLVE:
      return { ...state, status: 'idle' };

    case GET_COURSE_MODULES_START:
      return { ...state, status: 'pending' };
    case GET_COURSE_MODULES_SUCCESS:
      return {
        ...state,
        course: {
          ...state.course,
          modules: action.payload,
        },
        status: 'success',
      };
    case GET_COURSE_MODULES_FAIL:
      return { ...state, status: 'error', error: action.payload };
    case GET_COURSE_MODULES_RESOLVE:
      return { ...state, status: 'idle' };

    case ADD_COURSE_START:
      return { ...state, status: 'pending' };
    case ADD_COURSE_SUCCESS:
      return { ...state, courses: action.payload };
    case ADD_COURSE_FAIL:
      return { ...state, status: 'error', error: action.payload };
    case ADD_COURSE_RESOLVE:
      return { ...state, status: 'idle' };

    case EDIT_COURSE_START:
      return { ...state, status: 'pending' };
    case EDIT_COURSE_SUCCESS:
      return { ...state, status: 'success' };
    case EDIT_COURSE_FAIL:
      return { ...state, status: 'error', error: action.payload };
    case EDIT_COURSE_RESOLVE:
      return { ...state, status: 'idle' };

    case DELETE_COURSE_START:
      return { ...state, status: 'pending' };
    case DELETE_COURSE_SUCCESS:
      return state;
    case DELETE_COURSE_FAIL:
      return { ...state, status: 'error', error: action.payload };
    case DELETE_COURSE_RESOLVE:
      return { ...state, status: 'idle' };
    default:
      return state;
  }
};

export default coursesReducer;
