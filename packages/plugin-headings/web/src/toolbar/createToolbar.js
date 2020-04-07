import HeadingButton from './HeadingButton';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { titleButton } from 'wix-rich-content-editor';

export default settings => {
  const { icons, customHeadings } = settings;
  return {
    TextButtonMapper: () => {
      return {
        Heading: {
          component: customHeadings
            ? decorateComponentWithProps(HeadingButton, settings)
            : titleButton(icons.inactiveIconTitle, icons.TitleOne, icons.TitleTwo),
          isMobile: true,
          position: {
            mobile: 1,
          },
        },
      };
    },
  };
};
