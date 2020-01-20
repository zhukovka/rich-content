import React from 'react';
import { BUTTONS, AlignCenterIcon, SizeLargeIcon } from 'wix-rich-content-editor-common';
import { changeAlignmentMobile, changeSizeMobile } from './actions';
import { isAlignmentDisabled, getNextSizeIcon, getNextAlignmentIcon } from './selectors';
// import { createDropdownValueGetter } from './dropdown-options';

const TYPES = ['option-1', 'option-2'];

export const DEFAULTS = {
  type: TYPES[0],
};

const createDropdownOptionComponent = ({ type, styles }) => () => {
  return <div className={styles['divider-dropdown__option']}>{type}</div>;
};

const getDropdownOptions = styles =>
  TYPES.map(type => ({
    value: type,
    label: type,
  }));

const createDropdownValueGetter = dropdownOptions => store => {
  const componentData = store.get('componentData') || {};
  const type = componentData.type || DEFAULTS.type;
  return dropdownOptions.find(x => x.value === type);
};

const changeType = (type, _componentData, store) => {
  store.update('componentData', { type: type.value });
};

export default ({ styles, settings }) => {
  const icons = (settings && settings.toolbar && settings.toolbar.icons) || {};
  const dropdownOptions = getDropdownOptions(styles);

  return [
    {
      keyName: 'posts',
      type: BUTTONS.DROPDOWN,
      options: dropdownOptions,
      onChange: changeType,
      getValue: createDropdownValueGetter(dropdownOptions),
      // controlClassName: styles['divider-dropdown__posts'],
      tooltipTextKey: 'DividerPlugin_SelectType_Tooltip',
      mobile: true,
    },
    { keyName: 'separator2', type: BUTTONS.SEPARATOR, mobile: true },
    { keyName: 'delete', type: BUTTONS.DELETE, mobile: true },
  ];
};
