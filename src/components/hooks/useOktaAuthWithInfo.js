import { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';

export const useOktaAuthWithInfo = () => {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState({});
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);

  useEffect(() => {
    let isSubscribed = true;

    memoAuthService
      .getUser()
      .then(info => {
        // if user is authenticated we can use the authService to snag some user info.
        // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
        if (isSubscribed) {
          console.log({ info });
          setUserInfo(info);
        }
      })
      .catch(err => {
        isSubscribed = false;
        return setUserInfo(null);
      });
    return () => (isSubscribed = false);
  }, [memoAuthService]);

  return { authState, authService, userInfo };
};

// we could export out useOktaAuth to not import from modules
// export default useOktaAuth;
