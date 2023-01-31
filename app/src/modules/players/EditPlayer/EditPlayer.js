import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../Form';

import { fetchPlayer, updatePlayer } from './edit-player.ducks';

class EditPlayer extends Component {
  state = {
    id: null,
    player: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchPlayer(id).then(({ value: player }) => {
      this.form.setPristine();
      this.setState({ id, player });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      player: merge({}, state.player, values)
    }));
  };

  handleSubmit = values => {
    const { id, player } = this.state;

    this.props
      .updatePlayer(id, player)
      .then(() => {
        message.success('Joueur modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          player: Object.assign({}, player)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      players: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ player: byId[id] });
  };

  render() {
    const { player } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification joueur</h1>
        <Spin spinning={!player && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={player}
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
  player: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchPlayer: PropTypes.func,
  updatePlayer: PropTypes.func
};

const mapStateToProps = ({ players }) => {
  return {
    players,
    loading: players.edit.loading
  };
};

const mapDispatchToProps = { fetchPlayer, updatePlayer };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditPlayer);
