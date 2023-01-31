import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

class SearchableSelect extends React.Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        {...props}
      >
        {children}
      </Select>
    );
  }
}

SearchableSelect.propTypes = {
  children: PropTypes.any
};

export default SearchableSelect;
