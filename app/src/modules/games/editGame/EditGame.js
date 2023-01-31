import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../form';

import { fetchGame, updateGame } from './edit-game.ducks';

class EditGame extends Component {
  state = {
    id: null,
    game: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchGame(id).then(({ value: game }) => {
      this.form.setPristine();
      this.setState({ id, game });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      game: merge({}, state.game, values)
    }));
  };

  handleSubmit = values => {
    const { id, game } = this.state;

    this.props
      .updateGame(id, game)
      .then(() => {
        message.success('Jeu modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          game: Object.assign({}, game)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      games: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ game: byId[id] });
  };

  render() {
    const { game } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification jeu</h1>
        <Spin spinning={!game && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={game}
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

EditGame.propTypes = {
  game: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchGame: PropTypes.func,
  updateGame: PropTypes.func
};

const mapStateToProps = ({ games }) => {
  return {
    games,
    loading: games.edit.loading
  };
};

const mapDispatchToProps = { fetchGame, updateGame };

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withStore(EditGame);
