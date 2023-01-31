import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Select } from 'antd';

import { ResourceForm } from '../../../components';
import ImageUpload from '../../../components/ImageUpload';

class PlayerForm extends ResourceForm {
  render() {
    return this.renderForm(({ form, readOnly }) => {
      const { getFieldDecorator } = form;
      const value = form.getFieldsValue();

      return (
        <React.Fragment>
          <Row gutter={16}>
            <Col span={8} md={8} xs={24}>
              <Form.Item label="Joueurs">
                {getFieldDecorator('players', {
                  rules: [
                    {
                      required: true,
                      message: 'Ce champ est requis'
                    }
                  ]
                })(
                  <Select mode="tags" disabled={readOnly}>
                    {this.props.players.map(player => {
                      return (
                        <Select.Option key={player._id}>
                          {player.firstName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8} md={8} xs={24}>
              <Form.Item label="Entraineurs">
                {getFieldDecorator('coaches', {
                  rules: [
                    {
                      required: true,
                      message: 'Ce champ est requis'
                    }
                  ]
                })(
                  <Select mode="tags" disabled={readOnly}>
                    {this.props.coaches.map(coach => {
                      return (
                        <Select.Option key={coach._id}>
                          {coach.firstName}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8} md={8} xs={24}>
              <Form.Item label="Catégorie">
                {getFieldDecorator('category', {
                  rules: [
                    {
                      required: true,
                      message: 'Ce champ est requis'
                    }
                  ]
                })(
                  <Select disabled={readOnly}>
                    {this.props.categories.map(cat => {
                      return (
                        <Select.Option key={cat._id}>
                          {cat.designation}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
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
      coaches: Form.createFormField({ value: value.coaches }),
      players: Form.createFormField({ value: value.players }),
      category: Form.createFormField({ value: value.category })
    };

    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(PlayerForm);

const mapStateToProps = ({ categories: { byId, ids }, players, coaches }) => ({
  categories: ids.map(id => byId[id]),
  players: players.ids.map(id => players.byId[id]),
  coaches: coaches.ids.map(id => coaches.byId[id])
});

export default connect(mapStateToProps, null)(WrappedForm);
