import React from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import getPluginsViewer from './PluginsViewer';
import List from './List';

// import './Preview.css';

const styles = {
  code: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  codeBlock: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 20,
  },
};

const inline = {
  BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
  ITALIC: (children, { key }) => <em key={key}>{children}</em>,
  UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
  CODE: (children, { key }) => <span key={key} style={styles.code}>{children}</span>,
};


/* eslint-disable react/jsx-key */
const addBreaklines = children => children.map(child => [child, <br />]);

const getList = ordered =>
  (children, { depth, keys }) => (
    <List key={keys[0]} keys={keys} depth={depth} ordered={ordered}>
      {children.map((child, i) => <li key={keys[i]} >{child}</li>)}
    </List>
  );


/**
 * Note that children can be maped to render a list or do other cool stuff
 */
const blocks = {
  // Rendering blocks like this along with cleanup results in a single p tag for each paragraph
  // adding an empty block closes current paragraph and starts a new one
  unstyled: (children, { keys }) => <p key={keys[0]}>{addBreaklines(children)}</p>,
  blockquote:
    (children, { keys }) => <blockquote key={keys[0]} >{addBreaklines(children)}</blockquote>,
  'header-one': (children, { keys }) => children.map((child, i) => <h1 key={keys[i]}>{child}</h1>),
  'header-two': (children, { keys }) => children.map((child, i) => <h2 key={keys[i]}>{child}</h2>),
  'header-three': (children, { keys }) => children.map((child, i) => <h3 key={keys[i]}>{child}</h3>),
  'header-four': (children, { keys }) => children.map((child, i) => <h4 key={keys[i]}>{child}</h4>),
  'header-five': (children, { keys }) => children.map((child, i) => <h5 key={keys[i]}>{child}</h5>),
  'header-six': (children, { keys }) => children.map((child, i) => <h6 key={keys[i]}>{child}</h6>),
  'code-block': (children, { keys }) => <pre key={keys[0]} style={styles.codeBlock}>{addBreaklines(children)}</pre>,
  'unordered-list-item': getList(),
  'ordered-list-item': getList(true),
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

const decorators = [];

const Preview = ({ raw, typeMappers, theme }) => {
  const isEmpty = isEmptyRaw(raw);
  const typeMap = combineTypeMappers(typeMappers);
  window.redraft = redraft;
  return (
    <div className="Preview">
      {isEmpty && <div className="Preview-empty">There is nothing to render...</div>}
      {!isEmpty && redraft(raw, { inline, blocks, entities: getEntities(typeMap, { theme }), decorators }, options)}
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
};

export default Preview;
