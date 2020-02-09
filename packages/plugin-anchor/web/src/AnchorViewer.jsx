import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate, pluginAnchorSchema } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import styles from '../statics/anchor-viewer.scss';
import classNames from 'classnames';
import AnchorIcon from './icons/anchor-icon.svg';
import DragAndDropIcon from './icons/drag-and-drop-dots.svg';
import { ANCHOR_PLUGIN_PRE_NAME } from 'wix-rich-content-editor-common';

class AnchorViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
    renderInEditor: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    validate(props.componentData, pluginAnchorSchema);
    this.state = { styles };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginAnchorSchema);
    }
  }

  componentDidMount() {
    const { theme } = this.props;
    this.setState({ styles: mergeStyles({ styles, theme }) });
  }

  render() {
    const { componentData, anchorTarget, renderInEditor } = this.props;
    const { target, name } = componentData;
    const anchorProps = {
      name: renderInEditor
        ? `${ANCHOR_PLUGIN_PRE_NAME.HTML_PRE_NAME}-editor-${name}`
        : `${ANCHOR_PLUGIN_PRE_NAME.HTML_PRE_NAME}-${name}`,
      target: target ? target : anchorTarget || '_self',
      className: this.state.styles.anchorViewer,
    };
    return (
      <div
        className={classNames(this.state.styles.anchorViewer_dividerContainer, {
          [this.state.styles.anchorViewer_invisibleDividerContainer]: !renderInEditor,
        })}
      >
        <a {...anchorProps}>{''}</a>
        {!!renderInEditor && [
          <svg key="line" className={this.state.styles.anchorViewer_anchorPluginDivider}>
            <line x2="100%" />
          </svg>,
          <div key="name" className={this.state.styles.anchorViewer_anchorDividerLabel}>
            <div className={this.state.styles.anchorViewer_iconsAndNameWrapper}>
              <AnchorIcon className={this.state.styles.anchorViewer_anchorIcon} />
              <div className={this.state.styles.anchorViewer_nameLabel}>{name}</div>
              <DragAndDropIcon className={this.state.styles.anchorViewer_dragAndDropIcon} />
            </div>
          </div>,
        ]}
      </div>
    );
  }
}

export default AnchorViewer;
