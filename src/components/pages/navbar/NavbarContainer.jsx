import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  FormOutlined,
} from '@ant-design/icons';
import {
  CREATE_PROGRAM_PATH,
  SETTINGS_PATH,
  CREATE_COURSE_PATH,
} from '../../../routes';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState(pathname);
  const { role } = useSelector(state => state.user);

  const handleClick = e => {
    setSelectedKey(e.key);
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="sider-trigger" onClick={onCollapse}>
        {collapsed ? <UnorderedListOutlined /> : <ArrowLeftOutlined />}
      </div>
      <Layout.Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={onCollapse}
        breakpoint="sm"
        collapsedWidth="0"
      >
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          handleClick={handleClick}
        >
          <MenuItem key="/" to="/" icon={<HomeOutlined />}>
            Dashboard
          </MenuItem>
          {role === 'ADMIN' ? (
            <>
              <MenuItem
                key={CREATE_PROGRAM_PATH}
                to={CREATE_PROGRAM_PATH}
                icon={<FormOutlined />}
              >
                Create a Program
              </MenuItem>
              <MenuItem
                key={CREATE_COURSE_PATH}
                to={CREATE_COURSE_PATH}
                icon={<FormOutlined />}
              >
                Create Course
              </MenuItem>
            </>
          ) : role === 'TEACHER' ? (
            <MenuItem
              key={CREATE_COURSE_PATH}
              to={CREATE_COURSE_PATH}
              icon={<FormOutlined />}
            >
              Create Course
            </MenuItem>
          ) : null}

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
    </>
  );
};

export default NavBar;
