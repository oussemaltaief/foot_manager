import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import textFilter from '../../../utils/text-filter';
import { Actions, DataTable } from '../../../components';

import { fetchGames, deleteGame } from './games-list.ducks';

class Roles extends Component {
  componentDidMount() {
    this.getRolesData({ page: 1 });
  }

  getRolesData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchGames({ page, limit, filter, sort });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getRolesData(
      convertTableMeta(pagination, filters, sorter, { name: 'regex' })
    );
  };

  render() {
    const { loading, page, total, games } = this.props;

    const columns = [
      {
        title: 'Adversaire',
        dataIndex: 'opponent',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Date',
        dataIndex: 'date',
        render: (text, record) => {
          return <span> {new Date(record.date).toDateString()} </span>;
        },
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Résultat',
        dataIndex: 'result',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Type',
        dataIndex: 'type',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete={this.props.userType === 'admin'}
            selectUrl={`/jeux/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteGame(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Gestion des matchs </h1>
            <DataTable
              loading={loading}
              dataSource={games}
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
            <Link to="/jeux/new">
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
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  fetchGames: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired
};

const mapStateToProps = ({
  games: {
    byId,
    list: { ids, loading, total, page }
  },
  auth
}) => {
  return {
    userType: auth.user.type,
    games: ids.map(id => byId[id]),
    page,
    loading,
    total
  };
};

const mapDispatchToProps = {
  fetchGames,
  deleteGame
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Roles);
