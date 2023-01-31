import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../form';

import { addCategory } from './addCategory.ducks';

class AddCategory extends Component {
  state = {
    category: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ category: values });
  };

  handleSubmit = values => {
    this.props
      .addCategory(this.state.category)
      .then(({ value }) => {
        message.success('Catégorie créée avec succès');
        this.props.history.push(`/categories/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/categories');
  };

  render() {
    return (
      <div>
        <h1>Catégories</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.category}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

AddCategory.prototypes = {
  addCategory: Proptypes.func
};

export default connect(null, { addCategory })(AddCategory);
