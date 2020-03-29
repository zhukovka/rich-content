/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import cls from 'classnames';

import { getImageSrc } from 'wix-rich-content-common';
import { FileInput } from 'wix-rich-content-editor-common';

import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';
import { LoaderIcon } from '../../assets/icons';

import { ImageUploadPropTypes } from './types';
import styles from './image-upload.scss';

class ImageUploadComponent extends PureComponent {
  static propTypes = {
    ...ImageUploadPropTypes,
    ...RCEHelpersPropTypes,
  };

  state = {
    value: this.props.value || this.getImageFromPool(),
    loading: false,
  };

  $container = React.createRef();

  getImageFromPool() {
    const { imagesPool } = this.props;

    return imagesPool[Math.floor(Math.random() * imagesPool.length)];
  }

  componentDidMount() {
    const { value, rce } = this.props;

    if (!value && !rce.isViewMode) {
      this.sync();
    }
  }

  async sync() {
    this.setState({ loading: true });

    try {
      await this.props.onChange(this.state.value);
      this.setState({ value: this.props.value });
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  }

  handleFileUpload = ({ data }) => {
    const { helpers } = this.props;
    const { $container } = this;

    const { width, height } = $container.current.getBoundingClientRect();

    this.setState(
      {
        value: getImageSrc(data, helpers, {
          requiredWidth: width,
          requiredHeight: height,
          requiredQuality: 90,
          imageType: 'highRes',
        }),
      },
      () => this.sync()
    );
  };

  handleFileReadLoad = (value, file) => {
    const { helpers } = this.props.rce;

    this.setState({ value });

    helpers?.onFilesChange?.(file, this.handleFileUpload);
  };

  handleFileChange = ([file]) => {
    const reader = new FileReader();

    reader.onload = e => this.handleFileReadLoad(e.target.result, file);

    reader.readAsDataURL(file);

    this.props.rce.setInPluginEditingMode(false);
  };

  render() {
    const { className, rce, style = {} } = this.props;
    const { value, loading } = this.state;

    if (rce.isViewMode) {
      return (
        <div
          className={cls(styles.container, className)}
          style={{ ...style, backgroundImage: `url('${value}')` }}
        />
      );
    }

    return (
      <FileInput onChange={this.handleFileChange} theme={rce.theme} tabIndex={-1}>
        <div
          ref={this.$container}
          className={cls(styles.container, styles.clickable, className)}
          style={{ ...style, backgroundImage: `url('${value}')` }}
        >
          <div
            className={cls(styles.overlay, {
              [styles.shown]: loading,
            })}
          >
            {loading ? (
              <LoaderIcon width={48} height={48} className={styles.spinner} />
            ) : (
              <p>Change Feature Image </p>
            )}
          </div>
        </div>
      </FileInput>
    );
  }
}

export const ImageUpload = withRCEHelpers(ImageUploadComponent);
