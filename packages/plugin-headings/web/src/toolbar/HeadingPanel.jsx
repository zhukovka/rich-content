import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/panelStyles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import { HEADER_TYPE_MAP } from 'wix-rich-content-editor-common';

const headingElement = (heading, isSelected, onClick, translateHeading) => {
  const content = translateHeading(heading);
  const type = HEADER_TYPE_MAP[heading];
  return (
    <button
      className={isSelected ? styles.headingsPanel_selectedHeading : ''}
      key={heading}
      onClick={() => onClick(type, heading)}
    >
      {content}
    </button>
  );
};

const desktopPanel = ({ customHeadingsOptions, selected, onSave, styles, translateHeading }) => (
  <div className={styles.headingsPanel}>
    {customHeadingsOptions.map(heading => {
      return headingElement(heading, selected === heading, onSave, translateHeading);
    })}
  </div>
);

const mobilePanel = ({ customHeadingsOptions, selected, styles, onSave, translateHeading }) => (
  <div className={styles.headingsMobilePanel}>
    <div className={styles.headingsMobilePanel_types}>
      {customHeadingsOptions.map(heading =>
        headingElement(heading, selected === heading, onSave, translateHeading)
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
  onSaveHeading = (type, headingName) => {
    return this.props.onSave(type, headingName);
  };
  render() {
    const { t, isMobile, translateHeading, customHeadingsOptions } = this.props;
    const { heading } = this.state;
    const { styles } = this;
    const selected = heading;

    const panel = isMobile
      ? mobilePanel({
          styles,
          selected,
          t,
          onSave: this.onSaveHeading,
          translateHeading,
          customHeadingsOptions,
        })
      : desktopPanel({
          styles,
          selected,
          t,
          onSave: this.onSaveHeading,
          translateHeading,
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
  translateHeading: PropTypes.func,
  customHeadingsOptions: PropTypes.array,
};

Panel.defaultProps = { heading: 'P' };

desktopPanel.propTypes = {
  onSave: PropTypes.func,
  selected: PropTypes.any,
  styles: PropTypes.object,
  t: PropTypes.func.isRequired,
  customHeadingsOptions: PropTypes.array,
  translateHeading: PropTypes.func,
};

mobilePanel.propTypes = {
  onSave: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  customHeadingsOptions: PropTypes.array,
  translateHeading: PropTypes.func,
};
