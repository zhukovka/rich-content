import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate, Context, verticalEmbedSchema } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import { getConfig } from '../toolbar/selectors';
import { customClassName } from '../classNameStrategies';
import styles from '../../statics/styles/vertical-embed-viewer.rtlignore.scss';

class VerticalEmbedComponent extends PureComponent {
  static customClassName = (componentData, theme, styles, isMobile) =>
    customClassName(componentData, theme, styles, isMobile);

  constructor(props) {
    super(props);
    validate(props.componentData, verticalEmbedSchema);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, verticalEmbedSchema);
    }
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = ({ componentData }) => {
    const config = getConfig(componentData);
    return {
      size: config.size,
      alignment: config.alignment,
    };
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    // NOTE: editor-only logic in viewer component
    const editorBounds = this.context.getEditorBounds && this.context.getEditorBounds();
    const editorWidth = editorBounds && editorBounds.width ? editorBounds.width : '100%';
    const { type, size, alignment } = this.state;
    const className = classNames(
      this.styles['vertical-embed-container'],
      this.styles[`vertical-embed-container--${type}`],
      this.context.isMobile && this.styles['vertical-embed-container--mobile'],
      this.props.className
    );
    return (
      <div className={className} data-hook="vertical-embed">
        Vertical embed plugin!
      </div>
    );
  }
}

VerticalEmbedComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  className: PropTypes.string,
};

VerticalEmbedComponent.contextType = Context.type;

export default VerticalEmbedComponent;
