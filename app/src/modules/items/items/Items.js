import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, Spin, Select, Alert, Tag } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import textFilter from '../../../utils/text-filter';
import Actions from '../../../components/Actions/Actions';
import SearchableSelect from '../../../components/SearchableSelect';
import DataTable from '../../../components/DataTable';

import {
  fetchItems,
  deleteItem,
  setCurrentGame,
  fetchGame,
  fetchGames
} from './items-list.ducks';

class Items extends Component {
  componentDidMount() {
    this.props.fetchGames().then(() => {
      this.getItemsData({ page: 1 });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentGame !== prevProps.currentGame) {
      this.getItemsData({ page: 1 });
    }
  }

  getItemsData = async ({ page, limit = 10, filter, sort }) => {
    if (this.props.currentGame) {
      await this.props.fetchGame(this.props.currentGame);
      this.props.fetchItems({
        page,
        limit,
        filter: { ...filter, game: this.props.currentGame },
        sort
      });
    }
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getItemsData(
      convertTableMeta(pagination, filters, sorter, { name: 'regex' })
    );
  };

  render() {
    const {
      loadingItems,
      page,
      total,
      items,
      loadingGames,
      currentGame
    } = this.props;

    const columns = [
      {
        title: 'name',
        key: 'game',
        dataIndex: 'name'
      },
      {
        title: 'value',
        key: 'items',
        dataIndex: 'value',
        render: (text, record) =>
          record.value ? (
            <Tag color="green">True</Tag>
          ) : (
            <Tag color="red">False</Tag>
          )
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete={this.props.userType === 'admin'}
            selectUrl={`/items/${record._id}`}
            onDelete={() => {
              this.props.deleteItem(record._id);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Items</h1>
            <Form style={{ marginBottom: 24 }} layout="inline">
              <Form.Item label="Jeu">
                <Spin spinning={loadingGames} delay={500}>
                  <SearchableSelect
                    style={{ minWidth: 200 }}
                    value={currentGame}
                    onChange={value => this.props.setCurrentGame(value)}
                  >
                    {this.props.activeGames.map(game => (
                      <Select.Option key={game._id}>{game.title}</Select.Option>
                    ))}
                  </SearchableSelect>
                </Spin>
              </Form.Item>
            </Form>
            {currentGame && (
              <DataTable
                loading={loadingItems}
                dataSource={items}
                columns={columns}
                rowKey="_id"
                pagination={{
                  current: page,
                  pageSize: 10,
                  total
                }}
                onChange={this.onTableChange}
              />
            )}
            {!currentGame && (
              <Alert
                message="Sélectionnez Jeu"
                description="Veuillez sélectionner un Jeu"
                type="info"
                showIcon
              />
            )}
          </Col>
        </Row>
        {currentGame && (
          <Row style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <Col style={{ textAlign: 'right' }}>
              <Link to="/items/new">
                <Button type="primary" icon="plus-square-o">
                  Ajout Item
                </Button>
              </Link>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

Items.propTypes = {
  userType: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingItems: PropTypes.bool.isRequired,
  loadingGames: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  activeGames: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentGame: PropTypes.string,
  fetchGames: PropTypes.func.isRequired,
  fetchGame: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
  setCurrentGame: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

const mapStateToProps = ({ games, items, auth }) => {
  return {
    userType: auth.user.type,
    items: items.list.ids.map(id => items.byId[id]),
    page: items.list.page,
    loadingItems: items.list.loadingItems,
    loadingGames: items.list.loadingGames,
    activeGames: items.list.games,
    currentGame: items.list.currentGame,
    total: items.list.total,
    event: items.list.currentGame && games.byId[items.list.currentGame]
  };
};

const mapDispatchToProps = {
  fetchItems,
  setCurrentGame,
  deleteItem,
  fetchGame,
  fetchGames
};

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withStore(Items);
