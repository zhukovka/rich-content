import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import {
  InlineToolbarButton,
  EditorState,
  TITLE_FONT_STYLE,
  DEFAULT_FONTS_DROPDOWN_OPTIONS,
} from 'wix-rich-content-editor-common';
import { RichUtils } from 'draft-js';
import Modal from 'react-modal';
import Panel from './HeadingPanel';
import classNames from 'classnames';
import styles from '../../statics/styles/headingButtonStyles.scss';

export default class HeadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showPanel: false, currentHeading: 'P' };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.isFirstRender = true;
  }

  componentWillReceiveProps() {
    const { isMobile } = this.props;
    if (this.isFirstRender && isMobile) {
      this.isFirstRender = false;
    } else {
      this.findCurrentHeading();
    }
  }

  findCurrentHeading = () => {
    const currentEditorState = this.props.getEditorState();
    const selection = currentEditorState.getSelection();
    const currentHeading = this.convertFontToHeadingName(
      currentEditorState.getCurrentContent().blockMap.toJS()[selection.focusKey].type
    );
    this.setState({ currentHeading });
  };

  convertFontToHeadingName = font =>
    Object.keys(TITLE_FONT_STYLE).find(key => TITLE_FONT_STYLE[key] === font);

  openPanel = () => {
    this.currentEditorState = this.oldEditorState = this.props.getEditorState();
    this.selection = this.oldEditorState.getSelection();
    const { bottom, left } = this.buttonRef.getBoundingClientRect();
    this.props.setKeepOpen(true);
    this.setState({ isPanelOpen: true, panelLeft: left, panelTop: bottom });
  };

  closePanel = () => {
    this.setState({ isPanelOpen: false });
    this.props.setKeepOpen(false);
  };

  updateHeading = (font, heading) => {
    const { setEditorState, getEditorState } = this.props;
    const newEditorState = RichUtils.toggleBlockType(getEditorState(), font);
    setEditorState(newEditorState);
    this.currentEditorState = newEditorState;
    this.setState({ currentHeading: heading });
  };

  getContentForButton = option => {
    const { t } = this.props;
    return option.length === 1
      ? t('FormattingToolbar_TextStyle_Paragraph')
      : t('FormattingToolbar_TextStyle_Heading', { number: option.slice(-1) });
  };

  save = (font, heading) => {
    this.closePanel();
    font ? this.updateHeading(font, heading) : this.setEditorState(this.currentEditorState);
  };

  setEditorState = editorState =>
    this.props.setEditorState(this.fixSelection(editorState, this.selection));

  fixSelection = EditorState.forceSelection;

  static getModalParent() {
    return document.querySelector('.DraftEditor-root').parentNode;
  }

  render() {
    const { theme, isMobile, t, tabIndex, customHeadings } = this.props;
    const tooltipText = t('TitleButton_Tooltip');
    const textForHooks = tooltipText.replace(/\s+/, '');
    const dataHookText = `textDropDownButton_${textForHooks}`;
    const { isPanelOpen, panelTop, panelLeft, currentHeading } = this.state;
    const { styles } = this;

    const customHeadingsOptions = Array.isArray(customHeadings)
      ? customHeadings
      : DEFAULT_FONTS_DROPDOWN_OPTIONS;
    const modalStyle = isMobile
      ? { left: 0, bottom: 0, right: 0 }
      : {
          top: panelTop,
          left: panelLeft,
        };
    const showArrowIcon = !isMobile;
    const buttonContent = isMobile ? currentHeading : this.getContentForButton(currentHeading);
    return (
      <InlineToolbarButton
        onClick={this.openPanel}
        isActive={isPanelOpen}
        theme={theme}
        isMobile={isMobile}
        tooltipText={tooltipText}
        dataHook={dataHookText}
        tabIndex={tabIndex}
        buttonContent={buttonContent}
        showArrowIcon={showArrowIcon}
        ref={ref => (this.buttonRef = ref)}
      >
        <Modal
          isOpen={isPanelOpen}
          onRequestClose={() => this.save()}
          className={classNames(styles.headingsModal, {
            [styles.headingsModal_mobile]: isMobile,
          })}
          overlayClassName={classNames(styles.headingsModalOverlay, {
            [styles.headingsModalOverlay_mobile]: isMobile,
          })}
          parentSelector={HeadingButton.getModalParent}
          style={{
            content: modalStyle,
          }}
          ariaHideApp={false}
        >
          <Panel
            customHeadingsOptions={customHeadingsOptions}
            heading={currentHeading}
            onSave={this.save}
            styles={this.styles}
            t={t}
            isMobile={isMobile}
            theme={theme}
            getContentForButton={this.getContentForButton}
            {...this.props}
          />
        </Modal>
      </InlineToolbarButton>
    );
  }
}

HeadingButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  helpers: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  tabIndex: PropTypes.number,
  setKeepOpen: PropTypes.func,
  settings: PropTypes.object,
  customHeadings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

HeadingButton.defaultProps = {
  setKeepOpen: () => {},
};
