import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';

import { login } from '../auth.ducks';
import logo from '../../../images/csha.png';

import WrappedForm from './Form/index';

const mapStateToProps = ({ auth }) => ({ ...auth });

const mapDispatchToProps = { login };

const withStore = connect(mapStateToProps, mapDispatchToProps);

class Login extends Component {
  handleSubmit = async values => {
    await this.props.login({ ...values, strategy: 'local' });
  };

  render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col span={24} style={{ maxWidth: 500 }}>
            <Card bodyStyle={{ paddingTop: 0 }}>
              <div style={{ marginBottom: 32, textAlign: 'center' }}>
                <img
                  style={{
                    height: 200,
                    marginTop: -100
                  }}
                  src={logo}
                  alt="ETAC"
                />
              </div>
              <h1 style={{ textAlign: 'center' }}>
                Veuillez vous <b>authentifier</b>
              </h1>
              <WrappedForm
                wrappedComponentRef={form => (this.form = form)}
                onSubmit={this.handleSubmit}
                user={this.props.user}
                error={this.props.error}
                loading={this.props.loading}
              />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  user: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool
};

export default withStore(Login);
