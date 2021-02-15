const coursesATs = {};

export const coursesActions = {};

const coursesInitialState = {
  courses: [],
  isFetching: false,
  error: '',
  course: {
    courseName: '',
    courseCode: '',
    courseDescription: '',
    program: {},
    modules: [],
    // users: [],
  },
};

const coursesReducer = (state = coursesInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default coursesReducer;
