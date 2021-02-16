import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LogoutOutlined,
  SettingFilled,
  FormOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  CREATE_PROGRAM_PATH,
  EDIT_PROGRAM_PATH,
  SETTINGS_PATH,
} from '../../../routes';
import { Link } from 'react-router-dom';

// this will make for easier routing later on. We can just toss in a "path" as a prop to MenuItem
// and voilá, it'll be wrapped in a link.
const MenuItem = ({ key, to, icon, children, ...props }) => {
  if (to) {
    return (
      <Link to={to}>
        <Menu.Item key={key} icon={icon} {...props}>
          {children}
        </Menu.Item>
      </Link>
    );
  }
  return (
    <Menu.Item key={key} icon={icon} {...props}>
      {children}
    </Menu.Item>
  );
};

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const { Header, Content, Footer, Sider } = Layout;

  const handleClick = e => {
    //Checks on the Menu event.key and directs user to appropriate page
    switch (e.key) {
      case '1':
        alert('Dashboard Clicked');
        break;
      case '2':
        alert('Create Program Clicked');
        break;
      case '3':
        alert('Modify Program Clicked');
        break;
      case '4':
        alert('Settings Clicked');
        break;
      case '5':
        authService.logout();
        break;
      default:
        break;
    }
  };

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
        {/*Sidebar Navigation Container*/}
        <Sider
          breakpoint="sm"
          collapsedWidth="0"
          // onBreakpoint={broken => { }}
          // onCollapse={(collapsed, type) => { }}
        >
          {/*Menu Items*/}
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={handleClick}
          >
            <MenuItem key="1" icon={<HomeOutlined />}>
              Dashboard
            </MenuItem>
            <MenuItem key="2" icon={<FormOutlined />} to={CREATE_PROGRAM_PATH}>
              Create A Program
            </MenuItem>
            <MenuItem key="3" icon={<EditOutlined />} to={EDIT_PROGRAM_PATH}>
              Modify Program
            </MenuItem>
            <MenuItem key="4" icon={<SettingFilled />} to={SETTINGS_PATH}>
              Settings
            </MenuItem>
            <MenuItem key="5" icon={<LogoutOutlined />}>
              Logout
            </MenuItem>
          </Menu>
        </Sider>

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
