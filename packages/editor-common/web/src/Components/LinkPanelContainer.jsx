/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkPanel from './LinkPanel';
import LinkToAnchorPanel from './LinkToAnchorPanel';
import FocusManager from './FocusManager';
import { mergeStyles, isValidUrl } from 'wix-rich-content-common';
import RadioGroupHorizontal from './RadioGroupHorizontal';
import styles from '../../statics/styles/link-panel.scss';
const LinkType = props => (
  <RadioGroupHorizontal
    dataSource={[
      { value: 'url', labelText: 'Website address (URL)' },
      { value: 'page', labelText: 'Site Page' },
    ]}
    {...props}
  />
);

LinkType.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

class LinkPanelContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    const { url, targetBlank, nofollow, anchorsEntities } = this.props;
    this.withAnchors = anchorsEntities ? anchorsEntities.length !== 0 : false;
    this.state = {
      linkPanelValues: { url, targetBlank, nofollow },
      activeTab: !url || isValidUrl(url) ? 'link' : 'anchor',
    };
  }

  onDone = () => {
    const { linkPanelValues } = this.state;
    if (linkPanelValues.isValid && linkPanelValues.url) {
      this.props.onDone(linkPanelValues);
    } else if (linkPanelValues.url === '') {
      this.onDelete();
    }
  };

  onDelete = () => {
    this.props.onDelete();
    this.onCancel();
  };

  onCancel = () => this.props.onCancel();

  changeTab = tab => {
    this.setState({ activeTab: tab });
  };

  renderTabs = () => {
    const { styles } = this;
    const { t } = this.props;

    return (
      <div>
        <div className={styles.linkPanel_tabsWrapper}>
          <div
            className={classNames(styles.linkPanel_tab, {
              [styles.linkPanel_tabSelected]: this.state.activeTab === 'link',
            })}
            onClick={() => this.changeTab('link')}
          >
            {t('LinkPanel_LinkTab')}
          </div>
          <div
            className={classNames(styles.linkPanel_tab, {
              [styles.linkPanel_tabSelected]: this.state.activeTab === 'anchor',
            })}
            onClick={() => this.changeTab('anchor')}
          >
            {t('LinkPanel_AnchorTab')}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { styles } = this;
    const {
      theme,
      isActive,
      anchorTarget,
      relValue,
      isMobile,
      t,
      ariaProps,
      tabIndex,
      uiSettings,
    } = this.props;
    const { activeTab } = this.state;
    const doneButtonText = t('LinkPanelContainer_DoneButton');
    const cancelButtonText = t('LinkPanelContainer_CancelButton');
    const removeButtonText = t('LinkPanelContainer_RemoveButton');
    const doneButtonClassName = classNames(styles.linkPanel_FooterButton, styles.linkPanel_enabled);
    const cancelButtonClassName = classNames(
      styles.linkPanel_FooterButton,
      styles.linkPanel_Cancel
    );
    const removeButtonClassName = classNames(styles.linkPanel_FooterButton);
    const linkPanelContainerClassName = classNames(styles.linkPanel_container, {
      [styles.linkPanel_container_isMobile]: isMobile,
    });

    const { linkPanel } = uiSettings || {};
    const { blankTargetToggleVisibilityFn, nofollowRelToggleVisibilityFn } = linkPanel || {};
    const showTargetBlankCheckbox =
      blankTargetToggleVisibilityFn && blankTargetToggleVisibilityFn(anchorTarget);
    const showRelValueCheckbox =
      nofollowRelToggleVisibilityFn && nofollowRelToggleVisibilityFn(relValue);

    const linkPanelAriaProps = { 'aria-label': 'Link management' };
    return (
      <FocusManager
        className={linkPanelContainerClassName}
        data-hook="linkPanelContainer"
        role="form"
        {...ariaProps}
      >
        <div className={styles.linkPanel_content}>
          {this.withAnchors && this.renderTabs()}
          {activeTab === 'link' ? (
            <LinkPanel
              anchorsEntities={this.props.anchorsEntities}
              onEnter={this.onDone}
              onEscape={this.onCancel}
              linkValues={this.state.linkPanelValues}
              onChange={linkPanelValues => this.setState({ linkPanelValues })}
              theme={theme}
              showTargetBlankCheckbox={showTargetBlankCheckbox}
              showRelValueCheckbox={showRelValueCheckbox}
              t={t}
              ariaProps={linkPanelAriaProps}
              {...uiSettings.linkPanel}
            />
          ) : (
            <LinkToAnchorPanel
              anchorsEntities={this.props.anchorsEntities}
              onEnter={this.onDone}
              onEscape={this.onCancel}
              linkValues={this.state.linkPanelValues}
              onChange={linkPanelValues => this.setState({ linkPanelValues })}
              theme={theme}
              t={t}
              ariaProps={linkPanelAriaProps}
              {...uiSettings.linkPanel}
            />
          )}
          <div className={styles.linkPanel_actionsDivider} role="separator" />
        </div>
        <div className={styles.linkPanel_Footer}>
          <div className={styles.linkPanel_FooterActions}>
            <button
              tabIndex={tabIndex}
              aria-label={cancelButtonText}
              className={cancelButtonClassName}
              data-hook="linkPanelContainerCancel"
              onClick={this.onCancel}
            >
              {cancelButtonText}
            </button>
            {isActive && (
              <div className={styles.linkPanel_RemoveContainer}>
                <div className={styles.linkPanel_VerticalDivider} />
                <button
                  tabIndex={tabIndex}
                  aria-label={removeButtonText}
                  className={removeButtonClassName}
                  data-hook="linkPanelContainerRemove"
                  onClick={this.onDelete}
                >
                  {removeButtonText}
                </button>
              </div>
            )}
          </div>
          <button
            tabIndex={tabIndex}
            aria-label={doneButtonText}
            className={doneButtonClassName}
            data-hook="linkPanelContainerDone"
            onClick={this.onDone}
          >
            {doneButtonText}
          </button>
        </div>
      </FocusManager>
    );
  }
}

LinkPanelContainer.propTypes = {
  anchorsEntities: PropTypes.array.isRequired,
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  url: PropTypes.string,
  targetBlank: PropTypes.bool,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  nofollow: PropTypes.bool,
  isActive: PropTypes.bool,
  isMobile: PropTypes.bool,
  onOverrideContent: PropTypes.func,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
};

export default LinkPanelContainer;
