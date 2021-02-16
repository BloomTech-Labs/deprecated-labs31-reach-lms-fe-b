import React from 'react';
import { Layout } from 'antd';
import { NavBar } from '../navbar';

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const { Header, Content, Footer } = Layout;

  return (
    <Layout>
      {/*Header Area*/}
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0 }}
      >
        <div>
          <h1>(LOGO) Reach LMS</h1>
        </div>
      </Header>

      <Layout>
        <NavBar fireLogout={authService.logout} />

        {/*Main Content Area*/}
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <h2>Welcome {userInfo.name}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
              at consectetur lorem donec. Venenatis tellus in metus vulputate eu
              scelerisque felis imperdiet. Sapien faucibus et molestie ac
              feugiat sed. Eget aliquet nibh praesent tristique magna sit amet
              purus. Integer quis auctor elit sed vulputate mi sit amet.
              Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa.
              Blandit cursus risus at ultrices mi tempus imperdiet nulla.
              Pulvinar neque laoreet suspendisse interdum consectetur. Facilisis
              sed odio morbi quis commodo odio aenean sed. Tincidunt nunc
              pulvinar sapien et ligula ullamcorper malesuada. In dictum non
              consectetur a erat. Amet volutpat consequat mauris nunc congue
              nisi vitae. Maecenas ultricies mi eget mauris pharetra et ultrices
              neque.Dictum non consectetur a erat. Et egestas quis ipsum
              suspendisse ultrices gravida dictum. Aenean euismod elementum nisi
              quis eleifend.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
              at consectetur lorem donec. Venenatis tellus in metus vulputate eu
              scelerisque felis imperdiet. Sapien faucibus et molestie ac
              feugiat sed. Eget aliquet nibh praesent tristique magna sit amet
              purus. Integer quis auctor elit sed vulputate mi sit amet.
              Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa.
              Blandit cursus risus at ultrices mi tempus imperdiet nulla.
              Pulvinar neque laoreet suspendisse interdum consectetur. Facilisis
              sed odio morbi quis commodo odio aenean sed. Tincidunt nunc
              pulvinar sapien et ligula ullamcorper malesuada. In dictum non
              consectetur a erat. Amet volutpat consequat mauris nunc congue
              nisi vitae. Maecenas ultricies mi eget mauris pharetra et ultrices
              neque.Dictum non consectetur a erat. Et egestas quis ipsum
              suspendisse ultrices gravida dictum. Aenean euismod elementum nisi
              quis eleifend.
            </p>
          </div>
        </Content>
      </Layout>

      {/*Footer*/}
      <Footer style={{ textAlign: 'center' }}>Reach LMS ©2021</Footer>
    </Layout>
  );
}
export default RenderHomePage;
