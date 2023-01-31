import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../form';

import { addGame } from './add-game.ducks';

class AddGame extends Component {
  state = {
    game: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ game: values });
  };

  handleSubmit = values => {
    this.props
      .addGame(this.state.game)
      .then(({ value }) => {
        message.success('jeu créée avec succès');
        this.props.history.push(`/jeux/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/jeux');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Création jeux</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.game}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddGame.propTypes = {
  history: PropTypes.object,
  addGame: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({
  games: {
    add: { loading }
  }
}) => ({
  loading
});

const mapDispatchToProps = { addGame };

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default withStore(AddGame);
