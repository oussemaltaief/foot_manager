import React from 'react';
import { Row, Col, Form, Input, Tooltip, Icon } from 'antd';

import { ResourceForm } from '../../../components';
import ImageUpload from '../../../components/ImageUpload';

class ProductForm extends ResourceForm {
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
              <Form.Item label="Désignation">
                {getFieldDecorator('designation', {
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
              <Form.Item label="Description">
                {getFieldDecorator('description', {
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
              <Form.Item label="Prix">
                {getFieldDecorator('price', {
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
      description: Form.createFormField({ value: value.description }),
      designation: Form.createFormField({ value: value.designation }),
      price: Form.createFormField({ value: value.price }),
      photo: Form.createFormField({ value: value.photo })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(ProductForm);

export default WrappedForm;
