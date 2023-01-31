import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spin, message } from 'antd';

import Form from '../Form';
import { PERIOD, STOCK_INFORMATION } from '../../../const';

import { fetchConfig, updateConfig, addConfig } from './config-list.ducks';

const DEFAULT_TARGET = {
  logo: '',
  GPS: false,
  primaryColor: '#cd5a92',
  secondaryColor: '#363636',
  syncInterval: '',
  period: PERIOD[0].key,
  stockInformation: STOCK_INFORMATION[0].key
};

class Config extends Component {
  state = {
    config: null,
    mode: null,
    loading: false,
    id: null,
    buttonLoading: false
  };

  componentDidMount() {
    this.getConfigData();
  }

  getConfigData = () => {
    this.props.fetchConfig({}).then(({ value: config }) => {
      if (config.total === 0) {
        this.setState({ mode: 'create', config: DEFAULT_TARGET });
      } else {
        this.form.setPristine();
        this.setState({
          mode: 'edit',
          config: config.data[0],
          id: config.data[0]._id
        });
      }
    });
  };

  handleCancel = () => {
    const { config } = this.state;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ config });
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ config: values });
  };

  handleSubmit = values => {
    const { config, mode, id } = this.state;
    let buttonLoading = true;
    this.setState({ buttonLoading });
    if (mode === 'edit') {
      config._id = id;
      this.props
        .updateConfig(config._id, config)
        .then(() => {
          message.success('Réglages  modifié avec succès');
          this.form.setReadOnly();
          this.form.setPristine();
          this.setState({
            config: Object.assign({}, config),
            buttonLoading: false
          });
        })
        .catch(err => {
          this.setState({ buttonLoading: false });
          this.form.setServerErrors(values, err);
        });
    } else {
      this.props
        .addConfig(config)
        .then(({ value }) => {
          message.success('Réglages  créé avec succès');
          this.setState({
            config: Object.assign({}, value),
            mode: 'edit',
            id: value._id,
            buttonLoading: false
          });
        })
        .catch(err => {
          this.setState({ buttonLoading: false });
          this.form.setServerErrors(values, err);
        });
    }
  };

  render() {
    const { config, mode, loading, buttonLoading } = this.state;

    return (
      <div>
        <Row>
          <Col>
            <h1>Réglages mobilité </h1>
            {loading ? (
              <Spin spinning={!config && loading} />
            ) : (
              <Form
                wrappedComponentRef={form => (this.form = form)}
                mode={mode}
                value={config}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                onCancel={this.handleCancel}
                loading={buttonLoading}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

Config.propTypes = {
  fetchConfig: PropTypes.func.isRequired,
  addConfig: PropTypes.func.isRequired,
  updateConfig: PropTypes.func.isRequired
};

const mapStateToProps = ({
  config: {
    byId,
    list: { ids, loading },
    add,
    edit
  },
  auth
}) => ({
  config: ids.map(id => byId[id]),
  add,
  loading,
  edit,
  userType: auth.user.type,
  userId: auth.user._id
});

const mapDispatchToProps = { fetchConfig, addConfig, updateConfig };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Config);
