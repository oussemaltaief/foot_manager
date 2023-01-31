import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import moment from 'moment';

import { ResourceForm } from '../../../components';
import DatePick from '../../../components/DatePick';

class LandForm extends ResourceForm {
  render() {
    return this.renderForm(({ form, readOnly }) => {
      const { getFieldDecorator } = form;
      const value = form.getFieldsValue();

      return (
        <React.Fragment>
          <Row gutter={16}>
            <Col span={6} md={8} xs={24}>
              <div>
                <Form.Item label="Désignation">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
              </div>
            </Col>
            <Col span={4} md={4} xs={24}>
              <div>
                <Form.Item label="Adresse">
                  {getFieldDecorator('adress', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
              </div>
            </Col>
            <Col span={6} md={8} xs={24}>
              <div>
                <Form.Item label="Longitude">
                  {getFieldDecorator('lng', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
              </div>
            </Col>
            <Col span={6} md={8} xs={24}>
              <Form.Item label="Latitude">
                {getFieldDecorator('lat', {
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
          <Row />
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
      name: Form.createFormField({ value: value.name }),
      adress: Form.createFormField({ value: value.adress }),
      lng: Form.createFormField({ value: value.lng }),
      lat: Form.createFormField({ value: value.lat })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(LandForm);

export default WrappedForm;
