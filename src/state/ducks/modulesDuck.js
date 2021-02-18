export const modulesActions = {};

const modulesInitialState = {
  modules: [],
  isFetching: false,
  error: '',
  module: {
    moduleName: '',
    moduleDescription: '',
    moduleContent: '',
    course: {},
  },
};

const modulesReducer = (state = modulesInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default modulesReducer;
