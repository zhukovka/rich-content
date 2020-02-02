import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate, Context, pluginAnchorSchema } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import styles from '../statics/anchor-viewer.rtlignore.scss';

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
    const theme = this.context && this.context.theme;
    this.setState({ styles: mergeStyles({ styles, theme }) });
  }

  render() {
    const { componentData, anchorTarget, renderInEditor } = this.props;
    const { target, name } = componentData;
    const anchorProps = {
      name: renderInEditor ? `editor-${name}` : name,
      target: target ? target : anchorTarget || '_self',
      className: this.state.styles.anchorViewer,
    };
    return (
      <div className={this.state.styles.dividerContainer}>
        <a {...anchorProps}>{''}</a>
        <svg className={this.state.styles.divider}>
          <line x2="100%" />
        </svg>
      </div>
    );
  }
}

AnchorViewer.contextType = Context.type;

export default AnchorViewer;
