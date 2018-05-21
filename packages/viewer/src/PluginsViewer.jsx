import React from 'react';
import PropTypes from 'prop-types';


const AtomicBlock = ({ type, typeMap, componentData, ...props }) => {
  const Component = typeMap[type];
  if (Component) {
    return <Component componentData={componentData} {...props} />;
  }
  return null;
};

AtomicBlock.propTypes = {
  type: PropTypes.string.isRequired,
  componentData: PropTypes.object.isRequired,
  typeMap: PropTypes.object,
};

//return a list of types with a function that wraps the viewer
const getPluginsViewer = (typeMap, pluginProps) => {
  const res = {};
  Object.keys(typeMap).forEach(type => {
    res[type] = (children, entity, { key }) => <AtomicBlock typeMap={typeMap} type={type} key={key} componentData={entity} {...pluginProps}/>;
  });
  return res;
};

export default getPluginsViewer;
