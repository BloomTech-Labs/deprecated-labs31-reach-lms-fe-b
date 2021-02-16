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

// Wrap `Menu.Item` from AntD in a `Link` from react-router-dom
// We can just toss in a "to" attribute to MenuItem
// and it will look like an AntD Menu.Item but act like a Link
const MenuItem = ({ key, to, icon, children, ...props }) => {
  return (
    <Link to={to}>
      <Menu.Item key={key} icon={icon} {...props}>
        {children}
      </Menu.Item>
    </Link>
  );
};

// Reusable NavBar component that will be used throughout many pages in our app
const NavBar = ({ fireLogout, ...restProps }) => {
  return (
    <Layout.Sider breakpoint="sm" collapsedWidth="0">
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Dashboard
        </Menu.Item>
        <MenuItem key="2" to={CREATE_PROGRAM_PATH} icon={<FormOutlined />}>
          Create a Program
        </MenuItem>
        <MenuItem key="3" icon={<EditOutlined />} to={EDIT_PROGRAM_PATH}>
          Modify Program
        </MenuItem>
        <MenuItem key="4" icon={<SettingFilled />} to={SETTINGS_PATH}>
          Settings
        </MenuItem>
        <MenuItem
          key="5"
          icon={<LogoutOutlined />}
          onClick={() => fireLogout()}
        >
          Logout
        </MenuItem>
      </Menu>
    </Layout.Sider>
  );
};

export default NavBar;
