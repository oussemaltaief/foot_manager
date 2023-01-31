import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import textFilter from '../../../utils/text-filter';
import { Actions, DataTable } from '../../../components';

import { fetchEvents, deleteEvent } from './event-list.ducks';

class Events extends Component {
  componentDidMount() {
    this.getEventsData({ page: 1 });
  }

  getEventsData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchEvents({ page, limit, filter, sort });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getEventsData(
      convertTableMeta(pagination, filters, sorter, { name: 'regex' })
    );
  };

  render() {
    const { loading, page, total, events } = this.props;

    const columns = [
      {
        title: 'Désignation',
        dataIndex: 'designation',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Date debut',
        dataIndex: 'startDate',
        render: (text, record) => {
          return <span> {new Date(record.startDate).toDateString()} </span>;
        },
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Date fin',
        dataIndex: 'end Date',
        render: (text, record) => {
          return <span> {new Date(record.endDate).toDateString()} </span>;
        },
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Adresse',
        dataIndex: 'adress',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete={this.props.userType === 'admin'}
            selectUrl={`/events/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteEvent(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Gestion des évènements </h1>
            <DataTable
              loading={loading}
              dataSource={events}
              columns={columns}
              rowKey="_id"
              pagination={{
                current: page,
                pageSize: 10,
                total
              }}
              onChange={this.onTableChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Col style={{ textAlign: 'right' }}>
            <Link to="/events/new">
              <Button type="primary" icon="plus-square-o">
                Ajouter
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

Events.propTypes = {
  userType: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired
};

const mapStateToProps = ({
  events: {
    byId,
    list: { ids, loading, total, page }
  },
  auth
}) => {
  return {
    userType: auth.user.type,
    events: ids.map(id => byId[id]),
    page,
    loading,
    total
  };
};

const mapDispatchToProps = {
  fetchEvents,
  deleteEvent
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Events);
