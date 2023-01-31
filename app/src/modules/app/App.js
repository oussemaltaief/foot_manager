import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Spin } from 'antd';

import { PrivateRoute } from '../../components';
import Dashboard from '../Dashboard';
import Header from '../Header';
import Login from '../auth/Login';

const MainApp = () => (
  <Router>
    <Switch>
      <Route>
        <Layout className="root-layout">
          <Route component={Header} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Dashboard} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  </Router>
);

const Spinner = () => (
  <div className="app-spinner">
    <Spin size="large" />
  </div>
);

const App = ({ initialized }) => (initialized ? <MainApp /> : <Spinner />);

App.propTypes = {
  initialized: PropTypes.bool.isRequired
};

const mapStateToProps = ({ app }) => ({ initialized: app.initialized });

const withStore = connect(mapStateToProps);

export default withStore(App);
