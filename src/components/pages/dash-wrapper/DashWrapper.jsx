import React from 'react';
import { Layout } from 'antd';
import { NavBar } from '../navbar';
import styled from 'styled-components';
import logo from '../login/RlmsLogo.png';

const StyledHeader = styled(Layout.Header)`
  display: flex;
  flex-flow: row nowrap;
  background-color: white;
`;

export default ({ children, authService, ...restProps }) => {
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <StyledHeader
        className="site-layout-sub-header-background"
        style={{ padding: 0 }}
      >
        <img src={logo} alt="logo" />
        <div className="logo">
          <h1>Reach LMS</h1>
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
