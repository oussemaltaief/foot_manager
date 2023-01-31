import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import merge from 'lodash.merge';
import { message } from 'antd';

import Form from '../Form';

import { addCoach } from './add-coach.ducks';

class AddCoach extends Component {
  state = {
    coach: null
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      coach: merge({}, state.coach, values)
    }));
  };

  handleSubmit = values => {
    this.props
      .addCoach(this.state.coach)
      .then(({ value }) => {
        message.success('Entraineur créé avec succès');
        this.props.history.push(`/coaches/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/coaches');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Creation d'un entraineur</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.coach}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddCoach.propTypes = {
  coaches: PropTypes.object,
  loading: PropTypes.bool,
  history: PropTypes.object,
  addCoach: PropTypes.func
};

const mapStateToProps = ({ coaches }) => ({
  coaches,
  loading: coaches.add.loading
});

const mapDispatchToProps = { addCoach };

const withStore = connect(mapStateToProps, mapDispatchToProps);
export default withStore(AddCoach);
