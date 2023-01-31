import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Roles from './roles';
import AddRoles from './AddRoles';
import EditRoles from './EditRoles';

const StationsRoot = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={Roles} />
    <Route exact path={`${match.url}/new`} component={AddRoles} />
    <Route exact path={`${match.url}/:id`} component={EditRoles} />
  </Switch>
);

StationsRoot.propTypes = {
  match: PropTypes.object.isRequired
};

export default StationsRoot;
