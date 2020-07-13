/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, Component } from 'react';
import PropTypes from 'prop-types';

import { Page } from '../Components/StoryParts';
import { Tooltip, TooltipHost } from 'wix-rich-content-editor-common';

import EditorWrapper from '../Components/EditorWrapper';

const plugins = ['image', 'gallery', 'video', 'gif', 'fileUpload', 'emoji', 'undoRedo'];
let editorRef;

class InitialIntentToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.object,
  };

  clickHandler = onPluginButtonClick => e => {
    onPluginButtonClick(e);
  };

  render() {
    const { buttons } = this.props;
    if (!buttons) {
      return null;
    }
    const { UndoPlugin_InsertButton } = buttons;
    const { name, getIcon, tooltip, onClick, isDisabled = () => false } = UndoPlugin_InsertButton;
    const Icon = getIcon();
    return (
      // <div className={styles.toolbar}>
      <div style={{ border: '1px solid black', padding: '20px' }}>
        My beatuiful External Toolbar!
        <Tooltip content={tooltip} key={name}>
          <button onClick={onClick} disabled={isDisabled()} style={{ marginLeft: '20px' }}>
            My custom button <Icon />
          </button>
        </Tooltip>
        <TooltipHost />
      </div>
    );
  }
}

export default () => {
  const [currentContent, setCurrentContent] = useState(null);

  const toolbarProps = editorRef && editorRef.getToolbarProps();
  const { buttons } = toolbarProps || {};

  return (
    <Page title="External Undo Example">
      <InitialIntentToolbar buttons={buttons} />

      <EditorWrapper
        onChange={setCurrentContent}
        content={currentContent}
        ref={ref => (editorRef = ref)}
        pluginsToDisplay={plugins}
        config={{
          getToolbarSettings: () => {
            return [{ name: 'EXTERNAL', shouldCreate: () => ({ desktop: true }) }];
          },
        }}
      />
    </Page>
  );
};
