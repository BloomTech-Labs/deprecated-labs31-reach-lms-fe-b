import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { GhostLink } from '../../common/';
import { userActions } from '../../../state/ducks/userDuck';
import { EDIT_PROFILE_PATH } from '../../../routes';

const SettingsProfile = props => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(userActions.loginThunk());
    }
  }, [user, dispatch]);

  return (
    <div className="Profile">
      {user ? (
        <Card
          title="Profile"
          actions={[
            <GhostLink to={EDIT_PROFILE_PATH}>
              <EditOutlined />
            </GhostLink>,
          ]}
        >
          <div>
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>Username: {user.username}</p>
            <p>Phone: {user.phone}</p>
          </div>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SettingsProfile;
