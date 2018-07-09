import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
};

const HeaderOneDecoration = ({ theme, children }) => <h2 className={theme.headerOne}>{children}</h2>;
const HeaderTwoDecoration = ({ theme, children }) => <h3 className={theme.headerTwo}>{children}</h3>;
const HeaderThreeDecoration = ({ theme, children }) => <h4 className={theme.headerThree}>{children}</h4>;
const ParagraphDecoration = ({ theme, children }) => <p className={theme.paragraph}>{children}</p>;

ParagraphDecoration.propTypes =
HeaderOneDecoration.propTypes =
HeaderTwoDecoration.propTypes =
HeaderThreeDecoration.propTypes = propTypes;

const styleToDecorationMap = {
  'inline-header-one': HeaderOneDecoration, // TODO: common style consts
  'inline-header-two': HeaderTwoDecoration,
  'inline-header-three': HeaderThreeDecoration,
  'inline-paragraph': ParagraphDecoration,
};

const withTheme = (Component, theme) => {
  const Themed = props => <Component theme={theme} {...props} />;
  Themed.propTypes = Component.propTypes || {};
  return Themed;
};

withTheme.propTypes = {
  Component: PropTypes.element,
  theme: PropTypes.object
};

export default (getStrategyByStyle, theme) =>
  Object.keys(styleToDecorationMap).map(style => ({
    strategy: getStrategyByStyle(style),
    component: withTheme(styleToDecorationMap[style], theme)
  }));
