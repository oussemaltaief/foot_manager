import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Games from './games';
import AddGame from './addGame';
import EditGame from './editGame';

class GamesRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Games} />
        <Route exact path={`${match.url}/new`} component={AddGame} />
        <Route exact path={`${match.url}/:id`} component={EditGame} />
      </Switch>
    );
  }
}

export default GamesRoot;
