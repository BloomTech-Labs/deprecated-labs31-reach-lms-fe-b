import React, { useEffect } from 'react';
import { DashWrapper } from '../dash-wrapper';
import { DashboardView } from '../dashboard-view';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../state/ducks/userDuck';

/* cSpell:disable */
function RenderHomePage(props) {
  const { authService } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.loginThunk());
  }, [dispatch]);

  return (
    <DashWrapper authService={authService}>
      {/*Main Content Area*/}
      <DashboardView />
    </DashWrapper>
  );
}
export default RenderHomePage;
