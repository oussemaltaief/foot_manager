import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

class DatePick extends React.Component {
  handleChange = (date, dateString) => {
    const { onChange } = this.props;

    onChange && onChange(moment(date).toDate());
  };

  render() {
    const { value, onChange, ...props } = this.props;

    return (
      <DatePicker
        value={moment(value)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
DatePick.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any
};
export default DatePick;
