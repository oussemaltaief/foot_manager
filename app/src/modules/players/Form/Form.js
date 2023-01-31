import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Select } from 'antd';

import { ResourceForm } from '../../../components';
import ImageUpload from '../../../components/ImageUpload';

class PlayerForm extends ResourceForm {
  render() {
    return this.renderForm(({ form, readOnly }) => {
      const { getFieldDecorator } = form;
      const value = form.getFieldsValue();

      return (
        <React.Fragment>
          <Row>
            <Form.Item label="Photo">
              {getFieldDecorator('photo', {
                rules: [
                  {
                    required: true,
                    message: 'Ce champ est requis'
                  }
                ]
              })(<ImageUpload disabled={readOnly} />)}
            </Form.Item>
          </Row>
          <Row gutter={16}>
            <Col span={8} md={8} xs={24}>
              <Form.Item label="Nom">
                {getFieldDecorator('firstName', {
                  rules: [
                    {
                      required: true,
                      message: 'Ce champ est requis'
                    }
                  ]
                })(<Input disabled={readOnly} />)}
              </Form.Item>
            </Col>
            <Col span={8} md={8} xs={24}>
              <Form.Item label="Prénom">
                {getFieldDecorator('lastName', {
                  rules: [
                    {
                      required: true,
                      message: 'Ce champ est requis'
                    }
                  ]
                })(<Input disabled={readOnly} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8} md={8} xs={24}>
              <Form.Item label="Age">
                {getFieldDecorator('age', {
                  rules: [
                    {
                      required: true,
                      message: 'Ce champ est requis'
                    }
                  ]
                })(<Input disabled={readOnly} />)}
              </Form.Item>
            </Col>
            <Col span={8} md={8} xs={24}>
              <Form.Item label="Position">
                {getFieldDecorator('position', {
                  rules: [
                    {
                      required: true,
                      message: 'Ce champ est requis'
                    }
                  ]
                })(<Input disabled={readOnly} />)}
              </Form.Item>
            </Col>
            <Row>
              <Col span={8} md={8} xs={24}>
                <Form.Item label="Catégorie">
                  {getFieldDecorator('category', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(
                    <Select disabled={readOnly}>
                      {this.props.categories.map(cat => {
                        return (
                          <Select.Option key={cat._id}>
                            {cat.designation}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Row>
        </React.Fragment>
      );
    });
  }
}

const WrappedForm = Form.create({
  mapPropsToFields(props) {
    let value = props.value;

    if (!value) {
      return {};
    }

    const formFields = {
      firstName: Form.createFormField({ value: value.firstName }),
      lastName: Form.createFormField({ value: value.lastName }),
      age: Form.createFormField({ value: value.age }),
      position: Form.createFormField({ value: value.position }),
      photo: Form.createFormField({ value: value.photo }),
      category: Form.createFormField({ value: value.category })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(PlayerForm);

const mapStateToProps = ({ categories: { byId, ids } }) => ({
  categories: ids.map(id => byId[id])
});

export default connect(mapStateToProps, null)(WrappedForm);
