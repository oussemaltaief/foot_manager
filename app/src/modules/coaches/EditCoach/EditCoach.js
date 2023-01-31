import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../Form';

import { fetchCoach, updateCoach } from './Edit-coach.ducks';

class EditCoach extends Component {
  state = {
    id: null,
    coach: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchCoach(id).then(({ value: coach }) => {
      this.form.setPristine();
      this.setState({ id, coach });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      coach: merge({}, state.coach, values)
    }));
  };

  handleSubmit = values => {
    const { id, coach } = this.state;

    this.props
      .updateCoach(id, coach)
      .then(() => {
        message.success('entraineur modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          coach: Object.assign({}, coach)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      coaches: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ coach: byId[id] });
  };

  render() {
    const { coach } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification d'une entraineur</h1>
        <Spin spinning={!coach && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={coach}
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

EditCoach.propTypes = {
  coaches: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchCoach: PropTypes.func,
  updateCoach: PropTypes.func
};

const mapStateToProps = ({ coaches }) => {
  return {
    coaches,
    loading: coaches.edit.loading
  };
};

const mapDispatchToProps = { fetchCoach, updateCoach };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditCoach);
