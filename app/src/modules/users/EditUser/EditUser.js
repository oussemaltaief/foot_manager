import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';

import Form from '../Form';

import { fetchUser, updateUser } from './edit-user.ducks';

class EditUser extends Component {
  state = { id: null, user: null };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchUser(id).then(({ value: user }) => {
      this.form.setPristine();
      this.setState({ id, user });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ user: values });
  };

  handleSubmit = values => {
    const { id, user } = this.state;

    this.props
      .updateUser(id, user)
      .then(() => {
        message.success('Utilisateur modifié avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({ user: Object.assign({}, user, { password: '' }) });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      users: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ user: byId[id] });
  };

  render() {
    const { user } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification d'un utilisateur</h1>
        <Spin spinning={!user && loading}>
          <Form
            wrappedComponentRef={form => (this.form = form)}
            mode="edit"
            value={user}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            loading={loading}
          />
        </Spin>
      </div>
    );
  }
}

EditUser.propTypes = {
  users: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchUser: PropTypes.func,
  updateUser: PropTypes.func
};

const mapStateToProps = ({ users }) => ({
  users,
  loading: users.edit.loading
});

const mapDispatchToProps = { fetchUser, updateUser };

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withStore(EditUser);
