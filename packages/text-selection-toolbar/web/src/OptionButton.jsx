import PropTypes from 'prop-types';
import React from 'react';
import styles from '../statics/styles/viewer-inline-toolbar.rtlignore.scss';

const OptionButton = ({ currentOption, selectedText }) => {
  const action = () => currentOption.action(selectedText);
  const option = currentOption.buttonText;
  const icon = currentOption.icon;
  return (
    <button key={option} className={styles.option} onClick={action}>
      {icon}
    </button>
  );
};

OptionButton.propTypes = {
  currentOption: PropTypes.object.isRequired,
  selectedText: PropTypes.string.isRequired,
};

export default OptionButton;
