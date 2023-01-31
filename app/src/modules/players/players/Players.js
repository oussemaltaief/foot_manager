import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Col,
  Row,
  Button,
  Icon,
  Avatar,
  Card,
  Popconfirm,
  Pagination,
  Select
} from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import Actions from '../../../components/Actions/Actions';
import textFilter from '../../../utils/text-filter';
import DataTable from '../../../components/DataTable';

import { deletePlayer, fetchPlayers } from './players-list.ducks';

const { Meta } = Card;

class Players extends Component {
  componentDidMount() {
    this.getPlayersData({ page: 1 });
  }

  getPlayersData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchPlayers({
      page,
      limit,
      filter: { ...filter },
      sort
    });
  };

  onPaginationChange = page => {
    this.getPlayersData({ page });
  };

  getData = (testSearch, searchWithAND) => {
    this.getPlayersData({ page: 1 });
  };

  render() {
    const { loading, page, fields, total, players } = this.props;

    const columns = [
      {
        title: 'Photo',
        dataIndex: 'photo',
        render: (text, field) => {
          return <Avatar src={field.photo} shape="square" size="large" />;
        },
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Nom',
        dataIndex: 'firstName',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Age',
        dataIndex: 'age',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Position',
        dataIndex: 'position',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete
            selectUrl={`/players/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deletePlayer(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <React.Fragment>
        <h1>Gestion des joueurs</h1>
        <Row gutter={16}>
          <h4>Choix categories : </h4>
          <Select style={{ width: 320, marginBottom: 20 }}>
            {this.props.categories.map(cat => {
              return (
                <Select.Option key={cat._id}>{cat.designation}</Select.Option>
              );
            })}
          </Select>
        </Row>
        <Row gutter={[16, 16]}>
          {players.map(player => {
            return (
              <Col
                xs={24}
                md={8}
                lg={6}
                xl={6}
                sm={12}
                style={{ marginBottom: 20 }}
              >
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={player.photo}
                      style={{ height: 250 }}
                    />
                  }
                  actions={[
                    null,
                    <Icon
                      type="select"
                      onClick={() =>
                        this.props.history.push(`/players/${player._id}`)
                      }
                    />,
                    <Popconfirm
                      placement="topRight"
                      icon={
                        <Icon
                          type="warning"
                          theme="filled"
                          style={{ color: '#f5222d' }}
                        />
                      }
                      okType="danger"
                      title="Supprimer cet élément?"
                      okText="Oui"
                      cancelText="Non"
                      onConfirm={() => this.props.deletePlayer(player._id)}
                    >
                      <Button type="danger">
                        <Icon type="close-circle" />
                      </Button>
                    </Popconfirm>
                  ]}
                >
                  <Meta
                    title={`${player.firstName} ${player.lastName}`}
                    description={`Poste : ${player.position}`}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Col style={{ textAlign: 'right' }}>
            <Pagination
              pageSize={10}
              total={this.props.total}
              onChange={page => this.onPaginationChange(page)}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Col style={{ textAlign: 'right' }}>
            <Link to="/players/new">
              <Button type="primary" icon="plus-square-o">
                Ajouter
              </Button>
            </Link>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

Players.propTypes = {
  userType: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  total: PropTypes.number.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired
};

const mapStateToProps = ({ players, auth, categories: { byId, ids } }) => ({
  userType: auth.user.type,
  players: players.list.ids.map(id => players.byId[id]),
  page: players.list.page,
  loading: players.list.loading,
  total: players.list.total,
  categories: ids.map(id => byId[id])
});

const mapDispatchToProps = {
  fetchPlayers,

  deletePlayer
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Players);
