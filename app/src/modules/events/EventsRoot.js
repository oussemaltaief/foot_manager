import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Events from './events';
import AddEvent from './addEvent';
import EditEvent from './editEvent';

class EventsRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Events} />
        <Route exact path={`${match.url}/new`} component={AddEvent} />
        <Route exact path={`${match.url}/:id`} component={EditEvent} />
      </Switch>
    );
  }
}

export default EventsRoot;
