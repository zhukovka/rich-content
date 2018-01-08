import React from 'react';
import BlockLinkButton from './BlockLinkButton';
import createBlockButton from './utils/createBlockButton';
import createBlockAlignmentAndSizeButton from './utils/createBlockAlignmentAndSizeButton';
import SizeOriginalIcon from '../icons/size-original.svg';
import SizeSmallCenterIcon from '../icons/size-small-center.svg';
import SizeSmallLeftIcon from '../icons/size-small-left.svg';
import SizeSmallRightIcon from '../icons/size-small-right.svg';
import SizeContentIcon from '../icons/size-best-fit.svg';
import SizeFulllWidthIcon from '../icons/size-full-width.svg';
import DeleteIcon from '../icons/trash.svg';

export const BUTTONS = {
  FILES: 'file',
  TOGGLE: 'toggle',
  PANEL: 'modal',
  EXTERNAL_MODAL: 'external-modal',
  SEPARATOR: 'separator',
  SIZE_ORIGINAL_CENTER: 'size-original-center',
  SIZE_SMALL_CENTER: 'size-small-center',
  SIZE_SMALL_LEFT: 'size-small-left',
  SIZE_SMALL_RIGHT: 'size-small-right',
  SIZE_CONTENT: 'size-content',
  SIZE_FULL_WIDTH: 'size-full-width',
  LINK: 'link',
  DELETE: 'delete',
};

export { BlockLinkButton };

export const SizeOriginalCenterButton = createBlockAlignmentAndSizeButton({
  size: 'original',
  alignment: 'center',
  content: <SizeOriginalIcon />,
});

export const SizeSmallCenterButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'center',
  content: <SizeSmallCenterIcon />,
});

export const SizeSmallLeftButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'left',
  content: <SizeSmallLeftIcon />,
});

export const SizeSmallRightButton = createBlockAlignmentAndSizeButton({
  size: 'small',
  alignment: 'right',
  content: <SizeSmallRightIcon />,
});

export const SizeContentButton = createBlockAlignmentAndSizeButton({
  size: 'content',
  alignment: 'center',
  content: <SizeContentIcon />,
});

export const SizeFulllWidthButton = createBlockAlignmentAndSizeButton({
  size: 'fullWidth',
  alignment: 'center',
  content: <SizeFulllWidthIcon />,
});

export const DeleteButton = createBlockButton({
  content: <DeleteIcon />,
});

export default {
  [BUTTONS.SIZE_ORIGINAL_CENTER]: SizeOriginalCenterButton,
  [BUTTONS.SIZE_SMALL_CENTER]: SizeSmallCenterButton,
  [BUTTONS.SIZE_SMALL_LEFT]: SizeSmallLeftButton,
  [BUTTONS.SIZE_SMALL_RIGHT]: SizeSmallRightButton,
  [BUTTONS.SIZE_CONTENT]: SizeContentButton,
  [BUTTONS.SIZE_FULL_WIDTH]: SizeFulllWidthButton,
  [BUTTONS.LINK]: BlockLinkButton,
  [BUTTONS.DELETE]: DeleteButton,
};
