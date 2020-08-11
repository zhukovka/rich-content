/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Page, RichContentEditorBox } from '../Components/StoryParts';
import { TooltipHost, BUTTON_TYPES } from 'wix-rich-content-editor-common';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
import FormattingGroupButton from 'wix-rich-content-editor-common/dist/lib/FormattingGroupButton.cjs.js';
import FormattingDropdownButton from 'wix-rich-content-editor-common/dist/lib/FormattingDropdownButton.cjs.js';
import EditorWrapper from '../Components/EditorWrapper';
import s from './FormattingExternalToolbar.scss';

let editorRef;

const getButtonStyles = ({ disabled, active }) => ({
  background: disabled ? 'lightgrey' : active ? 'cyan' : 'white',
  ...(disabled && { fill: '#bbb' }),
});

const mappings = {
  // [BUTTON_TYPES.FILE]: this.renderFileUploadButton,
  // [BUTTON_TYPES.BUTTON]: this.renderButton,
  [BUTTON_TYPES.SEPARATOR]: () => (
    <img
      className={s.divider}
      alt="lemming"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrDBJoeCHoZXvvwJDvkMxBArCVCXpmxj9Xhw&usqp=CAU"
    />
  ),
  // [BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
  [BUTTON_TYPES.DROPDOWN]: ({ disableState, isDisabled, ...rest }) => (
    <FormattingDropdownButton {...rest} disabled={disableState || isDisabled()} />
  ),
  [BUTTON_TYPES.GROUP]: ({ buttonList, ...rest }) => {
    return (
      <FormattingGroupButton
        buttons={Object.values(buttonList)}
        getButtonStyles={getButtonStyles}
        {...rest}
      />
    );
  },
};

const ExternalFormattingButon = buttonProps => {
  const {
    type,
    name,
    getIcon,
    tooltip,
    onClick,
    disableState,
    arrow = false,
    isActive = () => false,
    isDisabled = () => false,
  } = buttonProps;

  const Button = mappings[type];
  if (Button) {
    return <Button {...buttonProps} />;
  }
  const Icon = arrow ? () => <span>{name}</span> : getIcon ? getIcon() : () => <span>{name}</span>;

  const disabled = disableState || isDisabled();
  return (
    <Tooltip content={tooltip} key={name}>
      <button
        onClick={onClick}
        disabled={disabled}
        style={getButtonStyles({ disabled, active: isActive() })}
      >
        <Icon />
      </button>
    </Tooltip>
  );
};

ExternalFormattingButon.propTypes = {
  name: PropTypes.string,
  tooltip: PropTypes.string,
  getIcon: PropTypes.func,
  onClick: PropTypes.func,
  isDisabled: PropTypes.func,
  isActive: PropTypes.func,
  disableState: PropTypes.bool,
  arrow: PropTypes.bool,
};

const ExternalFormattingToolbar = ({ toolbarProps, disabled }) => {
  if (!toolbarProps) {
    return null;
  }
  const { buttons } = toolbarProps;

  const formattingButtons = Object.values(buttons).filter(x => x.toolbar === 'formatting');

  return (
    <div className={s.root}>
      My beatuiful External Toolbar!
      {formattingButtons.map(button => {
        return <ExternalFormattingButon key={button.name} disableState={disabled} {...button} />;
      })}
      <TooltipHost />
    </div>
  );
};

ExternalFormattingToolbar.propTypes = {
  toolbarProps: PropTypes.object,
  disabled: PropTypes.boolean,
};

export default () => {
  const [currentContent, setCurrentContent] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const toolbarProps = editorRef && editorRef.getToolbarProps();

  return (
    <Page title="External Formatting Example">
      <ExternalFormattingToolbar toolbarProps={toolbarProps} disabled={disabled} />
      <input
        type="text"
        placeholder="Header which is not related to RCE"
        onFocus={() => setDisabled(true)}
        style={{ border: 'none', fontSize: '40px', width: '100%' }}
      />
      <RichContentEditorBox preset="blog-preset">
        <EditorWrapper
          onChange={setCurrentContent}
          content={currentContent}
          ref={ref => (editorRef = ref)}
          onFocus={() => setDisabled(false)}
          toolbarSettings={{
            getToolbarSettings: () => {
              return [
                { name: 'EXTERNAL', shouldCreate: () => ({ desktop: true }) },
                { name: 'INLINE', shouldCreate: () => ({ desktop: false }) },
              ];
            },
          }}
        />
      </RichContentEditorBox>
    </Page>
  );
};