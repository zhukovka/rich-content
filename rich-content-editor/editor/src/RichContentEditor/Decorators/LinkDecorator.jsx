import React from 'react';

const Name = 'LinkDecorator';

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = ({ entityKey, contentState, children }) => {
  const { url, targetBlank } = contentState.getEntity(entityKey).getData();
  const target = targetBlank ? '_blank' : '_self';
  return (
    <a href={url} target={target}>
      {children}
    </a>
  );
};

export {
  Name,
  findLinkEntities as Strategy,
  Link as Component
};
