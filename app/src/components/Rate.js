import React from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';

class RateString extends React.Component {
  handleChange = value => {
    const { onChange } = this.props;
    const rate = value.toString();
    onChange && onChange(rate);
  };

  render() {
    const { value, onChange, ...props } = this.props;

    return (
      <Rate value={parseFloat(value)} onChange={this.handleChange} {...props} />
    );
  }
}
RateString.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any
};

export default RateString;
