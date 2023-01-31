import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Switch, Table } from 'antd';

import { CLIENTGROUPEFIELDS as FIELDS } from '../../../const';
import SearchableSelect from '../../../components/SearchableSelect';
import RateString from '../../../components/Rate';

const QRES_PATTERN = /^qres/;

const Fields = props => {
  const { container, form, readOnly } = props;
  const { getFieldDecorator, getFieldValue, validateFields } = form;

  const columns = {
    index: {
      title: 'N°',
      key: 'index',
      width: 40,
      render: (text, record, index) => index + 1
    },
    labelDisplay: {
      title: 'Champ',
      dataIndex: 'label',
      width: 200
    },
    labelInput: {
      title: 'Question',
      key: 'label',
      width: 200,
      render: (text, record) => {
        const included = getFieldValue(`${container}.${record.key}.included`);

        return (
          <Form.Item>
            {getFieldDecorator(`${container}.${record.key}.label`, {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (!value && included) {
                      return callback('Veuillez entrer la question');
                    }

                    callback();
                  }
                }
              ]
            })(<Input disabled={!included || readOnly} />)}
          </Form.Item>
        );
      }
    },
    included: {
      title: 'Oui/Non',
      key: 'included',
      width: 70,
      render: (text, record) => {
        return (
          <Form.Item>
            {getFieldDecorator(`${container}.${record.key}.included`, {
              valuePropName: 'checked'
            })(
              <Switch
                disabled={record.disabled || readOnly}
                checkedChildren="Oui"
                unCheckedChildren="Non"
                onChange={() => {
                  setTimeout(() => {
                    validateFields([`${container}.${record.key}.label`], {
                      force: true
                    });
                  }, 0);
                }}
              />
            )}
          </Form.Item>
        );
      }
    },
    required: {
      title: 'Obligatoire',
      key: 'required',
      width: 70,
      render: (text, record) => {
        const included = getFieldValue(`${container}.${record.key}.included`);

        return (
          <Form.Item>
            {getFieldDecorator(`${container}.${record.key}.required`, {
              valuePropName: 'checked'
            })(
              <Switch
                disabled={record.disabled || !included || readOnly}
                checkedChildren="Oui"
                unCheckedChildren="Non"
              />
            )}
          </Form.Item>
        );
      }
    },
    showInList: {
      title: 'Afficher dans liste',
      key: 'showInList',
      width: 70,
      render: (text, record) => {
        const included = getFieldValue(`${container}.${record.key}.included`);

        return (
          <Form.Item>
            {getFieldDecorator(`${container}.${record.key}.showInList`, {
              valuePropName: 'checked'
            })(
              <Switch
                disabled={record.disabled || !included || readOnly}
                checkedChildren="Oui"
                unCheckedChildren="Non"
              />
            )}
          </Form.Item>
        );
      }
    },
    type: {
      title: 'Type',
      key: 'type',
      render: (text, record) => {
        const included = getFieldValue(`${container}.${record.key}.included`);
        const type = getFieldValue(`${container}.${record.key}.type`);

        return (
          <React.Fragment>
            <Form.Item>
              {getFieldDecorator(`${container}.${record.key}.type`)(
                <SearchableSelect
                  disabled={
                    record.disabled ||
                    record.typeDisabled ||
                    !included ||
                    readOnly
                  }
                >
                  <Select.Option value={'string'} key={'string'}>
                    Texte
                  </Select.Option>
                  <Select.Option value={'email'} key={'email'}>
                    Email
                  </Select.Option>
                  <Select.Option value={'list'} key={'list'}>
                    Liste
                  </Select.Option>
                  <Select.Option value={'tags'} key={'tags'}>
                    tags
                  </Select.Option>
                  <Select.Option value={'toggle'} key={'toggle'}>
                    Map
                  </Select.Option>
                  <Select.Option value={'file'} key={'file'}>
                    Photo
                  </Select.Option>
                  <Select.Option value={'evaluation'} key={'evaluation'}>
                    Evaluation
                  </Select.Option>
                </SearchableSelect>
              )}
            </Form.Item>
            <Form.Item
              style={{
                display: type === 'list' ? 'block' : 'none'
              }}
              label="Valeurs:"
            >
              {getFieldDecorator(`${container}.${record.key}.listValues`)(
                <Select
                  mode="tags"
                  notFoundContent=""
                  maxTagCount={10}
                  disabled={
                    record.disabled ||
                    record.typeDisabled ||
                    !included ||
                    readOnly
                  }
                />
              )}
            </Form.Item>
          </React.Fragment>
        );
      }
    },
    defaultValue: {
      title: 'Valeur par défaut',
      key: 'defaultValue',
      width: 200,
      render: (text, record) => {
        const included = getFieldValue(`${container}.${record.key}.included`);
        const type = getFieldValue(`${container}.${record.key}.type`);
        const listValues = getFieldValue(
          `${container}.${record.key}.listValues`
        );

        return (
          <Form.Item>
            {type === 'string' &&
            getFieldDecorator(`${container}.${record.key}.defaultValue`, {})(
              <Input disabled={!included || readOnly} />
            )}
            {type === 'email' &&
            getFieldDecorator(`${container}.${record.key}.defaultValue`, {
              rules: [
                {
                  type: 'email',
                  message: 'Veuillez entrer un email valide.'
                }
              ]
            })(<Input type="email" disabled={!included || readOnly} />)}
            {type === 'evaluation' &&
            getFieldDecorator(`${container}.${record.key}.defaultValue`, {})(
              <RateString disabled={!included || readOnly}/>
            )}
            {type === 'list' &&
            getFieldDecorator(`${container}.${record.key}.defaultValue`, {})(
              <SearchableSelect disabled={!included || readOnly}>
                {listValues.map(value => (
                  <Select.Option key={value}>{value}</Select.Option>
                ))}
              </SearchableSelect>
            )}
          </Form.Item>
        );
      }
    }
  };

  return (
    <div>
      <h2>Champs standards</h2>

      <Table
        style={{ marginBottom: 24 }}
        columns={[
          columns.labelDisplay,
          columns.included,
          columns.required,
          columns.showInList,
          columns.type,
          columns.defaultValue
        ]}
        dataSource={FIELDS.filter(f => !QRES_PATTERN.test(f.key))}
        pagination={false}
        size="small"
        bordered
      />

      <h2>Champs additionnels</h2>

      <Table
        style={{ marginBottom: 24 }}
        columns={[
          columns.index,
          columns.included,
          columns.required,
          columns.showInList,
          columns.labelInput,
          columns.type,
          columns.defaultValue
        ]}
        dataSource={FIELDS.filter(f => QRES_PATTERN.test(f.key))}
        pagination={false}
        size="small"
        bordered
      />
    </div>
  );
};

Fields.propTypes = {
  container: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  readOnly: PropTypes.bool
};

export default Fields;
