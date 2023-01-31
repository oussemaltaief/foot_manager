import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../Form';

import { fetchLand, updateLand } from './Edit-land.ducks';

class EditLand extends Component {
  state = {
    id: null,
    land: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchLand(id).then(({ value: land }) => {
      this.form.setPristine();
      this.setState({ id, land });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      land: merge({}, state.land, values)
    }));
  };

  handleSubmit = values => {
    const { id, land } = this.state;

    this.props
      .updateLand(id, land)
      .then(() => {
        message.success('Terrain modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          land: Object.assign({}, land)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      lands: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ land: byId[id] });
  };

  render() {
    const { land } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification d'un Terrain</h1>
        <Spin spinning={!land && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={land}
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

EditLand.propTypes = {
  lands: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchLand: PropTypes.func,
  updateLand: PropTypes.func
};

const mapStateToProps = ({ lands }) => {
  return {
    lands,
    loading: lands.edit.loading
  };
};

const mapDispatchToProps = { fetchLand, updateLand };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditLand);
