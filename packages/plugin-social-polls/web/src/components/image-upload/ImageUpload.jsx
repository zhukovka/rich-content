/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import cls from 'classnames';

import Measure from 'react-measure';
import imageClientAPI from 'image-client-api';
import { debounce } from 'lodash';

import { FileInput } from 'wix-rich-content-editor-common';

import { withRCEHelpers, RCEHelpersPropTypes } from '../rce-helpers-context';
import { LoaderIcon, ReplaceIcon } from '../../assets/icons';
import { getRandomValue, getImageSrc, getBackgroundString } from '../../helpers';
import { BACKGROUND_TYPE } from '../../constants';

import { ImageUploadPropTypes } from './types';
import styles from './image-upload.scss';

class ImageUploadComponent extends PureComponent {
  static propTypes = {
    ...ImageUploadPropTypes,
    ...RCEHelpersPropTypes,
  };

  static defaultProps = {
    imagesPool: [],
    disabled: false,
  };

  state = {
    value: this.props.value || getRandomValue(this.props.imagesPool),
    backgroundImage: null,
    loading: false,
    bounds: null,
  };

  componentDidMount() {
    const { value, rce } = this.props;

    if (!value && !rce.isViewMode) {
      this.sync();
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.value !== props.value) {
      this.setState(
        {
          value: props.value,
        },
        () => this.updateBackgroundImage()
      );
    }
  }

  sync() {
    this.props.onChange(this.state.value);
  }

  onResize = debounce(({ bounds }) => this.handleResize(bounds), 100);

  updateBackgroundImage() {
    const { bounds, value } = this.state;

    if (!bounds) {
      return null;
    }

    const backgroundImage = `url(${getImageSrc(value, bounds.width, bounds.height)})`;

    this.setState(() => ({
      backgroundImage,
    }));
  }

  handleResize({ width, height }) {
    this.setState(
      {
        bounds: { width, height },
      },
      () => this.updateBackgroundImage()
    );
  }

  handleFileUpload = ({ data }) => {
    this.setState(
      {
        value: data.file_name,
        loading: false,
      },
      () => {
        this.updateBackgroundImage();
        this.sync();
      }
    );
  };

  handleFileReadLoad = (backgroundImage, file) => {
    const { helpers } = this.props.rce;

    this.setState({ backgroundImage: `url(${backgroundImage})`, loading: false });

    if (helpers?.handleFileUpload) {
      this.setState({ loading: true });
      helpers.handleFileUpload(file, this.handleFileUpload);
    }
  };

  handleFileChange = ([file]) => {
    const reader = new FileReader();

    this.setState({ loading: true });

    reader.onload = e => this.handleFileReadLoad(e.target.result, file);
    reader.readAsDataURL(file);
  };

  render() {
    const { className, rce, small, disabled, style = {} } = this.props;
    const { loading, backgroundImage } = this.state;

    return (
      <Measure bounds onResize={this.onResize}>
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className={cls(styles.container, className, {
              [styles.disabled]: rce.isViewMode || disabled,
            })}
            style={{ ...style, backgroundImage }}
          >
            <FileInput
              disabled={rce.isViewMode || disabled}
              accept="image/gif, image/jpeg, image/jpg, image/png"
              onChange={this.handleFileChange}
              theme={rce.theme}
              tabIndex={-1}
            >
              <div
                className={cls(styles.overlay, {
                  [styles.shown]: loading,
                })}
              >
                {loading ? (
                  <LoaderIcon
                    width={small ? 24 : 48}
                    height={small ? 24 : 48}
                    className={styles.spinner}
                  />
                ) : (
                  <>
                    <ReplaceIcon />
                    <p
                      className={cls(styles.text, {
                        [styles.hide]: small,
                      })}
                    >
                      Change Image
                    </p>
                  </>
                )}
              </div>
            </FileInput>
          </div>
        )}
      </Measure>
    );
  }
}

export const ImageUpload = withRCEHelpers(ImageUploadComponent);
