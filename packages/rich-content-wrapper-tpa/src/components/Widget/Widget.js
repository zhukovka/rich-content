import React, { Component } from "react";
import ReactModal from 'react-modal';
import { I18nextProvider, translate } from "react-i18next";
import { RichContentEditor, RichContentEditorModal } from "wix-rich-content-editor";
import {
  ExperimentsProvider,
  withExperiments
} from "@wix/wix-experiments-react";
import { TPAComponentsProvider } from "wix-ui-tpa/TPAComponentsConfig";
import i18n from "../../config/i18n";
import "../rce-styles.global.scss";
import plugins from "../../editorApp/EditorPlugins.js";
import { VERTICAL_EMBED_TYPE } from 'wix-rich-content-plugin-vertical-embed';

import { ModalsMap as VideoModalsMap } from 'wix-rich-content-plugin-video';
import { ModalsMap as SoundCloudModalsMap } from 'wix-rich-content-plugin-sound-cloud';
import { ModalsMap as GiphyModalsMap } from 'wix-rich-content-plugin-giphy';
import { ModalsMap as ImageModalsMap } from 'wix-rich-content-plugin-image';
import { ModalsMap as GalleryModalsMap } from 'wix-rich-content-plugin-gallery';
import { ModalsMap as TextColorModalsMap } from 'wix-rich-content-plugin-text-color';
import { ModalsMap as LineSpacingModalsMap } from 'wix-rich-content-plugin-line-spacing';

const ModalsMap = {
  ...VideoModalsMap,
  ...SoundCloudModalsMap,
  ...GiphyModalsMap,
  ...ImageModalsMap,
  ...GalleryModalsMap,
  ...TextColorModalsMap,
  ...LineSpacingModalsMap,
};

const modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class WidgetRoot extends React.Component {
  state = {};
  helpers = {
    // onFilesChange: (files, updateEntity) => mockUpload(files, updateEntity),
    handleFileSelection: (index, multiple, updateEntity, removeEntity, componentData) => {
      const count = componentData.items || shouldMultiSelectImages ? [1, 2, 3] : [1];
      const data = [];
      count.forEach(_ => {
        const testItem = testImages[Math.floor(Math.random() * testImages.length)];
        data.push({
          id: testItem.photoId,
          original_file_name: testItem.url,
          file_name: testItem.url,
          width: testItem.metadata.width,
          height: testItem.metadata.height,
        });
      });
      setTimeout(() => {
        updateEntity({ data });
      }, 500);
    },
    onVideoSelected: (url, updateEntity) => {
      setTimeout(() => {
        const mockVideoIndex =
          this.props.mockImageIndex || Math.floor(Math.random() * testVideos.length);
        const testVideo = testVideos[mockVideoIndex];
        updateEntity(testVideo);
      }, 500);
    },
    openModal: data => {
      const { modalStyles, ...modalProps } = data;
      try {
        document.documentElement.style.height = '100%';
        document.documentElement.style.position = 'relative';
      } catch (e) {
        console.warn('Cannot change document styles', e);
      }
      this.setState({
        showModal: true,
        modalProps,
        modalStyles,
      });
    },
    closeModal: () => {
      try {
        document.documentElement.style.height = 'initial';
        document.documentElement.style.position = 'initial';
      } catch (e) {
        console.warn('Cannot change document styles', e);
      }
      this.setState({
        showModal: false,
        modalProps: null,
        modalStyles: null,
        modalContent: null,
      });
    },
  };

  render() {
    const { name, language, experiments, mobile, instance } = this.props;
    const modalStyles = {
      content: {
        ...(this.state.modalStyles || modalStyleDefaults).content,
        // ...theme.modalTheme.content,
      },
      overlay: {
        ...(this.state.modalStyles || modalStyleDefaults).overlay,
        // ...theme.modalTheme.overlay,
      },
    };

    return (
      <I18nextProvider i18n={i18n(language)}>
        <ExperimentsProvider options={{ experiments }}>
          <TPAComponentsProvider value={{ mobile }}>
            <Widget name={name} instance={instance} helpers={this.helpers} />
            <ReactModal
              isOpen={this.state.showModal}
              contentLabel="External Modal Example"
              style={modalStyles}
              role="dialog"
              onRequestClose={this.helpers.closeModal}
            >
              <RichContentEditorModal
                modalsMap={ModalsMap}
                locale={this.props.locale}
                {...this.state.modalProps}
              />
            </ReactModal>
          </TPAComponentsProvider>
        </ExperimentsProvider>
      </I18nextProvider>
    );
  }
}

export const Widget = withExperiments(
  translate()(({ name, t, instance, helpers }) => {
    return (
      <div>
        <RichContentEditor
          helpers={helpers}
          placeholder={"Add some text!"}
          t={t}
          editorKey={"editorKey"}
          plugins={plugins}
          config={{
            [VERTICAL_EMBED_TYPE]: {
              instance
            },
          }}
        />
      </div>
    );
  })
);
