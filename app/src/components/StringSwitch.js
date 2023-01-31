import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

class StringSwitch extends React.Component {
  handleChange = (checked, event) => {
    const { onChange } = this.props;

    onChange && onChange(checked ? 'true' : 'false', event);
  };

  render() {
    const { value, onChange, ...props } = this.props;

    return (
      <Switch
        checked={value === 'true'}
        onChange={this.handleChange}
        {...props}
      />
    );
  }

}
StringSwitch.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any
};
export default StringSwitch;
