import React from 'react';
import { Row, Col, Form, Input } from 'antd';

import ResourceForm from '../../../components/ResourceForm';
import ImageUpload from '../../../components/ImageUpload';

class CoachesForm extends ResourceForm {
  render() {
    const FormItemLayout = {
      labelCol: { span: 24 }
    };

    return this.renderForm(({ form, mode, readOnly }) => {
      const { getFieldDecorator } = form;

      return (
        <React.Fragment>
          <Row>
            <Col>
              <div>
                <Form.Item {...FormItemLayout} label="Photo">
                  {getFieldDecorator('photo')(
                    <ImageUpload disabled={readOnly} />
                  )}
                </Form.Item>
                <Form.Item {...FormItemLayout} label="Nom">
                  {getFieldDecorator('firstName', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
                <Form.Item {...FormItemLayout} label="Prénom">
                  {getFieldDecorator('lastName', {
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
      photo: Form.createFormField({ value: value.photo })
    };
    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(CoachesForm);

export default WrappedForm;
