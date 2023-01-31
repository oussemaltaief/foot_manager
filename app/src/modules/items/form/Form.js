import React from 'react';
import { Row, Col, Form, Input, Tooltip, Icon, Select, Switch } from 'antd';
import { connect } from 'react-redux';

import { ResourceForm, Tree } from '../../../components';

class ItemsForm extends ResourceForm {
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
                <Form.Item label="Jeu">
                  {getFieldDecorator('game', {
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(
                    <Select disabled={readOnly} style={{ width: '100%' }}>
                      {this.props.games.ids.map(id => (
                        <Select.Option key={id} value={id}>
                          {this.props.games.byId[id].title}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </Col>
            <Col style={{ marginLeft: 10 }} span={8}>
              <div>
                <Form.Item label="Nom">
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
                <Form.Item label="Valeur">
                  {getFieldDecorator('value', {
                    initialValue: true,
                    valuePropName: 'checked',
                    rules: [
                      {
                        required: true,
                        message: 'Ce champ est requis'
                      }
                    ]
                  })(<Switch disabled={readOnly} checked />)}
                </Form.Item>
              </div>
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
      game: Form.createFormField({ value: value.game }),
      name: Form.createFormField({ value: value.name }),
      value: Form.createFormField({ value: value.value })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(ItemsForm);

const mapStateToProps = ({ games }) => ({
  games
});

export default connect(
  mapStateToProps,
  null
)(WrappedForm);
