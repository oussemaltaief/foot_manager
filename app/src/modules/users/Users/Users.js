import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Row, Col, Button } from 'antd';

import { USER_TYPES, USER_TYPES_BY_KEY } from '../../../const';
import { convertTableMeta } from '../../../utils/helpers';
import textFilter from '../../../utils/text-filter';
import { Actions, DataTable } from '../../../components';

import { fetchUsers, deleteUser } from './users-list.ducks';

class Users extends Component {
  componentDidMount() {
    this.getUserData({ page: 1 });
  }

  getUserData = ({ page, limit = 10, filter, sort }) => {
    this.props.fetchUsers({ page, limit, filter, sort });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getUserData(
      convertTableMeta(pagination, filters, sorter, {
        name: 'fullName',
        type: 'array'
      })
    );
  };

  render() {
    const { loading, page, total, users } = this.props;

    const columns = [
      {
        title: 'Photo',
        key: 'photo',
        render: (text, record) => <Avatar src={record.photo} icon="user" />
      },
      {
        title: 'Nom & Prénom',
        key: 'name',
        sorter: true,
        ...textFilter(this, 'nameInput'),
        render: (text, record) => `${record.lastName} ${record.firstName}`
      },
      {
        title: 'Type',
        key: 'type',
        sorter: true,
        filters: USER_TYPES.map(v => ({ text: v.label, value: v.key })),
        render: (text, record) =>
          USER_TYPES_BY_KEY[record.type] && USER_TYPES_BY_KEY[record.type].label
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete={
              record._id !== this.props.userId &&
              this.props.userType === 'admin'
            }
            selectUrl={`/users/${record._id}`}
            onDelete={() => {
              this.props.deleteUser(record._id);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Gestion des utilisateurs</h1>
            <DataTable
              loading={loading}
              dataSource={users}
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
            <Link to="/users/new">
              <Button type="primary" icon="plus-square-o">
                Ajout d'un utilisateur
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

Users.propTypes = {
  deleteUser: PropTypes.func,
  userType: PropTypes.string,
  userId: PropTypes.string,
  fetchUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = ({
  users: {
    byId,
    list: { ids, loading, total, page }
  },
  auth
}) => ({
  users: ids.map(id => byId[id]),
  page,
  loading,
  total,
  userType: auth.user.type,
  userId: auth.user._id
});

const mapDispatchToProps = { fetchUsers, deleteUser };

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withStore(Users);
