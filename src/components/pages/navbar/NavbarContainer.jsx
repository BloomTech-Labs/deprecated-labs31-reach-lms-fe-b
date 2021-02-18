import React, { useState, useEffect } from 'react';
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
  CREATE_COURSE_PATH,
} from '../../../routes';
import { Link, useLocation } from 'react-router-dom';
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
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState(pathname);

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
      >
        <MenuItem key="/" to="/" icon={<HomeOutlined />}>
          Dashboard
        </MenuItem>
        <MenuItem
          key={CREATE_PROGRAM_PATH}
          to={CREATE_PROGRAM_PATH}
          icon={<FormOutlined />}
        >
          Create a Program
        </MenuItem>
        <MenuItem
          key={EDIT_PROGRAM_PATH}
          to={EDIT_PROGRAM_PATH}
          icon={<EditOutlined />}
        >
          Modify Program
        </MenuItem>
        <MenuItem
          key={CREATE_COURSE_PATH}
          to={CREATE_COURSE_PATH}
          icon={<FormOutlined />}
        >
          Create Course
        </MenuItem>
        <MenuItem
          key={SETTINGS_PATH}
          to={SETTINGS_PATH}
          icon={<SettingOutlined />}
        >
          Settings
        </MenuItem>
        <MenuItem key="__LOGOUT__" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </MenuItem>
      </Menu>
    </Layout.Sider>
  );
};

export default NavBar;
