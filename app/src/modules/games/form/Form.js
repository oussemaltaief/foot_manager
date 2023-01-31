import React from 'react';
import { Row, Col, Form, Input } from 'antd';
import moment from 'moment';

import { ResourceForm } from '../../../components';
import DatePick from '../../../components/DatePick';

class GameForm extends ResourceForm {
  render() {
    return this.renderForm(({ form, readOnly }) => {
      const { getFieldDecorator } = form;
      const value = form.getFieldsValue();

      return (
        <React.Fragment>
          <Row gutter={16}>
            <Col span={6} md={8} xs={24}>
              <div>
                <Form.Item label="Adversaire">
                  {getFieldDecorator('opponent', {
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
                <Form.Item label="Date">
                  {getFieldDecorator('date', {
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
            <Col span={6} md={8} xs={24}>
              <div>
                <Form.Item label="Résultat">
                  {getFieldDecorator('result', {
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
              <Form.Item label="Type">
                {getFieldDecorator('type', {
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
      opponent: Form.createFormField({ value: value.opponent }),
      date: Form.createFormField({ value: value.date }),
      result: Form.createFormField({ value: value.result }),
      type: Form.createFormField({ value: value.type })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(GameForm);

export default WrappedForm;
