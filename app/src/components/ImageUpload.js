import React from 'react';
import PropTypes from 'prop-types';
import { Button, Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  // return isJPG && isLt2M;
  return false;
}
class ImageUpload extends React.Component {
  state = {
    loading: false
  };

  handleChange = info => {
    getBase64(info.file, imageUrl => {
      this.setState({
        loading: false
      });
      this.props.onChange(imageUrl);
    });
  };

  clear = () => {
    this.props.onChange('');
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Sélectionner</div>
      </div>
    );

    const imageUrl = this.props.value;

    return (
      <React.Fragment>
        <Upload
          name={this.props.id}
          listType="picture-card"
          className={this.props.className}
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={this.props.id}
              style={{ width: '100%', height: 'auto' }}
            />
          ) : (
            (!this.props.disabled && uploadButton) || <div />
          )}
        </Upload>
        {!this.props.disabled &&
          imageUrl && <Button onClick={this.clear}>Effacer</Button>}
      </React.Fragment>
    );
  }
}

ImageUpload.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

export default ImageUpload;
