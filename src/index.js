import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { config } from './utils/oktaConfig';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { Provider } from 'react-redux';
import { store } from './state/index';
import { LoadingComponent } from './components/common';
import {
  CourseFormPage,
  CourseView,
  ModuleView,
  SettingsPage,
  ProgramForm,
  ProgramView,
  HomePage,
  LoginPage,
  NotFoundPage,
  DashboardView,
  ProfileEdit,
  DashWrapper,
  ModuleFormPage,
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
  EDIT_PROFILE_PATH,
} from './routes/';
import 'antd/dist/antd.less';
import GlobalStyle from './styles/globalStyles';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <GlobalStyle />
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
              <ProgramView />
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
        <SecureRoute
          path={VIEW_COURSE_PATH}
          component={() => (
            <DashWrapper>
              <CourseView />
            </DashWrapper>
          )}
        />
        <SecureRoute
          path={EDIT_COURSE_PATH}
          component={() => (
            <DashWrapper>
              <CourseFormPage />
            </DashWrapper>
          )}
        />
        <SecureRoute
          path={CREATE_COURSE_PATH}
          component={() => (
            <DashWrapper>
              <CourseFormPage />
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
        <SecureRoute path={EDIT_MODULE_PATH} component={ModuleFormPage} />
        <SecureRoute
          path={EDIT_PROFILE_PATH}
          component={() => (
            <DashWrapper>
              <ProfileEdit />
            </DashWrapper>
          )}
        />
        <Route path={LOGIN_PATH} component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />

        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          exact
          path={HOME_PATH}
          // component={() => <DashboardView LoadingComponent={LoadingComponent} />}
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
