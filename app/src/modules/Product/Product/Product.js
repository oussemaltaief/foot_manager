import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Avatar } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import Actions from '../../../components/Actions/Actions';
import textFilter from '../../../utils/text-filter';
import DataTable from '../../../components/DataTable';

import { deleteProduct, fetchProduct } from './product-list.ducks';

class Products extends Component {
  componentDidMount() {
    this.getProductsData({ page: 1 });
  }

  getProductsData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchProduct({
      page,
      limit,
      filter: { ...filter },
      sort
    });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getProductsData(convertTableMeta(pagination, filters, sorter));
  };

  getData = (testSearch, searchWithAND) => {
    this.getProductsData({ page: 1 });
  };

  render() {
    const { loading, page, total, products } = this.props;

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
        title: 'Désignation',
        dataIndex: 'designation',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Description',
        dataIndex: 'description',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Prix',
        dataIndex: 'price',
        sorter: true,
        ...textFilter(this, 'nameInput')
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Actions
            showDelete
            selectUrl={`/products/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteProduct(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Gestion des produits</h1>
            <DataTable
              loading={loading}
              dataSource={products}
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
            <Link to="/products/new">
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

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  total: PropTypes.number.isRequired,
  fetchProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};

const mapStateToProps = ({ products }) => ({
  products: products.list.ids.map(id => products.byId[id]),
  page: products.list.page,
  loading: products.list.loading,
  total: products.list.total
});

const mapDispatchToProps = {
  fetchProduct,
  deleteProduct
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Products);
