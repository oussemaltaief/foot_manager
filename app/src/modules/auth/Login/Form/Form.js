import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Input, Button, Icon, Alert } from 'antd';
import { Redirect /*Link*/ } from 'react-router-dom';

const ERROR_MESSGES = {
  'Invalid login': 'Nom utilisateur ou mot de passe incorrecte'
};

const getInputPrefix = logo => (
  <Icon type={logo} style={{ color: 'rgba(0,0,0,.25)' }} />
);
class LoginForm extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const userNameError =
      isFieldTouched('username') && getFieldError('username');
    const passwordError =
      isFieldTouched('password') && getFieldError('password');

    return (
      <React.Fragment>
        <Form className="login-form" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Ce champ est requis'
                }
              ]
            })(
              <Input
                type="text"
                prefix={getInputPrefix('user')}
                placeholder="Nom utilisateur"
              />
            )}
          </Form.Item>

          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Ce champ est requis'
                }
              ]
            })(
              <Input
                type="password"
                prefix={getInputPrefix('lock')}
                placeholder="Mot de passe"
              />
            )}
          </Form.Item>
          <Row type="flex" justify="space-between" gutter={16}>
            <Col>
              {/* <Link to="#">
                Mot de passe oublié ?
                <br />
                Envoyer une requète à l'adminstrateur
              </Link> */}
            </Col>

            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={this.hasErrors(getFieldsError())}
                loading={this.props.loading}
              >
                {!this.props.loading && <Icon type="key" />} Se connecter
              </Button>
            </Col>
          </Row>

          {this.props.user && <Redirect to="/" />}

          {this.props.error && (
            <Alert
              style={{ marginTop: 18 }}
              message="Erreur de connexion"
              description={
                ERROR_MESSGES[this.props.error.message] ||
                this.props.error.message
              }
              type="error"
              showIcon
            />
          )}
        </Form>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = {
  message: PropTypes.string,
  user: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  form: PropTypes.object,
  onSubmit: PropTypes.func
};

const WrappedForm = Form.create()(LoginForm);

export default WrappedForm;
