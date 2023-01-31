import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover } from 'antd';
import { SketchPicker } from 'react-color';

class ColorInput extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  state = {
    visible: false
  };

  toggle = () => {
    this.setState(state => ({ visible: !state.visible }));
  };

  handleChangeComplete = color => {
    typeof this.props.onChange === 'function' && this.props.onChange(color.hex);
  };

  render() {
    return (
      <Popover
        overlayClassName="color-popover"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.toggle}
        content={
          <SketchPicker
            color={this.props.value}
            onChangeComplete={this.handleChangeComplete}
          />
        }
      >
        <Button
          disabled={this.props.disabled}
          style={{
            backgroundColor: this.props.value
          }}
        />
      </Popover>
    );
  }
}

export default ColorInput;
