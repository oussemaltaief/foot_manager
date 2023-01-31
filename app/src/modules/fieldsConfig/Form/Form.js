import React from 'react';
import { Form, Icon, Tabs } from 'antd';

import {
  CLIENTFIELDS,
  CLIENTFIELDS_BY_KEY,
  CLIENTGROUPEFIELDS,
  CLIENTGROUPEFIELDS_BY_KEY,
  FIELDS_CONTAINERS,
  FIELDS_CONTAINERS_BY_KEY,
  PRODUCT,
  PRODUCT_BY_KEY
} from '../../../const';
import ResourceForm from '../../../components/ResourceForm';

import Client from './Client';
import ClientGroupe from './ClientGroupe';
import Product from './Product';

const DEFAULT_TARGET = {
  active: true,
  [FIELDS_CONTAINERS_BY_KEY.CLIENTFIELDS]: [
    { key: 'ref_ERP' }
  ],
  [FIELDS_CONTAINERS_BY_KEY.CLIENTGROUPEFIELDS]: [
    { key: 'ref_ERP' }
  ],
  [FIELDS_CONTAINERS_BY_KEY.PRODUCT]: [
    { key: 'ref_ERP' }
  ]
};

class EventForm extends ResourceForm {
  state = {
    fields: null
  };

  convertBack = values => convertBack(values);

  render() {
    return this.renderForm(({ form, readOnly }) => (
      <Tabs type="card">
        <Tabs.TabPane
          key={FIELDS_CONTAINERS_BY_KEY.CLIENTFIELDS}
          tab={
            <span>
              <Icon type="bars"/>
              Formulaire client
            </span>
          }
          forceRender
        >
          <Client
            container={FIELDS_CONTAINERS_BY_KEY.CLIENTFIELDS}
            form={form}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          key={FIELDS_CONTAINERS_BY_KEY.CLIENTGROUPEFIELDS}
          tab={
            <span>
              <Icon type="bars"/>
             Formulaire groupe client
            </span>
          }
          forceRender
        >
          <ClientGroupe
            container={FIELDS_CONTAINERS_BY_KEY.CLIENTGROUPEFIELDS}
            form={form}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          key={FIELDS_CONTAINERS_BY_KEY.PRODUCT}
          tab={
            <span>
              <Icon type="Bars"/>
              Formulaire article
            </span>
          }
          forceRender
        >
          <Product
            container={FIELDS_CONTAINERS_BY_KEY.PRODUCT}
            form={form}
            readOnly={readOnly}
          />
        </Tabs.TabPane>
      </Tabs>
    ));
  }
}

const WrappedForm = Form.create({
  mapPropsToFields(props) {
    const value = props.value || DEFAULT_TARGET;
    const formFields = {};

    // convert fields list to a hash with all available fields adding the
    // property 'included' set to 'true' if the field exists in the list
    // and to 'false' otherwise.
    if (value) {
      FIELDS_CONTAINERS.forEach(container => {
        const containerFields =
          container === FIELDS_CONTAINERS_BY_KEY.PRODUCT
            ? PRODUCT
            : container === FIELDS_CONTAINERS_BY_KEY.CLIENTGROUPEFIELDS
            ? CLIENTGROUPEFIELDS
            : CLIENTFIELDS;
        containerFields.forEach(refField => {
          const configField = (value[container] || []).find(
            field => field.key === refField.key
          );
          const fieldValues = Object.assign({}, refField, configField || {}, {
            included: !!configField
          });

          [
            'label',
            'included',
            'required',
            'showInList',
            'type',
            'listValues',
            'defaultValue'
          ].forEach(prop => {
            formFields[
              `${container}.${refField.key}.${prop}`
              ] = Form.createFormField({
              value: fieldValues[prop]
            });
          });
        });
      });
    }
    return formFields;
  },
  onValuesChange(props, changedValues, allValues) {
    props.onChange && props.onChange(convertBack(allValues));
  }
})(EventForm);

export default WrappedForm;

// Helpers

function convertBack(values) {
  const converted = Object.assign({}, values);

  // convert back fields
  FIELDS_CONTAINERS.forEach(container => {
    const containerFieldsByKey =
      container === FIELDS_CONTAINERS_BY_KEY.CLIENTGROUPEFIELDS
        ? CLIENTGROUPEFIELDS_BY_KEY
        : container === FIELDS_CONTAINERS_BY_KEY.PRODUCT
        ? PRODUCT_BY_KEY
        : CLIENTFIELDS_BY_KEY;

    converted[container] = Object.keys(converted[container]).reduce(
      (acc, key) => {
        const formField = converted[container][key];
        if (formField.included) {
          const configField = Object.assign(
            { key, label: containerFieldsByKey[key].label },
            formField
          );

          // delete configField .included;
          acc.push(configField);
        }

        return acc;
      },
      []
    );
  });
  return converted;
}
