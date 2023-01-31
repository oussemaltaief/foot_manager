import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { PAGES_BY_KEY } from '../../const';
import { hasAccess } from '../../utils/helpers';

const menuItems = [
  PAGES_BY_KEY['users'],
  PAGES_BY_KEY['teams'],
  PAGES_BY_KEY['players'],
  PAGES_BY_KEY['coaches'],
  PAGES_BY_KEY['games'],
  PAGES_BY_KEY['categories'],
  PAGES_BY_KEY['lands'],
  PAGES_BY_KEY['products'],
  PAGES_BY_KEY['partners'],
  PAGES_BY_KEY['events']

];

function SideMenu({ path, user }) {
  const selectedKey = '/' + path.split('/')[1];

  return (
    <Layout.Sider breakpoint="lg" collapsedWidth="0">
      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['monitoring', 'tariffs']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {renderMenuItems(menuItems, user)}
      </Menu>
    </Layout.Sider>
  );
}

SideMenu.propTypes = {
  path: PropTypes.string.isRequired,
  user: PropTypes.object
};

function showMenuItem(item, user) {
  if (!user) return false;

  if (item.subMenus) {
    return item.subMenus.some(item => showMenuItem(item, user));
  } else {
    return hasAccess(user, item.key);
  }
}

function renderMenuItems(menuItems, user) {
  return menuItems
    .filter(item => showMenuItem(item, user))
    .map((item, index) => {
      if (item.subMenus) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                {item.label}
              </span>
            }
          >
            {renderMenuItems(item.subMenus, user)}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.to}>
            <Link to={item.to} style={{ display: 'flex' }}>
              <Icon type={item.icon} /> {item.label}
            </Link>
          </Menu.Item>
        );
      }
    });
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

const withStore = connect(mapStateToProps);

export default withStore(SideMenu);
