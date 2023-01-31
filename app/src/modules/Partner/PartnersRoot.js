import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Partners from './Partners';
import AddPartner from './AddPartner';
import EditPartner from './EditPartner';

class PartnersRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Partners} />
        <Route exact path={`${match.url}/new`} component={AddPartner} />
        <Route exact path={`${match.url}/:id`} component={EditPartner} />
      </Switch>
    );
  }
}

export default PartnersRoot;
