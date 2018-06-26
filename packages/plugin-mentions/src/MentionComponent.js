import React from 'react';
import PropTypes from 'prop-types';

const MentionComponent = mentionProps => (
  <span
    className={mentionProps.className}
    onClick={() => {
      console.log(mentionProps);
      alert('Clicked on the Mention!');
    }}
  >
    {mentionProps.children}
  </span>
);

MentionComponent.propTypes = {
  mentionProps: PropTypes.object,
};

export default MentionComponent;
