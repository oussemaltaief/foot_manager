import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Tag } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import textFilter from '../../../utils/text-filter';
import { Actions, DataTable } from '../../../components';

import { fetchTeams, deleteTeam } from './teams-list.ducks';

class Teams extends Component {
  componentDidMount() {
    this.getTeamsData({ page: 1 });
  }

  getTeamsData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchTeams({ page, limit, filter, sort });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getTeamsData(
      convertTableMeta(pagination, filters, sorter, { name: 'regex' })
    );
  };

  render() {
    const { loading, page, total, teams } = this.props;

    const columns = [
      {
        title: 'Entraineurs',
        dataIndex: 'coaches',
        render: (text, record) =>
          record.coaches.map(coach => {
            return (
              this.props.coaches[coach] && (
                <Tag color="magenta" key={this.props.coaches[coach]._id}>
                  {' '}
                  {this.props.coaches[coach].firstName}{' '}
                </Tag>
              )
            );
          }),
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Catégorie',
        dataIndex: 'category',
        render: (text, record) => {
          return (
            this.props.categories[record.category] && (
              <Tag
                color="green"
                key={this.props.categories[record.category]._id}
              >
                {' '}
                {this.props.categories[record.category].designation}{' '}
              </Tag>
            )
          );
        },
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showUpdate
            showDelete
            selectUrl={`/teams/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteTeam(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Liste des équipes</h1>
            <DataTable
              loading={loading}
              dataSource={teams}
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
            <Link to="/teams/new">
              <Button type="primary" icon="plus-square-o">
                Ajouter équipe
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  fetchTeams: PropTypes.func.isRequired,
  deleteTeam: PropTypes.func.isRequired
};

const mapStateToProps = ({
  teams: {
    byId,
    list: { ids, loading, total, page }
  },
  coaches,
  categories
}) => {
  return {
    teams: ids.map(id => byId[id]),
    page,
    loading,
    total,
    coaches: coaches.byId,
    categories: categories.byId
  };
};

const mapDispatchToProps = {
  fetchTeams,
  deleteTeam
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Teams);
