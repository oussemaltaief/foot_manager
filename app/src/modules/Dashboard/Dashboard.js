import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom';

import { hasAccess, getDefaultPage } from '../../utils/helpers';
import { logout } from '../auth/auth.ducks';
import Users from '../users';
import Games from '../games';
import Items from '../items';
import Players from '../players';
import Products from '../Product';
import Partners from '../Partner';
import Coaches from '../coaches';
import Lands from '../lands';
import Categories from '../categories';
import Teams from '../teams';
import Events from '../events';

import SideMenu from './SideMenu';
import Breadcrumbs from './Breadcrumbs';

const styles = {
  content: {
    background: '#fff',
    padding: '1.5rem',
    margin: 0
  },
  layout: { padding: '0 1.5rem 1.5rem' }
};

class Dashboard extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { location, user } = this.props;

    if (getDefaultPage(user))
      return (
        <Layout>
          <SideMenu path={location.pathname} />
          <Layout style={styles.layout}>
            <Breadcrumbs path={location.pathname} />
            <Layout.Content style={styles.content}>
              <Switch>
                {hasAccess(user, 'users') && (
                  <Route path="/users" component={Users} />
                )}
                <Route path="/jeux" component={Games} />
                <Route path="/items" component={Items} />
                <Route path="/players" component={Players} />
                <Route path="/products" component={Products} />
                <Route path="/partners" component={Partners} />
                <Route path="/coaches" component={Coaches} />
                <Route path="/lands" component={Lands} />
                <Route path="/categories" component={Categories} />
                <Route path="/teams" component={Teams} />
                <Route path="/events" component={Events} />
                <Redirect to={getDefaultPage(user).to} />
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      );
    else {
      this.props.logout();

      return null;
    }
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

const mapDispatchToProps = { logout };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Dashboard);
