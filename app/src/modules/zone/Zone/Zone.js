import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import textFilter from '../../../utils/text-filter';
import { Actions, DataTable } from '../../../components';

import { deleteZone, fetchZones } from './Zone-list.ducks';

class getRolesData extends Component {
  componentDidMount() {
    this.getZonesData({ page: 1 });
  }

  getZonesData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchZones({ page, limit, filter, sort });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getZonesData(
      convertTableMeta(pagination, filters, sorter, { name: 'regex' })
    );
  };

  render() {
    const { loading, page, total, zones } = this.props;

    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete={this.props.userType === 'admin'}
            selectUrl={`/zones/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteZone(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Zonnage</h1>
            <DataTable
              loading={loading}
              dataSource={zones}
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
            <Link to="/zones/new">
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

getRolesData.propTypes = {
  userType: PropTypes.string.isRequired,
  zones: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  fetchZones: PropTypes.func.isRequired,
  deleteZone: PropTypes.func.isRequired
};

const mapStateToProps = ({
  zones: {
    byId,
    list: { ids, loading, total, page }
  },
  auth
}) => {
  return {
    userType: auth.user.type,
    zones: ids.map(id => byId[id]),
    page,
    loading,
    total
  };
};

const mapDispatchToProps = {
  fetchZones,
  deleteZone
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(getRolesData);
