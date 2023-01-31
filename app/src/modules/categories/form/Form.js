import React from 'react';
import { Row, Col, Form, Input, Switch } from 'antd';
import { connect } from 'react-redux';

import { ResourceForm, ColorInput } from '../../../components';

const DEFAULT = {
  category: '',
  code: '',
  abbreviation: '',
  color: '',
  active: false
};

class CategoriesForm extends ResourceForm {
  render() {
    return this.renderForm(({ form, readOnly }) => {
      const { getFieldDecorator } = form;

      return (
        <React.Fragment>
          <Row gutter={16}>
            <Col span={6} xs={24} md={6} sm={8}>
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
            <Col span={6} xs={24} md={6} sm={8}>
              <Form.Item label="Âge min">
                {getFieldDecorator('minAge', {
                  rules: [
                    {
                      required: true,
                      message: 'Ce champ est requis'
                    }
                  ]
                })(<Input disabled={readOnly} />)}
              </Form.Item>
            </Col>
            <Col span={6} xs={24} md={6} sm={8}>
              <Form.Item label="Âge max">
                {getFieldDecorator('maxAge', {
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
    let value = props.value || DEFAULT;

    if (!value) {
      return {};
    }

    const formFields = {
      designation: Form.createFormField({ value: value.designation }),
      maxAge: Form.createFormField({ value: value.maxAge }),
      minAge: Form.createFormField({ value: value.minAge })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(CategoriesForm);

export default WrappedForm;
