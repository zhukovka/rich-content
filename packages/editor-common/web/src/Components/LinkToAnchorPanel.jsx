/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, getImageSrc } from 'wix-rich-content-common';
import classNames from 'classnames';
import styles from '../../statics/styles/new-link-panel.scss';
import Dropdown from './Dropdown';
import { getAnchorableBlocks, filterAnchorableBlocks } from '../Utils/draftUtils';
import { ANCHORABLE_BLOCKS } from '../consts';

class LinkToAnchorPanel extends Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = {
      showValidation: false,
      filter: {
        value: 'all',
        component: () => (
          <FilterDropdownElement label={t('LinkTo_Modal_Section_Filter_All')} theme={this.styles} />
        ),
      },
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    const { anchorValues } = this.props;
    if (anchorValues.url) {
      const target = this.scrollRef.current;
      target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
    }
  }

  handleUrlChange = url => {
    this.setState({ showValidation: false });
    this.onChange({
      url,
      isValid: this.isValidUrl(url),
      isLinkToAnchor: true,
    });
  };

  onChange = (changes, options = {}) => {
    this.props.onChange({
      ...this.props.anchorValues,
      url: changes.key,
      defaultName: options.defaultName,
    });
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

  filterChanged = newFilter => {
    this.setState({ filter: newFilter });
  };

  dropdownOptions = options => {
    const { t } = this.props;
    const optionsArray = options.map(option => {
      return {
        value: option,
        component: () => (
          <FilterDropdownElement label={t(ANCHORABLE_BLOCKS[option].filter)} theme={this.styles} />
        ),
      };
    });
    return [
      {
        value: 'all',
        component: () => (
          <FilterDropdownElement
            label={this.props.t('LinkTo_Modal_Section_Filter_All')}
            theme={this.styles}
          />
        ),
      },
      ...optionsArray,
    ];
  };

  renderEmptyState = () => {
    const { styles } = this;
    const { t } = this.props;
    return (
      <div className={styles.linkPanel_emptyStateContainer}>
        <div className={styles.linkPanel_emptyStateTitle}>
          {t('LinkTo_Modal_Section_EmptyState_Title')}
        </div>
        <div className={styles.linkPanel_emptyStateText}>
          {t('LinkTo_Modal_Section_EmptyState_Text')}
        </div>
      </div>
    );
  };

  render() {
    const { styles } = this;
    const { filter } = this.state;
    const { ariaProps, t, getEditorState, anchorValues, onEnter } = this.props;
    const anchorableBlocksData = getAnchorableBlocks(getEditorState());
    const { anchorableBlocks, pluginsIncluded } = anchorableBlocksData;
    const filteredAnchorableBlocks =
      filter.value === 'all'
        ? anchorableBlocks
        : filterAnchorableBlocks(anchorableBlocks, filter.value);

    return anchorableBlocks.length === 0 ? (
      this.renderEmptyState()
    ) : (
      <div className={styles.linkPanel_Content} {...ariaProps} role="form">
        <div className={styles.LinkToAnchorPanel_header}>
          <div className={styles.LinkToAnchorPanel_title}>{t('LinkPanel_Anchor_Placeholder')}</div>
          <div className={styles.LinkToAnchorPanel_dropdownWrapper}>
            <Dropdown
              theme={styles}
              value={filter}
              options={this.dropdownOptions(pluginsIncluded)}
              controlClassName={styles.LinkToAnchorPanel_dropdownControl}
              menuClassName={styles.LinkToAnchorPanel_dropdownMenu}
              onChange={this.filterChanged}
            />
          </div>
        </div>
        <div className={styles.LinkToAnchorPanel_anchorsElementsContainer}>
          {filteredAnchorableBlocks.map((block, i) => (
            <div key={i} ref={anchorValues.url === block.key ? this.scrollRef : undefined}>
              <AnchorableElement
                block={block}
                theme={styles}
                onClick={args => this.onChange(block, { ...args })}
                isSelected={anchorValues.url === block.key}
                t={t}
                onEnter={onEnter}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

LinkToAnchorPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  anchorValues: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  ariaProps: PropTypes.object,
  dropDown: PropTypes.object,
  onEnter: PropTypes.func,
  onEscape: PropTypes.func,
  placeholder: PropTypes.string,
};
export default LinkToAnchorPanel;

class AnchorableElement extends PureComponent {
  styles = mergeStyles({ styles, theme: this.props.theme });

  getDataToDisplayByField = field => {
    const { block } = this.props;
    if (field === 'thumbnail' && !ANCHORABLE_BLOCKS[block.anchorType].thumbnail) {
      return this.getVisualThumbnail();
    } else {
      return ANCHORABLE_BLOCKS[block.anchorType][field];
    }
  };

  getContent = () => {
    const { block, t } = this.props;
    if (block.type === 'atomic') {
      return `${t(ANCHORABLE_BLOCKS[block.anchorType].type)} ${block.index}`;
    } else {
      return block.text;
    }
  };

  getVisualThumbnail = () => {
    const { block } = this.props;
    let src = {};
    switch (block.anchorType) {
      case 'wix-draft-plugin-image':
        src = block.data.src;
        break;
      // case 'wix-draft-plugin-video':
      //   if (block?.data?.src?.thumbnail?.pathname) {
      //     src.file_name = block?.data?.src?.thumbnail?.pathname;
      //   } else if (block?.data?.metadata?.thumbnail_url) {
      //     return (
      //       <img
      //         src={block?.data?.metadata?.thumbnail_url}
      //         alt={this.getContent()}
      //         style={{ width: 'inherit', height: 'inherit' }}
      //       />
      //     );
      //   }
      //   break;
      case 'wix-draft-plugin-gallery':
        src.file_name = block.data.items[0].url;
        break;
      default:
        // eslint-disable-next-line no-console
        console.error('Mismatch plugins');
        break;
    }
    const imgSrc = getImageSrc(src, null, {
      requiredWidth: 50,
      requiredHeight: 50,
      requiredQuality: 90,
      imageType: 'highRes',
    });
    return (
      <img
        src={imgSrc}
        alt={this.getContent()}
        style={{ width: 'inherit', height: 'inherit', objectFit: 'contain' }}
      />
    );
  };

  render() {
    const { styles } = this;
    const { onClick, isSelected, t, onEnter } = this.props;
    return (
      <div
        className={classNames(styles.AnchorableElement_container, {
          [styles.AnchorableElement_selected]: isSelected,
        })}
        onClick={() => onClick({ defaultName: this.getContent() })}
        onDoubleClick={() => onEnter && onEnter()}
      >
        <div className={styles.AnchorableElement_thumbnail}>
          {this.getDataToDisplayByField('thumbnail')}
        </div>
        <div className={styles.AnchorableElement_contentContainer}>
          <div className={styles.AnchorableElement_contentType}>
            {t(this.getDataToDisplayByField('type'))}
          </div>
          <div className={styles.AnchorableElement_blockContent}>{this.getContent()}</div>
        </div>
      </div>
    );
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    block: PropTypes.object,
    theme: PropTypes.object,
    isSelected: PropTypes.bool,
    onEnter: PropTypes.func,
  };
}

class FilterDropdownElement extends PureComponent {
  styles = mergeStyles({ styles, theme: this.props.theme });
  render() {
    const { label } = this.props;
    return <div className={this.styles.FilterDropdownElement}>{label}</div>;
  }

  static propTypes = {
    label: PropTypes.string,
    theme: PropTypes.object,
  };
}
