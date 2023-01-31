import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button, Modal, notification } from 'antd';

class ResourceForm extends Component {
  state = { cancelVisible: false, readOnly: true, pristine: true };

  convertBack = values => values;

  setServerErrors = (values, err) => {
    // eslint-disable-next-line no-console
    console.error(err);

    notification.error({
      message: 'Erreur',
      description:
        'Une erreur est survenue, veuillez vérifier ' +
        'les valeurs entrées ou réessayer plus tard.'
    });

    // TODO: handle 400 error to display validation errors in form
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (err) {
        notification.error({
          message: 'Erreur de validation',
          description:
            'Veuillez vérifier tous les champs et corriger les erreurs.'
        });
      } else {
        if (this.props.onSubmit) {
          this.props.onSubmit(this.convertBack(values));
        }
      }
    });
  };

  setReadOnly = (readOnly = true) => {
    this.setState({ readOnly });
  };

  setPristine = (pristine = true) => {
    this.setState({ pristine });
  };

  handleCancel = () => {
    if (!this.state.pristine) {
      this.setState({ cancelVisible: true });
    } else {
      this.handleCancelOk();
    }
  };

  handleCancelOk = () => {
    this.setState({ cancelVisible: false });

    if (typeof this.props.onCancel === 'function') {
      this.props.onCancel();
    }
  };

  handleCancelCancel = () => this.setState({ cancelVisible: false });

  renderForm(children) {
    const { mode, form, extraButtons, loading, showText } = this.props;
    const readOnly = mode === 'edit' && this.state.readOnly;

    return (
      <React.Fragment>
        <Form
          className={readOnly ? 'form--read-only' : ''}
          layout="vertical"
          hideRequiredMark={readOnly}
          onSubmit={this.handleSubmit}
        >
          {children({ form, mode, readOnly })}
          <Row type="flex" justify="end" gutter={16}>
            {extraButtons && extraButtons({ form, mode, readOnly })}
            {!readOnly && (
              <Col>
                <Button
                  type="default"
                  icon="close"
                  disabled={loading}
                  onClick={this.handleCancel}
                >
                  Annuler
                </Button>
              </Col>
            )}
            {!readOnly && (
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon="check"
                  loading={loading}
                >
                  {showText
                    ? 'Enregistrer et lancer l`imression'
                    : 'Enregistrer'}
                </Button>
              </Col>
            )}
            {readOnly && (
              <Col>
                <Button
                  type="primary"
                  icon="edit"
                  onClick={() => this.setReadOnly(false)}
                >
                  Modifier
                </Button>
              </Col>
            )}
          </Row>
        </Form>
        <Modal
          title="Annuler"
          okText="Oui"
          cancelText="Non"
          visible={this.state.cancelVisible}
          onOk={this.handleCancelOk}
          onCancel={this.handleCancelCancel}
        >
          <p>Toutes les modifications effectuées seront perdues.</p>
          <p>Annuler l'opérarion?</p>
        </Modal>
      </React.Fragment>
    );
  }
}

ResourceForm.propTypes = {
  mode: PropTypes.string,
  form: PropTypes.object.isRequired,
  extraButtons: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
  showText: PropTypes.bool
};

export default ResourceForm;
