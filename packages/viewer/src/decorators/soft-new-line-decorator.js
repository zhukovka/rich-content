import React from 'react';
import PropTypes from 'prop-types';
import { matchCaptureGroupAll } from 'wix-rich-content-common';

// const matchCaptureGroupAll = (text, regex) => {
//   const matches = regex.exec(text);
//   const result = [];

//   matches.map(match => {

//   });
// };

const NewLineStrategy = (contentBlock, callback) => {
  const text = contentBlock.getText();
  if (!text) {
    return [];
  }

  //text = text.replace(/[\n\r]/gi, '\n ');

  const lineMatches = matchCaptureGroupAll(text, /([\w\s]*)[\n\r]{0,1}|\s[\n\r]{0,1}/gi);

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
