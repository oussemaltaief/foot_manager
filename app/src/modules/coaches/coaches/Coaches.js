import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Avatar } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import Actions from '../../../components/Actions/Actions';
import textFilter from '../../../utils/text-filter';
import DataTable from '../../../components/DataTable';

import { deleteCoach, fetchCoaches } from './coaches-list.ducks';

class Coaches extends Component {
  componentDidMount() {
    this.getCoachesData({ page: 1 });
  }

  getCoachesData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchCoaches({
      page,
      limit,
      filter: { ...filter },
      sort
    });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getCoachesData(convertTableMeta(pagination, filters, sorter));
  };

  getData = (testSearch, searchWithAND) => {
    this.getCoachesData({ page: 1 });
  };

  render() {
    const { loading, page, total, coaches } = this.props;

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
        title: 'Prénom',
        dataIndex: 'firstName',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Nom',
        dataIndex: 'lastName',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete
            selectUrl={`/coaches/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteCoach(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Gestion des entraineurs</h1>
            <DataTable
              loading={loading}
              dataSource={coaches}
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
            <Link to="/coaches/new">
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

Coaches.propTypes = {
  coaches: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  total: PropTypes.number.isRequired,
  fetchCoaches: PropTypes.func.isRequired,
  deleteCoach: PropTypes.func.isRequired
};

const mapStateToProps = ({ coaches }) => ({
  coaches: coaches.list.ids.map(id => coaches.byId[id]),
  page: coaches.list.page,
  loading: coaches.list.loading,
  total: coaches.list.total
});

const mapDispatchToProps = {
  fetchCoaches,
  deleteCoach
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Coaches);
