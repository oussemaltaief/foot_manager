import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../form';

import { addTeam } from './addTeam.ducks';

class AddTeam extends Component {
  state = {
    team: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ team: values });
  };

  handleSubmit = values => {
    this.props
      .addTeam(this.state.team)
      .then(({ value }) => {
        message.success('Equipe créée avec succès');
        this.props.history.push(`/teams/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/teams');
  };

  render() {
    return (
      <div>
        <h1>Gestion des équipes</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.team}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

AddTeam.prototypes = {
  addTeam: Proptypes.func
};

export default connect(null, { addTeam })(AddTeam);
