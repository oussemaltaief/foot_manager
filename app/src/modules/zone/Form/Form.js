import React from 'react';
import { Row, Col, Form, Input, Tooltip, Icon } from 'antd';

import { ResourceForm, Map } from '../../../components';

class StationForm extends ResourceForm {
  render() {
    return this.renderForm(({ form, readOnly }) => {
      const { getFieldDecorator } = form;

      return (
        <React.Fragment>
          <Row>
            <Col span={8}>
              <div>
                <Form.Item
                  label={
                    <span>
                      Désignation&nbsp;
                      <Tooltip title="Désignation">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
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
            <Col span={12}style={{margin : 10}}>
              <Form.Item
                label={
                  <span>
                      Map&nbsp;
                    <Tooltip title="Désignation">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                }
              >
                {getFieldDecorator('latlng')(<Map />)}
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
      name: Form.createFormField({ value: value.name }),
      latlng: Form.createFormField({ value: value.latlng }),
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(StationForm);

export default WrappedForm;
