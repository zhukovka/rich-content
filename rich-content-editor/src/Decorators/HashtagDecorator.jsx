import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { hashtagRegexes } from '~/Utils';
import Styles from '~/Styles/text-hashtag.scss';

const Name = 'HashtagDecorator';

const findHashtagEntities = (contentBlock, callback) => {
  const text = contentBlock.getText();
  if (!text || !text.match(hashtagRegexes.hashSigns)) {
    return [];
  }

  const tags = [];
  text.replace(hashtagRegexes.validHashtag, (match, before, hash, hashText, offset, chunk) => {
    const after = chunk.slice(offset + match.length);
    if (after.match(hashtagRegexes.endHashtagMatch)) {
      return;
    }
    const startPosition = offset + before.length;
    const endPosition = startPosition + hashText.length + 1;
    tags.push({ hashtag: hashText, indices: [startPosition, endPosition] });
  });

  tags.forEach(hashtag => callback(hashtag.indices[0], hashtag.indices[1]));
};

const Hashtag = ({ children, decoratedText, createHref, target = '_self', theme = {} }) => {
  const href = createHref ? createHref(decoratedText.slice(1)) : null;
  const Component = href ? 'a' : 'span';
  const className = classNames(Styles.hashtag,
    theme && theme.hashtag,
    {
      [Styles.hashtag_hover]: !!href,
      [theme.hashtag_hover]: theme && theme.hashtag_hover && !!href,
    });
  const props = href ? { className, href, target } : { className };

  return <Component {...props}>{children}</Component>;
};

Hashtag.propTypes = {
  children: PropTypes.node,
  decoratedText: PropTypes.string,
  createHref: PropTypes.func,
  target: PropTypes.oneOf(['_self', '_blank']),
  theme: PropTypes.object,
};

export { Name, findHashtagEntities as Strategy, Hashtag as Component };
