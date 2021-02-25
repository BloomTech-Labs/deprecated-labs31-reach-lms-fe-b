import React, { useState } from 'react';
import { Layout } from 'antd';
import { NavBar } from '../navbar';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import styled from 'styled-components';
import logo from '../login/Reach.png';

// Incase we want to add and style the header in the future
// const StyledHeader = styled(Layout.Header)`
//   display: flex;
//   flex-flow: row nowrap;
//   background-color: white;
// `
const LocationInfo = styled.div`
  text-align: center;
  background-color: white;
`;

export default ({ children, ...restProps }) => {
  const { Content, Footer } = Layout;
  const { authService } = useOktaAuth();
  const { pathname } = useLocation();
  const { role } = useSelector(state => state.user);
  const { push } = useHistory();
  const [hovering, setHovering] = useState(false);

  const toggleHovering = () => {
    setHovering(!hovering);
  };

  return (
    <Layout>
      <Layout>
        <NavBar logout={authService?.logout} />
        <Content>
          {/* renders role and path on the main content rendering area*/}
          <LocationInfo>
            {
              {
                '/': <h1>{role}: Dashboard</h1>,
                '/program/create': <h1>{role}: Create Program</h1>,
                '/course/create': <h1>{role}: Create Course</h1>,
                '/settings': <h1>{role}: Settings</h1>,
              }[pathname]
            }
          </LocationInfo>

          {/*main content rendering area*/}
          {children}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Reach LMS ©2021</Footer>
    </Layout>
  );
};
