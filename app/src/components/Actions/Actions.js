import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, Button, Popconfirm } from 'antd';

const style = {
  icon: {
    fontSize: '1.2rem'
  }
};

const Actions = ({ selectUrl, onDelete, showDelete }) => (
  <Row
    className="actions"
    type="flex"
    gutter={12}
    style={{ flexWrap: 'nowrap' }}
  >
    <Col>
      <Link to={selectUrl}>
        <Icon style={style.icon} type="select" />
      </Link>
    </Col>
    {showDelete ? (
      <Col>
        <Popconfirm
          placement="topRight"
          icon={
            <Icon type="warning" theme="filled" style={{ color: '#f5222d' }} />
          }
          okType="danger"
          title="Supprimer cet élément?"
          okText="Oui"
          cancelText="Non"
          onConfirm={onDelete}
        >
          <Button type="danger">
            <Icon style={style.icon} type="close-circle" />
          </Button>
        </Popconfirm>
      </Col>
    ) : null}
  </Row>
);

Actions.propTypes = {
  showDelete: PropTypes.bool,
  selectUrl: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Actions;
