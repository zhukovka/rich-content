import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import decorateComponentWithProps from 'decorate-component-with-props';

import Overlay from './overlay';
import Styles from './default-html-styles.scss';
import Themable from '~/Components/Themable';

const DEFAULTS = {
  src: null,
  config: {
    width: 200,
    height: 200,
    safe: true,
    isSrc: true,
  },
};

class HtmlComponent extends Themable {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.componentData.content !== nextProps.componentData.content) {
      this.fillIframeContent(nextProps.componentData);
    }
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    const { keyName, isActive } = (props.componentState && props.componentState.activeButton) || {};
    const inEditMode = keyName === 'edit' && isActive;
    return {
      inEditMode,
    };
  };

  fillIframeContent = data => {
    if (this.iframeRef) {
      if (data.content && !data.config.isSrc) {
        console.log('fillIframeContent data.content', data.content); //eslint-disable-line no-console
        this.iframeRef.contentWindow.postMessage(data.content, '*');
      }
    }
  };
  handleIframeLoad = () => {
    this.fillIframeContent(this.props.componentData);
  };
  setIframe = iframeRef => {
    this.iframeRef = iframeRef;
  };

  baseIframeContent = origin => {
    return (
      /* eslint-disable quotes */
      "<html><head><script>window.addEventListener('message', function(event) {if (event.origin.indexOf('" +
      origin +
      "')>=0) {document.body.innerHTML = event.data;}});</script></head><body></body></html>"
      /* eslint-disable quotes */
    );
  };

  getDefaultStyles() {
    return Styles;
  }

  getTheme() {
    return this.props.theme;
  }

  renderDesktop(styles) {
    const { blockProps, selection } = this.props;
    const isEditorFocused = selection && selection.getHasFocus();
    const { isFocused, readOnly } = blockProps || { readOnly: true };
    const data = this.props.componentData;
    data.config = data.config || {};

    const itemClassName = classNames(this.props.className, styles.itemContainer, {
      [styles.inChange]: this.state.inEditMode && isFocused && isEditorFocused,
    });

    const width = data.config.width || DEFAULTS.config.width;
    const height = data.config.height || DEFAULTS.config.height;

    const HTMLOverlay = decorateComponentWithProps(Overlay, { isVisible: readOnly, width, height });

    if (data.src && data.config.isSrc) {
      return (
        <div
          style={{ width: width + 'px', height: height + 'px', position: 'relative', margin: 'auto' }}
          className={classNames(this.props.className, itemClassName)}
        >
          <iframe
            src={data.src}
            allowTransparency
            scrolling="no"
            frameBorder="0"
            sandbox="allow-presentation allow-forms allow-same-origin allow-scripts"
            width={width}
            height={height}
            style={{ border: 'none', overflow: 'hidden', position: 'absolute', top: '0', left: '0' }}
          />
          <HTMLOverlay />
        </div>
      );
    } else if (data.content && !data.config.isSrc) {
      //draw content after iframe is loaded
      return (
        <div
          style={{ width: width + 'px', height: height + 'px', position: 'relative', margin: 'auto' }}
          className={classNames(this.props.className, itemClassName)}
        >
          <iframe
            ref={this.setIframe}
            onLoad={this.handleIframeLoad}
            srcDoc={this.baseIframeContent(window.origin)}
            sandbox="allow-presentation allow-forms allow-scripts"
            allowTransparency
            scrolling="no"
            frameBorder="0"
            width={width}
            height={height}
            style={{ border: 'none', overflow: 'hidden', position: 'absolute', top: '0', left: '0' }}
          />
          <HTMLOverlay />
        </div>
      );
    } else {
      return (
        <div onClick={this.props.onClick} className={classNames(this.props.className, styles.invalidGalleryItems)}>
          Please select an iframe source
        </div>
      );
    }
  }
}

HtmlComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export { HtmlComponent as Component, DEFAULTS };
