import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAllCategories } from '../categories/categories.ducks';

import Players from './players';
import AddPlayer from './AddPlayer';
import EditPlayer from './EditPlayer';

class PlayersRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchAllCategories();
  }

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Players} />
        <Route exact path={`${match.url}/new`} component={AddPlayer} />
        <Route exact path={`${match.url}/:id`} component={EditPlayer} />
      </Switch>
    );
  }
}

export default connect(null, { fetchAllCategories })(PlayersRoot);
