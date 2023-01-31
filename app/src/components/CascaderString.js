import React from 'react';
import PropTypes from 'prop-types';
import { Cascader  } from 'antd';

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

class StringSwitch extends React.Component {
  handleChange = (value) => {
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  render() {
    const { value, onChange, ...props } = this.props;

    return (
      <Cascader
        placeholder="Sélectionner"
        options={options}
        onChange={this.handleChange}
        value={value}
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
