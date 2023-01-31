import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Icon, Table } from 'antd';

class DataTable extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    pagination: PropTypes.object
  };

  state = {
    filteredInfo: {},
    sortedInfo: {}
  };

  resetFilters = () => {
    this.onTableChange(this.props.pagination, {}, this.state.sortedInfo);
  };

  resetSorters = () => {
    this.onTableChange(this.props.pagination, this.state.filteredInfo, {});
  };

  onTableChange = (pagination, filters, sorter) => {
    filters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key] && filters[key].length) {
        acc[key] = filters[key];
      }

      return acc;
    }, {});

    this.setState({ filteredInfo: filters, sortedInfo: sorter });
    this.props.onChange(pagination, filters, sorter);
  };

  render() {
    const { filteredInfo, sortedInfo } = this.state;
    const { columns, ...tableProps } = this.props;

    const enhancedColumns = columns.map(col => {
      const key = col.key || col.dataIndex;

      const enhanced = key
        ? {
            ...col,
            sortOrder: sortedInfo.columnKey === key && sortedInfo.order,
            filteredValue: filteredInfo[key] || null
          }
        : col;

      return enhanced;
    });

    return (
      <React.Fragment>
        <Row style={{ marginBottom: 16 }} type="flex" justify="end" gutter={8}>
          <Col>
            <Button
              type="primary"
              disabled={!Object.keys(filteredInfo).length}
              onClick={this.resetFilters}
            >
              <Icon type="filter" /> RAZ filtres
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={!Object.keys(sortedInfo).length}
              onClick={this.resetSorters}
            >
              <Icon type="sort-ascending" /> RAZ tris
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              {...tableProps}
              columns={enhancedColumns}
              onChange={this.onTableChange}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default DataTable;
