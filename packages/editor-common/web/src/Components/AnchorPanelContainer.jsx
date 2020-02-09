import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AnchorPanel from './AnchorPanel';
import FocusManager from './FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/anchor-panel.scss';

class AnchorPanelContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { name } = this.props;
    this.existingName = name;
    this.state = {
      anchorPanelValues: { name },
    };
  }

  onDone = () => {
    const { anchorPanelValues } = this.state;
    if (anchorPanelValues.isValid && anchorPanelValues.name) {
      this.props.onDone(anchorPanelValues);
    }
  };

  onCancel = () => this.props.onCancel();

  render() {
    const { styles } = this;
    const { theme, isMobile, t, ariaProps, tabIndex, uiSettings, anchorsEntities } = this.props;
    const doneButtonText = t('AnchorPanelContainer_DoneButton');
    const cancelButtonText = t('AnchorPanelContainer_CancelButton');
    const doneButtonClassName = classNames(
      styles.anchorPanel_FooterButton,
      styles.anchorPanel_enabled
    );
    const cancelButtonClassName = classNames(
      styles.anchorPanel_FooterButton,
      styles.anchorPanel_Cancel
    );
    const anchorPanelContainerClassName = classNames(styles.anchorPanel_container, {
      [styles.anchorPanel_container_isMobile]: isMobile,
    });

    const anchorPanelAriaProps = { 'aria-label': 'Anchor management' };
    return (
      <FocusManager
        className={anchorPanelContainerClassName}
        data-hook="anchorPanelContainer"
        role="form"
        {...ariaProps}
      >
        <div className={styles.anchorPanel_content}>
          <AnchorPanel
            existingName={this.existingName}
            onEnter={this.onDone}
            onEscape={this.onCancel}
            linkValues={this.state.anchorPanelValues}
            onChange={anchorPanelValues => this.setState({ anchorPanelValues })}
            theme={theme}
            t={t}
            ariaProps={anchorPanelAriaProps}
            anchorsEntities={anchorsEntities}
            {...uiSettings.anchorPanel}
          />
          <div className={styles.anchorPanel_actionsDivider} role="separator" />
        </div>
        <div className={styles.anchorPanel_Footer}>
          <div className={styles.anchorPanel_FooterActions}>
            <button
              tabIndex={tabIndex}
              aria-label={cancelButtonText}
              className={cancelButtonClassName}
              data-hook="anchorPanelContainerCancel"
              onClick={this.onCancel}
            >
              {cancelButtonText}
            </button>
          </div>
          <button
            tabIndex={tabIndex}
            aria-label={doneButtonText}
            className={doneButtonClassName}
            data-hook="anchorPanelContainerDone"
            onClick={this.onDone}
          >
            {doneButtonText}
          </button>
        </div>
      </FocusManager>
    );
  }
}

AnchorPanelContainer.propTypes = {
  anchorsEntities: PropTypes.array.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  name: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  isActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  onOverrideContent: PropTypes.func,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
};

export default AnchorPanelContainer;
