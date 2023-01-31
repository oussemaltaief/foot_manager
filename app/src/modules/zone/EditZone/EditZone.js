import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../Form';

import { fetchZone, updateZone } from './edit-Zone.ducks';

class Editzone extends Component {
  state = {
    id: null,
    zone: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchZone(id).then(({ value: zone }) => {
      this.form.setPristine();
      this.setState({ id, zone });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      zone: merge({}, state.zone, values)
    }));
  };

  handleSubmit = values => {
    const { id, zone } = this.state;

    this.props
      .updateZone(id, zone)
      .then(() => {
        message.success('Zones modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          zone: Object.assign({}, zone)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      zones: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ zone: byId[id] });
  };

  render() {
    const { zone } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification zones & privilèges</h1>
        <Spin spinning={!zone && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={zone}
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

Editzone.propTypes = {
  zones: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchZone: PropTypes.func,
  updateZone: PropTypes.func
};

const mapStateToProps = ({ zones }) => {
  return {
    zones,
    loading: zones.edit.loading
  };
};

const mapDispatchToProps = { fetchZone, updateZone };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Editzone);
