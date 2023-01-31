import React from 'react';
import { Form, Row, Col, Input, Select, Switch } from 'antd';
import { connect } from 'react-redux';

import { STOCK_INFORMATION, PERIOD } from '../../../const';
import {
  ResourceForm,
  ImageUpload,
  SearchableSelect,
  ColorInput
} from '../../../components';

class ConfigForm extends ResourceForm {
  render() {
    const FormItemLayout = {
      labelCol: { span: 24 }
    };

    return this.renderForm(({ form, mode, readOnly, value, loading }) => {
      const { getFieldDecorator } = form;
      return (
        <Row gutter={16}>
          <Col xs={{ span: 24 }} md={{ span: 6 }}>
            <Form.Item {...FormItemLayout} label="Logo">
              {getFieldDecorator('logo')(<ImageUpload disabled={readOnly} />)}
            </Form.Item>
            <Form.Item {...FormItemLayout} label="GPS obligatoire ? ">
              {getFieldDecorator('GPS', {
                valuePropName: 'checked'
              })(<Switch disabled={readOnly} />)}
            </Form.Item>
            <Form.Item {...FormItemLayout} label="Couleur primaire">
              {getFieldDecorator('primaryColor')(
                <ColorInput disabled={readOnly} />
              )}
            </Form.Item>
            <Form.Item {...FormItemLayout} label="Couleur secondaire ">
              {getFieldDecorator('secondaryColor')(
                <ColorInput disabled={readOnly} />
              )}
            </Form.Item>
            <Form.Item
              {...FormItemLayout}
              label="Intervalle synchronisation FO/BO "
            >
              {getFieldDecorator('syncInterval')(<Input disabled={readOnly} />)}
            </Form.Item>
          </Col>

          <Col xs={{ span: 24 }} md={{ span: 18 }}>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Form.Item
                  {...FormItemLayout}
                  label="Périodicité plan de tournées "
                >
                  {getFieldDecorator('period', {
                    rules: [
                      {
                        required: true,
                        message: 'Veuillez entrer le prénom'
                      }
                    ]
                  })(
                    <SearchableSelect disabled={readOnly}>
                      {PERIOD.map(period => (
                        <Select.Option key={period.key}>
                          {period.label}
                        </Select.Option>
                      ))}
                    </SearchableSelect>
                  )}
                </Form.Item>

                <Form.Item
                  {...FormItemLayout}
                  label="Affichage informations  stoc"
                >
                  {getFieldDecorator('stockInformation')(
                    <SearchableSelect disabled={readOnly}>
                      {STOCK_INFORMATION.map(stock => (
                        <Select.Option key={stock.key}>
                          {stock.label}
                        </Select.Option>
                      ))}
                    </SearchableSelect>
                  )}
                </Form.Item>
              </Col>

              {/*<Col xs={{ span: 24 }} md={{ span: 12 }}>*/}
              {/*  <Form.Item {...FormItemLayout} label="Nom utilisateur">*/}
              {/*    {getFieldDecorator('username', {*/}
              {/*      rules: [*/}
              {/*        {*/}
              {/*          required: true,*/}
              {/*          message: 'Veuillez entrer le nom utilisateur'*/}
              {/*        }*/}
              {/*      ]*/}
              {/*    })(<Input disabled={readOnly} />)}*/}
              {/*  </Form.Item>*/}
              {/*</Col>*/}
            </Row>
          </Col>
        </Row>
      );
    });
  }
}

const WrappedForm = Form.create({
  mapPropsToFields(props) {
    const value = props.value;
    if (value) {
      return {
        logo: Form.createFormField({ value: value.logo }),
        GPS: Form.createFormField({ value: value.GPS }),
        primaryColor: Form.createFormField({ value: value.primaryColor }),
        secondaryColor: Form.createFormField({ value: value.secondaryColor }),
        syncInterval: Form.createFormField({ value: value.syncInterval }),
        period: Form.createFormField({ value: value.period }),
        stockInformation: Form.createFormField({
          value: value.stockInformation
        })
      };
    }
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(allValues);
  }
})(ConfigForm);

const mapStateToProps = ({ roles }) => ({
  roles
});

const withStore = connect(mapStateToProps);

export default withStore(WrappedForm);
