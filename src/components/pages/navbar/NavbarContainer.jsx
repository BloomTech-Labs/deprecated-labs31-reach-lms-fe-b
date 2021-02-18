import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LogoutOutlined,
  SettingOutlined,
  FormOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  CREATE_PROGRAM_PATH,
  EDIT_PROGRAM_PATH,
  SETTINGS_PATH,
  // CREATE_COURSE_PATH,
  CREATE_COURSE_PAGE_PATH,
} from '../../../routes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// Wrap `Menu.Item` from AntD in a `Link` from react-router-dom
// We can just toss in a "to" attribute to MenuItem
// and it will look like an AntD Menu.Item but act like a Link
const MenuItem = ({ key, to, icon, handleClick, children, ...props }) => {
  if (!to) {
    return (
      <Menu.Item key={key} icon={icon} onClick={handleClick} {...props}>
        {children}
      </Menu.Item>
    );
  }
  return (
    <StyledLink to={to}>
      <Menu.Item key={key} icon={icon} onClick={handleClick} {...props}>
        {children}
      </Menu.Item>
    </StyledLink>
  );
};

// Reusable NavBar component that will be used throughout many pages in our app
const NavBar = ({ logout, ...restProps }) => {
  const [selectedKey, setSelectedKey] = useState('1');
  const handleClick = e => {
    setSelectedKey(e.key);
  };

  return (
    <Layout.Sider breakpoint="sm" collapsedWidth="0">
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedKey]}
        handleClick={handleClick}
        // defaultSelectedKeys={'1'}
      >
        <MenuItem key="1" icon={<HomeOutlined />} to="/">
          Dashboard
        </MenuItem>
        <MenuItem key="2" to={CREATE_PROGRAM_PATH} icon={<FormOutlined />}>
          Create a Program
        </MenuItem>
        <MenuItem key="3" icon={<EditOutlined />} to={EDIT_PROGRAM_PATH}>
          Modify Program
        </MenuItem>
        <MenuItem icon={<FormOutlined />} to={CREATE_COURSE_PAGE_PATH}>
          Create Course
        </MenuItem>
        <MenuItem key="4" icon={<SettingOutlined />} to={SETTINGS_PATH}>
          Settings
        </MenuItem>
        <MenuItem key="5" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </MenuItem>
      </Menu>
    </Layout.Sider>
  );
};

export default NavBar;
