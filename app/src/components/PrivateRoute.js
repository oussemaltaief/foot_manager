import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/**
 * Route that redirects to the login page if no user is authenticated.
 */
class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.any,
    render: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object
  };

  render() {
    const {
      component: Component,
      render,
      isAuthenticated,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            Component ? (
              <Component {...props} />
            ) : (
              render(props)
            )
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: !!auth.user
});

export default connect(mapStateToProps)(PrivateRoute);
