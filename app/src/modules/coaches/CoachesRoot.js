import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Coaches from './coaches';
import AddCoach from './AddCoach';
import EditCoach from './EditCoach';

class CoachesRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Coaches} />
        <Route exact path={`${match.url}/new`} component={AddCoach} />
        <Route exact path={`${match.url}/:id`} component={EditCoach} />
      </Switch>
    );
  }
}

export default CoachesRoot;
