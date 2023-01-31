import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../form';

import { addItem } from './addItem.ducks';

class AddItem extends Component {
  state = {
    item: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ item: values });
  };

  handleSubmit = values => {
    this.props
      .addItem(this.state.item)
      .then(({ value }) => {
        message.success('Item créée avec succès');
        this.props.history.push(`/items/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/items');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Création item</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.item}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddItem.propTypes = {
  history: PropTypes.object,
  addItem: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({
  items: {
    add: { loading }
  }
}) => ({
  loading
});

const mapDispatchToProps = { addItem };

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withStore(AddItem);
