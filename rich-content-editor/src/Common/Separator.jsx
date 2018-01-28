import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Styles from '~/Styles/toolbar-separator.scss';

const Separator = ({ className = '' }) => {
  const separatorClassNames = classNames(Styles.separator, className);
  return <div className={separatorClassNames} />;
};

Separator.propTypes = {
  className: PropTypes.string,
};

export default Separator;
