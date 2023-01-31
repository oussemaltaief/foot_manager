import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'antd';

import { convertTableMeta } from '../../../utils/helpers';
import textFilter from '../../../utils/text-filter';
import { Actions, DataTable } from '../../../components';

import { fetchCategories, deleteCategory } from './categories-list.ducks';

class Categories extends Component {
  componentDidMount() {
    this.getCategoriesData({ page: 1 });
  }

  getCategoriesData = async ({ page, limit = 10, filter, sort }) => {
    this.props.fetchCategories({ page, limit, filter, sort });
  };

  onTableChange = (pagination, filters, sorter) => {
    this.getCategoriesData(
      convertTableMeta(pagination, filters, sorter, { name: 'regex' })
    );
  };

  render() {
    const { loading, page, total, categories } = this.props;

    const columns = [
      {
        title: 'Désignation',
        dataIndex: 'designation',
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
            selectUrl={`/categories/${record._id}`}
            onDelete={() => {
              record.deleted = true;
              this.props.deleteCategory(record._id, record);
            }}
          />
        )
      }
    ];

    return (
      <div>
        <Row>
          <Col>
            <h1>Liste des Catégories</h1>
            <DataTable
              loading={loading}
              dataSource={categories}
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
            <Link to="/categories/new">
              <Button type="primary" icon="plus-square-o">
                Ajouter Catégorie
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

Categories.propTypes = {
  auth: PropTypes.object.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired
};

const mapStateToProps = ({
  categories: {
    byId,
    list: { ids, loading, total, page }
  },
  auth
}) => {
  return {
    auth,
    userType: auth.user.type,
    categories: ids.map(id => byId[id]),
    page,
    loading,
    total
  };
};

const mapDispatchToProps = {
  fetchCategories,
  deleteCategory
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Categories);
