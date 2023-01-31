import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../Form';

import { addUser } from './add-user.ducks';

class AddUser extends Component {
  state = {
    user: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ user: values });
  };

  handleSubmit = values => {
    this.props
      .addUser(values)
      .then(({ value }) => {
        message.success('Utilisateur créé avec succès');
        this.props.history.push(`/users/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/users');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Création d'un utilisateur</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.user}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddUser.propTypes = {
  history: PropTypes.object,
  addUser: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({
  users: {
    add: { loading }
  }
}) => ({
  loading
});

const mapDispatchToProps = { addUser };

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withStore(AddUser);
