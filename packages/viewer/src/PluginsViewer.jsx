//import React from 'react';
import PropTypes from 'prop-types';


const AtomicBlock = (/*{ type, componentData, ...props }*/) => {
  return null;
};

AtomicBlock.propTypes = {
  type: PropTypes.string.isRequired,
  componentData: PropTypes.object.isRequired,
};

//return a list of types with a function that wraps the viewer
const getPluginsViewer = () => {
  const res = {};
  // Object.keys(typeMap).forEach(type => {
  //   res[type] = (children, entity, { key }) => <AtomicBlock type={type} key={key} componentData={entity}/>;
  // });
  return res;
};

export default getPluginsViewer;
