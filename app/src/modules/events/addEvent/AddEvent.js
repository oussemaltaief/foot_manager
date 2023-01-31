import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../form';

import { addEvent } from './add-event.ducks';

class AddEvent extends Component {
  state = {
    event: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ event: values });
  };

  handleSubmit = values => {
    this.props
      .addEvent(this.state.event)
      .then(({ value }) => {
        message.success('évènement créée avec succès');
        this.props.history.push(`/events/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/events');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Création évènement</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.event}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddEvent.propTypes = {
  history: PropTypes.object,
  addEvent: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({
  events: {
    add: { loading }
  }
}) => ({
  loading
});

const mapDispatchToProps = { addEvent };

const withStore = connect(mapStateToProps, mapDispatchToProps);
export default withStore(AddEvent);
