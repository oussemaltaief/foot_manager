import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../Form';

import { addZone } from './add-Zone.ducks';

class AddZone extends Component {
  state = {
    zone: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ zone: values });
  };

  handleSubmit = values => {
    this.props
      .addZone(this.state.zone)
      .then(({ value }) => {
        message.success('Zone créée avec succès');
        this.props.history.push(`/zones/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/zones');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>création zone</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.zone}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddZone.propTypes = {
  history: PropTypes.object,
  addZone: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({
  zones: {
    add: { loading }
  }
}) => ({
  loading
});

const mapDispatchToProps = { addZone };

const withStore = connect(mapStateToProps, mapDispatchToProps);
export default withStore(AddZone);
