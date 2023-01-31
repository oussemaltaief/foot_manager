import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../Form';

import { addProduct } from './add-product.ducks';

class AddProduct extends Component {
  state = {
    product: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ product: values });
  };

  handleSubmit = values => {
    this.props
      .addProduct(this.state.product)
      .then(({ value }) => {
        message.success('Produit créée avec succès');
        this.props.history.push(`/products/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/products');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Création produit</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.product}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddProduct.propTypes = {
  history: PropTypes.object,
  addProduct: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({
  products: {
    add: { loading }
  }
}) => ({
  loading
});

const mapDispatchToProps = { addProduct };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(AddProduct);
