import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Avatar } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import Actions from '../../../components/Actions/Actions';
import textFilter from '../../../utils/text-filter';
import DataTable from '../../../components/DataTable';

import { deleteLand, fetchLands } from './lands-list.ducks';

class Lands extends Component {
  componentDidMount() {
    this.getLandsData({ page: 1 });
  }

  getLandsData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchLands({
      page,
      limit,
      filter: { ...filter },
      sort
    });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getLandsData(convertTableMeta(pagination, filters, sorter));
  };

  getData = (testSearch, searchWithAND) => {
    this.getLandsData({ page: 1 });
  };

  render() {
    const { loading, page, total, lands } = this.props;

    const columns = [
      {
        title: 'Désignation',
        dataIndex: 'name',

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
            showDelete
            selectUrl={`/lands/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteLand(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Gestion des terrains</h1>
            <DataTable
              loading={loading}
              dataSource={lands}
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
            <Link to="/lands/new">
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

Lands.propTypes = {
  lands: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  total: PropTypes.number.isRequired,
  fetchLands: PropTypes.func.isRequired,
  deleteLand: PropTypes.func.isRequired
};

const mapStateToProps = ({ lands }) => ({
  lands: lands.list.ids.map(id => lands.byId[id]),
  page: lands.list.page,
  loading: lands.list.loading,
  total: lands.list.total
});

const mapDispatchToProps = {
  fetchLands,
  deleteLand
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Lands);
