import React from 'react';
import PropTypes from 'prop-types';
import { Carousel   } from 'antd';

class CarouselUpload extends React.Component {
  handleChange = (value) => {
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  render() {
    const { value, onChange, ...props } = this.props;

    return (
      <Carousel
        afterChange={this.handleChange}
        {...props}
      >
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
    );
  }
}

CarouselUpload.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any
};

export default CarouselUpload;
