import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate, pluginPaywallSchema } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import styles from '../../statics/styles/paywall-viewer.rtlignore.scss';

class PaywallComponent extends PureComponent {
  constructor(props) {
    super(props);
    validate(props.componentData, pluginPaywallSchema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginPaywallSchema);
    }
  }

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return (
      <div className={this.styles.paywallDividerContainer} data-hook={'paywall-wrapper'}>
        <svg key="line" className={this.styles.paywallDivider}>
          <line x2="100%" />
        </svg>
        <div className={this.styles.paywallDividerLabel}>
          <div className={this.styles.paywallIconsAndNameWrapper}>
            <div className={this.styles.paywallNameLabel}>Paid Content</div>
          </div>
        </div>
      </div>
    );
  }
}

PaywallComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object,
  store: PropTypes.object,
  blockProps: PropTypes.object,
  className: PropTypes.string,
  theme: PropTypes.object.isRequired,
  getEditorBounds: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default PaywallComponent;
