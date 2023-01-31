import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Products from './Product';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

class ProducstRoot extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.url}/`} component={Products} />
        <Route exact path={`${match.url}/new`} component={AddProduct} />
        <Route exact path={`${match.url}/:id`} component={EditProduct} />
      </Switch>
    );
  }
}

export default ProducstRoot;
