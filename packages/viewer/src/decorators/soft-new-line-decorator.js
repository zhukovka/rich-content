import React from 'react';
import PropTypes from 'prop-types';
import { matchCaptureGroupAll } from 'match-index';

const NewLineStrategy = (contentBlock, callback) => {
  const text = contentBlock.getText();
  if (!text) {
    return [];
  }

  const lineMatches = matchCaptureGroupAll(text, /(.*)[\n\r]{0,1}|^$[\n\r]{0,1}/gi);

  if (lineMatches.length > 0 && lineMatches[0].text.length === text.length) {
    return [];
  }

  lineMatches.forEach(match => {
    callback(match.index, match.index + match.text.length);
  });
};

const NewLineDecoration = ({ decoratedText }) => {
  if (decoratedText) {
    return <div>{decoratedText}<br/></div>;
  }
  return <br/>;
};

NewLineDecoration.propTypes = {
  decoratedText: PropTypes.string,
};

export { NewLineDecoration, NewLineStrategy };
