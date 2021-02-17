import React from 'react';
import { Layout } from 'antd';
import { NavBar } from '../navbar';

export default ({ children, authService, ...restProps }) => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0 }}
      >
        <div>
          <h1>Reach LMS</h1>
        </div>
      </Header>
      <Layout>
        <NavBar logout={authService?.logout} />
        <Content>{children}</Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Reach LMS ©2021</Footer>
    </Layout>
  );
};
