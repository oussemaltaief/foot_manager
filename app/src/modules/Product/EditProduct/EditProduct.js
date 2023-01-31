import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../Form';

import { fetchProduct, updateProduct } from './edit-product.ducks';

class EditPlayer extends Component {
  state = {
    id: null,
    product: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchProduct(id).then(({ value: product }) => {
      this.form.setPristine();
      this.setState({ id, product });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      product: merge({}, state.product, values)
    }));
  };

  handleSubmit = values => {
    const { id, product } = this.state;

    this.props
      .updateProduct(id, product)
      .then(() => {
        message.success('Produit modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          product: Object.assign({}, product)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      products: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ product: byId[id] });
  };

  render() {
    const { product } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification produit</h1>
        <Spin spinning={!product && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={product}
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

EditPlayer.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchProduct: PropTypes.func,
  updateProduct: PropTypes.func
};

const mapStateToProps = ({ products }) => {
  return {
    products,
    loading: products.edit.loading
  };
};

const mapDispatchToProps = { fetchProduct, updateProduct };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditPlayer);
