import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { fetchAllPlayers } from '../players/players.ducks';
import { fetchAllCoaches } from '../coaches/coaches.ducks';
import { fetchAllCategories } from '../categories/categories.ducks';

import Teams from './teams';
import AddTeam from './addTeam';
import EditTeam from './editTeam';

class TeamsRoot extends React.Component {
  componentDidMount() {
    this.props.fetchAllCategories();
    this.props.fetchAllCoaches();
    this.props.fetchAllPlayers();
  }

  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}/`} component={Teams} />
        <Route exact path={`${this.props.match.url}/new`} component={AddTeam} />
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          component={EditTeam}
        />
      </Switch>
    );
  }
}

TeamsRoot.propTypes = {
  match: PropTypes.object.isRequired,
  fetchAllCategories: PropTypes.func,
  fetchAllCoaches: PropTypes.func,
  fetchAllPlayers: PropTypes.func
};

const mapDispatchToProps = {
  fetchAllPlayers,
  fetchAllCoaches,
  fetchAllCategories
};

export default connect(null, mapDispatchToProps)(TeamsRoot);
