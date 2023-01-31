import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import textFilter from '../../../utils/text-filter';
import { Actions, DataTable } from '../../../components';

import { fetchRoles, deleteRole } from './roles-list.ducks';

class Roles extends Component {
  componentDidMount() {
    this.getRolesData({ page: 1 });
  }

  getRolesData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchRoles({ page, limit, filter, sort });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getRolesData(
      convertTableMeta(pagination, filters, sorter, { name: 'regex' })
    );
  };

  render() {
    const { loading, page, total, roles } = this.props;

    const columns = [
      {
        title: 'Rôle',
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
            selectUrl={`/roles/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteRole(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Gestion des roles</h1>
            <DataTable
              loading={loading}
              dataSource={roles}
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
            <Link to="/roles/new">
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

Roles.propTypes = {
  userType: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  fetchRoles: PropTypes.func.isRequired,
  deleteRole: PropTypes.func.isRequired
};

const mapStateToProps = ({
  roles: {
    byId,
    list: { ids, loading, total, page }
  },
  auth
}) => {
  return {
    userType: auth.user.type,
    roles: ids.map(id => byId[id]),
    page,
    loading,
    total
  };
};

const mapDispatchToProps = {
  fetchRoles,
  deleteRole
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Roles);
