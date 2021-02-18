import React, { useEffect } from 'react';
import { DashWrapper } from '../dash-wrapper';
import { Layout } from 'antd';
import { DashboardView } from '../dashboard-view';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../state/ducks/userDuck';

/* cSpell:disable */
function RenderHomePage(props) {
  const { authService } = props;
  const { Content } = Layout;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.loginThunk());
  }, [dispatch]);

  return (
    <DashWrapper authService={authService}>
      {/*Main Content Area*/}
      <header>
        <h1>Dashboard</h1>
        {/* <pre>{userInfo}</pre> */}
        <pre>Role — Student, Teacher, Admin</pre>
      </header>
      <Content style={{ margin: '24px 16px 0' }}>
        {/* HEADER TO TALK ABOUT WHERE YOU ARE */}
        <DashboardView />
      </Content>
    </DashWrapper>
  );
}
export default RenderHomePage;
