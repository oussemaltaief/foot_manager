import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'antd';

const CurrentTrip = ({ trips }) => {
  const currentTrip = trips.byId[trips.currentTrip];
  const currentTripName = currentTrip ? currentTrip.name : 'chargement...';

  return (
    <Form style={{ marginBottom: 24 }} layout="inline">
      <Form.Item label="Trajet">{currentTripName}</Form.Item>
    </Form>
  );
};

CurrentTrip.propTypes = {
  trips: PropTypes.object.isRequired
};

const mapStateToProps = ({ trips }) => ({
  trips
});

const withStore = connect(mapStateToProps);

export default withStore(CurrentTrip);
