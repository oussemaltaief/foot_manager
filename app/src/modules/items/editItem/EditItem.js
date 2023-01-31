import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../form';

import { fetchItem, updateItem } from './editItem.ducks';

class EditItem extends Component {
  state = {
    id: null,
    item: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchItem(id).then(({ value: item }) => {
      this.form.setPristine();
      this.setState({ id, item });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      item: merge({}, state.item, values)
    }));
  };

  handleSubmit = values => {
    const { id, item } = this.state;

    this.props
      .updateItem(id, item)
      .then(() => {
        message.success('Item modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          item: Object.assign({}, item)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      items: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ item: byId[id] });
  };

  render() {
    const { item } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification item</h1>
        <Spin spinning={!item && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={item}
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

EditItem.propTypes = {
  items: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchItem: PropTypes.func,
  updateItem: PropTypes.func
};

const mapStateToProps = ({ items }) => {
  return {
    items,
    loading: items.edit.loading
  };
};

const mapDispatchToProps = { fetchItem, updateItem };

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withStore(EditItem);
