import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import 'antd/dist/antd.less';

import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import {
  // CourseForm,
  // CourseView,
  // LandingPage,
  // ModuleForm,
  // ModuleView,
  // ProgramForm,
  // ProgramView,
  DashboardPage,
  HomePage,
  LoginPage,
  NotFoundPage,
} from './components/pages';
import {
  HOME_PATH,
  LOGIN_PATH,
  DASHBOARD_PATH,
  // SETTINGS_PATH,
  // VIEW_PROGRAM_PATH,
  // EDIT_PROGRAM_PATH,
  // CREATE_PROGRAM_PATH,
  // VIEW_COURSE_PATH,
  // EDIT_COURSE_PATH,
  // CREATE_COURSE_PATH,
  // VIEW_MODULE_PATH,
  // EDIT_MODULE_PATH,
} from './routes/';
import AuthedLoadingWrapper from './components/common/AuthedLoadingWrapper';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
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
        <Route path={LOGIN_PATH} component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <SecureRoute
          path={HOME_PATH}
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute
          path={DASHBOARD_PATH}
          component={() => <DashboardPage />}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
