import React from 'react';
import { Row, Col, Form, Input, Tooltip, Icon } from 'antd';

import { ResourceForm, Tree } from '../../../components';

class StationForm extends ResourceForm {
  render() {
    return this.renderForm(({ form, readOnly }) => {
      const { getFieldDecorator } = form;
      const value = form.getFieldsValue();
      const accessControl = value.accessControl;

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
            <Col style={{ marginLeft: 10 }} span={8}>
              <div>
                <Form.Item
                  label={
                    <span>
                      Abbréviation&nbsp;
                      <Tooltip title="Abbréviation">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('abbreviation', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(<Input disabled={readOnly} />)}
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label={
                    <span>
                      Privilèges associés au profil&nbsp;
                      <Tooltip title="Privilèges associés au profil">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('accessControl', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(
                    <Tree accessControl={accessControl} disabled={readOnly} />
                  )}
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Row></Row>
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
      accessControl: Form.createFormField({ value: value.accessControl }),
      abbreviation: Form.createFormField({ value: value.abbreviation })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(StationForm);

export default WrappedForm;
