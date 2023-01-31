import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../form';

import { fetchEvent, updateEvent } from './edit-event.ducks';

class EditEvent extends Component {
  state = {
    id: null,
    event: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchEvent(id).then(({ value: event }) => {
      this.form.setPristine();
      this.setState({ id, event });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      event: merge({}, state.event, values)
    }));
  };

  handleSubmit = values => {
    const { id, event } = this.state;

    this.props
      .updateEvent(id, event)
      .then(() => {
        message.success('évènement modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          event: Object.assign({}, event)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      events: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ event: byId[id] });
  };

  render() {
    const { event } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification évènement</h1>
        <Spin spinning={!event && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={event}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              onCancel={this.handleCancel}
              loading={loading}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

EditEvent.propTypes = {
  event: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchEvent: PropTypes.func,
  updateEvent: PropTypes.func
};

const mapStateToProps = ({ events }) => {
  return {
    events,
    loading: events.edit.loading
  };
};

const mapDispatchToProps = { fetchEvent, updateEvent };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditEvent);
