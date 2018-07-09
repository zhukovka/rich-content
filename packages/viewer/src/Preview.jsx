import React from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import { createInlineStyleDecorators, mergeStyles } from 'wix-rich-content-common';
import getPluginsViewer from './PluginsViewer';
import List from './List';
import { getStrategyByStyle } from './decorators/getStrategyByStyle';
import styles from '../statics/rich-content-viewer.scss';

const addBlock = children => <div>{children}</div>;

const getInline = mergedStyles => {
  return {
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
    CODE: (children, { key }) => <span key={key} className={mergedStyles.code}>{children}</span>
  };
};

const getList = (ordered, mergedStyles) =>
  (children, { depth, keys }) => {
    const className = ordered ? 'ordered' : 'unordered';
    return (
      <List key={keys[0]} keys={keys} depth={depth} ordered={ordered}>
        {children.map((child, i) => <li className={mergedStyles[`${className}List`]} key={keys[i]} >{addBlock(child, mergedStyles)}</li>)}
      </List>
    );
  };

/**
 * Note that children can be maped to render a list or do other cool stuff
 */
const getBlocks = mergedStyles => {
  // Rendering blocks like this along with cleanup results in a single p tag for each paragraph
  // adding an empty block closes current paragraph and starts a new one
  return {
    unstyled: (children, { keys }) => <p key={keys[0]}>{children}</p>,
    blockquote: (children, { keys }) => <blockquote className={mergedStyles.quote} key={keys[0]} >{children}</blockquote>,
    'header-one': (children, { keys }) => children.map((child, i) => <h2 className={mergedStyles.headerOne} key={keys[i]}>{child}</h2>),
    'header-two': (children, { keys }) => children.map((child, i) => <h3 className={mergedStyles.headerTwo} key={keys[i]}>{child}</h3>),
    'header-three': (children, { keys }) => children.map((child, i) => <h4 className={mergedStyles.headerThree} key={keys[i]}>{child}</h4>),
    'header-four': (children, { keys }) => children.map((child, i) => <h5 key={keys[i]}>{child}</h5>),
    'header-five': (children, { keys }) => children.map((child, i) => <h6 key={keys[i]}>{child}</h6>),
    'code-block': (children, { keys }) => <pre key={keys[0]} className={mergedStyles.codeBlock}>{children}</pre>,
    'unordered-list-item': getList(false, mergedStyles),
    'ordered-list-item': getList(true, mergedStyles),
  };
};

const getEntities = (typeMap, pluginProps) => ({
  ...getPluginsViewer(typeMap, pluginProps)
});

const combineTypeMappers = mappers => {
  if (!mappers || !mappers.length || mappers.some(resolver => typeof resolver !== 'function')) {
    throw new TypeError('typeMappers is expected to be a function array');
  }
  return mappers.reduce((map, mapper) => Object.assign(map, mapper()), {});
};

const isEmptyRaw = raw => (!raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === ''));

const options = {
  cleanup: {
    after: 'all',
    types: 'all',
    split: true,
  },
};

const Preview = ({ raw, typeMappers, theme, isMobile, decorators, anchorTarget, relValue }) => {
  const mergedStyles = mergeStyles({ styles, theme });
  const isEmpty = isEmptyRaw(raw);
  const typeMap = combineTypeMappers(typeMappers);
  const combinedDecorators = [
    ...decorators,
    ...createInlineStyleDecorators(getStrategyByStyle, mergedStyles)
  ];
  window.redraft = redraft;
  return (
    <div className={mergedStyles.preview}>
      {isEmpty && <div>There is nothing to render...</div>}
      {!isEmpty &&
        redraft(raw, {
          inline: getInline(mergedStyles),
          blocks: getBlocks(mergedStyles),
          entities: getEntities(typeMap, { theme, isMobile, anchorTarget, relValue }),
          decorators: combinedDecorators },
        options)}
    </div>
  );
};

Preview.propTypes = {
  raw: PropTypes.shape({
    blocks: PropTypes.array.isRequired, // eslint-disable-line react/no-unused-prop-types
    entityMap: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  }).isRequired,
  typeMappers: PropTypes.arrayOf(PropTypes.func).isRequired,
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  decorators: PropTypes.arrayOf(PropTypes.shape({
    component: PropTypes.func.isRequired,
    strategy: PropTypes.func.isRequired,
  })),
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
};

export default Preview;
