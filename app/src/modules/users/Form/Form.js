import React from 'react';
import { Form, Row, Col, Input, Select } from 'antd';
import { connect } from 'react-redux';

import { GENDERS } from '../../../const';
import {
  ResourceForm,
  ImageUpload,
  SearchableSelect
} from '../../../components';

const DEFAULT_USER = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  photo: '',
  gender: '',
  type: null
};

class UserForm extends ResourceForm {
  render() {
    const FormItemLayout = {
      labelCol: { span: 24 }
    };

    return this.renderForm(({ form, mode, readOnly }) => {
      const { getFieldDecorator } = form;

      return (
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 6 }}>
            <Form.Item {...FormItemLayout} label="Photo de l'utilisateur">
              {getFieldDecorator('photo')(<ImageUpload disabled={readOnly} />)}
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 18 }}>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item {...FormItemLayout} label="Nom">
                  {getFieldDecorator('lastName', {
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez entrer le nom'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item {...FormItemLayout} label="Prénom">
                  {getFieldDecorator('firstName', {
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez entrer le prénom'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item {...FormItemLayout} label="Type">
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: false,
                        message: 'Veuillez entrer le type'
                      }
                    ]
                  })(
                    <SearchableSelect disabled={readOnly}>
                      {this.props.roles.ids.map(item => (
                        <Select.Option key={item}>
                          {this.props.roles.byId[item].name}
                        </Select.Option>
                      ))}
                    </SearchableSelect>
                  )}
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item {...FormItemLayout} label="Civilité (genre)">
                  {getFieldDecorator('gender', {
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez entrer la civilité'
                      }
                    ]
                  })(
                    <SearchableSelect disabled={readOnly}>
                      {GENDERS.map(item => (
                        <Select.Option key={item.key}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </SearchableSelect>
                  )}
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item {...FormItemLayout} label="Nom utilisateur">
                  {getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez entrer le nom utilisateur'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item {...FormItemLayout} label="Mot de passe">
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: mode !== 'edit',
                        message: 'Veuillez entrer un mot de passe'
                      }
                    ]
                  })(<Input autoComplete="off" disabled={readOnly} />)}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    });
  }
}

const WrappedForm = Form.create({
  mapPropsToFields(props) {
    const value = props.value || DEFAULT_USER;

    return {
      photo: Form.createFormField({ value: value.photo }),
      lastName: Form.createFormField({ value: value.lastName }),
      firstName: Form.createFormField({ value: value.firstName }),
      type: Form.createFormField({ value: value.type }),
      gender: Form.createFormField({ value: value.gender }),
      username: Form.createFormField({ value: value.username }),
      password: Form.createFormField({ value: value.password }),
      passKey: Form.createFormField({ value: value.passKey })
    };
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(UserForm);

const mapStateToProps = ({ roles }) => ({
  roles
});

const withStore = connect(mapStateToProps);

export default withStore(WrappedForm);
