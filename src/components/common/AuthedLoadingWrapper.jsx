import React from 'react';
import { useOktaAuthWithInfo } from '../hooks';

import LoadingComponent from './LoadingComponent';

export default ({ RenderComponent }) => {
  const { authState, authService, userInfo } = useOktaAuthWithInfo();
  return (
    <>
      {authState.isAuthenticated && !userInfo && (
        <LoadingComponent message="Fetching user profile..." />
      )}
      {authState.isAuthenticated && userInfo && (
        <RenderComponent userInfo={userInfo} authService={authService} />
      )}
    </>
  );
};
