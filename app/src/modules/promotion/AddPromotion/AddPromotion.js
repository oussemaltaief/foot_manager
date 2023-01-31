import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../Form';

import { addRole } from './add-roles.ducks';

class AddRole extends Component {
  state = {
    role: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ role: values });
  };

  handleSubmit = values => {
    this.props
      .addRole(this.state.role)
      .then(({ value }) => {
        message.success('Role créée avec succès');
        this.props.history.push(`/roles/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/roles');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Création roles & privilèges</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.role}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddRole.propTypes = {
  history: PropTypes.object,
  addRole: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({
  roles: {
    add: { loading }
  }
}) => ({
  loading
});

const mapDispatchToProps = { addRole };

const withStore = connect(mapStateToProps, mapDispatchToProps);
export default withStore(AddRole);
