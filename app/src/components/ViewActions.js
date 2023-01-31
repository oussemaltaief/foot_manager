import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Icon, Button, Popconfirm } from 'antd';

const style = {
  icon: {
    fontSize: '1.2rem'
  }
};

const ViewActions = ({ onView }) => (
  <Row
    className="actions"
    type="flex"
    gutter={12}
    style={{ flexWrap: 'nowrap' }}
  >
    <Col>
      <Popconfirm
        placement="topRight"
        icon={
          <Icon type="warning" theme="filled" style={{ color: '#f5222d' }} />
        }
        okType="danger"
        title="voir cet élément?"
        okText="Oui"
        cancelText="Non"
        onConfirm={onView}
      >
        <Button type="danger">
          <Icon style={style.icon} type="close-circle" />
        </Button>
      </Popconfirm>
    </Col>
  </Row>
);

ViewActions.propTypes = {
  onView: PropTypes.func.isRequired
};

export default ViewActions;
