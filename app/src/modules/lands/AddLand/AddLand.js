import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import merge from 'lodash.merge';
import { message } from 'antd';

import Form from '../Form';

import { addLand } from './add-land.ducks';

class AddLand extends Component {
  state = {
    land: null
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      land: merge({}, state.land, values)
    }));
  };

  handleSubmit = values => {
    this.props
      .addLand(this.state.land)
      .then(({ value }) => {
        message.success('Terrain créé avec succès');
        this.props.history.push(`/lands/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/lands');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Creation d'un Terrain</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.land}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddLand.propTypes = {
  lands: PropTypes.object,
  loading: PropTypes.bool,
  history: PropTypes.object,
  addLand: PropTypes.func
};

const mapStateToProps = ({ lands }) => ({
  lands,
  loading: lands.add.loading
});

const mapDispatchToProps = { addLand };

const withStore = connect(mapStateToProps, mapDispatchToProps);
export default withStore(AddLand);
