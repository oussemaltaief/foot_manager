import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import moment from 'moment';

import { ResourceForm } from '../../../components';
import DatePick from '../../../components/DatePick';

const { TextArea } = Input;

class EventForm extends ResourceForm {
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
                  {getFieldDecorator('designation', {
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
                <Form.Item label="Date debut">
                  {getFieldDecorator('startDate', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(
                    <DatePick
                      format="YYYY-MM-DD HH:mm:ss"
                      disabled={readOnly}
                      showTime={{
                        defaultValue: moment('00:00:00', 'HH:mm:ss')
                      }}
                    />
                  )}
                </Form.Item>
              </div>
            </Col>
            <Col span={4} md={4} xs={24}>
              <div>
                <Form.Item label="Date fin">
                  {getFieldDecorator('endDate', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(
                    <DatePick
                      format="YYYY-MM-DD HH:mm:ss"
                      disabled={readOnly}
                      showTime={{
                        defaultValue: moment('00:00:00', 'HH:mm:ss')
                      }}
                    />
                  )}
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={6} md={10} xs={24}>
              <div>
                <Form.Item label="Description">
                  {getFieldDecorator('description', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(<TextArea disabled={readOnly} />)}
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={6} md={8} xs={24}>
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
      designation: Form.createFormField({ value: value.designation }),
      startDate: Form.createFormField({ value: value.startDate }),
      endDate: Form.createFormField({ value: value.endDate }),
      description: Form.createFormField({ value: value.description }),
      adress: Form.createFormField({ value: value.adress })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(EventForm);

export default WrappedForm;
