import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';

export const onFilesChange = (files, updateEntity) => {
  console.log('[consumer] files changed!', files); //eslint-disable-line no-console
  //mock upload
  const data = {
    original_file_name: //eslint-disable-line camelcase
      'a27d24_e1ac8887d0e04dd5b98fb4c263af1180~mv2_d_4915_3277_s_4_2.jpg',
    file_name: //eslint-disable-line camelcase
      'a27d24_e1ac8887d0e04dd5b98fb4c263af1180~mv2_d_4915_3277_s_4_2.jpg',
    width: 4915,
    height: 3277
  };
  setTimeout(() => updateEntity({ data }), 1500);
};

export const openExternalModal = data => {
  const { panelElement, modalStyles, ...elementProps } = data;
  const ModalContent = decorateComponentWithProps(panelElement, elementProps);
  this.setState({
    showModal: true,
    modalContent: <ModalContent />,
    modalStyles
  });
};

export const closeExternalModal = () => {
  this.setState({
    showModal: false
  });
};
