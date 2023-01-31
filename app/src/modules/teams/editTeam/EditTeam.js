import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spin, message } from 'antd';
import merge from 'lodash.merge';

import Form from '../form';

import { fetchTeam, updateTeam } from './editTeam.ducks';

class EditTeam extends Component {
  state = {
    id: null,
    team: null
  };

  componentDidMount = () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.props.fetchTeam(id).then(({ value: team }) => {
      this.form.setPristine();
      this.setState({ id, team });
    });
  };

  handleChange = values => {
    this.form.setPristine(false);

    this.setState(state => ({
      team: merge({}, state.team, values)
    }));
  };

  handleSubmit = values => {
    const { id, team } = this.state;
    this.props
      .updateTeam(id, team)
      .then(() => {
        message.success('Equipe modifiée avec succès');
        this.form.setReadOnly();
        this.form.setPristine();
        this.setState({
          team: Object.assign({}, team)
        });
      })
      .catch(err => {
        this.form.setServerErrors(values, err);
      });
  };

  handleCancel = () => {
    const { id } = this.state;
    const {
      teams: { byId }
    } = this.props;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ team: byId[id] });
  };

  render() {
    const { team } = this.state;
    const { loading } = this.props;

    return (
      <div>
        <h1>Détails/Modification d'une Equipe</h1>
        <Spin spinning={!team && loading}>
          <div>
            <Form
              wrappedComponentRef={form => (this.form = form)}
              mode="edit"
              value={team}
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

EditTeam.propTypes = {
  teams: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  fetchTeam: PropTypes.func,
  updateTeam: PropTypes.func
};

const mapStateToProps = ({ teams }) => {
  return {
    teams,
    loading: teams.edit.loading
  };
};

const mapDispatchToProps = { fetchTeam, updateTeam };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(EditTeam);
