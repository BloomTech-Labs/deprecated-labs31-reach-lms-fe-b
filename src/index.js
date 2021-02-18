import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { Provider } from 'react-redux';
import { store } from './state/index';

import 'antd/dist/antd.less';

import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import {
  CourseForm,
  CourseView,
  ModuleForm,
  ModuleView,
  SettingsPage,
  ProgramForm,
  ProgramView,
  HomePage,
  LoginPage,
  NotFoundPage,
  DashboardView,
  DashWrapper,
} from './components/pages';
import {
  HOME_PATH,
  LOGIN_PATH,
  SETTINGS_PATH,
  VIEW_PROGRAM_PATH,
  EDIT_PROGRAM_PATH,
  CREATE_PROGRAM_PATH,
  VIEW_COURSE_PATH,
  EDIT_COURSE_PATH,
  CREATE_COURSE_PATH,
  VIEW_MODULE_PATH,
  EDIT_MODULE_PATH,
  DASHBOARD_PATH,
} from './routes/';
import { CoursePage } from './components/pages/course-form';
import dummyData from './components/pages/program-view/dummydata';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <SecureRoute
          path={VIEW_PROGRAM_PATH}
          component={() => (
            <DashWrapper>
              <ProgramView programData={dummyData} />
            </DashWrapper>
          )}
        />
        <SecureRoute
          path={EDIT_PROGRAM_PATH}
          component={() => (
            <DashWrapper>
              <ProgramForm />
            </DashWrapper>
          )}
        />
        <SecureRoute
          path={CREATE_PROGRAM_PATH}
          component={() => (
            <DashWrapper>
              <ProgramForm />
            </DashWrapper>
          )}
        />
        <SecureRoute path="/dash-page" component={DashboardView} />
        <SecureRoute path={VIEW_COURSE_PATH} component={CourseView} />
        <SecureRoute
          path={EDIT_COURSE_PATH}
          component={() => (
            <DashWrapper>
              <CourseForm />
            </DashWrapper>
          )}
        />
        <SecureRoute
          path={CREATE_COURSE_PATH}
          component={() => (
            <DashWrapper>
              <CourseForm />
            </DashWrapper>
          )}
        />
        <SecureRoute
          path={SETTINGS_PATH}
          component={() => (
            <DashWrapper>
              <SettingsPage />
            </DashWrapper>
          )}
        />
        <SecureRoute path={VIEW_MODULE_PATH} component={ModuleView} />
        <SecureRoute path={EDIT_MODULE_PATH} component={ModuleForm} />
        <Route path={LOGIN_PATH} component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />

        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path={HOME_PATH}
          exact
          // component={() => <DashboardView LoadingComponent={LoadingComponent} />}
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
