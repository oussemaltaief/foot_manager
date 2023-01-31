import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAllGames } from '../games/games/games-list.ducks';

import Items from './items';
import AddItem from './addItem';
import EditItem from './editItem';

class ItemsRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchAllGames({ limit: -1 });
  }

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Items} />
        <Route exact path={`${match.url}/new`} component={AddItem} />
        <Route exact path={`${match.url}/:id`} component={EditItem} />
      </Switch>
    );
  }
}

const mapDispatchToProps = {
  fetchAllGames
};

export default connect(
  null,
  mapDispatchToProps
)(ItemsRoot);
