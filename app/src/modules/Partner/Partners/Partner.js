import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Avatar } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import Actions from '../../../components/Actions/Actions';
import textFilter from '../../../utils/text-filter';
import DataTable from '../../../components/DataTable';

import { deletePartner, fetchPartners } from './partners-list.ducks';

class Partners extends Component {
  componentDidMount() {
    this.getPartnersData({ page: 1 });
  }

  getPartnersData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchPartners({
      page,
      limit,
      filter: { ...filter },
      sort
    });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getPartnersData(convertTableMeta(pagination, filters, sorter));
  };

  getData = (testSearch, searchWithAND) => {
    this.getPartnersData({ page: 1 });
  };

  render() {
    const { loading, page, total, partners } = this.props;

    const columns = [
      {
        title: 'Logo',
        dataIndex: 'logo',
        render: (text, field) => {
          return <Avatar src={field.logo} shape="square" size="large" />;
        },
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Désignation',
        dataIndex: 'designation',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Lien',
        dataIndex: 'link',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete
            selectUrl={`/partners/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deletePartner(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Gestion des partenaires</h1>
            <DataTable
              loading={loading}
              dataSource={partners}
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
            <Link to="/partners/new">
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

Partners.propTypes = {
  partners: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  total: PropTypes.number.isRequired,
  fetchPartners: PropTypes.func.isRequired,
  deletePartner: PropTypes.func.isRequired
};

const mapStateToProps = ({ partners }) => ({
  partners: partners.list.ids.map(id => partners.byId[id]),
  page: partners.list.page,
  loading: partners.list.loading,
  total: partners.list.total
});

const mapDispatchToProps = {
  fetchPartners,
  deletePartner
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Partners);
