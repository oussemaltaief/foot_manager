import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import merge from 'lodash.merge';
import { message } from 'antd';

import Form from '../Form';

import { addPartner } from './add-partner.ducks';

class AddPartner extends Component {
  state = {
    partner: null
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      partner: merge({}, state.partner, values)
    }));
  };

  handleSubmit = values => {
    this.props
      .addPartner(this.state.partner)
      .then(({ value }) => {
        message.success('partenaire créé avec succès');
        this.props.history.push(`/partners/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/partners');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Creation d'un partenaire</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.partner}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddPartner.propTypes = {
  events: PropTypes.object,
  partners: PropTypes.object,
  loading: PropTypes.bool,
  history: PropTypes.object,
  addPartner: PropTypes.func
};

const mapStateToProps = ({ partners }) => ({
  partners,
  loading: partners.add.loading
});

const mapDispatchToProps = { addPartner };

const withStore = connect(mapStateToProps, mapDispatchToProps);
export default withStore(AddPartner);
