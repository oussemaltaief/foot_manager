import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../Form';

import { fetchPartner, updatePartner } from './Edit-partner.ducks';

class EditPartner extends Component {
  state = {
    id: null,
    partner: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchPartner(id).then(({ value: partner }) => {
      this.form.setPristine();
      this.setState({ id, partner });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      partner: merge({}, state.partner, values)
    }));
  };

  handleSubmit = values => {
    const { id, partner } = this.state;

    this.props
      .updatePartner(id, partner)
      .then(() => {
        message.success('partenaire modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          partner: Object.assign({}, partner)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      partners: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ partner: byId[id] });
  };

  render() {
    const { partner } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification d'une partenaire</h1>
        <Spin spinning={!partner && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={partner}
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

EditPartner.propTypes = {
  partners: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchPartner: PropTypes.func,
  updatePartner: PropTypes.func
};

const mapStateToProps = ({ partners }) => {
  return {
    partners,
    loading: partners.edit.loading
  };
};

const mapDispatchToProps = { fetchPartner, updatePartner };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditPartner);
