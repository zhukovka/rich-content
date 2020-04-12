import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/panelStyles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import { TITLE_FONT_STYLE } from 'wix-rich-content-editor-common';

const headingElement = (heading, isSelected, onClick, getContentForButton) => {
  const content = getContentForButton(heading);
  const font = TITLE_FONT_STYLE[heading];
  return (
    <button
      className={isSelected ? styles.headingsPanel_selectedHeading : ''}
      key={heading}
      onClick={() => onClick(font, heading)}
    >
      {content}
    </button>
  );
};

const desktopPanel = ({ customHeadingsOptions, selected, onSave, styles, getContentForButton }) => (
  <div className={styles.headingsPanel}>
    {customHeadingsOptions.map(heading => {
      return headingElement(heading, selected === heading, onSave, getContentForButton);
    })}
  </div>
);

const mobilePanel = ({ customHeadingsOptions, selected, styles, onSave, getContentForButton }) => (
  <div className={styles.headingsMobilePanel}>
    <div className={styles.headingsMobilePanel_fonts}>
      {customHeadingsOptions.map(heading =>
        headingElement(heading, selected === heading, onSave, getContentForButton)
      )}
    </div>
  </div>
);

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = { heading: props.heading };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  onBlur = e => {
    const { target, relatedTarget, currentTarget } = e;
    if (!currentTarget.contains(relatedTarget)) {
      setTimeout(() => target.focus());
    }
  };
  onSaveHeading = (font, headingName) => {
    return this.props.onSave(font, headingName);
  };
  render() {
    const { t, isMobile, getContentForButton, customHeadingsOptions } = this.props;
    const { heading } = this.state;
    const { styles } = this;
    const selected = heading;

    const panel = isMobile
      ? mobilePanel({
          styles,
          selected,
          t,
          onSave: this.onSaveHeading,
          getContentForButton,
          customHeadingsOptions,
        })
      : desktopPanel({
          styles,
          selected,
          t,
          onSave: this.onSaveHeading,
          getContentForButton,
          customHeadingsOptions,
        });

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onBlur={this.onBlur}
        className={classNames(styles.headingsPanelContainer, {
          [styles.headingsPanelContainer_mobile]: isMobile,
        })}
      >
        {panel}
      </div>
    );
  }
}

Panel.propTypes = {
  isMobile: PropTypes.bool,
  onSave: PropTypes.func,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  customSettings: PropTypes.object,
  heading: PropTypes.string,
  getContentForButton: PropTypes.func,
  customHeadingsOptions: PropTypes.array,
};

Panel.defaultProps = { heading: 'P' };

desktopPanel.propTypes = {
  onSave: PropTypes.func,
  selected: PropTypes.any,
  styles: PropTypes.object,
  t: PropTypes.func.isRequired,
  customHeadingsOptions: PropTypes.array,
  getContentForButton: PropTypes.func,
};

mobilePanel.propTypes = {
  onSave: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  customHeadingsOptions: PropTypes.array,
  getContentForButton: PropTypes.func,
};
