import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Zone from './Zone';
import AddZone from './AddZone';
import EditZone from './EditZone';

const StationsRoot = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}/`} component={Zone} />
    <Route exact path={`${match.url}/new`} component={AddZone} />
    <Route exact path={`${match.url}/:id`} component={EditZone} />
  </Switch>
);

StationsRoot.propTypes = {
  match: PropTypes.object.isRequired
};

export default StationsRoot;
