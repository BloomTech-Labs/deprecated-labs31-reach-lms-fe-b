const programsATs = {};

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
