/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/link-panel.scss';

class AnchorableElement extends PureComponent {
  styles = mergeStyles({ styles, theme: this.props.theme });
  inlineBlocksTypes = {
    unstyled: { thumbnail: 'T', type: 'Text', content: this.props.block.text },
    'header-two': { thumbnail: 'H', type: 'Header', content: this.props.block.text },
    'header-three': { thumbnail: 'H', type: 'Header', content: this.props.block.text },
  };
  atomicBlocksTypes = {
    'wix-draft-plugin-image': {
      thumbnail: 'I',
      type: 'Image',
      content: `Image ${this.props.block.index}`,
    },
    'wix-draft-plugin-gallery': {
      thumbnail: 'G',
      type: 'Gallery',
      content: `Gallery ${this.props.block.index}`,
    },
  };

  getContentByField = field => {
    const { block } = this.props;
    if (block.type === 'atomic') {
      return <div>{this.atomicBlocksTypes[block.contentEntity][field]}</div>;
    } else {
      return <div>{this.inlineBlocksTypes[block.type][field]}</div>;
    }
  };

  render() {
    return (
      <div className={this.styles.AnchorableElement_container}>
        <div className={this.styles.AnchorableElement_thumbnail}>
          {this.getContentByField('thumbnail')}
        </div>
        <div className={this.styles.AnchorableElement_contentContainer}>
          <div className={this.styles.AnchorableElement_contentType}>
            {this.getContentByField('type')}
          </div>
          <div>{this.getContentByField('content')}</div>
        </div>
      </div>
    );
  }

  static propTypes = {
    block: PropTypes.object,
    theme: PropTypes.object,
  };
}

class LinkToAnchorPanel extends Component {
  state = { showValidation: false };
  styles = mergeStyles({ styles, theme: this.props.theme });

  componentDidMount() {
    this.onChange({ isValid: this.isValidUrl(this.props.linkValues.url), isLinkToAnchor: true });
  }

  handleUrlChange = url => {
    this.setState({ showValidation: false });
    this.onChange({
      url,
      isValid: this.isValidUrl(url),
      isLinkToAnchor: true,
    });
  };

  onChange = changes => {
    this.props.onChange({ ...this.props.linkValues, ...changes });
  };

  handleKeyDown = e => {
    const { onEnter, onEscape } = this.props;
    if (e.key === 'Enter') {
      this.setState({ showValidation: true });
      e.preventDefault();
      onEnter && onEnter(e);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onEscape && onEscape(e);
    }
  };

  isValidUrl = () => {
    return true;
  };
  // isValidUrl = url => {
  //   return !url || this.props.anchorsEntities.some(anchor => anchor.data.name === url);
  // };

  getAnchorInputProps() {
    const { styles } = this;
    return {
      type: 'string',
      className: styles.linkPanel_textInput,
      placeholder: this.props.placeholder || this.props.t('LinkPanel_Anchor_Placeholder'),
      'data-hook': 'anchorLinkPanelInput',
      onBlur: () => this.setState({ showValidation: true }),
    };
  }

  render() {
    const { styles } = this;
    const { ariaProps, t, anchorableBlocks } = this.props;

    return (
      <div className={styles.linkPanel_Content} {...ariaProps} role="form">
        <div className={styles.LinkToAnchorPanel_header}>
          <div>{t('LinkPanel_Anchor_Placeholder')}</div>
          <div>filter</div>
        </div>
        <div className={styles.LinkToAnchorPanel_anchorsElementsContainer}>
          {anchorableBlocks.map((block, i) => (
            <AnchorableElement key={i} block={block} />
          ))}
        </div>
      </div>
    );
  }
}

LinkToAnchorPanel.propTypes = {
  anchorableBlocks: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  linkValues: PropTypes.shape({
    url: PropTypes.string,
    isValid: PropTypes.bool,
    targetBlank: PropTypes.bool,
    nofollow: PropTypes.bool,
  }).isRequired,
  ariaProps: PropTypes.object,
  dropDown: PropTypes.object,
  onEnter: PropTypes.func,
  onEscape: PropTypes.func,
  placeholder: PropTypes.string,
};
export default LinkToAnchorPanel;
