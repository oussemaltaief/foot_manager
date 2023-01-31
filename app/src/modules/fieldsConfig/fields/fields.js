import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spin, message } from 'antd';

import Form from '../Form';
import { FIELDS_CONTAINERS_BY_KEY } from '../../../const';

import { fetchFieldsConfig, updateFieldsConfig, addFieldsConfig} from './field.ducks';

const DEFAULT_TARGET = {
  active: true,
  [FIELDS_CONTAINERS_BY_KEY.CLIENTFIELDS]: [],
  [FIELDS_CONTAINERS_BY_KEY.CLIENTGROUPEFIELDS]: [],
  [FIELDS_CONTAINERS_BY_KEY.PRODUCT]: [],
};

class FIELDS extends Component {
  state = {
    fields: null,
    mode: null,
    loading: false,
    id: null,
    buttonLoading: false
  };

  componentDidMount() {
    this.getfieldsData();
  }

  getfieldsData = () => {
    this.form.setReadOnly();
    this.props.fetchFieldsConfig({}).then(({ value: fields }) => {
      if (fields.total === 0) {
        this.setState({ mode: 'create', fields: DEFAULT_TARGET });
      } else {
        this.form.setPristine();
        this.setState({
          mode: 'edit',
          fields: fields.data[0],
          id: fields.data[0]._id
        });
      }
    });
  };

  handleCancel = () => {
    const { fields } = this.state;

    this.form.setReadOnly();
    this.form.setPristine();

    this.setState({ fields });
  };

  handleChange = values => {
    this.form.setPristine(false);
    this.setState({ fields: values });
  };

  handleSubmit = values => {
    const { fields, mode, id } = this.state;
    let buttonLoading = true;
    this.setState({ buttonLoading });
    if (mode === 'edit') {
      fields._id = id;
      this.props
        .updateFieldsConfig(fields._id, fields)
        .then(() => {
          message.success('Réglages  modifié avec succès');
          this.form.setReadOnly();
          this.form.setPristine();
          this.setState({
            fields: Object.assign({}, fields),
            buttonLoading: false
          });
        })
        .catch(err => {
          this.setState({ buttonLoading: false });
          this.form.setServerErrors(values, err);
        });
    } else {
      this.props
        .addFieldsConfig(fields)
        .then(({ value }) => {
          message.success('Réglages  créé avec succès');
          this.setState({
            fields: Object.assign({}, value),
            mode: 'edit',
            id: value._id,
            buttonLoading: false
          });
        })
        .catch(err => {
          this.setState({ buttonLoading: false });
          this.form.setServerErrors(values, err);
        });
    }
  };

  render() {
    const { fields, mode, loading, buttonLoading } = this.state;

    return (
      <div>
        <Row>
          <Col>
            {loading ? (
              <Spin spinning={!fields && loading} />
            ) : (
              <Form
                wrappedComponentRef={form => (this.form = form)}
                mode={mode}
                value={fields}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                onCancel={this.handleCancel}
                loading={buttonLoading}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

FIELDS.propTypes = {
  fetchFieldsConfig: PropTypes.func.isRequired,
  addFieldsConfig: PropTypes.func.isRequired,
  updateFieldsConfig: PropTypes.func.isRequired
};

const mapStateToProps = ({
                           fields: {
                             byId,
                             list: { ids, loading },
                             add,
                             edit
                           },
                           auth
                         }) => ({
  fields: ids.map(id => byId[id]),
  add,
  loading,
  edit,
  userType: auth.user.type,
  userId: auth.user._id
});

const mapDispatchToProps = { fetchFieldsConfig, addFieldsConfig, updateFieldsConfig };

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(FIELDS);
