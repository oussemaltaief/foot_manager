import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Lands from './lands';
import AddLand from './AddLand';
import EditLand from './EditLand';

class LandsRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Lands} />
        <Route exact path={`${match.url}/new`} component={AddLand} />
        <Route exact path={`${match.url}/:id`} component={EditLand} />
      </Switch>
    );
  }
}

export default LandsRoot;
