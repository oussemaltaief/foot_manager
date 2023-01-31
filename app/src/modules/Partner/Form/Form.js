import React from 'react';
import { Row, Col, Form, Input } from 'antd';

import ResourceForm from '../../../components/ResourceForm';
import ImageUpload from '../../../components/ImageUpload';

class PartnerForm extends ResourceForm {
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
                <Form.Item {...FormItemLayout} label="Logo">
                  {getFieldDecorator('logo')(
                    <ImageUpload disabled={readOnly} />
                  )}
                </Form.Item>
                <Form.Item {...FormItemLayout} label="Désignation">
                  {getFieldDecorator('designation', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
                <Form.Item {...FormItemLayout} label="Lien">
                  {getFieldDecorator('link', {
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
      designation: Form.createFormField({ value: value.designation }),
      link: Form.createFormField({ value: value.link }),
      logo: Form.createFormField({ value: value.logo })
    };
    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(PartnerForm);

export default WrappedForm;
