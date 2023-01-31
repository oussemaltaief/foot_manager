import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../Form';

import { fetchRole, updateRole } from './edit-roles.ducks';

class EditRole extends Component {
  state = {
    id: null,
    role: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchRole(id).then(({ value: role }) => {
      this.form.setPristine();
      this.setState({ id, role });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      role: merge({}, state.role, values)
    }));
  };

  handleSubmit = values => {
    const { id, role } = this.state;

    this.props
      .updateRole(id, role)
      .then(() => {
        message.success('Roles modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          role: Object.assign({}, role)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      role: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ role: byId[id] });
  };

  render() {
    const { role } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification roles & privilèges</h1>
        <Spin spinning={!role && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={role}
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

EditRole.propTypes = {
  role: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchRole: PropTypes.func,
  updateRole: PropTypes.func
};

const mapStateToProps = ({ roles }) => {
  return {
    roles,
    loading: roles.edit.loading
  };
};

const mapDispatchToProps = { fetchRole, updateRole };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditRole);
