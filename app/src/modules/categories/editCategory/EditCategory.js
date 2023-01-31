import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../form';

import { fetchCategory, updateCategory } from './editCategory.ducks';

class EditCategory extends Component {
  state = {
    id: null,
    category: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchCategory(id).then(({ value: category }) => {
      this.form.setPristine();
      this.setState({ id, category });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      category: merge({}, state.category, values)
    }));
  };

  handleSubmit = values => {
    const { id, category } = this.state;
    this.props
      .updateCategory(id, category)
      .then(() => {
        message.success('Catégorie modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          category: Object.assign({}, category)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      categories: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ category: byId[id] });
  };

  render() {
    const { category } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification d'une catégorie</h1>
        <Spin spinning={!category && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={category}
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

EditCategory.propTypes = {
  categories: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchCategory: PropTypes.func,
  updateCategory: PropTypes.func
};

const mapStateToProps = ({ categories }) => {
  return {
    categories,
    loading: categories.edit.loading
  };
};

const mapDispatchToProps = { fetchCategory, updateCategory };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditCategory);
