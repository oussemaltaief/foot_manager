import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from 'antd';

import Form from '../Form';

import { addPlayer } from './add-player.ducks';

class AddPlayer extends Component {
  state = {
    player: null
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ player: values });
  };

  handleSubmit = values => {
    this.props
      .addPlayer(this.state.player)
      .then(({ value }) => {
        message.success('Joueur créée avec succès');
        this.props.history.push(`/players/${value._id}`);
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    this.props.history.push('/players');
  };

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h1>Création joueurs</h1>
        <Form
          wrappedComponentRef={form => (this.form = form)}
          value={this.state.player}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
          loading={loading}
        />
      </div>
    );
  }
}

AddPlayer.propTypes = {
  history: PropTypes.object,
  addPlayer: PropTypes.func,
  loading: PropTypes.bool
};

const mapStateToProps = ({
  players: {
    add: { loading }
  }
}) => ({
  loading
});

const mapDispatchToProps = { addPlayer };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(AddPlayer);
