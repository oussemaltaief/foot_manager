import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Layout, Avatar, Menu, Icon, Dropdown } from 'antd';

import { logout } from '../auth/auth.ducks';
import logo from '../../images/csha.png';

class Header extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.logout();
    }
  };

  render() {
    const {
      isAuthenticated,
      user,
      location: { pathname }
    } = this.props;

    const loginPage = pathname === '/login';

    const style = {
      header: {
        color: '#fff',
        boxSizing: 'content-box'
      }
    };

    if (loginPage) {
      style.header.height = 200;
    } else {
      style.header.borderBottom = '8px solid #177529';
    }

    const menu = (
      <Menu>
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="logout">
            <Icon type="logout" /> Déconnexion
          </Menu.Item>
        </Menu>
      </Menu>
    );

    return (
      <Layout.Header style={style.header}>
        <Row
          type="flex"
          justify="space-between"
          align={loginPage ? 'top' : 'middle'}
          gutter={8}
          style={{ flexWrap: 'nowrap', height: '100%' }}
        >
          <Col style={{ flex: '1 0 auto' }}>
            <Row type="flex" gutter={16} align="middle">
              {!loginPage && (
                <Col>
                  <img src={logo} height="64" alt="ETAC" />
                </Col>
              )}
              <Col
                className="header-title"
                style={{ lineHeight: 1, marginTop: loginPage ? '1rem' : 0 }}
              >
                <div
                  style={{ fontSize: '32px', fontWeight: 200, marginBottom: 8 }}
                >
                  Club Sportif Hajeb Layoun
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#177529',
                    fontStyle: 'italic',
                    fontWeight: 'bolder'
                  }}
                >
                  Back office d'administration
                </div>
              </Col>
            </Row>
          </Col>
          {isAuthenticated && (
            <Col>
              <span style={{ fontSize: '.8rem' }}>
                {user.firstName} {user.lastName}{' '}
              </span>
              <Dropdown overlay={menu}>
                <Avatar
                  style={{ cursor: 'pointer' }}
                  size="large"
                  src={user.photo}
                  icon="user"
                />
              </Dropdown>
            </Col>
          )}
        </Row>
      </Layout.Header>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: !!auth.user,
  user: auth.user
});

const mapDispatchToProps = { logout };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Header);
