import HeadingButton from './HeadingButton';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

export default settings => {
  return {
    TextButtonMapper: () => {
      return {
        Heading: {
          component: decorateComponentWithProps(HeadingButton, settings),
          isMobile: true,
          position: {
            mobile: 1,
          },
        },
      };
    },
  };
};
