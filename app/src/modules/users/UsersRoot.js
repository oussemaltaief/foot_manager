import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAllRoles } from '../roles/roles.ducks';

import Users from './Users';
import AddUser from './AddUser';
import EditUser from './EditUser';

class UsersRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    fetchAllRoles: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchAllRoles();
  }

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Users} />
        <Route exact path={`${match.url}/new`} component={AddUser} />
        <Route exact path={`${match.url}/:id`} component={EditUser} />
      </Switch>
    );
  }
}

const mapDispatchToProps = {
  fetchAllRoles
};

const withStore = connect(null, mapDispatchToProps);

export default withStore(UsersRoot);
