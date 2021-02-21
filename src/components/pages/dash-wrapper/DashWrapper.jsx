import React from 'react';
import { Layout } from 'antd';
import { NavBar } from '../navbar';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import logo from '../login/RlmsLogo.png';

const StyledHeader = styled(Layout.Header)`
  display: flex;
  flex-flow: row nowrap;
  background-color: white;
`;

export default ({ children, authService, ...restProps }) => {
  const { Content, Footer } = Layout;
  const { pathname } = useLocation();
  const { role } = useSelector(state => state.user);

  return (
    <Layout>
      <StyledHeader
        className="site-layout-sub-header-background"
        style={{ padding: 0 }}
      >
        <img src={logo} alt="logo" />
        <div>
          {
            {
              '/': <h1>{role}: Dashboard</h1>,
              '/program/create': <h1>{role}: Create Program</h1>,
              '/course/create': <h1>{role}: Create Course</h1>,
              '/settings': <h1>{role}: Settings</h1>,
            }[pathname]
          }
        </div>
      </StyledHeader>

      <Layout>
        <NavBar logout={authService?.logout} />
        <Content>{children}</Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Reach LMS ©2021</Footer>
    </Layout>
  );
};
