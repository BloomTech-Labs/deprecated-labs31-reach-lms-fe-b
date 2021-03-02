import React, { useEffect } from 'react';
import { DashboardView } from '../view-dashboard';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../state/ducks/userDuck';

/* cSpell:disable */
function RenderHomePage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.loginThunk());
  }, [dispatch]);

  return (
    <>
      {/*Main Content Area*/}
      <DashboardView />
    </>
  );
}
export default RenderHomePage;
