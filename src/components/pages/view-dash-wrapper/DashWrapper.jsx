import React from 'react';
import { Layout } from 'antd';
import { NavBar } from '../navbar';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import styled from 'styled-components';

const LocationInfo = styled.div`
  margin: 24px;
  text-align: left;
  background-color: white;
`;

export default ({ children, ...restProps }) => {
  const { Content, Footer } = Layout;
  const { authService } = useOktaAuth();
  const { pathname } = useLocation();
  const { role } = useSelector(state => state.user);

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
