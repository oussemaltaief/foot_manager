import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Categories from './categories';
import AddCategory from './addCategory';
import EditCategory from './editCategory';

class CategoriesRoot extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}/`} component={Categories} />
        <Route
          exact
          path={`${this.props.match.url}/new`}
          component={AddCategory}
        />
        <Route
          exact
          path={`${this.props.match.url}/:id`}
          component={EditCategory}
        />
      </Switch>
    );
  }
}

CategoriesRoot.propTypes = {
  match: PropTypes.object.isRequired
};

export default CategoriesRoot;
