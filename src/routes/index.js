export const HOME_PATH = '/';

export const LOGIN_PATH = '/login';

export const DASHBOARD_PATH = '/dashboard';

export const SETTINGS_PATH = '/settings';

export const CREATE_PROGRAM_PATH = '/create/program';
export const VIEW_PROGRAM_PATH = '/view/program/:id';
export const EDIT_PROGRAM_PATH = '/edit/program/:id';
export const makeViewProgramPath = programId => `/view/program/${programId}`;
export const makeEditProgramPath = programId => `/edit/program/${programId}`;

export const CREATE_COURSE_PATH = '/create/course';
export const VIEW_COURSE_PATH = '/view/course/:id';
export const EDIT_COURSE_PATH = '/edit/course/:id/p/:programId';
export const makeEditCoursePath = (courseId, programId) =>
  `/edit/course/${courseId}/p/${programId}`;
export const makeViewCoursePath = courseId => `/view/course/${courseId}`;

export const VIEW_MODULE_PATH = '/view/module/:id';
export const EDIT_MODULE_PATH = '/edit/module/:id';
export const makeViewModulePath = moduleId => `/view/module/${moduleId}`;
export const makeEditModulePath = moduleId => `/edit/module/${moduleId}`;

export const EDIT_PROFILE_PATH = '/edit/profile';

export const NESTED_EDIT_COURSE_PATH =
  '/edit/program/:programId/course/:courseId';
