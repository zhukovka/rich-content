import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate, verticalEmbedSchema } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
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

  stateFromProps = () => {
    return {};
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const { componentData, className } = this.props;
    const { selectedProduct } = componentData;
    const { html } = selectedProduct;

    return (
      <div className={className} data-hook="vertical-embed">
        {/* eslint-disable-next-line react/no-danger*/}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}

VerticalEmbedComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default VerticalEmbedComponent;
